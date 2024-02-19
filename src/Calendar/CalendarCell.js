import styled from "styled-components";
import { Event } from './CalendarEvent';

const Cell = styled.div`
    border: 1px solid #eee;
    position: relative;
    height: 100%;

    /* &:hover {
        background-color: #eee;
    } */
`;

export const CalendarCell = ({ dateNumber = '', events = [] }) => {
    
    return (
        <Cell>
            { dateNumber }
            { events.map(event => <Event key={event.id} 
                id={event.id}
                name={event.name} 
                time={event.time}
                isRecurrent={event.isRecurrent}
                />)}
        </Cell>
    )
}