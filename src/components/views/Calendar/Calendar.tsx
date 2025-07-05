import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import useCalendar from "./useCalendar";

const Calendar = () => {
  const { events } = useCalendar();

  return (
    <>
      <div className="w-full overflow-x-auto">
        <div className="bg-white shadow-md p-4 rounded-xl min-w-[700px]">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "title",
              center: "",
              right: "prev,next",
            }}
            events={events}
            height="auto"
            dayMaxEventRows={5}
            fixedWeekCount={false}
            eventDisplay="block"
            aspectRatio={1.5}
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-5 text-foreground-600 text-sm">
        <div className="flex items-center gap-2">
          <div
            className="bg-warning rounded-sm w-5 h-5"
            aria-label="yellow-box"
          />
          <span>Belum Selesai</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="bg-primary rounded-sm w-5 h-5"
            aria-label="blue-box"
          />
          <span>Selesai</span>
        </div>
      </div>
    </>
  );
};

export default Calendar;
