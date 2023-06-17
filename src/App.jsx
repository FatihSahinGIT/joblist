import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import Jobform from "./components/Jobform";
import Joblist from "./components/Joblist";
import RejectedJobs from "./components/RejectedJobs";

function App() {
  const [jobs, setJobs] = useState([]);
  const [rejectedJobs, setRejectedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAddJob = async (job) => {
    try {
      const response = await fetch("http://localhost:3000/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });

      if (response.ok) {
        const newJob = await response.json();
        const createdJob = [newJob.job];

        setJobs((prevJobs) => [...prevJobs, createdJob]);
      } else {
        throw new Error("Fehler beim Hinzufügen des Jobs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/jobs");
      const fetchedJobs = await response.json();

      if (Array.isArray(fetchedJobs.jobs)) {
        setJobs(fetchedJobs.jobs);
      } else {
        console.log("Fetched jobs is not an array:", fetchedJobs);
        setJobs([]); // Set an empty array as the value of jobs
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [jobs]);

  const handleDeleteJob = async (jobId) => {
    try {
      const response = await fetch(`http://localhost:3000/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Wenn die Löschung erfolgreich war, kannst du den Job aus der State-Variable entfernen
        if (Array.isArray(jobs)) {
          const filteredJobs = jobs.filter(
            (deletingJob) => deletingJob._id !== jobId
          );

          setJobs(filteredJobs);
        }
      } else {
        // Wenn die Löschung fehlgeschlagen ist, kannst du den Fehler entsprechend behandeln
        throw new Error("Fehler beim Löschen des Jobs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectJob = async (job) => {
    const rejectedJob = { ...job, status: "rejected" };

    try {
      const response = await fetch(`http://localhost:3000/jobs/${job._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rejectedJob),
      });

      if (response.ok) {
        // Remove the rejected job from the existing jobs
        if (Array.isArray(jobs)) {
          const filteredJobs = jobs.filter(
            (deletingJob) => deletingJob._id !== job._id
          );

          setJobs(filteredJobs);

          // Update the state with the rejected job using the updated jobs state
          setRejectedJobs([...rejectedJobs, rejectedJob]);
        }
      } else {
        throw new Error("Failed to update job as rejected");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearJob = (jobId) => {
    const filteredDeletedJobs = rejectedJobs.filter(
      (deletingJob) => deletingJob._id !== jobId
    );

    setRejectedJobs(filteredDeletedJobs);
  };

  return (
    <>
      <Header />
      <Jobform onAddJob={handleAddJob} />
      <div className="job-splitter">
        {!loading && (
          <Joblist
            jobs={jobs}
            onDeleteJob={handleDeleteJob}
            onRejectJob={handleRejectJob}
          />
        )}
        <RejectedJobs onClearJob={handleClearJob} />
      </div>
    </>
  );
}

export default App;
