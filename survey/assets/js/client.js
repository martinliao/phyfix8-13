const urlprefix = "/survey/";
var form_content = "";
var begin = new Date();

//取曾經作答答案(作答管理)
function getReplyAnswer(){
	$.ajax({
		type: "get",
		//async為false -> 同步 
		//async為true  -> 非同步
		async: false,   
		dataType: "json",
		url: urlprefix+'Reply/searchReplyAnswer',
		data:{
			rid:replyid
		},
		//↑↑↑↑↑↑反正就是要指到你寫的aspx拉↑↑↑↑↑↑↑↑
		contentType: 'application/json; charset=UTF-8',
		success: function (msg) {
			let nowDate = new Date();
			// console.log(msg);//解答
			// console.log(replyarr);//題目字串
			// console.log(question);
			if(replyarr[0]=='input[name=genderradio]:checked'){
				if(msg[0][0].gender=="0"){
					$('input[name="genderradio"][value="女"]').prop("checked",true);
				}else if(msg[0][0].gender=="1"){
					$('input[name="genderradio"][value="男"]').prop("checked",true);
				}else if(msg[0][0].gender=="2"){
					$('input[name="genderradio"][value="中"]').prop("checked",true);
				}
				replyarr.splice(0, 1);
				$('input[name="genderradio"]').prop('disabled', true);				
			}
			for (let i = 0; i < question.length; i++) {				
				switch(question[i][0].type){
					case '0':
						// 簡答題
						$(replyarr[i]).val(msg[0][i].answer);
						var res = replyarr[i].replace(":checked", "");
						$(res).prop('disabled', true);
						break;
					case '1':
						// 詳答題
						$(replyarr[i]).val(msg[0][i].answer);
						var res = replyarr[i].replace(":checked", "");
						$(res).prop('disabled', true);
						break;
					case '2':
						// 選擇題
						if(msg[0][i].isOther=="1"){
							var res = replyarr[i].replace("radioGroup", "input");
							res = res.replace("checkGroup", "input");
							res = res.replace(":checked", '');
							var temp =(replyarr[i]+'[value="isoption"]').replace(":checked", '');
							$(temp).prop("checked",true);
							$(res).val(msg[0][i].other);
							// $(res).prop('disabled', true);
						}else{
							var res = (replyarr[i]+'[value='+msg[0][i].answer+']').replace(":checked", "");
							$(res).prop("checked",true);
							// $(res).prop('disabled', true);
						}
						var res = replyarr[i].replace(":checked", "");
						$(res).prop('disabled', true);
						res = res.replace("checkGroup", "input");
						res = res.replace("radioGroup", "input");
						$(res).prop('disabled', true);						
						break;
					case '3':
						// 核取方塊
						if(msg[0][i].isOther=="1"){
							var res = replyarr[i].replace("radioGroup", "input");
							res = res.replace("checkGroup", "input");
							res = res.replace(":checked", '');
							var temp =(replyarr[i]+'[value="isoption"]').replace(":checked", '');
							$(temp).prop("checked",true);							
							$(res).val(msg[0][i].other);
							// $(res).prop('disabled', true);
						}else{
							var answer = msg[0][i].answer.split(",");
							for (let j = 0; j < answer.length; j++) {
								var res = (replyarr[i]+'[value='+answer[j]+']').replace(":checked", "");
								$(res).prop("checked",true);								
							}							
						}	
						var res = replyarr[i].replace(":checked", "");
						$(res).prop('disabled', true);
						res = res.replace("checkGroup", "input");
						res = res.replace("radioGroup", "input");
						$(res).prop('disabled', true);
						break;
					case '4':
						// 下拉選單
						var res = (replyarr[i]+'[value='+msg[0][i].answer+']').replace(":selected", "");
						$(replyarr[i]).val(msg[0][i].answer);
						$(replyarr[i]).prop('disabled', true);
						break;
					case '5':
						// 線性題
						var res = (replyarr[i]+'[value='+msg[0][i].answer+']').replace(":checked", "");
						$(res).prop("checked",true);
						$(replyarr[i].replace(":checked", "")).prop('disabled', true);	
						break;
					case '6':
						// 單選方格
						let tempArr1 = msg[0][i].answer.split(",");
						for(let j=0; j<replyarr[i].length; j++) {
							var res = (replyarr[i][j]+'[value='+tempArr1[j]+']').replace(":checked", "");
							$(res).prop("checked",true);
							$(replyarr[i][j].replace(":checked", "")).prop('disabled', true);
						}
						break;
					case '7':
						// 核取方格
						let tempArr2 = msg[0][i].answer.split(",");
						for(let j=0; j<tempArr2.length; j++) {
							var res = (replyarr[i]+'[value='+tempArr2[j]+']').replace(":checked", "");
							$(res).prop("checked",true);
							$(replyarr[i].replace(":checked", "")).prop('disabled', true);
						}
						break;
					case '8':
						// 檔案上傳
						var tempid = '#input'+i.toString();
						var tempanswer = "<input class='columnStyle columnBorder widthFull' type='text' name='input"+i+"' value='"+msg[0][i].answer+"'>";
						$(tempid).html(tempanswer);
						var res = replyarr[i].replace(":checked", "");
						$(res).prop('disabled', true);
						break;
					case '9':
						// 輸入日期
						$(replyarr[i]).val($.format.date(nowDate, msg[0][i].answer));
						$(replyarr[i]).prop('disabled', true);
						break;
					case '10':
						// 輸入時間
						$(replyarr[i]).val($.format.date(nowDate, msg[0][i].answer));
						$(replyarr[i]).prop('disabled', true);
						break;
					case '11':
						// 日期+時間
						$(replyarr[i]).val($.format.date(nowDate, msg[0][i].answer));
						$(replyarr[i]).prop('disabled', true);
						break;
					default:
						break;
				}
			}

		}
	});	
}

var studentarr=[];
//搜尋學生名單
function getStudentArr(year, term, class_no) {
	let paramString = "?year="+year+"&term="+term+"&class_no="+class_no
	$.ajax({
		type: "get",
		//async為false -> 同步 
		//async為true  -> 非同步
		async: false,   
		dataType: "json",
		url: urlprefix+'VOnlineApp/Search'+paramString,
		//↑↑↑↑↑↑反正就是要指到你寫的aspx拉↑↑↑↑↑↑↑↑
		contentType: 'application/json; charset=UTF-8',
		success: function (msg) {
			// console.log(msg);
			studentarr=msg;
		}
	});
}

//以id取學生姓名
function getStudentName(sid){
	for (let i = 0; i < studentarr[0].length; i++) {
		if(studentarr[0][i].personal_id==sid){
			return studentarr[0][i].first_name;
		}		
	}
}

// 開啟學生名單pop
function openStudentPop(yearParm, termParm, classParm, cmfidParm) {
	$('.firstPop').modal('show');
	// 搜尋有作答學生列表
	$.ajax({
		type: "get",
		//async為false -> 同步 
		//async為true  -> 非同步
		async: false,   
		dataType: "json",
		url: urlprefix+'Reply/getIsAnswer?year='+yearParm+'&class='+classParm+'&term='+termParm+'&cmfid='+cmfidParm,
		//↑↑↑↑↑↑反正就是要指到你寫的aspx拉↑↑↑↑↑↑↑↑
		contentType: 'application/json; charset=UTF-8',
		success: function (msg) {
			let tempHTML = '';
			tempHTML += "<table width='100%' style='text-align:center;'>\
							<tr>\
								<th width='30%'>學號</th>\
								<th width='30%'>姓名</th>\
								<th width='40%'>填報狀態</th>\
							</tr>";
			for (let i=0; i<msg.length; i++) {
			tempHTML +=		"<tr>\
								<td>"+(msg[i].st_no==null?'':msg[i].st_no)+"</td>\
								<td>"+msg[i].first_name+"</td>\
								<td><span style='color:"+(msg[i].isanswer=='Y'?'':'red')+"'>"+(msg[i].isanswer=='Y'?'已填報':'未填報')+"</span></td>\
							</tr>";
			}
			tempHTML += "</table>";

			$('.modal-body').html(tempHTML);
		}
	});
	// var studentArr=[];
	// // 搜尋有作答學生列表
	// $.ajax({
	// 	type: "get",
	// 	//async為false -> 同步 
	// 	//async為true  -> 非同步
	// 	async: false,   
	// 	dataType: "json",
	// 	url: urlprefix+'Reply/Search',
	// 	//↑↑↑↑↑↑反正就是要指到你寫的aspx拉↑↑↑↑↑↑↑↑
	// 	contentType: 'application/json; charset=UTF-8',
	// 	success: function (msg) {

	// 		for (var i = 0; i < msg[0].length; i++) {
	// 			if (msg[0][i].cmfid === cmfid) {
	// 				studentArr.push(msg[0][i]);
	// 			}
	// 		}

	// 		// console.log(studentArr);
	// 		let tempHTML = "";
	// 		for (let i=0; i<studentArr.length; i++) {
	// 			var name = getStudentName(studentArr[i].sid);
	// 			tempHTML += "<div class='display_inline widthMiddle'><a target='_blank' href='./client_reply.php?cmfid="+studentArr[i].cmfid+"&replyid="+studentArr[i].id+"&sid="+studentArr[i].sid+"&name="+name+"'>"+name+"</a></div>"
	// 		}

	// 		$('.modal-body').html(tempHTML);
	// 	}
	// });
}

//取url參數
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

let apiarr=[];
let replyjson=[];
//取作答答案(作答)
function geInputValue(array){
	apiarr=[];
	replyjson=[];
	for (let i = 0; i < question.length; i++) {
		replyjson.push({qid : question[i][0].id,qindex : (i+1), isOther : '', other : '', answer : '', answerindex : '-1',type2:'text'});		
	}
	//console.log(question);
	//console.log(replyjson);  //轉換成值了
	 console.log(array);  

	for (let i = 0; i < array.length; i++) {
	//if(1==1){
		//var i = 6;
	// console.log(array)	
		var count=0;
		var mulselect='';
		var mulindex='';
		var tagName = '';
		var tagCount = 1;
		var for6 = false;
		if(typeof array[i] != 'object') {
			tagName = array[i];
			tagCount = 1;
			//console.log(tagName+" object");
		}
		else {
			tagCount = array[i].length;
			for6 = true;
		}

		for(let k=0; k<tagCount; k++) {
			if(tagCount > 1) {
				tagName = array[i][k];
				//console.log(tagName+" tagName");
			}

			$(tagName).each(function(){
				//(i==6) ? console.log($(this).val()+"  index "+k):"";
				let thisType = $(this)[0].type;
				if(i!=0){
					replyjson[i-1].type2 = thisType;
				}
				
				if(thisType == "file"){//檔案要上傳
					if(i!=0){
						apiarr.push("input7");
						replyjson[i-1].isOther = "0";
						replyjson[i-1].answer = $(this)[0].name;
					}
					var tmpFile = $(tagName).get(0).files[0];
					   formData.append($(this)[0].name, tmpFile);
				}
				else{//其他照舊
					if(count>0){

						apiarr.pop();
						mulselect=mulselect+","+$(this).val();
						//(i==6) ? console.log(mulselect+" apiarr " + k):"";
						mulindex=mulindex+","+$(this).data('index');
						apiarr.push(mulselect);
						if($(this).val()=='isoption'){
							replyjson[i-1].other=apiarr[i];
							if($(this).data('index')!=undefined){
								replyjson[i-1].answerindex=mulindex;
							}					
						}else{
							replyjson[i-1].answer=apiarr[i];
							if($(this).data('index')!=undefined){
								replyjson[i-1].answerindex=mulindex;
							}
							if(for6){
								replyjson[i-1].answer=mulselect;
							}					
						}				
					}else{
											
						mulselect=mulselect+$(this).val();
						mulindex=mulindex+$(this).data('index');
						if($(this).val()=='isoption'){				
							var res = tagName.replace("radioGroup", "input");
							res = res.replace("checkGroup", "input");
							res = res.replace(":checked", '');
							apiarr.push($(res).val());
							if((i!=0 && sexFlag == 0) || sexFlag == 1){
								if(sexFlag == 1) {		// 沒性別題
									replyjson[i].isOther="1";
									replyjson[i].other=apiarr[i];
									replyjson[i].answer="";

									if($(res).data('index')!=undefined){
										replyjson[i].answerindex=$(res).data('index');
									}	
								}
								else {
									replyjson[i-1].isOther="1";
									replyjson[i-1].other=apiarr[i];
									replyjson[i-1].answer="";

									if($(res).data('index')!=undefined){
										replyjson[i-1].answerindex=$(res).data('index');
									}	
								}				
							}
						}else{
							apiarr.push($(this).val());
							//(i==6) ? console.log($(this).val()+" thisValue "+k):"";
							if((i!=0 && sexFlag == 0) || sexFlag == 1){
								if(sexFlag == 1) {		// 沒性別題
									replyjson[i].isOther="0";
									replyjson[i].other="";
									replyjson[i].answer=$(this).val();
									//(i==6) ? console.log($(this).data('index')+" x1 "+k):"";
									if($(this).data('index')!=undefined){
										replyjson[i].answerindex=$(this).data('index');
									}
									else if(tagName.indexOf('select') != -1) {
										replyjson[i].answerindex=$(tagName)[0].selectedIndex+1;
									}
								}
								else {
									replyjson[i-1].isOther="0";
									replyjson[i-1].other="";
									replyjson[i-1].answer=$(this).val();
									//(i==6) ? console.log($(this).data('index')+" x2 "+k):"";	
									if($(this).data('index')!=undefined){
										replyjson[i-1].answerindex=$(this).data('index');
									}
									else if(tagName.indexOf('select') != -1) {
										replyjson[i-1].answerindex=$(tagName)[0].selectedIndex+1;
									}
								}
							}		
						}								
					}
					var res = tagName.replace(":checked", "");
					// $(res).prop('disabled', true);
					res = res.replace("checkGroup", "input");
					res = res.replace("radioGroup", "input");
					// $(res).prop('disabled', true);		
					count++;
				}
			});
		}
	}
	for(let i = 0; i < question.length; i++) {
		if(question[i][0].required == 1) {		// 檢查必填題目
			if(replyjson[i].answer == '' && replyjson[i].answerindex == -1) {
				return [false, question[i][0].question];
			}
		}
	}

	//20211123 Roger 判別選擇其它，卻沒有在其它選項欄位填寫文字，則不可送出
	for(let i = 0; i < replyjson.length; i++) {
		if(replyjson[i]['isOther']==1 && replyjson[i]['other']==''){
			return [false, question[i][0].question];
		}
	}
console.log(replyjson);

	return [true,''];
	// console.log(apiarr);
	// 
}

let replyarr=[];
var formData = new FormData();
var sid = getParameterByName('sid');
var cmfid = getParameterByName('cmfid');
var replyid = getParameterByName('replyid');
//console.log(replyid);
//行政滿意度問卷問答題暫存
function saveTmp(item){
	$('#'+tmpid).attr('disabled', true);
	alert('提醒！如需分次填寫意見，請勿點【確認送出】，送出即無法再次填報！');
	var tmpname = 'input'+item.toString();
	var tmpid = 'reply_tmp'+item.toString();
	var answer =$("textarea[name='"+tmpname+"']").val();
	var formDataTmp = new FormData();
	// console.log(answer);
	var sJson = JSON.stringify
	(
		{
			"cmid": result[0].cmid,
			"sid": sid,
			"qid": item,
			"answer": answer
		}
	);
	formDataTmp.append('datas', sJson)
	// console.log(sJson)
	// console.log(formData)

	$.ajax({
        url: urlprefix+"Reply/InsertTmp",
        type:"POST",
        processData:false,
        contentType: false,
        data: formDataTmp,
        dataType: "json",
        success: function (msg) {
			// console.log(msg);
			alert("本題項已暫存完成");
			$('#'+tmpid).attr('disabled', false);
		}
    });
}

// 送出答案
function saveReply(){
	if (confirm('確認填寫完畢要送出了嗎？') == true) {
		
	
		var checkSex =$("input[name='genderradio']:checked").val();
		if(typeof(checkSex) == "undefined"){ 
			alert("請先選取性別");
			return;
		}

		let returnFlag = geInputValue(replyarr);
		//console.log('沒問題'+replyarr);
		if(!returnFlag[0]) {
			alert(returnFlag[1]+"未填寫完成(若選擇其它答案，請輸入其它答案內容！！)");
			//alert("尚有課程主題評估未填完成，無法送出");
			return;
		}

		document.getElementById("replybutton").disabled=true;

		var end = new Date();
		var sJson = JSON.stringify
		(
			{
				"cmfid": result[0].id,
				"cmid": result[0].cmid,
				"fid": result[0].fid,
				"sid": sid,
				"gender": apiarr[0]=='女'?0:(apiarr[0]=='男'?1:2),
				"countTime": (end-begin),
				"creater": sid,
				"updater": sid,
				"Reply": replyjson
			}
		);
		formData.append('datas', sJson)
		// console.log(sJson)
		// console.log(formData)

		ApiPost(urlprefix+"Reply/insert","insertReply",formData);
		// return;
		//console.log(replyarr);  //getvalue的參數值 ex:input[name=input2]，以這個來找apiarr
		//console.log(apiarr);  //回答
		//console.log(question); //題目
		//console.log(sJson);

		//原先傳遞jsons的方式，由於要傳照片改用formData
		// $.ajax({
		// 	type: "POST",
		// 	//async為false -> 同步 
		// 	//async為true  -> 非同步
		// 	async: false,   
		// 	dataType: "json",
		// 	url: urlprefix+"Reply/insert",
		// 	//↑↑↑↑↑↑反正就是要指到你寫的aspx拉↑↑↑↑↑↑↑↑
		// 	contentType: 'application/json; charset=UTF-8',
		// 	data: sJson,
		// 	success: function (msg) {
		// 		// console.log(msg);
		// 		alert("作答完成!");
		// 		$('#replybutton').attr('disabled', true);
		// 	}
		// });
	}
}


// 放棄作答
function saveReply2(){
	// let returnFlag = geInputValue(replyarr);

	// if(!returnFlag[0]) {
	// 	alert("請填寫"+returnFlag[1]);
	// 	return;
	// }
	var _className = result[0].formName;
	if(confirm("是否未參加「"+_className+"」，按確定則未參加，按取消則繼續本課程問卷。")) {
		var checkSex =$("input[name='genderradio']:checked").val();
		if(typeof(checkSex) == "undefined"){ 
			alert("請先選取性別");
			return;
		}

		var emptyjson=[];
		var end = new Date();
		var sJson = JSON.stringify
		(
			{
				"cmfid": result[0].id,
				"cmid": result[0].cmid,
				"fid": result[0].fid,
				"sid": sid,
				"gender": checkSex=='女'?0:(checkSex=='男'?1:2),
				"countTime": (end-begin),
				"creater": sid,
				"updater": sid,
				"Reply": emptyjson
			}
		);
		formData.append('datas', sJson)
		// console.log(sJson)
		// console.log(formData)

		ApiPost(urlprefix+"Reply/insert","insertReply",formData);
	}
	// return;
	//console.log(replyarr);  //getvalue的參數值 ex:input[name=input2]，以這個來找apiarr
	//console.log(apiarr);  //回答
	//console.log(question); //題目
	//console.log(sJson);

	//原先傳遞jsons的方式，由於要傳照片改用formData
	// $.ajax({
	// 	type: "POST",
	// 	//async為false -> 同步 
	// 	//async為true  -> 非同步
	// 	async: false,   
	// 	dataType: "json",
	// 	url: urlprefix+"Reply/insert",
	// 	//↑↑↑↑↑↑反正就是要指到你寫的aspx拉↑↑↑↑↑↑↑↑
	// 	contentType: 'application/json; charset=UTF-8',
	// 	data: sJson,
	// 	success: function (msg) {
	// 		// console.log(msg);
	// 		alert("作答完成!");
	// 		$('#replybutton').attr('disabled', true);
	// 	}
	// });
}

// 20211123 Roger 暫存答案
function saveReply3(){
	if (confirm('提醒！如需分次填寫意見，請勿點【確認送出】，送出即無法再次填報！') == true) {
		let returnFlag = geInputValue(replyarr);
		var end = new Date();
		var sJson = JSON.stringify
		(
			{
				"cmfid": result[0].id,
				"cmid": result[0].cmid,
				"fid": result[0].fid,
				"sid": sid,
				"gender": apiarr[0]=='女'?0:(apiarr[0]=='男'?1:2),
				"countTime": (end-begin),
				"creater": sid,
				"updater": sid,
				"Reply": replyjson
			}
		);
		formData.append('datas', sJson)
		console.log(sJson)
		console.log(formData);

		ApiPostTmp(urlprefix+"Reply/insertTmpall","insertReply",formData);
		
	}
}

function saveReply4(){
	if (true == true) {
		let returnFlag = geInputValue(replyarr);
		var end = new Date();
		var sJson = JSON.stringify
		(
			{
				"cmfid": result[0].id,
				"cmid": result[0].cmid,
				"fid": result[0].fid,
				"sid": sid,
				"gender": apiarr[0]=='女'?0:(apiarr[0]=='男'?1:2),
				"countTime": (end-begin),
				"creater": sid,
				"updater": sid,
				"Reply": replyjson
			}
		);
		formData.append('datas', sJson)
		//console.log(sJson)
		console.log(returnFlag);

		//ApiPostTmp(urlprefix+"Reply/insertTmpall","insertReply",formData);
		
	}
}


//formData送出
function ApiPost(url,name,formData){
	let getURL = new URL(window.location.href);
	let tempParams = getURL.searchParams;
	let params = {"sid": "","anonymous": "","cmid": "-1"};
	for (let pair of tempParams.entries()) {
		params[pair[0]] = pair[1];
	}
	//console.log(params);
    $.ajax({
        url: url,
        type:"POST",
        processData:false,
        contentType: false,
        data: formData,
        dataType: "json",
        success: function (msg) {
			//console.log(msg);
			alert("本題項已填報完成，感謝您耐心填答");
			if(params.anonymous == 'Y'){
				//window.location.href = "./user_formList?idno="+params.sid+"&cmid="+params.cmid;
				window.history.back();
			} else {
				//window.location.href = "./user_formList?idno="+params.sid;
				window.history.back();
			}
			
			$('#replybutton').attr('disabled', true);
			
		}
      });
}

//20211202 Roger formData暫存送出
function ApiPostTmp(url,name,formData){
	let getURL = new URL(window.location.href);
	let tempParams = getURL.searchParams;
	let params = {"sid": "","anonymous": "","cmid": "-1"};
	for (let pair of tempParams.entries()) {
		params[pair[0]] = pair[1];
	}
	//console.log(params);
    $.ajax({
        url: url,
        type:"POST",
        processData:false,
        contentType: false,
        data: formData,
        dataType: "json",
        success: function (msg) {
			//console.log(msg);
			alert("本題項已暫存，請記得回來填答");
			if(params.anonymous == 'Y'){
				//window.location.href = "./user_formList?idno="+params.sid+"&cmid="+params.cmid;
				window.history.back();
			} else {
				//window.location.href = "./user_formList?idno="+params.sid;
				window.history.back();
			}
			
			$('#replybutton').attr('disabled', true);
			
		}
      });
}

let result;
let question = [];
// 顯示個別問卷
function identifyForm() {
	let getURL = new URL(window.location.href);
	let tempParams = getURL.searchParams;
	let params = {"sid": "","anonymous": ""};
	for (let pair of tempParams.entries()) {
		params[pair[0]] = pair[1];
	}

	if(params.anonymous == 'Y'){
		searchForm2();
	} else if(sid == null) {
		alert("無權限");
		window.location.href = "./user_formList?idno="+params.sid;
		return;
	}
	else {
		$.ajax({
			type: "GET",
			//async為false -> 同步 
			//async為true  -> 非同步
			async: false,   
			dataType: "json",
			url: "/survey/Reply/GetUnansweredForm?idno="+sid+"&anonymous",
			//↑↑↑↑↑↑反正就是要指到你寫的aspx拉↑↑↑↑↑↑↑↑
			contentType: 'application/json; charset=UTF-8',
			success: function (msg) {
				// console.log(msg)

				if(cmfid == null || msg.length == 0) {
					alert("已填報");
					//window.location.href = "./user_formList?idno="+params.sid;
					window.history.back();
					return;
				}
				else {
					let pass = false;
					for(let i=0; i<msg.length; i++) {
						if(msg[i].cmfid == cmfid) {
							pass = true;
						}
					}

					if(pass) {
						searchForm2();
					}
					else {
						alert("無權限");
						window.location.href = "./user_formList?idno="+params.sid;
						return;
					}
				}
			},
			//statusCode範例
			statusCode: {
				403: function (response) {
				   
				}
			}
		});
	}
}

function searchForm2() {
	let getURL = new URL(window.location.href);
    let tempParams = getURL.searchParams;
    let params = {"cmid": "-1","cmfid": "", "sid": "", "name": "", "year": "", "term": "", "classNo": ""};
    for (let pair of tempParams.entries()) {
        params[pair[0]] = pair[1];
	}
	
	$.ajax({
		type: "GET",
		//async為false -> 同步 
		//async為true  -> 非同步
		async: false,   
		dataType: "json",
		url: "/survey/Reply/GetUnansweredForm2?idno="+sid+"&cmid="+params.cmid,
		//↑↑↑↑↑↑反正就是要指到你寫的aspx拉↑↑↑↑↑↑↑↑
		contentType: 'application/json; charset=UTF-8',
		success: function (msg) {
			// console.log(msg)
			dataArr = msg;

			let index = 0;
			for(let i=0; i<dataArr.length; i++) {
				if(params.year == dataArr[i].year && params.term == dataArr[i].term && params.classNo == dataArr[i].class_no) {
					index = i;
				}
			}

			let tempHTML = "<tr>\
								<th style='background-color:#ffedb9;border:1px solid #b1b1b1'>班期名稱</th>\
								<td id='courseinfo' style='background-color:white;border:1px solid #b1b1b1'></td>\
							</tr>\
							<tr>\
								<th style='background-color:#ffedb9;border:1px solid #b1b1b1'>問卷名稱</th>\
								<td id='formName' style='background-color:white;border:1px solid #b1b1b1'></td>\
							</tr>\
							";

			$("#course_detail").html(tempHTML);

			searchForm();

			if(result[0].fid == '91'){
				let tempHTML2 = "<span>未參加本課程，請點選未參加-離開本題項</span>\
								</br>\
								<button class='btn btn-primary' id='replybutton1' name='replybutton1' onclick='saveReply2()' style='margin-left:220px'>未參加</button>";
				$("#no_sign").html(tempHTML2);
			}
			
		},
		//statusCode範例
		statusCode: {
			403: function (response) {
			   
			}
		}
	});
}

function searchForm() {
	let length;
	let groupName = [];		// 題組名稱
	
	$.ajax({
		type: "get",
		//async為false -> 同步 
		//async為true  -> 非同步
		async: false,   
		dataType: "json",
		url: urlprefix+'ClassManagementForm/getFormInfoByCMFID',
		data:{
			id:cmfid
		},
		//↑↑↑↑↑↑反正就是要指到你寫的aspx拉↑↑↑↑↑↑↑↑
		contentType: 'application/json; charset=UTF-8',
		success: function (msg) {
			result=msg;
			for(let i=0;i<msg[0].Detail[0].Groups.length;i++){
				if(msg[0].Detail[0].Groups[i].Detail.length==0){
					length=msg[0].Detail[0].Groups[i].Detail.length;
				}else{
					length=msg[0].Detail[0].Groups[i].Detail[0].Questions.length;
				}
				for (let j = 0; j < length; j++) {
					let showFlag = true;
					if(j != 0) {
						showFlag = false;
					}

					groupName.push({'show': showFlag, 'name': msg[0].Detail[0].Groups[i].Detail[0].name});
					question.push(msg[0].Detail[0].Groups[i].Detail[0].Questions[j].Detail);					
				}
			}

			

			$("#formName").html("<span><strong>"+result[0].formName+"</strong></span>");
			$("#courseinfo").html("<span><strong>"+result[0].name+"</strong></span>");
			

			// 搜尋問卷題目
			setFormQuestion(groupName, question, 0, question.length);
		}
	});
}

function searchForm_tmp() {
	let length;
	let groupName = [];		// 題組名稱
	
	$.ajax({
		type: "get",
		//async為false -> 同步 
		//async為true  -> 非同步
		async: false,   
		dataType: "json",
		url: urlprefix+'ClassManagementForm/getFormInfoByCMFID',
		data:{
			id:cmfid
		},
		//↑↑↑↑↑↑反正就是要指到你寫的aspx拉↑↑↑↑↑↑↑↑
		contentType: 'application/json; charset=UTF-8',
		success: function (msg) {
			result=msg;
			for(let i=0;i<msg[0].Detail[0].Groups.length;i++){
				if(msg[0].Detail[0].Groups[i].Detail.length==0){
					length=msg[0].Detail[0].Groups[i].Detail.length;
				}else{
					length=msg[0].Detail[0].Groups[i].Detail[0].Questions.length;
				}
				for (let j = 0; j < length; j++) {
					let showFlag = true;
					if(j != 0) {
						showFlag = false;
					}

					groupName.push({'show': showFlag, 'name': msg[0].Detail[0].Groups[i].Detail[0].name});
					question.push(msg[0].Detail[0].Groups[i].Detail[0].Questions[j].Detail);					
				}
			}

			let tempHTML = "<tr>\
								<th style='background-color:#ffedb9;border:1px solid #b1b1b1'>班期名稱</th>\
								<td id='courseinfo' style='background-color:white;border:1px solid #b1b1b1'></td>\
							</tr>\
							<tr>\
								<th style='background-color:#ffedb9;border:1px solid #b1b1b1'>問卷名稱</th>\
								<td id='formName' style='background-color:white;border:1px solid #b1b1b1'></td>\
							</tr>\
							";

			$("#course_detail").html(tempHTML);

			if(result[0].fid == '91'){
				let tempHTML2 = "<span>未參加本課程，請點選未參加-離開本題項</span>\
								</br>\
								<button class='btn btn-primary'>未參加</button>";
				$("#no_sign").html(tempHTML2);
			}


			$("#formName").html("<span><strong>"+result[0].formName+"</strong></span>");
			$("#courseinfo").html("<span><strong>"+result[0].name+"</strong></span>");
			
			//console.log(question);
			console.log(groupName);

			// 搜尋問卷題目
			setFormQuestion_tmp(groupName, question, 0, question.length);
		}
	});
}

// 問卷題目(使用者作答)
let sexFlag = 0;
function setFormQuestion(groupName, data, nowIndex, count) {
	let getURL = new URL(window.location.href);
    let tempParams = getURL.searchParams;
	let params = {"anonymous": ""};
	for (let pair of tempParams.entries()) {
		params[pair[0]] = pair[1];
	}
	if(nowIndex < count) {
		if(nowIndex==0){
			if(result[0].Detail[0].headerPic != '') {
				form_content +="<div class='form_item item'>";
				
				if(result[0].Detail[0].isHeaderPic=="1" && result[0].Detail[0].headerPic != ''){
					form_content +="<img src='./uploads/Form/"+result[0].Detail[0].id+"/"+result[0].Detail[0].headerPic+"' style='width:100%;border-radius: 10px;'>";
				}
				

				form_content +="</div>";
			}


			$.ajax({
				type: "get",
				//async為false -> 同步 
				//async為true  -> 非同步
				async: false,   
				dataType: "json",
				url: urlprefix+'ClassManagementForm/getGender',
				data:{
					id:result[0].cmid,
					idno:sid
				},
				//↑↑↑↑↑↑反正就是要指到你寫的aspx拉↑↑↑↑↑↑↑↑
				contentType: 'application/json; charset=UTF-8',
				success: function (msg) {
					gender=msg;
				}
			});
			if(params.anonymous == 'Y'){
				form_content +="<div class='form_item item'><div class='marginBottom' style='font-size: 20px;font-weight: bold;'>性別?</div>";
				form_content +="<input type='radio' class='inputAnswer' name='genderradio' value='男'>男 <input type='radio' class='inputAnswer' name='genderradio' value='女'>女 <input type='radio' class='inputAnswer' name='genderradio' value='中'>其他</div>";
				replyarr.push('input[name=genderradio]:checked');
			} else if(gender.length > 0 && gender[0].gender == '1'){
				form_content +="<div class='form_item item' style='display:none'><div class='marginBottom' style='font-size: 20px;font-weight: bold;'>性別?</div>";
				form_content +="<input type='radio' class='inputAnswer' name='genderradio' value='男' checked>男 <input type='radio' class='inputAnswer' name='genderradio' value='女'>女 <input type='radio' class='inputAnswer' name='genderradio' value='中'>其他</div>";
				replyarr.push('input[name=genderradio]:checked');
			} else if(gender.length > 0 && gender[0].gender == '0'){
				form_content +="<div class='form_item item' style='display:none'><div class='marginBottom' style='font-size: 20px;font-weight: bold;'>性別?</div>";
				form_content +="<input type='radio' class='inputAnswer' name='genderradio' value='男'>男 <input type='radio' class='inputAnswer' name='genderradio' value='女' checked>女 <input type='radio' class='inputAnswer' name='genderradio' value='中'>其他</div>";
				replyarr.push('input[name=genderradio]:checked');
			} else if(gender.length > 0 && gender[0].gender == '2'){
				form_content +="<div class='form_item item' style='display:none'><div class='marginBottom' style='font-size: 20px;font-weight: bold;'>性別?</div>";
				form_content +="<input type='radio' class='inputAnswer' name='genderradio' value='男'>男 <input type='radio' class='inputAnswer' name='genderradio' value='女'>女 <input type='radio' class='inputAnswer' name='genderradio' value='中' checked>其他</div>";
				replyarr.push('input[name=genderradio]:checked');
			} else {
				$.ajax({
					type: "get",
					//async為false -> 同步 
					//async為true  -> 非同步
					async: false,   
					dataType: "json",
					url: urlprefix+'Reply/GetTmpAnswer',
					data:{
						cmid:result[0].cmid,
						cmfid:cmfid,
						sid:sid,
						qid:1,
					},
					//↑↑↑↑↑↑反正就是要指到你寫的aspx拉↑↑↑↑↑↑↑↑
					contentType: 'application/json; charset=UTF-8',
					success: function (msg) {
						//alert(msg[0].gender);
						if (msg != ""){
							tmpAnswersex=msg[0].gender;
						}else{
							tmpAnswersex = "";
						}
						
						//console.log(tmpAnswersex.gender);
					}
				});

				//20211230 Roger 性別暫存
				
				let mansl = "";
				let womansl = "";
				let othersl = "";
				if (tmpAnswersex){
					
					if (tmpAnswersex == 1){
						mansl = "checked";
					}else if (tmpAnswersex == 0){
						womansl = "checked";
					}else if (tmpAnswersex == 2){
						othersl = "checked";
					}
				}

				//20211203 Roger 預判男女選項
				/* let sexsl = "";
				let mansl = "";
				let womansl = "";
				let othersl = "";
				if (sid){
					sexsl = sid.substr(1,1);
					if (sexsl == 1){
						mansl = "checked";
					}else if (sexsl == 2){
						womansl = "checked";
					}else{
						othersl = "checked";
					}
				} */
				
				form_content +="<div class='form_item item'><div class='marginBottom' style='font-size: 20px;font-weight: bold;'>性別?</div>";
				form_content +="<input type='radio' class='inputAnswer' name='genderradio' value='男' "+mansl+">男 <input type='radio' class='inputAnswer' name='genderradio' value='女' "+womansl+">女 <input type='radio' class='inputAnswer' name='genderradio' value='中' "+othersl+">其他</div>";
				replyarr.push('input[name=genderradio]:checked');
			
			}
			

			// if(result[0].Detail[0].istag2=="1"){
				// form_content +="</div><div class='form_item item'><div class='marginBottom' style='font-size: 20px;font-weight: bold;'>1. 性別?</div>";
				// form_content +="<input type='radio' class='inputAnswer' name='genderradio' value='男'>男 <input type='radio' class='inputAnswer' name='genderradio' value='女'>女 <input type='radio' class='inputAnswer' name='genderradio' value='中'>X";
				// replyarr.push('input[name=genderradio]:checked');
			// }
			// else {
			// 	sexFlag = 1;
			// }
				
		}

		let indexValue = 1;
		// if(result[0].Detail[0].istag2=="1"){
		// 	indexValue = 2;
		// }
		
		let groupContent = "<div style='padding-top: 3%;padding-left: 3%;font-size: 20px;font-weight: bold;color: blue;'>"+groupName[nowIndex].name+"</div>";
		
		//if((data[nowIndex][0].id == 169 || data[nowIndex][0].id == 170) && params.anonymous != 'Y'){
			//var q_header = "<div class='form_item item"+nowIndex+"'><div style='font-size: 20px;font-weight: bold;'>"+(nowIndex+indexValue)+". "+data[nowIndex][0].question+"<button class='btn btn-success' id='reply_tmp"+nowIndex+"' onclick='saveTmp("+nowIndex+")'>暫存</button></div>";
			//console.log(cmfid);
			$.ajax({
				type: "get",
				//async為false -> 同步 
				//async為true  -> 非同步
				async: false,   
				dataType: "json",
				url: urlprefix+'Reply/GetTmpAnswer',
				data:{
					cmid:result[0].cmid,
					cmfid:cmfid,
					sid:sid,
					qid:nowIndex+1,
				},
				//↑↑↑↑↑↑反正就是要指到你寫的aspx拉↑↑↑↑↑↑↑↑
				contentType: 'application/json; charset=UTF-8',
				success: function (msg) {
					tmpAnswer=msg;
					console.log(tmpAnswer);
				}
			});
		//} else {
			var q_header = "<div class='form_item item"+nowIndex+"'><div style='font-size: 20px;font-weight: bold;'>"+(nowIndex+indexValue)+". "+data[nowIndex][0].question+"</div>";
		//}
		
		let q_footer = "</div>";

		if(groupName[nowIndex].show) {
			form_content += groupContent;
		}

		form_content += q_header;

		switch(data[nowIndex][0].type) {
			case '0':
				// 簡答題
				if(tmpAnswer.length > 0){
			    	form_content += "<input class='columnStyle columnBorder widthFull' type='text' name='input"+nowIndex+"' placeholder='簡答文字' value='"+tmpAnswer[0].answer+"'>";
				}else{
					form_content += "<input class='columnStyle columnBorder widthFull' type='text' name='input"+nowIndex+"' placeholder='簡答文字'>";
				}
				replyarr.push('input[name=input'+nowIndex+']');
				break;
			case '1':
				// 詳答題
				if((data[nowIndex][0].id == 169 || data[nowIndex][0].id == 170) && params.anonymous != 'Y'){
					if(tmpAnswer.length > 0){
						form_content += "<textarea class='columnStyle columnBorder widthFull' name='input"+nowIndex+"' placeholder='【限500個中文字以內】'>"+tmpAnswer[0].answer+"</textarea>";
					} else {
						form_content += "<textarea class='columnStyle columnBorder widthFull' name='input"+nowIndex+"' placeholder='【限500個中文字以內】'></textarea>";
					}
				} else {
					form_content += "<textarea class='columnStyle columnBorder widthFull' name='input"+nowIndex+"' placeholder='【限500個中文字以內】'></textarea>";
				}
			    
				replyarr.push('textarea[name=input'+nowIndex+']');
				break;
		  	case '2':
				// 選擇題 //加form_content
				for (let i = 0; i < data[nowIndex][0].options.length; i++) {
					
					//讀取有暫存的資料
					let ichecked = "";
					let otherchecked = "";
					let otheranswer = "";
					if (tmpAnswer[0]){
						if(data[nowIndex][0].options[i].id==tmpAnswer[0].answer){
							ichecked = "checked";
						}else{
							ichecked = "";
						}
						if(tmpAnswer[0].isOther==1){
							otherchecked = "checked"
							otheranswer = tmpAnswer[0].other;
						}else{
							otherchecked = "";
							otheranswer = "";
						}
					}

					if(data[nowIndex][0].options[i].order==127){
						form_content += "<div class='option_item' style='margin-bottom:5px;display:flex;align-items:center;'><input type='radio' class='inputAnswer' style='margin-left:1px;' name='radioGroup"+nowIndex+"' value='isoption' "+otherchecked+"><input type='text' class='columnStyle columnBorder widthFull' style='padding:0px 0px 3px 0px;margin-left:11px;margin-bottom:0px;' placeholder='其他答案' name='input"+nowIndex+"' data-index='"+(i+1)+"' value='"+otheranswer+"'></div>";
					}else{
						if(data[nowIndex][0].options[i].type==2) {
							form_content += "<div class='option_item' style='margin-bottom: 5px;'><input type='radio' class='inputAnswer' name='radioGroup"+nowIndex+"' data-index='"+(i+1)+"' value='"+data[nowIndex][0].options[i].id+"' "+ichecked+"><img style='width: 40%;border-radius: 10px;' src='./uploads/Options/selectList/"+data[nowIndex][0].id+"/"+data[nowIndex][0].options[i].option+"'></div>";
						}
						else {
							form_content += "<div class='option_item' style='margin-bottom: 5px;'><input type='radio' class='inputAnswer' name='radioGroup"+nowIndex+"' data-index='"+(i+1)+"' value='"+data[nowIndex][0].options[i].id+"'"+ichecked+"><span class='marginLeftFix'>"+data[nowIndex][0].options[i].option+"</span></div>";
						}
					}					
				}
				replyarr.push('input[name=radioGroup'+nowIndex+']:checked');			    
			    break;
			case '3':
				// 核取方塊 //加form_content
				for (let i = 0; i < data[nowIndex][0].options.length; i++) {

					//讀取有暫存的資料
					let ichecked = "";
					if (tmpAnswer[0]){
						let tmpAnswerarray = tmpAnswer[0].answer.split(",");
						for (let j = 0; j < tmpAnswerarray.length; j++) {
							if(data[nowIndex][0].options[i].id==tmpAnswerarray[j]){
								ichecked = "checked";
								break;
							}
						}
						if(tmpAnswer[0].isOther==1){
							otherchecked = "checked"
							otheranswer = tmpAnswer[0].other;
						}else{
							otherchecked = "";
							otheranswer = "";
						}
					}

					if(data[nowIndex][0].options[i].order==127){
						form_content += "<div class='option_item' style='margin-bottom:5px;display:flex;align-items:center;'><input type='checkbox' class='inputAnswer' name='checkGroup"+nowIndex+"' style='margin-left:1px;' value='isoption'"+otherchecked+"><input type='text' class='columnStyle columnBorder widthFull' style='padding:0px 0px 3px 0px;margin-left:11px;margin-bottom:0px;' placeholder='其他答案' name='input"+nowIndex+"' data-index='"+(i+1)+"' value='"+otheranswer+"'></div>";
					}else{
						if(data[nowIndex][0].options[i].type==2) {
							form_content += "<div class='option_item' style='margin-bottom: 5px;'><input type='checkbox' class='inputAnswer' name='checkGroup"+nowIndex+"' data-index='"+(i+1)+"' value='"+data[nowIndex][0].options[i].id+"'"+ichecked+"><img style='width: 40%;border-radius: 10px;' src='./uploads/Options/checkList/"+data[nowIndex][0].id+"/"+data[nowIndex][0].options[i].option+"'></div>";
						}
						else {
							form_content += "<div class='option_item' style='margin-bottom: 5px;'><input type='checkbox' class='inputAnswer' name='checkGroup"+nowIndex+"' data-index='"+(i+1)+"' value='"+data[nowIndex][0].options[i].id+"'"+ichecked+"><span class='marginLeftFix'>"+data[nowIndex][0].options[i].option+"</span></div>";
						}	
					}					
				}
				replyarr.push('input[name=checkGroup'+nowIndex+']:checked');
			    break;
			case '4':
				// 下拉選單 //加中間form_content
			    form_content += "<div><select class='columnStyle columnBorder widthThirdOne' name='select"+nowIndex+"'>";
				for (let i = 0; i < data[nowIndex][0].options.length; i++) {
					//讀取有暫存的資料
					let ichecked = "";
					let otherchecked = "";
					let otheranswer = "";
					if (tmpAnswer[0]){
						if(data[nowIndex][0].options[i].id==tmpAnswer[0].answer){
							ichecked = "selected";
						}else{
							ichecked = "";
						}
						

					}
					form_content += "<option data-index='"+(i+1)+"' value='"+data[nowIndex][0].options[i].id+"'"+ichecked+">"+data[nowIndex][0].options[i].option+"</option>";
				}			
				form_content += "</select></div><div></div>";
				replyarr.push('select[name=select'+nowIndex+']');
			    break;
			case '5':
				// 線性題 //加中間form_content
				form_content += "<div><table><tr>";

				form_content += "<td>\
									<table>";

								let otherlabel = [];
								if(data[nowIndex][0].options[1].otherlabel != null) {
									otherlabel = data[nowIndex][0].options[0].otherlabel.split("*");
								}

								for(let m=data[nowIndex][0].options[1].order; m>=data[nowIndex][0].options[0].order; m--) {
									
									//讀取有暫存的資料
									let ichecked = "";
									if (tmpAnswer[0]){
										
										if(m==tmpAnswer[0].answer){
											ichecked = "checked"
										}else{
											ichecked = ""
										}
									}
									

									if(m == data[nowIndex][0].options[1].order) {	// 第一選項
				form_content +=			"<tr>\
											<td style='background-color:white;'><input type='radio' class='inputAnswer' name='radioGroup"+nowIndex+"' data-index='"+m+"' value='"+m+"'"+ichecked+"></td>\
											<td style='min-width:50px;background-color:white;'>"+data[nowIndex][0].options[1].option+"</td>\
										</tr>";
									}
									else if(m == data[nowIndex][0].options[0].order) {	// 最後選項
				form_content +=			"<tr>\
											<td style='background-color:white;'><input type='radio' class='inputAnswer' name='radioGroup"+nowIndex+"' data-index='"+m+"' value='"+m+"'"+ichecked+"></td>\
											<td style='min-width:50px;background-color:white;'>"+data[nowIndex][0].options[0].option+"</td>\
										</tr>";
									}
									else {	// 中間選項
				form_content +=			"<tr>\
											<td style='background-color:white;'><input type='radio' class='inputAnswer' name='radioGroup"+nowIndex+"' data-index='"+m+"' value='"+m+"'"+ichecked+"></td>\
											<td style='min-width:50px;background-color:white;'>"+otherlabel[m-data[nowIndex][0].options[0].order-1]+"</td>\
										</tr>";
									}
								}
										
				form_content += 	"</table>\
								</td>";
					
				// form_content += "<td>\
				// 					<table>\
				// 						<tr>\
				// 							<th>"+data[nowIndex][0].options[1].option+"</th>";
										
				// 						// let countIndex = data[nowIndex][0].options[1].order-1;
				// 						let otherlabel = [];
				// 						if(data[nowIndex][0].options[1].otherlabel != null) {
				// 							otherlabel = data[nowIndex][0].options[0].otherlabel.split("*");
				// 						}
										
				// 					for(let m=data[nowIndex][0].options[1].order-data[nowIndex][0].options[0].order-2; m>=0; m--) {
				// 						if(otherlabel[m] != undefined) {
				// form_content += 			"<th style='min-width:50px;text-align:center;'>"+otherlabel[m]+"</th>";
				// 						}
				// 						else {
				// form_content += 			"<th style='min-width:50px;text-align:center;'></th>"
				// 						}
				// 						// countIndex--;
				// 					}
				// form_content += 			"<th style='min-width:50px;text-align:center;'>"+data[nowIndex][0].options[0].option+"</th>\
				// 						</tr>\
				// 						<tr>";
				// 					for (let i = data[nowIndex][0].options[1].order; i >= data[nowIndex][0].options[0].order; i--) {
				// form_content += 			"<td style='min-width:50px;text-align:center;'>\
				// 								<input type='radio' class='inputAnswer' name='radioGroup"+nowIndex+"' data-index='"+i+"' value='"+i+"'>\
				// 							</td>";
				// 					}
				// form_content += 		"</tr>\
				// 					</table>\
				// 				</td>";

				form_content += "</tr></table></div>";
				replyarr.push('input[name=radioGroup'+nowIndex+']:checked');
			    break;
			case '6':
				// 單選方格
				let tempInput = [];
				let labelArr1 = [[], []];
				for(let i=0; i<data[nowIndex][0].options.length; i++) {
					if(data[nowIndex][0].options[i].type == 1) {		// 列
						labelArr1[0].push(data[nowIndex][0].options[i].option);
					}
					else if(data[nowIndex][0].options[i].type == 2) {		// 欄
						labelArr1[1].push(data[nowIndex][0].options[i].option);
					}
				}

			    form_content += "<div><table style='text-align: center; width:100%;'><tr><th class='widthSmall'></th>";
			    for(let i=0; i<labelArr1[1].length; i++) {
			    	form_content += "<th class='widthSmall'>"+labelArr1[1][i]+"</th>";		// 幾欄
			    }
			    form_content += "</tr>";

			    for(let j=0; j<labelArr1[0].length; j++) {
			    	form_content += "<tr>";
			    	form_content += "<th class='widthSmall'>"+labelArr1[0][j]+"</th>";
			    	for(let k=0; k<labelArr1[1].length; k++) {
							//讀取有暫存的資料
							let values = String(j)+String(k);

							let ichecked = "";
							
							if (tmpAnswer[0]){
								let tmpAnswerarray = tmpAnswer[0].answer.split(",");
								for (let j = 0; j < tmpAnswerarray.length; j++) {
									if(values==tmpAnswerarray[j]){
										ichecked = "checked";
										break;
									}
								}
							}else{

								if(k == Math.ceil(labelArr1[1].length/2)) {
									//ichecked = "checked";		// 幾列
									ichecked = "";
								}
								else {
									ichecked = "";		// 幾列
								}
							}
						form_content += "<td class='td_pad'><input type='radio' class='inputAnswer' name='radioGroup"+nowIndex+"-"+j+"' value='"+values+"' "+ichecked+"></td>";

				    }
					form_content += "</tr>";
					
					tempInput.push('input[name=radioGroup'+nowIndex+'-'+j+']:checked');
			    }
				form_content += "</table></div>";
				replyarr.push(tempInput);
				break;
			case '7':
				// 核取方格
				let labelArr2 = [[], []];
				for(let i=0; i<data[nowIndex][0].options.length; i++) {
					if(data[nowIndex][0].options[i].type == 1) {		// 列
						labelArr2[0].push(data[nowIndex][0].options[i].option);
					}
					else if(data[nowIndex][0].options[i].type == 2) {		// 欄
						labelArr2[1].push(data[nowIndex][0].options[i].option);
					}
				}

			    form_content += "<div><table style='text-align: center; width:100%;'><tr><th class='widthSmall'></th>";
			    for(let i=0; i<labelArr2[1].length; i++) {
			    	form_content += "<th class='widthSmall'>"+labelArr2[1][i]+"</th>";		// 幾欄
			    }
			    form_content += "</tr>";

			    for(let j=0; j<labelArr2[0].length; j++) {
			    	form_content += "<tr>";
			    	form_content += "<th class='widthSmall'>"+labelArr2[0][j]+"</th>";
			    	for(let k=0; k<labelArr2[1].length; k++) {
						//讀取有暫存的資料
						let values = String(j)+String(k);
						let ichecked = "";
						
						if (tmpAnswer[0]){
							let tmpAnswerarray = tmpAnswer[0].answer.split(",");
							for (let j = 0; j < tmpAnswerarray.length; j++) {
								if(values==tmpAnswerarray[j]){
									ichecked = "checked";
									break;
								}
							}
						}



				    	form_content += "<td class='td_pad'><input type='checkbox' class='inputAnswer' name='checkGroup"+nowIndex+"' value='"+values+"'"+ichecked+"></td>";		// 幾列
				    }
			    	form_content += "</tr>";
			    }
				form_content += "</table></div>";
				replyarr.push('input[name=checkGroup'+nowIndex+']:checked');
			    break;
			case '8':
				// 檔案上傳
				//20211221 Roger 顯示已暫存的檔案
				if(tmpAnswer[0]){
					if(tmpAnswer[0].answer != ""){
						
						form_content += "<div id='tmpfile_"+nowIndex+"'><a target='_blank' href='./uploads/Reply_tmp/"+tmpAnswer[0].cmfid+"/"+tmpAnswer[0].sid+"/"+tmpAnswer[0].answer+"'><img style='width: 150px;border-radius: 10px;' src='./uploads/Reply_tmp/"+tmpAnswer[0].cmfid+"/"+tmpAnswer[0].sid+"/"+tmpAnswer[0].answer+"'></a><BR><input type='button' onclick=deltmpfile('"+tmpAnswer[0].cmfid+"@"+tmpAnswer[0].sid+"@"+(nowIndex+1)+"@"+tmpAnswer[0].answer+"','"+nowIndex+"') value='刪除暫存圖檔'></div>";
					}
				}
				form_content += "<div id='input"+nowIndex+"'><input type='file' class='columnStyle columnBorder widthThirdTwo' name='input"+nowIndex+"'></div>";
				form_content += "<input type='button' class='columnStyle columnBorder widthThirdTwo' onclick=checkFile(\'input"+nowIndex+"\') value='檢查檔案'></div>";
				replyarr.push('input[name=input'+nowIndex+']');
			    break;
			case '9':
				// 輸入日期
				form_content += "<div><input type='date' class='date_con date_click columnStyle columnBorder widthThirdTwo' name='input"+nowIndex+"'></div>";
				replyarr.push('input[name=input'+nowIndex+']');
			    break;
			case '10':
				// 輸入時間
				form_content += "<div><input type='time' class='date_con date_click columnStyle columnBorder widthThirdTwo' name='input"+nowIndex+"'></div>";
				replyarr.push('input[name=input'+nowIndex+']');
			    break;
			case '11':
				// 日期+時間
			    form_content += "<div><input type='datetime-local' class='date_con date_click columnStyle columnBorder widthThirdTwo' name='input"+nowIndex+"'></div>";
				replyarr.push('input[name=input'+nowIndex+']');
				break;
		  	default:
		    	form_content += "<input class='columnStyle columnBorder widthFull' type='text' name='input"+nowIndex+"' placeholder='簡答文字'>";
				replyarr.push('input[name=input'+nowIndex+']');
				break;
		}
		
		form_content += q_footer;

		nowIndex++;
		setFormQuestion(groupName, data, nowIndex, count);
	}
	else {
		if(result[0].Detail[0].footerPic != '' && result[0].Detail[0].footerText != '') {
			form_content +="<div class='form_item item><div class='fontSize24 marginBottom'>";
		
			if(result[0].Detail[0].isFooterPic=="1" && result[0].Detail[0].footerPic != ''){				
				form_content +="<img src='./uploads/Form/"+result[0].Detail[0].id+"/"+result[0].Detail[0].footerPic+"' style='width:100%;border-radius: 10px;'>";
			}
			if(result[0].Detail[0].isFooterText=="1" && result[0].Detail[0].footerText != ''){
				form_content +="<p>"+result[0].Detail[0].footerText+"</p>";
			}
	
			form_content +="</div></div>";
		}
		
		// console.log(form_content)
		//20211201 Roger 加入暫存按鈕
		$("#form_all_question").html(form_content);
		if(replyid!=''&&replyid!=undefined&&replyid!=null){
			getReplyAnswer();
		}else{
			$("#replybtn").html("<button class='btn btn-info' id='replybutton' name='replybutton' onclick='saveReply3()' >暫存</button> <button class='btn btn-success' id='replybutton' name='replybutton' onclick='saveReply()' >確認送出</button>");
		}
	}
}

function setFormQuestion_tmp(groupName, data, nowIndex, count) {
	if(nowIndex < count) {
		if(nowIndex==0){
			if(result[0].Detail[0].headerPic != '' && result[0].Detail[0].headerText != '') {
				form_content +="<div class='form_item item'>";
				
				if(result[0].Detail[0].isHeaderPic=="1" && result[0].Detail[0].headerPic != ''){
					form_content +="<img src='./uploads/Form/"+result[0].Detail[0].id+"/"+result[0].Detail[0].headerPic+"' style='width:100%;border-radius: 10px;'>";
				}
				if(result[0].Detail[0].isHeaderText=="1" && result[0].Detail[0].headerText != ''){
					form_content +="<p>"+result[0].Detail[0].headerText+"</p>";
				}

				form_content +="</div>";
			}

			form_content +="<div class='form_item item'><div class='marginBottom' style='font-size: 20px;font-weight: bold;'>性別?</div>";
			form_content +="<input type='radio' class='inputAnswer' name='genderradio' value='男'>男 <input type='radio' class='inputAnswer' name='genderradio' value='女'>女 <input type='radio' class='inputAnswer' name='genderradio' value='中'>其他</div>";
			replyarr.push('input[name=genderradio]:checked');
		
			// if(result[0].Detail[0].istag2=="1"){
				// form_content +="</div><div class='form_item item'><div class='marginBottom' style='font-size: 20px;font-weight: bold;'>1. 性別?</div>";
				// form_content +="<input type='radio' class='inputAnswer' name='genderradio' value='男'>男 <input type='radio' class='inputAnswer' name='genderradio' value='女'>女 <input type='radio' class='inputAnswer' name='genderradio' value='中'>X";
				// replyarr.push('input[name=genderradio]:checked');
			// }
			// else {
			// 	sexFlag = 1;
			// }
				
		}

		let indexValue = 1;
		// if(result[0].Detail[0].istag2=="1"){
		// 	indexValue = 2;
		// }
		
		let groupContent = "<div style='padding-top: 3%;padding-left: 3%;font-size: 20px;font-weight: bold;color: blue;'>"+groupName[nowIndex].name+"</div>";
		let q_header = "<div class='form_item item"+nowIndex+"'><div style='font-size: 20px;font-weight: bold;'>"+(nowIndex+indexValue)+". "+data[nowIndex][0].question+"</div>";
		let q_footer = "</div>";

		if(groupName[nowIndex].show) {
			form_content += groupContent;
		}

		form_content += q_header;

		switch(data[nowIndex][0].type) {
			case '0':
				// 簡答題
			    form_content += "<input class='columnStyle columnBorder widthFull' type='text' name='input"+nowIndex+"' placeholder='簡答文字'>";
				replyarr.push('input[name=input'+nowIndex+']');
				break;
			case '1':
				// 詳答題
			    form_content += "<textarea class='columnStyle columnBorder widthFull' name='input"+nowIndex+"' placeholder='【限500個中文字以內】'></textarea>";
				replyarr.push('textarea[name=input'+nowIndex+']');
				break;
		  	case '2':
				// 選擇題 //加form_content
				for (let i = 0; i < data[nowIndex][0].options.length; i++) {
					if(data[nowIndex][0].options[i].order==127){
						form_content += "<div class='option_item' style='margin-bottom:5px;display:flex;align-items:center;'><input type='radio' class='inputAnswer' style='margin-left:1px;' name='radioGroup"+nowIndex+"' value='isoption'><input type='text' class='columnStyle columnBorder widthFull' style='padding:0px 0px 3px 0px;margin-left:11px;margin-bottom:0px;' placeholder='其他答案' name='input"+nowIndex+"' data-index='"+(i+1)+"'></div>";
					}else{
						if(data[nowIndex][0].options[i].type==2) {
							form_content += "<div class='option_item' style='margin-bottom: 5px;'><input type='radio' class='inputAnswer' name='radioGroup"+nowIndex+"' data-index='"+(i+1)+"' value='"+data[nowIndex][0].options[i].id+"'><img style='width: 40%;border-radius: 10px;' src='./uploads/Options/selectList/"+data[nowIndex][0].id+"/"+data[nowIndex][0].options[i].option+"'></div>";
						}
						else {
							form_content += "<div class='option_item' style='margin-bottom: 5px;'><input type='radio' class='inputAnswer' name='radioGroup"+nowIndex+"' data-index='"+(i+1)+"' value='"+data[nowIndex][0].options[i].id+"'><span class='marginLeftFix'>"+data[nowIndex][0].options[i].option+"</span></div>";
						}
					}					
				}
				replyarr.push('input[name=radioGroup'+nowIndex+']:checked');			    
			    break;
			case '3':
				// 核取方塊 //加form_content
				for (let i = 0; i < data[nowIndex][0].options.length; i++) {
					if(data[nowIndex][0].options[i].order==127){
						form_content += "<div class='option_item' style='margin-bottom:5px;display:flex;align-items:center;'><input type='checkbox' class='inputAnswer' name='checkGroup"+nowIndex+"' style='margin-left:1px;' value='isoption'><input type='text' class='columnStyle columnBorder widthFull' style='padding:0px 0px 3px 0px;margin-left:11px;margin-bottom:0px;' placeholder='其他答案' name='input"+nowIndex+"' data-index='"+(i+1)+"'></div>";
					}else{
						if(data[nowIndex][0].options[i].type==2) {
							form_content += "<div class='option_item' style='margin-bottom: 5px;'><input type='checkbox' class='inputAnswer' name='checkGroup"+nowIndex+"' data-index='"+(i+1)+"' value='"+data[nowIndex][0].options[i].id+"'><img style='width: 40%;border-radius: 10px;' src='./uploads/Options/checkList/"+data[nowIndex][0].id+"/"+data[nowIndex][0].options[i].option+"'></div>";
						}
						else {
							form_content += "<div class='option_item' style='margin-bottom: 5px;'><input type='checkbox' class='inputAnswer' name='checkGroup"+nowIndex+"' data-index='"+(i+1)+"' value='"+data[nowIndex][0].options[i].id+"'><span class='marginLeftFix'>"+data[nowIndex][0].options[i].option+"</span></div>";
						}	
					}					
				}
				replyarr.push('input[name=checkGroup'+nowIndex+']:checked');
			    break;
			case '4':
				// 下拉選單 //加中間form_content
			    form_content += "<div><select class='columnStyle columnBorder widthThirdOne' name='select"+nowIndex+"'>";
				for (let i = 0; i < data[nowIndex][0].options.length; i++) {
					form_content += "<option data-index='"+(i+1)+"' value='"+data[nowIndex][0].options[i].id+"'>"+data[nowIndex][0].options[i].option+"</option>";
				}			
				form_content += "</select></div><div></div>";
				replyarr.push('select[name=select'+nowIndex+']');
			    break;
			case '5':
				// 線性題 //加中間form_content
				form_content += "<div><table><tr>";

				form_content += "<td>\
									<table>";

								let otherlabel = [];
								if(data[nowIndex][0].options[1].otherlabel != null) {
									otherlabel = data[nowIndex][0].options[0].otherlabel.split("*");
								}

								for(let m=data[nowIndex][0].options[1].order; m>=data[nowIndex][0].options[0].order; m--) {
									if(m == data[nowIndex][0].options[1].order) {	// 第一選項
				form_content +=			"<tr>\
											<td style='background-color:white;'><input type='radio' class='inputAnswer' name='radioGroup"+nowIndex+"' data-index='"+m+"' value='"+m+"'></td>\
											<td style='min-width:50px;background-color:white;'>"+data[nowIndex][0].options[1].option+"</td>\
										</tr>";
									}
									else if(m == data[nowIndex][0].options[0].order) {	// 最後選項
				form_content +=			"<tr>\
											<td style='background-color:white;'><input type='radio' class='inputAnswer' name='radioGroup"+nowIndex+"' data-index='"+m+"' value='"+m+"'></td>\
											<td style='min-width:50px;background-color:white;'>"+data[nowIndex][0].options[0].option+"</td>\
										</tr>";
									}
									else {	// 中間選項
				form_content +=			"<tr>\
											<td style='background-color:white;'><input type='radio' class='inputAnswer' name='radioGroup"+nowIndex+"' data-index='"+m+"' value='"+m+"'></td>\
											<td style='min-width:50px;background-color:white;'>"+otherlabel[m-data[nowIndex][0].options[0].order-1]+"</td>\
										</tr>";
									}
								}
										
				form_content += 	"</table>\
								</td>";
					
				// form_content += "<td>\
				// 					<table>\
				// 						<tr>\
				// 							<th>"+data[nowIndex][0].options[1].option+"</th>";
										
				// 						// let countIndex = data[nowIndex][0].options[1].order-1;
				// 						let otherlabel = [];
				// 						if(data[nowIndex][0].options[1].otherlabel != null) {
				// 							otherlabel = data[nowIndex][0].options[0].otherlabel.split("*");
				// 						}
										
				// 					for(let m=data[nowIndex][0].options[1].order-data[nowIndex][0].options[0].order-2; m>=0; m--) {
				// 						if(otherlabel[m] != undefined) {
				// form_content += 			"<th style='min-width:50px;text-align:center;'>"+otherlabel[m]+"</th>";
				// 						}
				// 						else {
				// form_content += 			"<th style='min-width:50px;text-align:center;'></th>"
				// 						}
				// 						// countIndex--;
				// 					}
				// form_content += 			"<th style='min-width:50px;text-align:center;'>"+data[nowIndex][0].options[0].option+"</th>\
				// 						</tr>\
				// 						<tr>";
				// 					for (let i = data[nowIndex][0].options[1].order; i >= data[nowIndex][0].options[0].order; i--) {
				// form_content += 			"<td style='min-width:50px;text-align:center;'>\
				// 								<input type='radio' class='inputAnswer' name='radioGroup"+nowIndex+"' data-index='"+i+"' value='"+i+"'>\
				// 							</td>";
				// 					}
				// form_content += 		"</tr>\
				// 					</table>\
				// 				</td>";

				form_content += "</tr></table></div>";
				replyarr.push('input[name=radioGroup'+nowIndex+']:checked');
			    break;
			case '6':
				// 單選方格
				let tempInput = [];
				let labelArr1 = [[], []];
				for(let i=0; i<data[nowIndex][0].options.length; i++) {
					if(data[nowIndex][0].options[i].type == 1) {		// 列
						labelArr1[0].push(data[nowIndex][0].options[i].option);
					}
					else if(data[nowIndex][0].options[i].type == 2) {		// 欄
						labelArr1[1].push(data[nowIndex][0].options[i].option);
					}
				}

			    form_content += "<div><table style='text-align: center; width:100%;'><tr><th class='widthSmall'></th>";
			    for(let i=0; i<labelArr1[1].length; i++) {
			    	form_content += "<th class='widthSmall'>"+labelArr1[1][i]+"</th>";		// 幾欄
			    }
			    form_content += "</tr>";

			    for(let j=0; j<labelArr1[0].length; j++) {
			    	form_content += "<tr>";
			    	form_content += "<th class='widthSmall'>"+labelArr1[0][j]+"</th>";
			    	for(let k=0; k<labelArr1[1].length; k++) {
				    	if(k == Math.ceil(labelArr1[1].length/2)) {
							form_content += "<td class='td_pad'><input type='radio' class='inputAnswer' name='radioGroup"+nowIndex+"-"+j+"' value='"+String(j)+String(k)+"' checked></td>";		// 幾列
						}
						else {
							form_content += "<td class='td_pad'><input type='radio' class='inputAnswer' name='radioGroup"+nowIndex+"-"+j+"' value='"+String(j)+String(k)+"'></td>";		// 幾列
						}
				    }
					form_content += "</tr>";
					
					tempInput.push('input[name=radioGroup'+nowIndex+'-'+j+']:checked');
			    }
				form_content += "</table></div>";
				replyarr.push(tempInput);
				break;
			case '7':
				// 核取方格
				let labelArr2 = [[], []];
				for(let i=0; i<data[nowIndex][0].options.length; i++) {
					if(data[nowIndex][0].options[i].type == 1) {		// 列
						labelArr2[0].push(data[nowIndex][0].options[i].option);
					}
					else if(data[nowIndex][0].options[i].type == 2) {		// 欄
						labelArr2[1].push(data[nowIndex][0].options[i].option);
					}
				}

			    form_content += "<div><table style='text-align: center; width:100%;'><tr><th class='widthSmall'></th>";
			    for(let i=0; i<labelArr2[1].length; i++) {
			    	form_content += "<th class='widthSmall'>"+labelArr2[1][i]+"</th>";		// 幾欄
			    }
			    form_content += "</tr>";

			    for(let j=0; j<labelArr2[0].length; j++) {
			    	form_content += "<tr>";
			    	form_content += "<th class='widthSmall'>"+labelArr2[0][j]+"</th>";
			    	for(let k=0; k<labelArr2[1].length; k++) {
				    	form_content += "<td class='td_pad'><input type='checkbox' class='inputAnswer' name='checkGroup"+nowIndex+"' value='"+String(j)+String(k)+"'></td>";		// 幾列
				    }
			    	form_content += "</tr>";
			    }
				form_content += "</table></div>";
				replyarr.push('input[name=checkGroup'+nowIndex+']:checked');
			    break;
			case '8':
				// 檔案上傳
				form_content += "<div id='input"+nowIndex+"'><input type='file' class='columnStyle columnBorder widthThirdTwo' name='input"+nowIndex+"'></div>";
				replyarr.push('input[name=input'+nowIndex+']');
			    break;
			case '9':
				// 輸入日期
				form_content += "<div><input type='date' class='date_con date_click columnStyle columnBorder widthThirdTwo' name='input"+nowIndex+"'></div>";
				replyarr.push('input[name=input'+nowIndex+']');
			    break;
			case '10':
				// 輸入時間
				form_content += "<div><input type='time' class='date_con date_click columnStyle columnBorder widthThirdTwo' name='input"+nowIndex+"'></div>";
				replyarr.push('input[name=input'+nowIndex+']');
			    break;
			case '11':
				// 日期+時間
			    form_content += "<div><input type='datetime-local' class='date_con date_click columnStyle columnBorder widthThirdTwo' name='input"+nowIndex+"'></div>";
				replyarr.push('input[name=input'+nowIndex+']');
				break;
		  	default:
		    	form_content += "<input class='columnStyle columnBorder widthFull' type='text' name='input"+nowIndex+"' placeholder='簡答文字'>";
				replyarr.push('input[name=input'+nowIndex+']');
				break;
		}
		
		form_content += q_footer;

		nowIndex++;
		setFormQuestion_tmp(groupName, data, nowIndex, count);
	}
	else {
		if(result[0].Detail[0].footerPic != '' && result[0].Detail[0].footerText != '') {
			form_content +="<div class='form_item item><div class='fontSize24 marginBottom'>";
		
			if(result[0].Detail[0].isFooterPic=="1" && result[0].Detail[0].footerPic != ''){				
				form_content +="<img src='./uploads/Form/"+result[0].Detail[0].id+"/"+result[0].Detail[0].footerPic+"' style='width:100%;border-radius: 10px;'>";
			}
			if(result[0].Detail[0].isFooterText=="1" && result[0].Detail[0].footerText != ''){
				form_content +="<p>"+result[0].Detail[0].footerText+"</p>";
			}
	
			form_content +="</div></div>";
		}
		
		// console.log(form_content)
		$("#form_all_question").html(form_content);
	}
}

/*

							<tr>\
								<th style='background-color:#ffedb9;border:1px solid #b1b1b1'>班期名稱</th>\
								<td style='background-color:white;border:1px solid #b1b1b1'>"+dataArr[index].classname+"</td>\
							</tr>\
							<tr>\
								<th style='background-color:#ffedb9;border:1px solid #b1b1b1'>訓期</th>\
								<td style='background-color:white;border:1px solid #b1b1b1'>"+dataArr[index].start_date1.substring(0 , 10)+"~"+dataArr[index].end_date1.substring(0, 10)+"</td>\
							</tr>\
							<tr>\
								<th style='background-color:#ffedb9;border:1px solid #b1b1b1'>承辦人</th>\
								<td style='background-color:white;border:1px solid #b1b1b1'>"+dataArr[index].sname+"</td>\
							</tr>
*/
