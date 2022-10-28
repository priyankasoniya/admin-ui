import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import "./PageFrameList.css";

const PageFrameList = (props) => {
  const { records, pageSize } = props;
  const [rows, setRows] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  let interval;

  useEffect(() => {
    setFilteredRecords(records);
  }, [records]);

  useEffect(() => {
    //Reset page number
    handleRowsPerPage(0);
  }, [filteredRecords]);

  const handleRowsPerPage = (pageNumber) => {
    setRows(
      filteredRecords.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize)
    );
    setSelectedRows([]);
  };

  /**
   * Change handler for searching records
   * @param {import("react").SyntheticEvent} event
   */
  const handleSearch = (event) => {
    clearTimeout(interval);
    let searchString = event.target.value;

    interval = setTimeout(() => {
      const filteredRows = filterRows(searchString);
      setFilteredRecords(filteredRows);
    }, 500);
  };

  /**
   * Filter the rows based on the searchString
   * @returns records
   */
  const filterRows = (searchString) => {
    const searchTerm = searchString.toLowerCase();
    return records.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.role.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
  };

  const handleSelectRows = (event, row) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, ...[row]]);
    } else {
      let rows = selectedRows.filter((selectedRow) => selectedRow !== row);
      setSelectedRows(rows);
    }
  };

  const handleSelectAllRows = (event) => {
    if (event.target.checked) {
      setSelectedRows(rows);
    } else {
      setSelectedRows([]);
    }
  };

  console.log(selectedRows, "render");
  return (
    <>
      <div className="page-header">
        <input
          type="search"
          placeholder="Search..."
          onChange={handleSearch}
        ></input>
        {selectedRows.length !== 0 && <button>Delete</button>}
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAllRows}
                checked={selectedRows.length === pageSize}
              ></input>
            </th>
            {records?.length !== 0 &&
              Object.keys(records[0])?.map(
                (key) => key !== "id" && <th key={key}>{key}</th>
              )}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows && rows.length !== 0 ? (
            rows.map((row) => (
              <tr key={row.id}>
                <td>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      handleSelectRows(e, row);
                    }}
                    checked={selectedRows.includes(row)}
                  ></input>
                </td>
                {Object.keys(row).map(
                  (key) => key !== "id" && <td key={key}>{row[key] || "-"}</td>
                )}
                <td>{row.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No records found !</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <Pagination
          recordCount={filteredRecords.length}
          handleRowsPerPage={handleRowsPerPage}
          pageSize={pageSize}
        ></Pagination>
      </div>
    </>
  );
};

export default PageFrameList;
