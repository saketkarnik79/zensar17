import { MOCK_PROJECTS } from "./MockProjects";
import { ProjectList } from "./ProjectList";
import { Project } from "./models/Project";
import { useState } from "react";

function ProjectsPage(){
    const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);

    const saveProject= (project: Project) => {
        //console.log(`Saving Project: ${project}`);
        const updatedProjects = projects.map((p: Project) => {
            return p.id === project.id ? project : p;
        });
        setProjects(updatedProjects);
    };

    return (
        <>
            <h1>
                Projects List
            </h1>
            <hr/>
            {/* <pre>
                { JSON.stringify(MOCK_PROJECTS, null, ' ') }
            </pre> */}
            {/* <ProjectList projects={MOCK_PROJECTS} /> */}
            {/* <ProjectList projects={MOCK_PROJECTS} onSave={saveProject} /> */}
            <ProjectList projects={projects} onSave={saveProject} />
        </>
    );
};

export { ProjectsPage };