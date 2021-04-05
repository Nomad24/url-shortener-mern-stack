import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import useHttp from "../hooks/usehttp";
import useAuth from "../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePage: React.FC = () => {
  const link1 = useRef<HTMLInputElement>(null);
  const link2 = useRef<HTMLInputElement>(null);
  const link_brand = useRef<HTMLInputElement>(null);
  const { Token } = useAuth();
  const history = useHistory();
  const { request } = useHttp();

  const pressHandler = async (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          { from: link1.current!.value },
          {
            Authorization: Token.token,
          }
        );
        toast.info(data.message);
        setTimeout(() => {
          history.push(`/detail/${data.link._id}`);
        }, 3000);
      } catch (error) {
        alert(error);
        toast.error(error);
      }
    }
  };

  const submitLink = async () => {
    try {
      const data = await request(
        "/api/link/generate",
        "POST",
        { from: link1.current!.value },
        {
          Authorization: Token.token,
        }
      );
      toast.info(data.message);
      setTimeout(() => {
        history.push(`/detail/${data.link._id}`);
      }, 3000);
    } catch (error) {
      alert(error);
      toast.error(error);
    }
  };

  const submitBrand = async () => {
    try {
      const data = await request(
        "/api/link/generate-brand-link",
        "POST",
        {
          from: link2.current!.value,
          name: link_brand.current!.value,
        },
        {
          Authorization: Token.token,
        }
      );
      if(data.info == "Created"){
        toast.info(data.message);
        setTimeout(() => {
          history.push(`/detail/${data.link._id}`);
        }, 3000);
      }
      if(data.info == "Exist"){
        toast.error(data.message);
      }
    } catch (error) {
      alert(error);
      toast.error(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
            <div className="card blue darken-4">
              <div className="card-content black-text">
              <p>Create Link</p>
                <div className="input-field">
                  <input
                    placeholder="Paste Link"
                    id="link1"
                    type="text"
                    ref={link1}
                    onKeyPress={pressHandler}
                  />
                  <button
                    onClick={submitLink}
                    className="btn waves-light"
                    type="submit"
                    name="action"
                  >
                    Submit
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              </div>
            </div>
            <div className="card blue darken-4">
              <div className="card-content black-text">
                <p>Create Brand Link</p>
                <div className="input-field">
                  <input
                    placeholder="Paste Original Link"
                    id="link2"
                    type="text"
                    ref={link2}
                  />
                  <input
                    placeholder="Paste Brand Link"
                    id="link-brand"
                    type="text"
                    ref={link_brand}
                  />
                  <button
                    onClick={submitBrand}
                    className="btn waves-light"
                    type="submit"
                    name="action"
                  >
                    Submit
                    <i className="material-icons right">send</i>
                  </button>
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
