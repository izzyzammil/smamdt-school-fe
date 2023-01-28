import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddStudent, EditStudent, StudentList } from "./Pages";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/edit/:id" element={<EditStudent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
