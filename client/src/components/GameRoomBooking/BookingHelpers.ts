import { BookingStatus } from "../../api";

export const getStatusColor = (status: string) => {
  if (status === BookingStatus.ONGOING) return "orange";
  if (status === BookingStatus.COMPLETED) return "gray";
  if (status === BookingStatus.CANCELLED) return "red";
  return BookingStatus.UPCOMING;
};

export const getStatusTooltip = (status: string) => {
  if (status === BookingStatus.ONGOING) return "Ongoing";
  if (status === BookingStatus.COMPLETED) return "Past";
  if (status === BookingStatus.CANCELLED) return "Cancelled";
  return BookingStatus.UPCOMING;
};
