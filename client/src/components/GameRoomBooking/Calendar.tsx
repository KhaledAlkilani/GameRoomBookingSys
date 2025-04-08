import { Box, Typography, Modal } from "@mui/material";
import { RoomBookingDto } from "../../api";
import { useEffect, useState } from "react";
import { api } from "../../api/api";

// FullCalendar imports
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { usePlayerInfo } from "../../hooks/usePlayerInfo";

enum ModalMode {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
}

const Calendar = () => {
  const [calendar, setCalendar] = useState<RoomBookingDto[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>(ModalMode.CREATE);
  const [selectedBooking, setSelectedBooking] = useState<RoomBookingDto | null>(
    null
  );
  const { playerInfo } = usePlayerInfo();

  useEffect(() => {
    if (playerInfo && playerInfo.id) {
      fetchPlayerBookings(playerInfo.id);
    }
  }, [playerInfo]);

  const fetchPlayerBookings = async (playerId: number) => {
    try {
      const fetchedBookings =
        await api.RoomBookingsService.getRoomBookingsByPlayerId(playerId);
      setCalendar(Array.isArray(fetchedBookings) ? fetchedBookings : []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  // Helper: map booking status to color and tooltip text
  const getStatusColor = (status: string) => {
    if (status === "Ongoing") return "orange";
    if (status === "Completed") return "gray";
    return "blue"; // Upcoming or default
  };

  const getStatusTooltip = (status: string) => {
    if (status === "Ongoing") return "Ongoing Booking";
    if (status === "Completed") return "Past Booking";
    return "Upcoming Booking";
  };

  // Map bookings to FullCalendar event objects.
  const events = calendar.map((booking, index) => {
    const start = booking.bookingDateTime
      ? new Date(booking.bookingDateTime)
      : new Date();
    const end = new Date(
      start.getTime() + (booking.duration ?? 0) * 60 * 60 * 1000
    );
    const color = getStatusColor(booking.status ?? "");
    return {
      ...(booking.id ? { id: booking.id.toString() } : {}),
      title: ` - ${booking.duration} hrs`,
      start,
      end,
      backgroundColor: color,
      borderColor: color,
      extendedProps: { booking },
      status: booking.status,
    };
  });

  // Open modal to create a new booking when a day cell is clicked
  const handleDateClick = (arg: any) => {
    // Clicking a day cell → create new booking
    setModalMode(ModalMode.CREATE);
    setSelectedBooking(null);
    setModalOpen(true);
  };

  // Open modal to edit an existing booking when its event is clicked
  const handleEventClick = (arg: any) => {
    // Clicking an event → update existing booking
    // const bookingId = arg.event.id || arg.event.extendedProps.id;
    const booking = arg.event.extendedProps.booking;
    if (booking) {
      setSelectedBooking(booking);
      setModalMode(ModalMode.UPDATE);
      setModalOpen(true);
    }
  };

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.title}>Bookings Calendar</Typography>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        initialDate={new Date()} // Ensure today's date is visible
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        height="650px"
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventDidMount={(info) => {
          // Attach tooltip text to event element
          info.el.setAttribute(
            "title",
            getStatusTooltip(info.event.extendedProps.status)
          );
        }}
      />
      {/* Modal for creating/editing bookings */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={modalStyles}>
          {modalMode === ModalMode.CREATE ? (
            <>
              <Typography variant="h6">Create New Booking</Typography>
              {/* Add your create-booking form here */}
            </>
          ) : (
            <>
              <Typography variant="h6">Update Booking</Typography>
              {selectedBooking && (
                <Typography variant="body2">
                  Booking ID: {selectedBooking.id}
                  {/* Add your update form, plus maybe a delete button, etc. */}
                </Typography>
              )}
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Calendar;

const styles = {
  container: {
    padding: 2,
    height: "calc(100vh - 64px)",
  },
  title: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 32,
    letterSpacing: 1,
    marginBottom: 4,
  },
};

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
