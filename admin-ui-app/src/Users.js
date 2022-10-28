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
    setUsers(users);
  };

  return <PageFrameList records={users} pageSize={pageSize}></PageFrameList>;
};

export default Users;

///side effect for filteration ?? as for every render it will be calculated
