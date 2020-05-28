import React, { useState, useContext } from "react";
import useHttp from "../hooks/usehttp";
import authContext from "../context/authContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "materialize-css";

const AuthPage: React.FC = () => {
  const { loading, request } = useHttp();
  const auth = useContext(authContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.currentTarget.name]: event.currentTarget.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request(
        "/api/auth/register",
        "POST",
        { ...form },
        {}
      );
      toast.success(data.message);
    } catch (error) {
      alert(error);
    }
  };

  const loginHandler = async () => {
    try {
      const data = await request(
        "/api/auth/login",
        "POST",
        { ...form },
        {}
      );
      toast.success("You have successfully logged in");
      setTimeout(function(){ 
        auth.login(data.token, data.userId);
        window.location.reload(); 
      }, 3000);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="container">
      <div>
        <div className="row">
          <div className="col s6 offset-s3">
            <h1>URL Shortener</h1>
            <div className="card blue darken-4">
              <div className="card-content white-text">
                <span className="card-title">Authorization</span>
                <div>
                  <div className="input-field">
                    <input
                      placeholder="Enter Email"
                      id="email"
                      type="text"
                      name="email"
                      className="yellow-input"
                      onChange={changeHandler}
                    />
                  </div>
                  <div className="input-field">
                    <input
                      placeholder="Enter Password"
                      id="password"
                      type="password"
                      name="password"
                      className="yellow-input"
                      onChange={changeHandler}
                    />
                  </div>
                </div>
              </div>
              <div className="card-action">
                <button
                  disabled={loading}
                  className="btn yellow darken-4"
                  style={{ marginRight: 10 }}
                  onClick={loginHandler}
                >
                  Sign in
                </button>
                <button
                  disabled={loading}
                  onClick={registerHandler}
                  className="btn grey lighten-1 black-text"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>

        <ToastContainer autoClose={2000}></ToastContainer>
      </div>
    </div>
  );
};

export default AuthPage;
