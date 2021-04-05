import React from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import useHttp from "../hooks/usehttp";
import useAuth from "../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Link {
  link: any;
}

export const LinkCard: React.FC<Link> = ({ link }) => {
  const { Token } = useAuth();
  const history = useHistory();
  const { request } = useHttp();
  const { id }: any = useParams();

  const delLink = async () => {
    try {
      const data = await request(
        `/api/link/delete/${id}`,
        "DELETE",
        null,
        {
          Authorization: Token.token,
        }
      );
      toast.error(data.message);
      setTimeout(() => {
        history.push('/links');
      }, 3000);
    } catch (error) {
      alert(error);
      toast.error(error);
    }
  };
  return (
    <div className="card blue darken-4">
      <div className="card-content black-text">
        {link.name ? <h3>Brand Link</h3> : <h3>Link</h3>}

        <p>
          Short link:{" "}
          <a href={link.to} target="_blank" rel="noopener noreferrer">
            {link.to}
          </a>
        </p>
        <p>
          Original:{" "}
          <a href={link.from} target="_blank" rel="noopener noreferrer">
            {link.from}
          </a>
        </p>
        {link.name ? <p>Brand Name: {link.name}</p> : null}
        <p>
          Number of clicks on the link: <strong>{link.clicks}</strong>
        </p>
        <p>
          Date:{" "}
          <strong>{new Date(link.date).toLocaleDateString("en-GB")}</strong>
        </p>
        <p>
          <button
            onClick={delLink}
            className="btn waves-light red darken-4"
            type="submit"
            name="action"
          >
            Delete Link
          </button>
        </p>
      </div>
      <ToastContainer autoClose={2000}></ToastContainer>
    </div>
  );
};

export default LinkCard;
