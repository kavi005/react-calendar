import { CalendarController } from "../../Calendar/CalendarController"

export const Schedule = () => {

    return (
        <div style={{
            display: "flex",
            justifyContent: "centre",
            alignItems: "centre",
            height: "100vh",
        }}>
            <CalendarController />
        </div>
    )
}