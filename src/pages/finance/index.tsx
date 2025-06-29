import MainLayout from "@/components/layouts/MainLayout";
import Finance from "@/components/views/Finance";

const FinancePage = () => {
  return (
    <MainLayout
      title={"Finance"}
      description="Catat dan kelola semua pemasukan serta pengeluaranmu dengan mudah. "
    >
      <Finance />
    </MainLayout>
  );
};

export default FinancePage;
