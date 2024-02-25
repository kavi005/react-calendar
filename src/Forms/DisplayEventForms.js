import moment from "moment";
import { formatDateTime } from "../Calendar/CalendarUtil";

export const NewEventForm = ({selectedEvent}) => {
    const se = selectedEvent[0];

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
                <td><label>{formatDateTime(se.eventStartTimestamp)}</label></td>  
            </tr>
            <tr>
                <td><label className="detailhead">End date:</label></td>
                <td><label>{formatDateTime(se.eventEndTimestamp)}</label></td>  
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
                <td><label>{formatDateTime(se.createdAt)}</label></td>  
            </tr>
            <tr>
                <td><label className="detailhead">Updated at:</label></td>
                <td><label>{formatDateTime(se.updatedAt)}</label></td>  
            </tr>
            <tr><td>{"  "}</td></tr>
        </table>
        <label></label>
        </>
    )
}