import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import useHttp from "../hooks/usehttp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage: React.FC = () => {
  const [links, setLinks]: any = useState([]);
  const ref = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const { request } = useHttp();

  const pressHandler = async (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate-guest",
          "POST",
          { from: ref.current!.value },
          {}
        );
        toast.info(data.message);
        setLinks([...links, data.link.to]);
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <>
      <nav>
        <div className="nav-wrapper blue darken-4">
          <a onClick={() => history.push("/")} className="brand-logo center a_link">
            URL Shortener
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a onClick={() => history.push("/auth")}>Sign in or Sign up</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <h2>Welcome to Url Shortener</h2>
            <div className="card blue darken-4">
              <div className="card-content black-text">
                <div className="input-field">
                  <input
                    placeholder="Short your link"
                    id="link"
                    type="text"
                    ref={ref}
                    onKeyPress={pressHandler}
                  />
                  <label htmlFor="link">Enter link</label>
                </div>
              </div>
              <div className="card-action">
                {links.map((link: any, index: any) => {
                  return (
                    <div>
                      <h6>Link</h6>
                      <div className="blue-grey darken-1">
                        <ul className="collection">
                          <li className="collection-item">
                            <div>
                              {link}
                              <a
                                href={link}
                                target="_blank"
                                className="secondary-content"
                              >
                                <i className="material-icons">send</i>
                              </a>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={2000}></ToastContainer>
      </div>
    </>
  );
};

export default HomePage;
