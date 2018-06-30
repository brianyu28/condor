import { createAction } from "redux-actions";

export const LOGIN = createAction('LOGIN', (username: string, token: string) => ({ username, token }));
export const LOGOUT = createAction('LOGOUT', () => ({}));
