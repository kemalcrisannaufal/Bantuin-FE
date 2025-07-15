import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useDashboard = () => {
  const getAffirmation = async (): Promise<{ affirmation: string }> => {
    const { data } = await axios.get("/api/affirmations");
    return data.data;
  };

  const { data: affirmationData, isLoading: isLoadingAffirmationData } =
    useQuery({
      queryKey: ["getAffirmation"],
      queryFn: getAffirmation,
      enabled: true,
      refetchOnWindowFocus: false,
    });

  return {
    affirmationData,
    isLoadingAffirmationData,
  };
};

export default useDashboard;
