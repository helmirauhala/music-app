 import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import Search from "./pages/Search.jsx";
import Preview from "./pages/Preview.jsx";
import Artist from "./pages/Artist.jsx";

export default function App() {
  return (
    <Router>
      {/* FIXED TOP NAVBAR  !!!!! FIxed do not change please plz */} 
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          background: "#fad4ebff",
          borderBottom: "1px solid #d6b6d2ff",
          padding: "12px 20px",
          zIndex: 1000,
        }}
      >
        <div style={{ fontSize: 70, fontWeight: 700, marginBottom: 15 }}>
          Music App
        </div>

        <nav style={{ display: "flex", gap: 35, fontSize: 30 }}>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              fontWeight: isActive ? "800" : "500",
              color: isActive ? "#7b1864ff" : "#000000ff",
              textDecoration: "none",
            })}
          >
            Search
          </NavLink>

          <NavLink
            to="/preview"
            style={({ isActive }) => ({
              fontWeight: isActive ? "800" : "500",
              color: isActive ? "#7b1864ff" : "#000000ff",
              textDecoration: "none",
            })}
          >
            Preview
          </NavLink>

          <NavLink
            to="/artist"
            style={({ isActive }) => ({
              fontWeight: isActive ? "800" : "500",
              color: isActive ? "#7b1864ff" : "#000000ff",
              textDecoration: "none",
            })}
          >
            Artist
          </NavLink>
        </nav>
      </header>

      <main style={{ padding: 20, marginTop: 260 }}>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/artist" element={<Artist />} />
        </Routes>
      </main>

    </Router>
  );
}
