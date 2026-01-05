import { Project } from "../models/Project";

//Action Types
const LOAD_PROJECTS_REQUEST = "LOAD_PROJECTS_REQUEST";
const LOAD_PROJECTS_SUCCESS = "LOAD_PROJECTS_SUCCESS";
const LOAD_PROJECTS_FAILURE = "LOAD_PROJECTS_FAILURE";

const SAVE_PROJECT_REQUEST = "SAVE_PROJECT_REQUEST";
const SAVE_PROJECT_SUCCESS = "SAVE_PROJECT_SUCCESS";
const SAVE_PROJECT_FAILURE = "SAVE_PROJECT_FAILURE";

interface LoadProjectsRequest{
    type: typeof LOAD_PROJECTS_REQUEST;
};

interface LoadProjectsSuccess {
    type: typeof LOAD_PROJECTS_SUCCESS;
    payload: { projects: Project[], page: number };
};

interface LoadProjectsFailure{
    type: typeof LOAD_PROJECTS_FAILURE;
    payload: { message: string}
};

interface SaveProjectRequest{
    type: typeof SAVE_PROJECT_REQUEST;
};

interface SaveProjectSuccess {
    type: typeof SAVE_PROJECT_SUCCESS;
    payload: { project: Project };
};

interface SaveProjectFailure{
    type: typeof SAVE_PROJECT_FAILURE;
    payload: { message: string}
};

interface ProjectState {
    projects: Project[];
    loading: boolean;
    error: string | undefined;
    page: number;
}

export { LOAD_PROJECTS_REQUEST,
    LOAD_PROJECTS_SUCCESS,
    LOAD_PROJECTS_FAILURE,
    SAVE_PROJECT_REQUEST,
    SAVE_PROJECT_SUCCESS,
    SAVE_PROJECT_FAILURE
};

export type ProjectActionTypes = LoadProjectsRequest | 
    LoadProjectsSuccess |
    LoadProjectsFailure |
    SaveProjectRequest |
    SaveProjectSuccess |
    SaveProjectFailure;

export { type ProjectState };