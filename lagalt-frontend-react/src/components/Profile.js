import React, {useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../api/userAPI";
import { useKeycloak } from "@react-keycloak/web";


const SKILLS = ["JAVA", "JAVASCRIPT", "REACT", "ANGULAR", "C"];


const Profile = () => {
    
    const dispatch = useDispatch();
    const { keycloak } = useKeycloak()

    const user = useSelector((state) => state.user.user);
    const loading = useSelector((state) => state.user.loading);
    const error = useSelector((state) => state.user.error);

    const { username, email, fullname, description, skills } = user;


    const[editDescription, setEditDescription] = useState(description)
    const[selectedSkills, setSelectedSkills] = useState(new Set(skills))
    const [isEditing, setIsEditing] = useState(false); 

    useEffect(() => {
        if (user != null) {
            setEditDescription(description);
            setSelectedSkills(new Set(skills));
        }
    }, [description, skills]);

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


    return (
        <div>
            <h4>Username: {username}</h4>
            <h4>Email: {email}</h4>
            <h4>Fullname: {fullname}</h4>
            <h4>Description: {description}</h4>
            {isEditing && <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />}

            {SKILLS.map(skill => (
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
        
        </div>
    )
};

export default Profile;
