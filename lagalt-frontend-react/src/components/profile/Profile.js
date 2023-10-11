import React, {useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserById, updateUser } from "../../api/userAPI";
import { getProjectById  } from "../../api/projectAPI";
import { getCollaboratorById, updateCollaboratorRequest, deleteCollaboratorRequest } from "../../api/collaboratorAPI";
import { setCurrentUserId } from "../../slices/projectSlice";
import { formatDate } from "../../utlilites";

import { useKeycloak } from "@react-keycloak/web";
import AddProject from "../project/AddProject";


const SKILLS = ["JAVA", "JAVASCRIPT", "REACT", "ANGULAR", "C"];


const Profile = () => {
    
    const dispatch = useDispatch();
    const { keycloak } = useKeycloak()

    const user = useSelector((state) => state.user.user);
    const userProjects = useSelector((state) => state.project.userProjects);
    const loading = useSelector((state) => state.user.loading);
    const error = useSelector((state) => state.user.error);
    const collaborator = useSelector((state) => state.collaborator.collaboratorsList);

    const { username, email, fullname, description, skills} = user;

    const[editDescription, setEditDescription] = useState(description)
    const[collaboratorUser, setCollaboratorUser] = useState({});
    const[selectedSkills, setSelectedSkills] = useState(new Set(skills))
    const [isEditing, setIsEditing] = useState(false); 

    useEffect(() => {
        if (user != null) {
            dispatch(setCurrentUserId(user.id))
            setEditDescription(description);
            setSelectedSkills(new Set(skills));
        }

    }, [description, skills]);

    useEffect(() => {
        dispatch(setCurrentUserId(user.id))

        user.projectIds.forEach(element => {
            dispatch(getProjectById({id: element}))
            .then(result => {
                result.payload.collaboratorIds.map(id=> {
                    dispatch(getCollaboratorById({id: id}))

                })
            })
        });           
    }, [user, loading, user.projectIds, dispatch, collaborator]);

    useEffect(() => {
        collaborator.forEach(collaborator => {
            if (!collaboratorUser[collaborator.userId]) {
                dispatch(getUserById(collaborator.userId))
                    .then(result => setCollaboratorUser(prev => ({
                        ...prev,
                        [collaborator.userId]: result.payload
                    })));
            }
        });
    }, [user,loading,collaborator, collaboratorUser, dispatch]);     

    const handleSkillChange = (skill) => {
        const newSkills = new Set(selectedSkills);

        if(newSkills.has(skill)){
            newSkills.delete(skill);
        }

        else{
            newSkills.add(skill);
        }

        setSelectedSkills(newSkills);
    }

    const handleSave = () => {
        const token = keycloak.token;

         dispatch(updateUser({
            id: user.id,
            userUpdateData: {
                description: editDescription,
                skills: [...selectedSkills]
            },
            token: token
         }));

        setIsEditing(false);
    }

    const handleAcceptCollaborator = (collabId) => {
        const collaborator = {
            id: collabId,
            status: "APPROVED"
        }

        dispatch(updateCollaboratorRequest({
            id: collabId,
            collaborator: collaborator,
            token: keycloak.token
        }))

        return;
    }

    if (!loading) {
        return <div>Loading...</div>;
    }

    if(error){
        return <div>Error : {error}</div>
    }

    const handleProjects = () => {
        if (!userProjects || userProjects.length === 0) {
            return <p>No projects Added.</p>;
        }

        return (userProjects.map((project) => (
           <ul key={project.id}>
            <li>
                <p><strong>Title: </strong>{project.title}</p>
                <p><strong>Description: </strong>{project.descriptions}</p>
                <p><strong>Category: </strong> {project.category}</p>
                <p><strong>Status: </strong> {project.status.split("_").join(" ") || 'N/A'} </p>
            </li>
           </ul>
        )));   
    }

    const handleCollaborator = () => {
        if (!collaborator || collaborator.length === 0) {
            return <p>No Collaborator Request.</p>;
        }

        const arr = userProjects.map(project=> project.collaboratorIds)

        
    
        return collaborator.map(collab => {
            
            const collabUser = collaboratorUser[collab.userId];
          
            if(!collabUser){
                return <div key={collab.id}> Loading Collaborator....</div>  // Add key here
            }

                
            const project = userProjects.find(project => project.id === collab.projectId);
            const projectTitle = project ? project.title : 'Unknown';

            const requestDate = formatDate(collaborator.find(c => c.id === collab.id).requestDate)
            

            if(collab.status === "PENDING"){    
                return (
                    
                    <div key={collab.id}>
                        <p><strong>Username: </strong>{collabUser.username}</p>
                        <p><strong>Project: </strong>{projectTitle}</p>
                        <p><strong>Request Date: </strong>{requestDate}</p>
                        <button onClick={() => handleAcceptCollaborator(collab.id)}>Accept</button>
                        <button onClick={() => dispatch(deleteCollaboratorRequest({id: collab.id, token: keycloak.token}))}>Decline</button>
                    </div>
                )
            }
        });
    }
    
    


    return (
        <div>
            <h4>Username: {username}</h4>
            <h4>Email: {email}</h4>
            <h4>Fullname: {fullname}</h4>
            <h4>Description: {description}</h4>
            {isEditing && <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />}

            <h4>Skills {skills.join(", ") || ' '}</h4>
            {isEditing && SKILLS.map(skill => (
                <div key={skill}>
                    <label>
                        <input type="checkbox" checked={selectedSkills.has(skill)} onChange={() => handleSkillChange(skill)} disabled={!isEditing}/>
                        {skill}
                    </label>
                </div>
            ))}

            {!isEditing ? (<button onClick={() => setIsEditing(true)}>Edit</button>) :
                (<button onClick={handleSave}>Save</button>)
            }

            <h2>Collaborator Request</h2>
            {handleCollaborator()}

            <h2>Your Projects</h2>
            {handleProjects()}

            <AddProject/>
        
        </div>
    )
};

export default Profile;
