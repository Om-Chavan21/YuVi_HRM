import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Members from "./pages/Members";
import Groups from "./pages/Groups";
import Events from "./pages/Events";
import EditMember from "./pages/EditMember";
import EditGroup from "./pages/EditGroup";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <h1 className="text-center my-4">Management System</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/members" element={<Members />} />
          <Route path="/members/edit/:id" element={<EditMember />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/edit/:id" element={<EditGroup />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
