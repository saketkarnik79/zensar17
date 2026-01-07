import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from './features/api/apiSlice';

const store = configureStore({
    reducer: {
        [api.reducerPath] : api.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});

setupListeners(store.dispatch);

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export type{RootState, AppDispatch};
export {store};