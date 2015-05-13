var listData = [];

function addTodoPicture() {
    navigator.camera.getPicture(addTodo, function () {
        alert("Failed to get camera.");
    }, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        targetWidth: 100,
        targetHeight: 100
    });
}

function clickList(title) {

    document.getElementById("todo-handel").innerText = "修改屍團";
    document.getElementById("add-button").value = "修改";
    this.url = title;
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

}

function clickADD(title) {
    myCounter.setValue(99999);
    document.getElementById("todo-handel").innerText = "新增粉屍團";
    document.getElementById("add-button").value = listData.length;
    document.getElementById("todo-title").value = "";
    $("#qrcode").attr("src", "https://chart.googleapis.com/chart?chs=240x240&chld=H|1&cht=qr&chl=https://www.facebook.com/");
    $("#qrLogo").attr("src", "http://graph.facebook.com/picture?type=large");

}


function addTodo(camera_url) {
    clearInterval(refreshIntervalId);
    var title = $("#todo-title").val();
    var body = $("#todo-body").val();
    var img_tag = "";

    img_tag = "<img src='" + logo + "'>";
    document.getElementById("todo-handel").innerText = "Add New Fan Page";

    $.mobile.changePage($("#list-page"));
    $("#todo-list").append("<li>" + ' <a href="#add-page" data-transition="slide" onclick="clickList(listData[' + listData.length + '])">   <img src="' + logo + '"><h1>' + title + '</h1></p>' + body + '</a>' + "</p></li>")
    $("#todo-list").listview('refresh');
    listData[listData.length] = title;
};

i = 0;
logo = 0;
refreshIntervalId = 0;
var myCounter = {};
$(document).ready(function () {

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
    $("#todo-body").append()

};
