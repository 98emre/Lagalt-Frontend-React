import React, { useState, useEffect } from "react";
import { getAllProjects } from "../api/projectAPI";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllProjects();
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetch projects " + error);
        setError("There was an error fetching the projects.");
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const renderList = () => {
    if (loading) {
      return <p>Loading project..... </p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    if (projects.length === 0) {
      return <p>No Projects is available</p>;
    }

    return (
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.descriptions}</p>
            <p><strong>Category:</strong> {project.category}</p>
            <p><strong>Status:</strong> {project.status}</p>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h2>Project List</h2>
      {renderList()}
    </div>
  );
};

export default ProjectList;
