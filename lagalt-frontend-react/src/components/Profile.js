import React, {useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../api/userAPI";
import { getProjectById } from "../api/projectAPI";
import { useKeycloak } from "@react-keycloak/web";
import AddProject from "./AddProject";


const SKILLS = ["JAVA", "JAVASCRIPT", "REACT", "ANGULAR", "C"];


const Profile = () => {
    
    const dispatch = useDispatch();
    const { keycloak } = useKeycloak()

    const user = useSelector((state) => state.user.user);
    const loading = useSelector((state) => state.user.loading);
    const error = useSelector((state) => state.user.error);

    const userProjects = useSelector((state) => state.project.userProjects);

    const { username, email, fullname, description, skills, projectIds } = user;


    const[editDescription, setEditDescription] = useState(description)
    const[selectedSkills, setSelectedSkills] = useState(new Set(skills))
    const [isEditing, setIsEditing] = useState(false); 

    useEffect(() => {
        if (user != null) {
            setEditDescription(description);
            setSelectedSkills(new Set(skills));
        }
    }, [description, skills]);

    useEffect(() => {
        if (loading && projectIds && projectIds.length > 0) {
            projectIds.forEach(element => {
                dispatch(getProjectById({id: element}))
            });
        }
    }, [loading, projectIds, dispatch]);

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
                <p><strong>Status: </strong> {project.status.split("_").join(" ")}</p>
            </li>
           </ul>
        )));
        
    }


    return (
        <div>
            <h4>Username: {username}</h4>
            <h4>Email: {email}</h4>
            <h4>Fullname: {fullname}</h4>
            <h4>Description: {description}</h4>
            {isEditing && <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />}

            <h4>Skills {skills.join(", ")}</h4>
            {isEditing && SKILLS.map(skill => (
                <div key={skill}>
                    <label>
                        <input type="checkbox" checked={selectedSkills.has(skill)} onChange={() => handleSkillChange(skill)} disabled={!isEditing}/>
                        {skill}
                    </label>
                </div>
            ))}
             
            <h2>Your Projects</h2>
            {handleProjects()}

            {!isEditing ? (<button onClick={() => setIsEditing(true)}>Edit</button>) :
                (<button onClick={handleSave}>Save</button>)
            }

            <AddProject/>
        
        </div>
    )
};

export default Profile;
