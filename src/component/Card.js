import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import BookForm from "./BookForm";
import Modal from "./Modal";
import { Paragraph, Subtitle } from "./Typography";

const Card = ({
  image,
  title,
  description,
  status,
  account_id,
  book_id,
  id,
}) => {
  const STATUS_STYLES = {
    list: "bg-error text-white",
    read: "bg-success text-white",
    finished: "bg-gray-500 text-white",
    "best seller": "bg-warning text-white",
  };
  return (
    <div className="card text-center flex-grow shadow-xl">
      <figure className="px-10 pt-10">
        <img src={image} className="object-contain w-52 h-64" alt="" />
      </figure>
      <div className="px-10 py-6 flex flex-col flex-grow">
        <Subtitle className="card-title font-bold">{title}</Subtitle>
        <Paragraph className="line-clamp  opacity-80 mb-6">
          {description}
        </Paragraph>

        {Object.keys(STATUS_STYLES)
          .slice(0, 3)
          .includes(status.toLowerCase()) ? (
          <Modal
            id={id}
            noAction
            text="Detail"
            className=" btn btn-primary mt-auto"
          >
            <BookForm
              id={id}
              bookData={{
                image,
                title,
                description,
                status,
                book_id,
                account_id,
              }}
            />
          </Modal>
        ) : (
          <Link className=" btn btn-primary mt-auto" to="/library">
            Go to Library
          </Link>
        )}
      </div>
      {status !== "All" && (
        <Paragraph
          className={classNames(
            "absolute top-8 right-0 font-bold py-2 rounded-l-2xl pr-4 pl-8 bg-white text-black",
            STATUS_STYLES[status.toLowerCase()]
          )}
        >
          {status}
        </Paragraph>
      )}
    </div>
  );
};

export default Card;
