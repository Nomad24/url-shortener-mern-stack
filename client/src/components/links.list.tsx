import React from "react";
import { Link } from "react-router-dom";

interface Links {
  links: string[];
}

export const LinksList: React.FC<Links> = ({ links }) => {
  if (!links.length) {
    return <p className="center">No links</p>;
  }

  return (
    <table>
      <div className="card blue darken-4">
        <div className="card-content black-text">
          <thead>
            <tr>
              <th>№</th>
              <th>Original link</th>
              <th>Short link</th>
              <th>Open</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link: any, index) => {
              return (
                <tr key={link._id}>
                  <td>{index + 1}</td>
                  <td>{link.from}</td>
                  <td>{link.to}</td>
                  <td>
                    <Link to={`/detail/${link._id}`}>Open</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </div>
      </div>
    </table>
  );
};

export default LinksList;
