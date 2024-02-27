/*
    * Hard coded data *
*/
import { eventsData } from "./EventsData";
import {eventsDataRec } from "./EventsDataRec";
import moment from "moment";
import parser from "cron-parser";

export const getEventData = () => {

    let eventDataList = [];
    for (let i = 0; i < eventsData.length; i++) {        
        const eventStartTimestamp = eventsData[i]["eventStartTimestamp"];
    
        if(eventStartTimestamp) {
            const startDateTime = eventStartTimestamp.split('T');
            const startDate = moment(startDateTime[0], 'YYYY-MM-DD');
            const startTime = moment(startDateTime[1], "HH:mm").format("hh:mm A");
            eventDataList.push({ id: eventsData[i].id, 
                name: eventsData[i].displayName, 
                time: startTime, 
                date: startDate,
                isRecurrent: eventsData[i].isRecurringEvent,
                bgColor: eventsData[i].color
            });
        }        
    }

    return eventDataList;
}

export const getRecurrentEventData = () => {
    let eventDataList = [];

    for (let i = 0; i < eventsDataRec.length; i++) { 
        
        const record = eventsDataRec[i];
        // console.log(record);
        if (record.isRecurringEvent && record.iteration) {

            const parentId = record.parent;
            const recParent = eventsDataRec.find(ev => ev.id.toString() === parentId);
            const cronJob = recParent.schedule;


            const options = {
                currentDate: new Date(getDateFromDateTimeString(recParent.startDate)),
                startDate: new Date(getDateFromDateTimeString(recParent.startDate)),
                endDate: new Date(getDateFromDateTimeString(recParent.endDate)),
                iterator: true
            }         
            
            try {
                const interval = parser.parseExpression(cronJob, options);
                
                let nextJob = interval.next();   
                while (!nextJob.done) {                  
                    
                    const cronDate = createMomentDateFromCronDate(nextJob.value);
                    // console.log(cronDate);

                    eventDataList.push({ id: record.id, 
                        name: record.displayName, 
                        time: moment(getTimeFromDateTimeString(record.eventStartTimestamp), "HH:mm").format("hh:mm A"), 
                        date: cronDate,
                        isRecurrent: record.isRecurringEvent,
                        bgColor: record.color
                    });          

                    nextJob = interval.next();
                }              
                
            } catch (err) {
                console.log('Error: ' + err.message);
            }
        }
    }

    return eventDataList;
}

export const getAllPropertiesOfEvent = () => {
    
    let eventDataList = [];
    for (let i = 0; i < eventsData.length; i++) {        
        const eventStartTimestamp = eventsData[i]["eventStartTimestamp"];
    
        if(eventStartTimestamp) {            
            eventDataList.push(eventsData[i]);
        }        
    }

    return eventDataList;
}

export const getAllPropertiesOfSelectedEvents = (events) => {
    const filteredList = eventsData.filter(ev => events.indexOf(ev.id) !== -1);

    return filteredList;
}

export const getEventDetailsByEventId = (eventId) => {
    return eventsData.find(ev => ev.id === eventId);
}

export const getDateFromDateTimeString = (dateTimeString) => {
    const dateStrArr = dateTimeString.split('T');
    return dateStrArr[0];
}

export const getTimeFromDateTimeString = (dateTimeString) => {
    const dateStrArr = dateTimeString.split('T');
    return dateStrArr[1];
}

export const createMomentDateFromCronDate = (cronDate) => {
    const { c } = cronDate._date;
    const month = c.month === 0 ? 0 : c.month - 1;
    const jsDt = new Date(c.year, c.month - 1, c.day);
    // const momentDate = moment().year(year).month(month).day(day);
    const momentDate = moment(jsDt);

    return momentDate;
}