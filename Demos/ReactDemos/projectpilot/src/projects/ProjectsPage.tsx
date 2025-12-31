//import { MOCK_PROJECTS } from "./MockProjects";
import { ProjectList } from "./ProjectList";
import { Project } from "./models/Project";
import { useState, useEffect } from "react";
import { projectAPI } from "./services/projectAPI";

function ProjectsPage(){
    //const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        setLoading(true);
        //projectAPI.get(1)
        projectAPI.get(currentPage)
            .then((data) => {
                setError(undefined);
                //setProjects(data);
                if(currentPage === 1){
                    setProjects(data);
                } else {
                    setProjects((projects) => {
                        return [...projects, ...data]
                    })
                }
            })
            .catch((error) => {
                console.error(error);
                if(error instanceof Error){
                    setError(error.message);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    //}, []);
    }, [currentPage]);

    const handleMoreClick = () => {
        setCurrentPage((currentPage) => {
            return currentPage + 1;
        });
    };

    const saveProject= (project: Project) => {
        //console.log(`Saving Project: ${project}`);
        // const updatedProjects = projects.map((p: Project) => {
        //     return p.id === project.id ? project : p;
        // });
        // setProjects(updatedProjects);
        projectAPI.put(project)
            .then((updatedProject) => {
                    const updatedProjects = projects.map((p: Project) => {
                    return p.id === project.id ? new Project(updatedProject) : p;
                });
                setProjects(updatedProjects);
            })
            .catch((error) => {
                if(error instanceof Error){
                    setError(error.message);
                }
            });
    };

    return (
        <>
            {/* <h1>
                Projects List
            </h1>
            <hr/> */}
            {
                error && (
                    <div className="row">
                        <div className="card large error">
                            <section>
                                <p>
                                    <span className="icon-alert inverse"></span>
                                    { error }
                                </p>
                            </section>
                        </div>
                    </div>
                )
            }
            {/* <pre>
                { JSON.stringify(MOCK_PROJECTS, null, ' ') }
            </pre> */}
            {/* <ProjectList projects={MOCK_PROJECTS} /> */}
            {/* <ProjectList projects={MOCK_PROJECTS} onSave={saveProject} /> */}
            <ProjectList projects={projects} onSave={saveProject} />

            {
                !loading && !error && (
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="button-group fluid">
                                <button className="button primary" onClick={handleMoreClick}>
                                    More Projects...
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                loading && (
                    <div className="center-page">
                        <span className="spinner primary"></span>
                        <p>Loading...</p>
                    </div>
                )
            }
        </>
    );
};

export { ProjectsPage };