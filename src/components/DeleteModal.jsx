import "../styles/modal.css";

/* eslint-disable react/prop-types */
const DeleteModal = (props) => {
  return (
    <div className="modal-overlay" onClick={props.close}>
      <div className="modal-content">
        <h2 id="modal-header">Are you sure you want to delete this job?</h2>
        <p id="modal-title">{props.title}</p>
        <p id="modal-url">{props.url}</p>
        <p id="modal-rating">{props.rating}</p>
        <button type="submit" onClick={props.onConfirm} id="modal-submit">
          Confirm
        </button>
        <button onClick={props.onCancel} id="modal-cancel">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
