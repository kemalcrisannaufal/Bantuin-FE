import MainLayout from "@/components/layouts/MainLayout";
import Dashboard from "@/components/views/Dashboard";

const DashboardPage = () => {
  return (
    <MainLayout title={"Dashboard"}>
      <Dashboard />
    </MainLayout>
  );
};

export default DashboardPage;
