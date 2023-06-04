import "../styles/jobform.css";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Modal from "./Modal";

// eslint-disable-next-line react/prop-types
const Jobform = ({ onAddJob }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [company, setCompany] = useState("");
  const [rating, setRating] = useState("");
  const [modal, setModal] = useState(false);

  const addJobHandler = (event) => {
    event.preventDefault();
    setModal(false);

    if (
      !title ||
      title.trim() === 0 ||
      !url ||
      url.trim() === 0 ||
      !company ||
      company.trim() === 0 ||
      !rating ||
      rating === null ||
      isNaN(rating)
    ) {
      return;
    }

    setModal(true);

    const submittedJob = {
      id: uuidv4(),
      title,
      company,
      url,
      rating,
      status: "saved",
    };

    console.log(submittedJob);

    onAddJob(submittedJob);

    setTitle("");
    setUrl("");
    setRating("");
    setCompany("");

    closeModalHandler();
  };

  const inputTitleHandler = (event) => {
    setTitle(event.target.value);
  };

  const inputUrlHandler = (event) => {
    setUrl(event.target.value);
  };

  const inputRatingHandler = (event) => {
    setRating(event.target.value);
  };

  const inputCompanyHandler = (event) => {
    setCompany(event.target.value);
  };

  const openModalHandler = (event) => {
    event.preventDefault();
    setModal(true);
  };

  const closeModalHandler = () => {
    setModal(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={openModalHandler}>
        <div className="input-title">
          <input
            id="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={inputTitleHandler}
          ></input>
        </div>
        <div className="input-url">
          <input
            type="url"
            id="url"
            value={url}
            placeholder="Link to Website"
            onChange={inputUrlHandler}
          ></input>
        </div>
        <div className="input-company">
          <input
            type="text"
            id="company"
            value={company}
            placeholder="Name of the company"
            onChange={inputCompanyHandler}
          ></input>
        </div>
        <div className="input-quantity">
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={rating}
            min="1"
            max="5"
            placeholder="Rating"
            onChange={inputRatingHandler}
          ></input>
        </div>
        <button type="submit" id="add-btn">
          Add this job
        </button>
      </form>

      {modal && (
        <Modal
          title={title}
          url={url}
          rating={rating}
          addJob={addJobHandler}
          close={closeModalHandler}
        ></Modal>
      )}
    </div>
  );
};

export default Jobform;
