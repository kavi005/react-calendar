/*
    * Hard coded data *
*/
import { eventsData } from "./EventsData";
import moment from "moment";

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