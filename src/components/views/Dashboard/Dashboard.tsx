import { useSession } from "next-auth/react";
import { getTodayDate } from "@/utils/date";

const Dashboard = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session: any = useSession();

  return (
    <>
      <div className="flex justify-between items-center gap-3">
        <div>
          <h2 className="text-l md:text-xl lg:text-2xl">
            Halo,{" "}
            <span className="font-semibold text-primary">
              {session.data?.user?.fullname}!
            </span>{" "}
            Siap jalani hari ini?
          </h2>
        </div>

        <span className="min-w-max font-medium text-primary text-xs md:text-base">
          {getTodayDate()}
        </span>
      </div>
    </>
  );
};

export default Dashboard;
