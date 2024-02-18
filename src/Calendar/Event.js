import styled from "styled-components";
import { FaRepeat } from "react-icons/fa6";

const EventBox = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        // background-color: ${(props) => (props.bgColor)};
        background-color: black;
        border-radius: 4px;
        color: white;
        padding: 6px;
        margin-bottom: 4px;
        cursor: pointer;
        font-size: small;
        font-weight: 500;

        &:hover {
            background-color: #50577A;
        }
    `;
export const Event = ({ name, time, isRecurrent, bgColor, onEventBoxClicked }) => {
    
    return (
        <EventBox bgColor={bgColor}>{name} - {time} {isRecurrent && <FaRepeat />}</EventBox>
    )
}

/* onClick={() => onEventBoxClicked(
    dayMoment.format('DD'),
    dayMoment.format('MM'),
    dayMoment.format('YYYY')
)} */