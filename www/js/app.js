var saveMode = 0;
var listArray = [];
var nowListNumber = 0;

Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

var listData = {
    title: "sega",
    logo: "http://graph.facebook.com/sega/picture?type=large",
    //    qrocd: "https://chart.googleapis.com/chart?chs=240x240&chld=H|1&cht=qr&chl=https://www.facebook.com/sgea",
    body: "Final Fantasy"
};

listArray.push(listData);
/**
 * 移除清單
 *
 */

function deleteList() {
    listArray.remove(nowListNumber, nowListNumber);
    arrayToList();
    $("#todo-list").listview('refresh');
    $.mobile.changePage($("#list-page"));
}

/**
 *將listArray內的資料轉成ListView
 *
 */
function arrayToList() {
    $("#todo-list").empty();
    var i = 0;
    for (i = 0; i < listArray.length; i++) {
        $("#todo-list").append("<li>" + ' <a href="#add-page" data-transition="slide" onclick="clickList(' + i + ')"> <img src="' + listArray[i].logo + '">  <h1>' + listArray[i].title + '</h1></p>' + listArray[i].body + '</a>' + "</p></li>");
    }
    $("#todo-list").listview('refresh');


};
/**
 * 點擊清單
 *
 */
function clickList(arrayNumber) {
    //存擋模式改為=1=修改
    nowListNumber = arrayNumber;
    saveMode = 1;
    document.getElementById("todo-handel").innerText = "修改屍團";
    document.getElementById("add-button").value = "修改";
    this.url = listArray[arrayNumber].title;
    $("#qrcode").attr("src", "https://chart.googleapis.com/chart?chs=240x240&chld=H|1&cht=qr&chl=https://www.facebook.com/" + this.url);
    $("#qrLogo").attr("src", "http://graph.facebook.com/" + this.url + "/picture?type=large");
    document.getElementById("todo-title").value = this.url;


    $("#add-button").attr("value", "Save Chagne");
    logo = "http://graph.facebook.com/" + this.url + "/picture?type=large";
    jQuery.getJSON('http://graph.facebook.com/' + this.url, 'Likes', function (result) {
        document.getElementById("todo-body").value = result.likes + " 個人說讚";
        //            myCounter.setValue(result.likes);
        //        refreshIntervalId = setInterval(autoUpdata, 3000);
    });

};
/**
 * 點擊新增
 *
 */
function clickADD(title) {
        //存擋模式改為=0=新增

        saveMode = 0;
        myCounter.setValue(99999);
        document.getElementById("todo-handel").innerText = "新增粉屍團";
        document.getElementById("add-button").value = listArray.length;
        document.getElementById("todo-title").value = "";
        $("#qrcode").attr("src", "https://chart.googleapis.com/chart?chs=240x240&chld=H|1&cht=qr&chl=https://www.facebook.com/");
        $("#qrLogo").attr("src", "http://graph.facebook.com/picture?type=large");

    }
    /**
     * 新增清單
     *
     */
function addTodo(listArrayNumber) {
    //新增模式
    if (saveMode === 0) {

        //clearInterval(refreshIntervalId);
        var title = $("#todo-title").val();
        var body = $("#todo-body").val();
        //        var img_tag = "";

        //        img_tag = "<img src='" + logo + "'>";
        document.getElementById("todo-handel").innerText = "Add New Fan Page";

        $.mobile.changePage($("#list-page"));
        this.tempData = {};
        this.tempData.title = title;
        this.tempData.logo = logo;
        this.tempData.qrocd = logo;
        this.tempData.body = body;
        listArray.push(this.tempData);
        arrayToList();
        //        $("#todo-list").append("<li>" + ' <a href="#add-page" data-transition="slide" onclick="clickList(listArray[' + listArray.length + '])">   <img src="' + logo + '"><h1>' + title + '</h1></p>' + body + '</a>' + "</p></li>")



    }
    //編輯模式
    if (saveMode == 1) {
        //clearInterval(refreshIntervalId);
        var title = $("#todo-title").val();
        var body = $("#todo-body").val();
        //        var img_tag = "";

        //        img_tag = "<img src='" + logo + "'>";
        document.getElementById("todo-handel").innerText = "Add New Fan Page";

        $.mobile.changePage($("#list-page"));

        listArray[nowListNumber].title = title;
        listArray[nowListNumber].logo = logo;
        listArray[nowListNumber].qrocd = logo;
        listArray[nowListNumber].body = body;

        arrayToList();


    }

};

i = 0;
logo = 0;
refreshIntervalId = 0;
var myCounter = {};
$(document).ready(function () {
    arrayToList();

    function autoUpdata() {
        this.temp = 0;
        jQuery.getJSON('http://graph.facebook.com/' + $("#todo-title").val(), 'Likes', function (result) {
            this.temp = result.likes;
            myCounter.setValue(this.temp);
        });
    }

    myCounter = new flipCounter('flip-counter', {
        value: 10000,
        inc: 12,
        pace: 600,
        auto: false
    });

    var k = 10;
    $("#todo-title").keyup(function () {

        this.url = $("#todo-title").val();
        $("#qrcode").attr("src", "https://chart.googleapis.com/chart?chs=240x240&chld=H|1&cht=qr&chl=https://www.facebook.com/" + this.url);
        $("#qrLogo").attr("src", "http://graph.facebook.com/" + this.url + "/picture?type=large");
        logo = "http://graph.facebook.com/" + this.url + "/picture?type=large";
        jQuery.getJSON('http://graph.facebook.com/' + this.url, 'Likes', function (result) {
            document.getElementById("todo-body").value = result.likes + " 個人說讚";
            myCounter.setValue(result.likes);
            refreshIntervalId = setInterval(autoUpdata, 3000);
        });

    });
});

function makeQrCode(camera_url) {
    $("#todo-body").append();

};

//function addTodoPicture() {
//    navigator.camera.getPicture(addTodo, function () {
//        alert("Failed to get camera.");
//    }, {
//        quality: 50,
//        destinationType: Camera.DestinationType.FILE_URI,
//        targetWidth: 100,
//        targetHeight: 100
//    });
//}
