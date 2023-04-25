import {applyMiddleware, combineReducers} from "redux";
import {configureStore} from '@reduxjs/toolkit'
import userReducer from "./userReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    user: userReducer
})

export const store = configureStore({reducer: rootReducer}, applyMiddleware(thunk))

