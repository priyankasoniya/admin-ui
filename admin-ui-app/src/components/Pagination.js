import { useEffect, useState } from "react";
import "./pagination.scss";

const Pagination = (props) => {
  const [pageNo, setPageNo] = useState(0);
  const [pageNumbers, setPageNumbers] = useState([]);
  const { handleRowsPerPage, recordCount, pageSize, siblingCount = 1 } = props;
  const totalPages = Math.ceil(recordCount / pageSize);
  // calculate page number range as (siblingCount + boundaryCount) * 2 + dots + 1
  const range = (siblingCount + 1) * 2 + 3;
  const lastIndex = totalPages - 1;

  /**
   * sets the page number clicked by user
   * @param {Integer} pageNumber
   */
  const handleClickOnButtons = (pageNumber) => {
    setPageNo(pageNumber);
    handleRowsPerPage(pageNumber);
  };

  /**
   * side effect handles the logic of showing pages for pagination
   */
  useEffect(() => {
    let pageNumbers = [...Array(totalPages).keys()];
    let newPageNumbers;
    if (totalPages > range) {
      //no of pages on the each of middle element
      const sideElements = Math.floor(range / 2);
      const showRightDots = pageNo < lastIndex - sideElements;
      const showLeftDots = pageNo > sideElements;

      if (pageNo <= sideElements) {
        //If the current page number lies in the left side partition
        newPageNumbers = [
          ...[...Array(range - 2).keys()],
          "dots",
          ...[lastIndex],
        ];
      } else if (pageNo >= lastIndex - sideElements) {
        //If the current page number lies in the right side partition
        newPageNumbers = [
          0,
          "dots",
          ...pageNumbers.slice(lastIndex - sideElements - 1),
        ];
      } else {
        const middleArray = pageNumbers.slice(
          pageNo - siblingCount,
          pageNo + siblingCount + 1
        );
        newPageNumbers = showRightDots
          ? showLeftDots
            ? [0, "dots", ...middleArray, "dots", ...[lastIndex]]
            : [0, ...middleArray, "dots", ...[lastIndex]]
          : [0, "dots", ...middleArray, ...[lastIndex]];
      }
      pageNumbers = newPageNumbers;
    }
    setPageNumbers(pageNumbers);
  }, [totalPages, pageSize, pageNo, siblingCount]);

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
      {pageNumbers.map((page, index) => (
        <button
          key={index}
          id="numbered-button"
          disabled={pageNo === page}
          onClick={() => page !== "dots" && handleClickOnButtons(page)}
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
