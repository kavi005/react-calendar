import moment from "moment";

export const getDaysInMonth = (monthMoment) => {
    const monthCopy = monthMoment.clone();
    monthCopy.startOf('month');

    let days = [];

    while (monthCopy.month() === monthMoment.month()) {
        days.push(monthCopy.clone());
        monthCopy.add(1, 'days');
    }

    return days;
}

export const segmentIntoWeeks = (dayMoments) => {
    let weeks = [];
    let currentWeek = [];

    for (let day of dayMoments) {
        currentWeek.push(day.clone());

        if (day.format('dddd') === 'Saturday') {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    }

    if (currentWeek.length > 0) {
        weeks.push(currentWeek);
    }

    return weeks;
}

export const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// export const monthOfTheYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const monthOfTheYear = {
        "January": "01", 
        "February": "02",
        "March":"03", 
        "April": "04", 
        "May": "05", 
        "June": "06", 
        "July": "07", 
        "August": "08", 
        "September": "09", 
        "October": "10", 
        "November": "11", 
        "December": "12"
    };

export const getYearsList = (currentYear) => {
    let yearList = [];

    let currentYearInt = parseInt(currentYear.toString());

    for (let i = currentYearInt - 10; i <= currentYearInt; i++) {
        yearList.push(i.toString());
    }
    for (let i = currentYearInt + 1; i < currentYearInt + 10; i++) {
        yearList.push(i.toString());
    }

    return yearList;
}

export const padWeekFront = (week, padWidth = null) => {
    return [...Array(7 - week.length).fill(padWidth), ...week];
}

export const padWeekBack = (week, padWidth = null) => {
    return [ ...week, ...Array(7 - week.length).fill(padWidth)];
}

export const getTimeAndMinute = (timeStamp) => {
    const startDateTime = timeStamp;
    const startTimeStamp = startDateTime.split('T');
    const timeInHourAndMinutes = startTimeStamp[1].split(':');

    return timeInHourAndMinutes;
}

export const formatDate = (date) => {
    let startDate = '';

    if (date) {
        const splitDateTiem = date.split('T');
        startDate = moment(splitDateTiem[0], 'YYYY-MM-DD').format('DD MMM YYYY');
    }

    return startDate;
}

export const formatDateTime = (date) => {
    let startDate = '';
    let startTime = '';

    if (date) {
        const splitDateTiem = date.split('T');
        startDate = moment(splitDateTiem[0], 'YYYY-MM-DD').format('DD MMM YYYY');
        startTime = moment(splitDateTiem[1], "HH:mm").format("hh:mm A");
    }

    return `${startDate} ${startTime}`;
}

export const getWeekDayName = (date) => {
    let weekDay = '';

    if (date) {
        const splitDateTiem = date.split('T');
        weekDay = moment(splitDateTiem[0], 'YYYY-MM-DD').format('dddd');
    }

    return weekDay.toString();
}