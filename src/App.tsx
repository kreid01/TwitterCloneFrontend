import React, { useState } from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";

import { IPost } from "consts/Interface";

export const App: React.FC = () => {
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path=":id" element={<ProfilePage />}></Route>
      </Routes>
    </div>
  );
};
