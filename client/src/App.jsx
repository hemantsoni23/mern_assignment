import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <div className="pt-16 overflow-hidden">
        <Outlet />
      </div>
    </React.Fragment>
  );
}

export default App;