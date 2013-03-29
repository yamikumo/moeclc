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
		document.mcfrm.result.value = "TOTAL : " + sum/10000 + "　　REST : " + rest/10000;
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
	document.mcfrm.sname.value = "旅人";
	calc();
	setAlertLayer("全て初期値に戻しました。<p><form><input type='button' value='閉じる' onclick='offOptionLayer()'></form></p>");

}

function codeCopy(){
	code_race = document.mcfrm.race_list.selectedIndex;
	code = encode();

// URL化
	var url = "";
	url = "http://uniuni.dfz.jp/moeclc4/?" + code_race + "&" + code;
	document.mcfrm.code.value = url;

	setAlertLayer("<br>以下のURLを選択し、右クリックメニューよりコピーしてください。<br><br><form><b>基本</b> （従来の形式）<br>"
		+ "<textarea cols=60 rows=2 readonly style='overflow:hidden;' onfocus='this.select();' onclick='this.select();'>" + url + "</textarea>"
		+ "<br><br><br><b>基本＋シップ名</b><br>"
		+ "<textarea cols=60 rows=2 readonly style='overflow:hidden;' onfocus='this.select();' onclick='this.select();'>" + url + "&&" + sdata[0] + sdata[1] + sdata[2] + "</textarea>"
		+ "<br><br><br><b>基本＋シップ名＋キャラクター名</b><br>"
		+ "<textarea cols=60 rows=3 readonly style='overflow:hidden;' onfocus='this.select();' onclick='this.select();'>" + url + "&" + encodeURIComponent(document.mcfrm.cname.value) + "&" + sdata[0] + sdata[1] + sdata[2] + "</textarea>"
		+ "<br><br>下のURLは 匿名掲示板で貼らないように気を付けましょう<br><br><input type='button' value='閉じる' onclick='offOptionLayer()'></form></p>");

}

function listCopy(){
	var SkillData = new Array(
		" 筋力　　　　"," 着こなし　　"," 攻撃回避　"," 生命力 　　",
		" 知能　　　　"," 持久力 　　"," 精神力 　　"," 集中力 　　",
		"呪文抵抗力"," 落下耐性　"," 水泳　　　　"," 死体回収　",
		" 包帯　　　　"," 自然回復　"," 採掘　　　　"," 伐採　　　　",
		" 収穫　　　　"," 釣り　　　　."," 解読　　　　"," 料理　　　　",
		" 鍛冶　　　　"," 醸造　　　　"," 木工　　　　"," 裁縫　　　　",
		" 薬調合 　　"," 装飾細工　"," 複製　　　　"," 栽培　　　　",
		" 美容　　　　"," 素手　　　　"," 刀剣　　　　"," こんぼう　　",
		" 槍 　　　　　"," 銃器　　　　"," 弓 　　　　　"," 盾 　　　　　",
		" 投げ　　　　"," 牙 　　　　　"," 罠 　　　　　"," キック　　　.",
		" 戦闘技術　"," 酩酊　　　　"," 物まね 　　."," 調教　　　　",
		" 破壊魔法　"," 回復魔法　"," 強化魔法　"," 神秘魔法　",
		" 召喚魔法　"," 死の魔法　"," 魔法熟練　"," 自然調和　",
		" 暗黒命令　"," 取引　　　　"," シャウト　　"," 音楽　　　　",
		" 盗み　　　　"," ギャンブル ","パフォーマンス"," ダンス　　　");

	var SkillData2 = new Array(
		"筋力","着こなし","回避","生命",
		"知能","持久","精神","集中",
		"抵抗","落下","水泳","回収",
		"包帯","自然回復","採掘","伐採",
		"収穫","釣り","解読","料理",
		"鍛冶","醸造","木工","裁縫",
		"調合","装飾","複製","栽培",
		"美容","素手","刀剣","棍棒",
		"槍","銃器","弓","盾",
		"投げ","牙","罠","キック",
		"戦技","酩酊","物まね","調教",
		"破壊","回復","強化","神秘",
		"召喚","死魔","魔熟","調和",
		"暗黒","取引","シャウト","音楽",
		"盗み","ギャンブル","パフォ","ダンス");

	i=0; j=0;
	tmpTxt = "シップ名 : " + document.mcfrm.sname.value + "\n";
	tmpTxt2 = "";
	while(i<=60){
		if(pdata[i]>0){
			tmpTxt += "【" + SkillData[i] + "】　" + pdata[i]/10000 + "\n";
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
	setAlertLayer("<p>以下のリストをコピーしてください。</p><form name='asfrm'><textarea class='log2' name='list_dsp' rows=10 cols=50>" + tmpTxt + "</textarea><br><input type='radio' class='chk' name='list_mode' onclick='listMode(0)' checked>スキル相談スレ用　<input type='radio' class='chk' name='list_mode' onclick='listMode(1)'>ゲーム内発言用</form><form><input type='button' value='閉じる' onclick='offOptionLayer()'></form></p>");
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

// URL化
	var url = "";
	url = "http://uniuni.dfz.jp/moeclc4/?" + code_race + "&" + code;

// 名前
	code_cname = document.mcfrm.cname.value;
	if(code_cname == "" || code_cname == "no name")
		code_cname = "no name"

	if(navigator.userAgent.indexOf("MSIE") != -1){
		window.external.AddFavorite(url,'もえかるく - ' + code_cname + ' の構成');
	}
	else if(navigator.userAgent.indexOf("Firefox") != -1){
		window.sidebar.addPanel('もえかるく - ' + code_cname + ' の構成',url,'');
	}
	else{
		setAlertLayer("このブラウザではJavaScriptによるブックマーク機能はサポートされません。URLを出力して自身で作成をお願いします。");
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
	setAlertLayer("Slot "+num+" にセーブしました。<p><form><input type='button' value='閉じる' onclick='offOptionLayer()'></form></p>");
//	alert(code_race + "&" + code_lock_pnt + "&" + code_cname);
}

function encode(){
	var code_lock = code_pnt = "";

// LOCK情報の圧縮
	for(i=0; i<9; i++){		// if(スキル数%7 != 0) i = スキル数 + 7 - スキル数%7
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

// ポイント情報の圧縮
	for(i=0; i<60; i++){
		if(pdata[i]%1000!=0)		// スキル値に小数第2位以下がある場合
			tmp = "vwxyz".charAt(Math.floor(pdata[i]/238328))
				+ "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor((pdata[i]%238328)/3844))
				+ "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(((pdata[i]%238328)%3844)/62))
				+ "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(((pdata[i]%238328)%3844)%62);
		if(pdata[i]%1000==0)		// スキル値に小数第2位以下がない場合
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
		setAlertLayer("クッキーからロードします。(Slot "+num+")<p><form><input type='button' value='閉じる' onclick='offOptionLayer()'></form></p>");
	}
	if(mode == "url"){
		code = top.location.search.substring(1);
		code_sname = code.split("&")[4];
		setAlertLayer("URLからロードします。<p><form><input type='button' value='閉じる' onclick='offOptionLayer()'></form></p>");
	}

	code_race = code.split("&")[0];
	code_lock = code.split("&")[1];
	code_pnt = code.split("&")[2];
	code_cname = unescape(code.split("&")[3]);

//	alert("race : " + code_race + "\nlock : " + code_lock + "\npnt : " + code_pnt);

// デコード - ポイント情報
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
//	alert("ポイント : "+pdata);

// デコード - LOCK情報
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

//	alert("ロック : "+ldata);

// デコード - シップ情報
		if(code_sname){
			sdata[0] = code_sname.substring(0,2);
			sdata[1] = code_sname.substring(2,4);
			sdata[2] = code_sname.substring(4,6);
		}
//

// 復元
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
//	キャラクターの名前をJavaScriptで encodeURIComponent() 処理してQueryに&で追加しておくと、URLからもキャラの名前を呼びだします。
//	例） http://uniuni.dfz.jp/moeclc4/?0&97&0bW3m64H5iS6oQ7RAn4GlMIp0JHOoGUH&%E3%82%82%E3%81%88%E3%81%8B%E3%82%8B%E3%81%8F
		if(mode == "url" && code.split("&")[3] != null){
			document.mcfrm.cname.value = decodeURIComponent(code.split("&")[3]);
		}
	}
	else{
		setAlertLayer("コードが不正です。<p><form><input type='button' value='閉じる' onclick='offOptionLayer()'></form></p>");
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
		setAlertLayer("<form><table border=0><td><div style='font-size:14px;'>　　　　　　　　　　　　　（⌒`⌒'）<br>　　　　　　　　　　　　　 |　　　 |<br>　　　　　　　　　　　　　 |_l_l＿_|<br>　　　　　　　//￣ヽ＿/　 =ﾟωﾟ）<br>　　　　　　|￣￣|＿.　|　　/￣￣￣(O|||||O)<br>.⌒ヽ　,;;;　| /￣ヽ　||_と__|//￣ヽ￣| |||||/ヽ<br>（\";\"':;.):;ﾞ　|_| ◎ |＿＿＿　| ◎ .| |=======<br>　　⌒;:ヽ;;　ヽ＿//　　　　 ヽ＿//　ヽ＿//）дﾟ)・∵</div></td></table><br><input type='button' value='閉じる' onclick='offOptionLayer()'></form>");


// AAおわり

	calc();
}

function cfmDelete(){
	num = document.mcfrm.slot.options[document.mcfrm.slot.selectedIndex].value;
	setAlertLayer("Slot "+num+" のセーブデータを消しますか？<p><form><input type='button' value=' はい ' onclick='deleteCookie()'>　　<input type='button' value='いいえ' onclick='offOptionLayer()'></form></p>");
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

	setAlertLayer("Slot "+num+" のセーブデータは削除されました。<p><form><input type='button' value='閉じる' onclick='offOptionLayer()'></form></p>");
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

// ステータス計算関連

// 種族初期値(HP,MP,ST,重量),倍率(HP,MP,ST,攻撃力,命中,防御力,回避,魔力,呪文抵抗力,重量)*100
rpnt =[
	[30,30,30,10,100,100,100,100,100,100,100,100,100,100],
	[30,35,30,5,95,110,95,95,105,95,95,110,110,90],
	[25,30,35,10,95,100,105,95,105,95,110,95,100,100],
	[35,20,30,15,105,95,100,105,100,100,95,90,90,120]
];

mastery = [
	["WAR","ウォーリアー マスタリー","刀剣武器を振るときのディレイが短くなる",
		"刀剣、キック、盾、戦技",[30,35,39,40],
		["ウォーリア","ファイター","ナイト"]
	],
	["ALC","アルケミスト マスタリー","魔法詠唱速度が速くなる",
		"破壊、強化、回復、神秘",[44,45,46,47],
		["アルケミスト","マスターウィザード","ウォーロック"]
	],
	["FOR","フォレスター マスタリー","弓攻撃の発射間隔が短くなる",
		"弓、調和、物まね、調教",[34,51,42,43],
		["フォレスター","フォレストマスター","スカイウォーカー"]
	],
	["NEC","ネクロマンサー マスタリー","召喚魔法の詠唱時間が短縮される",
		"召喚、死魔、牙、暗黒",[48,49,37,52],
		["ネクロマンサー","ダークプリースト","シャドウナイト"]
	],
	["CRE","クリエイター マスタリー","合成アクションゲージの移動速度が遅くなる",
		"鍛冶、木工、伐採、採掘",[20,22,15,14],
		["クリエイター","マスタークリエイター","ジェネシス"]
	],
	["BOM","爆弾男 マスタリー","罠の設置間隔が短くなる",
		"罠、調和、持久、物まね",[38,51,5,42],
		["爆弾男<br>爆弾女","超爆弾男<br>超爆弾女","ボンバーキング<br>ボンバークイーン"]
	],
	["TEM","テンプルナイト マスタリー","アンデッド系の敵に聖なる追加ダメージを与える",
		"神秘、回復、戦技、棍棒、集中",[47,45,40,31,7],
		["テンプルナイト","パラディン","セイクリッドロード"]
	],
	["DRU","ドルイド マスタリー","毒にかかった時に自動で解毒される",
		"調和、回復、魔熟、暗黒",[51,45,50,52],
		["ドルイド","マスタードルイド","ドルイドキング"]
	],
	["SAG","紺碧の賢者 マスタリー","詠唱中の移動速度が速くなる<br>&nbsp;モーションが、賢者風になる<br>&nbsp;※モーションは、男性キャラ限定",
		"破壊、回復、強化、神秘、死魔、召喚",[44,45,46,47,48,49],
		["紺碧の賢者","深緋の賢者","白銀の賢者"]
	],
	["EVI","イビルナイト マスタリー","死の魔法の詠唱スピードが速くなる",
		"刀剣、牙、回収、死魔",[30,37,11,49],
		["イビルナイト","デスナイト","ヘルナイト"]
	],
	["ATH","アスリート マスタリー","自然スタミナ回復速度が速くなる",
		"水泳、落下、調和、自然回復",[10,9,51,13],
		["アスリート","トライアスリート","鉄人"]
	],
	["GRE","グレイト クリエイター マスタリー","荷物を持てる重量が増加し、<br>&nbsp;グレードの高い合成品を作成しやすくなります",
		"鍛冶、木工、裁縫、調合、装飾、料理、複製、醸造",[19,20,21,22,23,24,25,26],
		["グレイトクリエイター","クリエイトロード","人間国宝"]
	],
	["ROW","荒くれ者 マスタリー","ヒット・ポイント(HP)の回復速度が速くなる",
		"素手、キック、落下、生命、自然回復、パフォ",[29,39,9,3,13,58],
		["荒くれ者","レスラー","チャンピオン"]
	],
	["MER","傭兵 マスタリー","所持可能重量が増加する",
		"銃器、罠、物まね、戦技、料理",[33,38,42,40,19],
		["傭兵","ヒットマン","ゴッドファーザー"]
	],
	["BRA","ブレイブナイト マスタリー","防御力が上昇します",
		"戦技、棍棒、盾、抵抗、着こなし",[40,31,35,8,1],
		["ブレイブナイト","アーマーナイト","ジャスティスタンク"]
	],
	["DKF","酔拳士 マスタリー","待機状態が酔いモーションになる",
		"酩酊、素手、回避、持久、キック",[41,29,2,5,39],
		["酔拳士","酔拳マスター","酔拳聖"]
	],
	["SAM","サムライ マスタリー","二刀流による攻撃が可能になる。<br>&nbsp;左手に刀剣武器を装備している必要があります。",
		"刀剣、包帯、戦技、回避、筋力、精神",[30,12,40,2,0,6],
		["サムライ","サムライ マスター","将軍"]
	],
	["MIN","マイン ビショップ マスタリー","グレードの高い合成品を作成しやすくなります",
		"神秘、魔熟、召喚、鍛冶",[47,50,48,20],
		["マインビショップ","メタルビショップ","フルメタルビショップ"]
	],
	["KIT","厨房師 マスタリー","料理と醸造の 合成成功率が上昇する",
		"料理、醸造、抵抗",[19,21,8],
		["厨房師","マスター厨房師","ゴッド厨房師"]
	],
	["ASS","アサシン マスタリー","傾いた地形に対して水平に走れるようになる",
		"刀剣、罠、物まね、調和、調合、落下、投げ",[30,38,42,51,24,9,36],
		["アサシン","忍者","御庭番"]
	],
	["COS","コスプレイヤー マスタリー","全てのシップ装備を身に付けることが可能になる",
		"装飾、裁縫、着こなし、物まね、回避、パフォ",[25,23,1,2,42,58],
		["コスプレイヤー","コスプレヒーロー<br>コスプレヒロイン","ヒーロー<br>ヒロイン"]
	],
	["DAB","物好き マスタリー","移動と待機モーションが、<br>&nbsp;傷ついた戦士のモーションに変わる<br>&nbsp;※男性キャラ限定",
		"水泳、収穫、酩酊、落下、回収、パフォ",[10,16,41,9,11,58],
		["物好き","ネタ師変人","神ネタ師"]
	],
	["SEA","海戦士 マスタリー","槍攻撃の間隔が短くなる",
		"水泳、槍、料理、釣り、取引",[10,32,19,17,53],
		["海戦士","英雄海戦士","海王"]
	],
	["BRE","ブリーダー マスタリー","調教スキルの技のディレイが早くなる",
		"取引、料理、調和、調教",[53,19,51,43],
		["ブリーダー","ブリード マスター","ブリード ロード"]
	],
	["YAN","チンピラ マスタリー","棍棒武器を振るときのディレイが短くなる",
		"棍棒、取引、盗み、酩酊",[31,53,56,41],
		["チンピラ","アウトロー","ギャング / レディース"]
	],
	["IDL","新人アイドル マスタリー","体の周りがキラキラ輝く",
		"ダンス、音楽、水泳、パフォ",[59,55,10,58],
		["新人アイドル","ビスク アイドル","ダイアロス アイドル"]
	],
	["HOU","ハウスキーパー マスタリー","裁縫合成の成功率が上昇します",
		"料理、裁縫、美容",[19,23,28],
		["ハウスキーパー","メイド","アビゲイル"]
	],
	["SPY","スパイ マスタリー","回避率が上昇します",
		"投げ、物まね、盗み",[36,42,56],
		["スパイ","ストーカー","ステルス"]
	],
	["TEA","アカデミアン マスタリー","複製スキルの合成成功率が上昇する",
		"解読、複製、集中、神秘、精神",[18,26,7,47,6],
		["アカデミアン","ティーチャー","プロフェッサー"]
	],
	["ADV","アドベンチャラー マスタリー","水中移動速度が上昇し落下ダメージが軽減される",
		"落下、水泳、採掘、解読、盗み",[9,10,14,18,56],
		["アドベンチャラー","エクスプローラー","トレジャー ハンター"]
	],
	["BBD","ブラッド バード マスタリー","音楽スキル・シャウトスキルの詠唱速度が上昇する",
		"シャウト、持久力、牙、音楽",[54,5,37,55],
		["ブラッド バード","ドレッド バード","カオス バード"]
	],
	["DUE","デュエリスト マスタリー","攻撃力が上昇する",
		"槍、筋力、着こなし、自然回復、シャウト",[32,0,1,13,54],
		["デュエリスト","レガトゥス","タイラント"]
	]
//	["FRE","自由人 マスタリー","？",
//		"？",[0],
//		["自由人","？","？"]
//	]
];

shiplist = [
	[29,"素手","パンチャー","ボクサー","フィストマスター"],
	[30,"刀剣","剣士","セイバー","ブレードマスター"],
	[31,"こんぼう","メイサー","クラッシャー","デストロイヤー"],
	[32,"槍","ランサー","ジャベリンナイト","ドラゴンスレイヤー"],
	[33,"銃器","ガンナー","バレッティア","イーストウッド"],
	[34,"弓","アーチャー","スナイパー","ホークアイ"],
	[35,"盾","ガーズマン","ディフェンダー","ガーディアン"],
	[36,"投げ","投げ士","スマッシャー","ドリームフィールダー"],
	[37,"牙","ブラッド サッカー","ヴァンパイア","ヴァンパイア ロード"],
	[38,"罠","レンジャー","罠師","仕事人"],
	[39,"キック","キッカー","ハイキッカー","ムーンシューター"],
	[40,"戦闘技術","ワイルドマン","バーバリアン","バーサーカー"],
	[41,"酩酊","ドリンカー","大酒飲み","ちゃぶ台返し"],
	[42,"物まね","物まね師","道化師","道化王"],
	[43,"調教","テイマー","ハイ テイマー","マスター テイマー"],
	[44,"破壊魔法","ウィザード/ウィッチ","メイジ","アークメイジ"],
	[45,"回復魔法","プリースト","ハイ プリースト","プリースト ロード"],
	[46,"強化魔法","シャーマン","ハイ シャーマン","シャーマン ロード"],
	[47,"神秘魔法","エンチャンター","ハイ エンチャンター","エンチャント ロード"],
	[48,"召喚魔法","サモナー","ハイ サモナー","サモンロード"],
	[49,"死の魔法","シャドウ","リーパー","ジョーカー"],
	[50,"魔法熟練","魔術師","幻術師","幻術王"],
	[51,"自然調和","野生児","ピース バイバー","ジャングル マスター"],
	[52,"暗黒命令","小悪魔","デーモン","デーモン ロード"],
	[53,"取引","ベンダー","商人","豪商"],
	[54,"シャウト","ロック シンガー","ハード ロッカー","メタル シンガー"],
	[55,"音楽","ソングシンガー","バード","聖歌隊長 / 歌姫"],
	[56,"盗み","スリ","ひったくり","泥棒"],
	[58,"パフォーマンス","目立ちたがり","大道芸人","芸人"],
	[59,"ダンス","ストリートダンサー","バニーダンサー","スターダンサー"],
	[0],
	[9,"落下耐性","フォールマン","vスカイダイバー","フォーリング ロード"],
	[10,"水泳","スイマー","ライフガード","サブマリン"],
	[11,"死体回収","デッドマン","スカベンジャー","ルートマスター"],
	[12,"包帯","ヘルパー","メディック/ナース","ジェネラル メディック"],
	[13,"自然回復","休憩人","瞑想師","瞑想マスター"],
	[14,"採掘","マイナー","ゴールドマイナー","マインロード"],
	[15,"伐採","木こり","伐採師","ランバー ロード"],
	[16,"収穫","耕作師","農夫","農場主"],
	[17,"釣り","釣り人","釣り師","名人釣り師"],
	[18,"解読","解読者","探求者","博識者"],
	[0],
	[19,"料理","料理師","シェフ","マスター シェフ"],
	[20,"鍛冶","鍛冶屋","メタルワーカー","メタルマスター"],
	[21,"醸造","バーテンダー","醸造師","醸造王"],
	[22,"木工","木工師","大工師","親方"],
	[23,"裁縫","仕立て屋","着付け師","ブランド デザイナー"],
	[24,"薬調合","調合師","秘薬師","魔医師"],
	[25,"装飾細工","細工師","宝石師","ジュエル マスター"],
	[26,"複製","筆記師","贋作師","フェイクロード"],
	[28,"美容","理髪師","化粧師","カリスマ美容師"]
];

function setShip(){
	var shiptable = "";

	shiptable = "<div id='option3' style='background-color:#ccccdd; padding:10px 10px 10px 15px;'>"
		+ "<div style='width:650px; height:590px; overflow-y:auto;'>"
		+ "<table cellpadding=5 cellspacing=0 width=600 class='tech'>\n";

	for(i=0; i<mastery.length; i++){
		shiptable += "<tr>\n"
			+ "<th rowspan=2 class='tech' width=200><a class='sk' href='JavaScript:selectMastery(" + i
			+ ",0);' title='スキル0に戻す'>" + mastery[i][3] + "</a></th>\n"
			+ "<td class='tech sp'><a class='ms' href='JavaScript:selectMastery(" + i + ",40);' title='スキル40までポイントを振る'>"
			+ mastery[i][5][0] + "</a></td>\n"
			+ "<td class='tech sp'><a class='ms' href='JavaScript:selectMastery(" + i + ",70);' title='スキル70までポイントを振る'>"
			+ mastery[i][5][1] + "</a></td>\n"
			+ "<td class='tech sp'><a class='ms' href='JavaScript:selectMastery(" + i + ",90);' title='スキル90までポイントを振る'>"
			+ mastery[i][5][2] + "</a></td>\n"
			+ "</tr><tr>\n"
			+ "<td colspan=3 class='tech'><nobr>" + mastery[i][2] + "</nobr></a></td>\n"
			+ "</tr>\n";
	}

	shiptable += "</table>\n<br>\n<table cellpadding=5 cellspacing=0 width=600 class='tech'>\n";

	for(i=0; i<shiplist.length; i++){
		if(shiplist[i][0] == 0){
				shiptable += "<tr class='tech'><td colspan=4 style='font-size:0px;' class='tech'>　</td></tr>\n";
		}else{
			shiptable += "<tr class='tech'>\n"
				+ "<th class='tech'><a class='sk' href='JavaScript:prp(" + shiplist[i][0]
				+ ",0,3);' title='スキル0に戻す'>" + shiplist[i][1] + "</a></th>\n"
				+ "<td class='tech sp'><a class='ms' href='JavaScript:prp(" + shiplist[i][0] + ",30,3);' title='スキル30までポイントを振る'>"
				+ shiplist[i][2] + "</a></td>\n"
				+ "<td class='tech sp'><a class='ms' href='JavaScript:prp(" + shiplist[i][0] + ",60,3);' title='スキル60までポイントを振る'>"
				+ shiplist[i][3] + "</a></td>\n"
				+ "<td class='tech sp'><a class='ms' href='JavaScript:prp(" + shiplist[i][0] + ",90,3);' title='スキル90までポイントを振る'>"
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
				+ " onclick='selectMastery("+i+",0);' title='関連スキルをポイント0に戻す'></td>"
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
		tmpLog += " onclick='selectMastery("+i+",40);' title='関連スキル40までポイントを振る'></td>"
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

