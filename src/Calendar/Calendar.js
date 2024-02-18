import moment from "moment";
import styled from 'styled-components';
import { getDaysInMonth, segmentIntoWeeks, daysOfTheWeek, padWeekFront, padWeekBack } from "./util";
import { CalendarCell } from "./CalendarCell";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const CalendarControlsWrap = styled.div`
    height: 15%;
    align: center;
    margin: 20px;
`;
const CalendarControls = styled.div`
    margin: auto;
    max-width: 400px;
    text-align: center;

    button {
        width: 45%;
        margin: 0 2%;
    }
`;
const CalendarTableWrap = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
`;
const CalendarTable = styled.div`
    height: 85%;
    display: flex;
    flex-direction: column;
    width: 100%
`;
const CalendarRow = styled.div`
    display: flex;
    flex: 1;
`;
const CalendarHeading = styled.div`
    display: flex;
    flex-direction: row;
`;
const CalendarHeadingCell = styled.div`
    flex: 1;
    text-align: center;
`;
const CalendarCellWrap = styled.div`
    padding: 0px;
    flex: 1;
`;

export const Calendar = ({ month, year, onPrev, onNext, onCellClicked, getCellProps }) => {
    const currentMonthMoment = moment(`${month}${year}`, 'MMYYYY');
    const weeks = segmentIntoWeeks(getDaysInMonth(currentMonthMoment));    

    return (
        <>
        <CalendarTableWrap>
            <CalendarControlsWrap>
                <CalendarControls>
                    <h1>{ currentMonthMoment.format('MMMM YYYY') }</h1>
                    <button onClick={onPrev}><GoArrowLeft /> Previous</button>
                    <button onClick={onNext}>Next <GoArrowRight /></button>
                </CalendarControls>                
            </CalendarControlsWrap>

            <CalendarTable>
            
                <CalendarHeading>
                    { daysOfTheWeek.map(day => <CalendarHeadingCell key={day}>{day}</CalendarHeadingCell>) }
                </CalendarHeading>
                
                {weeks.map((week, i) => {
                    const displayWeek = i === 0
                        ? padWeekFront(week)
                        : i === weeks.length - 1
                            ? padWeekBack(week)
                            : week;
                    return (
                        <CalendarRow key={i}>
                            { displayWeek.map((dayMoment, j) => {
                                
                                return (
                                    <CalendarCellWrap onClick={() => onCellClicked(
                                        dayMoment.format('DD'),
                                        dayMoment.format('MM'),
                                        dayMoment.format('YYYY')
                                    )}>
                                        {dayMoment
                                        ? <CalendarCell key={ dayMoment.format('D') } dateNumber={dayMoment.format('D')} {...getCellProps(dayMoment)}></CalendarCell>
                                        : <CalendarCell key={`${i}${j}`}></CalendarCell>}
                                    </CalendarCellWrap>
                                )
                            })}
                        </CalendarRow>
                    );
                })}                    
            
            </CalendarTable>
        </CalendarTableWrap>
        </>
    );
}