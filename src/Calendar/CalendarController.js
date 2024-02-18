import moment from "moment";
import { useEffect, useState } from 'react';
import { Calendar } from "./Calendar";
import { Modal } from "../Modal/Modal";
import { NewEventForm } from "../Forms/NewEventForms";
import { getEventData } from "../Data/DataUtil";

export const CalendarController = () => {
        
    const today = moment();
    const [currentMonthMoment, setCurrentMonthMoment] = useState(today);
    const [events, setEvents] = useState([]);
    const [showNewEventModal, setShowNewEventModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);    

    useEffect(() => {       
        const eventData = getEventData();
        setEvents(eventData);
        console.log(eventData);
    }, []);

    const incrementMonth = () => {
        setCurrentMonthMoment(moment(currentMonthMoment.add(1, 'months')));        
    }

    const decrementMonth = () => {
        setCurrentMonthMoment(moment(currentMonthMoment.subtract(1, 'months')));
    }

    const createNewEvent = (name, time) => {
        setEvents(events.concat({ name, time, date: selectedDate }));
        console.log(events);
        setShowNewEventModal(false);
        setSelectedDate(null);
    }

    const displayModal = (date, month, year) => {
        setSelectedDate(moment(`${date}${month}${year}`, 'DDMMYYYY'));
        setShowNewEventModal(true);
    }    

    return (
        <>      
        <Modal shouldShow={showNewEventModal} onRequestClose={() => {
            setShowNewEventModal(false);
        }}>
            <h3>New Event for { selectedDate && selectedDate.format('MM/DD/YYYY') }</h3>
            <NewEventForm onSubmit={createNewEvent} />
        </Modal>

        <Calendar            
            getCellProps={(dayMoment) => {
                const  eventsForDay = events.filter(event => {
                    return event.date.isSame(dayMoment, 'day');
                });

                return { events: eventsForDay }
            }}
            onCellClicked={displayModal}
            month={currentMonthMoment.format('MM')}
            year={currentMonthMoment.format('YYYY')}
            onPrev={decrementMonth} 
            onNext={incrementMonth} 
        />
        </>
    )
}