import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import Jobform from "./components/Jobform";
import Joblist from "./components/Joblist";
import RejectedJobs from "./components/RejectedJobs";

function App() {
  const [jobs, setJobs] = useState([]);
  const [rejectedJobs, setRejectedJobs] = useState([]);
  const handleAddJob = (job) => {
    setJobs([...jobs, job]);
  };

  useEffect(() => {
    const savedJobs = localStorage.getItem("jobs");
    const rejecetedJobs = localStorage.getItem("rejectedJobs");
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    }

    if (rejecetedJobs) {
      setRejectedJobs(JSON.parse(rejecetedJobs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
    localStorage.setItem("rejectedJobs", JSON.stringify(rejectedJobs));
  }, [jobs, rejectedJobs]);

  const handleDeleteJob = (jobId) => {
    const filteredJobs = jobs.filter((deletingJob) => deletingJob.id !== jobId);
    setJobs(filteredJobs);
  };

  const handleRejectJob = (job) => {
    const rejectedJob = { ...job, status: "rejeceted" };
    setRejectedJobs([...rejectedJobs, rejectedJob]);
    const filteredJobs = jobs.filter(
      (deletingJob) => deletingJob.id !== job.id
    );
    setJobs(filteredJobs);
  };

  const handleClearJob = (jobId) => {
    const filteredDeletedJobs = rejectedJobs.filter(
      (deletingJob) => deletingJob.id !== jobId
    );
    setRejectedJobs(filteredDeletedJobs);
  };

  return (
    <>
      <Header />
      <Jobform onAddJob={handleAddJob} />
      <div className="job-splitter">
        <Joblist
          jobs={jobs}
          onDeleteJob={handleDeleteJob}
          onRejectJob={handleRejectJob}
        />
        <RejectedJobs rejectedJobs={rejectedJobs} onClearJob={handleClearJob} />
      </div>
    </>
  );
}

export default App;
