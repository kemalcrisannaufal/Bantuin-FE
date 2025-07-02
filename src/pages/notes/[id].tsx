import MainLayout from "@/components/layouts/MainLayout";
import NoteDetail from "@/components/views/NoteDetail";

const NoteDetailPage = () => {
  return (
    <MainLayout title={"Catatan"} description={`Detail dari catatan pilihanmu`}>
      <NoteDetail />
    </MainLayout>
  );
};

export default NoteDetailPage;
