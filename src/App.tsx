import React from "react";
import { BrowserRouter } from "react-router-dom";
import UseRoutes from "./routes";
import authContext from "./context/authContext";
import Navbar from "./components/navbar";
import useAuth from "./hooks/useAuth";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const { Token, userId, login, logout } = useAuth();
  const isAuthenticated = !!Token;
  
  return (
    <authContext.Provider
      value={{ userId, login, logout, isAuthenticated }}
    >
      <BrowserRouter>
        {isAuthenticated && <Navbar />}
        {<UseRoutes isAuth={isAuthenticated} />}
      </BrowserRouter>
    </authContext.Provider>
  );
}

export default App;
