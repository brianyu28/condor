import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import * as Actions from "../actions/Actions";
import * as Reducers from "../reducers/Reducers";
import { ApplicationState } from "../reducers/State";

import ProjectsView from "../components/ProjectsView";

export function mapStateToProps(state: ApplicationState) {
    return {
        authentication: { ...state.authentication }       
    };
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        logout: () => { dispatch(Actions.LOGOUT()); }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsView);
