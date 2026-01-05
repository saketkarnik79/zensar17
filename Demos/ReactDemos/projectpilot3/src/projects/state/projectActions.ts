import { type Action } from "redux";
import { type ThunkAction } from "redux-thunk";
import { projectAPI } from "../services/projectAPI";
import { Project } from "../models/Project";

import {
    LOAD_PROJECTS_REQUEST,
    LOAD_PROJECTS_SUCCESS,
    LOAD_PROJECTS_FAILURE,
    SAVE_PROJECT_REQUEST,
    SAVE_PROJECT_SUCCESS,
    SAVE_PROJECT_FAILURE,
    type ProjectState
} from './projectTypes';

function loadProjects(page: number): ThunkAction<void, ProjectState, null, Action<string>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (dispatch: any) => {
        dispatch({type: LOAD_PROJECTS_REQUEST});
        return projectAPI.get(page)
            .then((data) => {
                //console.log(data);
                //const plainProjects = data.map(project => ({ ...project }));
                const plainProjects = data.map(project => ({
                ...project,
                // Convert Date objects to ISO string representation
                contractSignedOn: project.contractSignedOn instanceof Date
                    ? project.contractSignedOn.toISOString()
                    : project.contractSignedOn,
                }));

                dispatch({type: LOAD_PROJECTS_SUCCESS, payload: {projects: plainProjects, page }});
            })
            .catch((error) => {
                dispatch({type: LOAD_PROJECTS_FAILURE, payload: error});
            })
    };
};

function saveProject(project: Project): ThunkAction<void, ProjectState, null, Action<string>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (dispatch: any) => {
        dispatch({type: SAVE_PROJECT_REQUEST});
        return projectAPI.put(project)
            .then((data) => {
                dispatch({type: SAVE_PROJECT_SUCCESS, payload: data });
            })
            .catch((error) => {
                dispatch({type: SAVE_PROJECT_FAILURE, payload: error});
            })
    };
};

export { loadProjects, saveProject};