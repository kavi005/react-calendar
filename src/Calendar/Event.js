import styled from "styled-components";

const EventBox = styled.div`
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

export const Event = ({ name, time, onEventBoxClicked }) => {

    return (
        <EventBox >{name} - {time}</EventBox>
    )
}

/* onClick={() => onEventBoxClicked(
    dayMoment.format('DD'),
    dayMoment.format('MM'),
    dayMoment.format('YYYY')
)} */