import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import authContext from "../context/authContext";
import useAuth from "../hooks/useAuth";
import useHttp from "../hooks/usehttp";

const Navbar: React.FC = () => {
  const history = useHistory();
  const auth = useContext(authContext);
  const { Token } = useAuth();
  const { request } = useHttp();
  const [user, setUser]: any = useState([]);

  const getUser = async () => {
    try {
      const data = await request(
        `https://short-ad.herokuapp.com/api/auth/${Token.userId}`,
        "POST",
        null,
        { Authorization: Token.token }
      );
      setUser((prevUser: any) => [...prevUser, data.email]);
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
  }, [Token]);

  const logoutHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    auth.logout();
    window.location.reload();
  };

  return (
    <div>
      <nav>
        <div className="nav-wrapper blue darken-4">
          <a className="brand-logo a_link" onClick={() => history.push("/")}>
            URL Shortener
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li style={{ paddingRight: "20px" }}>
              Logged as <strong style={{ color: "black" }}>{user}</strong>
            </li>
            <li>
              <a onClick={() => history.push("/create")}>Create</a>
            </li>
            <li>
              <a onClick={() => history.push("/links")}>Links</a>
            </li>
            <li>
              <a onClick={logoutHandler}>Logout</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
