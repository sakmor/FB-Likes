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

function addTodo(camera_url) {
    clearInterval(refreshIntervalId);
    var title = $("#todo-title").val();
    var body = $("#todo-body").val();
    var img_tag = "";

    img_tag = "<img src='" + logo + "'>";

    $.mobile.changePage($("#list-page"));
    $("#todo-list").append("<li>" + img_tag + "<h3>" + title + "</h3><p>" + body + "</p></li>")
    $("#todo-list").listview('refresh');
};

i = 0;
logo = 0;
refreshIntervalId = 0;
$(document).ready(function () {

    function autoUpdata() {
        this.temp = 0;
        jQuery.getJSON('http://graph.facebook.com/' + $("#todo-title").val(), 'Likes', function (result) {
            this.temp = result.likes;
            myCounter.setValue(this.temp);
        });
    }

    var myCounter = new flipCounter('flip-counter', {
        value: 10000,
        inc: 12,
        pace: 600,
        auto: false
    });

    var k = 10;
    $("#todo-title").keyup(function () {

        this.url = $("#todo-title").val();
        $("#qrcode").attr("src", "https://chart.googleapis.com/chart?cht=qr&chs=240x240&chld=h&chl=https://www.facebook.com/" + this.url);
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
