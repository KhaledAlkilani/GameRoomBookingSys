import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box } from "@mui/material";

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
    <Box sx={{ height: "calc(100vh - 140px)" }}>
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
        height="100%"
        dateClick={onCreateNewBooking}
        eventClick={onShowExistingBooking}
        eventDidMount={(info) => {
          info.el.setAttribute(
            "title",
            getStatusTooltip(info.event.extendedProps.status)
          );
        }}
      />
    </Box>
  );
};

export default Calendar;
