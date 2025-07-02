import { MONTHS } from "@/constants/list.constants";
import { DateValue } from "@heroui/react";
import { parseDate } from "@internationalized/date";

const toDateStandard = (date: DateValue) => {
  const year = date.year;
  const month = date.month;
  const day = date.day;

  const dateStandard = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  return dateStandard;
};

const toDateStandardFromAPI = (date: string) => {
  const formattedDate = date.split("T")[0];
  const newDate = new Date(formattedDate);

  const year = newDate.getFullYear();
  const month = MONTHS[newDate.getMonth()].label;
  const day = newDate.getDay();

  return `${day.toString().padStart(2, "0")} ${month}, ${year}`;
};

const toInputDate = (date: string) => {
  const formattedDate = parseDate(date.split("T")[0]);
  return formattedDate;
};

const toLocaleDateTime = (mongoDate: string) => {
  const date = new Date(mongoDate).toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta", // Ganti dengan 'Asia/Makassar' atau 'Asia/Jayapura' untuk WITA/WIT
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return date;
};

export { toDateStandard, toDateStandardFromAPI, toInputDate, toLocaleDateTime };
