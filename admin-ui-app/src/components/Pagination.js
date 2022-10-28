import { useState } from "react";
import "./pagination.css";

const Pagination = (props) => {
  const [pageNo, setPageNo] = useState(0);
  const { handleRowsPerPage, recordCount, pageSize } = props;
  const totalPages = Math.ceil(recordCount / pageSize);
  const maxSiblingButtons = 2;

  const handleClickOnButtons = (pageNumber) => {
    setPageNo(pageNumber);
    handleRowsPerPage(pageNumber);
  };

  const showRightDots = pageNo + maxSiblingButtons < totalPages;
  const showLeftDots = pageNo - maxSiblingButtons > 0;

  console.log(totalPages);
  return (
    <div id={"pagination-container"}>
      <button
        id="fist-button"
        disabled={pageNo === 0}
        onClick={() => handleClickOnButtons(0)}
      >
        {"<<"}
      </button>
      <button
        id="prev-button"
        disabled={pageNo === 0}
        onClick={() => handleClickOnButtons(pageNo - 1)}
      >
        {"<"}
      </button>
      {showLeftDots && <button>{"..."}</button>}
      {[...Array(totalPages).keys()].map((page) => (
        <button
          key={page}
          id="numbered-button"
          disabled={pageNo === page}
          onClick={() => handleClickOnButtons(page)}
        >
          {page + 1}
        </button>
      ))}
      {showRightDots && <button>{"..."}</button>}
      <button
        id="next-button"
        disabled={pageNo === totalPages - 1}
        onClick={() => handleClickOnButtons(pageNo + 1)}
      >
        {">"}
      </button>
      <button
        id="last-button"
        disabled={pageNo === totalPages - 1}
        onClick={() => handleClickOnButtons(totalPages - 1)}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
