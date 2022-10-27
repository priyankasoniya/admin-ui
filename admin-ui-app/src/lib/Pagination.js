import { useEffect, useState } from "react";
import "./pagination.css";

const Pagination = (props) => {
  const [pageNo, setPageNo] = useState(0);
  const { setRecordsPerPage, records, pageSize } = props;
  const totalPages = Math.ceil(records.length / pageSize);

  const handleClickOnButtons = (pageNumber) => {
    setPageNo(pageNumber);
    let NewRecords = records.slice(
      pageNumber * pageSize,
      (pageNumber + 1) * pageSize
    );
    setRecordsPerPage(NewRecords);
  };

  return (
    <div id={"pagination-container"}>
      <button id="fist-button" onClick={() => handleClickOnButtons(0)}>
        {"<<"}
      </button>
      <button id="prev-button" onClick={() => handleClickOnButtons(pageNo - 1)}>
        {"<"}
      </button>
      {[...Array(totalPages)].map((pageNo, index) => (
        <button
          id="numbered-button"
          onClick={() => handleClickOnButtons(index)}
        >
          {index + 1}
        </button>
      ))}
      <button id="next-button" onClick={() => handleClickOnButtons(pageNo + 1)}>
        {">"}
      </button>
      <button
        id="last-button"
        onClick={() => handleClickOnButtons(totalPages - 1)}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
