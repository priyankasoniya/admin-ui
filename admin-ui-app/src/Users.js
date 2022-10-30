import { useEffect, useState } from "react";
import { APIs } from "./constants";
import "./Users.css";
import PageFrameList from "./components/PageFrameList";

const Users = () => {
  const [users, setUsers] = useState([]);
  const pageSize = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  /**
   * API request to fetch the users
   */
  const fetchUsers = async () => {
    const users = await (await fetch(APIs.GET_USERS)).json().catch(() => {
      alert("No users found !");
    });
    users && setUsers(users);
  };

  /**
   * Method to delete the users
   * @param {Array} rows
   */
  const handleDeleteRecords = (rows) => {
    let newRecords = [...users];
    const result = window.confirm(
      "You are trying to delete the user. Please note this cannot be reverted"
    );
    if (result) {
      if (rows.length > 1) {
        rows.forEach((row) => {
          const index = newRecords.indexOf(row);
          newRecords.splice(index, 1);
        });
        setUsers(newRecords);
      } else {
        const index = users.indexOf(rows[0]);
        newRecords.splice(index, 1);
        setUsers(newRecords);
      }
    }
  };

  return (
    users.length !== 0 && (
      <PageFrameList
        records={users}
        pageSize={pageSize}
        handleDeleteRecords={handleDeleteRecords}
      ></PageFrameList>
    )
  );
};

export default Users;
