import { useEffect, useState } from "react";
import { APIs } from "./constants";
import Pagination from "./lib/Pagination";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [usersPerPage, setUsersPerPage] = useState([]);

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

  /**
   * Change handler for searching users
   * @param {import("react").SyntheticEvent} event
   */
  const handleSearch = (event) => {
    setSearchString(event.target.value);
    /////need for debounce ??????????????????
  };

  /**
   * Filter the list of users based on the searchString
   * @returns users
   */
  const filterUserList = () => {
    const searchTerm = searchString.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.role.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
  };

  const setRecordsPerPage = (NewRecords) => {
    NewRecords && setUsersPerPage(NewRecords);
    console.log(NewRecords);
  };

  const filteredUserList = filterUserList(users);
  return (
    <div className="main-container">
      <header>
        <input
          type="search"
          placeholder="Search..."
          onChange={handleSearch}
          value={searchString}
        ></input>
        <button>Delete Users</button>
      </header>
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox"></input>
            </th>
            <th>User Name</th>
            <th>Email Id</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && usersPerPage
            ? usersPerPage.map((user) => (
                <tr key={user.id}>
                  <td>
                    <input type="checkbox"></input>
                  </td>
                  <td>{user.name || "-"}</td>
                  <td>{user.email || "-"}</td>
                  <td>{user.role || "-"}</td>
                  <td>{user.name}</td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
      <footer>
        <Pagination
          records={filteredUserList}
          setRecordsPerPage={setRecordsPerPage}
          pageSize={10}
        ></Pagination>
      </footer>
    </div>
  );
};

export default Users;

///side effect for filteration ?? as for every render it will be calculated
