import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

interface CalendarProps {
  events: any[];
  onCreateNewBooking: (arg: any) => void;
  onShowExistingBooking: (arg: any) => void;
  getStatusTooltip: (status: string) => string;
}

const Calendar = ({
  events,
  getStatusTooltip,
  onCreateNewBooking,
  onShowExistingBooking,
}: CalendarProps) => {
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        initialDate={new Date()}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        height="650px"
        dateClick={onCreateNewBooking}
        eventClick={onShowExistingBooking}
        eventDidMount={(info) => {
          info.el.setAttribute(
            "title",
            getStatusTooltip(info.event.extendedProps.status)
          );
        }}
      />
    </>
  );
};

export default Calendar;
