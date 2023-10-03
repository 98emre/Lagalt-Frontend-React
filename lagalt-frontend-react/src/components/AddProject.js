

import React from 'react'
import { useForm } from "react-hook-form";
import { addProject } from '../api/projectAPI'
import { useDispatch, useSelector } from 'react-redux';
import { useKeycloak } from '@react-keycloak/web';

function AddProject() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    
    const {keycloak} = useKeycloak();

 
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        const newProject = {
            ...data,
            status: "NOT_STARTED",
            user
        }

        console.log('Submitted Data: ', newProject);

        dispatch(
            addProject({
                project: newProject,
                token: keycloak.token
            }));
        
        reset();
    }


  return (
    <div>
            <h2>Add New Project</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Title:</label>
                    <input {...register("title", { required: "Title is required" })} />
                    {errors.title && <p style={{color: 'red'}}>{errors.title.message}</p>}
                </div>
                
                <div>
                    <label>Description:</label>
                    <textarea{...register("descriptions", {required: "Descriptions is required", length: 10})}/>
                     {errors.descriptions && <p style={{color: 'red'}}>{errors.descriptions.message}</p>}
                </div>

                <div>
                    <label>Git Link:</label>
                    <input {...register("gitlink", { required: "Gitlin is required", length: 10})} />
                    {errors.gitlink && <p style={{color: 'red'}}>{errors.gitlink.message}</p>}
                    
                </div>

                <div>
                    <label>Category:</label>
                    <label><input type="radio" {...register("category", { required: "Category is required" })} value="MUSIC" /> MUSIC</label>
                    <label><input type="radio" {...register("category")} value="FILM" /> FILM</label>
                    <label><input type="radio" {...register("category")} value="GAME" /> GAME</label>
                    <label><input type="radio" {...register("category")} value="WEB" /> WEB</label>
                    {errors.category && <p style={{color: 'red'}}>{errors.category.message}</p>}

                </div>

                <button type="submit">Add Project</button>
            </form>
        </div>
  )
}

export default AddProject