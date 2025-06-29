import { DateValue } from "@heroui/react";
import { parseDate } from "@internationalized/date";

const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

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
  const month = monthNames[newDate.getMonth()];
  const day = newDate.getDay();

  return `${day.toString().padStart(2, "0")} ${month}, ${year}`;
};

const toInputDate = (date: string) => {
  const formattedDate = parseDate(date.split("T")[0]);
  return formattedDate;
};

export { toDateStandard, toDateStandardFromAPI, toInputDate };
