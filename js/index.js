var tocontent = () => {
    $('.main-1').addClass('animated bounceOutRight slow');
    document.getElementsByClassName("main-2")[0].style.display = "block";
    $('.main-2').addClass('animated fadeIn fast delay-1s');
    $("#autoprint").autoprint();
    setTimeout(() => document.getElementById("music").play(), 8500)
    setInterval(() => updateTime(2018, 9, 1), 500)
}
var updateTime = (year, month, day) => {
    // 更新日期的
    var dateNow = new Date();
    var dateJNR = new Date(year, month - 1, day);
    var d = parseInt((dateNow - dateJNR) / (24 * 3600 * 1000));
    var hour = parseInt(((dateNow - dateJNR) / (3600 * 1000)) % 24);
    var minute = parseInt((dateNow - dateJNR) / (1000 * 60) % 60);
    var second = parseInt((dateNow - dateJNR) / 1000 % 60);
    $(".date").html("我们已经一起走过了 <span>" + d + "</span> 天 <span>" + hour + "</span> 小时 <span>" + minute + "</span> 分钟 <span>" + second + "</span> 秒 <span>")
};
$.fn.autoprint = function () {
    var _this = $(this);
    var str = _this.html();
    // 正则替换代码行之间添加的多个空格，不去除换行输出会有明显的停顿：实际是在输出多个空格
    str = str.replace(/(\s){2,}/g, "$1");
    var index = 0;
    $(this).html('');
    var timer = function fn() {
        var args = arguments;
        var current = str.slice(index, index + 1);
        // html标签完整输出,如：<p>
        if (current == '<') {
            index = str.indexOf('>', index) + 1;
        }
        else {
            index++;
        }
        //位运算符: 根据setInterval运行奇偶次来判断是否加入下划线字符“_”，使输入效果更逼真
        if (index < str.length - 1) { //打印字符倒数第2个字符开始，不加下划线字符，以防止结束符可能会多输出一下划线字符
            _this.html(str.substring(0, index) + (index & 1 ? '_' : ''));
        } else {
            _this.html(str.substring(0, index));
            clearTimeout(timer);
        };
        setTimeout(fn, 200)
    };
    // 延迟1s开始
    setTimeout(timer, 1000);
}
