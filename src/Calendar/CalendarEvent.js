import styled from "styled-components";
import { FaRepeat } from "react-icons/fa6";
import { useContext } from "react";
import { ModalContext } from "./CalendarController";

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
export const Event = ({ id, name, time, isRecurrent, bgColor }) => {
    const displayModal = useContext(ModalContext);

    return (
        <>
        <EventBox onClick={() => displayModal(id)} bgColor={bgColor}>{name} - {time} {isRecurrent && <FaRepeat />}</EventBox>
        </>
    )
}

// (id) => displayModal(id)
