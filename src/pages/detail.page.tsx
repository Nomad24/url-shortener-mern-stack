import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../hooks/usehttp";
import LinkCard from "../components/link.card";
import useAuth from "../hooks/useAuth";

const DetailPage: React.FC = () => {
  const { Token } = useAuth();
  const { request } = useHttp();
  const [link, setLink] = useState(null);
  const { id } = useParams();

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(
        `https://short-ad.herokuapp.com/api/link/${id}`,
        "GET",
        null,
        {
          Authorization: Token.token,
        }
      );
      setLink(fetched);
    } catch (error) {
      alert(error);
    }
  }, [Token, id, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  return (
    <>
      <div className="container">{link && <LinkCard link={link} />}</div>
    </>
  );
};

export default DetailPage;
