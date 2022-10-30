import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import "./PageFrameList.scss";

const PageFrameList = (props) => {
  const { records, pageSize, handleDeleteRecords, handleUpdateRecord } = props;
  const [rows, setRows] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [recordToUpdate, setRecordToUpdate] = useState({});
  let interval;

  useEffect(() => {
    setFilteredRecords(records);
  }, [records]);

  /**
   * resets the page number if records are updated
   */
  useEffect(() => {
    handleRowsPerPage(0);
  }, [filteredRecords]);

  /**
   * sets the rows per page according to the page number
   * @param {Integer} pageNumber
   */
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
    return records.filter((user) =>
      Object.keys(user).some((key) =>
        user[key].toLowerCase().includes(searchTerm)
      )
    );
  };

  /**
   * handled row selecton in order to delete later
   * @param {import("react").SyntheticEvent} event
   * @param {Object} row
   */
  const handleSelectRows = (event, row) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, ...[row]]);
    } else {
      let rows = selectedRows.filter((selectedRow) => selectedRow !== row);
      setSelectedRows(rows);
    }
  };

  /**
   * handles rows selecton in order to delete later
   * @param {import("react").SyntheticEvent} event
   */
  const handleSelectAllRows = (event) => {
    if (event.target.checked) {
      setSelectedRows(rows);
    } else {
      setSelectedRows([]);
    }
  };

  /**
   * handles change on the record to edit
   * @param {import("react").SyntheticEvent} event
   * @param {String} fieldKey
   */
  const handleUpdateFieldValue = (event, fieldKey) => {
    let record = { ...recordToUpdate };
    const fieldValue = event.target.value;
    record[fieldKey] = fieldValue;
    setRecordToUpdate(record);
  };

  return (
    <div id="page-frame-list">
      <div className="page-header">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
          ></input>
          <span className="material-symbols-outlined">search</span>
        </div>
        {selectedRows.length !== 0 && (
          <button
            className="delete-button"
            onClick={() => handleDeleteRecords(selectedRows)}
          >
            Delete Selected
          </button>
        )}
      </div>
      <div className="page-body">
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
                <tr
                  key={row.id}
                  className={
                    selectedRows.includes(row) || recordToUpdate.id === row.id
                      ? "selected-row"
                      : ""
                  }
                >
                  <td>
                    <input
                      type="checkbox"
                      disabled={recordToUpdate.id === row.id}
                      onChange={(e) => {
                        handleSelectRows(e, row);
                      }}
                      checked={selectedRows.includes(row)}
                    ></input>
                  </td>
                  {isEditMode && recordToUpdate.id === row.id
                    ? Object.keys(recordToUpdate).map(
                        (key) =>
                          key !== "id" && (
                            <td key={key}>
                              <input
                                type="text"
                                onChange={(e) => {
                                  handleUpdateFieldValue(e, key);
                                }}
                                value={recordToUpdate[key]}
                              />
                            </td>
                          )
                      )
                    : Object.keys(row).map(
                        (key) =>
                          key !== "id" && <td key={key}>{row[key] || "-"}</td>
                      )}
                  <td>
                    <div>
                      {isEditMode && recordToUpdate.id === row.id ? (
                        <button
                          className="cancel-button"
                          onClick={() => {
                            setIsEditMode(false);
                            setRecordToUpdate({});
                          }}
                        >
                          Cancel
                        </button>
                      ) : (
                        <span
                          className="material-symbols-outlined"
                          onClick={() => {
                            setIsEditMode(true);
                            setRecordToUpdate(row);
                          }}
                        >
                          edit
                        </span>
                      )}
                      {isEditMode && recordToUpdate.id === row.id ? (
                        <button
                          className="save-button"
                          onClick={() => {
                            setIsEditMode(false);
                            setRecordToUpdate({});
                            handleUpdateRecord(recordToUpdate);
                          }}
                        >
                          Save
                        </button>
                      ) : (
                        <span
                          className="material-symbols-outlined delete-icon"
                          onClick={() => {
                            handleDeleteRecords([row]);
                          }}
                        >
                          delete
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={10}
                  style={{ textAlign: "center", border: "none" }}
                >
                  No records found !
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="page-footer">
        <Pagination
          recordCount={filteredRecords.length}
          handleRowsPerPage={handleRowsPerPage}
          pageSize={pageSize}
          siblingCount={1}
        ></Pagination>
      </div>
    </div>
  );
};

export default PageFrameList;
