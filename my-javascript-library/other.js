/**
 * 得到从某天（默认为当天）起7天内的汉语日历日数组
 * @param  {Number} weekday 某天的日历日（周日为7）
 * @return {Array}     如["周三", "周四", "周五", "周六", "周日", "周一", "周二"]
 */
function getWeekdaySort(weekday) {
    var today = new Date(),
        todayD = today.getDay(),
        day = weekday || (todayD === 0? 7: todayD),
        date = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        newDate = date.slice(day - 1);
    return newDate.concat(date.slice(0, day - 1));
}

/**
 * 得到从某天（默认为当天）起7内的日期数组
 * @param  {Date} date 某天的date日期对象
 * @return {Array} 如["2016-11-27", "2016-11-28"······]
 */
function getWeekdateSort(date) {
    var nowDate = date || new Date(),
        year = nowDate.getFullYear(),
        month = nowDate.getMonth(),
        day = nowDate.getDate(),
        weekDate = [];
    for(var i = 0; i < 7; i++) {
        var nextDate = new Date(year, month, day + i), // 每次循环，获取下一天的时间
            y = nextDate.getFullYear(),
            m = nextDate.getMonth() + 1,
            d = nextDate.getDate();
        m = (m < 10? ("0" + m): m); // 7月=07月
        d = (d < 10? ("0" + d): d); // 7日=07日
        weekDate.push(y + "-" + m + "-" + d);
    }
    return weekDate;
}