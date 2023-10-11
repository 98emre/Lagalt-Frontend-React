
import React, {useState, useEffect} from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useKeycloak } from '@react-keycloak/web';

import { getProjectById,getProjectPendingCollaborator } from '../../api/projectAPI';
import { getUserById } from '../../api/userAPI';
import { addComment, getAllCommentsByProjectId } from "../../api/commentAPI";
import { sendCollaboratorRequest,getCollaborators } from '../../api/collaboratorAPI';


import { formatDate } from '../../utlilites';

function ProjectDetail() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, errors, reset } = useForm();
    const {keycloak} = useKeycloak();

    const { id:stringId } = useParams();
    const id = parseInt(stringId, 10);

    const user = useSelector((state) => state.user.user);
    const project = useSelector((state) => state.project.project);
    const comments = useSelector((state) => state.comment.commentList);
    const commentUsernames = useSelector((state) => state.comment.commentUsers)
    const collaborator = useSelector((state) => state.collaborator.collaboratorsList);
    
    const[owner, setOwner] = useState({});
    const [sendComment, setSendComment] = useState(false);

    const [collaboratorRequest, setCollaboratorRequest] = useState(false);
    const [motivationText, setMotivationText] = useState(''); 
    
    useEffect(() => {
        if (project.id != id || !owner.username) {
            dispatch(getProjectById({id: id}))
            .then(result => {                
                dispatch(getUserById(result.payload.userId))
                .then(result => setOwner(result.payload))
            })

            dispatch(getAllCommentsByProjectId({id: id, token: keycloak.token}));
        }
    }, [id, project, dispatch, owner,commentUsernames]);


    useEffect(() => {
        comments.forEach(comment => {
            dispatch(getUserById(comment.userId))
        })

    }, [comments, commentUsernames, dispatch])
    
    useEffect(() => {
        dispatch(getCollaborators())

    }, [dispatch, collaborator,project, id])


    const getUsernameByUserId = (userId) => {
        const user = commentUsernames.find(user => user.id === userId);
        return user ? user.username : "Loading...";
    }

    const checkCollaboratorStatus = () => {
        const collaboratorObj =  collaborator.flat().find(c => c.userId === user.id && c.projectId === project.id)
        return collaboratorObj ? collaboratorObj.status : null;
    }
    

    const onSubmit = (data) => {
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
        
        setSendComment(false);
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
                            {getUsernameByUserId(comment.userId)}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    const handleCollaborators = () => {
        const collaborator = {
            id: null,
            status: "PENDING",
            requestDate: new Date(),
            approvalDate: null,
            motivation: motivationText,
            userId: owner.id,
            project: project.d
        }
        
        dispatch(
            sendCollaboratorRequest({
                projectId: project.id,
                collaborator: collaborator,
                token: keycloak.token
            }))
            
        setCollaboratorRequest(false);
    }

    const collaboratorStatus = checkCollaboratorStatus();

  return (
    <div>
        <p><strong>Owner: </strong>{owner.username}</p>
        <p><strong>Title:</strong>{project.title}</p>
        <p><strong>Description: </strong>{project.descriptions}</p>
        <p><strong>Category:</strong> {project.category}</p>
        <p><strong>Status:</strong> {project.status?.split("_").join(" ") || 'N/A'}</p>

        { owner.username !== user.username &&  collaboratorStatus === null &&
             (collaboratorRequest ? (
                    <div>                    
                        <h3>Send Request</h3>
                        <textarea value={motivationText} onChange={(e) => setMotivationText(e.target.value)} placeholder="Write your text..."></textarea>
                        <button onClick={handleCollaborators}>Send</button>
                        <button onClick={()=> setCollaboratorRequest(false)}>Close</button>
                    </div>
            ) : <button onClick={() => setCollaboratorRequest(true)}>Collaborator Request</button>
)       }

        { collaboratorStatus && <p>Your request status: {collaboratorStatus}</p> }

        {sendComment ? (<form onSubmit={handleSubmit(onSubmit)}>
            <textarea {...register("comment")}></textarea>
            {errors?.comment?.message && <p style={{color: 'red'}}>{errors.comment.message}</p>}
            <button type='submit'>Send Comment</button>
            <button onClick={() => setSendComment(false)}>Close Comment</button>

            </form> ) : <button onClick={() => setSendComment(true)}>Add Comment</button>
        }

        {handleComments()}

        <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  )
}

export default ProjectDetail