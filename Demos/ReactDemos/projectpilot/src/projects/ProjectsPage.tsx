import { MOCK_PROJECTS } from "./MockProjects";
import { ProjectList } from "./ProjectList";

function ProjectsPage(){
    return (
        <>
            <h1>
                Projects List
            </h1>
            <hr/>
            {/* <pre>
                { JSON.stringify(MOCK_PROJECTS, null, ' ') }
            </pre> */}
            <ProjectList projects={MOCK_PROJECTS} />
        </>
    );
};

export { ProjectsPage };