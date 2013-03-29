var premode = 0;
var pdata = new Array(60);
var ldata = new Array(60);
for(i=0; i < 60; i++){
	pdata[i] = 0;
	ldata[i] = 0;
}
var slotdata = new Array(17);

function prp(sklnum,val,clk){
	if(ldata[sklnum]!=2){
		switch(clk){
			case 0:
				val = val + document.body.scrollLeft;
				point = Math.floor(val/1.5)*10000;
				if(document.mcfrm.snap.checked)
					point = Math.round(point/100000)*100000;
				break;
			case 1:
				val = val + document.body.scrollLeft;
				point = Math.floor(val/1.5)*10000;
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

	barlen = Math.floor(1.5 * point/10000);

	document.mcfrm.pnt[eval(sklnum)].value = point_str;
	document.getElementById('skl'+sklnum).style.backgroundPosition = barlen - 150 + "px 0px";
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
function zoomBox(b,m){
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
		document.getElementById('skl'+i).style.backgroundPosition = "-150px 0px";
		if(!document.mcfrm.premium.checked)
			document.mcfrm.pnt[i].value = "0.0";
		if(document.mcfrm.premium.checked)
			document.mcfrm.pnt[i].value = "0.0000";
		document.getElementById("skl"+i).style.borderColor = "#ffff00";
	}
	document.mcfrm.race_list.selectedIndex = 0;
	calc();
	setAlertLayer("�S�ď����l�ɖ߂��܂����B<p><form><input type='button' value='����' onclick='offOptionLayer()'></form></p>");

}

function codeCopy(umode){
	code_race = document.mcfrm.race_list.selectedIndex;
	code = encode();

// URL��
	var url = "";
	url = "http://uniuni.dfz.jp/moeclc4/?" + code_race + "&" + code;
	document.mcfrm.code.value = url;

	if(umode==0){
		setAlertLayer("<br>URL�𒷉������ăR�s�[���Ă��������B<br><br><br><span style='-webkit-user-drag:element; -webkit-user-select:text'>" + url + "</span><br><br><br><form><input type='button' value='����' onclick='offOptionLayer()'></form></p>");
	}
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
	tmpTxt = "";
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
	setAlertLayer("<p>�ȉ��̃��X�g���R�s�[���Ă��������B</p><form name='asfrm'><textarea class='log2' name='list_dsp' rows=10 cols=30>" + tmpTxt + "</textarea><br><input type='radio' class='chk' name='list_mode' onclick='listMode(0)' checked>�X�L�����k�X���p�@<input type='radio' class='chk' name='list_mode' onclick='listMode(1)'>�Q�[���������p</form><form><input type='button' value='����' onclick='offOptionLayer()'></form></p>");
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

	if(mode == "cookie" || mode == null){
		num = document.mcfrm.slot.options[document.mcfrm.slot.selectedIndex].value;
		code = slotdata[num];
		setAlertLayer("�N�b�L�[���烍�[�h���܂��B(Slot "+num+")<p><form><input type='button' value='����' onclick='offOptionLayer()'></form></p>");
	}
	if(mode == "url"){
		code = top.location.search.substring(1);
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

// ����
		if(premode==0)
			document.mcfrm.premium.checked = false;
		if(premode==1)
			document.mcfrm.premium.checked = true;

		for(i=0; i<60; i++){
			document.getElementById('skl'+i).style.backgroundPosition = Math.floor(1.5 * pdata[i]/10000) - 150 + "px 0px";

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
		setAlertLayer("<form><table border=0><td><div style='font-size:14px;'>. (��`�܁߁߁߁߁߁�`��')<br>�@|_l_l__�߁߁߁߁�__l_l_|<br>(((߃��=�߁߁߁߁�=߃�� )))<br>�@ ((�߁߁�>you�߁߁�))<br>�@�@�@ ((�߁߁߁߁�))<br>�@�@�@ �@ ((�߁߁�))�@�@�޵��������<br>�@ �@ �@ �@�@((�߁�))<br>�@ �@ �@�@�@ �@�@((��))</div></td></table><br><input type='button' value='����' onclick='offOptionLayer()'></form>");


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
}
function init(){
	cookieTrap();

	tmp = getCookie("moeclc");
	for(i=0;i<17;i++)
		slotdata[i] = tmp.split("\|")[i];

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

function ls(sklnum){
	if(event.touches.length>1){
		switch(ldata[sklnum]){
			case 0:
				ldata[sklnum] = 2;
				document.getElementById("skl"+sklnum).style.borderColor = "#cc0000";
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
	[14,"�̌@","�}�C�i�[","�S�[���h�}�C�i�[","�}�C�����[�h"],
	[15,"����","�؂���","���̎t","�����o�[ ���[�h"],
	[16,"���n","�k��t","�_�v","�_���"],
	[17,"�ނ�","�ނ�l","�ނ�t","���l�ނ�t"],
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

	shiptable = "<div style='width:600px; padding:10px;'>"
		+ "<table cellpadding=5 cellspacing=0 class='tech'>\n";

	for(i=0; i<mastery.length; i++){
		shiptable += "<tr>\n"
			+ "<th rowspan=2 class='tech' width=100><a class='sk' href='JavaScript:selectMastery(" + i
			+ ",0);' title='�X�L��0�ɖ߂�'>" + mastery[i][0] + "</a></th>\n"
			+ "<td class='tech sp'><a class='ms' href='JavaScript:selectMastery(" + i + ",40); offOptionLayer();' title='�X�L��40�܂Ń|�C���g��U��'>"
			+ mastery[i][5][0] + "</a></td>\n"
			+ "<td class='tech sp'><a class='ms' href='JavaScript:selectMastery(" + i + ",70); offOptionLayer();' title='�X�L��70�܂Ń|�C���g��U��'>"
			+ mastery[i][5][1] + "</a></td>\n"
			+ "<td class='tech sp'><a class='ms' href='JavaScript:selectMastery(" + i + ",90); offOptionLayer();' title='�X�L��90�܂Ń|�C���g��U��'>"
			+ mastery[i][5][2] + "</a></td>\n"
			+ "</tr><tr>\n"
			+ "<td colspan=3 class='tech'><nobr>" + mastery[i][3] + "</nobr></a></td>\n"
			+ "</tr>\n";
	}

	shiptable += "</table>\n<br>\n<table cellpadding=5 cellspacing=0 class='tech'>\n";

	for(i=0; i<shiplist.length; i++){
		if(shiplist[i][0] == 0){
				shiptable += "<tr class='tech'><td colspan=4 style='font-size:0px;' class='tech'>�@</td></tr>\n";
		}else{
			shiptable += "<tr class='tech'>\n"
				+ "<th class='tech'><a class='sk' href='JavaScript:prp(" + shiplist[i][0]
				+ ",0,3);' title='�X�L��0�ɖ߂�'>" + shiplist[i][1] + "</a></th>\n"
				+ "<td class='tech sp'><a class='ms' href='JavaScript:prp(" + shiplist[i][0] + ",30,3); offOptionLayer();' title='�X�L��30�܂Ń|�C���g��U��'>"
				+ shiplist[i][2] + "</a></td>\n"
				+ "<td class='tech sp'><a class='ms' href='JavaScript:prp(" + shiplist[i][0] + ",60,3); offOptionLayer();' title='�X�L��60�܂Ń|�C���g��U��'>"
				+ shiplist[i][3] + "</a></td>\n"
				+ "<td class='tech sp'><a class='ms' href='JavaScript:prp(" + shiplist[i][0] + ",90,3); offOptionLayer();' title='�X�L��90�܂Ń|�C���g��U��'>"
				+ shiplist[i][4] + "</a></td>\n"
				+ "</tr>\n";
		}
	}

	shiptable += "</table>";

	shiptable += "</div></div>";

	document.getElementById("option1").style.height = '3300px';
	document.getElementById("option1").style.width = '640px';

	document.getElementById("option2").style.height = '3280px';
	document.getElementById("option2").style.width = '600px';
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

	tmpLog = ""; k=0;
	for(i=0;i<mastery.length;i++){
		mflag=0;
		for(j=0;j<mastery[i][4].length;j++){
			if( pdata[ mastery[i][4][j] ] >= 400000 )
				mflag++;
		}
		if(mflag == mastery[i][4].length && k<10){
			tmpLog += "<div style='width:24px; height:24px; background-repeat:no-repeat; background-position:"
				+ eval(-1*24*i) + "px 0px; background-image:url(data/mst.png); overflow:hidden; display:inline-table;'"
				+ " onclick='selectMastery("+i+",0);' title='�֘A�X�L�����|�C���g0�ɖ߂�'>&nbsp;</div> ";
			k++;
		}
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
				document.getElementById('skl'+mastery[mnum][4][i]).style.backgroundPosition = Math.floor(mpnt*1.5) - 150 + "px 0px";
			pdata[ mastery[mnum][4][i] ] = mpnt * 10000;
		}
	}
	calc();
}
function setMastery(){
	tmpLog = "<div style='padding:5px;'>";
	for(i=0;i<mastery.length;i++){
		mflag=0;
		for(j=0;j<mastery[i][4].length;j++){
			if( pdata[ mastery[i][4][j] ] >= 400000 )
				mflag++;
		}
		tmpLog += "<table cellpadding=0 cellspacing=0 style='margin-bottom:7px;'><tr>"
			+ "<td width=24 style='background-repeat:no-repeat; background-position:"
			+ eval(-1*24*i) + "px 0px; ";
		if(mflag == mastery[i][4].length){
			tmpLog += "background-image:url(data/mst.png);'";
		}else{
			tmpLog += "background-image:url(data/mst2.png);'";
		}
		tmpLog += " onclick='selectMastery("+i+",40); offOptionLayer();' title='�֘A�X�L��40�܂Ń|�C���g��U��'></td>"
			+ "<td>&nbsp;<b>" + mastery[i][1]
			+ "</b><br>&nbsp;<span style='font-size:11px;'><nobr>" + mastery[i][2]
			+ "</nobr><br>&nbsp;<span class='exp'>" + mastery[i][3] + "</span></span></td></tr></table>";
	}
	tmpLog += "</div>";
	document.getElementById("option1").style.height = '2180px';
	document.getElementById("option1").style.width = '320px';

	document.getElementById("option2").style.height = '2160px';
	document.getElementById("option2").style.width = '300px';
	document.getElementById("option2").style.left = '10px';
	document.getElementById("option2").style.top = '10px';

//	alert(navigator.userAgent);
	document.getElementById("option1").style.backgroundImage = 'url(data/alpha.png)';

	document.getElementById("option2").innerHTML = tmpLog;
}

function setAlertLayer(msg){
	document.getElementById("option1").style.height = '960px';
	document.getElementById("option1").style.width = '320px';

	document.getElementById("option2").style.height = '200px';
	document.getElementById("option2").style.width = '300px';
	document.getElementById("option2").style.left = '10px';
	document.getElementById("option2").style.top = '70px';

//	alert(navigator.userAgent);
	if(navigator.userAgent.indexOf('MSIE') > 0 && navigator.userAgent.indexOf('Opera')<0){
		document.getElementById("option1").style.backgroundImage = 'url(data/black.png)';
	}else{
		document.getElementById("option1").style.backgroundImage = 'url(data/alpha.png)';
	}
	document.getElementById("option1").style.filter = "Alpha(opacity=30)";

	tmpMsg = "<table cellpadding=0 cellspacing=0 border=0 width=300 height=200>"
		+ "<td align=center valign=center bgcolor='#ccccdd'>"
		+ msg
		+ "</td></table>";
	document.getElementById("option2").innerHTML = tmpMsg;
	window.scrollBy(0,-document.height);
}

function setConfirm(msg,fun1){
	document.getElementById("option1").style.height = '960px';
	document.getElementById("option1").style.width = '320px';

	document.getElementById("option2").style.height = '200px';
	document.getElementById("option2").style.width = '300px';
	document.getElementById("option2").style.left = '10px';
	document.getElementById("option2").style.top = '70px';

//	alert(navigator.userAgent);
	if(navigator.userAgent.indexOf('MSIE') > 0 && navigator.userAgent.indexOf('Opera')<0){
		document.getElementById("option1").style.backgroundImage = 'url(data/black.png)';
	}else{
		document.getElementById("option1").style.backgroundImage = 'url(data/alpha.png)';
	}
	document.getElementById("option1").style.filter = "Alpha(opacity=30)";

	tmpMsg = "<table cellpadding=0 cellspacing=0 border=0 width=300 height=200>"
		+ "<td align=center valign=center bgcolor='#ccccdd'>"
		+ msg
		+ "<p><form><input type='button' value='�͂�' onclick='" + fun1 + "' style='width:80px'>�@�@�@�@�@�@<input type='button' value='������' onclick='offOptionLayer()' style='width:80px'> </form></p>"
		+ "</td></table>";
	document.getElementById("option2").innerHTML = tmpMsg;
	window.scrollBy(0,-document.height);
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


var techlist = [
	[0,"�ؗ�"],
	[1,"�����Ȃ�"],
	[2,"�U�����"],
	[3,"������"],
	[4,"�m�\"],
	[5,"���v��"],
	[6,"���_��"],
	[7,"�W����"],
	[8,"������R��"],
	[9,"�����ϐ�"],
	[10,"���j"],
	[11,"���̉��"],
	[12,"���"],
	[13,"���R��"],
	[14,"�̌@"],
	[15,"����"],
	[16,"���n"],
	[17,"�ނ�"],
	[18,"���",[
		["�l",1,"�e�N�j�b�N��","-","ST","����"],
		[1,5,"�Z���X �g���W���[","-",20
			,"�������Ă���n�}���� ����܂ł̋�������ǂ���<br>���n�}��͂�(�h���b�O����)��Ԃ� �L���ꂽ���W�t�߂Ŏg�p����"],
		[1,0,"���","-",0
			,"�ʏ�ł͓ǂނ��Ƃ��ł��Ȃ���������ǂ���"],
		[1,0,"�n�}�쐬","-",0
			,"�Â���̒n�}����ǂ� �g�p�\�ȃg���W���[�}�b�v���쐬����<br>���y���𑕔����Ă���Ƃ��Ɏg�p�\"],
		[1,0,"����","-",10
			,"�Ώۂ̃X�e�[�^�X��m�邱�Ƃ��ł���B<br>����ǃX�L���������ق� ��葽���̑Ώۂ̃X�e�[�^�X��m�鎖���ł��܂��B<br>�������}�ӂ𑕔����Ă��鎞�Ɏg�p�\"],
		[1,0,"�Ӓ�","-",5
			,"���Ӓ�̃A�C�e�����Ӓ肵 ���ׂĂ̏��𖾂炩�ɂ���<br>���n���h���[�y�𑕔����Ă��鎞�Ɏg�p�\"]
	]],
	[19,"����"],
	[20,"�b��"],
	[21,"����"],
	[22,"�؍H"],
	[23,"�ٖD"],
	[24,"�򒲍�"],
	[25,"�����׍H"],
	[26,"����"],
	[27,"�͔|"],
	[28,"���e",[
		["�l",1,"�e�N�j�b�N��","-","ST","����"],
		[40,1,"�Z���t �V�����v�[","-",15
			,"�����̔��̉�����������Ƃ����Ƃ��ł���<br>�������ɂ̓V�����v�[���K�v�ł�"]
	]],
	[29,"�f��",[
		["�l",1,"�e�N�j�b�N��","-","ST","����"],
		[10,1,"�W���u","-",8
			,"���đ����ɑf�����p���`���J��o��<br>���G�̍s����j�Q����"],
		[20,1,"�`���[�W�h �t�B�X�g","-",11
			,"�͂𗭂߂ēG��������������邱�Ƃɂ��A<br>�K�[�h�Z�𖳎����ă_���[�W���ђʂ�����<br>����������� �X�^�������邱�Ƃ��ł���"],
		[40,1,"�T�N���t�@�C�X �t�B�X�g","-",19
			,"�Ȃ̓��̂𕐊�Ɖ����A�����I�ȃ_���[�W��^����<br>���U���̐����E�s�����Ɋւ�炸�������_���[�W���󂯂�"],
		[50,1,"�u���C���h �W���u","-",23
			,"��ʂ� �W���u��������������<br>�Ώۂ� ���E����莞�ԒD����<br>��NPC�́A�Ώۂ����������Ƃ�����"],
		[60,1,"�f�B�U�[�� �K�[�h","-",28
			,"�G���������Ă��镐����O���A���b�ԁA�E�ƍ��X���b�g�̑�����t���ւ��ł��Ȃ�������"],
		[70,1,"�C�����[�W���� �t�B���K�[","-",33
			,"�e�w�őΏۂ�A�ōU�����đS�g�ɐg�ɂ��Ă��鑕���i��S�ĒE����<br>�����̋Z�̎g�p�ɂ� �w�Ƀo�l���d���܂Ȃ���΂Ȃ�Ȃ�"],
		[80,2,"�X�p���^�� �t�B�X�g","-",33
			,"�Ώۂ̋C�̗͂𑝕������āA�q�b�g�E�|�C���g(HP)���񕜂���"],
		[80,0,"�u���b�c ���b�V��","-",38
			,"�f��ƃL�b�N�̘A���U�����J��o�����Ƃ��ł���<br>���f��݂̂ł������ł��邪�L�b�N�X�L���������ƃ_���[�W����������<br>�������ɕK�v��Buff�� �������:�i�b�N��"],
		[90,1,"��������","-",44
			,"�f��U���̋��ɉ��`<br>����ɖ����̃p���`�𗁂т��A�C�𗭂߂ĕ��o����<br>�r���ŋ�U�肷��ƁA�U���͎~�܂��Ă��܂�"]
	]],
	[30,"����",[
		["�l",1,"�e�N�j�b�N��","-","ST","����"],
		[20,1,"�`���[�W�h �X���b�V��","-",15
			,"�͂𗭂߂Č������G�Ɏa����邱�Ƃɂ�� �K�[�h�Z�𖳎����ă_���[�W���ђʂ�����<br>����������� �G���X�^�������邱�Ƃ��ł���"],
		[40,1,"�_�C�C���O �X�^�u","-",21
			,"�Ώۂ�������悤�ɂ��ē˂��h�� ����ȏ��������<br>���a��������_���[�W������"],
		[50,1,"�j���[���� �X�g���C�N","-",23
			,"���Ŏa����đ����h��l��������"],
		[60,2,"�G�N�Z�L���[�V����","-",28
			,"�W�����v�a��œG�̔]�V��@������ ��_���[�W��^����<br>���Z�������͖��h���ɂȂ�"],
		[60,0,"�u���X�g �X���b�V��","-",28
			,"�����̔@�� �Ώۂ֎a�����΂��U��<br>�������ɕK�v��Buff�� �������:�����O�\�[�h"],
		[70,1,"�\�j�b�N �X�g���C�N","-",33
			,"��ɂ��Ă��錕�𓊂��� ���ꂽ�G���U������<br>������������͎����Ă��܂�"],
		[80,4,"���@���L���[ �u���C�h","-",38
			,"�͈�t�G��؂�� ��_���[�W��^����<br>������̑������傫���Ȃ�"],
		[80,0,"�u�����f�B�b�V�� �r�[�g","-",38
			,"�����傫���U�肩�Ԃ�����̓G��ガ�����U��<br>�������ɕK�v��Buff�� �������:�O���[�g�\�[�h"],
		[80,0,"�f�X �~�X�`�F","-",38
			,"���_���Ώۂ̍s���𐧌�������<br>���_�ɖڂ�t����ꂽ���҂͎��E���Ղ�ꓦ���f�����Ƃ����ł��Ȃ��Ȃ�<br>�������ɕK�v��Buff�� �������:�T�C�X"],
		[80,0,"�A�[�X �u���E","-",38
			,"����Ȉ�U�肩�琶�ݏo���ꂽ�Ռ�����n���삯������<br>�������ɕK�v��Buff�� �������:�o�g���A�b�N�X"],
		[90,1,"�\�[�h �_���X","-",45
			,"�������Ă��镐��œG�̒��ڍU�����͂����Ԃ� �_���[�W��^����"]
	]],
	[31,"����ڂ�",[
		["�l",1,"�e�N�j�b�N��","-","ST","����"],
		[20,1,"�`���[�W�h �u�����g","-",11
			,"�͂𗭂߂ēG���������@�����邱�Ƃɂ�� �K�[�h�Z�𖳎����ă_���[�W���ђʂ�����<br>����������� �G���X�^�������邱�Ƃ��ł���"],
		[40,1,"�X�j�[�N �A�^�b�N","-",19
			,"�G�̑��ʂ�w�ォ��E�ъ�� �s�ӑł��œG�𖰂点��"],
		[50,1,"�j�[�g �N���b�V���[","-",23
			,"�Ώۂ̑����̑ϋv�x��啝�ɏ��Ղ�����U�����J��o���B���̋Z��H������҂́A�����ďC������҂��Ȃ���΂Ȃ�Ȃ��B"],
		[60,2,"�E�F�|�� �f�B�U�[��","-",28
			,"�G�̑������Ă��镐���@������<br>���̋Z���󂯂��v���C���[�� 1�b���炢�̊ԁA�E�ƍ��X���b�g�̑�����t���ւ��ł��Ȃ��Ȃ�"],
		[60,0,"���C���h �q�b�g","-",28
			,"�f�����R�A�ł��J��o��<br>�������ɕK�v��Buff�� �������:�E�H�[���C�X"],
		[70,1,"���H�[�e�b�N�X �z�C�[��","-",33
			,"���̏�ŉ�]���邱�Ƃɂ�� ����̓G�Ƀ_���[�W��^���Đ�����΂�"],
		[80,2,"�f�B�X���P�[�V����","-",36
			,"�G�̍��i��h�邪���_���[�W��^�� HP�EMP�̎��R�񕜂�j�~����"],
		[80,0,"�X�s���`���A�� �u�����g","-",38
			,"�������߂��Ӑg�̈ꌂ<br>�������ɕK�v��Buff�� ������ʁF�E�H�[�n���}�["],
		[90,1,"�N�E�F�C�N �r�[�g","-",39
			,"���葕���p�̂���ڂ��Œn�ʂ����ł� �n�������N����<br>�����͂ɂ���҂̃o�����X���o��D��"]
	]],
	[32,"��",[
		["�l",1,"�e�N�j�b�N��","-","ST","����"],
		[10,1,"�K�[�h �u���C�J�[","-",11
			,"�K�[�h�̌��Ԃ��ʂ��� �������_���[�W��^����"],
		[20,1,"�^�C�_�� �X�s�A�[","-",15
			,"��ނ�����ɑO���ɓ��ݍ��ݍU������"],
		[40,1,"�|�[�� �V�t�g","-",19
			,"���𗘗p���đO�����ɔ�яオ��"],
		[50,1,"�h���S�� �e�C��","-",23
			,"�Ώۂ̖h��� �K�[�h�̌��Ԃ�_���čU������"],
		[60,2,"�y�l�g���C�V����","-",28
			,"�_���[�W�͒Ⴂ���A���ꂽ�G�ɂ܂œ͂��ђʍU����^����"],
		[60,0,"���B�W�b�g �E�F�C�u","-",28
			,"�˂����Ă����� ���e�̍��g�������N���� �Ώۂ���������<br>�������ɕK�vBuff�� �������:�o�g���t�H�[�N"],
		[70,1,"�n���L�� �X�s�A�[","-",33
			,"�����̕����ђʂ����� ���̓G�Ɋ�P�U����^����"],
		[80,2,"�h���S�� �t�H�[��","-",38
			,"��W�����v���s�� �������ɋ󒆐������ē��ォ�瑄��˂����Ă�"],
		[80,0,"�o�[�� �s�[��","-",38
			,"�������ɕK�v��Buff�� ������ʁF�g���C�f���g"],
		[90,1,"�f�h���[ �z���E","-",45
			,"�_���[�W��^���Ȃ���O���ɓːi����"]
	]],
	[33,"�e��",[
		["�l",1,"�e�N�j�b�N��","-","ST","����"],
		[10,1,"�G�C�� �t�@�C�A�[","-",15
			,"���Ⴊ�݌�������<br>�ړ��͒x���Ȃ邪���������啝�ɏオ��<br>���W�����v�ŃL�����Z���\"],
		[20,1,"�A�T���g �t�@�C�A�[","-",11
			,"������������<br>�ړ��ł��Ȃ��Ȃ邪 ��𗦂Ƒϒn�������啝�ɏ㏸����"],
		[30,1,"�u���X�g �t�@�C�A�[","-",15
			,"�n�ʂɌ����ĕ����e�𔭖C����<br>�������Ō������ɔ�ѐ�����E�ł���"],
		[40,2,"�_�C�C���O �t�@�C�A�[","-",19
			,"�����e��\������ �����̎���̎҂ɑ�_���[�W��^����<br>�������e�͎g�����ɂȂ�Ȃ��Ȃ� ���g���������Ă��܂�"],
		[40,0,"�K�g�����O �V���b�g","-",20
			,"�e��ɂ��A�˂��\�ƂȂ�<br>���e������g���邽�߁@�������傫��<br>�������ɕK�v��Buff�� �K���i�[�̋Ɉ�"],
		[50,1,"�L���m�� �v���C�X�����g","-",23
			,"��C��A���@��Ȃǂ�ݒu����"],
		[60,2,"�L���m�� ���y�A","-",28
			,"�ݒu����Ă����C���C������"],
		[60,0,"�N�C�b�N �V���b�g","-",38
			,"�U���͂͒ቺ���邪�A�e��̃f�B���C��啝�ɒZ�k�ł���<br>�������ɕK�v��Buff�� �������:�h���[���� ���C�t��"],
		[70,1,"�L���m�� �N���b�V���[","-",33
			,"�ݒu���ꂽ�G�̑�C��j�󂷂�"],
		[80,2,"�L���m�� �R���g���[��","-",38
			,"��C�ɏ�荞�ݒe�𔭎˂���<br>����C�̌������b�Ɏ���� �h��͂ƍU���͂��㏸���邪�������̒�R�͂ƈړ����x�͗�����<br>���W�����v����Ƒ�C����o�邱�Ƃ��ł���"],
		[80,0,"�L���m�� �f�B�X�`���[�W","-",45
			,"��荞�񂾑�C������͂��������ދ��͂ȑ�C�̒e�𔭎˂���<br>�w�L���m�� �R���g���[���x�������ɂ̂ݎg�p�\"],
		[90,1,"�}�b�X�� �L���m��","-",45
			,"��C�Ƀp�[�e�B�����o�[���l�߂ĉ����֔�΂�"]
	]],
	[34,"�|",[
		["�l",1,"�e�N�j�b�N��","-","ST","����"],
		[20,1,"�o���N �V���b�g","-",11
			,"�����̖��A�����Ď˂�<br>���X�L���㏸�Ƌ��ɉ񐔂�������"],
		[40,1,"�W���b�W�����g �V���b�g","-",19
			,"�G�ɖ���˂��Ɉ�Ȃ𗎂Ƃ�"],
		[50,1,"�\�j�b�N �A���[","-",23
			,"�L�������W�͒Z�����A�З͂������K�[�h���ђʂ���U��"],
		[60,2,"�z�[�v���X �V���b�g","-",28
			,"�Ώۂ̕���ɕt������Ă���G���`�����g����������"],
		[60,0,"�V���h�E �o�C���h","-",28
			,"���ڃ_���[�W�͊��҂ł��Ȃ����A�Ώۂ̓������~�߂鎖���ł���<br>�������ɕK�v��Buff�� �������:�R���|�W�b�g �{�E"],
		[70,1,"�z�[�N�A�C �V���b�g","-",33
			,"��̖ڂ̂悤�ɉs���G���ɂ݂��A�ڎ��ł���M���M���̋����܂Ŗ���΂�"],
		[80,1,"�V�[�� �V���b�g","-",38
			,"�Ώۂɋ|�_���[�W��^���A�X�ɃX�y���u�b�N�Ƀ`���[�W����Ă��閂�@����������<br>�X�L���g�p�����ړ��\"],
		[90,1,"�S���S�^ �V���b�g","-",45
			,"�p�[�e�B�����o�[�̗͂��؂�A�G��˂��������𔭎˂���"]
	]],
	[35,"��",[
		["�l",1,"�e�N�j�b�N��","-","ST","����"],
		[1,1,"�V�[���h �K�[�h","-",5
			,"���ڍU����h�� �_���[�W�����炷"],
		[10,1,"�X�p�C�N �A�^�b�N","-",11
			,"�����������œG�����ł���<br>������AC�������قǑ�_���[�W��^���܂�"],
		[20,1,"�o�b�V��","-",15
			,"���œG�̒��ڍU���𒵂ˏ����āA�G�𖳖h���i��N���e�B�J�����㏸�j�ɂ�����"],
		[30,1,"�X�^�� �K�[�h","-",15
			,"���ڍU����h���A�_���[�W�����炷<br>����������ƓG�̓X�^����ԂɂȂ�"],
		[40,1,"�C���p�N�g �X�e�b�v","-",21
			,"���œG�̒��ڍU����e����΂��A�ԍ������L����"],
		[50,1,"�o���f�b�g �K�[�h","-",23
			,"�G���������������U�������Ŏ󂯎~�߂āA�����Ă����e�����D����B"],
		[60,1,"�J�~�J�[","-",27
			,"���ɐg���B�� �K�[�h�����܂܈ړ�����<br>���ڍU���̂݃K�[�h�\<br>����������ƓG�̓X�^����ԂɂȂ�"],
		[70,1,"���x���W �K�[�h","-",33
			,"�����Ɍ����đł��ꂽ���ڍU���Ɩ��@�̃_���[�W�����Œ��˕Ԃ�"],
		[80,1,"�}�W�b�N �K�[�h","-",33
			,"�����Ɍ������ĕ����ꂽ���@���A���ŋz������<br>�����S����ɐ�������ƁA�G�����������@�̃R�X�g���z������<br>AVOID�������̂݁A�_���[�W�y����MP�z���̌��ʂ���������"],
		[90,1,"�V�[���f�B���O �I�[��","-",36
			,"�V�[���h�K�[�h�̃I�[���𔭂�<br>�߂��ɂ��钇�Ԃ����"]
	]],
	[36,"����",[
		["�l",1,"�e�N�j�b�N��","-","ST","����"],
		[1,1,"�X���E","-",9
			,"���Ă��p�̕���� �G�ɓ�������"],
		[20,1,"�u���C���h �X���E","-",15
			,"���z�⌎�̌��𔽎˂����Ώۂ̖ڂ�ῂ܂��Ȃ��瓊�Ă�����𓊂�����"],
		[30,1,"�~���I�l�A �V�����[","-",15
			,"�����̏�������G�ɓ�������B<br>�Ώۂɂ����̖S�҂������ꍇ�ɂ́A�������������E�����Ƃ��Ă��܂��B<br>�Z�̔����ɕK�v�Ȃ���50G"],
		[40,1,"���s�b�h �X���E","-",21
			,"�ΏۂɍU�����ђʂ����� ����ɂ���G�ɂ��_���[�W��^������"],
		[60,1,"�V���h�E �X�g���C�N","-",24
			,"�Ώۂ𓊂��_���[�W��^������ �����̎p��ῂ܂�"],
		[70,1,"�o�j�b�V�� �N���E�h","-",33
			,"���c�q�𑫌��ɒ@�����ĉ����o��������<br>���p��ῂ܂��Ă���Ԃ͋Z�̔����������Ȃ��Ă���̂ŁA��P�U���̃`�����X"],
		[80,1,"�_�u�� �X���E","-",38
			,"��x��2�̓�������𓊂��邱�Ƃ��ł���"],
		[90,1,"�V���h�E �X�e�B�b�`","-",33
			,"�Ώۂ̉e���ˎ~�߂� �g�������Ƃ�Ȃ��悤�ɂ���"]
	]],
	[37,"��",[
		["�l",1,"�e�N�j�b�N��","-","ST","����"],
		[1,1,"�o�C�g","-",5
			,"�G�ɋ������݂� �_���[�W��^����"],
		[20,1,"�u���b�h �T�b�N","-",11
			,"�ΏۂɌ��������݂� �z�����������HP���񕜂���"],
		[30,1,"�n���K�[ �o�C�g","-",15
			,"�ΏۂɊ��ݕt���āA�A���������󕠂ɂ�����<br>�U���X�s�[�h�������x���Ȃ�"],
		[40,1,"���[�E���t","-",19
			,"�T�ɕϐg���� ����Ȑg�̓�����g�ɂ���<br>���͂����������ɁA��𗦂Ƒϕ���������������"],
		[50,1,"�O�[�� �t�@���O","-",23
			,"������h�点���ꌂ�� �G���}�q������"],
		[60,1,"�u���b�h �V�F�A�[","-",28
			,"�l�^�̑ΏۂɊ��ݕt�� ��莞�Ԃ��������̎x�z���ɂ���"],
		[70,1,"�n�b�L���O �o�C�g","-",33
			,"�ΏۂɊ��ݕt�� �������Ă���Buff��Debuff���ʂ�2�D�����"],
		[80,1,"�o�b�g �t�H�[��","-",38
			,"��莞�ԃR�E�����ɕϐg���A����ׂ�悤�ɂȂ�<br>���ʒ���Buff�̌��ʎ��Ԃ���������"],
		[90,1,"�u���b�h ���C��","-",45
			,"�z��������������ɕ��˂��Č��̒r����� �G�����т��񂹂�<br>�����񂹂�ꂽ�G�́A�X�^�~�i�����Ղ��Ă���"]
	]],
	[38,"�",[
		["�l",1,"�e�N�j�b�N��","-","ST","����"],
		[1,1,"�o�[�j���O �v�����g","-",9
			,"�R��������n�ʂɐA���� ���͂����ŕ��"],
		[10,1,"�|�C�Y�� �v�����g","-",8
			,"�Ō��ʂ̂������A���� ���͂�łɐN��"],
		[20,1,"�T�v���C�Y �v�����g","-",11
			,"�G�̋߂��Ŏ��h��ɔ������� �G�𓦖S������"],
		[30,1,"�t�H�O �v�����g","-",15
			,"�킩�疶�𔭐����� �G�̎��E���Ղ�"],
		[40,1,"�R�[�} �v�����g","-",19
			,"�×܃K�X�𔭐����� �Ώۂ𐇖���ԂɊׂ��"],
		[50,1,"�}�X�L���O �V�[�h","-",23
			,"㩂��B���ēG�Ɏ@�m����Ȃ��悤�ɂ���"],
		[60,1,"�{�[�����O","-",28
			,"�ڂ̑O�ɂ���㩂�]����<br>���G���A����㩂��]�������Ƃ��\�ł�"],
		[70,1,"�n�[�x�X�g �v���C","-",33
			,"�F��̗͂Őݒu����㩁i��j���}���������A���ʂ𑦎�����������"],
		[80,1,"�}�C�� �X�E�B�[�v","-",38
			,"����ɐݒu���ꂽ�G��㩂���������"],
		[90,1,"�o�O�Y �f���o���[","-",45
			,"�������̗͂��؂� 㩂������̋߂��ɉ^��ł��炤"]
	]],
	[39,"�L�b�N",[
		["�l",1,"�e�N�j�b�N��","-","ST","����"],
		[1,1,"���E �L�b�N","-",5
			,"�G�̑�����_���� �f�����R����J��o��"],
		[10,1,"�w���N���X �V���[�g","-",8
			,"�Ώۂ��{�[���Ɍ����ĂāA�v���؂�R���΂�"],
		[20,1,"�T�C�h �L�b�N","-",11
			,"���i�R����J��o�� �G��]�΂��Č������ɂ�����"],
		[30,1,"���b�O �X�g�[��","-",15
			,"�A�����ēG���R��� �G��HP�ƃX�^�~�i�����炷<br>����NPC�ł͈ړ����x���ቺ������"],
		[40,1,"�u���C�� �X�g���C�N","-",19
			,"�G�̔]�V�ɂ����Ƃ�U�艺�낵 �}�i�E�|�C���g(MP)�����炷"],
		[50,1,"���{���g �L�b�N","-",23
			,"�L�b�N�𓖂Ă������� �G����낯�����ĐK�݂�������B<br>�Ώۂ�Buff���ʂ��Â����̂���P������"],
		[60,1,"�V���A�� �V���[�g","-",28
			,"������ւ̃_���[�W���肪��������R����J��o��"],
		[70,1,"�h���b�v �L�b�N","-",33
			,"�_���[�W��^������_�E��������"],
		[80,1,"�g���l�[�h","-",38
			,"�񂵏R����J��o���� �l���̓G���U������"],
		[90,1,"���[�� �{���[�W","-",45
			,"�G�����ɏR��グ�� �R��̂ق��ɗ����_���[�W���^����<br>�iNPC�ɑ΂��Ă͌Œ�̒ǉ����@�_���[�W������܂��B�v���C���[�ɑ΂��Ă͗����_���[�W������悤�ɂȂ�\��ł��B�j"]
	]],
	[40,"�퓬�Z�p",[
		["�l",1,"�e�N�j�b�N��","-","ST","����"],
		[1,1,"�v���[�`","-",5
			,"�G���Ȃ��߂Đ�ӂ�r��������<br>���ΐl��ł͑���̐퓬��Ԃ���������"],
		[10,1,"�^�b�N��","-",8
			,"�G�ɑ̓���������킹 ��ނ�����"],
		[20,1,"�^�E���g","-",11
			,"�G�𒧔��� �����ɒ��ӂ��䂫����"],
		[30,1,"�o�[�T�[�N","-",15
			,"�ꎞ�I�ɖ\����ԂɂȂ�U���͂ƍU���X�s�[�h�����܂�<br>���o�[�T�[�N��Ԃ̊Ԃ́AHP/MP/ST�̎��R�񕜂���~����"],
		[40,1,"�G�N�\�V�Y��","-",19
			,"�׈��ȋC���P�� �����ɂ�����ꂽ�ł��V�����X�e�[�^�X�_�E�����ʂ�1�����ɂ���<br>���ŁE�􂢁E�X�^���E����EDoT�_���[�W�͉����ł��܂���"],
		[50,1,"�i�C�g �}�C���h","-",23
			,"�U���̖�������啝�ɏ㏸������"],
		[60,1,"�o�[�T�[�N �I�[��","-",28
			,"�p�[�e�B�����o�[�S�����o�[�T�N��Ԃɂ���<br>���ʒ���AC�Ɩ��͂��啝�Ɍ�������<br>���񕜂����ƌ��ʂ͉��������"],
		[70,1,"�J���t�[ �\�E��","-",33
			,"���C���U���̃N���e�B�J�����������㏸������<br>�����ʒ��͎�����R�͂��ቺ���܂��B"],
		[80,1,"�T�����C �n�[�g","-",38
			,"�G�̖h��͂� ��莞�ԑ啝�Ɍ���������"],
		[90,1,"�Z���X �I�u �����_�[","-",45
			,"�ړ����Ȃ��甭���ł��Ȃ��ꕔ�̍U�����ړ����Ȃ���ł��J��o����悤�ɂ���"]
	]],
	[41,"����",[
		["�l",1,"�e�N�j�b�N��","-","ST","����"],
		[1,1,"�{�[�����X","-",5
			,"��������Ԃŗ\���s�\�ȓ��������čU�������킷<br>�����ʏI����A���������o���Ă��܂�"],
		[10,1,"���J�o�[ �Z���X","-",8
			,"�����̊���������@���� ��������܂�<br>���������������ȂǂɎg�p����"],
		[20,1,"�}�C�e�B�[ �O���u","-",11
			,"�G�̑����ɂ܂Ƃ��� �����𕕂���"],
		[30,1,"�X�g�[�� �}�b�X��","-",15
			,"�̂�΂̂悤�Ɍ������S�Ă̍U�������m���Ŗ���������"],
		[40,1,"�Z���X���X","-",19
			,"���񂾂ӂ�����ēG���\��<br>���Q�Ă���Ԃ� HP�񕜑��x���㏸���邪�h��͂�������"],
		[50,1,"�f�B�U�X�^�[ �i�b�v","-",23
			,"���𕢂������Ȃ�قǑ傫�ȃC�r�L������ �G�̍U����W�Q����<br>�i�_���[�W���󂯂邱�ƂŁA���ʂ͉��������j"],
		[60,1,"�h�u���N �X�v���C","-",28
			,"���𐁂��t�� �͈͓��ɂ���Ώۂ�Buff���ʂ��Â����̂���P������"],
		[70,1,"�r�b�O�o�� �t�B�X�g","-",33
			,"�D��������ԂŘr��U��� ���͂̓G���U������<br>���͈͍U���̌���"],
		[80,1,"�t���C�� �u���X","-",38
			,"���Ɏ����܂� �G�ɉ��𐁂��t����<br>���A���R�[���x���̍��������K�v"],
		[90,1,"�L���~�Y �p�b�V����","-",45
			,"�p�[�e�B�̃X�^�~�i���z���� ����ȃG�l���M�[�e�𔭓�����<br>���G�l���M�[�𒙂߂���ɍU�����󂯂�� ���ʂ��~�܂��Ă��܂�"]
	]],
	[42,"���܂�",[
		["�l",1,"�e�N�j�b�N��","-","ST","����"],
		[1,1,"�A�~�e�B �~�~�b�N","-",9
			,"�G�̐��F��^���� �����ɒ��ӂ���������"],
		[20,1,"�R�[�����O �~�~�b�N","-",11
			,"�Ώۂ̋߂��ɂ���S�Ă̓G�̒��ӂ���������"],
		[30,1,"�}�[���C�h �~�~�b�N","-",15
			,"��莞�ԁA�j���X�s�[�h���㏸����"],
		[40,1,"�X�P�[�v�S�[�g �~�~�b�N","-",21
			,"��莞�ԁA�S�Ẵ_���[�W�� �ĎR�q�ɐg����ɂ�����"],
		[50,1,"�l�C�`���[ �~�~�b�N","-",23
			,"����̕��i�ɗn������ �p���B��"],
		[60,1,"�n���L�� �~�~�b�N","-",28
			,"�����̕����a��@���񂾂ӂ������<br>���_���[�W�͎󂯂邪�@���ȂȂ���Ή񕜂���<br>�����񂾐U������Ă���ԂɁ@�s�����Ƃ�ƋZ�̌��ʂ̓L�����Z�������"],
		[70,1,"�~���[�W�� �~�~�b�N","-",33
			,"�����Ƀ\�b�N���̕��g���o������ �G��f�킹��"],
		[80,1,"�V���h�E �n�C�h","-",38
			,"�Ώۂ̉e�ɐ��� �������"],
		[90,2,"�`���[�� �_���X","-",45
			,"�g�ɂ��Ă��鑕����E���� �G��f�킷"],
		[90,0,"�Z�u�� �\�E���Y","-",53
			,"SGK�̕��g��7�̓����ɏ������U������<br>�g�p�A�C�e���F�����̕�"]
	]],
	[43,"����",[
		["�l",1,"�e�N�j�b�N��","-","ST","����"],
		[1,1,"�A�j�}�� �t�F�C�^���C�Y","-",5
			,"��������Ȃ����]�킹��<br>���x�����������Ƃ��o����"],
		[10,1,"�`�F���b�V���O","-",8
			,"��������߂ăy�b�g���Ȃ� �q�b�g�E�|�C���g(HP)���񕜂�����"],
		[20,1,"�`�A�[ �V���b�g","-",11
			,"�y�b�g�ɋC�������ċ���������"],
		[30,1,"���[�V�b�v �l�C�`���[","-",15
			,"�傢�Ȃ鎩�R�̗͂��؂� ���S�����y�b�g�𐶂��Ԃ点��"],
		[40,1,"�e���[ �E�B�b�v","-",5
			,"��ňЊd�� �G�̏����y�b�g��ǂ�����"],
		[50,1,"�}���J�C���h �t�F�C�^���C�Y","-",23
			,"�l�^�̓G�𒲋����]�킹��"],
		[60,1,"�p�t�H�[�~���O �E�B�b�v","-",28
			,"�y�b�g�ɓ���U����������<br>���y�b�g������U�����g�����Ԃ̎��̂ݔ�������"],
		[70,1,"�~���N�� �P�C�W","-",28
			,"�y�b�g���A�C�e��������"],
		[80,1,"�h���S�� �t�F�C�^���C�Y","-",38
			,"�n��ŋ���搂��闳�����]�킹��"],
		[90,1,"�h�~�j�I��","-",45
			,"�����y�b�g�ɏ��ڂ��� �y�b�g�𑀍�ł���悤�ɂ���<br>�����ڂ��Ă���� �y�b�g�ɕ��S�������菙�X��HP���������Ă���"]
	]],
	[44,"�j�󖂖@",[
		["�l",1,"�e�N�j�b�N��","�G�}","MP","����"],
		[1,2,"�}�C�i�[ �o�[�X�g","ND1",5
			,"�����ȉ΂̋ʂ𐶂ݏo���� �G�ɂԂ���"],
		[1,0,"���g�� �c�C�X�^�[","ND1",5
			,"�˕��������N���� �_���[�W��^����<br>���ΏۂƂ̋����ɂ�薂�@�̃q�b�g����������"],
		[10,2,"�A�C�X �{�[��","ND2",9
			,"�G�ɕX�̒e���Ԃ���"],
		[10,0,"�|�C�Y�� �~�X�g","ND2",9
			,"�ł̖��𔭐����� �G��ŏ�Ԃɂ���"],
		[20,2,"�u���C�Y","ND3",13
			,"�Β��𔭐����� �G�Ɍp���I�ȃ_���[�W��^����"],
		[20,0,"�V���b�N�{���g","ND3",13
			,"�d���Ń_���[�W��^����"],
		[30,2,"�t���[�Y","NP1",18
			,"�G�𓀂点�ă_���[�W��^�� �ړ����x��x������"],
		[30,0,"�|�C�Y�� ���C��","NP1",18
			,"�ł̉J���~�点 �G�ɋ���ȓł̌��ʂ�^����"],
		[40,2,"�I�[�u��","NP2",23
			,"�Ώۂ̎���ɉ΍Ђ𔭐����� �p�������_���[�W��^���ďĂ��s����"],
		[40,0,"�\�j�b�N �P�C�W","NP2",23
			,"�ΏۂɃ_���[�W��^�� ����ɂ���G�ɂ� �_���[�W��`�B������<br>���ő�HP�������G�قǃ_���[�W�ʂ�������"],
		[50,2,"�T���_�[�{���g","NP3",28
			,"���𗎂Ƃ� �_���[�W�Ɩ�Ⴢ̌��ʂ�^����"],
		[50,0,"�X�^�[�_�X�g","NP3",28
			,"�󂩂疳���̐������~�点 �G�ɂԂ���<br>�����ԍ����@"],
		[60,2,"�o�[�X�g","NQ1",34
			,"���̋ʂ𐶂ݏo���� �G�ɂԂ���"],
		[60,0,"�u���U�[�h","NQ1",34
			,"�X�̗������N�����đ�_���[�W��^�� �ړ����x��x������"],
		[70,2,"�X�g�����O �{���g","NQ2",40
			,"����ȗ�����]�V�ɗ��Ƃ� �_���[�W�Ɩ�Ⴢ̌��ʂ�^����"],
		[70,0,"�|�C�Y�� �N���E�h","NQ2",40
			,"�ł̖��𔭐����� �͈͓��̓G�� �p���I�ȃ_���[�W��^����"],
		[80,2,"���K �o�[�X�g","NQ3",46
			,"����ȉ����Q�����������N���� �G�ɑ�_���[�W��^����"],
		[80,0,"�t���[�Y�� �r�[��","NQ3",46
			,"�����_���[�W��^���Ώۂ𓀌�������<br>���������̓N���e�B�J����啝�Ɏ󂯂₷���Ȃ�"],
		[90,4,"���e�I�X�g���C�N","PNQ1",53
			,"�����覐΂̌ł܂�𓪏�ɗ��Ƃ�<br>�����ԍ����@"],
		[90,0,"�J�I�X �t���A","PNQ1",53
			,"�����镉�̗v�f��������������Ȕ������N�����A�Ώۂ�Ռ`���Ȃ�������΂�"],
		[90,0,"�A�N�A �c�C�X�^�[","OP1",53
			,"WGK ������ ���̌Ñ㖂�@<br>��C���̐������� ���K�͂̐��̉Q�����o��"],
		[90,0,"�f�B�o�C�� �X�p�[�N �{�[��","OP1",53
			,"�ӎv�������ē������̋��� �����ʂɓG���P��"]
	]],
	[45,"�񕜖��@",[
		["�l",1,"�e�N�j�b�N��","�G�}","MP","����"],
		[1,2,"�Z���t �q�[�����O","ND1",5
			,"���͂ɂ���Ď��g��HP���񕜂���"],
		[1,0,"�^�[�� �A���f�b�h","ND1",5
			,"�A���f�b�h�n�̓G���������牓������"],
		[10,2,"�}�C�i�[ �q�[�����O","ND2",9
			,"���͂ɂ����HP����"],
		[10,0,"�}�C�i�[ ���o�C�^��","ND2",9
			,"�Ώۂɐ��C�𐁂����݃X�^�~�i���񕜂�����"],
		[20,2,"�A���`�h�[�g","ND3",13
			,"�����������򉻂� �ł����S�ɒ��a����"],
		[20,0,"�L���A �f�B�Y�B�[�Y","ND3",13
			,"���Ȃ�͂őΏۂ̕a�C�����S�Ɏ���"],
		[30,2,"���C�g �q�[�����O","NP1",18
			,"���͂ɂ����HP�𒆒��x�񕜂���"],
		[30,0,"�L�����Z���}�W�b�N","NP1",18
			,"�X�e�[�^�X�_�E�����ʂ�ł�����<br>����������ꍇ�ŏ��ɂ�����ꂽ���̂�����<br>���ŁE�p���_���[�W�E�X�^���Ȃǂ͉����ł��Ȃ�"],
		[40,2,"���t���b�V��","NP2",23
			,"�Ώۂ̃X�^�~�i��HP���񕜂���"],
		[40,0,"���X�g �C�� �s�[�X","NP2",23
			,"�A���f�b�h�n�̓G�� �_���[�W��^����"],
		[50,2,"�q�[�����O","NP3",28
			,"���͂��g�� HP��啝�ɉ񕜂���"],
		[50,0,"���o�C�^��","NP3",28
			,"�G�l���M�[�𒍓����A�Ώۂ̃X�^�~�i���񕜂���"],
		[60,2,"�O���[�v �q�[�����O","NQ1",34
			,"�����̋߂��ɂ���p�[�e�B�[�����o�[���񕜂���"],
		[60,0,"�R���f���X�}�C���h","NQ1",34
			,"�Ώێ҂�MP�񕜗����㏸������"],
		[70,2,"���W�F�l���C�V����","NQ2",40
			,"��莞�Ԗ���HP�������񕜂���"],
		[70,0,"�f�B�o�C�� �V�����[","NQ2",40
			,"�󂩂�_�X���������Ăъ� �S�ẴX�e�[�^�X�_�E����ł�����"],
		[80,2,"�q�[�����O �I�[��","NQ3",46
			,"���͂ɂ����HP��S�񕜂���<br>���g�p�҂̃X�L���l�ƃ^�[�Q�b�g��HP�c�ʂɂ���ẮA�S�񕜂��Ȃ����Ƃ�����܂��B"],
		[80,0,"���o�C�^�� �I�[��","NQ3",46
			,"�G�l���M�[�𒍓����A�Ώۂ̃X�^�~�i��S�񕜂���<br>���g�p�҂̃X�L���l�ƃ^�[�Q�b�g�̃X�^�~�i�c�ʂɂ���ẮA�S�񕜂��Ȃ����Ƃ�����܂��B"],
		[90,2,"�Z�C�N���b�h �T�[�N��","PNQ1",53
			,"�r���҂̎���ɐ��Ȃ���𔭂� �߂��ɂ���҂̏������"],
		[90,0,"���U���N�V����","PNQ1",100
			,"���Ȃ鑧���Ŏ��҂�h��������"]
	]],
	[46,"�������@",[
		["�l",1,"�e�N�j�b�N��","�G�}","MP","����"],
		[1,2,"�}�i �G�X�P�[�v","ND1",5
			,"��n�̐���̗͂��؂� �G��MP��n�ʂɋz��������"],
		[1,0,"�t���[�Y �u���b�h","ND1",5
			,"�G�̌��t�𓀂点 �ő�HP��������"],
		[10,2,"�u���C���h �T�C�g","ND2",9
			,"�G�̎��E���Ղ� ���ڍU���̖�������������"],
		[10,0,"�X�s���b�g �����B�[��","ND2",9
			,"����̗͂��؂�� �G�̖h��͂�������"],
		[20,2,"�G�����C�e��","ND3",13
			,"���ڍU���̋Ɉӂ����� ����̖��������グ��"],
		[20,0,"�N�C�b�N�j���O","ND3",13
			,"�Ώۂ̓��̎��͂������� ��𗦂��グ��"],
		[30,2,"�X�s���b�g �K�[�h","NP1",18
			,"����̉���𓾂� �h��͂����߂�"],
		[30,0,"���B�K�[","NP1",18
			,"�Ώۂ̗͂�����@���ڍU���͂��㏸����"],
		[40,2,"�o�u�� �{�[��","NP2",23
			,"�_�f�̋C�A������� �����ł��ċz�ł���悤�ɂȂ�"],
		[40,0,"���C�W���O","NP2",23
			,"�ו��̏d�������ʂ܂Ń[���ɂȂ�"],
		[50,2,"�}�C���h ���b�V��","NP3",28
			,"���_�͂������� �Ώۂ̍ő�MP���グ��"],
		[50,0,"�u���b�h ���b�V��","NP3",28
			,"�̓��̌��t�𕦓����� �Ώۂ̍ő�HP���グ��"],
		[60,2,"�X�e�B�[�� �u���b�h","NQ1",34
			,"�̓��̌��𕦓����� �ꎞ�I�ɑ��𑁂�����<br>�����ʌp�����̓X�^�~�i�����������葱����"],
		[60,0,"�C�����B�W�r���e�B","NQ1",34
			,"��莞�Ԏp����������<br>���s�����N�����ƌ��ʂ͐؂��"],
		[70,2,"�z�[���[ �K�[�h","NQ2",40
			,"�����̎���̒��Ԃ𐹂Ȃ�͂ŕ�ݍ��� ���ڍU���ɑ΂���h��͂��グ��"],
		[70,0,"�f�B�o�C�� �V�[���h","NQ2",40
			,"�_���[�W�ʂ̑召���킸 1�����̖��@�𖳌�������"],
		[80,2,"�E���e�B���C�g �w���X","NQ3",46
			,"��莞�� �ő�HP��HP���R�񕜗ʂ��啝�ɏ㏸����"],
		[80,0,"�V�[ �C�����B�W�u��","NQ3",46
			,"������Ԃ̎҂����j�邱�Ƃ��o����"],
		[90,2,"�G�������^�� �A�[�}�[","PNQ1",53
			,"����̗͂𖡕��ɂ��邱�Ƃɂ�� �n���Ε������̖��@�ϋv�x���オ��"],
		[90,0,"�g�����X�t�H�[��","PNQ1",53
			,"����̗͂��؂� �g�̔\�͂�ω�������<br>�ő�MP�Ɩ��@�͂��]���ɖ������Ɩh��͂�啝�ɏ㏸������<br>���W�����v����ƌ��̎p�ɖ߂�"]
	]],
	[47,"�_�閂�@",[
		["�l",1,"�e�N�j�b�N��","�G�}","MP","����"],
		[0,2,"�z�[���[���C�g ���b�h","ND1",5
			,"�g�������̗͂����"],
		[0,0,"�z�[���[���C�g �O���[��","ND1",5
			,"�₳�������̗͂����"],
		[1,2,"���C�g","ND1",5
			,"���͂ɂ���Ė�����𓔂�"],
		[1,0,"���G�[�W�F���g �A���P�~�[","ND1",5
			,"�m�A�_�X�g����m�A�p�E�_�[����肾��"],
		[10,2,"���R�[�� �h�����N","ND2",9
			,"���ݕ�����������"],
		[10,0,"���R�[�� ���C�V����","ND2",9
			,"�H�ו�����������"],
		[20,2,"�t���C�� �u���C�h","ND3",13
			,"����ɉ����h�点 ��������ǉ�����<br>���v���C���[�̃��C���U���ɂ̂ݑ�����t������"],
		[20,0,"�\�[�� �X�L��","ND3",13
			,"�̂Ɏh�𔭐������A���ڍU���Ŏ󂯂��_���[�W�̈ꕔ�𑊎�ɒ��˕Ԃ�<br>���_���[�W���󂯂�ƌ��ʂ͏����Ă��܂�"],
		[30,2,"�X���[�� ���[�v","NP1",18
			,"�ΏۂƓ����ʒu�ɏu�Ԉړ�����"],
		[30,0,"���R�[�� �X�g�[�� �E�H�[��","NP1",18
			,"��Ԃɋ���ȕǂ��o������ �ʘH���Ւf����"],
		[40,2,"�f�B�X�y�� �T����","NP2",23
			,"�������ꂽ�y�b�g���ً�Ԃɔ�΂��ď�������"],
		[40,0,"���X�����C�Y","NP2",23
			,"�G�𖰂点�s���s�\�ɂ���"],
		[50,2,"�t���[�Y �u���C�h","NP3",28
			,"����ɗ�C���h�点 ��������ǉ�����<br>���v���C���[�̃��C���U���ɂ̂ݑ�����t������"],
		[50,0,"�e���|�[�g","NP3",28
			,"�����̃z�[���|�C���g�֏u���Ɉړ�����"],
		[60,2,"�~�c�N�j �I�[�_�[","NQ1",34
			,"�Ώۂ�����ɋ�Ԉړ������Č�ނ�����"],
		[60,0,"�R�[�����O","NQ1",34
			,"�Ώۂ������̗����ʒu�Ɉ����񂹂���"],
		[70,2,"�C�����[�W���� �V�[���h","NQ2",40
			,"���e�̏�����������"],
		[70,0,"���R�[�� �A���^�[","NQ2",40
			,"�A���^�[���o�������A�p�҂̋߂��ɂ���҂��p�҂̃z�[���|�C���g�Ɉړ�������"],
		[80,2,"�e���|�[�g �I�[��","NQ3",46
			,"��u�Ńp�[�e�B�[�S�����p�҂̃z�[���|�C���g�Ɉړ�������"],
		[80,0,"�e���|�[�g �N���[�X","NQ3",46
			,"�p�҂̈ʒu�Ƀp�[�e�B�S�����Ăі߂�"],
		[90,2,"���C�g�j���O �u���C�h","PNQ1",53
			,"����ɗ����h�点�� ��������ǉ�����<br>�������̕���̂ݗL��"],
		[90,0,"�C�����[�W���� �\�[�h","PNQ1",53
			,"���o�ōŋ��̌������o����������"]
	]],
	[48,"�������@",[
		["�l",1,"�e�N�j�b�N��","�G�}","MP","����"],
		[1,2,"�T���� ���@���p�C�A�o�b�g","EB1",5
			,"���E����z���R�E�������Ăяo��"],
		[1,0,"�u���b�h �f�B�[��","ND1",5
			,"��莞�� HP���]����MP�񕜑��x�𑝉�������"],
		[10,2,"�u���b�h ���[���b�g","ND2",9
			,"�y�b�g���U�����󂯂�����50%�̊m���Ń_���[�W�𔽎˂���"],
		[10,0,"�T���N�� �A���J�[","ND2",9
			,"���d�ʂ̐��������� �Ώۂ̏����A�C�e�����d�ʂɉ��Z������"],
		[20,2,"�S�[�X�g �_���X","ND2",13
			,"�Ώۂ̎���Ɍ����Ȃ��S�삪�܂Ƃ��� ��莞�Ԃ��ƂɃ_���[�W��^����"],
		[20,0,"�T���� �]���r �A�[�~�[","EB2",13
			,"���E����]���r�A�[�~�[���Ăяo��"],
		[30,3,"�E�H�[�� �p�j�b�V�������g","NP1",18
			,"�߂��ɂ��鉺�l�B��HP���񕜂���"],
		[30,0,"�X�e�B�[�� �h���C�u","NP1",18
			,"�߂��ɂ��鉺�l�ɑ΂��AAC���]���ɂ��邱�Ƃňړ����x�𑬂߂Ă��"],
		[30,0,"���̌ۓ�","OP1",53
			,"��n��h�邪�� ����̉��g����������"],
		[40,2,"�C���T�}�X �O���C�u","NP2",23
			,"��ɂ̋L����A���t�� ��ɋ߂Â����҂𑖂�Ȃ�����"],
		[40,0,"�T���� �X�J���p�X���C�W","EB3",23
			,"���E����X�J���p�X���C�W���Ăяo��"],
		[50,2,"�N���C�V�X �R�[��","NP3",28
			,"�y�b�g����̂����茳�ɌĂі߂�"],
		[50,0,"�T���� �P���x���X","EB3",28
			,"�n���̔Ԑl�P���x���X����������"],
		[60,2,"�o�j�b�V�� �T�����Y","NQ1",34
			,"�G���������������X�^�[�����̐��E�ɖ߂�"],
		[60,0,"�T���� �o�G���E�H�b�`���[","EB4",34
			,"���Ɩ���̖��@�����ӂȖڋʂ���������"],
		[70,2,"�f�X �}�[�`","NQ2",40
			,"�߂��ɂ��鉺�l�ɑ΂��A���͂��]���ɂ��邱�Ƃ� �U���͂����߂Ă��"],
		[70,0,"�T���� �]���r �I�����@��","EB4",40
			,"���E����I�����@���̃]���r���Ăяo��"],
		[80,2,"�t�@�C�i�� �I�[�_�[","NQ3",46
			,"�����̃y�b�g�𔚔������� �߂��ɂ���G�ɑ�_���[�W��^����"],
		[80,0,"�T���� �N�C�[�� �I�u �w��","EB5",53
			,"����ꂽ���Ԃ����n��ɂ����Ȃ� ���E�̏������Ăяo��"],
		[90,3,"�T���� �}�u�X �A���o�b�T�_�[","EB5",53
			,"�퓬�\�͂̍������_����������"],
		[90,0,"�T���� �{�[���i�C�g","EB5",53
			,"�ő�HP�̔������]���ɂ��� ���ׂ̌��m����������"],
		[90,0,"�T���� �J�I�X �e���^�N��","OP1",53
			,"�ً�Ԃ��J�I�X��������������"]
	]],
	[49,"���̖��@",[
		["�l",1,"�e�N�j�b�N��","�G�}","MP","����"],
		[1,2,"�O���C�u���[�h �~�X�g","ND1",5
			,"�C���̈������𔭐������� �G���ߊ��Ȃ�������"],
		[1,0,"�X�s���b�g �h���C��","ND1",5
			,"��莞�� �Ώۂ̖��͂�����������"],
		[10,2,"�}�b�h �R�[�g","ND2",9
			,"�G�̑̂ɔS�y�𗍂߂邱�Ƃœ�����݂点 ��𗦂�����������"],
		[10,0,"�E�F�C�X�g �G�i�W�[","ND2",9
			,"�Ώۂ̑S�Ă̍s���ɂ����� �X�^�~�i�̏����{�ɂ���"],
		[20,2,"�J�[�X�h �u���X","ND3",13
			,"�􂢂̌��t�𗁂т� �Ώۂ̍ő�HP�EMP�E�X�^�~�i��������"],
		[20,0,"�o�C���f�B���O �n���Y","ND3",13
			,"�n�ʂ���L�т閳���̈���̎肪 �Ώۂ�߂܂���"],
		[30,2,"�G�o�[ �f�B�Y�B�[�Y","NP1",18
			,"�G�����̕a�C��Ԃɂ� �ő�X�^�~�i�l����莞�ԉ�����"],
		[30,0,"�G�s�f�~�b�N �I�[��","NP1",18
			,"�􂢂̌��t�𗁂т����� �߂��ɂ�����̑S�Ă�a�C�iHP��MP�̎��R�񕜒�~�j�ɂ�����<br>���͈͖��@�̌���"],
		[40,2,"�v���]�i�[ ���F�C��","NP2",23
			,"��S�̂��הO�ŕ��� �����r����s�\�ɂ�����"],
		[40,0,"���b�g�� �u���X","NP2",23
			,"�����̓f����f���@�������ʂ�V�������̂���5��������"],
		[50,2,"�R�[�v�X �G�N�X�v���[�W����","NP3",28
			,"���̂𔚔����� ����ɂ���G�Ƀ_���[�W��^����"],
		[50,0,"�o�v�e�B�Y�� �|�C�Y��","NP3",28
			,"����ȓł̐���𗁂т�������"],
		[60,2,"���s�b�h �f�B�P�C","NQ1",34
			,"���̂̋߂��ɂ���҂ɋ���Ȏ��L�𗁂т������A������Ԃɂ�����"],
		[60,0,"�f�B�A�{���b�N �A�C","NQ1",34
			,"�����̎��͂ɉB��Ă���҂�\���o��"],
		[70,2,"�V���h�E ���[�t","NQ2",40
			,"���̏�ŉe�ƂȂ� �p������܂�<br>���������Ƃ͏o���Ȃ��� ���҂��猩���Ȃ��Ȃ�"],
		[70,0,"�R�[�v�X �~�[�e�B���O","PNQ7",46
			,"���҂̎��̂� �p�҂̌��Ɉ����񂹂�<br>�������]�[�����̎��̂��������񂹂�Ȃ�"],
		[80,2,"�w�� �p�j�b�V��","NQ3",46
			,"��莞�Ԓ��ڍU�����U���҂ɒ��˕Ԃ�<br>��HP���񕜂���� ���ʂ͏�������"],
		[80,0,"�C�[���� �I�[����","NQ3",46
			,"�Q�̂��邨������������ �ǂ��Ȃ����ʂ�����������"],
		[90,3,"���{�[�� �����X","PNQ1",53
			,"��x����ł� �m����ԂŐ����Ԃ邱�Ƃ��ł���"],
		[90,0,"���[�v �J�[�j�o��","PNQ1",100
			,"���@������ ��莞�Ԉȓ��ɋߐڗ��蕐��ōU������ƁA�G�ɑ������̃_���[�W��^���邱�Ƃ��ł���<br>�i�ʏ�U���̂݌��ʂ��������܂��j"],
		[90,0,"���b�g�� �x�C�p�[","OP1",45
			,"EGK �̕��o���� ���������C"]
	]],
	[50,"���@�n��",[
		["�l",1,"�e�N�j�b�N��","-","ST","����"],
		[1,1,"���f�B�e�[�V����","-",5
			,"���_�������W�������� �}�i�E�|�C���g(MP)�̉񕜑��x�𑬂߂�<br>�����ʌp�����͏������X�^�~�i(ST)�������"],
		[20,1,"�z�[���[ �u���X","-",15
			,"��莞�� ���͂���������"],
		[30,1,"�}�W�b�N �u�[�X�g","-",15
			,"���@���͂��͈͂��L����"],
		[40,1,"�}�i �v���b�V���[","-",19
			,"��莞�� MP�̏���ʂ��y�������"],
		[50,1,"�X�y�� �G�N�X�e���V����","-",23
			,"�X�y���u�b�N�ɖ��@���`���[�W���Ă����鎞�Ԃ���������"],
		[60,1,"�z�[���h","-",28
			,"�G����̍U���� ���@�̉r����W�Q����ɂ����Ȃ�"],
		[70,1,"�z�[���[ ���J�o�[","-",50
			,"���Ȃ�͂��S�g���ݍ��� �}�i�E�|�C���g(MP)���񕜂���"],
		[80,1,"�L���X�e�B���O ���[�u","-",38
			,"�r�����̈ړ����x�𑬂߂�"],
		[90,1,"���s�b�h �L���X�g","-",44
			,"���@�̉r����啝�ɒZ�k���邱�Ƃ��ł���<br>�����ʌp�����̓}�i�E�|�C���g(MP)�̏���ʂ�������<br>�W�����v������ƌ��ʂ����������"]
	]],
	[51,"���R���a",[
		["�l",1,"�e�N�j�b�N��","-","ST","����"],
		[1,1,"�T�C�����g ����","-",5
			,"����̓G�̒��o���떂���� �����̑������C�t����ɂ�������"],
		[20,1,"�Z���X �q�h�D��","-",11
			,"�܊����������܂� �B��Ă���҂𔭌��ł���悤�ɂ���"],
		[30,1,"���[�� �t�H�[��","-",15
			,"��莞�� �����̗͂��؂�Ē��֕���������"],
		[40,1,"�l�C�`���[ �r�[�g","-",19
			,"�؂ɐG��@���R�̖����̗͂�HP���񕜂���<br>�i���̉\�Ȗ؂ɑ΂��ėL���j"],
		[50,1,"�c�C�X�^�[ ����","-",23
			,"�����̌��ɒǂ����������N���� �ړ����x�𑁂߂�"],
		[60,1,"�Z���X �v���C","-",28
			,"�f�����l�����ʉ߂������[�g�����m���A�ǐՂ���<br>����Mob�ɂ� �Ώۂɑ΂��Ď����̋C�z���󔖂ɂ�������ʂ�����"],
		[70,1,"�t�@���R�� �E�C���O","-",33
			,"�t�@���R���̂悤�ɉH�΂��� �O���ɔ�яオ��<br>���X�L���������Ȃ�ƃf�B���C�������Ȃ�"],
		[80,1,"�O���[�g �G�X�P�C�v","-",38
			,"�p�[�e�B�[�S���̈ړ����x�𑬂߂�<br>�����ʒ��͍U���ł��Ȃ��Ȃ�"],
		[90,1,"���[�V���O �X�J�C","-",33
			,"�V��𑀂�"]
	]],
	[52,"�Í�����",[
		["�l",1,"�e�N�j�b�N��","-","ST","����"],
		[1,1,"�e���[ �`���[��","-",5
			,"�Ώۂ͋��|�ɖ������ �ڂ𗣂��Ȃ��Ȃ�"],
		[10,1,"�h���C�� �\�E��","-",8
			,"���̂��獰���z���� MP���񕜂���"],
		[20,1,"�u���C�� �t�H�[�J�X","-",11
			,"����ɂ���G�̔����͈͂��L������"],
		[30,1,"�X�P�C�v�S�[�g","-",19
			,"��莞�ԁA�G���U����A�C�e���̎g�p��s�\�ɂ�����"],
		[40,1,"�T�N���t�@�C�X �f�B�i�[","-",17
			,"�����̃y�b�g��H�� HP�EMP�EST���񕜂���"],
		[50,1,"�i�C�g �J�[�e��","-",23
			,"�ӂ��ʂ��Èłɕ�݂��� �G����̍U���𓖂�ɂ�������<br>����x��������Ǝb���̊Ԏg�p�s�\�ɂȂ�"],
		[60,1,"�X���C�u �`�F�C��","-",28
			,"�Ώۂ������̕��֕��݊�点��"],
		[70,1,"�n���M���O �E�C���O�X","-",29
			,"�Ώۂ𒈂ɂ͂����<br>�������Ă�Ԃ́A�q�b�g�E�|�C���g(HP)�Ɖ��\�͂���������"],
		[80,1,"�M���`�� �R�[��","-",38
			,"�ő�q�b�g�|�C���g��20%��؂����Ώۂ̎�𙆂˂�<br>�A���A�^�����_���[�W�̍ő�l��100�܂łł��B"],
		[90,1,"�t���[�W����","-",32
			,"�p�[�e�B�����o�[�S�������̂� ��̂̉����ւƎp��������<br>�Z�g�p�҈ȊO�͑���s�\�ɂȂ� �͂𕪂��^���邱�Ƃ����o���Ȃ��Ȃ�<br>�����҂́A���x�ȗ͂ƒ������[�`�𓾂���<br>���������܂߂�2�l�ȏ�̃p�[�e�B��g��ł��鎞�ɔ����\"]
	]],
	[53,"���",[
		["�l",1,"�e�N�j�b�N��","-","ST","����"],
		[1,1,"�g���[�h","-",5
			,"�ΏۂƃA�C�e���₨���̌���������"],
		[10,1,"�I�[�v�� �Z���[","-",40
			,"�I�X���J���Ď����̔�����"],
		[20,1,"�I�[�v�� �o�C���[","-",40
			,"�I�X���J���Ď�����������"],
		[30,1,"�T�C���{�[�h","-",40
			,"�����̓X�̊Ŕ𗧂Ă�<br>���A�C�e���w�X�̊Ŕx���K�v"],
		[40,1,"�n�C�A�[ �{�f�B�K�[�h","-",23
			,"�I�[�N �M�����O�������Ń{�f�B�K�[�h�Ƃ��Čق�"],
		[50,1,"�}�[�`�����g�R�[��","-",40
			,"�o�����l���Ă�Ŕ�����������"],
		[60,1,"�n�C�A�[ �}�[�V�i���[","-",23
			,"������x���� �h���[�t�̗b�����ق�"],
		[90,1,"�o���J�[ �R�[��","-",40
			,"�o����s�����Ăяo��"]
	]],
	[54,"�V���E�g",[
		["�l",1,"�e�N�j�b�N��","-","ST","����"],
		[1,1,"�z���[ �N���C","-",5
			,"�Í��̗͂�ʂ��� ���낵�����ѐ��𕷂�����<br>���̐��𕷂������͖̂h��͂Ǝ�����R�͂��ቺ����"],
		[20,1,"���b�g�� �{�C�X","-",11
			,"���҂̐����؂� �s���Ȑ��𔭂���<br>�������҂̃A�C�e���g�p�f�B���C�𑝉�������<br>����NPC�ł͖�������ቺ������"],
		[30,1,"�t�B�A�[ �m�C�Y","-",15
			,"���݂̂����������҂̋��т𔭂� �Ώۂ̋��|�S�����<br>�������҂͍U���Ԋu���L����"],
		[40,1,"�f�t�j���O �N���}�[","-",19
			,"�吺�œG���̂̂��� �r����W�Q����"],
		[50,1,"�C�r�� �X�N���[��","-",23
			,"�׈��ȋ��т𕷂����ċ�������<br>�͈͓��ɂ���Ώۂ̉���ƈړ����x��ቺ������"],
		[60,1,"�n�E�����O �{�C�X","-",28
			,"����U�������đΏۂɏՌ��g�����"],
		[70,1,"���E�f�B �E�F�C��","-",33
			,"���ѐ������� �G�̍U���͂�������"],
		[80,1,"���C���h ���A","-",38
			,"�쐶�̗Y���т����� �U�����x�𑬂߂�"],
		[90,1,"�W���C�A���g ���T�C�^��","-",45
			,"�W���C�A���g�̉̂𕷂��� �G���X�^��������"]
	]],
	[55,"���y",[
		["�l",1,"�e�N�j�b�N��","-","ST","����"],
		[1,3,"�x�r�[�X�l�[�N�̃G�`���[�h","-",5
			,"�ア�͂�����R�̉�<br>PT�����o�[�̎�����R�͂��㏸������"],
		[1,0,"�����̉��F","-",5
			,"�������J�̉��F�Ŏ��̖͂��������<br>�O���J�Z�b�g�����̞O���J(����)�v����"],
		[1,0,"�X�^���h�}�C�N","-",5
			,"�X�^���h�}�C�N����������<br>�X�^���h�}�C�N�Ƀ��C�g�|�[�V�������g���[�h����ƃX�|�b�g���C�g���_�����܂�"],
		[10,1,"�Z�C�N���b�h ���N�C�G��","-",9
			,"���͂ɂ���A���f�b�h�n�̓G����߂��"],
		[20,1,"�C�N�V�I�� �}�[�`","-",11
			,"�N���҂���g������<br>PT�����o�[�̖h��͂��㏸������B<br>���X�L���l�ɂ���ĉ̂����Ԃ��ς��A�̂�������قǏ㏸�l��������B"],
		[30,1,"�A���P�~�X�g ���v�\�f�B","-",15
			,"�B���p�t�̌����E��Y�E�����̉S<br>PT�����o�[�̖��͂��㏸������"],
		[40,1,"�t�@���K�X�̎q��S","-",19
			,"�Q���̈����q���u���ɖ��点��q��S<br>�����ȊO��PT�����o�[��[������ɗU�����R�񕜗ʂ��㏸������"],
		[50,1,"�A�r�V�j�A�� �����c","-",23
			,"�A�r�V�j�A���̌y���ȓ�����\�������S<br>PT�����o�[�̉�𗦂��㏸������"],
		[60,1,"�V�X�^�[ �G���[�V����","-",28
			,"������F��C�����̊����\������<br>PT�����o�[��DeBuff���ʂ��Â�������P��������"],
		[80,1,"�g���C�f���g �u���[�X","-",38
			,"12���Ԑ푈�Ő펀�����g���C�f���g�B�̊���̉�<br>�����ȊO��PT�����o�[�̃X�^�~�i����ʂ��y������"],
		[90,1,"���]�i���X �n�[���j�[","-",45
			,"�Â�����ƐV���������a�����̉S<br>�����҂𗎂������� HP���ő�HP��25�����񕜂�����"],
		[0],
		[0,1,"�K�g�����O","-",0
			,"�З͎͂ア���A�˂��\<br>���m�A �~�T�C�����K�v"],
		[10,4,"�ً}���","-",5
			,"������Ԃ�ōU���𖳌�������"],
		[10,0,"�V�[���h","-",5
			,"�����U�������S�ɖh��"],
		[10,0,"�^�C�^�� �p���`","-",5
			,"�����̌����J��o��"],
		[10,0,"�t�@�C���[ �V���b�g","MP",3
			,"���̒e�œG�ɖ��@�_���[�W��^����"],
		[20,5,"�^�C�^�� �L�b�N","-",10
			,"�f�����Ώۂ��R��グ��"],
		[20,0,"�W���~���O �V���b�g","-",15
			,"�_���[�W�Ɠ����ɉr���𒆒f�����A��莞�Ԏ����r����s�\�ɂ�����"],
		[20,0,"���b�V��","-",20
			,"�W���u�A�X�g���[�g�A�R��グ�̘A���U��"],
		[20,0,"�t���[�Y �V���b�g","MP",10
			,"�X�̒e�œG�𓀂点�ă_���[�W��^���A�ړ����x��x������"],
		[20,0,"���t���N�g�V�[���h","-",15
			,"�ߐڍU���Ɩ��@�U���𒵂˕Ԃ�"],
		[30,7,"�^�C�^�� �^�b�N��","-",15
			,"����ȑ̓�����őO���̓G�𐁂���΂��A�_���[�W��^����"],
		[30,0,"�V���b�g�K��","-",20
			,"����ɔ�яオ��O���͈͂̓G�Ƀ_���[�W��^���� �G�̋߂��Ŏg�p�����2���q�b�g����"],
		[30,0,"�o�C�u���[�V����","-",10
			,"��n��k�킹�A���͂̓G�𐁂���΂�"],
		[30,0,"�G�l���M�[�z��","-",25
			,"�������U���Ɩ��@�U�����z�����Ė���������<br>��100���������邽�߂ɂ͉��y�X�L��38�ȏオ�K�v"],
		[30,0,"�M���e","-",15
			,"�_���[�W�Ɠ����ɋ���Ȍ�������A�Ώۂ̎��E���Ղ�"],
		[30,0,"�n���P�[��","MP",15
			,"�����őł��o���ꂽ�^��g���Ώۂ𐁂���΂�"],
		[30,0,"�n�C�W�����v","-",20
			,"�ʏ풴�����Ȃ��ǂ��y�X�z���邱�Ƃ��ł���"],
		[40,5,"�G�A �V���[�g","-",20
			,"�󒆂ɔ�яオ��A���̑Ώۂ��}������΋�Z"],
		[40,0,"���d","MP",20
			,"�̓��ɒ~�ς����d�C�������̎���ɕ��o���ēG�����d������"],
		[40,0,"�O���l�[�h �V���b�g","-",15
			,"�_���[�W�Ɠ����Ɏ��͂��������񂾑唚�����N��������Ȓe������"],
		[40,0,"�����ړ�","-",20
			,"��莞�ԁA�����I�Ɉړ����x���㏸������"],
		[40,0,"�X�i�C�v �V���b�g","-",20
			,"�Ώۂ̑������������A�_���[�W�Ɠ����Ɉړ����x������������"],
		[50,5,"�L���m��","-",25
			,"���߂��G�l���M�[����o���đΏۂɑ�_���[�W��^����"],
		[50,0,"�ߊl","-",25
			,"�Ώۂ�߂炦�A�������~�߂�"],
		[50,0,"�}�W�b�N �o���A","MP",35
			,"��莞�ԁA�����_���[�W���y�����A���@�U���𖳌�������"],
		[50,0,"�u�[�X�g ���[�h","-",35
			,"��莞�ԁA�r���W�Q��h���A���͂Ɖr�����x���㏸�����邪�A����MP����������"],
		[50,0,"�R���Z���g���C�V����","-",35
			,"�_�o���������܂��A�W�����邱�ƂŔ���I�ɖ������㏸�����邪�A������ቺ����"],
		[60,2,"�t�@�C�A�[ �E�H�[��","MP",30
			,"���̕ǂ��������A�߂Â��҂ɉ��̃_���[�W��^����"],
		[60,0,"�o�[�� �t�B�X�g","-",25
			,"����Z�������őΏۂ�ł������A���̒ǉ��_���[�W��^����"],
		[70,3,"���P�b�g�����`���[","-",30
			,"�O���ɂ���ΏۂɃ��P�b�g�C�����<br>�����P�b�g�̒e���K�v"],
		[70,0,"�n�C�p�[ �L���m��","-",40
			,"���߂��G�l���M�[����o���đΏۂɑ�_���[�W��^����<br>�K�[�h���ђʂ��邪����傫��"],
		[70,0,"�X�[�p�[ �m���@","MP",40
			,"���͂Ȗ��͂����߂��ꌂ�����"],
		[0],
		[1,10,"�K�g�����O�E�L������","-",0
			,"�З͂͒Ⴂ���A�A�ˉ\�ȍU��"],
		[1,0,"�p���`�E�L������","-",0
			,"�f�����p���`���J��o��"],
		[1,0,"�L���m���E�L������","-",20
			,"�h����т����͂ȃG�l���M�[�C������"],
		[1,0,"�K�[�h�E�L������","-",5
			,"���ڍU���Ɣ�ѓ�������S���"],
		[1,0,"�o���A�E�L������","-",20
			,"�S�Ă̍U���𖳌�������"],
		[1,0,"�q�[�����O�E�L������","-",20
			,"�s�����~�߂ĉ񕜂���"],
		[1,0,"���[�v�E�L������","-",5
			,"�O���ɍ����ړ�����"],
		[1,0,"�����`���[�E�L������","-",30
			,"�O���͈͂ɃL���m�������"],
		[1,0,"�V���b�N�E�F�[�u�E�L������","-",30
			,"�Ӑg�̈ꌂ����J��o���ꂽ�Ռ��g���O���̓G�𐁂���΂�"],
		[1,0,"�X�p�[�N�E�L������","MP",30
			,"���͂�d�C�ɕς��ĕ��d���A���͂̓G�����d������"]
	]],
	[56,"����",[
		["�l",1,"�e�N�j�b�N��","-","ST","����"],
		[1,1,"���b�N�s�b�N","-",5
			,"���̊|���������������J����<br>�ʏ�ł͊J���Ȃ��󔠓����A�����J���邱�Ƃ��o����"],
		[20,1,"���b�N�I�� �O���[","-",11
			,"�Ώۂɐڒ��܂𐁂��t���s���𐧌�����"],
		[30,1,"�X�e�B�[��","-",15
			,"Mob����A�C�e���𓐂ނ��Ƃ��ł���<br>���Ώۂ�HP�����Ȃ��قǐ��������オ��܂�"],
		[40,1,"�����[�u �g���b�v","-",19
			,"㩂���������<br>�d�|����ꂽ㩂���菜�����Ƃ��o����"],
		[50,1,"�X�e���X","-",23
			,"�̂����ȑ����ł܂Ƃ��Č��w���ʉ������� ���ʒ��͈ړ����x���x���Ȃ�"],
		[60,1,"�C���Z�[�� �X�e�B�[��","-",28
			,"�����{�݂̐ݒu���𓐂ݎ��<br>(���Y���u��G���͂�CC/DA�̐ݒu���Ȃǂ𓐂�)<br>�� ���� WarAge �ł� ���ݔ���͂���܂���"],
		[80,1,"�S�[�W���X �X�e�B�[��","-",38
			,"Mob����󏭂ȃA�C�e���𓐂ނ��Ƃ��o����<br>���Ώۂ�HP�����Ȃ��قǐ��������オ��܂�"]
	]],
	[57,"�M�����u��"],
	[58,"�p�t�H�[�}���X",[
		["�l",1,"�e�N�j�b�N��","-","ST","����"],
		[1,3,"�o.�n.�q","-",5
			,"���҂ɕ����@�h���̋F��"],
		[1,0,"�l.�`.�m","-",2
			,"�ى�����"],
		[1,0,"�r.�c.�l","-",4
			,"�����̕�"],
		[10,2,"�s.�r","-",1
			,"�G��g�񂾍����"],
		[10,0,"�m.�n","-",2
			,"�͂�����Ɣے肷��|�[�Y"],
		[20,2,"�h.�s.�d","-",1
			,"�v��������]��"],
		[20,0,"�x.�r.�j","-",2
			,"�؂�؂�U�������"],
		[30,5,"�l.�c.�k","-",1
			,"�t�@�b�V�������f���ɂȂ肫��"],
		[30,0,"�f.�h.�j","-",2
			,"�m�R�M���������U�������"],
		[30,0,"�k.�n.�u","-",0
			,"-"],
		[30,0,"�n.�s.�l","-",0
			,"���ʂ𒴂������̕\��"],
		[30,0,"�V�[�h �V���b�g","-",15
			,"�X�C�J�̎�������Ō������΂�<br>�g�p�A�C�e�� : �J�b�g �X�C�J 1"],
		[40,2,"�m.�x.�`","-",3
			,"�ɂ�[��̃|�[�Y"],
		[40,0,"�j.�x.�q","-",2
			,"�ӂ������"],
		[50,2,"�l.�s.�q","-",1
			,"�K���ɂȂ��đS�͎�������"],
		[50,0,"�r.�r.�o","-",2
			,"����C�Ȃ�������"],
		[60,3,"�m.�i.�j","-",5
			,"�`���̖��D�ɂȂ肫��"],
		[60,0,"�n.�q.�`","-",2
			,"���ŕ���؂��ĕ���"],
		[60,0,"�a.�j.�c","-",2
			,"�]��ł����������"],
		[70,5,"�g.�f","-",1
			,"���̔�����������"],
		[70,0,"�g.�f �o�[�W����2","-",7
			,"���̔�����������"],
		[70,0,"�g.�f �o�[�W����3","-",7
			,"���̔�����������"],
		[70,0,"�g.�j.�c","-",2
			,"�h��ɐ�����΂����"],
		[70,0,"�r.�o.�h","-",2
			,"�g�\����"],
		[80,3,"�x.�j.�r","-",5
			,"�C���̓���������������āA���͂ɃK�����΂�"],
		[80,0,"�t.�j.�l","-",2
			,"����g���Ƃ�"],
		[80,0,"�o.�h.�b","-",2
			,"�����J����t��������"],
		[90,3,"�l.�n.�d","-",9
			,"��y�̒B�l���A�����Ȃ��d�|�����g���� �ō��ɖڗ��|�[�Y���L����"],
		[90,0,"�j.�a.�j","-",2
			,"�匩����؂�"],
		[90,0,"�l.�a.�j","-",2
			,"���肰�Ȃ����Ղ���"]
	]],
	[59,"�_���X",[
		["�l",1,"�e�N�j�b�N��","-","ST","����"],
		[1,1,"�`�A�[ �_���X","-",5
			,"���@�r���̑��x���グ��"],
		[10,1,"���[�g �_���X","-",5
			,"���̗x�������҂ɁA�A�����n�ʂɐ[���������낷�C���[�W��^���A�m�b�N�o�b�N�n�̒e����΂��������Ȃ��Ȃ���ʂ����B"],
		[20,1,"�E�F�[�u �_���X","-",11
			,"�����̎���̃v���C���[�̃N���e�B�J�����������㏸������"],
		[30,1,"�{�� �_���X","-",15
			,"�����̎���ŗ�̂ɂȂ��Ă��钇�ԂɁA�����U���Ɩ��@�U���������h��������ʂ�^����B<br>����̂ɂȂ��Ă���PC���u�ԓI�Ɍ�������ʂ�����B"],
		[40,1,"�o���U�C �_���X","-",19
			,"�����̈ړ����x���㏸������"],
		[50,1,"�X���� �_���X","-",23
			,"����ɂ��钇�Ԃ̓ł�DoT����菜��"],
		[60,1,"�c�C�X�g","-",28
			,"����̎҂̍U���Ԋu���k�߂�"],
		[70,1,"�^�E���g �_���X","-",33
			,"���͂ŐQ�Ă��錩����}��A�������N����<br>�����ʌp�������A����ƃX�^����ԂɂȂ��Ă������ɉ��������"],
		[80,1,"���b�c �_���X","-",38
			,"����ɂ��钇�Ԃ��点�āA�X�^�~�i���񕜂�����"],
		[90,1,"�t�[���K�� �_���X","-",38
			,"�ʏ�U�������������ہA3�A���̒ǉ��U����@������"]
	]]
];

var hspeciality = [
// �����e�N
// �U���n	(1)
		[["�"],[38],[90],"�{���o�[<br> �G�N�X�v���[�W����","-",45
			,"�����̎���ɂ���G����������Ŏ�������<br>�����ɕK�v��Buff : ���e�j �}�X�^���[",[38,51,5,42]],
		[["����","���_��"],[30,6],[90,70],"��a","-",45
			,"���Ɏ���������ōU����e��<br>���񂾑���Ɏa����^�����i�U��<br>�����ɕK�v��Buff : �T�����C �}�X�^���[",[30,12,40,2,0,6]],
		[["�e��"],[33],[70],"�X�i�C�p�[ �V���b�g","-",33
			,"�y�������ɂ���Ώۂ�_�������Ƃ��ł���<br>�U�����󂯂��҂͉r���������I�ɒ��f��������<br>�����ɕK�v��Buff : �b�� �}�X�^���[",[33,38,42,40,19]],
		[["����"],[19],[30],"�g���v�� �t�B���b�c","-",27
			,"�����J�����̂悤�ɑΏۂ�؂�<br>�����ɕK�v��Buff : �~�[�t �}�X�^���[",[19,21,8]],
		[["�퓬�Z�p","�L�b�N"],[40,39],[60,90],"�l�I �g���l�[�h","-",45
			,"���͂̓G�������񂹁A�R���΂�"],
		[["�e��","�"],[33,38],[90,70],"�O���l�[�h�e","-",45
			,"�Ώۂɒ�������Ƃ��̎��͂��������ݔR���オ��<br>�g�p�A�C�e�� : �O���[�g �G�N�X�v���[�h �|�[�V����"],
		[["��","���̖��@"],[37,49],[70,70],"�|�C�Y�� �o�C�g","-",40
			,"�Ώۂ̑̓��ɒ��� �ł𒍓�����"],
		[["����","�؍H"],[15,22],[30,70],"�t�F�����O �X���b�V��","-",28
			,"���̂Œb���グ��ꂽ���̂���J��o�����ꌂ"],
		[["����"],[3],[30],"�J�I�X �u���C�J�[","-",20
			,"�J�I�X�����ɑ΂��Đ��ȈЗ͂��������G�l���M�[����Z"],
		[["���_��"],[6],[30],"�}�C���h �C���p�N�g","-",15
			,"���͂� ���߂����̒e���΂�<br>�����_�͂������قǈЗ͂��オ��Z<br>�����ɕK�v��Buff : �������:�i�[���h �X�^�b�t"],
		[["�","�򒲍�"],[38,24],[90,90],"�^�C�� �{��","-",45
			,"�������̔��e��Ώۂɐݒu����<br>�������ԓ��ɉ����ł��Ȃ���Α�_���[�W���󂯂�"],
		[["�L�b�N"],[39],[70],"�M�����N�V�[<br> �_�C�i�}�C�g �L�b�N","-",33
			,"���E�̖@���𖳎����邩�̔@���J��o�����ړ��\�ȋ���h���b�v�L�b�N<br>�q�b�g��́A�A�s�[�����Ȃ��ƋC���������܂�Ȃ�<br>�����ɕK�v��Buff : �r����� �}�X�^���[",[29,39,9,3,13,58]],
		[["���_","�ؗ�"],[31,0],[90,90],"�p���[ �C���p�N�g","-",45
			,"�Ӑg�̗͂ŐU�艺�낵��n���Ǝ��͂̓G��ł��ӂ�"],
		[["�e��","�j�󖂖@"],[33,44],[80,30],"�}�W�b�N �V���b�g","-",39
			,"���@�̒e�𔭎˂��Ē�����̓G����������"],
		[["����","���R���a"],[30,51],[70,50],"��M","-",33
			,"��u�Ŋԍ������l�߂� �G���т�"],
		[["�|","�L�b�N"],[34,39],[90,60],"�o���[�W �V���b�g","-",45
			,"���x�ȋr�͂Ŕ�яオ��A��󂩂�O���̓G����ĂɎ˔���"],
		[["��","�������@"],[32,46],[70,70],"�Q�C�� �X���X�g","-",33
			,"�����̔@�������� �����̓˂����J�肾��"],
		[["�p�t�H�[�}���X"],[58],[70],"�t�B�j�b�V���O �G���h","-",33
			,"����ɂ��鈫��ł��|�� �g�h���̑唚��<br>�������ɂ͉Ζ򂪕K�v<br>�����ɕK�v��Buff : �r����� �}�X�^���[<br>�g�p�A�C�e�� : �G�N�X�v���[�h �|�[�V����",[29,39,9,3,13,58]],
		[["�p�t�H�[�}���X"],[58],[70],"�t�B�j�b�V���O �G���h<br> �X�p�[�N","-",33
			,"����ɂ��鈫��ł��|�� �g�h���̑唚��<br>�������ɂ͉Ζ򂪕K�v<br>�����ɕK�v��Buff : �R�X�v���C���[ �}�X�^���[<br>�g�p�A�C�e�� : �G�N�X�v���[�h �|�[�V����",[25,23,1,2,42,58]],
		[["����","����"],[19,36],[30,10],"�p�C����","-",9
			,"�P�[�L��Ώۂ̊�߂����ē�������<br>�g�p�A�C�e�� : �V���[�g �P�[�L"],
		[["�","�򒲍�","������R��"],[38,24,8],[80,80,80],"�Z�b�g �}�C��","-",38
			,"�n����ݒu���邱�Ƃ��ł���<br>�g�p�A�C�e�� : �O���[�g �G�N�X�v���[�h �|�[�V����"],
		[["�|","�W����"],[34,7],[90,90],"�`���[�W �V���b�g","-",45
			,"�͂����߂����͂ȃV���b�g"],
		[["��","���j"],[32,10],[90,90],"�E�H�[�^�[ �X�g���[��","-",45
			,"���𑀂� �G����������<br>�����ɕK�v��Buff : �C��m �}�X�^���[",[10,32,19,17,53]],
		[["����","�m�\"],[30,4],[50,30],"���b�O �X���b�V��","-",23
			,"�������a��t��������݂炷<br>���Ώۂ̈ړ����x�㏸�Z�𖳌���������"],
		[["����"],[41],[40],"����A��","-",19
			,"�����̓����ő����|�M�� ����d�ő���̍U�������<br>���͂ȘA���U�����J��o��<br>�����ɕK�v��Buff : �����m �}�X�^���[",[41,29,2,5,39]],
		[["�L�b�N","�ؗ�"],[39,0],[80,80],"�Q�C�� �V���[�g","-",38
			,"�����ŌJ��o���ꂽ�R�肩�琶���� �^��̐n���G���P��<br>�����Ŏ�����_���[�W���󂯂�"],
		[["����","�퓬�Z�p"],[30,40],[90,90],"�^�E��������","-",45
			,"�����U���̉��`<br>����ɑf���������𗁂т����� ��󂩂�̍U���Ŏ~�߂��h��<br>�r���ŋ�U�肷��� �U���͎~�܂��Ă��܂�"],
		[["����","�j�󖂖@"],[36,44],[90,50],"���[�� �V���b�g","-",45
			,"���̓d���͂�̓�����r�ւƏ��点<br>�����������d���͂Ƌ��� ���Ă��������������"],
		[["���_"],[31],[60],"�����L�[ �E�F�C","-",28
			,"�����G�ꂽ�Ώۂ��Њd��<br>���s�s�ȓ{��� �Ԃ��܂���<br>�����ɕK�v��Buff : �`���s�� �}�X�^���[",[36,42,56]],
		[["�p�t�H�[�}���X","�������@"],[58,48],[50,20],"�^���C���Ƃ�","-",23
			,"�Ώۂ̓���Ƀ^���C�����������Ƃ�"],
		[["��","����"],[32,36],[70,50],"�W���x���� �X���E","-",33
			,"������������O���̓G�߂����� �S�͂œ�����<br>���Ώۂ���� ����̓G���т��@����������͎����Ă��܂�"],
		[["�򒲍�"],[24],[70],"�Γق̏p","-",33
			,"�����狐��ȉ΂̋ʂ��΂��E�p<br>���_���[�W�ƉΏ��ɂ��X���b�v�_���[�W��^����<br>�����ɕK�v��Buff : �A�T�V�� �}�X�^���[",[30,38,42,51,24,9,36]],
		[["���_","�W����"],[31,7],[70,40],"�C���p�N�g �E�F�[�u","-",33
			,"��n��U�������� �Ռ��g�𐶂ݏo�� ���͂̓G�𐁂���΂�"],
		[["�|"],[34],[90],"�A���[ ���C��","-",45
			,"���ɖ����� �����̖���J�̂悤�ɍ~�炷<br>�����ɕK�v��Buff : �t�H���X�^�[ �}�X�^���[",[34,51,42,43]],
		[["����"],[30],[80],"�����","-",38
			,"������̌��e�Ƌ��� ��u�œG�̎��͂�؂������Z<br>�����ɕK�v��Buff : �T�����C �}�X�^���[",[30,12,40,2,0,6]],
		[["�̌@"],[14],[1],"�h���� �f�B�O","-",5
			,"��ɑ��������h���� �A�[���ō̌@���s��<br>�����ɕK�v��Buff : �̌@���[�h"],
		[["����"],[36],[70],"�O���l�[�h �u���X�g","-",33
			,"�n���h �O���l�[�h�𓊂�����<br>�������Ɋ������܂� ������_���[�W���󂯂�<br>�����ɕK�v��Buff:�b���}�X�^���[",[33,38,42,40,19]],
		[["���_","�j�󖂖@"],[31,44],[90,50],"�A�[�}�[ �u���C�N","-",45
			,"���͂����߂��ꌂ�őΏۂ̖h���j�� �ꎞ�I�ɖh��͂�������"],
		[["����"],[41],[90],"���C�e","-",100
			,"�����G�l���M�[�𗭂߂ĕ���<br>�X�^�~�i����͌������� �������̖��@�_���[�W��^���邱�Ƃ��ł���<br>�����ɕK�v��Buff : �����m �}�X�^���[",[41,29,2,5,39]],
		[["�","�Í�����"],[38,52],[80,80],"�X�p�C�_�[ �l�b�g","-",38
			,"�w偂̎����������� ���߂ē�����݂点��<br>�g�p�A�C�e�� : �X�p�C�_�[ �V���N�P"],
// �⏕�n	(2)
		[["���R���a","���܂�"],[51,42],[90,90],"���B��̏p","-",100
			,"�鉜�`�@�����̎���ɖ��𔭐������Ė����̎p���B��<br>�����ɕK�v��Buff : �A�T�V�� �}�X�^���[",[30,38,42,51,24,9,36]],
		[["�����Ȃ�","�퓬�Z�p"],[1,40],[80,70],"�A�g���N�g","-",28
			,"�G�̒��ӂ������t���Ė��������<br>�����ɕK�v��Buff : �u���C�u�i�C�g �}�X�^���[",[40,31,35,8,1]],
		[["�ނ�"],[17],[90],"�L���b�` �^�[�Q�b�g","-",35
			,"�ɂ߂��҂̋Z �n��̊l�����y�X�ƒނ�グ��<br>�����ɕK�v��Buff : �C��m �}�X�^���[",[10,32,19,17,53]],
		[["�퓬�Z�p","�U�����","�ؗ�","���","���_��"],[40,2,0,12,6],[90,90,90,90,90],"�v���X�g���C�g","-",33
			,"�Ќ��ɖ������I�[���Ŏ��͂̓G�𕽕�������"],
		[["�U�����","�퓬�Z�p","�p�t�H�[�}���X"],[2,40,58],[90,70,20],"�o�b�N �X�e�b�v","-",28
			,"���֔�Ԃ��Ƃɂ��U���������"],
		[["�퓬�Z�p","�������@"],[40,46],[70,80],"���~�b�g �u���C�N","-",38
			,"���ݔ\�͂������o���A�����I�ɍU���͂��グ�邱�Ƃ��ł��邪�A<br>���C���U���ȊO�g�p�ł��Ȃ�<br>�����ʒ��ɔ�����HP����������@�W�����v�ŉ����\"],
		[["���R���a","���R��","���j","���v��"],[51,13,10,5],[70,70,70,70],"���X�g �X�p�[�g","-",40
			,"�Ō�̗͂�U��i���đS�͂ő���"],
		[["�b��","�Í�����"],[20,52],[60,30],"�f�X�g���C �E�F�|��","-",28
			,"����̑ϋv�x��啝�Ɍ��炷"],
		[["�Í�����","���̖��@"],[52,49],[90,90],"�T�C�R�L�l�V�X","-",45
			,"�O�͂ɂ����͂̓G�̍s���𐧌�����"],
		[["������"],[3],[70],"���]�i���X �t�H�[�X","-",9
			,"����e�N�j�b�N���g�p�\�ɂȂ�"],
		[["���̉��","���R���a"],[11,51],[70,30],"�\�E�� �n�C�h","-",40
			,"����̍������R�ɗn�����܂��邱�Ƃɂ�� �C�z�����S�ɏ���"],
		[["�����Ȃ�","���܂�"],[1,42],[80,90],"�p�[�t�F�N�g �~�~�b�N","-",45
			,"�^�[�Q�b�g�����ΏۂƓ����p�ɕϑ����邱�Ƃ��ł���<br>���ꕔ�̑Ώۂɂ͎g�p���邱�Ƃ��ł��܂���"],
		[["�p�t�H�[�}���X","�_���X"],[58,59],[40,20],"�r.�m.�e","-",19
			,"�����̎��͂𖾂邭�Ƃ炷"],
		[["���e"],[28],[70],"�G���A �N���[�j���O","-",28
			,"���͂��򂵁A����ƂƂ���Debuff����􂢗���<br>�g�p�A�C�e�� : �V�����v�[�~�R<br>�����ɕK�v��Buff : �n�E�X�L�[�p�[ �}�X�^���[",[19,23,28]],
		[["�p�t�H�[�}���X","�򒲍�"],[58,24],[60,30],"�X�^�[ �}�C��","-",28
			,"�󍂂������オ��@���ɔ�������ւ̉Ԃ��炩����<br>�g�p�A�C�e�� : �G�N�X�v���[�h �|�[�V����"],
		[["�b��","�ٖD","�؍H","�����׍H","����","����","����","�򒲍�"],[20,23,22,25,26,19,21,24],[90,90,90,90,90,90,90,90],"�S�b�h �n���h","-",25
			,"�ɂ߂����̂����B�ł���̈�"],
		[["����"],[43],[60],"�u���[�f�B���O �E�B�b�v","-",28
			,"�y�b�g�ɓ���U����������<br>���y�b�g������U�����g�����Ԃ̎��̂ݔ�������<br>�����ɕK�v��Buff : �u���[�_�[ �}�X�^���[",[53,19,51,43]],
		[["�p�t�H�[�}���X","���_"],[58,6],[30,30],"�b.�g.�v","-",59
			,"�̓��̐��_�͂���_�ɏW������<br>��C�ɕ��o���钴�K�E�Z<br>���̌����ڂ� ������ꌂ�œ|�������ȋC�ɂ�����"],
		[["����"],[56],[60],"�^�C�_�E�� ���[�s���O","-",28
			,"���݂̗͂��������x���g��Ώۂɓ��� �߂炦���Ώۂ̍s���𓐂�<br>���ړ����x�A�U�����x�A�r�����x���ቺ����<br>�����ɕK�v��Buff : �A�h�x���`�����[ �}�X�^���[<br>�g�p�A�C�e�� : �x���g�~�S",[9,10,14,18,56]],
		[["���̉��","�p�t�H�[�}���X"],[11,58],[30,30],"�S��","-",15
			,"�����̎��͂ɐl�����Ăяo��"],
		[["���̖��@"],[49],[90],"�_�[�N�l�X �t�H�[�X","-",45
			,"����̖����тɕ����@�ł̗͂𓾂�<br>���g�̔\�͂��啝�ɏ㏸���邪�@��莞�Ԍ�ɏp�҂͎���<br>�����ɕK�v��Buff : �C�r���i�C�g �}�X�^���[",[30,37,11,49]],
		[["�L�b�N","�U�����"],[39,2],[80,80],"�N�C�b�N�X�e�b�v","-",28
			,"��u�őΏۂƂ̊ԍ������߂�"],
// �񕜌n	(4)
		[["�퓬�Z�p","�_�閂�@"],[40,47],[80,80],"�`�F���W �G�i�W�[","-",0
			,"HP���X�^�~�i�ւƕϊ����邱�Ƃ��ł���"],
		[["����"],[43],[90],"�G���A �`�F���b�V���O","-",45
			,"��������߂Ď��͂ɂ���y�b�g��������AHP���񕜂�����<br>�����ɕK�v��Buff : �u���[�_�[ �}�X�^���[",[53,19,51,43]],
		[["���R���a","���R��","���@�n��"],[51,13,50],[70,70,70],"�l�C�`���[ �q�[�����O","-",40
			,"��n�̗͂��؂�āAHP/MP/ST�̉񕜑��x�����߂�"],
		[["�p�t�H�[�}���X","�_���X"],[58,59],[60,40],"�r.�v.�c","-",28
			,"PT�����o�[�ƃ_���X��x�� HP���R�񕜂�UP������<br>�����ɕK�v��Buff : �r.�m.�e"],
		[["����"],[19],[1],"�����` �^�C��","-",5
			,"�s�N�j�b�N�Z�b�g����������<br>�g�p�A�C�e�� : �s�N�j�b�N �x���Z�b�g"],
		[["�e��","�񕜖��@"],[33,45],[70,20],"�q�[�����O �V���b�g","-",33
			,"�����̖��͂�e�ۂɍ��߂� ����������"],
		[["���R���a"],[51],[80],"�O���[�C���O �c���[","-",38
			,"�����̎����Ăяo�� ���̖͂������񕜂�����<br>�����ɕK�v��Buff : �h���C�h �}�X�^���[<br>�g�p�A�C�e�� : �V�[�h�~�P",[51,45,50,52]],
// �h��n	(5)
		[["�p�t�H�[�}���X","������"],[58,3],[70,70],"�t�@���^�X�e�B�b�N �{�f�B","-",33
			,"�b���ʂ��ꂽ�{�f�B�ł�����U�����󂯎~�߂�<br>�����ɕK�v��Buff : �r���� �}�X�^���[",[29,39,9,3,13,58]],
		[["���܂�","�_�閂�@"],[42,47],[30,70],"���b�N �~�~�b�N","-",40
			,"��ւƎp��ς��A���R�ƈ�̉����ēG���\��<br>�ő�HP�h��́A�y�������啝�㏸�A������啝�ɉ�����<br>�����ɕK�v��Buff : �}�C�� �r�V���b�v �}�X�^���[",[47,50,48,20]],
		[["�퓬�Z�p","��"],[40,35],[90,60],"�E�F�|�� �K�[�h","-",28
			,"�������Ă��闼�蕐��� �G�̒��ڍU����h�䂷��"],
		[["��","�_�閂�@"],[35,47],[90,70],"�v���e�N�g �I�[��","-",45
			,"���̃I�[����PT�����o�[�֔�΂��A��x�����U�����y���A���͖��͉�����"],
		[["��","���R���a"],[37,51],[60,60],"�~�X�g �t�H�[��","-",28
			,"���Ɏp��ς��čU�������킷"],
		[["���@�n��"],[50],[70],"���t���N�g �o���A","-",33
			,"���@�̏�ǂ� ���@�Ɖ������U���𒵂˕Ԃ�<br>�����ɕK�v��Buff:�A���P�~�X�g �}�X�^���[",[44,45,46,47]],
		[["���܂�"],[42],[1],"�n���ω�","-",20
			,"�n���ɕϐg���ĕ����U����h��<br>���ϐg���͈ړ��A�s���s��<br>�����ɕK�v��Buff : �傫�ȗt����"],
		[["��"],[35],[1],"Total Protection","-",5
			,"��x���������_���[�W���y�����邱�Ƃ��ł���<br>���_���[�W��93���h���B�_���[�W���󂯂�ƌ��ʏ���<br>���}�J�t�B�[ �V�[���h�𑕔�����ƕK�vBuff�_��<br>�����ɕK�v��Buff : Total Protection Service"],
// ���]�n	(6)
		[["�|"],[34],[60],"�r �o�C���h","-",28
			,"���ڃ_���[�W�͊��҂ł��Ȃ����A�Ώۂ̓������~�߂邱�Ƃ��ł���<br>�����ɕK�v��Buff : ���]�i���X �t�H�[�X"],
		[["���_"],[6],[30],"�l �C���p�N�g","-",15
			,"���͂����߂����̎���΂�<br>�����_�͂������قǈЗ͂�������Z<br>�����ɕK�v��Buff : ���]�i���X �t�H�[�X"],
		[["�e��"],[33],[60],"�p �V���b�g","-",38
			,"�e��̃f�B���C��啝�ɒZ�k�ł���<br>���U���͏㏸�n�̋Z�▂�@�Əd�����܂���<br>�����ɕK�v��Buff : ���]�i���X �t�H�[�X"],
		[["���_"],[31],[80],"�r �u�����g","-",38
			,"�������߂��Ӑg�̈ꌂ<br>�����ɕK�v��Buff : ���]�i���X �t�H�[�X"],
		[["��"],[32],[60],"�u �E�F�C�u","-",28
			,"�˂����Ă������A���e�̍��g�������N���� �Ώۂ���������<br>�����ɕK�v��Buff : ���]�i���X �t�H�[�X"],
		[["����"],[30],[80],"�a �r�[�g","-",38
			,"�����傫���U�肩�Ԃ�����̓G��ガ�����U��<br>�����ɕK�v��Buff : ���]�i���X �t�H�[�X"],
		[["�f��"],[29],[80],"�a ���b�V��","-",38
			,"�f��ƃL�b�N�̘A���U�����J��o�����Ƃ��ł���<br>���f��݂̂ł������ł��邪�L�b�N�X�L���������ƃ_���[�W����������<br>�����ɕK�v��Buff : ���]�i���X �t�H�[�X"],
		[["���","�_�閂�@"],[18,47],[20,40],"����","-",10
			,"�A�C�e���Ɋ|����ꂽ�􂢂� �_���ȗ͂�p���ĉ�������<br>���n���h���[�y�𑕔����Ă��鎞�Ɏg�p�\"],
// ��	(7)
		[["�_�閂�@"],[47],[1],"���r�e�C�V����","-",5
			,"���̏�ŕ������Ƃ��ł���"],
		[["�򒲍�"],[24],[1],"���C�h �X�^�[�}�C��","-",5
			,"�L�͈͂ɘA���őł��オ��ԉ΂�ݒu����<br>�g�p�A�C�e�� : �G�N�X�v���[�h �|�[�V�����~�R"],
		[["�_�閂�@"],[47],[1],"�}�W�J�� �u���V(��)","-",5
			,"�͂��Ȗ��͂ŒN�ł��g����A�[�g�X�y��<br>�����ɐF���c�����C����`�����Ƃ��ł���<br>�� �W�����v���鎖�ŉ������\<br>�g�p�A�C�e�� : �J���[ �C���N�P"],
		[["�_�閂�@"],[47],[1],"�}�W�J�� �u���V(��)","-",5
			,"�͂��Ȗ��͂ŒN�ł��g����A�[�g�X�y��<br>�����ɐF���c�����C����`�����Ƃ��ł���<br>�� �W�����v���鎖�ŉ������\<br>�g�p�A�C�e�� : �J���[ �C���N�P"],
		[["�_�閂�@"],[47],[1],"�}�W�J�� �u���V(��)","-",5
			,"�͂��Ȗ��͂ŒN�ł��g����A�[�g�X�y��<br>�����ɐF���c�����C����`�����Ƃ��ł���<br>�� �W�����v���鎖�ŉ������\<br>�g�p�A�C�e�� : �J���[ �C���N�P"],
		[["�򒲍�"],[24],[1],"�I���X�e�[�W","-",20
			,"����Ƀ~���[�{�[����ݒu����<br>�g�p�A�C�e�� : �O���[�g ���C�g �|�[�V����"],
//	���@
//	�������@ - �����n	(8)
		[["�������@","�������@"],[46,48],[20,20],"���R�[�� �C���Z�N�g","PD1",11
			,"���͂ɂ���č������Ăяo��"],
		[["�������@","�������@"],[46,48],[50,40],"���R�[�� �}�[�V�[ ���C�g","PD2",23
			,"�r���҂�����Ă���鏬���Ȑ������������"],
		[["�������@","�������@"],[46,48],[90,60],"���R�[�� �G�������^��","PD4",45
			,"�r���҂Ƌ��ɐ���Ă���鐸�����������"],
		[["�������@"],[48],[70],"�T����<br> �X�g�����O �]���r","����",40
			,"�v���C���[�̎��̂�G�}�ɋ��͂ȃ]���r�����҂���<br>�����ɕK�v��Buff : �l�N���}���T�[ �}�X�^���[",[48,49,37,52]],
		[["�_�閂�@","�������@"],[47,48],[60,10],"�z�[���[ ���R�[�h","NQ1",34
			,"���ݒn�����R�[�h �X�g�[���ɏ�������"],
//	�������@ - �U���n	(9)
		[["�񕜖��@","�_�閂�@"],[45,47],[70,70],"�z�[���[ �X�g���C�N","NQ1",40
			,"�A���f�b�g�n�ɑ΂��A�p���_���[�W��^����"],
		[["���̖��@","�_�閂�@"],[49,47],[70,70],"�}�W�b�N �h���C��","PNQ1",20
			,"�����̎���ɂ���G����MP���z������<br>�����ɕK�v��Buff : ���ɂ̌��� �}�X�^���[",[44,45,46,47,48,49]],
		[["�j�󖂖@","�������@","�W����"],[44,46,7],[70,70,70],"�}�W�b�N �A���[","NQ2",40
			,"�����x�̈��k�������͂����<br>�����ɂ��h����ђʂ��邱�Ƃ��ł���"],
		[["�j�󖂖@"],[44],[80],"�p�� �t���A","NQ3",46
			,"������ω��������������������Ȗ��@<br>������R�͂ɂ��y�����󂯂Ȃ�<br>�����ɕK�v��Buff : �A���P�~�X�g�}�X�^���[",[44,45,46,47]],
		[["�j�󖂖@","���@�n��"],[44,50],[90,90],"�I�[�o�[ �h���C�u","PNQ1",100
			,"�\���������͂����͂��Ă��s����<br>�g�p�҂͑S�Ă�MP�������"],
		[["�j�󖂖@","���@�n��"],[44,50],[30,30],"�}�i �{�[��","-",40
			,"�G�}��������Ɍ����Ƃ��ł��閳�������@"],
		[["�j�󖂖@","�m�\"],[44,4],[60,40],"�c�C�X�^�[","NQ1",34
			,"�����𔭐������� �G�����֊����グ��"],
		[["�񕜖��@","�_�閂�@","�W����"],[45,47,7],[90,70,40],"�Z�C�N���b�h ���C","PNQ1",100
			,"���Ȃ�����W�񂵂� ��󂩂�G����������<br>���A���f�b�g�n�ɂ͑�_���[�W��^����<br>�����ɕK�v��Buff : �e���v���i�C�g �}�X�^���["],
		[["�j�󖂖@","���@�n��"],[44,50],[90,90],"�t�@�C�A�[ �X�g�[��","PNQ1",53
			,"����ȉΒ����G���ݍ��� �S�Ă��Ă��s����"],
		[["�_�閂�@","���@�n��"],[47,50],[90,70],"�C�����[�W���� �W���b�W�����g","PNQ1",53
			,"�Ώۂ̏��� �C�����[�W�����\�[�h���o������<br>�V�̍ق��� ��n�֓˂��h��"],
		[["�j�󖂖@","���̖��@"],[44,49],[80,60],"���C���{�[ �V���b�g","NQ3",46
			,"���F�ɋP�����@�̒e�����<br>����ނ̌��ʂ𓯎��ɗ^����"],
		[["�j�󖂖@"],[44],[90],"�r�b�O�o��","PNQ1",200
			,"��_�Ɉ��k�������͂𔚔��I�ɖc�������đΏۂɑ�_���[�W��^����<br>5�l�̃p�[�e�B�[�����o�[���߂��ɂ��鎞�̂ݔ����\"],
		[["�j�󖂖@","�W����"],[44,7],[50,90],"�`�F�C�� �X�y��","NP31",14
			,"�A���Ŗ��@������������<br>���ő�5���܂Ō��Ă� 1���ɂ�MP14�������"],
		[["�j�󖂖@","���R���a"],[44,51],[90,70],"�A�[�X �G�N�X�v���[�W����","PNQ1",53
			,"��n��k�킹 �n�\����}�O�}�𕬏o������"],
//	�������@ - �h��n	(a)
		[["�������@","�񕜖��@"],[48,45],[90,60],"�v���e�N�g �E�H�[��","-",53
			,"�����̎���Ɍ��̕ǂ����҂��A�G��ނ���<br>���������ɍU�����s���Ɖ�������܂�"],
		[["�_�閂�@","�������@"],[47,48],[80,30],"�Z�C�N���b�h �E�H�[��","PNQ1",100
			,"���̖h��ǂ������̎��͂ɏ������āA�����_���[�W���y������<br>�����ʒ��͈ړ����x���ቺ����"],
		[["�񕜖��@","�_�閂�@"],[45,47],[80,80],"�f�B�o�C�� �v���[�~�b�W","NQ3",46
			,"���̉H�߂�Z�� ���܂��܂ȕ��̌��ʂ���g�����"],
		[["�_�閂�@"],[47],[90],"�V���C�j���O �t�H�[�X","PNQ1",53
			,"���Ȃ���̃I�[����Z�� �_���[�W���y������<br>�����ɕK�v��Buff : �e���v���i�C�g �}�X�^���[",[47,45,40,31,7]],
//	�������@ - �⏕�n	(b)
		[["���̖��@","�񕜖��@"],[49,45],[70,40],"�C�O�U�[�X�g","NQ2",40
			,"�Ώۂ̑S�Ă̍s���ɂ����āA�X�^�~�i�̏���{�ɂȂ�<br>����NPC��ł́A�ړ����x���x���Ȃ���ʂ������"],
		[["���̖��@","���@�n��"],[49,50],[80,70],"�G�������^�� �u���C�N","NQ3",46
			,"�ł̗͂ɂ�薂�@�ϋv�x��ቺ������"],
		[["���̖��@","�������@"],[49,48],[90,60],"�_�[�N�l�X �t�H�O","PNQ1",53
			,"�Í��̖������҂��A���͂̓G�̍U���͂�ቺ������<br>�����ʒ��͋Z�▂�@�ɂ��U���͏㏸��ł�����"],
		[["�_�閂�@","�������@"],[47,46],[90,90],"�A�N�e�B�x�C�V����","PNQ1",100
			,"���̂������������A�ꎞ�I�ɃX�^�~�i���R�񕜗ʂ��㏸������"],
		[["�������@","���@�n��"],[46,50],[90,80],"�E���e�B���C�g �G�i�W�[","PNQ1",53
			,"��莞�� �ő�ST��ST���R�񕜗ʂ��啝�ɏ㏸����"],
		[["�_�閂�@","���̖��@"],[47,49],[70,40],"�|�C�Y�� �u���C�h","NQ2",33
			,"����ɓł��h�点 �y������ǉ�����<br>���v���C���[�̃��C���U���݂̂ɑ�����t������"],
		[["���̖��@","��"],[49,37],[90,70],"�u���b�e�B �u���C�h","PNQ1",53
			,"����Ɉł̗͂��h�点 �Ώۂ̗̑͂�D�������ɕς���<br>�����茕�ɂ�郁�C���U���ɂ̂݌��ʂ�����"],
		[["���̖��@","�_�閂�@"],[49,47],[40,40],"�l�Q�[�g �~�X�g","NP3",23
			,"���������Ώۂ��ݍ��� �`���[�W���ꂽ���@����������<br>����Mob�ɑ΂��Ă� ���͂����������"],
		[["�������@","�_�閂�@"],[46,47],[80,50],"�A�N�Z�����C�V����","NQ3",46
			,"PT�����o�[�̔������x�����߂� �U�����x���㏸������"],
		[["�������@","�f��"],[46,29],[90,90],"�A�N�����C�g �}�i","PNQ1",30
			,"���Ƀ}�i���W�������� �ꎞ�I�ɍU���͂����߂�<br>�ő�(4�i�K)�܂Ń}�i�𗭂߂邱�Ƃ� ���͂Ȉꌂ�𔭓����邱�Ƃ��ł���"],
		[["�������@","���R���a"],[48,51],[70,50],"�N�C�b�N�T���h","NQ2",40
			,"���n���𑫌��ɏ�������"],
		[["�p�t�H�[�}���X","�����Ȃ�","�U�����","���܂�","�����׍H","�ٖD"],[58,1,2,42,25,23],[90,90,90,90,90,90],"���ɋ��_�^�C�^�[��","PNQ10",5
			,"�^�̃q�[���[�݂̂��Ăяo�����Ƃ��ł��郍�{�b�g<br>�^�C�^�[���𑀂� ���𓢂āI"],
//	�������@ - �񕜌n	(c)
		[["���̖��@","���̉��"],[49,11],[70,70],"�Z���t �T�N���t�@�C�X","NQ2",40
			,"������HP��PT�����o�[�ɕ����^����"],
		[["�񕜖��@","���@�n��"],[45,50],[90,90],"�O���[�v ���o�C�^��","PNQ1",53
			,"�����̋߂��ɂ���p�[�e�B�����o�[�̃X�^�~�i���񕜂���"],
		[["�_�閂�@","���@�n��"],[47,50],[50,50],"�f�B�o�C�h �}�i","NP3",50
			,"�����MP�𖡕��ɕ����^����"],
		[["�񕜖��@"],[45],[90],"���U���N�V���� �I�[��","PNQ3",120
			,"���Ȃ鑧���Ŏ��҂����S�ȏ�Ԃőh��������<br>�����ɕK�v��Buff : ���ɂ̌��� �}�X�^���[",[44,45,46,47,48,49]]
];


function setTech(skillnum){
	var techtable = "";
	skillpoint = pdata[skillnum];

	techtable = "<div style='width:620px; height:900px; padding:10px;'>"
		+ "<b>" + techlist[skillnum][1] + "</b>"
		+ "<div align=right><a href='#' class='con' onclick='window.close(); return false;'>����</a></div>";

	if(techlist[skillnum][2] != null){
		techtable += "<table cellpadding=5 cellspacing=0 class='tech'>\n"
			+ "<tr class='tech'>\n"
			+ "<th class='tech' width=20>�l</th>\n"
			+ "<td class='tech' width=100><b>�e�N�j�b�N��</b></td>\n"
			+ "<td class='tech'>����</td>\n";
		if(skillnum >= 44 && skillnum <= 49)
			techtable += "<td nowrap class='tech' width=30>�G�}</td>\n"
				+ "<td nowrap class='tech' width=20>MP</td>\n"
				+ "</tr>\n";
		if(skillnum < 44 || skillnum > 49)
			techtable += "<td nowrap class='tech' width=20>ST</td>\n"
				+ "</tr>\n";

		for(i=1; i<techlist[skillnum][2].length; i++){
			if(techlist[skillnum][2][i]==0){
				techtable += "<tr><td class='tech' colspan=5 style='font-size:0px; height:0px;'>�@</td></tr>\n";
			}else{
				techtable += "<tr class='tech'>\n";
				if(techlist[skillnum][2][i][1] > 0)
					techtable += "<th rowspan=" + techlist[skillnum][2][i][1] + " class='tech'>" + techlist[skillnum][2][i][0] + "</th>\n";
				techtable += "<td nowrap class='tech'><b>" + techlist[skillnum][2][i][2] + "</b></td>\n"
					+ "<td class='tech'>" + techlist[skillnum][2][i][5] + "</td>\n";

				if(skillnum >= 44 && skillnum <= 49)
					techtable += "<td class='tech'>" + techlist[skillnum][2][i][3] + "</td>\n";

				if(skillpoint <= techlist[skillnum][2][i][0] * 10000)
					techtable += "<td nowrap class='tech'>"+ techlist[skillnum][2][i][4] +"</td>\n";
				if(skillpoint > techlist[skillnum][2][i][0] * 10000 && skillpoint <= techlist[skillnum][2][i][0] * 10000 + 100000){
					techtable += "<td nowrap class='tech'>" + techlist[skillnum][2][i][4] + " (" 
							+ ( techlist[skillnum][2][i][4] * ( 1000000 + (techlist[skillnum][2][i][0] *10000 - skillpoint) * 2 ) / 1000000 ) + ")" +"</td>\n";
				}if(skillpoint > techlist[skillnum][2][i][0] * 10000 + 100000){
					techtable += "<td nowrap class='tech'>" + techlist[skillnum][2][i][4] + " (" + ( techlist[skillnum][2][i][4] * 8 / 10 ) + ")" +"</td>\n";
				}

				techtable += "</tr>\n";
			}
		}
	techtable += "</table>\n<br>";
	}

	var hukugou = new Array();

	k = 0;
	for(i=0; i < hspeciality.length; i++){
		flag = 0;
		for(j=0; j < hspeciality[i][1].length; j++)
			if(hspeciality[i][1][j] == skillnum)
				flag = 1;
		if(hspeciality[i][7])
			for(j=0; j < hspeciality[i][7].length; j++)
				if(hspeciality[i][7][j] == skillnum)
					flag = 1;
		if(flag==1){
			hukugou[k] = hspeciality[i];
			k++;
		}
	}

	if(hukugou != ""){
		techtable += "<div><b>�����E�֘A</b></div>";

		techtable += "<br>\n<table cellpadding=5 cellspacing=0 class='tech'>\n"
			+ "<tr class='tech'>\n"
			+ "<th class='tech'>�l</th>\n"
			+ "<td nowrap class='tech'><b>�e�N�j�b�N��</b></td>\n"
			+ "<td nowrap class='tech'>����</td>\n"
			+ "<td class='tech'>�G�}</td>\n"
			+ "<td nowrap class='tech'>ST/MP</td>\n"
			+ "</tr>\n";

		for(i=0; i<hukugou.length; i++){
			if(hukugou[i]==0){
				techtable += "<tr class='tech'><td colspan=5 style='font-size:0px;' class='tech'>�@</td></tr>\n";
			}else{
				techtable += "<tr class='tech'>\n"
					+ "<td nowrap class='tech'><b>";
				j = 0;
				while(j<hukugou[i][0].length){
					techtable += hukugou[i][0][j] + hukugou[i][2][j] + "<br>";
					j++;
				}
				techtable += "</b></td>\n"
					+ "<td nowrap class='tech'><b>" + hukugou[i][3] + "</b></td>\n"
					+ "<td class='tech'>" + hukugou[i][6] + "</td>\n"
					+ "<td class='tech'>" + hukugou[i][4] + "</th>\n";

				var deff = new Array(hukugou[i][0].length);
				for(j=0; j<hukugou[i][1].length; j++)
					deff[j] = 0;
				deffsum = 0;
				for(j=0; j<hukugou[i][0].length; j++){
					deff[j] = pdata[hukugou[i][1][j]] - hukugou[i][2][j] * 10000;
					if(deff[j] < 0) deff[j] = 0;
					if(deff[j] > 100000) deff[j] = 100000;
					deffsum = deffsum + deff[j];
				}

				if(deffsum == 0){
					techtable += "<td nowrap class='tech'>" + hukugou[i][5] + "</td>\n";
				}else{
					techtable += "<td nowrap class='tech'>" + hukugou[i][5] + " ("
						+ Math.floor( hukugou[i][5] * ( 500000 * hukugou[i][0].length - deffsum )  / ( 50 * hukugou[i][0].length ) )/10000 + ")" +"</td>\n";
				}
				techtable += "</tr>\n";
			}
		}
		techtable += "</table><br>\n";
	}

	techtable += "</div></div>";

	if(alrtwin){
		alrtwin.document.getElementById('techinfo').innerHTML = techtable;
		alrtwin.focus();
	}if(!alrtwin){
		var alrtwin = window.open('','','width=640,height=960');
		alrtwin.document.open();
		alrtwin.document.write("<html><head>");
		alrtwin.document.write("<title> " + techlist[skillnum][1] + " - �������邭</title>");
		alrtwin.document.write("<link rel=stylesheet href='data/moeclcip.css' id='csslink' type='text/css'>");
		alrtwin.document.write("<meta name='viewport' content='width=640,initial-scale=0.5,maximum-scale=2.0' /> ");
		alrtwin.document.write("</head><body bgcolor=#ccccdd>");
		alrtwin.document.write("<div id='techinfo'>");
		alrtwin.document.write(techtable);
		alrtwin.document.write("</div></body></html>");
		alrtwin.document.close();
		alrtwin.focus();
	}

}