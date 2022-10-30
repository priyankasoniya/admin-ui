import { useState } from "react";
import "./pagination.scss";

const Pagination = (props) => {
  const [pageNo, setPageNo] = useState(0);
  const { handleRowsPerPage, recordCount, pageSize } = props;
  const totalPages = Math.ceil(recordCount / pageSize);
  // const totalPages = 11;
  let siblingCount = 1;
  let boundaryCount = 1;
  let dots = 2;
  let range = (siblingCount + boundaryCount) * 2 + dots + 1;
  const lastIndex = totalPages - 1;

  const handleClickOnButtons = (pageNumber) => {
    setPageNo(pageNumber);
    handleRowsPerPage(pageNumber);
  };

  const getArray = () => {
    let pageNumbers = [...Array(totalPages).keys()];
    let finalArray;
    if (totalPages > range) {
      const showRightDots = pageNo < lastIndex - 3;
      const showLeftDots = pageNo > 3;
      if (pageNo < 4) {
        console.log("first condi");
        //To check if the page no is first few elements
        finalArray = [...[...Array(5).keys()], "dots", ...[lastIndex]];
      } else if (pageNo > lastIndex - 4) {
        console.log("second condi");
        finalArray = [0, "dots", ...pageNumbers.slice(lastIndex - 4)];
      } else {
        console.log("lastcond");
        const middleArray = pageNumbers.slice(pageNo - 1, pageNo + 2);
        finalArray = showRightDots
          ? showLeftDots
            ? [0, "dots", ...middleArray, "dots", ...[lastIndex]]
            : [0, ...middleArray, "dots", ...[lastIndex]]
          : showLeftDots
          ? [0, "dots", ...middleArray, ...[lastIndex]]
          : [0, ...middleArray, ...[lastIndex]];
      }
      pageNumbers = finalArray;
    }
    return pageNumbers;
  };
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
      {getArray().map((page, index) => (
        <button
          key={index}
          id="numbered-button"
          disabled={pageNo === page}
          onClick={() => handleClickOnButtons(page)}
        >
          {page === "dots" ? "..." : page + 1}
        </button>
      ))}
      <button
        id="next-button"
        disabled={pageNo === lastIndex}
        onClick={() => handleClickOnButtons(pageNo + 1)}
      >
        {">"}
      </button>
      <button
        id="last-button"
        disabled={pageNo === lastIndex}
        onClick={() => handleClickOnButtons(lastIndex)}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
