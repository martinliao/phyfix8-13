function getList() {
    let idno = "";
    let getURL = new URL(window.location.href);
    let tempParams = getURL.searchParams;
    let params = {"idno": "","cmid":-1};
    for (let pair of tempParams.entries()) {
        params[pair[0]] = pair[1];
    }

    if(params.idno != "") {
        $.ajax({
            type: "GET",
            //async為false -> 同步 
            //async為true  -> 非同步
            async: false,   
            dataType: "json",
            url: "/survey/Reply/GetUnansweredForm2?idno="+params.idno+"&cmid="+params.cmid,
            //↑↑↑↑↑↑反正就是要指到你寫的aspx拉↑↑↑↑↑↑↑↑
            contentType: 'application/json; charset=UTF-8',
            success: function (msg) {
                console.log(msg)
                dataArr = msg;
            },
            //statusCode範例
            statusCode: {
                403: function (response) {
                   
                }
            }
        });
    }
    else {
        alert("未帶入身分證字號");
    }

    createTable();
}

function createTable() {
    let html = '';
    let getURL = new URL(window.location.href);
    let tempParams = getURL.searchParams;
    let params = {"idno": "","cmid":-1};
    for (let pair of tempParams.entries()) {
        params[pair[0]] = pair[1];
    }

    if(params.cmid > 0){
        html = "<tr class='border_blue'>\
                    <th class='th_blue' width='10%'>項號</th>\
                    <th class='th_blue inputLeft' width='60%'>班期名稱</th>\
                    <th class='th_blue' width='10%' style='min-width: 20px;text-align:center;'>期別</th>\
                </tr>";
    } else {
        html = "<tr class='border_blue'>\
                    <th class='th_blue' width='10%'>項號</th>\
                    <th class='th_blue inputLeft' width='60%'>班期名稱</th>\
                    <th class='th_blue' width='10%' style='min-width: 20px;text-align:center;'>期別</th>\
                    <th class='th_blue' width='20%' style='min-width: 20px;text-align:center;'>填寫進度</th>\
                </tr>";
    }
    
    // $("#wr-page").html("");     // 先清空舊分頁頁碼

    // // 產生分頁頁碼
    // $("#wr-page").wrpage({
    //     pagesize: Math.ceil(dataArr.length/10),
    //     wr_current: 1,
    //     cb: function(pageIndex) {
    //         showList(pageIndex, html);
    //     }
    // })

    // 首次產生分頁
    showList(1, html);
    
    function showList(pageIndex, html) {
        if(dataArr.length > 0) {
            for (let index=(pageIndex-1)*10; index<(pageIndex-1)*10+10; index++) {
                if(dataArr[index] == undefined) {
                    break;
                }

                if(params.cmid > 0){
                    html += "<tr class='border_blue'>\
                            <td class='inputCenter'>"+(index+1)+"</td>\
                            <td class='q_td' onclick='openFormList("+index+")'>"+dataArr[index].classname+"</td>\
                            <td class='inputCenter'>"+dataArr[index].term+"</td>\
                        </tr>";
                } else {
                    html += "<tr class='border_blue'>\
                            <td class='inputCenter'>"+(index+1)+"</td>\
                            <td class='q_td' onclick='openFormList("+index+")'>"+dataArr[index].classname+"</td>\
                            <td class='inputCenter'>"+dataArr[index].term+"</td>\
                            <td class='inputCenter'>問卷未完成</td>\
                        </tr>";
                }

                        // <td class='q_td' onclick='openPop(\""+dataArr[index].cmfid+"\", \""+dataArr[index].idno+"\", \""+dataArr[index].sname+"\")'>"+dataArr[index].formname+"</td>
            }
        }
        else {
        html += "<tr>\
                    <td colspan='3' style='text-align:center;color:red;'>目前無問卷調查班期，謝謝您！</td>\
                </tr>";
        }
        
        $('#tableid').html(html);
    }
}

function openPop(anonymous, cmid, cmfid, idno, name, year, term, classNo) {
    window.location.href = "./client_reply.php?anonymous="+anonymous+"&cmid="+cmid+"&cmfid="+cmfid+"&sid="+idno+"&name="+name+"&year="+year+"&term="+term+"&classNo="+classNo;
}

function openFormList(index) {
    let getURL = new URL(window.location.href);
    let tempParams = getURL.searchParams;
    let params = {"idno": "","cmid":-1};
    for (let pair of tempParams.entries()) {
        params[pair[0]] = pair[1];
    }

    let count_question = 0;
    let count_course = 0;
    for(let j=0; j<dataArr[index].detail.length; j++) {
        count_question += Number(dataArr[index].detail[j].questioncount);
        if(dataArr[index].detail[j].formname.substr(0,4) == '講座評估'){
            count_course += 1;
        }
    }

    if(count_course == 0 && dataArr[index].teachercount == 0){
        var count_text = "＊ 本問卷需作答題目共"+count_question+"題";
    } else {
        var count_text = "＊ 本問卷共調查"+count_course+"門課程，評估老師共"+dataArr[index].teachercount+"位，需作答題目共"+count_question+"題"
    }

    if(dataArr[index].head_text != ''){
        var head_text = dataArr[index].head_text;
    } else {
        var head_text = "<div>各位學員您好：</div>\
                            <div>本處為瞭解您對班期安排的滿意狀況，特擬本問卷調查表，請您提供寶貴意見，以做日後改進之參考。非常感謝您的支持與回饋，謝謝！</div>\
                            <div>(本問卷採不記名方式，其中<strong>講座評估項目為必填</strong>，各問項一經確認送出即不能重新作答)</div>\
                            <div align='right' style='font-size: 13px;'>公訓處客服中心 敬上</div>";
    }

    let tempHTML = '';

    tempHTML += "<table style='border:1px solid #b1b1b1; margin-top:10px;'>\
                    <tr>\
                        <th style='background-color:#ffedb9;border:1px solid #b1b1b1'>班期名稱</th>\
                        <td style='background-color:white;border:1px solid #b1b1b1'>"+dataArr[index].classname+"-第"+dataArr[index].term+"期問卷</td>\
                    </tr>\
                    <tr>\
                        <th style='background-color:#ffedb9;border:1px solid #b1b1b1'>訓期</th>\
                        <td style='background-color:white;border:1px solid #b1b1b1'>"+dataArr[index].start_date1.substring(0 , 10)+"~"+dataArr[index].end_date1.substring(0, 10)+"</td>\
                    </tr>\
                    <tr>\
                        <th style='background-color:#ffedb9;border:1px solid #b1b1b1'>承辦人</th>\
                        <td style='background-color:white;border:1px solid #b1b1b1'>"+dataArr[index].worker+"</td>\
                    </tr>\
                    <tr>\
                        <th style='background-color:#ffedb9;border:1px solid #b1b1b1'>填報起訖日</th>\
                        <td style='background-color:white;border:1px solid #b1b1b1'>"+dataArr[index].beginDatetime+" ~ "+dataArr[index].endDatetime+"</td>\
                    </tr>\
                    <tr>\
                        <td colspan='2' style='background-color:white'>"+head_text+"\
                        </td>\
                    </tr>\
                    <tr>\
                        <td colspan='2' style='background-color:white; color:red;'>\
                            <div>"+count_text+"</div>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td colspan='2' style='background-color:white'>\
                            <table style='background-color:white;border:1px solid #b1b1b1' width='100%'>";

                            for(let j=0; j<dataArr[index].detail.length; j++) {
                                if(params.cmid > 0){
                                    tempHTML += "<tr>\
                                                <td style='background-color:white;border:1px solid #b1b1b1' width='80%' class='q_td' onclick='openPop(\""+dataArr[index].anonymous+"\",\""+dataArr[index].cmid+"\",\""+dataArr[index].detail[j].cmfid+"\", \""+dataArr[index].idno+"\", \""+dataArr[index].sname+"\", \""+dataArr[index].year+"\", \""+dataArr[index].term+"\", \""+dataArr[index].class_no+"\")'>"+dataArr[index].detail[j].formname+"</td>\
                                            </tr>";
                                } else {
                                    tempHTML += "<tr>\
                                                <td style='background-color:white;border:1px solid #b1b1b1; text-decoration:underline;' width='80%' class='q_td' onclick='openPop(\""+dataArr[index].anonymous+"\",\""+dataArr[index].cmid+"\",\""+dataArr[index].detail[j].cmfid+"\", \""+dataArr[index].idno+"\", \""+dataArr[index].sname+"\", \""+dataArr[index].year+"\", \""+dataArr[index].term+"\", \""+dataArr[index].class_no+"\")'>"+dataArr[index].detail[j].formname+"</td>\
                                                <td style='background-color:white;border:1px solid #b1b1b1' width='20%'>未填報</td>\
                                            </tr>";
                                }
                                
                            }

    tempHTML +=             "</table>\
                        </td>\
                    </tr>";

    tempHTML += "</table>";

    $(".modal-body").html(tempHTML);

    $(".firstPop").modal("show");
}
