import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/queryRouter.constants";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback } from "react";
import useDebounce from "./useDebounce";
import { DELAY } from "@/constants/list.constants";

const useUrl = () => {
  const router = useRouter();
  const debounce = useDebounce();

  const currentLimit = router.query.limit || LIMIT_DEFAULT;
  const currentPage = router.query.page || PAGE_DEFAULT;
  const currentSearch = router.query.search || "";

  const currentTodosRange =
    typeof router.query.range === "undefined" ? "today" : router.query.range;
  const currentTodosStatus =
    typeof router.query.status === "undefined"
      ? "pending"
      : router.query.status;
  const currentTodosUpcoming = router.query.upcoming || "false";

  const setUrl = useCallback(() => {
    router.replace({
      query: {
        limit: currentLimit,
        page: currentPage,
        search: currentSearch,
      },
    });
  }, [currentLimit, currentPage, currentSearch, router]);

  const setTodosUrl = useCallback(() => {
    router.replace({
      query: {
        limit: currentLimit,
        page: currentPage,
        search: currentSearch,
        status: currentTodosStatus,
        range: currentTodosRange,
        upcoming: currentTodosUpcoming,
      },
    });
  }, [
    currentLimit,
    currentPage,
    currentSearch,
    router,
    currentTodosStatus,
    currentTodosRange,
    currentTodosUpcoming,
  ]);

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const limit = e.target.value;
    router.replace({
      query: {
        ...router.query,
        limit,
      },
    });
  };

  const handleChangePage = (page: number) => {
    router.replace({
      query: {
        ...router.query,
        page,
      },
    });
  };

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    debounce(() => {
      router.replace({
        query: {
          ...router.query,
          search,
          page: PAGE_DEFAULT,
        },
      });
    }, DELAY);
  };

  // Todos
  const handleChangeTodosStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;

    router.replace({
      query: {
        ...router.query,
        status,
      },
    });
  };

  const handleChangeTodosRange = (e: ChangeEvent<HTMLSelectElement>) => {
    const range = e.target.value;
    router.replace({
      query: {
        ...router.query,
        range,
      },
    });
  };

  const handleChangeTodosUpcoming = (e: ChangeEvent<HTMLSelectElement>) => {
    const upcoming = e.target.value;
    router.replace({
      query: {
        ...router.query,
        upcoming,
        page: PAGE_DEFAULT,
      },
    });
  };

  return {
    currentLimit,
    currentPage,
    currentSearch,

    setUrl,

    handleChangeLimit,
    handleChangePage,
    handleChangeSearch,

    setTodosUrl,
    handleChangeTodosStatus,
    handleChangeTodosRange,
    handleChangeTodosUpcoming,
    currentTodosRange,
    currentTodosStatus,
    currentTodosUpcoming,

    router,
  };
};

export default useUrl;
