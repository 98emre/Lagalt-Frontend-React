
import React, {useState, useEffect} from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectById } from '../../api/projectAPI';
import { getUserById } from '../../api/userAPI';

import { useForm } from 'react-hook-form';
import {addComment, getCommentById} from "../../api/commentAPI";
import { useKeycloak } from '@react-keycloak/web';
import { formatDate } from '../../utlilites';

function ProjectDetail() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, errors, reset } = useForm();

    const { id:stringId } = useParams();
    const id = parseInt(stringId, 10);

    const project = useSelector((state) => state.project.project);
    const loading = useSelector((state) => state.project.loading);
    const error = useSelector((state) => state.project.error);
    const comments = useSelector((state) => state.comment.projectCommentList);
    
    const[owner, setOwner] = useState({});
    const[commentUsers, setCommentUser] = useState({})
    

    const {keycloak} = useKeycloak();

    const fetchCommentUsers = (commentIds) => {
        dispatch(getCommentById({ids: commentIds}))
            .then(result => {
                result.payload.forEach(comment => {
                    dispatch(getUserById(comment.userId))
                        .then(userResult => {
                            setCommentUser(prevState => ({
                                ...prevState,
                                [comment.id]: userResult.payload.username
                            }));
                        });
                });
            });
    };

    useEffect(() => {
        if (project.id != id || !owner.username) {
            dispatch(getProjectById({id: id}))
            .then(result => {

                if (result.payload.userId) {
                    dispatch(getUserById(result.payload.userId))
                    .then(userResult => setOwner(userResult.payload))
                    .catch(error => console.log("User fetch error: ", error));
                }

                if(result.payload.commentIds){
                   fetchCommentUsers(result.payload.commentIds)
                }
                
            })
            .catch(error => console.log("Project fetch error: ", error)); 
        }
    }, [id, project, dispatch, owner,commentUsers]);
    
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (!project) {
        return <p>Project not found.</p>;
    }

    const onSubmit = (data) => {
        const comment = {
            id: null,
            text: data.comment,
            date: new Date(),
            userId: owner.id,
            projectId: project.id
        };

        dispatch(
            addComment({
                comment: comment,
                projectId: project.id,
                token: keycloak.token
        }))
        .then(result => {
            setCommentUser(prevState => ({
                ...prevState,
                [result.payload.id]: owner.username
            }));
        });
        
        reset();
    };

    const handleComments = () => {
        if (!comments || comments.length === 0) {
            return <p>No comments available.</p>;
        }

        return (
            <div>
                <h3>Comments</h3>
                <ul>
                    {comments.map(comment => (
                        <li key={comment.id}>
                            {comment.text + " "}
                            {formatDate(comment.date) + " "}
                            {commentUsers[comment.id] || "Loading..."}
                        </li>
                    ))}
                </ul>
            </div>
        );

    }

  return (
    <div>
        <p><strong>Owner: </strong>{owner.username}</p>
        <p><strong>Title:</strong>{project.title}</p>
        <p><strong>Description: </strong>{project.descriptions}</p>
        <p><strong>Category:</strong> {project.category}</p>
        <p><strong>Status:</strong> {project.status?.split("_").join(" ") || 'N/A'}</p>

         <form onSubmit={handleSubmit(onSubmit)}>
            <textarea {...register("comment", {minLength: 3})}></textarea>
            {errors?.comment?.message && <p style={{color: 'red'}}>{errors.comment.message}</p>}
            <input type="submit" value="Add Comment" />
         </form>

         {handleComments()}

        <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  )
}

export default ProjectDetail