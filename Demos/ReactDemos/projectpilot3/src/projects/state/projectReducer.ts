import { type ProjectState, type ProjectActionTypes,
    LOAD_PROJECTS_REQUEST,
    LOAD_PROJECTS_SUCCESS,
    LOAD_PROJECTS_FAILURE,
    SAVE_PROJECT_REQUEST,
    SAVE_PROJECT_SUCCESS,
    SAVE_PROJECT_FAILURE
 } from "./projectTypes";
import { Project } from "../models/Project";

const initialProjectState: ProjectState ={
    projects: [],
    loading: false,
    error: undefined,
    page: 1
};

function projectReducer(state: ProjectState = initialProjectState, action: ProjectActionTypes)
    : ProjectState{
    switch(action.type){
        case LOAD_PROJECTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case LOAD_PROJECTS_SUCCESS: {
            let projects: Project[];
            const { page } = action.payload;
            if(page === 1){
                projects = action.payload.projects;
            } else {
                projects =[...state.projects, ...action.payload.projects]
            }
            return {
                ...state,
                loading: false,
                projects,
                page,
                error:''
            };
        }
        case LOAD_PROJECTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.message
            };
        case SAVE_PROJECT_REQUEST:
            return {
                ...state
            };
        case SAVE_PROJECT_SUCCESS:
            if(action.payload.isNew) {
                return {
                   ...state,
                   projects: [...state.projects, action.payload.project]
                };
            } else {
                return {
                     ...state,
                    projects: state.projects.map ((project: Project) => 
                        project.id === action.payload.id
                        ? Object.assign({}, project, action.payload)
                        : project
                    )
                }
            };
        case SAVE_PROJECT_FAILURE:
            return {
                ...state,
                error: action.payload.message
            };
        default:
            return state;
    };
};

export {initialProjectState, projectReducer};