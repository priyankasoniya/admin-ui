import { useEffect, useState } from "react";
import "./pagination.css";

const Pagination = (props) => {
  const [pageNo, setPageNo] = useState(0);
  const { setRecordsPerPage, records, pageSize } = props;
  const totalPages = Math.ceil(records.length / pageSize);

  useEffect(() => {
    const NewRecords = records.slice(
      pageNo * pageSize,
      (pageNo + 1) * pageSize
    );
    setRecordsPerPage(NewRecords);
    console.log(NewRecords);
  }, []);

  const handleClickOnButtons = (pageNo) => {
    console.log(pageNo);
    let NewRecords = records.slice(pageNo * pageSize, (pageNo + 1) * pageSize);
    console.log(NewRecords);
    setRecordsPerPage(NewRecords);
  };

  return (
    <div id={"pagination-container"}>
      <button id="fist-button" onClick={() => handleClickOnButtons(0)}>
        {"<<"}
      </button>
      <button>{"<"}</button>
      {[...Array(totalPages)].map((pageNo, index) => (
        <button>{index + 1}</button>
      ))}
      <button>{">"}</button>
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
