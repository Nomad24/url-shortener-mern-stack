import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import useHttp from "../hooks/usehttp";
import useAuth from "../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePage: React.FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { Token } = useAuth();
  const history = useHistory();
  const { request } = useHttp();

  const pressHandler = async (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          { from: ref.current!.value },
          {
            Authorization: Token.token,
          }
        );
        toast.info(data.message);
        setTimeout(() => { history.push(`/detail/${data.link._id}`); }, 3000);
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
            <div className="card blue darken-4">
              <div className="card-content black-text">
                <div className="input-field">
                  <input
                    placeholder="Enter link"
                    id="link"
                    type="text"
                    ref={ref}
                    onKeyPress={pressHandler}
                  />
                  <label htmlFor="link">Enter link</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={2000}></ToastContainer>
      </div>
    </>
  );
};

export default CreatePage;
