import React from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { LogInPage } from "./pages/LogInPage";
import { useGetUser } from "context/UserContext";

export const App: React.FC = () => {
  const user = useGetUser();
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path=":id" element={<ProfilePage />}></Route>
      </Routes>
      {!user && <LogInPage />}
    </div>
  );
};
