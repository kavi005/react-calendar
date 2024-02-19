import moment from "moment";
import { createContext, useContext, useEffect, useState } from 'react';
import { Calendar } from "./Calendar";
import { Modal } from "../Modal/Modal";
import { NewEventForm } from "../Forms/DisplayEventForms";
import { getAllPropertiesOfEvent, getEventData } from "../Data/DataUtil";
import { UserSessionContext } from "../App";
import { useNavigate } from "react-router-dom";


export const ModalContext = createContext();

export const CalendarController = () => {
        
    const today = moment();
    const [currentMonthMoment, setCurrentMonthMoment] = useState(today);
    const [events, setEvents] = useState([]);
    const [showNewEventModal, setShowNewEventModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null); 

    const [selectedEvent, setSelectedEvent] = useState(null);    

    const userSessionContext = useContext(UserSessionContext);
    const navigate = useNavigate();
    
    useEffect(() => {       
        const token = localStorage.getItem('user');
        if(!token) {            
            navigate("/login");          
        }
        const eventData = getEventData();
        setEvents(eventData);
    }, [userSessionContext]);

    const incrementMonth = () => {
        setCurrentMonthMoment(moment(currentMonthMoment.add(1, 'months')));        
    }

    const decrementMonth = () => {
        setCurrentMonthMoment(moment(currentMonthMoment.subtract(1, 'months')));
    }

    /* const createNewEvent = (name, time) => {
        setEvents(events.concat({ name, time, date: selectedDate }));
        console.log(events);
        setShowNewEventModal(false);
        setSelectedDate(null);
    } */

    /* const displayModal = (date, month, year) => {
        setSelectedDate(moment(`${date}${month}${year}`, 'DDMMYYYY'));
        setShowNewEventModal(true);
    }  */   

    const displayModal = (eventId) => {
        
        const selectedEvent = getAllPropertiesOfEvent().filter(ev => { return ev.id === eventId});
        const currEvent = events.filter(ev => ev.id === eventId);
        console.log(currEvent[0].date);
        setSelectedDate(moment(currEvent[0].date, 'YYYY-MM-DD'));
        setSelectedEvent(selectedEvent);
        setShowNewEventModal(true);
    } 

    return (
        <>      
        <Modal shouldShow={showNewEventModal} onRequestClose={() => {
            setShowNewEventModal(false);
        }}>
            <h3><i>Event details - </i> { selectedDate && selectedDate.format('DD MMM YYYY') } </h3>
            <NewEventForm selectedEvent={selectedEvent} />
        </Modal>

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
            />
        </ModalContext.Provider>
        </>
    )
}