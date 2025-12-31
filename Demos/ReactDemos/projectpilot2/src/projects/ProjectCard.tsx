import { Project } from "./models/Project";
//import { Link } from "react-router";

function formatDescription(description:string): string{
    return description.substring(0, 60) + '...';
}

interface ProjectCardProps{
    project: Project,
    onEdit: (project: Project) => void
}

//function ProjectCard({project}: ProjectCardProps){
function ProjectCard({project, onEdit}: ProjectCardProps){
    const handleEditClick = (projectBeingEdited: Project) => {
        //console.log(projectBeingEdited);
        onEdit(projectBeingEdited);
    };
    
    return (
        <div className="card">
            <img src={project.imageUrl} alt={project.name} />
            <section className="section dark">
                <a href={ `/projects/${project.id}` }>
                    <h5 className="strong">
                        <strong>{project.name}</strong>
                    </h5>
                    <p>{formatDescription(project.description)}</p>
                    <p>Budget: {project.budget.toLocaleString()}</p>
                </a>
                <button className="button bordered" onClick={() => {
                    handleEditClick(project);
                }}>
                    <span className="icon-edit"></span>
                    Edit
                </button>
            </section>
        </div>
    );
};

export { ProjectCard };