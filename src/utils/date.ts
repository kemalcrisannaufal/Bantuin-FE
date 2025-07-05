import { DAY, MONTHS } from "@/constants/list.constants";
import { DateValue } from "@heroui/react";
import { parseAbsoluteToLocal, parseDate } from "@internationalized/date";

const toDateStandard = (date: DateValue) => {
  const year = date.year;
  const month = date.month;
  const day = date.day;

  const hour = "hour" in date ? date.hour : 0;
  const minute = "minute" in date ? date.minute : 0;

  const localDate = new Date(year, month - 1, day, hour, minute, 0);

  return localDate.toISOString();
};

const toDateStandardFromAPI = (
  dateUnformatted: string,
  withTime: boolean = false
) => {
  const [date, time] = dateUnformatted.split("T");

  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = MONTHS[newDate.getMonth()].label;
  const day = newDate.getDate();
  const dayName = DAY[newDate.getDay()];

  let standardDate = `${dayName}, ${day
    .toString()
    .padStart(2, "0")} ${month} ${year}`;

  if (withTime) {
    const hour = Number(time.split(":")[0]) + 7;
    const minute = time.split(":")[1];
    standardDate += ` - ${hour.toString().padStart(2, "0")}.${minute} WIB`;
  }

  return standardDate;
};

const toInputDate = (date: string) => {
  const formattedDate = parseDate(date.split("T")[0]);
  return formattedDate;
};

const toInputDateTime = (date: string | undefined) => {
  const formattedDate = parseAbsoluteToLocal(`${date}`);
  return formattedDate;
};

const toLocaleDateTime = (mongoDate: string) => {
  const date = new Date(mongoDate).toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
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

const getTodayDate = () => {
  const date = new Date();
  return `${date.getDate()} ${
    MONTHS[date.getMonth()].label
  }, ${date.getFullYear()}`;
};

export {
  toDateStandard,
  toDateStandardFromAPI,
  toInputDate,
  toInputDateTime,
  toLocaleDateTime,
  getTodayDate,
};
