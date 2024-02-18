import './App.css';
import { CalendarController } from './Calendar/CalendarController';

function App() {
  // const days = getDaysInMonth(moment());

  // const weeks = segmentIntoWeeks(getDaysInMonth(moment()));
  // console.log(weeks);

  return (
    <>
      {/* <h1>Calendar</h1> */}
      {/* <Calendar /> */}
      <CalendarController />
    </>
    
  );
}

export default App;
