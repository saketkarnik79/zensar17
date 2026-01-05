import { Project } from "./models/Project";
import { ProjectCard } from "./ProjectCard";
import { ProjectForm } from "./ProjectForm";
import { useState } from "react";

interface ProjectListProps{
    projects: Project[];
    //onSave: (project: Project) => void;
}

//function ProjectList({projects}: ProjectListProps) {
//function ProjectList({projects, onSave}: ProjectListProps) {
function ProjectList({projects}: ProjectListProps) {
    //const { projects } = props;
    const [projectBeingEdited, setProjectBeingEdited] = useState({});

    const handleEdit = (project: Project) => {
        //console.log(project);
        setProjectBeingEdited(project);
    };

    const cancelEditing = () => {
        setProjectBeingEdited({});
    };

    return (
        <>
            {/* <pre>
                { JSON.stringify(projects, null, ' ') }
            </pre> */}
            {/* <ul className="row">
                {
                    projects.map((project) => (
                        <li key={project.id} className="col-sm-12">
                            {project.name}
                        </li>
                    ))
                }
            </ul> */}

            <div className="row">
                {
                    projects.map((project) => (
                        <div key={project.id} className="cols-sm">
                            {/* <div className="card">
                                <img src={project.imageUrl} alt={project.name} />
                                <section className="section dark">
                                    <h5 className="strong">
                                        <strong>{project.name}</strong>
                                    </h5>
                                    <p>{project.description}</p>
                                    <p>Budget: {project.budget.toLocaleString()}</p>
                                </section>
                            </div> */}
                            {/* <ProjectCard project={project} /> */}
                            {/* <ProjectCard project={project} onEdit={handleEdit} />
                            <ProjectForm /> */}
                            {
                                project === projectBeingEdited 
                                //? (<ProjectForm />)
                                //? (<ProjectForm onCancel={cancelEditing} onSave={onSave} />)
                                // ? (<ProjectForm onCancel={cancelEditing} onSave={onSave} project={project} />)
                                ? (<ProjectForm onCancel={cancelEditing} project={project} />)
                                : (<ProjectCard project={project} onEdit={handleEdit} />)
                            }
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export { ProjectList };