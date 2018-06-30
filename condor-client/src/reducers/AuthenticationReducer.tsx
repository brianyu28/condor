import { combineActions, handleActions } from "redux-actions";

import * as Actions from "../actions/AuthenticationActions";
import { ApplicationState } from "./State";

export const authenticationReducer = {
    [Actions.LOGIN.toString()]: (state: ApplicationState, { payload }: any) => {
        return {
            ...state,
            authentication: {
                ...state.authentication,
                username: payload.username,
                token: payload.token
            }
        };
    },

    [Actions.LOGOUT.toString()]: (state: ApplicationState, { payload }: any) => {
        return {
            ...state,
            authentication: {
                username: undefined,
                token: undefined
            }
        };
    }

};
