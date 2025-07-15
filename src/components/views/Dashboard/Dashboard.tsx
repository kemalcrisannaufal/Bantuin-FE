import { useSession } from "next-auth/react";
import FinanceSummary from "./FinanceSummary";
import TodayTodos from "./TodayTodos";
import PinnedNotes from "./FinanceSummary/PinnedNotes";
import useDashboard from "./useDashboard";
import { Skeleton } from "@heroui/react";

const Dashboard = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session: any = useSession();
  const { affirmationData, isLoadingAffirmationData } = useDashboard();

  return (
    <>
      <div className="flex items-center gap-3 mb-8 text-lg md:text-xl lg:text-2xl">
        <h2>
          Halo,{" "}
          <span className="inline font-semibold text-primary">
            {session.data?.user?.fullname}!
          </span>{" "}
          Siap jalani hari ini?
        </h2>
      </div>

      <Skeleton isLoaded={!isLoadingAffirmationData} className="mb-5">
        <div className="bg-neutral-100 shadow p-5 rounded-lg">
          <h4 className="mb-1 font-bold text-primary-500 text-xl">
            Motivasi Hari Ini
          </h4>

          <p className="font-medium text-neutral-600 md:text-lg">
            {affirmationData?.affirmation}
          </p>
        </div>
      </Skeleton>

      <div className="flex xl:flex-row flex-col gap-5">
        <div className="flex flex-col gap-4 w-full xl:w-2/3">
          <FinanceSummary />
          <PinnedNotes />
        </div>
        <TodayTodos />
      </div>
    </>
  );
};

export default Dashboard;
