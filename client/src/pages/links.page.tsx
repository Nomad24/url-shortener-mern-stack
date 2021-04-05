import React, { useCallback, useState, useEffect } from "react";
import useHttp from "../hooks/usehttp";
import LinksList from "../components/links.list";
import Loader from "../components/loader";
import useAuth from "../hooks/useAuth";

const LinksPage: React.FC = () => {
  const [links, setLinks] = useState([]);
  const [load, setLoad] = useState(false);
  const { request } = useHttp();
  const { Token } = useAuth();
  const fetchLinks = useCallback(async () => {
    setLoad(true);
    try {
      const fetched = await request(
        "/api/link/",
        "GET",
        null,
        {
          Authorization: Token.token,
        }
      );
      setLinks(fetched);
      setLoad(false);
    } catch (error) {
      alert(error);
    }
  }, [Token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  return (
    <>
      <div className="container">{load ? <Loader /> : <LinksList links={links} />}</div>
    </>
  );
};

export default LinksPage;
