import Chart from 'react-google-charts';
import { getEventDetailsByEventId } from '../../Data/DataUtil';
import { formatDate, getTimeAndMinute, getWeekDayName } from '../CalendarUtil';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../CalendarController';
import { EventHeader } from './EventHeader';

const EventPlotWrapper = styled.div`
    margin: 0 15px 15px 15px;
`;

export const EventPlot = ({events, onClose}) => {
    const [currentDate, setCurrentDate] = useState('');
    const [currentWeekDay, setCurrentWeekDay] = useState('');

    const displayModal = useContext(ModalContext);

    useEffect(() => {
        const eventNode = getEventDetailsByEventId(events[0].id);
        const weekDayName = getWeekDayName(eventNode.eventStartTimestamp);
        setCurrentWeekDay(weekDayName);

        const currentFormattedDate = formatDate(eventNode.eventStartTimestamp);
        console.log(weekDayName, currentFormattedDate);
        setCurrentDate(currentFormattedDate);
    }, []);

    const chartData = [[
        { type: "string", id: "DisplayName" },
        { type: "string", id: "Name" },
        { type: "date", id: "Start" },
        { type: "date", id: "End" },
      ]];
    
    for(let i = 0; i < events.length; i++) {

        let chartNodeData = [];
        const eventNode = getEventDetailsByEventId(events[i].id);

        // chartNodeData.push(events[i].id);
        chartNodeData.push(eventNode.displayName);
        chartNodeData.push(eventNode.name);
        
        // start time
        let time = getTimeAndMinute(eventNode.eventStartTimestamp);
        chartNodeData.push(new Date(0, 0, 0, time[0], time[1], 0));

        // end time
        time = getTimeAndMinute(eventNode.eventEndTimestamp);        
        chartNodeData.push(new Date(0, 0, 0, time[0], time[1], 0));

        chartData.push(chartNodeData);
    }

    const chartEvents = [
        {
            eventName: "select",
                callback: ({ chartWrapper, google }) => {
                    var selection = chartWrapper.getChart().getSelection();
                    
                    const selectedRowNumber = selection[0]["row"];
                    const selectedEventId = events[selectedRowNumber].id;
                    displayModal(selectedEventId);          
                }        
        }
    ];

    return (
        <>            
        <EventPlotWrapper>            
            <EventHeader currentWeekDay={currentWeekDay} currentDate={currentDate} onClose={onClose} />
            <Chart
                chartType="Timeline"
                data={chartData}
                width="100%"
                height="500px"
                options={{
                    colors: ["#0C134F", "#5C469C", "#1D267D"],
                    enableInteractivity: true
                }}
                chartEvents={chartEvents}
            />     
        </EventPlotWrapper>
        </>
    );
}