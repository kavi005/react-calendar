import moment from "moment";

export const NewEventForm = ({selectedEvent}) => {
    const se = selectedEvent[0];

    const formatDate = (date) => {
        let startDate = '';
        let startTime = '';

        if (date) {
            const splitDateTiem = date.split('T');
            startDate = moment(splitDateTiem[0], 'YYYY-MM-DD').format('DD MMM YYYY');
            startTime = moment(splitDateTiem[1], "HH:mm").format("hh:mm A");
        }

        return `${startDate} ${startTime}`;
    }

    return (
        <>
        <table>
            <tr>
                <td><label className="detailhead">Display name:</label></td>
                <td><label className="detailhead">{se.displayName}</label></td>                            
            </tr>
            <tr>
                <td><label className="detailhead">Event name:</label></td>
                <td><label>{se.name}</label></td>  
            </tr>
            <tr>
                <td><label className="detailhead">Start date:</label></td>
                <td><label>{formatDate(se.eventStartTimestamp)}</label></td>  
            </tr>
            <tr>
                <td><label className="detailhead">End date:</label></td>
                <td><label>{formatDate(se.eventEndTimestamp)}</label></td>  
            </tr>
            <tr>
                <td><label className="detailhead">Description:</label></td>
                <td><label>{se.description}</label></td>  
            </tr>
            <tr>
                <td><label className="detailhead">Recurrent:</label></td>
                <td><label>{se.isRecurringEvent ? "True" : "False"}</label></td>  
            </tr>
            <tr>
                <td><label className="detailhead">Cooldown duration:</label></td>
                <td><label>{se.cooldownDuration}</label></td>  
            </tr>
            <tr>
                <td><label className="detailhead">Created by:</label></td>
                <td><label>{se.createdBy}</label></td>  
            </tr>
            <tr>
                <td><label className="detailhead">Created at:</label></td>
                <td><label>{formatDate(se.createdAt)}</label></td>  
            </tr>
            <tr>
                <td><label className="detailhead">Updated at:</label></td>
                <td><label>{formatDate(se.updatedAt)}</label></td>  
            </tr>
            <tr><td>{"  "}</td></tr>
        </table>
        <label></label>
        </>
    )
}