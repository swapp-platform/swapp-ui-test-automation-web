

export function getDate(
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
    second : number
): Date {
    //var currentDate = new Date();
    //if(!year && ! month && !day && !hour && !minute && !second){
    //    return currentDate;
    //}

    //const currentHour = currentDate.getHours();
    //const isOutsideWorkingHours = currentHour < 7 ||currentHour >= 18;
//
    //if(isOutsideWorkingHours){
    //    currentDate.setDate(currentDate.getDate()+1);
    //    currentDate.setHours(14);
    //    currentDate.setMinutes(0);
    //    currentDate.setSeconds(0);
//
    //}
    
    //if(year) currentDate.setFullYear(year);
    //if(month) currentDate.setMonth(month-1);
    //if(day) currentDate.setDate(day);
    //if(hour) currentDate.setUTCHours(hour);
    //if(minute) currentDate.setMinutes(minute);
    //if(second) currentDate.setSeconds(second);
    
    const date: Date = new Date(year, month-1, day, hour+1, minute, second);

    console.log("CURRENT_DATE");
    console.log(date);
    return date;

}

export function daysBetweenDates(startDateTime: Date, endDateTime: Date): number {
    // Convert both dates to milliseconds
    const date1Ms = startDateTime.getTime();
    const date2Ms = endDateTime.getTime();

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date2Ms - date1Ms);

    // Convert milliseconds to days (1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    const daysDifference = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

    return daysDifference;
}

function getDayName(date: Date): string {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = date.getDay();
    return dayNames[dayIndex];
}

function getMonthName(date: Date): string {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthIndex = date.getMonth();
    return monthNames[monthIndex];
}


export function getFormattedDateAsString(date: Date): string{
    let returnString = "";
    const dayName = getDayName(date).substring(0, 3);
    const monthName = getMonthName(date).substring(0, 3);
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes().toString();

    //.toEqual("Fri, Mar 22,\n 14:00");

    returnString = `${dayName}, ${monthName} ${date.getDate()}, \n ${date.getHours()-1}:${minutes}`;
    console.log("RETURNSTRING");
    console.log(returnString);
    return returnString;

}
