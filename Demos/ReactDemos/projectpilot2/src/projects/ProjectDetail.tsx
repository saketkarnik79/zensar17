import { Project } from "./models/Project";

interface ProjectDetailProps{
    project: Project;
}

function ProjectDetail({ project }: ProjectDetailProps){
    return (
        <div className="row">
            <div className="col-sm-6">
                <div className="card large">
                    <img src = {project.imageUrl} alt = {project.name} className="rounded" />
                    <section className="section dark">
                        <h3 className="strong">
                            <strong>{project.name}</strong>
                        </h3>
                        <p>
                            {project.description}
                        </p>
                        <p>Contract Signed On: {project.contractSignedOn.toLocaleDateString()}</p>
                        <p>
                            <mark className="active">
                                {' '}
                                { project.isActive ? 'Active' : 'Inactive' }
                            </mark>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
export { ProjectDetail };