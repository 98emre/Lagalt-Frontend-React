import React, {useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserById, updateUser } from "../../api/userAPI";
import { getProjectById, fetchProjects, getProjectPendingCollaborator } from "../../api/projectAPI";
import { getCollaboratorById } from "../../api/collaboratorAPI";
import { setCurrentUserId } from "../../slices/projectSlice";

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
    }, [collaborator, collaboratorUser]);
    

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
        if (collaborator.length === 0) {
            return <p>No Collaborator Request.</p>;
        }
    
        return collaborator.map(collab => {
            const collabUser = collaboratorUser[collab.userId];
          
            if(!collabUser){
                return <div> Loading Collaborator....</div>
            }

            return (
                <div key={collab.id}>
                    <p>{collabUser.username}</p>
                    <button>Accept</button>
                    <button>Decline</button>
                </div>
            )
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
