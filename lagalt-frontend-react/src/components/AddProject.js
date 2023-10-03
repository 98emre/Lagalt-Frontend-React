

import React, {useState} from 'react'
import { addProject } from '../api/projectAPI'
import { useDispatch, useSelector } from 'react-redux';
import { useKeycloak } from '@react-keycloak/web';

function AddProject() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    
    const {keycloak} = useKeycloak();

    const[title, setTitle] = useState("");
    const[descriptions, setDescriptions] = useState("");
    const[gitlink, setGitLink] = useState("");
    const[category, setCategory] = useState("");
    const[status, setStatus] = useState("NOT_STARTED");

 


    const handleSubmit = (e) => {
        e.preventDefault();

        const newProject = {
            title,
            descriptions,
            gitlink,
            category,
            status,
            user
        }
        console.log('Suss ', newProject);


        dispatch(
            addProject({
                project: newProject,
                token: keycloak.token
            }));

        setTitle("");
        setDescriptions("");
        setGitLink("");
        setCategory("");
    }


  return (
    <div>
            <h2>Add New Project</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                
                <div>
                    <label>Description:</label>
                    <textarea
                        value={descriptions}
                        onChange={(e) => setDescriptions(e.target.value)}
                    />
                </div>

                <div>
                    <label>Git Link:</label>
                    <input
                        type="text"
                        value={gitlink}
                        onChange={(e) => setGitLink(e.target.value)}
                    />
                </div>

                <div>
                    <label>Category:</label>
                    <label><input type="radio" name="category" value="MUSIC" onChange={(e) => setCategory(e.target.value)} /> MUSIC</label>
                    <label><input type="radio" name="category" value="FILM" onChange={(e) => setCategory(e.target.value)} /> FILM</label>
                    <label><input type="radio" name="category" value="GAME" onChange={(e) => setCategory(e.target.value)} /> GAME</label>
                    <label><input type="radio" name="category" value="WEB" onChange={(e) => setCategory(e.target.value)} /> WEB</label>
                </div>

                <button type="submit">Add Project</button>
            </form>
        </div>
  )
}

export default AddProject