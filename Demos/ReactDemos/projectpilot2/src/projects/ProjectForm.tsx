import { Project } from "./models/Project";
import { type SyntheticEvent, useState } from "react";
import './ProjectForm.css';

interface ProjectFormProps{
    project: Project;
    onCancel: () => void;
    onSave: (project: Project) => void;
}

//function ProjectForm() {
//function ProjectForm({onCancel}: ProjectFormProps) {
//function ProjectForm({onCancel, onSave}: ProjectFormProps) {
function ProjectForm({onCancel, onSave, project: initialProject}: ProjectFormProps) {
    const [project, setProject] = useState(initialProject)
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        budget: ''
    });

    function validate(project: Project){
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errors: any = {name: '', description: '', budget: ''};
        if(project.name.length === 0){
            errors.name = 'Name is required.';
        }
        if(project.name.length > 0 && project.name.length < 3){
            errors.name = 'Name needs to be tleast 3 characters in length.';
        }
        if(project.description.length === 0){
            errors.description = 'Description is required.';
        }
        if(project.budget === 0){
            errors.budget = 'Budget must be more than $0.';
        }
        return errors;
    }

    function isValid():boolean{
        return (
            errors.name.length === 0 &&
            errors.description.length === 0 &&
            errors.budget.length === 0
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (event: any) => {
        const { type, name, value, checked } = event.target;
        //If input type is checkbox then read the checked property
        //Otherwise the type could be 'text', 'number', etc. so use value property in that case
        let updatedValue = type==='checkbox' ? checked : value;

        //If input type is number then convert the updatedValue to a numbe
        if(type==='number'){
            updatedValue = Number(updatedValue);
        }
        const change= {
            [name] : updatedValue
        };

        let updatedProject: Project;
        setProject((p) => {
            updatedProject = new Project({...p, ...change});
            return updatedProject;
        });
        setErrors(() => {
            return validate(updatedProject);
        });
    };

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        //onSave(new Project({name: 'Updated Project'}));
        //onSave(project);
        if(!isValid()){
            return;
        }
        onSave(project);
    };

    return (
        <>
            <form className="input-group vertical" onSubmit={handleSubmit}>
                <label htmlFor="name">Project Name</label>
                <input type="text" name="name" id="name" placeholder="Enter Project Name" 
                    value = {project.name} onChange={handleChange}/>
                {
                    errors.name.length > 0 && (
                        <div className="card error">
                            <p>{errors.name}</p>
                        </div>
                    )
                }

                <label htmlFor="description">Project Description</label>
                <textarea name="description" id="description" placeholder="Enter Project Description"
                    value = {project.description} onChange={handleChange} ></textarea>
                {
                    errors.description.length > 0 && (
                        <div className="card error">
                            <p>{errors.description}</p>
                        </div>
                    )
                }

                <label htmlFor="budget">Project Budget</label>
                <input type="number" name="budget" id="budget" placeholder="Enter Project Budget" 
                    value = {project.budget} onChange={handleChange}/>
                {
                    errors.budget.length > 0 && (
                        <div className="card error">
                            <p>{errors.budget}</p>
                        </div>
                    )
                }

                <label htmlFor="isActive">Project Active?</label>
                <input type="checkbox" name="isActive" id="isActive" placeholder="Is Project Active?" 
                    checked = {project.isActive} onChange={handleChange}/>

                <div className="input-group">
                    <button type="submit" className="button primary bordered medium" disabled={!isValid()}>Save</button>
                    <span/>
                    <button type="button" className="button bordered medium" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </>
    );
};

export { ProjectForm };