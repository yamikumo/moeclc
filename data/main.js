var premode = 0;
var pdata = new Array(60);
var ldata = new Array(60);
for(i=0; i < 60; i++){
	pdata[i] = 0;
	ldata[i] = 0;
}
var sdata = new Array(3);
sdata[0] = "aa";
sdata[1] = "ga";
sdata[2] = "ga";

var slotdata = new Array(17);
var questdata = new Array(17);
var bshipdata = new Array(17);

function cookieTrap(){
	if(!(getCookie("moeclc"))){
		for(i=0;i<10;i++){
			if( getCookie(i) == "")
				slotdata[i] = "&&&" ;
			if( getCookie(i) != ""){
				slotdata[i] = getCookie(i);
				document.cookie = i + "=0; expires=Fri, 31-Dec-2000 23:59:59; ";
			}
		}for(i=10;i<16;i++){
			slotdata[i] = "&&&" ;
		}

		tmp = "";
		for(i=0;i<16;i++){
			tmp += slotdata[i] + "\|";
		}
		tmp += "0";
		document.cookie = "moeclc=" + tmp + "; expires=Fri, 31-Dec-2030 23:59:59; ";
	}
	if(!(getCookie("wkclc"))){
		tmp = "";
		for(i=0;i<16;i++){
			questdata[i] = "0000000000000000000000000000000000" ;
			tmp += questdata[i] + "\|";
		}
		tmp += "0";
		document.cookie = "wkclc=" + tmp + "; expires=Fri, 31-Dec-2030 23:59:59; ";
	}
	if(!(getCookie("hllwrk"))){
		tmp = "";
		for(i=0;i<16;i++){
			bshipdata[i] = "aagaga" ;
			tmp += bshipdata[i] + "\|";
		}
		tmp += "0";
		document.cookie = "hllwrk=" + tmp + "; expires=Fri, 31-Dec-2030 23:59:59; ";
	}
}
function init(){
	cookieTrap();

	tmp = getCookie("moeclc");
	for(i=0;i<17;i++)
		slotdata[i] = tmp.split("\|")[i];

	tmp = getCookie("hllwrk");
	for(i=0;i<17;i++)
		bshipdata[i] = tmp.split("\|")[i];

	document.mcfrm.slot.selectedIndex = slotdata[16];
	num = document.mcfrm.slot.options[document.mcfrm.slot.selectedIndex].value;
	if(top.location.search.substring(1)){
		loadCode("url");
	}else if(!top.location.search.substring(1) && slotdata[num].split("&")[2] ){
		loadCode("cookie");
	}
	for(i=0;i<document.mcfrm.slot.options.length;i++){
		if(slotdata[i] != "&&&"){
			document.mcfrm.slot.options[i].text
				= "slot " + i + " : "+ unescape(slotdata[i].split("&")[3]);
		}if(slotdata[i] == "&&&"){
			document.mcfrm.slot.options[i].text
				= "slot " + i + " : no save";
		}
	}
	if(navigator.userAgent.indexOf('MSIE') < 0 || navigator.userAgent.indexOf('Opera')>0)
		document.getElementById("csslink").href = "data/moeclcff.css";
}

function prp(sklnum,val,clk){
	if(ldata[sklnum]!=2){
		switch(clk){
			case 0:
				val = val + document.body.scrollLeft;
				point = Math.floor((val-10)/1.4)*10000;
				if(document.mcfrm.snap.checked)
					point = Math.round(point/100000)*100000;
				break;
			case 1:
				val = val + document.body.scrollLeft;
				point = Math.floor((val-10)/1.4)*10000;
				if(document.mcfrm.snap.checked){
					point = Math.round(point/100000)*100000-20000;
					if(point==80000) point = 90000;
					if(point==-20000) point = 10000;
				}
				break;
			case 2:
				tmp = document.mcfrm.pnt[sklnum].value;
				if(tmp*1 == tmp){
					point = Math.round((Math.floor(tmp*10000)*10 + val*100000)/10);
				}if(tmp*1 != tmp){
					point = pdata[sklnum];
				}
				break;
			case 3:
				point = val*10000;
				break;
		}
	}
	if(ldata[sklnum]==1 && point > pdata[sklnum]){
		point = pdata[sklnum];
	}
	if(ldata[sklnum]==2){
		point = pdata[sklnum];
	}
	if(point<0) point = 0;
	if(point>1000000) point = 1000000;

	tmp = point.toString();
	if(!document.mcfrm.premium.checked){
		if(point<1000)
			point_str = "0.0";
		if(1000<=point && point<10000)
			point_str = "0." + tmp.charAt(0);
		if(10000<=point && point<100000)
			point_str = tmp.charAt(0) +"." + tmp.charAt(1);
		if(100000<=point && point<1000000)
			point_str = tmp.substring(0,2) +"." + tmp.charAt(2);
		if(point==1000000)
			point_str = "100.0";
		point = eval(point_str)*10000;
	}
	if(document.mcfrm.premium.checked){
		if(point==0)
			point_str = "0.0000";
		if(0<= point && point<10)
			point_str = "0.000" + tmp;
		if(10<= point && point<100)
			point_str = "0.00" + tmp;
		if(100<= point && point<1000)
			point_str = "0.0" + tmp;
		if(1000<=point && point<10000)
			point_str = "0." + tmp;
		if(10000<=point && point<100000)
			point_str = tmp.charAt(0) + "." + tmp.substring(1,5);
		if(100000<=point && point<1000000)
			point_str = tmp.substring(0,2) + "." + tmp.substring(2,6);
		if(point==1000000)
			point_str = "100.0000";
	}

	barlen = Math.floor(1.4 * point/10000);

	document.mcfrm.pnt[eval(sklnum)].value = point_str;
	document.getElementById('skl'+sklnum).style.backgroundPosition = barlen - 140 + "px 0px";
	pdata[sklnum] = point;
	calc();
}

function prpw(skilnum){
	var diff = 0;
	if(event.wheelDelta <= -120){ diff = 1; }
	else { diff = -1; }
	if(!document.mcfrm.snap.checked) diff = diff / 10;
	prp(skilnum,diff,2);
}

function calc(){
	var sum = rest= 0;
	for(i=0; i < 60; i++)
		sum = sum + pdata[i];
	rest = 8500000 - sum;
	if(sum <= 8500000){
		document.mcfrm.result.value = "TOTAL : " + sum/10000 + "�@�@REST : " + rest/10000;
		document.getElementById("result").style.color = "#0000ff";
	}if(sum > 8500000){		
		document.mcfrm.result.value = "OVER : " + rest/10000 * -1;
		document.getElementById("result").style.color = "#ff0000";
	}
	if(document.mcfrm.cone.checked)
		calcStatus();
}

function technicSet(html){
	if(html!=""){
		setHtmlLayer(html);
	}
}

function resetData(){
	for(i=0; i < 60; i++){
		pdata[i] = ldata[i] = 0;
		document.getElementById('skl'+i).style.backgroundPosition = "-140px 0px";
		if(!document.mcfrm.premium.checked)
			document.mcfrm.pnt[i].value = "0.0";
		if(document.mcfrm.premium.checked)
			document.mcfrm.pnt[i].value = "0.0000";
		document.getElementById("skl"+i).style.borderColor = "#ffff00";
	}
	document.mcfrm.race_list.selectedIndex = 0;
	sdata[0] = "aa";
	sdata[1] = "ga";
	sdata[2] = "ga";
	document.mcfrm.sname.value = "���l";
	calc();
	setAlertLayer("�S�ď����l�ɖ߂��܂����B<p><form><input type='button' value='����' onclick='offOptionLayer()'></form></p>");

}

function codeCopy(){
	code_race = document.mcfrm.race_list.selectedIndex;
	code = encode();

// URL��
	var url = "";
	url = "http://uniuni.dfz.jp/moeclc4/?" + code_race + "&" + code;
	document.mcfrm.code.value = url;

	setAlertLayer("<br>�ȉ���URL��I�����A�E�N���b�N���j���[���R�s�[���Ă��������B<br><br><form><b>��{</b> �i�]���̌`���j<br>"
		+ "<textarea cols=60 rows=2 readonly style='overflow:hidden;' onfocus='this.select();' onclick='this.select();'>" + url + "</textarea>"
		+ "<br><br><br><b>��{�{�V�b�v��</b><br>"
		+ "<textarea cols=60 rows=2 readonly style='overflow:hidden;' onfocus='this.select();' onclick='this.select();'>" + url + "&&" + sdata[0] + sdata[1] + sdata[2] + "</textarea>"
		+ "<br><br><br><b>��{�{�V�b�v���{�L�����N�^�[��</b><br>"
		+ "<textarea cols=60 rows=3 readonly style='overflow:hidden;' onfocus='this.select();' onclick='this.select();'>" + url + "&" + encodeURIComponent(document.mcfrm.cname.value) + "&" + sdata[0] + sdata[1] + sdata[2] + "</textarea>"
		+ "<br><br>����URL�� �����f���œ\��Ȃ��悤�ɋC��t���܂��傤<br><br><input type='button' value='����' onclick='offOptionLayer()'></form></p>");

}

function listCopy(){
	var SkillData = new Array(
		" �ؗ́@�@�@�@"," �����Ȃ��@�@"," �U������@"," ������ �@�@",
		" �m�\�@�@�@�@"," ���v�� �@�@"," ���_�� �@�@"," �W���� �@�@",
		"������R��"," �����ϐ��@"," ���j�@�@�@�@"," ���̉���@",
		" ��с@�@�@�@"," ���R�񕜁@"," �̌@�@�@�@�@"," ���́@�@�@�@",
		" ���n�@�@�@�@"," �ނ�@�@�@�@."," ��ǁ@�@�@�@"," �����@�@�@�@",
		" �b��@�@�@�@"," �����@�@�@�@"," �؍H�@�@�@�@"," �ٖD�@�@�@�@",
		" �򒲍� �@�@"," �����׍H�@"," �����@�@�@�@"," �͔|�@�@�@�@",
		" ���e�@�@�@�@"," �f��@�@�@�@"," �����@�@�@�@"," ����ڂ��@�@",
		" �� �@�@�@�@�@"," �e��@�@�@�@"," �| �@�@�@�@�@"," �� �@�@�@�@�@",
		" �����@�@�@�@"," �� �@�@�@�@�@"," � �@�@�@�@�@"," �L�b�N�@�@�@.",
		" �퓬�Z�p�@"," ���@�@�@�@"," ���܂� �@�@."," �����@�@�@�@",
		" �j�󖂖@�@"," �񕜖��@�@"," �������@�@"," �_�閂�@�@",
		" �������@�@"," ���̖��@�@"," ���@�n���@"," ���R���a�@",
		" �Í����߁@"," ����@�@�@�@"," �V���E�g�@�@"," ���y�@�@�@�@",
		" ���݁@�@�@�@"," �M�����u�� ","�p�t�H�[�}���X"," �_���X�@�@�@");

	var SkillData2 = new Array(
		"�ؗ�","�����Ȃ�","���","����",
		"�m�\","���v","���_","�W��",
		"��R","����","���j","���",
		"���","���R��","�̌@","����",
		"���n","�ނ�","���","����",
		"�b��","����","�؍H","�ٖD",
		"����","����","����","�͔|",
		"���e","�f��","����","���_",
		"��","�e��","�|","��",
		"����","��","�","�L�b�N",
		"��Z","����","���܂�","����",
		"�j��","��","����","�_��",
		"����","����","���n","���a",
		"�Í�","���","�V���E�g","���y",
		"����","�M�����u��","�p�t�H","�_���X");

	i=0; j=0;
	tmpTxt = "�V�b�v�� : " + document.mcfrm.sname.value + "\n";
	tmpTxt2 = "";
	while(i<=60){
		if(pdata[i]>0){
			tmpTxt += "�y" + SkillData[i] + "�z�@" + pdata[i]/10000 + "\n";
			tmpTxt2 += SkillData2[i] + " " + pdata[i]/10000 + " ";
			j++;
			if(j==18)
				tmpTxt2 += "\n\n";
			if(j==36)
				tmpTxt2 += "\n\n";
			if(j==54)
				tmpTxt2 += "\n\n";
		}
		i++;
	}

	document.mcfrm.list.value = tmpTxt;
	document.mcfrm.list2.value = tmpTxt2;

	if(navigator.userAgent.indexOf('MSIE') > 0 && navigator.userAgent.indexOf('Opera')<0){
		copy_obj = document.mcfrm.list.createTextRange();
		copy_obj.execCommand("Copy");
	}
	setAlertLayer("<p>�ȉ��̃��X�g���R�s�[���Ă��������B</p><form name='asfrm'><textarea class='log2' name='list_dsp' rows=10 cols=50>" + tmpTxt + "</textarea><br><input type='radio' class='chk' name='list_mode' onclick='listMode(0)' checked>�X�L�����k�X���p�@<input type='radio' class='chk' name='list_mode' onclick='listMode(1)'>�Q�[���������p</form><form><input type='button' value='����' onclick='offOptionLayer()'></form></p>");
}

function listMode(mode){
	if(mode==0){
		document.asfrm.list_dsp.value = document.mcfrm.list.value;
		if(navigator.userAgent.indexOf('MSIE') > 0 && navigator.userAgent.indexOf('Opera')<0){
			copy_obj = document.mcfrm.list.createTextRange();
			copy_obj.execCommand("Copy");
		}
	}if(mode==1){
		document.asfrm.list_dsp.value = document.mcfrm.list2.value;
		if(navigator.userAgent.indexOf('MSIE') > 0 && navigator.userAgent.indexOf('Opera')<0){
			copy_obj = document.mcfrm.list2.createTextRange();
			copy_obj.execCommand("Copy");
		}
	}
}

function addBookmark(){
	code_race = document.mcfrm.race_list.selectedIndex;
	code = encode();

// URL��
	var url = "";
	url = "http://uniuni.dfz.jp/moeclc4/?" + code_race + "&" + code;

// ���O
	code_cname = document.mcfrm.cname.value;
	if(code_cname == "" || code_cname == "no name")
		code_cname = "no name"

	if(navigator.userAgent.indexOf("MSIE") != -1){
		window.external.AddFavorite(url,'�������邭 - ' + code_cname + ' �̍\��');
	}
	else if(navigator.userAgent.indexOf("Firefox") != -1){
		window.sidebar.addPanel('�������邭 - ' + code_cname + ' �̍\��',url,'');
	}
	else{
		setAlertLayer("���̃u���E�U�ł�JavaScript�ɂ��u�b�N�}�[�N�@�\�̓T�|�[�g����܂���BURL���o�͂��Ď��g�ō쐬�����肢���܂��B");
	}
}

function saveCookie(){
	num = document.mcfrm.slot.options[document.mcfrm.slot.selectedIndex].value;

	code_race = document.mcfrm.race_list.selectedIndex;
	code_lock_pnt = encode();
	code_cname = escape(document.mcfrm.cname.value);
	slotdata[num] = code_race + "&" + code_lock_pnt + "&" + code_cname;
	tmp = "";
	for(i=0;i<16;i++){
		tmp += slotdata[i] + "\|";
	}
	tmp += num;
	document.cookie = "moeclc=" + tmp + "; expires=Fri, 31-Dec-2030 23:59:59; ";

	ship_name = sdata[0] + sdata[1] + sdata[2];
	bshipdata[num] = sdata[0] + sdata[1] + sdata[2];
	tmp = "";
	for(i=0;i<16;i++){
		tmp += bshipdata[i] + "\|";
	}
	tmp += num;
	document.cookie = "hllwrk=" + tmp + "; expires=Fri, 31-Dec-2030 23:59:59; ";


	document.mcfrm.slot.options[document.mcfrm.slot.selectedIndex].text = "slot " + num + " : " + document.mcfrm.cname.value;
	setAlertLayer("Slot "+num+" �ɃZ�[�u���܂����B<p><form><input type='button' value='����' onclick='offOptionLayer()'></form></p>");
//	alert(code_race + "&" + code_lock_pnt + "&" + code_cname);
}

function encode(){
	var code_lock = code_pnt = "";

// LOCK���̈��k
	for(i=0; i<9; i++){		// if(�X�L����%7 != 0) i = �X�L���� + 7 - �X�L����%7
		tmp = 729*ldata[7*i] + 243*ldata[7*i+1] + 81*ldata[7*i+2]
			+ 27*ldata[7*i+3] + 9*ldata[7*i+4] + 3*ldata[7*i+5] + ldata[7*i+6];
		var tmp2 = "";
		tmp2 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(tmp/52))
			+ "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(tmp%52);
		code_lock = code_lock + tmp2;
	}
	code_lock = code_lock.replace(/aaaaaaaaaa/g,"9");
	code_lock = code_lock.replace(/aaaaaaaaa/g,"8");
	code_lock = code_lock.replace(/aaaaaaaa/g,"7");
	code_lock = code_lock.replace(/aaaaaaa/g,"6");
	code_lock = code_lock.replace(/aaaaaa/g,"5");
	code_lock = code_lock.replace(/aaaaa/g,"4");
	code_lock = code_lock.replace(/aaaa/g,"3");
	code_lock = code_lock.replace(/aaa/g,"2");
	code_lock = code_lock.replace(/aa/g,"1");

//	alert("code_lock : " + code_lock);

//	alert(pdata);

// �|�C���g���̈��k
	for(i=0; i<60; i++){
		if(pdata[i]%1000!=0)		// �X�L���l�ɏ�����2�ʈȉ�������ꍇ
			tmp = "vwxyz".charAt(Math.floor(pdata[i]/238328))
				+ "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor((pdata[i]%238328)/3844))
				+ "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(((pdata[i]%238328)%3844)/62))
				+ "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(((pdata[i]%238328)%3844)%62);
		if(pdata[i]%1000==0)		// �X�L���l�ɏ�����2�ʈȉ����Ȃ��ꍇ
			tmp = "abcdefghijklmnopq".charAt(Math.floor(pdata[i]/1000/62))
				+ "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(pdata[i]/1000%62);
		if(pdata[i]%100000==0)
			tmp = "ABCDEFGHIJK".charAt(Math.floor(pdata[i]/100000));
		if(pdata[i]%100000==80000)
			tmp = "LMNOPQRSTU".charAt(Math.floor(pdata[i]/100000));
		if(pdata[i]==10000)
			tmp = "V";
		if(pdata[i]==90000)
			tmp = "W";
		if(tmp!="A")
			code_pnt = code_pnt + "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(i) + tmp;
	}
//	alert("code_pnt : " + code_pnt);

	return(code_lock+"&"+code_pnt);
}

function getCookie(key){
	tmp1 = " " + document.cookie + ";";
	xx1 = xx2 = 0;
	len = tmp1.length;
	while(xx1 < len){
		xx2 = tmp1.indexOf(";", xx1);
		tmp2 = tmp1.substring(xx1 +1, xx2);
		xx3 = tmp2.indexOf("=");
		if(tmp2.substring(0, xx3) == key){
			return(tmp2.substring(xx3 +1, xx2 - xx1 -1));
		}
		xx1 = xx2 +1;
	}
	return("");
}

function loadCode(mode){
	code = "";
	code_race = code_pnt = "";
	premode = 0;

	if(mode == "cookie"){
		num = document.mcfrm.slot.options[document.mcfrm.slot.selectedIndex].value;
		code = slotdata[num];
		code_sname = bshipdata[num];
		setAlertLayer("�N�b�L�[���烍�[�h���܂��B(Slot "+num+")<p><form><input type='button' value='����' onclick='offOptionLayer()'></form></p>");
	}
	if(mode == "url"){
		code = top.location.search.substring(1);
		code_sname = code.split("&")[4];
		setAlertLayer("URL���烍�[�h���܂��B<p><form><input type='button' value='����' onclick='offOptionLayer()'></form></p>");
	}

	code_race = code.split("&")[0];
	code_lock = code.split("&")[1];
	code_pnt = code.split("&")[2];
	code_cname = unescape(code.split("&")[3]);

//	alert("race : " + code_race + "\nlock : " + code_lock + "\npnt : " + code_pnt);

// �f�R�[�h - �|�C���g���
	i=0;
	s=0; flag=0;
	if(code_pnt!=null){
		while(i<code_pnt.length){
//	alert("s:"+s+" flag:"+flag+" i:"+i);
			j = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(code_pnt.charAt(i));
			switch(flag){
				case 0 :
					if(j>s){
						for(k=s; k<j; k++) pdata[k] = 0;
					}
					s=j; flag=1;
					i++;
					break;
				case 1 :
					if(46<j && j<57){
						pdata[s] = (j-47)*100000+80000;
					}else if(35<j && j<47){
						pdata[s] = (j-36)*100000;
					}else if(j==57){
						pdata[s] = 10000;
					}else if(j==58){
						pdata[s] = 90000;
					}else if(10<=j && j<27){
						tmp = (j-10)*62;
//	alert("s:"+s+" flag:"+flag+" i:"+i+" tmp:"+tmp+" j:"+j);
						i++;
						j = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(code_pnt.charAt(i));
						pdata[s] = (tmp + j)*1000;
					}else if(31<=j && j<36){
						premode = 1;
						tmp = (j-31)*238328;
						i++;
						j = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(code_pnt.charAt(i));
						tmp = tmp + j*3844;
						i++;
						j = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(code_pnt.charAt(i));
						tmp = tmp + j*62;
						i++;
						j = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(code_pnt.charAt(i));
						pdata[s] = tmp + j;
					}
					s++; flag=0;
					i++;
					break;
			}
		}
		if(s<60){
			for(i=s; i<60; i++) pdata[i] = 0;
		}
//	alert("�|�C���g : "+pdata);

// �f�R�[�h - LOCK���
		code_lock = code_lock.replace(/9/g,"aaaaaaaaaa");
		code_lock = code_lock.replace(/8/g,"aaaaaaaaa");
		code_lock = code_lock.replace(/7/g,"aaaaaaaa");
		code_lock = code_lock.replace(/6/g,"aaaaaaa");
		code_lock = code_lock.replace(/5/g,"aaaaaa");
		code_lock = code_lock.replace(/4/g,"aaaaa");
		code_lock = code_lock.replace(/3/g,"aaaa");
		code_lock = code_lock.replace(/2/g,"aaa");
		code_lock = code_lock.replace(/1/g,"aa");

		j=0;
		for(i=0; i<code_lock.length/2; i++){
			var x=y=0;
			x = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(code_lock.charAt(2*i));
			y = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(code_lock.charAt(2*i+1));
			tmp2 = 52 * x + y;
			ldata[j]   = Math.floor(tmp2/729);
			ldata[j+1] = Math.floor((tmp2%729)/243);
			ldata[j+2] = Math.floor(((tmp2%729)%243)/81);
			ldata[j+3] = Math.floor((((tmp2%729)%243)%81)/27);
			ldata[j+4] = Math.floor(((((tmp2%729)%243)%81)%27)/9);
			ldata[j+5] = Math.floor((((((tmp2%729)%243)%81)%27)%9)/3);
			ldata[j+6] = Math.floor((((((tmp2%729)%243)%81)%27)%9)%3);
			j = j+7;
		}

//	alert("���b�N : "+ldata);

// �f�R�[�h - �V�b�v���
		if(code_sname){
			sdata[0] = code_sname.substring(0,2);
			sdata[1] = code_sname.substring(2,4);
			sdata[2] = code_sname.substring(4,6);
		}
//

// ����
		if(premode==0)
			document.mcfrm.premium.checked = false;
		if(premode==1)
			document.mcfrm.premium.checked = true;

		for(i=0; i<60; i++){
			document.getElementById('skl'+i).style.backgroundPosition = Math.floor(1.4 * pdata[i]/10000) - 140 + "px 0px";

			tmp = pdata[i].toString();
			if(!document.mcfrm.premium.checked){
				if(pdata[i]<1000)
					point_str = "0.0";
				if(1000<=pdata[i] && pdata[i]<10000)
					point_str = "0." + tmp.charAt(0);
				if(10000<=pdata[i] && pdata[i]<100000)
					point_str = tmp.charAt(0) +"." + tmp.charAt(1);
				if(100000<=pdata[i] && pdata[i]<1000000)
					point_str = tmp.substring(0,2) +"." + tmp.charAt(2);
				if(pdata[i]==1000000)
					point_str = "100.0";
				pdata[i] = eval(point_str)*10000;
			}
			if(document.mcfrm.premium.checked){
				if(pdata[i]==0)
					point_str = "0.0000";
				if(0<= pdata[i] && pdata[i]<10)
					point_str = "0.000" + tmp;
				if(10<= pdata[i] && pdata[i]<100)
					point_str = "0.00" + tmp;
				if(100<= pdata[i] && pdata[i]<1000)
					point_str = "0.0" + tmp;
				if(1000<=pdata[i] && pdata[i]<10000)
					point_str = "0." + tmp;
				if(10000<=pdata[i] && pdata[i]<100000)
					point_str = tmp.charAt(0) + "." + tmp.substring(1,5);
				if(100000<=pdata[i] && pdata[i]<1000000)
					point_str = tmp.substring(0,2) + "." + tmp.substring(2,6);
				if(pdata[i]==1000000)
					point_str = "100.0000";
			}
			document.mcfrm.pnt[i].value = point_str;

			switch(ldata[i]){
				case 0:
					document.getElementById("skl"+i).style.borderColor = "#ffff00"; break;
				case 1:
					document.getElementById("skl"+i).style.borderColor = "#0000cc"; break;
				case 2:
					document.getElementById("skl"+i).style.borderColor = "#cc0000"; break;
			}
		}
		document.mcfrm.race_list.selectedIndex = code_race;
		document.mcfrm.sname.value = decodeBS(sdata[0]) + decodeBS(sdata[1]) + decodeBS(sdata[2]);

		if(mode == "cookie"){
			document.mcfrm.cname.value = unescape(code_cname);
		}
		if(mode == "url"){
			document.mcfrm.cname.value = "no name";
		}
//	�L�����N�^�[�̖��O��JavaScript�� encodeURIComponent() ��������Query��&�Œǉ����Ă����ƁAURL������L�����̖��O���Ăт����܂��B
//	��j http://uniuni.dfz.jp/moeclc4/?0&97&0bW3m64H5iS6oQ7RAn4GlMIp0JHOoGUH&%E3%82%82%E3%81%88%E3%81%8B%E3%82%8B%E3%81%8F
		if(mode == "url" && code.split("&")[3] != null){
			document.mcfrm.cname.value = decodeURIComponent(code.split("&")[3]);
		}
	}
	else{
		setAlertLayer("�R�[�h���s���ł��B<p><form><input type='button' value='����' onclick='offOptionLayer()'></form></p>");
	}

// AA

	nazo = ["nazoniku","nazomizu","NAZONIKU","NAZOMIZU","NazoNiku","NazoMizu",
		"summonsmeat","summonswater","SUMMONSMEAT","SUMMONSWATER",
		"SummonsMeat","SummonsWater","Summonsmeat","Summonswater",
		"recallration","recalldrink","RECALLRATION","RECALLDRINK",
		"RecallRation","RecallDrink","Recallration","Recalldrink",
		"riko-rureishon","riko-rudorinnku","RIKO-RUREISHON","RIKO-RUDORINNKU",
		"riko-rureisyon","riko-rudorinku","RIKO-RUREISYON","RIKO-RUDORINKU"];
	nazoflag = 0;

	for(i=0;i<nazo.length;i++){
		if(code.indexOf(nazo[i])>=0){
			nazoflag=1;
		}
	}
	if(pdata[47]==180000)	nazoflag=1;

	if(nazoflag==1)
		setAlertLayer("<form><table border=0><td><div style='font-size:14px;'>�@�@�@�@�@�@�@�@�@�@�@�@�@�i��`��'�j<br>�@�@�@�@�@�@�@�@�@�@�@�@�@ |�@�@�@ |<br>�@�@�@�@�@�@�@�@�@�@�@�@�@ |_l_l�Q_|<br>�@�@�@�@�@�@�@//�P�R�Q/�@ =߃�߁j<br>�@�@�@�@�@�@|�P�P|�Q.�@|�@�@/�P�P�P(O|||||O)<br>.�܁R�@,;;;�@| /�P�R�@||_��__|//�P�R�P| |||||/�R<br>�i\";\"':;.):;ށ@|_| �� |�Q�Q�Q�@| �� .| |=======<br>�@�@��;:�R;;�@�R�Q//�@�@�@�@ �R�Q//�@�R�Q//�j�t�)�E��</div></td></table><br><input type='button' value='����' onclick='offOptionLayer()'></form>");


// AA�����

	calc();
}

function cfmDelete(){
	num = document.mcfrm.slot.options[document.mcfrm.slot.selectedIndex].value;
	setAlertLayer("Slot "+num+" �̃Z�[�u�f�[�^�������܂����H<p><form><input type='button' value=' �͂� ' onclick='deleteCookie()'>�@�@<input type='button' value='������' onclick='offOptionLayer()'></form></p>");
}

function deleteCookie(){
	num = document.mcfrm.slot.options[document.mcfrm.slot.selectedIndex].value;
	slotdata[eval(num)] = "&&&";
	tmp = "";
	for(i=0;i<16;i++){
		tmp = tmp + slotdata[i] + "\|";
	}
	tmp += "num";
	document.cookie = "moeclc=" + escape(tmp) + "; expires=Fri, 31-Dec-2030 23:59:59; ";
	document.mcfrm.slot.options[document.mcfrm.slot.options.selectedIndex].text = "slot " + num + " : no save";

	setAlertLayer("Slot "+num+" �̃Z�[�u�f�[�^�͍폜����܂����B<p><form><input type='button' value='����' onclick='offOptionLayer()'></form></p>");
}

function lockskill(sklnum){
	switch(ldata[sklnum]){
		case 0:
			ldata[sklnum] = 1;
			document.getElementById("skl"+sklnum).style.borderColor = "#0000cc";
			break;
		case 1:
			ldata[sklnum] = 2;
			document.getElementById("skl"+sklnum).style.borderColor = "#cc0000";
			break;
		case 2:
			ldata[sklnum] = 0;
			document.getElementById("skl"+sklnum).style.borderColor = "#ffff00";
			break;
	}
}

// �X�e�[�^�X�v�Z�֘A

// �푰�����l(HP,MP,ST,�d��),�{��(HP,MP,ST,�U����,����,�h���,���,����,������R��,�d��)*100
rpnt =[
	[30,30,30,10,100,100,100,100,100,100,100,100,100,100],
	[30,35,30,5,95,110,95,95,105,95,95,110,110,90],
	[25,30,35,10,95,100,105,95,105,95,110,95,100,100],
	[35,20,30,15,105,95,100,105,100,100,95,90,90,120]
];

mastery = [
	["WAR","�E�H�[���A�[ �}�X�^���[","���������U��Ƃ��̃f�B���C���Z���Ȃ�",
		"�����A�L�b�N�A���A��Z",[30,35,39,40],
		["�E�H�[���A","�t�@�C�^�[","�i�C�g"]
	],
	["ALC","�A���P�~�X�g �}�X�^���[","���@�r�����x�������Ȃ�",
		"�j��A�����A�񕜁A�_��",[44,45,46,47],
		["�A���P�~�X�g","�}�X�^�[�E�B�U�[�h","�E�H�[���b�N"]
	],
	["FOR","�t�H���X�^�[ �}�X�^���[","�|�U���̔��ˊԊu���Z���Ȃ�",
		"�|�A���a�A���܂ˁA����",[34,51,42,43],
		["�t�H���X�^�[","�t�H���X�g�}�X�^�[","�X�J�C�E�H�[�J�["]
	],
	["NEC","�l�N���}���T�[ �}�X�^���[","�������@�̉r�����Ԃ��Z�k�����",
		"�����A�����A��A�Í�",[48,49,37,52],
		["�l�N���}���T�[","�_�[�N�v���[�X�g","�V���h�E�i�C�g"]
	],
	["CRE","�N���G�C�^�[ �}�X�^���[","�����A�N�V�����Q�[�W�̈ړ����x���x���Ȃ�",
		"�b��A�؍H�A���́A�̌@",[20,22,15,14],
		["�N���G�C�^�[","�}�X�^�[�N���G�C�^�[","�W�F�l�V�X"]
	],
	["BOM","���e�j �}�X�^���[","㩂̐ݒu�Ԋu���Z���Ȃ�",
		"㩁A���a�A���v�A���܂�",[38,51,5,42],
		["���e�j<br>���e��","�����e�j<br>�����e��","�{���o�[�L���O<br>�{���o�[�N�C�[��"]
	],
	["TEM","�e���v���i�C�g �}�X�^���[","�A���f�b�h�n�̓G�ɐ��Ȃ�ǉ��_���[�W��^����",
		"�_��A�񕜁A��Z�A���_�A�W��",[47,45,40,31,7],
		["�e���v���i�C�g","�p���f�B��","�Z�C�N���b�h���[�h"]
	],
	["DRU","�h���C�h �}�X�^���[","�łɂ����������Ɏ����ŉ�ł����",
		"���a�A�񕜁A���n�A�Í�",[51,45,50,52],
		["�h���C�h","�}�X�^�[�h���C�h","�h���C�h�L���O"]
	],
	["SAG","���ɂ̌��� �}�X�^���[","�r�����̈ړ����x�������Ȃ�<br>&nbsp;���[�V�������A���ҕ��ɂȂ�<br>&nbsp;�����[�V�����́A�j���L��������",
		"�j��A�񕜁A�����A�_��A�����A����",[44,45,46,47,48,49],
		["���ɂ̌���","�[��̌���","����̌���"]
	],
	["EVI","�C�r���i�C�g �}�X�^���[","���̖��@�̉r���X�s�[�h�������Ȃ�",
		"�����A��A����A����",[30,37,11,49],
		["�C�r���i�C�g","�f�X�i�C�g","�w���i�C�g"]
	],
	["ATH","�A�X���[�g �}�X�^���[","���R�X�^�~�i�񕜑��x�������Ȃ�",
		"���j�A�����A���a�A���R��",[10,9,51,13],
		["�A�X���[�g","�g���C�A�X���[�g","�S�l"]
	],
	["GRE","�O���C�g �N���G�C�^�[ �}�X�^���[","�ו������Ă�d�ʂ��������A<br>&nbsp;�O���[�h�̍��������i���쐬���₷���Ȃ�܂�",
		"�b��A�؍H�A�ٖD�A�����A�����A�����A�����A����",[19,20,21,22,23,24,25,26],
		["�O���C�g�N���G�C�^�[","�N���G�C�g���[�h","�l�ԍ���"]
	],
	["ROW","�r����� �}�X�^���[","�q�b�g�E�|�C���g(HP)�̉񕜑��x�������Ȃ�",
		"�f��A�L�b�N�A�����A�����A���R�񕜁A�p�t�H",[29,39,9,3,13,58],
		["�r�����","���X���[","�`�����s�I��"]
	],
	["MER","�b�� �}�X�^���[","�����\�d�ʂ���������",
		"�e��A㩁A���܂ˁA��Z�A����",[33,38,42,40,19],
		["�b��","�q�b�g�}��","�S�b�h�t�@�[�U�["]
	],
	["BRA","�u���C�u�i�C�g �}�X�^���[","�h��͂��㏸���܂�",
		"��Z�A���_�A���A��R�A�����Ȃ�",[40,31,35,8,1],
		["�u���C�u�i�C�g","�A�[�}�[�i�C�g","�W���X�e�B�X�^���N"]
	],
	["DKF","�����m �}�X�^���[","�ҋ@��Ԃ��������[�V�����ɂȂ�",
		"���A�f��A����A���v�A�L�b�N",[41,29,2,5,39],
		["�����m","�����}�X�^�[","������"]
	],
	["SAM","�T�����C �}�X�^���[","�񓁗��ɂ��U�����\�ɂȂ�B<br>&nbsp;����ɓ�������𑕔����Ă���K�v������܂��B",
		"�����A��сA��Z�A����A�ؗ́A���_",[30,12,40,2,0,6],
		["�T�����C","�T�����C �}�X�^�[","���R"]
	],
	["MIN","�}�C�� �r�V���b�v �}�X�^���[","�O���[�h�̍��������i���쐬���₷���Ȃ�܂�",
		"�_��A���n�A�����A�b��",[47,50,48,20],
		["�}�C���r�V���b�v","���^���r�V���b�v","�t�����^���r�V���b�v"]
	],
	["KIT","�~�[�t �}�X�^���[","�����Ə����� �������������㏸����",
		"�����A�����A��R",[19,21,8],
		["�~�[�t","�}�X�^�[�~�[�t","�S�b�h�~�[�t"]
	],
	["ASS","�A�T�V�� �}�X�^���[","�X�����n�`�ɑ΂��Đ����ɑ����悤�ɂȂ�",
		"�����A㩁A���܂ˁA���a�A�����A�����A����",[30,38,42,51,24,9,36],
		["�A�T�V��","�E��","����"]
	],
	["COS","�R�X�v���C���[ �}�X�^���[","�S�ẴV�b�v������g�ɕt���邱�Ƃ��\�ɂȂ�",
		"�����A�ٖD�A�����Ȃ��A���܂ˁA����A�p�t�H",[25,23,1,2,42,58],
		["�R�X�v���C���[","�R�X�v���q�[���[<br>�R�X�v���q���C��","�q�[���[<br>�q���C��"]
	],
	["DAB","���D�� �}�X�^���[","�ړ��Ƒҋ@���[�V�������A<br>&nbsp;��������m�̃��[�V�����ɕς��<br>&nbsp;���j���L��������",
		"���j�A���n�A���A�����A����A�p�t�H",[10,16,41,9,11,58],
		["���D��","�l�^�t�ϐl","�_�l�^�t"]
	],
	["SEA","�C��m �}�X�^���[","���U���̊Ԋu���Z���Ȃ�",
		"���j�A���A�����A�ނ�A���",[10,32,19,17,53],
		["�C��m","�p�Y�C��m","�C��"]
	],
	["BRE","�u���[�_�[ �}�X�^���[","�����X�L���̋Z�̃f�B���C�������Ȃ�",
		"����A�����A���a�A����",[53,19,51,43],
		["�u���[�_�[","�u���[�h �}�X�^�[","�u���[�h ���[�h"]
	],
	["YAN","�`���s�� �}�X�^���[","���_�����U��Ƃ��̃f�B���C���Z���Ȃ�",
		"���_�A����A���݁A����",[31,53,56,41],
		["�`���s��","�A�E�g���[","�M�����O / ���f�B�[�X"]
	],
	["IDL","�V�l�A�C�h�� �}�X�^���[","�̂̎��肪�L���L���P��",
		"�_���X�A���y�A���j�A�p�t�H",[59,55,10,58],
		["�V�l�A�C�h��","�r�X�N �A�C�h��","�_�C�A���X �A�C�h��"]
	],
	["HOU","�n�E�X�L�[�p�[ �}�X�^���[","�ٖD�����̐��������㏸���܂�",
		"�����A�ٖD�A���e",[19,23,28],
		["�n�E�X�L�[�p�[","���C�h","�A�r�Q�C��"]
	],
	["SPY","�X�p�C �}�X�^���[","��𗦂��㏸���܂�",
		"�����A���܂ˁA����",[36,42,56],
		["�X�p�C","�X�g�[�J�[","�X�e���X"]
	],
	["TEA","�A�J�f�~�A�� �}�X�^���[","�����X�L���̍������������㏸����",
		"��ǁA�����A�W���A�_��A���_",[18,26,7,47,6],
		["�A�J�f�~�A��","�e�B�[�`���[","�v���t�F�b�T�["]
	],
	["ADV","�A�h�x���`�����[ �}�X�^���[","�����ړ����x���㏸�������_���[�W���y�������",
		"�����A���j�A�̌@�A��ǁA����",[9,10,14,18,56],
		["�A�h�x���`�����[","�G�N�X�v���[���[","�g���W���[ �n���^�["]
	],
	["BBD","�u���b�h �o�[�h �}�X�^���[","���y�X�L���E�V���E�g�X�L���̉r�����x���㏸����",
		"�V���E�g�A���v�́A��A���y",[54,5,37,55],
		["�u���b�h �o�[�h","�h���b�h �o�[�h","�J�I�X �o�[�h"]
	],
	["DUE","�f���G���X�g �}�X�^���[","�U���͂��㏸����",
		"���A�ؗ́A�����Ȃ��A���R�񕜁A�V���E�g",[32,0,1,13,54],
		["�f���G���X�g","���K�g�D�X","�^�C�����g"]
	]
//	["FRE","���R�l �}�X�^���[","�H",
//		"�H",[0],
//		["���R�l","�H","�H"]
//	]
];

shiplist = [
	[29,"�f��","�p���`���[","�{�N�T�[","�t�B�X�g�}�X�^�["],
	[30,"����","���m","�Z�C�o�[","�u���[�h�}�X�^�["],
	[31,"����ڂ�","���C�T�[","�N���b�V���[","�f�X�g���C���["],
	[32,"��","�����T�[","�W���x�����i�C�g","�h���S���X���C���["],
	[33,"�e��","�K���i�[","�o���b�e�B�A","�C�[�X�g�E�b�h"],
	[34,"�|","�A�[�`���[","�X�i�C�p�[","�z�[�N�A�C"],
	[35,"��","�K�[�Y�}��","�f�B�t�F���_�[","�K�[�f�B�A��"],
	[36,"����","�����m","�X�}�b�V���[","�h���[���t�B�[���_�["],
	[37,"��","�u���b�h �T�b�J�[","���@���p�C�A","���@���p�C�A ���[�h"],
	[38,"�","�����W���[","㩎t","�d���l"],
	[39,"�L�b�N","�L�b�J�[","�n�C�L�b�J�[","���[���V���[�^�["],
	[40,"�퓬�Z�p","���C���h�}��","�o�[�o���A��","�o�[�T�[�J�["],
	[41,"����","�h�����J�[","�������","����ԑ�Ԃ�"],
	[42,"���܂�","���܂ˎt","�����t","������"],
	[43,"����","�e�C�}�[","�n�C �e�C�}�[","�}�X�^�[ �e�C�}�["],
	[44,"�j�󖂖@","�E�B�U�[�h/�E�B�b�`","���C�W","�A�[�N���C�W"],
	[45,"�񕜖��@","�v���[�X�g","�n�C �v���[�X�g","�v���[�X�g ���[�h"],
	[46,"�������@","�V���[�}��","�n�C �V���[�}��","�V���[�}�� ���[�h"],
	[47,"�_�閂�@","�G���`�����^�[","�n�C �G���`�����^�[","�G���`�����g ���[�h"],
	[48,"�������@","�T���i�[","�n�C �T���i�[","�T�������[�h"],
	[49,"���̖��@","�V���h�E","���[�p�[","�W���[�J�["],
	[50,"���@�n��","���p�t","���p�t","���p��"],
	[51,"���R���a","�쐶��","�s�[�X �o�C�o�[","�W�����O�� �}�X�^�["],
	[52,"�Í�����","������","�f�[����","�f�[���� ���[�h"],
	[53,"���","�x���_�[","���l","����"],
	[54,"�V���E�g","���b�N �V���K�[","�n�[�h ���b�J�[","���^�� �V���K�["],
	[55,"���y","�\���O�V���K�[","�o�[�h","���̑��� / �̕P"],
	[56,"����","�X��","�Ђ�������","�D�_"],
	[58,"�p�t�H�[�}���X","�ڗ���������","�哹�|�l","�|�l"],
	[59,"�_���X","�X�g���[�g�_���T�[","�o�j�[�_���T�[","�X�^�[�_���T�["],
	[0],
	[9,"�����ϐ�","�t�H�[���}��","v�X�J�C�_�C�o�[","�t�H�[�����O ���[�h"],
	[10,"���j","�X�C�}�[","���C�t�K�[�h","�T�u�}����"],
	[11,"���̉��","�f�b�h�}��","�X�J�x���W���[","���[�g�}�X�^�["],
	[12,"���","�w���p�[","���f�B�b�N/�i�[�X","�W�F�l���� ���f�B�b�N"],
	[13,"���R��","�x�e�l","�ґz�t","�ґz�}�X�^�["],
	[14,"�̌@","�}�C�i�[","�S�[���h�}�C�i�[","�}�C�����[�h"],
	[15,"����","�؂���","���̎t","�����o�[ ���[�h"],
	[16,"���n","�k��t","�_�v","�_���"],
	[17,"�ނ�","�ނ�l","�ނ�t","���l�ނ�t"],
	[18,"���","��ǎ�","�T����","������"],
	[0],
	[19,"����","�����t","�V�F�t","�}�X�^�[ �V�F�t"],
	[20,"�b��","�b�艮","���^�����[�J�[","���^���}�X�^�["],
	[21,"����","�o�[�e���_�[","�����t","������"],
	[22,"�؍H","�؍H�t","��H�t","�e��"],
	[23,"�ٖD","�d���ĉ�","���t���t","�u�����h �f�U�C�i�["],
	[24,"�򒲍�","�����t","���t","����t"],
	[25,"�����׍H","�׍H�t","��Ύt","�W���G�� �}�X�^�["],
	[26,"����","�M�L�t","���t","�t�F�C�N���[�h"],
	[28,"���e","�����t","���ώt","�J���X�}���e�t"]
];

function setShip(){
	var shiptable = "";

	shiptable = "<div id='option3' style='background-color:#ccccdd; padding:10px 10px 10px 15px;'>"
		+ "<div style='width:650px; height:590px; overflow-y:auto;'>"
		+ "<table cellpadding=5 cellspacing=0 width=600 class='tech'>\n";

	for(i=0; i<mastery.length; i++){
		shiptable += "<tr>\n"
			+ "<th rowspan=2 class='tech' width=200><a class='sk' href='JavaScript:selectMastery(" + i
			+ ",0);' title='�X�L��0�ɖ߂�'>" + mastery[i][3] + "</a></th>\n"
			+ "<td class='tech sp'><a class='ms' href='JavaScript:selectMastery(" + i + ",40);' title='�X�L��40�܂Ń|�C���g��U��'>"
			+ mastery[i][5][0] + "</a></td>\n"
			+ "<td class='tech sp'><a class='ms' href='JavaScript:selectMastery(" + i + ",70);' title='�X�L��70�܂Ń|�C���g��U��'>"
			+ mastery[i][5][1] + "</a></td>\n"
			+ "<td class='tech sp'><a class='ms' href='JavaScript:selectMastery(" + i + ",90);' title='�X�L��90�܂Ń|�C���g��U��'>"
			+ mastery[i][5][2] + "</a></td>\n"
			+ "</tr><tr>\n"
			+ "<td colspan=3 class='tech'><nobr>" + mastery[i][2] + "</nobr></a></td>\n"
			+ "</tr>\n";
	}

	shiptable += "</table>\n<br>\n<table cellpadding=5 cellspacing=0 width=600 class='tech'>\n";

	for(i=0; i<shiplist.length; i++){
		if(shiplist[i][0] == 0){
				shiptable += "<tr class='tech'><td colspan=4 style='font-size:0px;' class='tech'>�@</td></tr>\n";
		}else{
			shiptable += "<tr class='tech'>\n"
				+ "<th class='tech'><a class='sk' href='JavaScript:prp(" + shiplist[i][0]
				+ ",0,3);' title='�X�L��0�ɖ߂�'>" + shiplist[i][1] + "</a></th>\n"
				+ "<td class='tech sp'><a class='ms' href='JavaScript:prp(" + shiplist[i][0] + ",30,3);' title='�X�L��30�܂Ń|�C���g��U��'>"
				+ shiplist[i][2] + "</a></td>\n"
				+ "<td class='tech sp'><a class='ms' href='JavaScript:prp(" + shiplist[i][0] + ",60,3);' title='�X�L��60�܂Ń|�C���g��U��'>"
				+ shiplist[i][3] + "</a></td>\n"
				+ "<td class='tech sp'><a class='ms' href='JavaScript:prp(" + shiplist[i][0] + ",90,3);' title='�X�L��90�܂Ń|�C���g��U��'>"
				+ shiplist[i][4] + "</a></td>\n"
				+ "</tr>\n";
		}
	}

	shiptable += "</table>";

	shiptable += "</div></div>";

	document.getElementById("option1").style.height = '650px';
	document.getElementById("option1").style.width = '960px';

	document.getElementById("option2").style.height = '610px';
	document.getElementById("option2").style.width = '670px';
	document.getElementById("option2").style.left = '20px';
	document.getElementById("option2").style.top = '20px';

//	alert(navigator.userAgent);
	if(navigator.userAgent.indexOf('MSIE') > 0 && navigator.userAgent.indexOf('Opera')<0){
		document.getElementById("option1").style.backgroundImage = 'url(data/black.png)';
	}else{
		document.getElementById("option1").style.backgroundImage = 'url(data/alpha.png)';
	}
	document.getElementById("option1").style.filter = "Alpha(opacity=30)";

	document.getElementById("option2").innerHTML = shiptable;
}


function calcStatus(){
//	alert(document.mcfrm.pnt[3].value);
	var racenum = eval(document.mcfrm.race_list.selectedIndex);

	document.mcfrm.dsp_hp.value
		= Math.floor(rpnt[racenum][0] * 10000 + (3 * pdata[3] * rpnt[racenum][4])/100)/10000;
	document.mcfrm.dsp_mp.value
		= Math.floor(rpnt[racenum][1] * 10000 + (3 * pdata[4] * rpnt[racenum][5])/100)/10000;
	document.mcfrm.dsp_st.value
		= Math.floor(rpnt[racenum][2] * 10000 + (3 * pdata[5] * rpnt[racenum][6])/100)/10000;
	document.mcfrm.dsp_weight.value
		= Math.floor(rpnt[racenum][3] * 100000 + (15 * pdata[0] * rpnt[racenum][13])/100)/100000;
	document.mcfrm.dsp_atk.value
		= Math.floor((2 * pdata[0] * rpnt[racenum][7])/1000)/10000;
	document.mcfrm.dsp_ac.value
		= Math.floor((2 * pdata[1] * rpnt[racenum][9])/1000)/10000;
	document.mcfrm.dsp_flee.value
		= Math.floor((1 * pdata[2] * rpnt[racenum][10])/100)/10000;
	document.mcfrm.dsp_magic.value
		= Math.floor((1 * pdata[6] * rpnt[racenum][11])/100)/10000;
	document.mcfrm.dsp_mgcreg.value
		= Math.floor((1 * pdata[8] * rpnt[racenum][12])/100)/10000;

	tmpLog = "";
	for(i=0;i<mastery.length;i++){
		mflag=0;
		for(j=0;j<mastery[i][4].length;j++){
			if( pdata[ mastery[i][4][j] ] >= 400000 )
				mflag++;
		}
		if(mflag == mastery[i][4].length)
			tmpLog += "<table cellpadding=0 cellspacing=0 style='margin-bottom:8px;'><tr>"
				+ "<td width=24 style='background-repeat:no-repeat; background-position:"
				+ eval(-1*24*i) + "px 0px; background-image:url(data/mst.png);'"
				+ " onclick='selectMastery("+i+",0);' title='�֘A�X�L�����|�C���g0�ɖ߂�'></td>"
				+ "<td>&nbsp;<b>" + mastery[i][1]
				+ "</b><br>&nbsp;" + mastery[i][2]
				+ "<br>&nbsp;<span class='exp'>" + mastery[i][3] + "</span></td></tr></table>";
	}
	document.getElementById("log").innerHTML = tmpLog;
}
function selectMastery(mnum,mpnt){
	for(i=0;i<mastery[mnum][4].length;i++){
		if( pdata[ mastery[mnum][4][i] ] < mpnt*10000 || mpnt == 0){
			if(!document.mcfrm.premium.checked)
				document.mcfrm.pnt[ mastery[mnum][4][i] ].value = mpnt + ".0";
			if(document.mcfrm.premium.checked)
				document.mcfrm.pnt[ mastery[mnum][4][i] ].value = mpnt + ".0000";
				document.getElementById('skl'+mastery[mnum][4][i]).style.backgroundPosition = Math.floor(mpnt*1.4) - 140 + "px 0px";
			pdata[ mastery[mnum][4][i] ] = mpnt * 10000;
		}
	}
	calc();
}
function setMastery(){
	tmpLog = "";
	for(i=0;i<mastery.length;i++){
		mflag=0;
		for(j=0;j<mastery[i][4].length;j++){
			if( pdata[ mastery[i][4][j] ] >= 400000 )
				mflag++;
		}
		tmpLog += "<table cellpadding=0 cellspacing=0 style='margin-bottom:8px;'><tr>"
			+ "<td width=24 style='background-repeat:no-repeat; background-position:"
			+ eval(-1*24*i) + "px 0px; ";
		if(mflag == mastery[i][4].length){
			tmpLog += "background-image:url(data/mst.png);'";
		}else{
			tmpLog += "background-image:url(data/mst2.png);'";
		}
		tmpLog += " onclick='selectMastery("+i+",40);' title='�֘A�X�L��40�܂Ń|�C���g��U��'></td>"
			+ "<td>&nbsp;<b>" + mastery[i][1]
			+ "</b><br>&nbsp;" + mastery[i][2]
			+ "<br>&nbsp;<span class='exp'>" + mastery[i][3] + "</span></td></tr></table>";
	}
	document.getElementById("log").innerHTML = tmpLog;
}

function setHtmlLayer(html){
	document.getElementById("option1").style.height = '650px';
	document.getElementById("option1").style.width = '960px';

	document.getElementById("option2").style.height = '610px';
	document.getElementById("option2").style.width = '660px';
	document.getElementById("option2").style.left = '20px';
	document.getElementById("option2").style.top = '20px';

//	alert(navigator.userAgent);
	if(navigator.userAgent.indexOf('MSIE') > 0 && navigator.userAgent.indexOf('Opera')<0){
		document.getElementById("option1").style.backgroundImage = 'url(data/black.png)';
	}else{
		document.getElementById("option1").style.backgroundImage = 'url(data/alpha.png)';
	}
	document.getElementById("option1").style.filter = "Alpha(opacity=30)";

	tmpMsg = "<div id='option3' style='background-color:#ccccdd; padding:15px;'><iframe name='sub' src='data/"+html+"' width=620 height=570 border=0 allowtransparency='true'></iframe></div>";
	document.getElementById("option2").innerHTML = tmpMsg;
}

function setAlertLayer(msg){
	document.getElementById("option1").style.height = '650px';
	document.getElementById("option1").style.width = '960px';

	document.getElementById("option2").style.height = '350px';
	document.getElementById("option2").style.width = '600px';
	document.getElementById("option2").style.left = '180px';
	document.getElementById("option2").style.top = '150px';

//	alert(navigator.userAgent);
	if(navigator.userAgent.indexOf('MSIE') > 0 && navigator.userAgent.indexOf('Opera')<0){
		document.getElementById("option1").style.backgroundImage = 'url(data/black.png)';
	}else{
		document.getElementById("option1").style.backgroundImage = 'url(data/alpha.png)';
	}
	document.getElementById("option1").style.filter = "Alpha(opacity=30)";

	tmpMsg = "<table cellpadding=0 cellspacing=0 border=0 width=600 height=350>"
		+ "<td align=center valign=center bgcolor='#ccccdd'>"
		+ msg
		+ "</td></table>";
	document.getElementById("option2").innerHTML = tmpMsg;
}

function offOptionLayer(){
	document.getElementById("option1").style.height = '0px';
	document.getElementById("option1").style.width = '0px';

	document.getElementById("option2").style.height = '0px';
	document.getElementById("option2").style.width = '0px';
	document.getElementById("option2").style.left = '0px';
	document.getElementById("option2").style.top = '0px';

	document.getElementById("option2").innerHTML = "";
}

function toPremium(){
	for(i=0;i<60;i++){
		tmp = pdata[i].toString();
		if(!document.mcfrm.premium.checked){
			if(pdata[i]<1000)
				point_str = "0.0";
			if(1000<=pdata[i] && pdata[i]<10000)
				point_str = "0." + tmp.charAt(0);
			if(10000<=pdata[i] && pdata[i]<100000)
				point_str = tmp.charAt(0) +"." + tmp.charAt(1);
			if(100000<=pdata[i] && pdata[i]<1000000)
				point_str = tmp.substring(0,2) +"." + tmp.charAt(2);
			if(pdata[i]==1000000)
				point_str = "100.0";
			pdata[i] = eval(point_str)*10000;
		}
		if(document.mcfrm.premium.checked){
			if(pdata[i]==0)
				point_str = "0.0000";
			if(0<= pdata[i] && pdata[i]<10)
				point_str = "0.000" + tmp;
			if(10<= pdata[i] && pdata[i]<100)
				point_str = "0.00" + tmp;
			if(100<= pdata[i] && pdata[i]<1000)
				point_str = "0.0" + tmp;
			if(1000<=pdata[i] && pdata[i]<10000)
				point_str = "0." + tmp;
			if(10000<=pdata[i] && pdata[i]<100000)
				point_str = tmp.charAt(0) + "." + tmp.substring(1,5);
			if(100000<=pdata[i] && pdata[i]<1000000)
				point_str = tmp.substring(0,2) + "." + tmp.substring(2,6);
			if(pdata[i]==1000000)
				point_str = "100.0000";
		}
		document.mcfrm.pnt[i].value = point_str;
	}
	calc();
}

