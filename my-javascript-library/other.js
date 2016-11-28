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