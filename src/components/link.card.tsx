import React from "react";

interface Link {
  link: any;
}

export const LinkCard: React.FC<Link> = ({ link }) => {
  return (
    <>
      <h2>Link</h2>

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
      <p>
        Number of clicks on the link: <strong>{link.clicks}</strong>
      </p>
      <p>
        Date:{" "}
        <strong>{new Date(link.date).toLocaleDateString()}</strong>
      </p>
    </>
  );
};

export default LinkCard;
