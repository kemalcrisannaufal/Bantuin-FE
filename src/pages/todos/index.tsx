import MainLayout from "@/components/layouts/MainLayout";
import Todos from "@/components/views/Todos";

const TodosPage = () => {
  return (
    <MainLayout
      title="Tugas"
      description="Kelola daftar tugas harianmu dengan mudah. Tambahkan, tandai selesai, dan pantau progres pekerjaan agar tetap terorganisir setiap hari."
    >
      <Todos />
    </MainLayout>
  );
};

export default TodosPage;
