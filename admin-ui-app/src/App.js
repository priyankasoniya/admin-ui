import Users from "./Users";

const App = () => {
  return (
    <div className="main-container">
      <header>logged in</header>
      <div className="tab">Users</div>
      <Users />
      <footer>@ 2022</footer>
    </div>
  );
};

export default App;
