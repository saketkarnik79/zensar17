import { useState, useEffect } from "react";
import { projectAPI } from "./services/projectAPI";
import { Project } from "./models/Project";
import { ProjectDetail } from "./ProjectDetail";
import { useParams } from "react-router";

function ProjectPage(){
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const params = useParams();
    const id = Number(params.id);

    useEffect(() => {
        setLoading(true);
        projectAPI.find(id)
            .then((data) => {
                setProject(data);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [id]);

    return (
        <>
            <div>
                <h3>Project Detail</h3>
                {
                    loading && (
                        <div className="center-page">
                            <span className="spinner primary"></span>
                            <p>
                                Loading...
                            </p>
                        </div>
                    )
                }
                <div className="row">
                    {
                        error && (
                            <div className="card large error">
                                <section>
                                    <p>
                                        <span className="icon-alert inverse"></span>
                                        { error }
                                    </p>
                                </section>
                            </div>
                        )
                    }
                </div>
                {
                    project && (
                        <ProjectDetail project= { project } />
                    )
                }
            </div>
        </>
    );
}
export { ProjectPage };