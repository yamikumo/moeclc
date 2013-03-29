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
		document.getElementById('skl'+i).style.backgroundPosition = "-150px 0px";
		if(!document.mcfrm.premium.checked)
			document.mcfrm.pnt[i].value = "0.0";
		if(document.mcfrm.premium.checked)
			document.mcfrm.pnt[i].value = "0.0000";
		document.getElementById("skl"+i).style.borderColor = "#ffff00";
	}
	document.mcfrm.race_list.selectedIndex = 0;
	calc();
	setAlertLayer("全て初期値に戻しました。<p><form><input type='button' value='閉じる' onclick='offOptionLayer()'></form></p>");

}

function codeCopy(umode){
	code_race = document.mcfrm.race_list.selectedIndex;
	code = encode();

// URL化
	var url = "";
	url = "http://uniuni.dfz.jp/moeclc4/?" + code_race + "&" + code;
	document.mcfrm.code.value = url;

	if(umode==0){
		setAlertLayer("<br>URLを長押ししてコピーしてください。<br><br><br><span style='-webkit-user-drag:element; -webkit-user-select:text'>" + url + "</span><br><br><br><form><input type='button' value='閉じる' onclick='offOptionLayer()'></form></p>");
	}
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
	tmpTxt = "";
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
	setAlertLayer("<p>以下のリストをコピーしてください。</p><form name='asfrm'><textarea class='log2' name='list_dsp' rows=10 cols=30>" + tmpTxt + "</textarea><br><input type='radio' class='chk' name='list_mode' onclick='listMode(0)' checked>スキル相談スレ用　<input type='radio' class='chk' name='list_mode' onclick='listMode(1)'>ゲーム内発言用</form><form><input type='button' value='閉じる' onclick='offOptionLayer()'></form></p>");
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

	if(mode == "cookie" || mode == null){
		num = document.mcfrm.slot.options[document.mcfrm.slot.selectedIndex].value;
		code = slotdata[num];
		setAlertLayer("クッキーからロードします。(Slot "+num+")<p><form><input type='button' value='閉じる' onclick='offOptionLayer()'></form></p>");
	}
	if(mode == "url"){
		code = top.location.search.substring(1);
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

// 復元
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
		setAlertLayer("<form><table border=0><td><div style='font-size:14px;'>. (⌒`⌒≡≡≡≡≡⌒`⌒')<br>　|_l_l__≡≡≡≡≡__l_l_|<br>(((ﾟωﾟ=≡≡≡≡≡=ﾟωﾟ )))<br>　 ((≡≡≡>you≡≡≡))<br>　　　 ((≡≡≡≡≡))<br>　　　 　 ((≡≡≡))　　ｺﾞｵｫｫｩｫｫｵｵｫ<br>　 　 　 　　((≡≡))<br>　 　 　　　 　　((≡))</div></td></table><br><input type='button' value='閉じる' onclick='offOptionLayer()'></form>");


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
	[14,"採掘","マイナー","ゴールドマイナー","マインロード"],
	[15,"伐採","木こり","伐採師","ランバー ロード"],
	[16,"収穫","耕作師","農夫","農場主"],
	[17,"釣り","釣り人","釣り師","名人釣り師"],
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

	shiptable = "<div style='width:600px; padding:10px;'>"
		+ "<table cellpadding=5 cellspacing=0 class='tech'>\n";

	for(i=0; i<mastery.length; i++){
		shiptable += "<tr>\n"
			+ "<th rowspan=2 class='tech' width=100><a class='sk' href='JavaScript:selectMastery(" + i
			+ ",0);' title='スキル0に戻す'>" + mastery[i][0] + "</a></th>\n"
			+ "<td class='tech sp'><a class='ms' href='JavaScript:selectMastery(" + i + ",40); offOptionLayer();' title='スキル40までポイントを振る'>"
			+ mastery[i][5][0] + "</a></td>\n"
			+ "<td class='tech sp'><a class='ms' href='JavaScript:selectMastery(" + i + ",70); offOptionLayer();' title='スキル70までポイントを振る'>"
			+ mastery[i][5][1] + "</a></td>\n"
			+ "<td class='tech sp'><a class='ms' href='JavaScript:selectMastery(" + i + ",90); offOptionLayer();' title='スキル90までポイントを振る'>"
			+ mastery[i][5][2] + "</a></td>\n"
			+ "</tr><tr>\n"
			+ "<td colspan=3 class='tech'><nobr>" + mastery[i][3] + "</nobr></a></td>\n"
			+ "</tr>\n";
	}

	shiptable += "</table>\n<br>\n<table cellpadding=5 cellspacing=0 class='tech'>\n";

	for(i=0; i<shiplist.length; i++){
		if(shiplist[i][0] == 0){
				shiptable += "<tr class='tech'><td colspan=4 style='font-size:0px;' class='tech'>　</td></tr>\n";
		}else{
			shiptable += "<tr class='tech'>\n"
				+ "<th class='tech'><a class='sk' href='JavaScript:prp(" + shiplist[i][0]
				+ ",0,3);' title='スキル0に戻す'>" + shiplist[i][1] + "</a></th>\n"
				+ "<td class='tech sp'><a class='ms' href='JavaScript:prp(" + shiplist[i][0] + ",30,3); offOptionLayer();' title='スキル30までポイントを振る'>"
				+ shiplist[i][2] + "</a></td>\n"
				+ "<td class='tech sp'><a class='ms' href='JavaScript:prp(" + shiplist[i][0] + ",60,3); offOptionLayer();' title='スキル60までポイントを振る'>"
				+ shiplist[i][3] + "</a></td>\n"
				+ "<td class='tech sp'><a class='ms' href='JavaScript:prp(" + shiplist[i][0] + ",90,3); offOptionLayer();' title='スキル90までポイントを振る'>"
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
				+ " onclick='selectMastery("+i+",0);' title='関連スキルをポイント0に戻す'>&nbsp;</div> ";
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
		tmpLog += " onclick='selectMastery("+i+",40); offOptionLayer();' title='関連スキル40までポイントを振る'></td>"
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
		+ "<p><form><input type='button' value='はい' onclick='" + fun1 + "' style='width:80px'>　　　　　　<input type='button' value='いいえ' onclick='offOptionLayer()' style='width:80px'> </form></p>"
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
	[0,"筋力"],
	[1,"着こなし"],
	[2,"攻撃回避"],
	[3,"生命力"],
	[4,"知能"],
	[5,"持久力"],
	[6,"精神力"],
	[7,"集中力"],
	[8,"呪文抵抗力"],
	[9,"落下耐性"],
	[10,"水泳"],
	[11,"死体回収"],
	[12,"包帯"],
	[13,"自然回復"],
	[14,"採掘"],
	[15,"伐採"],
	[16,"収穫"],
	[17,"釣り"],
	[18,"解読",[
		["値",1,"テクニック名","-","ST","説明"],
		[1,5,"センス トレジャー","-",20
			,"所持している地図から 財宝までの距離を解読する<br>※地図を掴んだ(ドラッグした)状態で 記された座標付近で使用する"],
		[1,0,"解読","-",0
			,"通常では読むことができない文字を解読する"],
		[1,0,"地図作成","-",0
			,"古い宝の地図を解読し 使用可能なトレジャーマップを作成する<br>※ペンを装備しているときに使用可能"],
		[1,0,"博識","-",10
			,"対象のステータスを知ることができる。<br>※解読スキルが高いほど より多くの対象のステータスを知る事ができます。<br>※生物図鑑を装備している時に使用可能"],
		[1,0,"鑑定","-",5
			,"未鑑定のアイテムを鑑定し すべての情報を明らかにする<br>※ハンドルーペを装備している時に使用可能"]
	]],
	[19,"料理"],
	[20,"鍛冶"],
	[21,"醸造"],
	[22,"木工"],
	[23,"裁縫"],
	[24,"薬調合"],
	[25,"装飾細工"],
	[26,"複製"],
	[27,"栽培"],
	[28,"美容",[
		["値",1,"テクニック名","-","ST","説明"],
		[40,1,"セルフ シャンプー","-",15
			,"自分の髪の汚れを少し落とすことができる<br>※発動にはシャンプーが必要です"]
	]],
	[29,"素手",[
		["値",1,"テクニック名","-","ST","説明"],
		[10,1,"ジャブ","-",8
			,"立て続けに素早いパンチを繰り出す<br>※敵の行動を阻害する"],
		[20,1,"チャージド フィスト","-",11
			,"力を溜めて敵を激しく殴りつけることにより、<br>ガード技を無視してダメージを貫通させる<br>※成功すると スタンさせることができる"],
		[40,1,"サクリファイス フィスト","-",19
			,"己の肉体を武器と化し、爆発的なダメージを与える<br>※攻撃の成功・不成功に関わらず自分もダメージを受ける"],
		[50,1,"ブラインド ジャブ","-",23
			,"顔面に ジャブをお見舞いする<br>対象は 視界を一定時間奪われる<br>※NPCは、対象を見失うことがある"],
		[60,1,"ディザーム ガード","-",28
			,"敵が装備している武器を外し、数秒間、右と左スロットの装備を付け替えできなくさせる"],
		[70,1,"イリュージョン フィンガー","-",33
			,"親指で対象を連打攻撃して全身に身につけている装飾品を全て脱がす<br>※この技の使用には 指にバネを仕込まなければならない"],
		[80,2,"スパルタン フィスト","-",33
			,"対象の気の力を増幅させて、ヒット・ポイント(HP)を回復する"],
		[80,0,"ブリッツ ラッシュ","-",38
			,"素手とキックの連続攻撃を繰り出すことができる<br>※素手のみでも発動できるがキックスキルが高いとダメージが増加する<br>＜発動に必要なBuff＞ 特殊効果:ナックル"],
		[90,1,"拳聖乱舞","-",44
			,"素手攻撃の究極奥義<br>相手に無数のパンチを浴びせつつ、気を溜めて放出する<br>途中で空振りすると、攻撃は止まってしまう"]
	]],
	[30,"刀剣",[
		["値",1,"テクニック名","-","ST","説明"],
		[20,1,"チャージド スラッシュ","-",15
			,"力を溜めて激しく敵に斬りつけることにより ガード技を無視してダメージを貫通させる<br>※成功すると 敵をスタンさせることができる"],
		[40,1,"ダイイング スタブ","-",21
			,"対象をえぐるようにして突き刺し 巨大な傷口を作る<br>※斬った後もダメージが続く"],
		[50,1,"ニューロン ストライク","-",23
			,"剣で斬りつけて属性防御値を下げる"],
		[60,2,"エクセキューション","-",28
			,"ジャンプ斬りで敵の脳天を叩き割り 大ダメージを与える<br>※技発動中は無防備になる"],
		[60,0,"ブラスト スラッシュ","-",28
			,"疾風の如く 対象へ斬撃を飛ばす攻撃<br>＜発動に必要なBuff＞ 特殊効果:ロングソード"],
		[70,1,"ソニック ストライク","-",33
			,"手にしている剣を投げて 離れた敵を攻撃する<br>※投げた武器は失ってしまう"],
		[80,4,"ヴァルキリー ブレイド","-",38
			,"力一杯敵を切りつけ 大ダメージを与える<br>※武器の損傷も大きくなる"],
		[80,0,"ブランディッシュ ビート","-",38
			,"武器を大きく振りかぶり幾多の敵を薙ぎ払う攻撃<br>＜発動に必要なBuff＞ 特殊効果:グレートソード"],
		[80,0,"デス ミスチェ","-",38
			,"死神が対象の行動を制限させる<br>死神に目を付けられたも者は視界を遮られ逃げ惑うことしかできなくなる<br>＜発動に必要なBuff＞ 特殊効果:サイス"],
		[80,0,"アース ブロウ","-",38
			,"強烈な一振りから生み出された衝撃が大地を駆け抜ける<br>＜発動に必要なBuff＞ 特殊効果:バトルアックス"],
		[90,1,"ソード ダンス","-",45
			,"装備している武器で敵の直接攻撃をはじき返し ダメージを与える"]
	]],
	[31,"こんぼう",[
		["値",1,"テクニック名","-","ST","説明"],
		[20,1,"チャージド ブラント","-",11
			,"力を溜めて敵を激しく叩きつけることにより ガード技を無視してダメージを貫通させる<br>※成功すると 敵をスタンさせることができる"],
		[40,1,"スニーク アタック","-",19
			,"敵の側面や背後から忍び寄り 不意打ちで敵を眠らせる"],
		[50,1,"ニート クラッシャー","-",23
			,"対象の装備の耐久度を大幅に消耗させる攻撃を繰り出す。この技を食らった者は、働いて修理代を稼がなければならない。"],
		[60,2,"ウェポン ディザーム","-",28
			,"敵の装備している武器を叩き落す<br>この技を受けたプレイヤーは 1秒くらいの間、右と左スロットの装備を付け替えできなくなる"],
		[60,0,"ワイルド ヒット","-",28
			,"素早く３連打を繰り出す<br>＜発動に必要なBuff＞ 特殊効果:ウォーメイス"],
		[70,1,"ヴォーテックス ホイール","-",33
			,"その場で回転することにより 周りの敵にダメージを与えて吹き飛ばす"],
		[80,2,"ディスロケーション","-",36
			,"敵の骨格を揺るがすダメージを与え HP・MPの自然回復を阻止する"],
		[80,0,"スピリチュアル ブラント","-",38
			,"魂をこめた渾身の一撃<br>＜発動に必要なBuff＞ 特殊効果：ウォーハンマー"],
		[90,1,"クウェイク ビート","-",39
			,"両手装備用のこんぼうで地面を強打し 地響きを起こす<br>※周囲にいる者のバランス感覚を奪う"]
	]],
	[32,"槍",[
		["値",1,"テクニック名","-","ST","説明"],
		[10,1,"ガード ブレイカー","-",11
			,"ガードの隙間をぬって 無理やりダメージを与える"],
		[20,1,"タイダル スピアー","-",15
			,"後退した後に前方に踏み込み攻撃する"],
		[40,1,"ポール シフト","-",19
			,"槍を利用して前方向に飛び上がる"],
		[50,1,"ドラゴン テイル","-",23
			,"対象の防具と ガードの隙間を狙って攻撃する"],
		[60,2,"ペネトレイション","-",28
			,"ダメージは低いが、離れた敵にまで届く貫通攻撃を与える"],
		[60,0,"ヴィジット ウェイブ","-",28
			,"突き立てた槍が 幻影の高波を引き起こし 対象を巻き込む<br>＜発動に必要Buff＞ 特殊効果:バトルフォーク"],
		[70,1,"ハラキリ スピアー","-",33
			,"自分の腹を貫通させて 後ろの敵に奇襲攻撃を与える"],
		[80,2,"ドラゴン フォール","-",38
			,"大ジャンプを行い 落下中に空中制動して頭上から槍を突き立てる"],
		[80,0,"バーン ピール","-",38
			,"＜発動に必要なBuff＞ 特殊効果：トライデント"],
		[90,1,"デドリー ホロウ","-",45
			,"ダメージを与えながら前方に突進する"]
	]],
	[33,"銃器",[
		["値",1,"テクニック名","-","ST","説明"],
		[10,1,"エイム ファイアー","-",15
			,"しゃがみ撃ちする<br>移動は遅くなるが命中率が大幅に上がる<br>※ジャンプでキャンセル可能"],
		[20,1,"アサルト ファイアー","-",11
			,"伏せ撃ちする<br>移動できなくなるが 回避率と耐地属性が大幅に上昇する"],
		[30,1,"ブラスト ファイアー","-",15
			,"地面に向けて抱え銃を発砲する<br>※反動で後ろ向きに飛び戦線離脱できる"],
		[40,2,"ダイイング ファイアー","-",19
			,"抱え銃を暴発させ 自分の周りの者に大ダメージを与える<br>※抱え銃は使い物にならなくなり 自身も負傷してしまう"],
		[40,0,"ガトリング ショット","-",20
			,"銃器による連射が可能となる<br>※銃器を酷使するため　損傷が大きい<br>＜発動に必要なBuff＞ ガンナーの極意"],
		[50,1,"キャノン プレイスメント","-",23
			,"大砲や輸送機器などを設置する"],
		[60,2,"キャノン リペア","-",28
			,"設置されている大砲を修理する"],
		[60,0,"クイック ショット","-",38
			,"攻撃力は低下するが、銃器のディレイを大幅に短縮できる<br>＜発動に必要なBuff＞ 特殊効果:ドワーヴン ライフル"],
		[70,1,"キャノン クラッシャー","-",33
			,"設置された敵の大砲を破壊する"],
		[80,2,"キャノン コントロール","-",38
			,"大砲に乗り込み弾を発射する<br>※大砲の厚い装甲に守られて 防御力と攻撃力が上昇するが風属性の抵抗力と移動速度は落ちる<br>※ジャンプすると大砲から出ることができる"],
		[80,0,"キャノン ディスチャージ","-",45
			,"乗り込んだ大砲から周囲を巻き込む強力な大砲の弾を発射する<br>『キャノン コントロール』発動中にのみ使用可能"],
		[90,1,"マッスル キャノン","-",45
			,"大砲にパーティメンバーを詰めて遠くへ飛ばす"]
	]],
	[34,"弓",[
		["値",1,"テクニック名","-","ST","説明"],
		[20,1,"バルク ショット","-",11
			,"複数の矢を連続して射る<br>※スキル上昇と共に回数が増える"],
		[40,1,"ジャッジメント ショット","-",19
			,"敵に矢を射り矢に稲妻を落とす"],
		[50,1,"ソニック アロー","-",23
			,"有効レンジは短いが、威力が高くガードを貫通する攻撃"],
		[60,2,"ホープレス ショット","-",28
			,"対象の武器に付加されているエンチャントを解除する"],
		[60,0,"シャドウ バインド","-",28
			,"直接ダメージは期待できないが、対象の動きを止める事ができる<br>＜発動に必要なBuff＞ 特殊効果:コンポジット ボウ"],
		[70,1,"ホークアイ ショット","-",33
			,"鷹の目のように鋭く敵を睨みつけ、目視できるギリギリの距離まで矢を飛ばす"],
		[80,1,"シール ショット","-",38
			,"対象に弓ダメージを与え、更にスペルブックにチャージされている魔法を解除する<br>スキル使用中も移動可能"],
		[90,1,"ゴルゴタ ショット","-",45
			,"パーティメンバーの力を借り、敵を突き抜ける矢を発射する"]
	]],
	[35,"盾",[
		["値",1,"テクニック名","-","ST","説明"],
		[1,1,"シールド ガード","-",5
			,"直接攻撃を防ぎ ダメージを減らす"],
		[10,1,"スパイク アタック","-",11
			,"装備した盾で敵を強打する<br>※盾のACが高いほど大ダメージを与えます"],
		[20,1,"バッシュ","-",15
			,"盾で敵の直接攻撃を跳ね除けて、敵を無防備（被クリティカル率上昇）にさせる"],
		[30,1,"スタン ガード","-",15
			,"直接攻撃を防ぎ、ダメージを減らす<br>※成功すると敵はスタン状態になる"],
		[40,1,"インパクト ステップ","-",21
			,"盾で敵の直接攻撃を弾き飛ばし、間合いを広げる"],
		[50,1,"バンデット ガード","-",23
			,"敵が放った遠距離攻撃を盾で受け止めて、放ってきた弾を強奪する。"],
		[60,1,"カミカゼ","-",27
			,"盾に身を隠し ガードしたまま移動する<br>直接攻撃のみガード可能<br>※成功すると敵はスタン状態になる"],
		[70,1,"リベンジ ガード","-",33
			,"自分に向けて打たれた直接攻撃と魔法のダメージを盾で跳ね返す"],
		[80,1,"マジック ガード","-",33
			,"自分に向かって放たれた魔法を、盾で吸収する<br>※完全回避に成功すると、敵が放った魔法のコストを吸収する<br>AVOIDした時のみ、ダメージ軽減とMP吸収の効果が発生する"],
		[90,1,"シールディング オーラ","-",36
			,"シールドガードのオーラを発し<br>近くにいる仲間を守る"]
	]],
	[36,"投げ",[
		["値",1,"テクニック名","-","ST","説明"],
		[1,1,"スロウ","-",9
			,"投てき用の武器を 敵に投げつける"],
		[20,1,"ブラインド スロウ","-",15
			,"太陽や月の光を反射させ対象の目を眩ませながら投てき武器を投げつける"],
		[30,1,"ミリオネア シャワー","-",15
			,"自分の所持金を敵に投げつける。<br>対象にお金の亡者がいた場合には、落ちたお金を拾おうとしてしまう。<br>技の発動に必要なお金50G"],
		[40,1,"ラピッド スロウ","-",21
			,"対象に攻撃を貫通させて 後方にいる敵にもダメージを与えられる"],
		[60,1,"シャドウ ストライク","-",24
			,"対象を投げダメージを与えた後 自分の姿を眩ます"],
		[70,1,"バニッシュ クラウド","-",33
			,"肉団子を足元に叩きつけて煙を出現させる<br>※姿を眩ましている間は技の発動が早くなっているので、奇襲攻撃のチャンス"],
		[80,1,"ダブル スロウ","-",38
			,"一度に2つの投擲武器を投げることができる"],
		[90,1,"シャドウ スティッチ","-",33
			,"対象の影を射止めて 身動きがとれないようにする"]
	]],
	[37,"牙",[
		["値",1,"テクニック名","-","ST","説明"],
		[1,1,"バイト","-",5
			,"敵に強く噛みつき ダメージを与える"],
		[20,1,"ブラッド サック","-",11
			,"対象に激しく噛みつき 吸い取った血でHPを回復する"],
		[30,1,"ハンガー バイト","-",15
			,"対象に噛み付いて、喉を乾かし空腹にさせる<br>攻撃スピードも少し遅くなる"],
		[40,1,"ワーウルフ","-",19
			,"狼に変身して 特殊な身体特性を身につける<br>魔力が下がる代わりに、回避率と耐風属性が増加する"],
		[50,1,"グール ファング","-",23
			,"怨霊を宿らせた一撃で 敵をマヒさせる"],
		[60,1,"ブラッド シェアー","-",28
			,"人型の対象に噛み付き 一定時間だけ自分の支配下におく"],
		[70,1,"ハッキング バイト","-",33
			,"対象に噛み付き かかっているBuffやDebuff効果を2つ奪い取る"],
		[80,1,"バット フォーム","-",38
			,"一定時間コウモリに変身し、空を飛べるようになる<br>効果中はBuffの効果時間が増加する"],
		[90,1,"ブラッド レイン","-",45
			,"吸い取った血を上空に噴射して血の池を作り 敵をおびき寄せる<br>引き寄せられた敵は、スタミナを消耗していく"]
	]],
	[38,"罠",[
		["値",1,"テクニック名","-","ST","説明"],
		[1,1,"バーニング プラント","-",9
			,"燃え盛る種を地面に植えつけ 周囲を炎で包む"],
		[10,1,"ポイズン プラント","-",8
			,"毒効果のついた種を植えつけ 周囲を毒に侵す"],
		[20,1,"サプライズ プラント","-",11
			,"敵の近くで種を派手に爆発させ 敵を逃亡させる"],
		[30,1,"フォグ プラント","-",15
			,"種から霧を発生させ 敵の視界を遮る"],
		[40,1,"コーマ プラント","-",19
			,"催涙ガスを発生させ 対象を睡眠状態に陥れる"],
		[50,1,"マスキング シード","-",23
			,"罠を隠して敵に察知されないようにする"],
		[60,1,"ボーリング","-",28
			,"目の前にある罠を転がす<br>※敵が植えた罠も転がすことが可能です"],
		[70,1,"ハーベスト プレイ","-",33
			,"祈りの力で設置した罠（種）を急成長させ、効果を即時発動させる"],
		[80,1,"マイン スウィープ","-",38
			,"周りに設置された敵の罠を解除する"],
		[90,1,"バグズ デリバリー","-",45
			,"虫たちの力を借り 罠を自分の近くに運んでもらう"]
	]],
	[39,"キック",[
		["値",1,"テクニック名","-","ST","説明"],
		[1,1,"ロウ キック","-",5
			,"敵の足元を狙って 素早い蹴りを繰り出す"],
		[10,1,"ヘラクレス シュート","-",8
			,"対象をボールに見立てて、思い切り蹴り飛ばす"],
		[20,1,"サイド キック","-",11
			,"中段蹴りを繰り出し 敵を転ばせて後ろ向きにさせる"],
		[30,1,"レッグ ストーム","-",15
			,"連続して敵を蹴りつけ 敵のHPとスタミナを減らす<br>※対NPCでは移動速度も低下させる"],
		[40,1,"ブレイン ストライク","-",19
			,"敵の脳天にかかとを振り下ろし マナ・ポイント(MP)を減らす"],
		[50,1,"リボルト キック","-",23
			,"キックを当てた反動で 敵をよろけさせて尻餅をつかせる。<br>対象のBuff効果を古いものから１つ剥がす"],
		[60,1,"シリアル シュート","-",28
			,"上方向へのダメージ判定が発生する蹴りを繰り出す"],
		[70,1,"ドロップ キック","-",33
			,"ダメージを与えた後ダウンさせる"],
		[80,1,"トルネード","-",38
			,"回し蹴りを繰り出して 四方の敵を攻撃する"],
		[90,1,"ムーン ボヤージ","-",45
			,"敵を上空に蹴り上げて 蹴りのほかに落下ダメージも与える<br>（NPCに対しては固定の追加魔法ダメージが入ります。プレイヤーに対しては落下ダメージが入るようになる予定です。）"]
	]],
	[40,"戦闘技術",[
		["値",1,"テクニック名","-","ST","説明"],
		[1,1,"プリーチ","-",5
			,"敵をなだめて戦意を喪失させる<br>※対人戦では相手の戦闘状態を解除する"],
		[10,1,"タックル","-",8
			,"敵に体当たりを喰らわせ 後退させる"],
		[20,1,"タウント","-",11
			,"敵を挑発し 自分に注意を惹きつける"],
		[30,1,"バーサーク","-",15
			,"一時的に暴走状態になり攻撃力と攻撃スピードが高まる<br>※バーサーク状態の間は、HP/MP/STの自然回復が停止する"],
		[40,1,"エクソシズム","-",19
			,"邪悪な気を祓い 自分にかけられた最も新しいステータスダウン効果を1つ無効にする<br>※毒・呪い・スタン・眠り・DoTダメージは解除できません"],
		[50,1,"ナイト マインド","-",23
			,"攻撃の命中率を大幅に上昇させる"],
		[60,1,"バーサーク オール","-",28
			,"パーティメンバー全員をバーサク状態にする<br>効果中はACと魔力が大幅に減少する<br>※回復されると効果は解除される"],
		[70,1,"カンフー ソウル","-",33
			,"メイン攻撃のクリティカル発生率を上昇させる<br>※効果中は呪文抵抗力が低下します。"],
		[80,1,"サムライ ハート","-",38
			,"敵の防御力を 一定時間大幅に減少させる"],
		[90,1,"センス オブ ワンダー","-",45
			,"移動しながら発動できない一部の攻撃を移動しながらでも繰り出せるようにする"]
	]],
	[41,"酩酊",[
		["値",1,"テクニック名","-","ST","説明"],
		[1,1,"ボーンレス","-",5
			,"酔った状態で予測不可能な動きをして攻撃をかわす<br>※効果終了後、隙が少し出来てしまう"],
		[10,1,"リカバー センス","-",8
			,"自分の顔を激しく叩いて 酔いを醒ます<br>※逃走したい時などに使用する"],
		[20,1,"マイティー グラブ","-",11
			,"敵の足元にまとわりつき 動きを封じる"],
		[30,1,"ストーン マッスル","-",15
			,"体を石のように堅くし全ての攻撃を高確率で無効化する"],
		[40,1,"センスレス","-",19
			,"死んだふりをして敵を欺く<br>※寝ている間は HP回復速度が上昇するが防御力が落ちる"],
		[50,1,"ディザスター ナップ","-",23
			,"耳を覆いたくなるほど大きなイビキをかき 敵の攻撃を妨害する<br>（ダメージを受けることで、効果は解除される）"],
		[60,1,"ドブロク スプレイ","-",28
			,"酒を吹き付け 範囲内にいる対象のBuff効果を古いものから１つ剥がす"],
		[70,1,"ビッグバン フィスト","-",33
			,"泥酔した状態で腕を振り回し 周囲の敵を攻撃する<br>※範囲攻撃の効果"],
		[80,1,"フレイム ブレス","-",38
			,"口に酒を含み 敵に炎を吹き付ける<br>※アルコール度数の高い酒が必要"],
		[90,1,"キヨミズ パッション","-",45
			,"パーティのスタミナを吸収し 巨大なエネルギー弾を発動する<br>※エネルギーを貯めた後に攻撃を受けると 効果が止まってしまう"]
	]],
	[42,"物まね",[
		["値",1,"テクニック名","-","ST","説明"],
		[1,1,"アミティ ミミック","-",9
			,"敵の声色を真似て 自分に注意を引きつける"],
		[20,1,"コーリング ミミック","-",11
			,"対象の近くにいる全ての敵の注意を引きつける"],
		[30,1,"マーメイド ミミック","-",15
			,"一定時間、泳ぐスピードが上昇する"],
		[40,1,"スケープゴート ミミック","-",21
			,"一定時間、全てのダメージを 案山子に身代わりにさせる"],
		[50,1,"ネイチャー ミミック","-",23
			,"周りの風景に溶け込み 姿を隠す"],
		[60,1,"ハラキリ ミミック","-",28
			,"自分の腹を斬り　死んだふりをする<br>※ダメージは受けるが　死ななければ回復する<br>※死んだ振りをしている間に　行動をとると技の効果はキャンセルされる"],
		[70,1,"ミラージュ ミミック","-",33
			,"自分にソックリの分身を出現させ 敵を惑わせる"],
		[80,1,"シャドウ ハイド","-",38
			,"対象の影に潜み 後をつける"],
		[90,2,"チャーム ダンス","-",45
			,"身につけている装備を脱いで 敵を惑わす"],
		[90,0,"セブン ソウルズ","-",53
			,"SGKの分身を7体同時に召喚し攻撃する<br>使用アイテム：原初の粉"]
	]],
	[43,"調教",[
		["値",1,"テクニック名","-","ST","説明"],
		[1,1,"アニマル フェイタライズ","-",5
			,"動物を手なずけ従わせる<br>※警戒を解くことも出来る"],
		[10,1,"チェリッシング","-",8
			,"愛情を込めてペットをなで ヒット・ポイント(HP)を回復させる"],
		[20,1,"チアー ショット","-",11
			,"ペットに気合を入れて強化させる"],
		[30,1,"ワーシップ ネイチャー","-",15
			,"大いなる自然の力を借り 死亡したペットを生き返らせる"],
		[40,1,"テラー ウィップ","-",5
			,"手で威嚇し 敵の召喚ペットを追い払う"],
		[50,1,"マンカインド フェイタライズ","-",23
			,"人型の敵を調教し従わせる"],
		[60,1,"パフォーミング ウィップ","-",28
			,"ペットに特殊攻撃をさせる<br>※ペットが特殊攻撃を使える状態の時のみ発動する"],
		[70,1,"ミラクル ケイジ","-",28
			,"ペットをアイテム化する"],
		[80,1,"ドラゴン フェイタライズ","-",38
			,"地上最強と謳われる竜族を従わせる"],
		[90,1,"ドミニオン","-",45
			,"魂をペットに乗り移させ ペットを操作できるようにする<br>※乗り移っている間 ペットに負担がかかり徐々にHPが減少していく"]
	]],
	[44,"破壊魔法",[
		["値",1,"テクニック名","触媒","MP","説明"],
		[1,2,"マイナー バースト","ND1",5
			,"小さな火の玉を生み出して 敵にぶつける"],
		[1,0,"リトル ツイスター","ND1",5
			,"突風を巻き起こし ダメージを与える<br>※対象との距離により魔法のヒット数が増える"],
		[10,2,"アイス ボール","ND2",9
			,"敵に氷の弾をぶつける"],
		[10,0,"ポイズン ミスト","ND2",9
			,"毒の霧を発生させ 敵を毒状態にする"],
		[20,2,"ブレイズ","ND3",13
			,"火柱を発生させ 敵に継続的なダメージを与える"],
		[20,0,"ショックボルト","ND3",13
			,"電撃でダメージを与える"],
		[30,2,"フリーズ","NP1",18
			,"敵を凍らせてダメージを与え 移動速度を遅くする"],
		[30,0,"ポイズン レイン","NP1",18
			,"毒の雨を降らせ 敵に強烈な毒の効果を与える"],
		[40,2,"オーブン","NP2",23
			,"対象の周りに火災を発生させ 継続したダメージを与えて焼き尽くす"],
		[40,0,"ソニック ケイジ","NP2",23
			,"対象にダメージを与え 周りにいる敵にも ダメージを伝達させる<br>※最大HPが多い敵ほどダメージ量が増える"],
		[50,2,"サンダーボルト","NP3",28
			,"雷を落とし ダメージと麻痺の効果を与える"],
		[50,0,"スターダスト","NP3",28
			,"空から無数の星屑を降らせ 敵にぶつける<br>※時間差魔法"],
		[60,2,"バースト","NQ1",34
			,"炎の玉を生み出して 敵にぶつける"],
		[60,0,"ブリザード","NQ1",34
			,"氷の竜巻を起こして大ダメージを与え 移動速度を遅くする"],
		[70,2,"ストロング ボルト","NQ2",40
			,"強烈な雷撃を脳天に落とし ダメージと麻痺の効果を与える"],
		[70,0,"ポイズン クラウド","NQ2",40
			,"毒の霧を発生させ 範囲内の敵に 継続的なダメージを与える"],
		[80,2,"メガ バースト","NQ3",46
			,"強烈な炎が渦巻く爆発を起こし 敵に大ダメージを与える"],
		[80,0,"フローズン ビーム","NQ3",46
			,"凍結ダメージを与え対象を凍結させる<br>※凍結中はクリティカルを大幅に受けやすくなる"],
		[90,4,"メテオストライク","PNQ1",53
			,"巨大な隕石の固まりを頭上に落とす<br>※時間差魔法"],
		[90,0,"カオス フレア","PNQ1",53
			,"あらゆる負の要素が混じった強烈な爆発を起こし、対象を跡形もなく吹き飛ばす"],
		[90,0,"アクア ツイスター","OP1",53
			,"WGK が操る 水の古代魔法<br>大気中の水分から 小規模の水の渦を作り出す"],
		[90,0,"ディバイン スパーク ボール","OP1",53
			,"意思を持って動く雷の球が 無差別に敵を襲う"]
	]],
	[45,"回復魔法",[
		["値",1,"テクニック名","触媒","MP","説明"],
		[1,2,"セルフ ヒーリング","ND1",5
			,"魔力によって自身のHPを回復する"],
		[1,0,"ターン アンデッド","ND1",5
			,"アンデッド系の敵を自分から遠ざける"],
		[10,2,"マイナー ヒーリング","ND2",9
			,"魔力によってHPを回復"],
		[10,0,"マイナー リバイタル","ND2",9
			,"対象に生気を吹き込みスタミナを回復させる"],
		[20,2,"アンチドート","ND3",13
			,"悪しき魂を浄化し 毒を完全に中和する"],
		[20,0,"キュア ディズィーズ","ND3",13
			,"聖なる力で対象の病気を完全に治す"],
		[30,2,"ライト ヒーリング","NP1",18
			,"魔力によってHPを中程度回復する"],
		[30,0,"キャンセルマジック","NP1",18
			,"ステータスダウン効果を打ち消す<br>※複数ある場合最初にかけられたものを解除<br>※毒・継続ダメージ・スタンなどは解除できない"],
		[40,2,"リフレッシュ","NP2",23
			,"対象のスタミナとHPを回復する"],
		[40,0,"レスト イン ピース","NP2",23
			,"アンデッド系の敵に ダメージを与える"],
		[50,2,"ヒーリング","NP3",28
			,"魔力を使い HPを大幅に回復する"],
		[50,0,"リバイタル","NP3",28
			,"エネルギーを注入し、対象のスタミナを回復する"],
		[60,2,"グループ ヒーリング","NQ1",34
			,"自分の近くにいるパーティーメンバーを回復する"],
		[60,0,"コンデンスマインド","NQ1",34
			,"対象者のMP回復率を上昇させる"],
		[70,2,"リジェネレイション","NQ2",40
			,"一定時間毎にHPが自動回復する"],
		[70,0,"ディバイン シャワー","NQ2",40
			,"空から神々しい光を呼び寄せ 全てのステータスダウンを打ち消す"],
		[80,2,"ヒーリング オール","NQ3",46
			,"魔力によってHPを全回復する<br>※使用者のスキル値とターゲットのHP残量によっては、全回復しないことがあります。"],
		[80,0,"リバイタル オール","NQ3",46
			,"エネルギーを注入し、対象のスタミナを全回復する<br>※使用者のスキル値とターゲットのスタミナ残量によっては、全回復しないことがあります。"],
		[90,2,"セイクリッド サークル","PNQ1",53
			,"詠唱者の周りに聖なる光を発し 近くにいる者の傷を癒す"],
		[90,0,"リザレクション","PNQ1",100
			,"聖なる息吹で死者を蘇生させる"]
	]],
	[46,"強化魔法",[
		["値",1,"テクニック名","触媒","MP","説明"],
		[1,2,"マナ エスケープ","ND1",5
			,"大地の精霊の力を借り 敵のMPを地面に吸収させる"],
		[1,0,"フリーズ ブラッド","ND1",5
			,"敵の血液を凍らせ 最大HPを下げる"],
		[10,2,"ブラインド サイト","ND2",9
			,"敵の視界を遮り 直接攻撃の命中率を下げる"],
		[10,0,"スピリット リヴィール","ND2",9
			,"精霊の力を借りて 敵の防御力を下げる"],
		[20,2,"エンライテン","ND3",13
			,"直接攻撃の極意を授け 武器の命中率を上げる"],
		[20,0,"クイックニング","ND3",13
			,"対象の動体視力を強化し 回避率を上げる"],
		[30,2,"スピリット ガード","NP1",18
			,"精霊の加護を得て 防御力を高める"],
		[30,0,"ヴィガー","NP1",18
			,"対象の力が漲り　直接攻撃力が上昇する"],
		[40,2,"バブル ボール","NP2",23
			,"酸素の気泡が顔を包み 水中でも呼吸できるようになる"],
		[40,0,"レイジング","NP2",23
			,"荷物の重さが一定量までゼロになる"],
		[50,2,"マインド ラッシュ","NP3",28
			,"精神力を強化し 対象の最大MPを上げる"],
		[50,0,"ブラッド ラッシュ","NP3",28
			,"体内の血液を沸騰させ 対象の最大HPを上げる"],
		[60,2,"スティーム ブラッド","NQ1",34
			,"体内の血を沸騰させ 一時的に足を早くする<br>※効果継続中はスタミナが少しずつ減り続ける"],
		[60,0,"インヴィジビリティ","NQ1",34
			,"一定時間姿を消しさる<br>※行動を起こすと効果は切れる"],
		[70,2,"ホーリー ガード","NQ2",40
			,"自分の周りの仲間を聖なる力で包み込み 直接攻撃に対する防御力を上げる"],
		[70,0,"ディバイン シールド","NQ2",40
			,"ダメージ量の大小を問わず 1発分の魔法を無効化する"],
		[80,2,"ウルティメイト ヘルス","NQ3",46
			,"一定時間 最大HPとHP自然回復量が大幅に上昇する"],
		[80,0,"シー インヴィジブル","NQ3",46
			,"透明状態の者を見破ることが出来る"],
		[90,2,"エレメンタル アーマー","PNQ1",53
			,"精霊の力を味方につけることにより 地水火風属性の魔法耐久度が上がる"],
		[90,0,"トランスフォーム","PNQ1",53
			,"精霊の力を借り 身体能力を変化させる<br>最大MPと魔法力を犠牲に命中率と防御力を大幅に上昇させる<br>※ジャンプすると元の姿に戻る"]
	]],
	[47,"神秘魔法",[
		["値",1,"テクニック名","触媒","MP","説明"],
		[0,2,"ホーリーライト レッド","ND1",5
			,"暖かい光の力を放つ"],
		[0,0,"ホーリーライト グリーン","ND1",5
			,"やさしい光の力を放つ"],
		[1,2,"ライト","ND1",5
			,"魔力によって明かりを灯す"],
		[1,0,"リエージェント アルケミー","ND1",5
			,"ノアダストからノアパウダーを作りだす"],
		[10,2,"リコール ドリンク","ND2",9
			,"飲み物を召喚する"],
		[10,0,"リコール レイション","ND2",9
			,"食べ物を召喚する"],
		[20,2,"フレイム ブレイド","ND3",13
			,"武器に炎を宿らせ 炎属性を追加する<br>※プレイヤーのメイン攻撃にのみ属性を付加する"],
		[20,0,"ソーン スキン","ND3",13
			,"体に刺を発生させ、直接攻撃で受けたダメージの一部を相手に跳ね返す<br>※ダメージを受けると効果は消えてしまう"],
		[30,2,"スモール ワープ","NP1",18
			,"対象と同じ位置に瞬間移動する"],
		[30,0,"リコール ストーン ウォール","NP1",18
			,"空間に巨大な壁を出現させ 通路を遮断する"],
		[40,2,"ディスペル サモン","NP2",23
			,"召喚されたペットを異空間に飛ばして消し去る"],
		[40,0,"メスメライズ","NP2",23
			,"敵を眠らせ行動不能にする"],
		[50,2,"フリーズ ブレイド","NP3",28
			,"武器に冷気を宿らせ 水属性を追加する<br>※プレイヤーのメイン攻撃にのみ属性を付加する"],
		[50,0,"テレポート","NP3",28
			,"自分のホームポイントへ瞬時に移動する"],
		[60,2,"ミツクニ オーダー","NQ1",34
			,"対象を後方に空間移動させて後退させる"],
		[60,0,"コーリング","NQ1",34
			,"対象を自分の立ち位置に引き寄せられる"],
		[70,2,"イリュージョン シールド","NQ2",40
			,"幻影の盾を召喚する"],
		[70,0,"リコール アルター","NQ2",40
			,"アルターを出現させ、術者の近くにいる者を術者のホームポイントに移動させる"],
		[80,2,"テレポート オール","NQ3",46
			,"一瞬でパーティー全員を術者のホームポイントに移動させる"],
		[80,0,"テレポート クロース","NQ3",46
			,"術者の位置にパーティ全員を呼び戻す"],
		[90,2,"ライトニング ブレイド","PNQ1",53
			,"武器に雷を宿らせて 風属性を追加する<br>※自分の武器のみ有効"],
		[90,0,"イリュージョン ソード","PNQ1",53
			,"幻覚で最強の剣を作り出し召喚する"]
	]],
	[48,"召喚魔法",[
		["値",1,"テクニック名","触媒","MP","説明"],
		[1,2,"サモン ヴァンパイアバット","EB1",5
			,"魔界から吸血コウモリを呼び出す"],
		[1,0,"ブラッド ディール","ND1",5
			,"一定時間 HPを犠牲にMP回復速度を増加させる"],
		[10,2,"ブラッド ルーレット","ND2",9
			,"ペットが攻撃を受けた時に50%の確率でダメージを反射する"],
		[10,0,"サンクン アンカー","ND2",9
			,"超重量の錘を召喚し 対象の所持アイテム総重量に加算させる"],
		[20,2,"ゴースト ダンス","ND2",13
			,"対象の周りに見えない亡霊がまとわりつき 一定時間ごとにダメージを与える"],
		[20,0,"サモン ゾンビ アーミー","EB2",13
			,"魔界からゾンビアーミーを呼び出す"],
		[30,3,"ウォーン パニッシュメント","NP1",18
			,"近くにいる下僕達のHPを回復する"],
		[30,0,"スティーム ドライブ","NP1",18
			,"近くにいる下僕に対し、ACを犠牲にすることで移動速度を速めてやる"],
		[30,0,"冥の鼓動","OP1",53
			,"大地を揺るがす 冥門の化身を召喚する"],
		[40,2,"イムサマス グレイブ","NP2",23
			,"戦慄の記憶を植え付け 墓に近づいた者を走れなくする"],
		[40,0,"サモン スカルパスメイジ","EB3",23
			,"魔界からスカルパスメイジを呼び出す"],
		[50,2,"クライシス コール","NP3",28
			,"ペットを一体だけ手元に呼び戻す"],
		[50,0,"サモン ケルベロス","EB3",28
			,"地獄の番人ケルベロスを召喚する"],
		[60,2,"バニッシュ サモンズ","NQ1",34
			,"敵が召喚したモンスターを元の世界に戻す"],
		[60,0,"サモン バエルウォッチャー","EB4",34
			,"雷と眠りの魔法が得意な目玉を召喚する"],
		[70,2,"デス マーチ","NQ2",40
			,"近くにいる下僕に対し、魔力を犠牲にすることで 攻撃力を高めてやる"],
		[70,0,"サモン ゾンビ オルヴァン","EB4",40
			,"魔界からオルヴァンのゾンビを呼び出す"],
		[80,2,"ファイナル オーダー","NQ3",46
			,"自分のペットを爆発させて 近くにいる敵に大ダメージを与える"],
		[80,0,"サモン クイーン オブ ヘル","EB5",53
			,"限られた時間しか地上にいられない 魔界の女王を呼び出す"],
		[90,3,"サモン マブス アンバッサダー","EB5",53
			,"戦闘能力の高い死神を召喚する"],
		[90,0,"サモン ボーンナイト","EB5",53
			,"最大HPの半分を犠牲にして 混沌の剣士を召喚する"],
		[90,0,"サモン カオス テンタクル","OP1",53
			,"異空間よりカオス生物を召喚する"]
	]],
	[49,"死の魔法",[
		["値",1,"テクニック名","触媒","MP","説明"],
		[1,2,"グレイブヤード ミスト","ND1",5
			,"気味の悪い霧を発生させて 敵を近寄れなくさせる"],
		[1,0,"スピリット ドレイン","ND1",5
			,"一定時間 対象の魔力を減少させる"],
		[10,2,"マッド コート","ND2",9
			,"敵の体に粘土を絡めることで動きを鈍らせ 回避率を減少させる"],
		[10,0,"ウェイスト エナジー","ND2",9
			,"対象の全ての行動において スタミナの消費を倍にする"],
		[20,2,"カースド ブレス","ND3",13
			,"呪いの言葉を浴びせ 対象の最大HP・MP・スタミナを下げる"],
		[20,0,"バインディング ハンズ","ND3",13
			,"地面から伸びる無数の悪霊の手が 対象を捕まえる"],
		[30,2,"エバー ディズィーズ","NP1",18
			,"敵を一種の病気状態にし 最大スタミナ値を一定時間下げる"],
		[30,0,"エピデミック オール","NP1",18
			,"呪いの言葉を浴びせかけ 近くにいるもの全てを病気（HPとMPの自然回復停止）にさせる<br>※範囲魔法の効果"],
		[40,2,"プリゾナー ヴェイル","NP2",23
			,"顔全体を邪念で覆い 呪文詠唱を不可能にさせる"],
		[40,0,"ロットン ブレス","NP2",23
			,"悪魔の吐息を吐き　強化効果を新しいものから5個解除する"],
		[50,2,"コープス エクスプロージョン","NP3",28
			,"死体を爆発させ 周りにいる敵にダメージを与える"],
		[50,0,"バプティズム ポイズン","NP3",28
			,"強烈な毒の洗礼を浴びせかける"],
		[60,2,"ラピッド ディケイ","NQ1",34
			,"死体の近くにいる者に強烈な死臭を浴びせかけ、酔い状態にさせる"],
		[60,0,"ディアボリック アイ","NQ1",34
			,"自分の周囲に隠れている者を暴き出す"],
		[70,2,"シャドウ モーフ","NQ2",40
			,"その場で影となり 姿をくらます<br>※動くことは出来ないが 他者から見えなくなる"],
		[70,0,"コープス ミーティング","PNQ7",46
			,"他者の死体を 術者の元に引き寄せる<br>※同じゾーン内の死体しか引き寄せれない"],
		[80,2,"ヘル パニッシュ","NQ3",46
			,"一定時間直接攻撃を攻撃者に跳ね返す<br>※HPを回復すると 効果は消え去る"],
		[80,0,"イーヴル オーメン","NQ3",46
			,"害のあるお告げが下され 良くない結果を招かせられる"],
		[90,3,"リボーン ワンス","PNQ1",53
			,"一度死んでも 瀕死状態で生き返ることができる"],
		[90,0,"リープ カーニバル","PNQ1",100
			,"魔法発動後 一定時間以内に近接両手武器で攻撃すると、敵に即死級のダメージを与えることができる<br>（通常攻撃のみ効果が発動します）"],
		[90,0,"ロットン ベイパー","OP1",45
			,"EGK の放出する 腐った蒸気"]
	]],
	[50,"魔法熟練",[
		["値",1,"テクニック名","-","ST","説明"],
		[1,1,"メディテーション","-",5
			,"精神を強く集中させて マナ・ポイント(MP)の回復速度を速める<br>※効果継続中は少しずつスタミナ(ST)を消費する"],
		[20,1,"ホーリー ブレス","-",15
			,"一定時間 魔力が増加する"],
		[30,1,"マジック ブースト","-",15
			,"魔法が届く範囲を広げる"],
		[40,1,"マナ プレッシャー","-",19
			,"一定時間 MPの消費量が軽減される"],
		[50,1,"スペル エクステンション","-",23
			,"スペルブックに魔法をチャージしておける時間を延長する"],
		[60,1,"ホールド","-",28
			,"敵からの攻撃で 魔法の詠唱を妨害されにくくなる"],
		[70,1,"ホーリー リカバー","-",50
			,"聖なる力が全身を包み込み マナ・ポイント(MP)が回復する"],
		[80,1,"キャスティング ムーブ","-",38
			,"詠唱中の移動速度を速める"],
		[90,1,"ラピッド キャスト","-",44
			,"魔法の詠唱を大幅に短縮することができる<br>※効果継続中はマナ・ポイント(MP)の消費量が増える<br>ジャンプをすると効果が解除される"]
	]],
	[51,"自然調和",[
		["値",1,"テクニック名","-","ST","説明"],
		[1,1,"サイレント ラン","-",5
			,"周りの敵の聴覚を誤魔化し 自分の足音を気付かれにくくする"],
		[20,1,"センス ヒドゥン","-",11
			,"五感を研ぎ澄まし 隠れている者を発見できるようにする"],
		[30,1,"ムーン フォール","-",15
			,"一定時間 強風の力を借りて宙へ浮きあがる"],
		[40,1,"ネイチャー ビート","-",19
			,"木に触れ　自然の癒しの力でHPを回復する<br>（伐採可能な木に対して有効）"],
		[50,1,"ツイスター ラン","-",23
			,"自分の後ろに追い風を巻き起こし 移動速度を早める"],
		[60,1,"センス プレイ","-",28
			,"素早い獲物が通過したルートを感知し、追跡する<br>※対Mobには 対象に対して自分の気配を希薄にさせる効果もある"],
		[70,1,"ファルコン ウイング","-",33
			,"ファルコンのように羽ばたき 前方に飛び上がる<br>※スキルが高くなるとディレイが速くなる"],
		[80,1,"グレート エスケイプ","-",38
			,"パーティー全員の移動速度を速める<br>※効果中は攻撃できなくなる"],
		[90,1,"リーシング スカイ","-",33
			,"天候を操る"]
	]],
	[52,"暗黒命令",[
		["値",1,"テクニック名","-","ST","説明"],
		[1,1,"テラー チャーム","-",5
			,"対象は恐怖に魅入られ 目を離せなくなる"],
		[10,1,"ドレイン ソウル","-",8
			,"死体から魂を吸収し MPを回復する"],
		[20,1,"ブレイム フォーカス","-",11
			,"周りにいる敵の反応範囲を広くする"],
		[30,1,"スケイプゴート","-",19
			,"一定時間、敵を攻撃やアイテムの使用を不可能にさせる"],
		[40,1,"サクリファイス ディナー","-",17
			,"自分のペットを食べ HP・MP・STを回復する"],
		[50,1,"ナイト カーテン","-",23
			,"辺り一面を暗闇に包みこみ 敵からの攻撃を当りにくくする<br>※一度発動すると暫くの間使用不可能になる"],
		[60,1,"スレイブ チェイン","-",28
			,"対象を自分の方へ歩み寄らせる"],
		[70,1,"ハンギング ウイングス","-",29
			,"対象を宙にはりつける<br>※浮いてる間は、ヒット・ポイント(HP)と回避能力が減少する"],
		[80,1,"ギロチン コール","-",38
			,"最大ヒットポイントの20%を切った対象の首を刎ねる<br>但し、与えれるダメージの最大値は100までです。"],
		[90,1,"フュージョン","-",32
			,"パーティメンバー全員が合体し 一体の怪物へと姿をかえる<br>技使用者以外は操作不能になり 力を分け与えることしか出来なくなる<br>発動者は、強靭な力と長いリーチを得られる<br>※自分を含めて2人以上のパーティを組んでいる時に発動可能"]
	]],
	[53,"取引",[
		["値",1,"テクニック名","-","ST","説明"],
		[1,1,"トレード","-",5
			,"対象とアイテムやお金の交換をする"],
		[10,1,"オープン セラー","-",40
			,"露店を開いて自動販売する"],
		[20,1,"オープン バイヤー","-",40
			,"露店を開いて自動買収する"],
		[30,1,"サインボード","-",40
			,"自分の店の看板を立てる<br>※アイテム『店の看板』が必要"],
		[40,1,"ハイアー ボディガード","-",23
			,"オーク ギャングをお金でボディガードとして雇う"],
		[50,1,"マーチャントコール","-",40
			,"出張商人を呼んで買い物をする"],
		[60,1,"ハイアー マーシナリー","-",23
			,"大金を支払い ドワーフの傭兵を雇う"],
		[90,1,"バンカー コール","-",40
			,"出張銀行員を呼び出す"]
	]],
	[54,"シャウト",[
		["値",1,"テクニック名","-","ST","説明"],
		[1,1,"ホラー クライ","-",5
			,"暗黒の力を通した 恐ろしい叫び声を聞かせる<br>この声を聞いたものは防御力と呪文抵抗力が低下する"],
		[20,1,"ロットン ボイス","-",11
			,"死者の声を借り 不快な声を発する<br>聴いた者のアイテム使用ディレイを増加させる<br>※対NPCでは命中率を低下させる"],
		[30,1,"フィアー ノイズ","-",15
			,"怨みのこもった死者の叫びを発し 対象の恐怖心を煽る<br>聴いた者は攻撃間隔を広げる"],
		[40,1,"デフニング クレマー","-",19
			,"大声で敵をののしり 詠唱を妨害する"],
		[50,1,"イビル スクリーム","-",23
			,"邪悪な叫びを聞かせて怯えさせ<br>範囲内にいる対象の回避と移動速度を低下させる"],
		[60,1,"ハウリング ボイス","-",28
			,"声を振動させて対象に衝撃波を放つ"],
		[70,1,"ラウディ ウェイル","-",33
			,"叫び声をあげ 敵の攻撃力を下げる"],
		[80,1,"ワイルド ロア","-",38
			,"野生の雄叫びをあげ 攻撃速度を速める"],
		[90,1,"ジャイアント リサイタル","-",45
			,"ジャイアントの歌を聞かせ 敵をスタンさせる"]
	]],
	[55,"音楽",[
		["値",1,"テクニック名","-","ST","説明"],
		[1,3,"ベビースネークのエチュード","-",5
			,"弱い力を守る抵抗の歌<br>PTメンバーの呪文抵抗力を上昇させる"],
		[1,0,"癒しの音色","-",5
			,"美しい笛の音色で周囲の味方を癒す<br>朧月笛セット同封の朧月笛(武器)要装備"],
		[1,0,"スタンドマイク","-",5
			,"スタンドマイクを召喚する<br>スタンドマイクにライトポーションをトレードするとスポットライトが点灯します"],
		[10,1,"セイクリッド レクイエム","-",9
			,"周囲にいるアンデッド系の敵を鎮める歌"],
		[20,1,"イクシオン マーチ","-",11
			,"侵入者から身を守る歌<br>PTメンバーの防御力を上昇させる。<br>※スキル値によって歌う時間が変わり、歌い続けるほど上昇値が増える。"],
		[30,1,"アルケミスト ラプソディ","-",15
			,"錬金術師の研究・苦悩・発見の唄<br>PTメンバーの魔力を上昇させる"],
		[40,1,"ファンガスの子守唄","-",19
			,"寝つきの悪い子を瞬時に眠らせる子守唄<br>自分以外のPTメンバーを深い眠りに誘い自然回復量を上昇させる"],
		[50,1,"アビシニアン ワルツ","-",23
			,"アビシニアンの軽快な動きを表現した唄<br>PTメンバーの回避率を上昇させる"],
		[60,1,"シスター エモーション","-",28
			,"反戦を祈る修道女の感情を表した歌<br>PTメンバーのDeBuff効果を古い順から１つ解除する"],
		[80,1,"トライデント ブルース","-",38
			,"12日間戦争で戦死したトライデント達の活躍の歌<br>自分以外のPTメンバーのスタミナ消費量を軽減する"],
		[90,1,"レゾナンス ハーモニー","-",45
			,"古き時代と新しき時代を紡ぐ共鳴の唄<br>聴く者を落ち着かせ HPを最大HPの25％分回復させる"],
		[0],
		[0,1,"ガトリング","-",0
			,"威力は弱いが連射が可能<br>※ノア ミサイルが必要"],
		[10,4,"緊急回避","-",5
			,"後方宙返りで攻撃を無効化する"],
		[10,0,"シールド","-",5
			,"物理攻撃を完全に防ぐ"],
		[10,0,"タイタン パンチ","-",5
			,"高速の拳を繰り出す"],
		[10,0,"ファイヤー ショット","MP",3
			,"炎の弾で敵に魔法ダメージを与える"],
		[20,5,"タイタン キック","-",10
			,"素早く対象を蹴り上げる"],
		[20,0,"ジャミング ショット","-",15
			,"ダメージと同時に詠唱を中断させ、一定時間呪文詠唱を不可能にさせる"],
		[20,0,"ラッシュ","-",20
			,"ジャブ、ストレート、蹴り上げの連続攻撃"],
		[20,0,"フリーズ ショット","MP",10
			,"氷の弾で敵を凍らせてダメージを与え、移動速度を遅くする"],
		[20,0,"リフレクトシールド","-",15
			,"近接攻撃と魔法攻撃を跳ね返す"],
		[30,7,"タイタン タックル","-",15
			,"強烈な体当たりで前方の敵を吹き飛ばし、ダメージを与える"],
		[30,0,"ショットガン","-",20
			,"後方に飛び上がり前方範囲の敵にダメージを与える 敵の近くで使用すると2発ヒットする"],
		[30,0,"バイブレーション","-",10
			,"大地を震わせ、周囲の敵を吹き飛ばす"],
		[30,0,"エネルギー吸収","-",25
			,"遠距離攻撃と魔法攻撃を吸収して無効化する<br>※100％発動するためには音楽スキル38以上が必要"],
		[30,0,"閃光弾","-",15
			,"ダメージと同時に強烈な光を放ち、対象の視界を遮る"],
		[30,0,"ハリケーン","MP",15
			,"高速で打ち出された真空波が対象を吹き飛ばす"],
		[30,0,"ハイジャンプ","-",20
			,"通常超えられない壁も軽々越えることができる"],
		[40,5,"エア シュート","-",20
			,"空中に飛び上がり、上空の対象を迎撃する対空技"],
		[40,0,"放電","MP",20
			,"体内に蓄積した電気を自分の周りに放出して敵を感電させる"],
		[40,0,"グレネード ショット","-",15
			,"ダメージと同時に周囲を巻き込んだ大爆発を起こす特殊な弾を撃つ"],
		[40,0,"高速移動","-",20
			,"一定時間、爆発的に移動速度を上昇させる"],
		[40,0,"スナイプ ショット","-",20
			,"対象の足を撃ち抜き、ダメージと同時に移動速度を減少させる"],
		[50,5,"キャノン","-",25
			,"溜めたエネルギーを放出して対象に大ダメージを与える"],
		[50,0,"捕獲","-",25
			,"対象を捕らえ、動きを止める"],
		[50,0,"マジック バリア","MP",35
			,"一定時間、物理ダメージを軽減し、魔法攻撃を無効化する"],
		[50,0,"ブースト モード","-",35
			,"一定時間、詠唱妨害を防ぎ、魔力と詠唱速度を上昇させるが、消費MPが増加する"],
		[50,0,"コンセントレイション","-",35
			,"神経を研ぎ澄まし、集中することで飛躍的に命中を上昇させるが、回避が低下する"],
		[60,2,"ファイアー ウォール","MP",30
			,"炎の壁を召喚し、近づく者に炎のダメージを与える"],
		[60,0,"バーン フィスト","-",25
			,"炎を纏った拳で対象を打ち抜き、炎の追加ダメージを与える"],
		[70,3,"ロケットランチャー","-",30
			,"前方にいる対象にロケット砲を放つ<br>※ロケットの弾が必要"],
		[70,0,"ハイパー キャノン","-",40
			,"溜めたエネルギーを放出して対象に大ダメージを与える<br>ガードを貫通するが隙を大きい"],
		[70,0,"スーパー ノヴァ","MP",40
			,"強力な魔力を込めた一撃を放つ"],
		[0],
		[1,10,"ガトリング・キャロル","-",0
			,"威力は低いが、連射可能な攻撃"],
		[1,0,"パンチ・キャロル","-",0
			,"素早くパンチを繰り出す"],
		[1,0,"キャノン・キャロル","-",20
			,"防御を貫く強力なエネルギー砲を撃つ"],
		[1,0,"ガード・キャロル","-",5
			,"直接攻撃と飛び道具を完全回避"],
		[1,0,"バリア・キャロル","-",20
			,"全ての攻撃を無効化する"],
		[1,0,"ヒーリング・キャロル","-",20
			,"行動を止めて回復する"],
		[1,0,"ワープ・キャロル","-",5
			,"前方に高速移動する"],
		[1,0,"ランチャー・キャロル","-",30
			,"前方範囲にキャノンを放つ"],
		[1,0,"ショックウェーブ・キャロル","-",30
			,"渾身の一撃から繰り出された衝撃波が前方の敵を吹き飛ばす"],
		[1,0,"スパーク・キャロル","MP",30
			,"魔力を電気に変えて放電し、周囲の敵を感電させる"]
	]],
	[56,"盗み",[
		["値",1,"テクニック名","-","ST","説明"],
		[1,1,"ロックピック","-",5
			,"鍵の掛かった錠をこじ開ける<br>通常では開かない宝箱等を、こじ開けることが出来る"],
		[20,1,"ロックオン グルー","-",11
			,"対象に接着剤を吹き付け行動を制限する"],
		[30,1,"スティール","-",15
			,"Mobからアイテムを盗むことができる<br>※対象のHPが少ないほど成功率が上がります"],
		[40,1,"リムーブ トラップ","-",19
			,"罠を解除する<br>仕掛けられた罠を取り除くことが出来る"],
		[50,1,"ステルス","-",23
			,"体を特殊な装備でまとって光学迷彩化させる 効果中は移動速度が遅くなる"],
		[60,1,"インセーン スティール","-",28
			,"公共施設の設置物を盗み取る<br>(生産装置や敵勢力のCC/DAの設置物などを盗む)<br>※ 現在 WarAge では 盗み判定はありません"],
		[80,1,"ゴージャス スティール","-",38
			,"Mobから希少なアイテムを盗むことが出来る<br>※対象のHPが少ないほど成功率が上がります"]
	]],
	[57,"ギャンブル"],
	[58,"パフォーマンス",[
		["値",1,"テクニック名","-","ST","説明"],
		[1,3,"Ｐ.Ｏ.Ｒ","-",5
			,"死者に捧ぐ　蘇生の祈り"],
		[1,0,"Ｍ.Ａ.Ｎ","-",2
			,"弁解する"],
		[1,0,"Ｓ.Ｄ.Ｍ","-",4
			,"白鳥の舞"],
		[10,2,"Ｔ.Ｓ","-",1
			,"膝を組んだ座り方"],
		[10,0,"Ｎ.Ｏ","-",2
			,"はっきりと否定するポーズ"],
		[20,2,"Ｉ.Ｔ.Ｅ","-",1
			,"思いっきり転ぶ"],
		[20,0,"Ｙ.Ｓ.Ｋ","-",2
			,"木を切る振りをする"],
		[30,5,"Ｍ.Ｄ.Ｌ","-",1
			,"ファッションモデルになりきる"],
		[30,0,"Ｇ.Ｉ.Ｋ","-",2
			,"ノコギリを引く振りをする"],
		[30,0,"Ｌ.Ｏ.Ｖ","-",0
			,"-"],
		[30,0,"Ｏ.Ｔ.Ｍ","-",0
			,"性別を超えた愛の表現"],
		[30,0,"シード ショット","-",15
			,"スイカの種を高速で口から飛ばす<br>使用アイテム : カット スイカ 1"],
		[40,2,"Ｎ.Ｙ.Ａ","-",3
			,"にゃーんのポーズ"],
		[40,0,"Ｋ.Ｙ.Ｒ","-",2
			,"辺りを見回す"],
		[50,2,"Ｍ.Ｔ.Ｒ","-",1
			,"必死になって全力疾走する"],
		[50,0,"Ｓ.Ｓ.Ｐ","-",2
			,"さり気なくいたす"],
		[60,3,"Ｎ.Ｊ.Ｋ","-",5
			,"伝説の名優になりきる"],
		[60,0,"Ｏ.Ｒ.Ａ","-",2
			,"肩で風を切って歩く"],
		[60,0,"Ｂ.Ｋ.Ｄ","-",2
			,"転んでしりもちをつく"],
		[70,5,"Ｈ.Ｇ","-",1
			,"肉体美を強調する"],
		[70,0,"Ｈ.Ｇ バージョン2","-",7
			,"肉体美を強調する"],
		[70,0,"Ｈ.Ｇ バージョン3","-",7
			,"肉体美を強調する"],
		[70,0,"Ｈ.Ｋ.Ｄ","-",2
			,"派手に吹き飛ばされる"],
		[70,0,"Ｓ.Ｐ.Ｉ","-",2
			,"身構える"],
		[80,3,"Ｙ.Ｋ.Ｓ","-",5
			,"気合の入った座り方をして、周囲にガンを飛ばす"],
		[80,0,"Ｕ.Ｋ.Ｍ","-",2
			,"後ろ受身をとる"],
		[80,0,"Ｐ.Ｉ.Ｃ","-",2
			,"鍵を開けるフリをする"],
		[90,3,"Ｍ.Ｏ.Ｅ","-",9
			,"娯楽の達人が、見えない仕掛けを使って 最高に目立つポーズをキメる"],
		[90,0,"Ｋ.Ｂ.Ｋ","-",2
			,"大見得を切る"],
		[90,0,"Ｍ.Ｂ.Ｋ","-",2
			,"さりげなく頂戴する"]
	]],
	[59,"ダンス",[
		["値",1,"テクニック名","-","ST","説明"],
		[1,1,"チアー ダンス","-",5
			,"魔法詠唱の速度を上げる"],
		[10,1,"ルート ダンス","-",5
			,"この踊りを見る者に、植物が地面に深く根を下ろすイメージを与え、ノックバック系の弾き飛ばしが効かなくなる効果を持つ。"],
		[20,1,"ウェーブ ダンス","-",11
			,"自分の周りのプレイヤーのクリティカル発動率を上昇させる"],
		[30,1,"ボン ダンス","-",15
			,"自分の周りで霊体になっている仲間に、物理攻撃と魔法攻撃を効き辛くする効果を与える。<br>※霊体になっているPCが瞬間的に見える効果がある。"],
		[40,1,"バンザイ ダンス","-",19
			,"味方の移動速度を上昇させる"],
		[50,1,"スワン ダンス","-",23
			,"周りにいる仲間の毒とDoTを取り除く"],
		[60,1,"ツイスト","-",28
			,"周りの者の攻撃間隔を縮める"],
		[70,1,"タウント ダンス","-",33
			,"周囲で寝ている見方を嘲り、たたき起こす<br>※効果継続中も、眠りとスタン状態になってもすぐに解除される"],
		[80,1,"レッツ ダンス","-",38
			,"周りにいる仲間を躍らせて、スタミナを回復させる"],
		[90,1,"フーリガン ダンス","-",38
			,"通常攻撃が命中した際、3連続の追加攻撃を叩き込む"]
	]]
];

var hspeciality = [
// 複合テク
// 攻撃系	(1)
		[["罠"],[38],[90],"ボンバー<br> エクスプロージョン","-",45
			,"自分の周りにいる敵を巻き込んで自爆する<br>発動に必要なBuff : 爆弾男 マスタリー",[38,51,5,42]],
		[["刀剣","精神力"],[30,6],[90,70],"牙斬","-",45
			,"左に持った武器で攻撃を弾き<br>怯んだ相手に斬撃を与える二段攻撃<br>発動に必要なBuff : サムライ マスタリー",[30,12,40,2,0,6]],
		[["銃器"],[33],[70],"スナイパー ショット","-",33
			,"遥か遠くにいる対象を狙い撃つことができる<br>攻撃を受けた者は詠唱を強制的に中断させられる<br>発動に必要なBuff : 傭兵 マスタリー",[33,38,42,40,19]],
		[["料理"],[19],[30],"トリプル フィレッツ","-",27
			,"魚を捌くかのように対象を切る<br>発動に必要なBuff : 厨房師 マスタリー",[19,21,8]],
		[["戦闘技術","キック"],[40,39],[60,90],"ネオ トルネード","-",45
			,"周囲の敵を引き寄せ、蹴り飛ばす"],
		[["銃器","罠"],[33,38],[90,70],"グレネード弾","-",45
			,"対象に直撃するとその周囲を巻き込み燃え上がる<br>使用アイテム : グレート エクスプロード ポーション"],
		[["牙","死の魔法"],[37,49],[70,70],"ポイズン バイト","-",40
			,"対象の体内に直接 毒を注入する"],
		[["伐採","木工"],[15,22],[30,70],"フェリング スラッシュ","-",28
			,"伐採で鍛え上げられた肉体から繰り出される一撃"],
		[["生命"],[3],[30],"カオス ブレイカー","-",20
			,"カオス生物に対して絶大な威力を持つ生命エネルギーを放つ技"],
		[["精神力"],[6],[30],"マインド インパクト","-",15
			,"魔力を 込めた光の弾を飛ばす<br>※精神力が高いほど威力が上がる技<br>発動に必要なBuff : 特殊効果:ナールド スタッフ"],
		[["罠","薬調合"],[38,24],[90,90],"タイム ボム","-",45
			,"時限式の爆弾を対象に設置する<br>制限時間内に解除できなければ大ダメージを受ける"],
		[["キック"],[39],[70],"ギャラクシー<br> ダイナマイト キック","-",33
			,"世界の法則を無視するかの如く繰り出される移動可能な強烈ドロップキック<br>ヒット後は、アピールしないと気持ちが収まらない<br>発動に必要なBuff : 荒くれ者 マスタリー",[29,39,9,3,13,58]],
		[["棍棒","筋力"],[31,0],[90,90],"パワー インパクト","-",45
			,"渾身の力で振り下ろし大地ごと周囲の敵を打ち砕く"],
		[["銃器","破壊魔法"],[33,44],[80,30],"マジック ショット","-",39
			,"魔法の弾を発射して直線上の敵を撃ち抜く"],
		[["刀剣","自然調和"],[30,51],[70,50],"一閃","-",33
			,"一瞬で間合いを詰めて 敵を貫く"],
		[["弓","キック"],[34,39],[90,60],"バラージ ショット","-",45
			,"強靭な脚力で飛び上がり、上空から前方の敵を一斉に射抜く"],
		[["槍","強化魔法"],[32,46],[70,70],"ゲイル スラスト","-",33
			,"疾風の如き速さで 無数の突きを繰りだす"],
		[["パフォーマンス"],[58],[70],"フィニッシング エンド","-",33
			,"後方にいる悪を打ち倒す トドメの大爆発<br>※爆発には火薬が必要<br>発動に必要なBuff : 荒くれ者 マスタリー<br>使用アイテム : エクスプロード ポーション",[29,39,9,3,13,58]],
		[["パフォーマンス"],[58],[70],"フィニッシング エンド<br> スパーク","-",33
			,"後方にいる悪を打ち倒す トドメの大爆発<br>※爆発には火薬が必要<br>発動に必要なBuff : コスプレイヤー マスタリー<br>使用アイテム : エクスプロード ポーション",[25,23,1,2,42,58]],
		[["料理","投げ"],[19,36],[30,10],"パイ投げ","-",9
			,"ケーキを対象の顔めがけて投げつける<br>使用アイテム : ショート ケーキ"],
		[["罠","薬調合","呪文抵抗力"],[38,24,8],[80,80,80],"セット マイン","-",38
			,"地雷を設置することができる<br>使用アイテム : グレート エクスプロード ポーション"],
		[["弓","集中力"],[34,7],[90,90],"チャージ ショット","-",45
			,"力を込めた強力なショット"],
		[["槍","水泳"],[32,10],[90,90],"ウォーター ストリーム","-",45
			,"水を操り 敵を押し流す<br>発動に必要なBuff : 海戦士 マスタリー",[10,32,19,17,53]],
		[["刀剣","知能"],[30,4],[50,30],"レッグ スラッシュ","-",23
			,"両足を斬り付け動きを鈍らす<br>※対象の移動速度上昇技を無効化させる"],
		[["酩酊"],[41],[40],"酔避連撃","-",19
			,"酔拳の動きで相手を翻弄し 紙一重で相手の攻撃を避け<br>強力な連続攻撃を繰り出す<br>発動に必要なBuff : 酔拳士 マスタリー",[41,29,2,5,39]],
		[["キック","筋力"],[39,0],[80,80],"ゲイル シュート","-",38
			,"高速で繰り出された蹴りから生じた 真空の刃が敵を襲う<br>反動で自らもダメージを受ける"],
		[["刀剣","戦闘技術"],[30,40],[90,90],"真・剣聖乱舞","-",45
			,"刀剣攻撃の奥義<br>相手に素早い剣撃を浴びせかけ 上空からの攻撃で止めを刺す<br>途中で空振りすると 攻撃は止まってしまう"],
		[["投げ","破壊魔法"],[36,44],[90,50],"レール ショット","-",45
			,"雷の電磁力を体内から腕へと巡らせ<br>加速させた電磁力と共に 投てき武器を撃ちだす"],
		[["棍棒"],[31],[60],"ヤンキー ウェイ","-",28
			,"肩が触れた対象を威嚇し<br>理不尽な怒りを ぶちまける<br>発動に必要なBuff : チンピラ マスタリー",[36,42,56]],
		[["パフォーマンス","召喚魔法"],[58,48],[50,20],"タライ落とし","-",23
			,"対象の頭上にタライを召喚し落とす"],
		[["槍","投げ"],[32,36],[70,50],"ジャベリン スロウ","-",33
			,"装備した槍を前方の敵めがけて 全力で投げる<br>※対象を基準に 後方の敵も貫く　投げた武器は失ってしまう"],
		[["薬調合"],[24],[70],"火遁の術","-",33
			,"口から巨大な火の玉を飛ばす忍術<br>炎ダメージと火傷によるスリップダメージを与える<br>発動に必要なBuff : アサシン マスタリー",[30,38,42,51,24,9,36]],
		[["棍棒","集中力"],[31,7],[70,40],"インパクト ウェーブ","-",33
			,"大地を振動させて 衝撃波を生み出し 周囲の敵を吹き飛ばす"],
		[["弓"],[34],[90],"アロー レイン","-",45
			,"上空に矢を放ち 無数の矢を雨のように降らす<br>発動に必要なBuff : フォレスター マスタリー",[34,51,42,43]],
		[["刀剣"],[30],[80],"乱れ桜","-",38
			,"桜吹雪の幻影と共に 一瞬で敵の周囲を切りつける美技<br>発動に必要なBuff : サムライ マスタリー",[30,12,40,2,0,6]],
		[["採掘"],[14],[1],"ドリル ディグ","-",5
			,"手に装備したドリル アームで採掘を行う<br>発動に必要なBuff : 採掘モード"],
		[["投げ"],[36],[70],"グレネード ブラスト","-",33
			,"ハンド グレネードを投げつける<br>※爆発に巻き込まれ 自らもダメージを受ける<br>発動に必要なBuff:傭兵マスタリー",[33,38,42,40,19]],
		[["棍棒","破壊魔法"],[31,44],[90,50],"アーマー ブレイク","-",45
			,"魔力を込めた一撃で対象の防具を破壊し 一時的に防御力を下げる"],
		[["酩酊"],[41],[90],"練気弾","-",100
			,"生命エネルギーを溜めて放つ<br>スタミナ消費は激しいが 無属性の魔法ダメージを与えることができる<br>発動に必要なBuff : 酔拳士 マスタリー",[41,29,2,5,39]],
		[["罠","暗黒命令"],[38,52],[80,80],"スパイダー ネット","-",38
			,"蜘蛛の糸を撃ちだし 絡めて動きを鈍らせる<br>使用アイテム : スパイダー シルク１"],
// 補助系	(2)
		[["自然調和","物まね"],[51,42],[90,90],"霧隠れの術","-",100
			,"秘奥義　自分の周りに霧を発生させて味方の姿を隠す<br>発動に必要なBuff : アサシン マスタリー",[30,38,42,51,24,9,36]],
		[["着こなし","戦闘技術"],[1,40],[80,70],"アトラクト","-",28
			,"敵の注意を引き付けて味方を守る<br>発動に必要なBuff : ブレイブナイト マスタリー",[40,31,35,8,1]],
		[["釣り"],[17],[90],"キャッチ ターゲット","-",35
			,"極めし者の技 地上の獲物も軽々と釣り上げる<br>発動に必要なBuff : 海戦士 マスタリー",[10,32,19,17,53]],
		[["戦闘技術","攻撃回避","筋力","包帯","精神力"],[40,2,0,12,6],[90,90,90,90,90],"プロストレイト","-",33
			,"威厳に満ちたオーラで周囲の敵を平伏させる"],
		[["攻撃回避","戦闘技術","パフォーマンス"],[2,40,58],[90,70,20],"バック ステップ","-",28
			,"後ろへ飛ぶことにより攻撃を避ける"],
		[["戦闘技術","強化魔法"],[40,46],[70,80],"リミット ブレイク","-",38
			,"潜在能力を引き出し、爆発的に攻撃力を上げることができるが、<br>メイン攻撃以外使用できない<br>※効果中に反動でHPが減少する　ジャンプで解除可能"],
		[["自然調和","自然回復","水泳","持久力"],[51,13,10,5],[70,70,70,70],"ラスト スパート","-",40
			,"最後の力を振り絞って全力で走る"],
		[["鍛冶","暗黒命令"],[20,52],[60,30],"デストロイ ウェポン","-",28
			,"武器の耐久度を大幅に減らす"],
		[["暗黒命令","死の魔法"],[52,49],[90,90],"サイコキネシス","-",45
			,"念力により周囲の敵の行動を制限する"],
		[["生命力"],[3],[70],"レゾナンス フォース","-",9
			,"特殊テクニックが使用可能になる"],
		[["死体回収","自然調和"],[11,51],[70,30],"ソウル ハイド","-",40
			,"自らの魂を自然に溶け込ませることにより 気配を完全に消す"],
		[["着こなし","物まね"],[1,42],[80,90],"パーフェクト ミミック","-",45
			,"ターゲットした対象と同じ姿に変装することができる<br>※一部の対象には使用することができません"],
		[["パフォーマンス","ダンス"],[58,59],[40,20],"Ｓ.Ｎ.Ｆ","-",19
			,"自分の周囲を明るく照らす"],
		[["美容"],[28],[70],"エリア クリーニング","-",28
			,"周囲を洗浄し、汚れとともにDebuffを一つ洗い流す<br>使用アイテム : シャンプー×３<br>発動に必要なBuff : ハウスキーパー マスタリー",[19,23,28]],
		[["パフォーマンス","薬調合"],[58,24],[60,30],"スター マイン","-",28
			,"空高く舞い上がり　夜空に美しい大輪の花を咲かせる<br>使用アイテム : エクスプロード ポーション"],
		[["鍛冶","裁縫","木工","装飾細工","複製","料理","醸造","薬調合"],[20,23,22,25,26,19,21,24],[90,90,90,90,90,90,90,90],"ゴッド ハンド","-",25
			,"極めしものが到達できる領域"],
		[["調教"],[43],[60],"ブリーディング ウィップ","-",28
			,"ペットに特殊攻撃をさせる<br>※ペットが特殊攻撃を使える状態の時のみ発動する<br>発動に必要なBuff : ブリーダー マスタリー",[53,19,51,43]],
		[["パフォーマンス","精神"],[58,6],[30,30],"Ｃ.Ｈ.Ｗ","-",59
			,"体内の精神力を一点に集中させ<br>一気に放出する超必殺技<br>その見た目は 相手を一撃で倒せそうな気にさせる"],
		[["盗み"],[56],[60],"タイダウン ローピング","-",28
			,"盗みの力を加えたベルトを対象に投げ 捕らえた対象の行動を盗む<br>※移動速度、攻撃速度、詠唱速度が低下する<br>発動に必要なBuff : アドベンチャラー マスタリー<br>使用アイテム : ベルト×４",[9,10,14,18,56]],
		[["死体回収","パフォーマンス"],[11,58],[30,30],"鬼火","-",15
			,"自分の周囲に人魂を呼び出す"],
		[["死の魔法"],[49],[90],"ダークネス フォース","-",45
			,"自らの命を生贄に捧げ　闇の力を得る<br>※身体能力が大幅に上昇するが　一定時間後に術者は死ぬ<br>発動に必要なBuff : イビルナイト マスタリー",[30,37,11,49]],
		[["キック","攻撃回避"],[39,2],[80,80],"クイックステップ","-",28
			,"一瞬で対象との間合いをつめる"],
// 回復系	(4)
		[["戦闘技術","神秘魔法"],[40,47],[80,80],"チェンジ エナジー","-",0
			,"HPをスタミナへと変換することができる"],
		[["調教"],[43],[90],"エリア チェリッシング","-",45
			,"愛情を込めて周囲にいるペットを介抱し、HPを回復させる<br>発動に必要なBuff : ブリーダー マスタリー",[53,19,51,43]],
		[["自然調和","自然回復","魔法熟練"],[51,13,50],[70,70,70],"ネイチャー ヒーリング","-",40
			,"大地の力を借りて、HP/MP/STの回復速度を高める"],
		[["パフォーマンス","ダンス"],[58,59],[60,40],"Ｓ.Ｗ.Ｄ","-",28
			,"PTメンバーとダンスを踊り HP自然回復をUPさせる<br>発動に必要なBuff : Ｓ.Ｎ.Ｆ"],
		[["料理"],[19],[1],"ランチ タイム","-",5
			,"ピクニックセットを召喚する<br>使用アイテム : ピクニック 休息セット"],
		[["銃器","回復魔法"],[33,45],[70,20],"ヒーリング ショット","-",33
			,"癒しの魔力を弾丸に込めて 味方を撃つ"],
		[["自然調和"],[51],[80],"グローイング ツリー","-",38
			,"生命の樹を呼び出し 周囲の味方を回復させる<br>発動に必要なBuff : ドルイド マスタリー<br>使用アイテム : シード×１",[51,45,50,52]],
// 防御系	(5)
		[["パフォーマンス","生命力"],[58,3],[70,70],"ファンタスティック ボディ","-",33
			,"鍛えぬかれたボディであらゆる攻撃を受け止める<br>発動に必要なBuff : 荒くれ マスタリー",[29,39,9,3,13,58]],
		[["物まね","神秘魔法"],[42,47],[30,70],"ロック ミミック","-",40
			,"岩へと姿を変え、自然と一体化して敵を欺く<br>最大HP防御力、土属性が大幅上昇、回避が大幅に下がる<br>発動に必要なBuff : マイン ビショップ マスタリー",[47,50,48,20]],
		[["戦闘技術","盾"],[40,35],[90,60],"ウェポン ガード","-",28
			,"装備している両手武器で 敵の直接攻撃を防御する"],
		[["盾","神秘魔法"],[35,47],[90,70],"プロテクト オーラ","-",45
			,"守りのオーラをPTメンバーへ飛ばし、一度だけ攻撃を軽減、又は無力化する"],
		[["牙","自然調和"],[37,51],[60,60],"ミスト フォーム","-",28
			,"霧に姿を変えて攻撃をかわす"],
		[["魔法熟練"],[50],[70],"リフレクト バリア","-",33
			,"魔法の障壁で 魔法と遠距離攻撃を跳ね返す<br>発動に必要なBuff:アルケミスト マスタリー",[44,45,46,47]],
		[["物まね"],[42],[1],"地蔵変化","-",20
			,"地蔵に変身して物理攻撃を防ぐ<br>※変身中は移動、行動不可<br>発動に必要なBuff : 大きな葉っぱ"],
		[["盾"],[35],[1],"Total Protection","-",5
			,"一度だけ物理ダメージを軽減することができる<br>※ダメージを93％防ぐ。ダメージを受けると効果消滅<br>※マカフィー シールドを装備すると必要Buff点灯<br>発動に必要なBuff : Total Protection Service"],
// レゾ系	(6)
		[["弓"],[34],[60],"Ｓ バインド","-",28
			,"直接ダメージは期待できないが、対象の動きを止めることができる<br>発動に必要なBuff : レゾナンス フォース"],
		[["精神"],[6],[30],"Ｍ インパクト","-",15
			,"魔力を込めた光の珠を飛ばす<br>※精神力が高いほど威力があがる技<br>発動に必要なBuff : レゾナンス フォース"],
		[["銃器"],[33],[60],"Ｑ ショット","-",38
			,"銃器のディレイを大幅に短縮できる<br>※攻撃力上昇系の技や魔法と重複しません<br>発動に必要なBuff : レゾナンス フォース"],
		[["棍棒"],[31],[80],"Ｓ ブラント","-",38
			,"魂をこめた渾身の一撃<br>発動に必要なBuff : レゾナンス フォース"],
		[["槍"],[32],[60],"Ｖ ウェイブ","-",28
			,"突き立てた槍が、幻影の高波を引き起こし 対象を巻き込む<br>発動に必要なBuff : レゾナンス フォース"],
		[["刀剣"],[30],[80],"Ｂ ビート","-",38
			,"武器を大きく振りかぶり幾多の敵を薙ぎ払う攻撃<br>発動に必要なBuff : レゾナンス フォース"],
		[["素手"],[29],[80],"Ｂ ラッシュ","-",38
			,"素手とキックの連続攻撃を繰り出すことができる<br>※素手のみでも発動できるがキックスキルが高いとダメージが増加する<br>発動に必要なBuff : レゾナンス フォース"],
		[["解読","神秘魔法"],[18,47],[20,40],"解呪","-",10
			,"アイテムに掛けられた呪いを 神聖な力を用いて解除する<br>※ハンドルーペを装備している時に使用可能"],
// 希少	(7)
		[["神秘魔法"],[47],[1],"レビテイション","-",5
			,"その場で浮くことができる"],
		[["薬調合"],[24],[1],"ワイド スターマイン","-",5
			,"広範囲に連続で打ち上がる花火を設置する<br>使用アイテム : エクスプロード ポーション×３"],
		[["神秘魔法"],[47],[1],"マジカル ブラシ(赤)","-",5
			,"僅かな魔力で誰でも使えるアートスペル<br>足元に色を残しラインを描くことができる<br>※ ジャンプする事で解除が可能<br>使用アイテム : カラー インク１"],
		[["神秘魔法"],[47],[1],"マジカル ブラシ(緑)","-",5
			,"僅かな魔力で誰でも使えるアートスペル<br>足元に色を残しラインを描くことができる<br>※ ジャンプする事で解除が可能<br>使用アイテム : カラー インク１"],
		[["神秘魔法"],[47],[1],"マジカル ブラシ(青)","-",5
			,"僅かな魔力で誰でも使えるアートスペル<br>足元に色を残しラインを描くことができる<br>※ ジャンプする事で解除が可能<br>使用アイテム : カラー インク１"],
		[["薬調合"],[24],[1],"オンステージ","-",20
			,"頭上にミラーボールを設置する<br>使用アイテム : グレート ライト ポーション"],
//	魔法
//	複合魔法 - 召喚系	(8)
		[["強化魔法","召喚魔法"],[46,48],[20,20],"リコール インセクト","PD1",11
			,"魔力によって昆虫を呼び出す"],
		[["強化魔法","召喚魔法"],[46,48],[50,40],"リコール マーシー ライト","PD2",23
			,"詠唱者を守ってくれる小さな精霊を召喚する"],
		[["強化魔法","召喚魔法"],[46,48],[90,60],"リコール エレメンタル","PD4",45
			,"詠唱者と共に戦ってくれる精霊を召喚する"],
		[["召喚魔法"],[48],[70],"サモン<br> ストロング ゾンビ","特殊",40
			,"プレイヤーの死体を触媒に強力なゾンビを召還する<br>発動に必要なBuff : ネクロマンサー マスタリー",[48,49,37,52]],
		[["神秘魔法","召喚魔法"],[47,48],[60,10],"ホーリー レコード","NQ1",34
			,"現在地をレコード ストーンに書き込む"],
//	複合魔法 - 攻撃系	(9)
		[["回復魔法","神秘魔法"],[45,47],[70,70],"ホーリー ストライク","NQ1",40
			,"アンデット系に対し、継続ダメージを与える"],
		[["死の魔法","神秘魔法"],[49,47],[70,70],"マジック ドレイン","PNQ1",20
			,"自分の周りにいる敵からMPを吸収する<br>発動に必要なBuff : 紺碧の賢者 マスタリー",[44,45,46,47,48,49]],
		[["破壊魔法","強化魔法","集中力"],[44,46,7],[70,70,70],"マジック アロー","NQ2",40
			,"高密度の圧縮した魔力を放つ<br>※盾による防御を貫通することができる"],
		[["破壊魔法"],[44],[80],"パル フレア","NQ3",46
			,"属性を変化させた青白い炎を放つ特殊な魔法<br>呪文抵抗力による軽減を受けない<br>発動に必要なBuff : アルケミストマスタリー",[44,45,46,47]],
		[["破壊魔法","魔法熟練"],[44,50],[90,90],"オーバー ドライブ","PNQ1",100
			,"暴走した魔力が周囲を焼き尽くす<br>使用者は全てのMPを消費する"],
		[["破壊魔法","魔法熟練"],[44,50],[30,30],"マナ ボール","-",40
			,"触媒を消費せずに撃つことができる無属性魔法"],
		[["破壊魔法","知能"],[44,4],[60,40],"ツイスター","NQ1",34
			,"竜巻を発生させて 敵を上空へ巻き上げる"],
		[["回復魔法","神秘魔法","集中力"],[45,47,7],[90,70,40],"セイクリッド レイ","PNQ1",100
			,"聖なる光を集約して 上空から敵を撃ち抜く<br>※アンデット系には大ダメージを与える<br>発動に必要なBuff : テンプルナイト マスタリー"],
		[["破壊魔法","魔法熟練"],[44,50],[90,90],"ファイアー ストーム","PNQ1",53
			,"巨大な火柱が敵を包み込み 全てを焼き尽くす"],
		[["神秘魔法","魔法熟練"],[47,50],[90,70],"イリュージョン ジャッジメント","PNQ1",53
			,"対象の上空に イリュージョンソードを出現させ<br>天の裁きを 大地へ突き刺す"],
		[["破壊魔法","死の魔法"],[44,49],[80,60],"レインボー ショット","NQ3",46
			,"七色に輝く魔法の弾を放つ<br>七種類の効果を同時に与える"],
		[["破壊魔法"],[44],[90],"ビッグバン","PNQ1",200
			,"一点に圧縮した魔力を爆発的に膨張させて対象に大ダメージを与える<br>5人のパーティーメンバーが近くにいる時のみ発動可能"],
		[["破壊魔法","集中力"],[44,7],[50,90],"チェイン スペル","NP31",14
			,"連続で魔法を撃ち続ける<br>※最大5発まで撃てる 1発につきMP14を消費する"],
		[["破壊魔法","自然調和"],[44,51],[90,70],"アース エクスプロージョン","PNQ1",53
			,"大地を震わせ 地表からマグマを噴出させる"],
//	複合魔法 - 防御系	(a)
		[["召喚魔法","回復魔法"],[48,45],[90,60],"プロテクト ウォール","-",53
			,"自分の周りに光の壁を召還し、敵を退ける<br>※発動中に攻撃を行うと解除されます"],
		[["神秘魔法","召喚魔法"],[47,48],[80,30],"セイクリッド ウォール","PNQ1",100
			,"光の防護壁を自分の周囲に召喚して、物理ダメージを軽減する<br>※効果中は移動速度が低下する"],
		[["回復魔法","神秘魔法"],[45,47],[80,80],"ディバイン プルーミッジ","NQ3",46
			,"光の羽衣を纏い さまざまな負の効果から身を守る"],
		[["神秘魔法"],[47],[90],"シャイニング フォース","PNQ1",53
			,"聖なる光のオーラを纏い ダメージを軽減する<br>発動に必要なBuff : テンプルナイト マスタリー",[47,45,40,31,7]],
//	複合魔法 - 補助系	(b)
		[["死の魔法","回復魔法"],[49,45],[70,40],"イグザースト","NQ2",40
			,"対象の全ての行動において、スタミナの消費が倍になる<br>※対NPC戦では、移動速度が遅くなる効果も加わる"],
		[["死の魔法","魔法熟練"],[49,50],[80,70],"エレメンタル ブレイク","NQ3",46
			,"闇の力により魔法耐久度を低下させる"],
		[["死の魔法","召喚魔法"],[49,48],[90,60],"ダークネス フォグ","PNQ1",53
			,"暗黒の霧を召還し、周囲の敵の攻撃力を低下させる<br>※効果中は技や魔法による攻撃力上昇を打ち消す"],
		[["神秘魔法","強化魔法"],[47,46],[90,90],"アクティベイション","PNQ1",100
			,"肉体を活性化させ、一時的にスタミナ自然回復量を上昇させる"],
		[["強化魔法","魔法熟練"],[46,50],[90,80],"ウルティメイト エナジー","PNQ1",53
			,"一定時間 最大STとST自然回復量が大幅に上昇する"],
		[["神秘魔法","死の魔法"],[47,49],[70,40],"ポイズン ブレイド","NQ2",33
			,"武器に毒を宿らせ 土属性を追加する<br>※プレイヤーのメイン攻撃のみに属性を付加する"],
		[["死の魔法","牙"],[49,37],[90,70],"ブラッティ ブレイド","PNQ1",53
			,"武器に闇の力を宿らせ 対象の体力を奪う魔剣に変える<br>※両手剣によるメイン攻撃にのみ効果がある"],
		[["死の魔法","神秘魔法"],[49,47],[40,40],"ネゲート ミスト","NP3",23
			,"黒い霧が対象を包み込み チャージされた魔法をかき消す<br>※対Mobに対しては 魔力を下げる効果"],
		[["強化魔法","神秘魔法"],[46,47],[80,50],"アクセラレイション","NQ3",46
			,"PTメンバーの反応速度を高めて 攻撃速度を上昇させる"],
		[["強化魔法","素手"],[46,29],[90,90],"アクムレイト マナ","PNQ1",30
			,"拳にマナを集中させて 一時的に攻撃力を高める<br>最大(4段階)までマナを溜めることで 強力な一撃を発動することができる"],
		[["召喚魔法","自然調和"],[48,51],[70,50],"クイックサンド","NQ2",40
			,"砂地獄を足元に召喚する"],
		[["パフォーマンス","着こなし","攻撃回避","物まね","装飾細工","裁縫"],[58,1,2,42,25,23],[90,90,90,90,90,90],"究極巨神タイターン","PNQ10",5
			,"真のヒーローのみが呼び出すことができるロボット<br>タイターンを操り 悪を討て！"],
//	複合魔法 - 回復系	(c)
		[["死の魔法","死体回収"],[49,11],[70,70],"セルフ サクリファイス","NQ2",40
			,"自分のHPをPTメンバーに分け与える"],
		[["回復魔法","魔法熟練"],[45,50],[90,90],"グループ リバイタル","PNQ1",53
			,"自分の近くにいるパーティメンバーのスタミナを回復する"],
		[["神秘魔法","魔法熟練"],[47,50],[50,50],"ディバイド マナ","NP3",50
			,"自らのMPを味方に分け与える"],
		[["回復魔法"],[45],[90],"リザレクション オール","PNQ3",120
			,"聖なる息吹で死者を完全な状態で蘇生させる<br>発動に必要なBuff : 紺碧の賢者 マスタリー",[44,45,46,47,48,49]]
];


function setTech(skillnum){
	var techtable = "";
	skillpoint = pdata[skillnum];

	techtable = "<div style='width:620px; height:900px; padding:10px;'>"
		+ "<b>" + techlist[skillnum][1] + "</b>"
		+ "<div align=right><a href='#' class='con' onclick='window.close(); return false;'>閉じる</a></div>";

	if(techlist[skillnum][2] != null){
		techtable += "<table cellpadding=5 cellspacing=0 class='tech'>\n"
			+ "<tr class='tech'>\n"
			+ "<th class='tech' width=20>値</th>\n"
			+ "<td class='tech' width=100><b>テクニック名</b></td>\n"
			+ "<td class='tech'>説明</td>\n";
		if(skillnum >= 44 && skillnum <= 49)
			techtable += "<td nowrap class='tech' width=30>触媒</td>\n"
				+ "<td nowrap class='tech' width=20>MP</td>\n"
				+ "</tr>\n";
		if(skillnum < 44 || skillnum > 49)
			techtable += "<td nowrap class='tech' width=20>ST</td>\n"
				+ "</tr>\n";

		for(i=1; i<techlist[skillnum][2].length; i++){
			if(techlist[skillnum][2][i]==0){
				techtable += "<tr><td class='tech' colspan=5 style='font-size:0px; height:0px;'>　</td></tr>\n";
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
		techtable += "<div><b>複合・関連</b></div>";

		techtable += "<br>\n<table cellpadding=5 cellspacing=0 class='tech'>\n"
			+ "<tr class='tech'>\n"
			+ "<th class='tech'>値</th>\n"
			+ "<td nowrap class='tech'><b>テクニック名</b></td>\n"
			+ "<td nowrap class='tech'>説明</td>\n"
			+ "<td class='tech'>触媒</td>\n"
			+ "<td nowrap class='tech'>ST/MP</td>\n"
			+ "</tr>\n";

		for(i=0; i<hukugou.length; i++){
			if(hukugou[i]==0){
				techtable += "<tr class='tech'><td colspan=5 style='font-size:0px;' class='tech'>　</td></tr>\n";
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
		alrtwin.document.write("<title> " + techlist[skillnum][1] + " - もえかるく</title>");
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
