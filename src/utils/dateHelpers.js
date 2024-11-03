import { format } from "date-fns";

export const formatDate = (dateString, dateFormat = "HH:mm:ss dd/MM/yyyy") => {
  try {
    return format(new Date(dateString), dateFormat);
  } catch (error) {
    console.error("Invalid date format:", error);
    return null;
  }
};
