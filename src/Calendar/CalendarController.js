import moment from "moment";
import { createContext, useContext, useEffect, useState } from 'react';
import { Calendar } from "./Calendar";
// import { MyModal } from "../Modal/MyModal";
import { NewEventForm } from "../Forms/DisplayEventForms";
import { getAllPropertiesOfEvent, getEventData, getRecurrentEventData } from "../Data/DataUtil";
import { UserSessionContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@mui/material";
import { EventHeader } from "./EventPlot/EventHeader";
import { getWeekDayName } from "./CalendarUtil";
import styled from "styled-components";

const EventWrapper = styled.div`
    margin: 0 15px 15px 15px;
`;

export const ModalContext = createContext();


export const CalendarController = () => {
        
    const today = moment();
    const [currentMonthMoment, setCurrentMonthMoment] = useState(today);
    const [events, setEvents] = useState([]);
    const [showNewEventModal, setShowNewEventModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null); 
    const [weekDayName, setWeekDayName] = useState(''); 

    const [selectedEvent, setSelectedEvent] = useState(null);    

    const userSessionContext = useContext(UserSessionContext);
    const navigate = useNavigate();
    
    useEffect(() => {       
        const token = localStorage.getItem('user');
        if(!token) {            
            navigate("/login");          
        }
        // const eventData = getEventData();
        const eventData = getRecurrentEventData();
        // const eventDataRec = getRecurrentEventData();
        
        setEvents(eventData);
    }, [userSessionContext]);

    const incrementMonth = () => {
        setCurrentMonthMoment(moment(currentMonthMoment.add(1, 'months')));        
    }

    const decrementMonth = () => {
        setCurrentMonthMoment(moment(currentMonthMoment.subtract(1, 'months')));
    }

    const onDateChange = (event) => {
        if (!event) {
            setCurrentMonthMoment(today);
        } else if (isNaN(parseInt(event))) {
            setCurrentMonthMoment(moment(currentMonthMoment.month(event)));
        } else {
            setCurrentMonthMoment(moment(currentMonthMoment.year(event)));
        }
    }
    /* const createNewEvent = (name, time) => {
        setEvents(events.concat({ name, time, date: selectedDate }));
        setShowNewEventModal(false);
        setSelectedDate(null);
    } */

    /* const displayModal = (date, month, year) => {
        setSelectedDate(moment(`${date}${month}${year}`, 'DDMMYYYY'));
        setShowNewEventModal(true);
    } */   

    const displayModal = (eventId) => {
        
        const selectedEvent = getAllPropertiesOfEvent().filter(ev => { return ev.id === eventId});
        console.log(selectedEvent);
        const currEvent = events.filter(ev => ev.id === eventId);
        setWeekDayName(getWeekDayName(selectedEvent[0].eventStartTimestamp));
        setSelectedDate(moment(currEvent[0].date, 'YYYY-MM-DD'));
        setSelectedEvent(selectedEvent);
        setShowNewEventModal(true);
    } 

    return (
        <>      
        {/* <MyModal shouldShow={showNewEventModal} onRequestClose={() => {
            setShowNewEventModal(false);
        }}>
            <h3><i>Event details - </i> { selectedDate && selectedDate.format('DD MMM YYYY') } </h3>
            <NewEventForm selectedEvent={selectedEvent} />
        </MyModal> */}

        <Dialog fullWidth maxWidth={"sm"} open={showNewEventModal} onClose={() => {
            setShowNewEventModal(false);
        }}>  
            <EventHeader 
                currentWeekDay={weekDayName} 
                currentDate={selectedDate && selectedDate.format('DD MMM YYYY')} 
                onClose={() => setShowNewEventModal(false)} />   
            
            <EventWrapper>
                <NewEventForm selectedEvent={selectedEvent} />
            </EventWrapper>  
                      
        </Dialog>

        <ModalContext.Provider value={displayModal}>        
            <Calendar            
                getCellProps={(dayMoment) => {
                    const  eventsForDay = events.filter(event => {
                        return event.date.isSame(dayMoment, 'day');
                    });
                    return { events: eventsForDay }
                }}
                /* onCellClicked={displayModal} */
                month={currentMonthMoment.format('MM')}
                year={currentMonthMoment.format('YYYY')}
                onPrev={decrementMonth} 
                onNext={incrementMonth} 
                onDateChange={onDateChange}
            />
        </ModalContext.Provider>
        </>
    )
}