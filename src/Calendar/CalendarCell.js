import { useState } from "react";
import styled from "styled-components";
import { Event } from './CalendarEvent';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import Dialog from '@mui/material/Dialog';
import { EventPlot } from "./EventPlot/EventPlot";
import { DialogTitle, Modal } from "@mui/material";

const Cell = styled.div`
    border: 1px solid #eee;
    position: relative;
    height: 100%;
    font-size: small;
    font-weight: 700;

    /* &:hover {
        background-color: #eee;
    } */
`;
const DayMomentWrap = styled.div`
    display: flex;
    justify-content: space-between;
`;
const EventLink = styled.div`
    margin-right: 10px;
    cursor: pointer;

    &:hover {
        background-color: darkgrey;
    }
`;

export const CalendarCell = ({ dateNumber = '', events = [] }) => {

    const [open, setOpen] = useState(false);

    const eventsCount = events.length;
    const badgeLabel = eventsCount > 1 ? `${eventsCount} events` : `${eventsCount} event`;

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
    }
    
    return (
        <>
        <Dialog fullWidth maxWidth={"lg"} open={open} onClose={handleClickClose}>
            <EventPlot events={events} onClose={handleClickClose}/>
        </Dialog>
        <Cell>{(events.length > 0)
                ? <DayMomentWrap>{ dateNumber } <EventLink onClick={handleClickOpen}><label>{badgeLabel}</label> <FaArrowUpRightFromSquare /></EventLink></DayMomentWrap>
                : dateNumber} 
            
            { events.map(event => <Event key={event.id} 
                id={event.id}
                name={event.name} 
                time={event.time}
                isRecurrent={event.isRecurrent}
                bgColor={event.bgColor}
                />)}
        </Cell>
        </>
    )
}