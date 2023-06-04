import "../styles/modal.css";

/* eslint-disable react/prop-types */
const Modal = (props) => {
  return (
    <div className="modal-overlay" onClick={props.close}>
      <div className="modal-content">
        <h2 id="modal-header">Do you want to add this job?</h2>
        <p id="modal-title">{props.title}</p>
        <p id="modal-url">{props.url}</p>
        <p id="modal-rating">{props.rating}</p>
        <button type="submit" onClick={props.addJob} id="modal-submit">
          Confirm
        </button>
        <button onClick={props.close} id="modal-cancel">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
