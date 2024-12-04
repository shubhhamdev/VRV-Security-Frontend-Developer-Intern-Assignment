import React from "react";
import "./index.css";
import UserManagement from "./component/UserManagement";

function App() {
  return (
    <center>
      <h1 className="header-title">Role-Based Access Control UI</h1>
      <UserManagement />
    </center>
  );
}

export default App;
