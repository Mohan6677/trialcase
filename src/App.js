import "antd/dist/antd.min.css";
import {Routes,  Route } from "react-router-dom";
import React from "react";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Home from "./Components/Home"
import "./App.css";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
    </div>
  );
}

export default App;
