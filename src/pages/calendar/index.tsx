import MainLayout from "@/components/layouts/MainLayout";
import CalendarView from "@/components/views/Calendar";

const CalendarPage = () => {
  return (
    <MainLayout
      title={"Kalender"}
      description="Lihat dan kelola semua tugasmu dalam tampilan kalender. Bantuin membantumu merencanakan pekerjaan dengan lebih teratur."
    >
      <CalendarView />
    </MainLayout>
  );
};

export default CalendarPage;
