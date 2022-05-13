// 工具函数库

export function formatDate(time) {
    var data = new Date(parseInt(time));
    var year = data.getFullYear();
    var month = data.getMonth() + 1;
    var day = data.getDate();

    var hour = data.getHours();
    var minute = data.getMinutes();
    var seconds = data.getSeconds();

    var weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var week = weekArr[data.getDay()];

    if (month >= 1 && month <= 9) {
        month = '0' + month;
    }
    if (day >= 0 && day <= 9) {
        day = '0' + day;
    }
    if (hour >= 0 && hour <= 9) {
        hour = '0' + hour;
    }
    if (minute >= 0 && minute <= 9) {
        minute = '0' + minute;
    }
    if (seconds >= 0 && seconds <= 9) {
        seconds = '0' + seconds;
    }

    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + seconds + ' ' + week
}
