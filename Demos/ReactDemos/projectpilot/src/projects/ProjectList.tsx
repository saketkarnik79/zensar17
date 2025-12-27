import { Project } from "./models/Project";
import { ProjectCard } from "./ProjectCard";
import { ProjectForm } from "./ProjectForm";

interface ProjectListProps{
    projects: Project[];
}

function ProjectList({projects}: ProjectListProps) {
    //const { projects } = props;
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
                            <ProjectCard project={project} />
                            <ProjectForm />
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export { ProjectList };