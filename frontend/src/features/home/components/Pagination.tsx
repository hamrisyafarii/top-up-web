import {MoveLeft, MoveRight} from "lucide-react";

type PaginationProps = {
  meta: {
    page: number;
    lastPage: number;
  };
  setSearchParams: any;
  search: string;
};

const Pagination = ({meta, setSearchParams, search}: PaginationProps) => {
  const pages = Array.from({length: meta.lastPage}, (_, i) => i + 1);

  const changePage = (page: number) => {
    setSearchParams((prev: any) => {
      const params = new URLSearchParams(prev);

      params.set("page", page.toString());

      if (search) {
        params.set("search", search);
      }

      return params;
    });
  };

  return (
    <div className="flex items-center justify-center mt-10">
      {/* PREV BUTTON */}
      <button
        disabled={meta.page === 1}
        onClick={() => changePage(meta.page - 1)}>
        <MoveLeft />
      </button>

      {/* PAGE NUMBERS */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => changePage(p)}
          className={`mx-2 ${meta.page === p ? "font-bold text-primary" : "font-normal"}`}>
          {p}
        </button>
      ))}

      {/* NEXT BUTTON */}
      <button
        disabled={meta.page === meta.lastPage}
        onClick={() => changePage(meta.page + 1)}>
        <MoveRight />
      </button>
    </div>
  );
};

export default Pagination;
