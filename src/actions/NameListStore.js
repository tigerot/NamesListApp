import { configureStore } from '@reduxjs/toolkit';
import { reducers } from "../reducers/CombineReducers";
import thunk from "redux-thunk";


export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()

    }
)