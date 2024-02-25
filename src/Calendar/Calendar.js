import moment from "moment";
import styled from 'styled-components';
import { getDaysInMonth, segmentIntoWeeks, daysOfTheWeek, padWeekFront, padWeekBack, monthOfTheYear, getYearsList } from "./CalendarUtil";
import { CalendarCell } from "./CalendarCell";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";

const CalendarControlsWrap = styled.div`
    height: 10%;
    align: center;
    margin: 15px;
`;
const TodayControl = styled.div`
    display: flex;
    flex-direction: row;
    align-content: start;
    margin-right: 20px;
`;
const NavigationControl = styled.div`
    display: flex;
    flex-direction: row;
    align-content: start;
`;
const CalendarControls = styled.div`
    display: flex;
    justify-content: center;
    margin: auto;
    width: 100%;
    // max-width: 400px;
    text-align: center;

    select {        
        margin: 0 2%;
        padding: 8px;
        font-size: large;
        font-weight: 800;
    }

    button {
        font-size: 16px;
        padding: 12px
    }
`;
const CalendarTableWrap = styled.div`
    width: 100%;
    height: 100%;
`;
const CalendarTable = styled.div`
    height: 85vh;
    display: flex;
    flex-direction: column;
    width: auto;
    padding: 0 8px 0 8px;   
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
    font-weight: 700;
`;
const CalendarCellWrap = styled.div`
    padding: 0px;
    flex: 1;
`;

export const Calendar = ({ month, year, onPrev, onNext, onDateChange, getCellProps }) => {
    const [selectedMonth, setSelectedMonth] = useState(month);
    const [selectedYear, setSelectedYear] = useState(year);

    let currentMonthMoment = moment(`${month}${year}`, 'MMYYYY');
    let weeks = segmentIntoWeeks(getDaysInMonth(currentMonthMoment));

    const monthsList = Object.keys(monthOfTheYear);
    let yearList = getYearsList(year);

    useEffect(() => {
        setSelectedMonth(currentMonthMoment.format('MMMM'));
        setSelectedYear(year);        
    }, [month, year]);

    const onMonthChange = (event) => {
        const selectedMonth = event.target.value;
        setSelectedMonth(selectedMonth);
        onDateChange(selectedMonth);        
    };

    const onYearChange = (event) => {
        const selectedYear = event.target.value;
        setSelectedYear(selectedYear);
        onDateChange(selectedYear);
    };

    const onToday = () => {
        onDateChange();
    }

    return (
        <>
        <CalendarTableWrap>
            <CalendarControlsWrap>
                <CalendarControls>
                    <TodayControl><button onClick={onToday}>Today</button></TodayControl>
                    <NavigationControl>
                        <button onClick={onPrev}><FaArrowLeft /></button>
                        <select value={selectedMonth} onChange={onMonthChange}>
                            {monthsList.map((month, i) => (
                                <option key={i} value={month}>{month}</option>
                            ))}
                        </select>
                        <select value={selectedYear} onChange={onYearChange}>
                            {yearList.map((year, j) => (
                                <option key={j} value={year}>{year}</option>
                            ))}
                        </select>                    
                        <button onClick={onNext}><FaArrowRight /></button>
                    </NavigationControl>
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
                                    <CalendarCellWrap>
                                        {dayMoment
                                        ? <CalendarCell key={ dayMoment.format('D') } 
                                            dateNumber={dayMoment.format('D')} 
                                            {...getCellProps(dayMoment)}>

                                          </CalendarCell>
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