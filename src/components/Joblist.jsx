import { useState } from "react";
import "../styles/joblist.css";

import DeleteModal from "./DeleteModal";

/* eslint-disable react/prop-types */
const Joblist = (props) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletedJobId, setDeletedJobId] = useState(null);

  const deleteJobHandler = (id) => {
    setDeleteModal(true);
    setDeletedJobId(id);
  };

  const confirmDeleteJob = () => {
    props.onDeleteJob(deletedJobId);
    setDeleteModal(false);
  };

  const cancelModal = () => {
    setDeleteModal(false);
  };

  const getWebsiteName = (url) => {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname;
  };

  const rejectedHandler = (job) => {
    props.onRejectJob(job);
  };

  return (
    <div className="job-wrapper">
      <h3 id="job-wrapper_header">Interesting Offers</h3>
      {props.jobs.map((singleJob) => {
        return (
          <div key={singleJob.id} className="job-container">
            <div className="job-content">
              <h1 id="job-header">{singleJob.title}</h1>
              <a href={singleJob.url} id="job-url">
                {getWebsiteName(singleJob.url)}
              </a>
              <h4 id="job-rating">{singleJob.rating} / 5</h4>
              <span id="job-status">{singleJob.status}</span>
            </div>
            <div className="job-actions">
              <button
                id="job-reject_btn"
                key={`rejected-${singleJob.id}`}
                onClick={() => rejectedHandler(singleJob)}
              >
                rejected
              </button>
              <button
                onClick={() => deleteJobHandler(singleJob.id)}
                id="job-delete_btn"
              >
                delete
              </button>
            </div>
          </div>
        );
      })}

      {deleteModal && (
        <DeleteModal
          onConfirm={() => confirmDeleteJob(deletedJobId)}
          onCancel={cancelModal}
        ></DeleteModal>
      )}
    </div>
  );
};

export default Joblist;
