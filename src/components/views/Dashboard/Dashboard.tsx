import { useSession } from "next-auth/react";
import FinanceSummary from "./FinanceSummary";
import TodayTodos from "./TodayTodos";
import PinnedNotes from "./FinanceSummary/PinnedNotes";

const Dashboard = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session: any = useSession();

  return (
    <>
      <div className="flex items-center gap-3 mb-8 md:text-xl lg:text-2xl">
        Halo,
        <span className="font-semibold text-primary">
          {session.data?.user?.fullname}!
        </span>
        Siap jalani hari ini?
      </div>

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
