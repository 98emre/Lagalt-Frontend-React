
import React, {useState, useEffect} from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectById } from '../../api/projectAPI';
import { getUserById } from '../../api/userAPI';

import { useForm } from 'react-hook-form';
import {addComment} from "../../api/commentAPI";
import { useKeycloak } from '@react-keycloak/web';

function ProjectDetail() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, errors, reset } = useForm();

    const { id:stringId } = useParams();
    const id = parseInt(stringId, 10);

    const project = useSelector((state) => state.project.project);
    const[user, setUser] = useState({});
       
    const {keycloak} = useKeycloak();

    useEffect(() => {
        if (project.id != id || !user.username) {
            dispatch(getProjectById({id: id}))
            .then(result => {
                if (result.payload.userId) {
                    dispatch(getUserById(result.payload.userId))
                    .then(userResult => setUser(userResult.payload))
                    .catch(error => console.log("User fetch error: ", error));
                }
            })
            .catch(error => console.log("Project fetch error: ", error)); 
        }
    }, [id, project, dispatch, user]);
    

    if (!project) {
        return <p>Project not found.</p>;
    }

    const onSubmit = (data) => {
        console.log("prrr ", project)
        const comment = {
            id: null,
            text: data.comment,
            date: new Date(),
            userId: user.id,
            projectId: project.id
        };

        dispatch(
            addComment({
                comment: comment,
                projectId: project.id,
                token: keycloak.token
        }))
        reset();
    };

  return (
    <div>
        <p><strong>Owner: </strong>{user.username}</p>
        <p><strong>Title:</strong>{project.title}</p>
        <p><strong>Description: </strong>{project.descriptions}</p>
        <p><strong>Category:</strong> {project.category}</p>
        <p><strong>Status:</strong> {project.status?.split("_").join(" ") || 'N/A'}</p>

         <form onSubmit={handleSubmit(onSubmit)}>
            <textarea {...register("comment", {minLength: 3})}></textarea>
            {errors?.comment?.message && <p style={{color: 'red'}}>{errors.comment.message}</p>}
            <input type="submit" value="Add Comment" />
         </form>

        <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  )
}

export default ProjectDetail