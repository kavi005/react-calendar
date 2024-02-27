import styled from "styled-components";

const DayEventHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 10px 0 10px;
`;
const CloseButton = styled.button`
    background-color: cornflowerblue;
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    height: 30px;    
    margin-top: 15px;
    
    &:hover {
        background-color: #00509d;
    }
`;
export const EventHeader = ({currentWeekDay, currentDate, onClose}) => {

    return (
        <>        
        <DayEventHeader>
            <h3><i>{currentWeekDay}</i> {currentDate}</h3>
            <CloseButton onClick={onClose}>Close</CloseButton>
        </DayEventHeader>
        </>
    );
}