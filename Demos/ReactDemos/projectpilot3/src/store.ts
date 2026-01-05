import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { initialProjectState, projectReducer } from './projects/state/projectReducer';
import { type ProjectState } from './projects/state/projectTypes';

const rootReducer = combineReducers({
    projectState: projectReducer
});

type AppState ={
    projectState: ProjectState
};

const initialAppState: AppState = {
    projectState: initialProjectState
};

const store = configureStore({
    reducer: rootReducer,
    preloadedState: {}
});

export { store, initialAppState, type AppState };