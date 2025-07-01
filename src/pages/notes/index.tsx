import MainLayout from "@/components/layouts/MainLayout";
import Note from "@/components/views/Note";

const NotesPage = () => {
  return (
    <MainLayout
      title={"Catatan"}
      description="Catat, simpan, dan kelola semua informasi penting dengan mudah dalam satu tempat."
    >
      <Note />
    </MainLayout>
  );
};

export default NotesPage;
