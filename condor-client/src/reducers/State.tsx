export interface ApplicationState {
    authentication: {
        username?: string;
        token?: string;
    };
}

export const defaultState: ApplicationState = {
    authentication: {
        username: undefined,
        token: undefined
    }
};
