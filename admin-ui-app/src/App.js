import Users from "./Users";
import "./App.scss";
import { useState } from "react";

const App = () => {
  const [selectedTab, setSelectedTab] = useState("Users");
  const tabs = ["Users"];

  return (
    <div id="main-container">
      <header>
        <span className="material-symbols-outlined">logout</span>
      </header>
      <div className="content">
        <div className="tabs">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`tab ${selectedTab === tab ? "active" : ""}`}
              onClick={() => {
                setSelectedTab(tab);
              }}
            >
              <p>{tab}</p>
            </div>
          ))}
        </div>
        <div className="tabContainer">
          {selectedTab === "Users" && <Users />}
        </div>
      </div>
      <footer>
        <p>@ 2022 Admin UI</p>
      </footer>
    </div>
  );
};

export default App;
