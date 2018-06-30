import { combineActions, handleActions } from "redux-actions";

import * as Actions from "../actions/Actions";
import { defaultState } from "./State";

import { authenticationReducer } from "./AuthenticationReducer";

export const reducer = handleActions(
    {
        ...authenticationReducer,
    },
    defaultState
);
