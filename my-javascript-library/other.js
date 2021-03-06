/**
 * 得到从某天起7天内的星期排列数组
 * @param  {Date} date 某天的date对象（默认为当天）
 * @return {Array}     如["周三", "周四", "周五", "周六", "周日", "周一", "周二"]
 */
function getWeekSort(date) {
    var oneDate = date || new Date(),
        day = oneDate.getDay(),
        weekday = day === 0? 7: day,
        week = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        newWeek = week.slice(weekday - 1);
    return newWeek.concat(week.slice(0, weekday - 1));
}

/**
 * 得到某天在一周中的顺序位置，一周以周一开头，周日排第7
 * @param  {String} weekday 一周中的某天，如周一
 * @return {Number}         如1
 */
function getWeekDay(weekday) {
    var week = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
    return week.indexOf(weekday) + 1;
}

/**
 * 得到从某天起7天内的日期排列数组
 * @param  {Date} date 某天的date对象（默认为当天）
 * @return {Array}     如["2016-11-27", "2016-11-28"······]
 */
function getWeekDateSort(date) {
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

/**
 * 将一段字符串的时间区间转化为以一个小时为单位的数组，多个时间段则需要传入隔开符参数
 * @param  {String} hourStr  一段字符串的时间区间，如"8:00-12:00"
 * @param  {String} blockStr 多个时间段的隔开符，默认为","
 * @return {Array}           以一个小时为单位的数组["8:00-9:00", "9:00-10:00"···]
 */
function getHourSort(hourStr, blockStr) {
    var block = blockStr || ",",
        hourArr = hourStr.split(block),
        hourArrLen = hourArr.length,
        hourPoint = [];
    for(var i = 0; i < hourArrLen; i++) {
        var hourA = hourArr[i].split("-"),
            hourB = parseInt(hourA[0].slice(0, 2)),
            hourC = parseInt(hourA[1].slice(0, 2)),
            hourLong = hourC - hourB; // 时钟的跨度
        for(var j = 0; j < hourLong; j++) {
            if(hourB + j < hourC) {
                hourPoint.push(hourB + j + ":00-" + (hourB + j + 1) + ":00");
            }
        }
    }
    return hourPoint;
}

/**
 * 根据位置索引信息将保存单个小时的数组中连接为一段时间区间
 * @param  {Array} timeArr      保存单个小时的数组，如["8:00-9:00","9:00-10:00"···]
 * @param  {Array} indexArr     保存位置索引信息的数组，如[0,1]
 * @return {String}             保存一段时间区间的字符串，如"8:00-10:00"
 */
function getHourSectionSort(timeArr, indexArr) {
    return timeArr[indexArr[0]].split("-")[0] + "-" +
           timeArr[indexArr[indexArr.length - 1]].split("-")[1];
}

/**
 * 归类整理一个数组的相同元素值的所有位置信息
 * @param  {Array} arr  任意一个数组，元素一般为字符串或者数字，如[1,2,1,2]
 * @return {Array}      整理后保存位置信息的数组，如[{value:1,index:[0,2]},{value:2,index:[1,3]}]
 */
function getSameValueSort(arr) {
    var k = 0,n = 0,
        newArr = [
            {
                value: arr[0],
                index: []
            }
        ];
    for(var i = 0; i < arr.length; i++) {
        if (arr[i] === newArr[0].value) {
            newArr[0].index.push(i);
        }else{
            k = newArr.length;
            while(n < k) {
                if(newArr[n].value !== arr[i]) {
                    n++;
                    if(n === k) {
                        newArr.push({index: []});
                        newArr[k].value = arr[i];
                        newArr[k].index.push(i);
                        n = 0;
                        break;
                    }
                    n--;
                }else if(newArr[n].value === arr[i]){
                    newArr[n].index.push(i);
                    n = 0;
                    break;
                }
                n++;
            }
        }
    }
    return newArr;
}

/**
 * 归类比较整理两个数组的元素对应位置从头至尾两两不同的位置信息
 * @param  {Array} arr1    第一个数组，如[10,10,20,20,20,30,30,30]
 * @param  {Array} arr2    第二个数组，如[20,30,30,40,40,80,80,80]
 * @return {Array}      整理后保存位置信息的数组，如[0,1,2,[3,4],[5,6,7]]
 */
function getDiffValueSort(arr1, arr2) {
    var newArr = [],
        j;
    for(var i = 0; i < arr1.length; i++) {
        if(arr1[i] === arr1[i + 1]) {
            if(arr2[i] === arr2[i + 1]) {
                if(j === i) {
                    newArr[newArr.length-1].push(j + 1);
                    j = i + 1;
                }else{
                    j = i + 1;
                    newArr.push([i, j]);
                }
            }else{
                if(j === i) {
                    continue;
                }
                newArr.push(i);
            }
        }else{
            if(j === i) {
                continue;
            }
            newArr.push(i);
        }
    }
    return newArr;
}

/**
 * 获取当前url指定查询字段的值，没有则返回null
 * @param  {String} name 查询字段名
 * @return {String}      查询字段的值
 */
function getUrlParam(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
        r = location.search.substr(1).match(reg);
    return r? decodeURI(r[2]): null;
}

/**
 * 计算结束时间，不会超过同一天
 * @param  {Float}  timeLong  时长，比如一个半小时为1.5
 * @param  {String} timeBegin 开始时间
 * @return {String}           结束时间
 */
function calTimeEnd(timeLong, timeBegin) {
    var timeLongStr = timeLong.toString(), // 转化为字符串，判断是否有小数位
        time = timeBegin.split(":"),
        hour = parseInt(time[0]), // 开始时间的小时数
        minutes = parseInt(time[1]), // 开始时间的分钟数
        longHour = 0, // 需要增加的小时数
        longMinutes = 0; // 需要增加的分钟数

    // 如果时长有小数位
    if(timeLongStr.indexOf(".") !== -1) {
        var min = timeLongStr.split(".")[1],
            minLen = min.length;
        longHour = parseInt(timeLong);
        longMinutes = parseInt(min) / Math.pow(10, minLen) * 60;
    }else{ // 如果时长为整数
        longHour = timeLong;
    }

    // 分钟数相加后>=60，小时数+1，分钟数-60
    if(minutes + longMinutes >= 60) {
        hour++;
        minutes = minutes + longMinutes - 60;
    }else{ // 不超过60，直接相加
        minutes = minutes + longMinutes;
    }

    // 得到结束时间
    hour += longHour;
    if (minutes === 0) { // 避免分钟显示0
        minutes = "00";
    }
    return hour + ":" + minutes;
}