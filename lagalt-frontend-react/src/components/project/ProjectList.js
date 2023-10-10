import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchProjects} from "../../api/projectAPI";
import { setCurrentUserId } from "../../slices/projectSlice"

import { Link } from "react-router-dom";

const ProjectList = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user)
  const projects = useSelector((state) => state.project.projectsList);
  const loading = useSelector((state) => state.project.loading);
  const error = useSelector((state) => state.project.error);

  useEffect(() => {
    dispatch(setCurrentUserId(user.id));
    dispatch(fetchProjects())

},[dispatch])

  const renderList = () => {
    if (loading === 'loading') {
      return <p>Loading projects...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    if (projects.length === 0) {
      return <p>No Projects available</p>;
    }

    return (
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
          
          <Link to={`/project/${project.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <p><strong>Title:</strong>{project.title}</p>
            <p><strong>Description: </strong>{project.descriptions}</p>
            <p><strong>Category:</strong> {project.category}</p>
            <p><strong>Status:</strong> {project.status.split("_").join(" ")}</p>
            </Link>
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
