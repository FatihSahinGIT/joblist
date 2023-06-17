/* eslint-disable react/prop-types */
import "../styles/joblist.css";
import { useEffect, useState } from "react";

const RejectedJobs = (props) => {
  const [rejected, setRejected] = useState([]);
  const [loading, setLoading] = useState(false);

  const getWebsiteName = (url) => {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname;
  };

  useEffect(() => {
    setLoading(true);
    fetchData();

    const interval = setInterval(fetchData, 120000); // Check for updates every 5 seconds

    return () => {
      clearInterval(interval); // Clean up the interval when the component is unmounted
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://joblist-backend.onrender.com/rjobs");
      const responseData = await response.json();

      if (Array.isArray(responseData.rejectedJobs)) {
        setRejected(responseData.rejectedJobs);
      } else {
        console.log("Fetched rejected jobs is not an array:", responseData);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const clearJob = (id) => {
    props.onClearJob(id);
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator while data is being fetched
  }

  return (
    <div className="job-wrapper">
      <h3 id="job-wrapper_header">Rejected Jobs</h3>
      {rejected.map((singleJob) => {
        return (
          <div key={singleJob._id} className="job-container">
            <div className="job-content">
              <h1 id="job-header">{singleJob.title}</h1>
              <h2 id="job-company_title">{singleJob.company}</h2>
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
