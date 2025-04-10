import { Box, Typography, Modal } from "@mui/material";
import { RoomBookingDto } from "../../api";
import { useEffect, useState } from "react";
import { api, DeviceDto } from "../../api/api";
import dayjs, { Dayjs } from "dayjs";
import { useSnackbar } from "notistack";
import { usePlayerInfo } from "../../hooks/usePlayerInfo";
import BookingForm, { ModalMode } from "./BookingForm";
import Calendar from "./Calendar";
import { getStatusColor, getStatusTooltip } from "./BookingHelpers";

const initialBooking: RoomBookingDto = {
  bookingDateTime: undefined,
  duration: undefined,
  isPlayingAlone: true,
  fellows: undefined,
  devices: [],
};

const Bookings = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [calendar, setCalendar] = useState<RoomBookingDto[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>(ModalMode.CREATE);
  const [selectedBooking, setSelectedBooking] = useState<RoomBookingDto | null>(
    null
  );
  const { playerInfo } = usePlayerInfo();
  const [bookRoom, setBookRoom] = useState<RoomBookingDto>(initialBooking);
  const [allDevices, setAllDevices] = useState<DeviceDto[]>([]);
  const [inputValue, setInputValue] = useState("");

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

  useEffect(() => {
    api.DevicesService.getAllDevices()
      .then((fetchedDevices) => {
        setAllDevices(fetchedDevices);
      })
      .catch((err) => {
        console.error("Error fetching devices:", err);
      });
  }, []);

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
  const handleCreateNewBooking = (arg: any) => {
    setBookRoom({
      ...initialBooking,
      // Pre-fill the date with the clicked cell date
      bookingDateTime: dayjs(arg.date).format("YYYY-MM-DDTHH:mm"),
    });
    setModalMode(ModalMode.CREATE);
    setSelectedBooking(null);
    setModalOpen(true);
  };

  // Open modal to edit an existing booking when its event is clicked
  const handleShowExistingBooking = (arg: any) => {
    const booking = arg.event.extendedProps.booking;
    if (booking) {
      setSelectedBooking(booking);
      setModalMode(ModalMode.UPDATE);
      setModalOpen(true);
    }
  };

  const handleBookingDateTimeChange = (newValue: Dayjs | null) => {
    setBookRoom((prev) => ({
      ...prev,
      bookingDateTime: newValue ? newValue.format("YYYY-MM-DDTHH:mm") : "",
    }));
  };

  const handleDuractionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numHours = parseInt(value, 10);
    if (modalMode === ModalMode.CREATE) {
      setBookRoom({
        ...bookRoom,
        duration: !isNaN(numHours) ? numHours : undefined,
      });
    } else if (modalMode === ModalMode.UPDATE && selectedBooking) {
      setSelectedBooking({
        ...selectedBooking,
        duration: !isNaN(numHours) ? numHours : undefined,
      });
    }
  };

  const handleDeviceInputChange = (
    _: React.SyntheticEvent,
    newInputValue: string
  ) => {
    setInputValue(newInputValue);
  };

  const handleDeviceSelect = (
    _: React.SyntheticEvent,
    newValue: DeviceDto | null
  ) => {
    if (newValue) {
      setBookRoom((prev) => ({
        ...prev,
        devices: [...(prev.devices || []), newValue],
      }));
    }
    setInputValue("");
  };

  const handlePlayingAloneChange = () => {
    setBookRoom((prev) => ({
      ...prev,
      isPlayingAlone: true,
      fellows: 0,
    }));
  };

  const handleWithFellowsChange = () => {
    setBookRoom((prev) => ({
      ...prev,
      isPlayingAlone: false,
      fellows: undefined,
    }));
  };

  const handleFellowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookRoom({ ...bookRoom, fellows: parseInt(e.target.value) });
  };

  const checkFieldsValidation = (): boolean => {
    const isBookingDateTimeValid =
      bookRoom.bookingDateTime !== initialBooking.bookingDateTime;

    const durationNumber = parseInt(String(bookRoom.duration ?? ""), 10);
    const isDurationValid =
      !isNaN(durationNumber) &&
      durationNumber > 0 &&
      bookRoom.duration !== initialBooking.duration;

    const isFellowsValid =
      bookRoom.isPlayingAlone ||
      (bookRoom.fellows !== undefined &&
        bookRoom.fellows > 0 &&
        bookRoom.fellows !== initialBooking.fellows);

    return isBookingDateTimeValid && isDurationValid && isFellowsValid;
  };

  const handleRoomBooking = async () => {
    if (checkFieldsValidation()) {
      try {
        const response = await api.RoomBookingsService.bookGameRoom(bookRoom);
        enqueueSnackbar("Room booked successfully!", {
          variant: "success",
        });
        // Add the new booking to the calendar state
        setCalendar((prev) => [...prev, response]);

        // Reset fields
        setBookRoom(initialBooking);

        // Close modal
        setModalOpen(false);
      } catch (error: any) {
        const serverMessage = error?.body?.message || error?.body?.Message;

        if (serverMessage) {
          enqueueSnackbar(serverMessage, { variant: "error" });
        } else {
          enqueueSnackbar("Error booking room", { variant: "error" });
        }
        console.error("Error booking room:", error);
      }
    }
  };

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.title}>Calendar</Typography>
      <Calendar
        events={events}
        onCreateNewBooking={handleCreateNewBooking}
        onShowExistingBooking={handleShowExistingBooking}
        getStatusTooltip={getStatusTooltip}
      />
      {/* Modal for creating/editing bookings */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={styles.modalStyles}>
          <BookingForm
            mode={modalMode}
            booking={
              modalMode === ModalMode.CREATE ? bookRoom : selectedBooking!
            }
            allDevices={allDevices}
            inputValue={inputValue}
            onInputChange={handleDeviceInputChange}
            onDeviceSelect={handleDeviceSelect}
            onBookingDateTimeChange={handleBookingDateTimeChange}
            onDurationChange={handleDuractionChange}
            onPlayingAloneChange={handlePlayingAloneChange}
            onWithFellowsChange={handleWithFellowsChange}
            onFellowsChange={handleFellowsChange}
            onSubmit={handleRoomBooking}
            onCancel={() => setModalOpen(false)}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Bookings;

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
  modalStyles: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "white",
    borderRadius: "8px",
    p: 3,
    boxShadow: 24,
  },
};
