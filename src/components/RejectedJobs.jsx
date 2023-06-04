import "../styles/joblist.css";

/* eslint-disable react/prop-types */
const RejectedJobs = (props) => {
  const getWebsiteName = (url) => {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname;
  };

  const clearJob = (id) => {
    props.onClearJob(id);
  };

  return (
    <div className="job-wrapper">
      <h3 id="job-wrapper_header">Rejected Jobs</h3>
      {props.rejectedJobs.map((singleJob) => {
        return (
          <div key={singleJob.id} className="job-container">
            <div className="job-content">
              <h1 id="job-header">{singleJob.title}</h1>
              <a href={singleJob.url} id="job-url">
                {getWebsiteName(singleJob.url)}
              </a>
              <h4 id="job-rating">{singleJob.rating} / 5</h4>
              <span id="job-status">{singleJob.status}</span>
              <div className="job-actions">
                <button
                  onClick={() => clearJob(singleJob.id)}
                  id="job-delete_btn"
                >
                  clear job offer
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RejectedJobs;
