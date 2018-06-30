import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as Actions from "../actions/Actions";
import * as Reducers from "../reducers/Reducers";
import { ApplicationState } from "../reducers/State";

import Login from "../components/LoginForm";

export function mapStateToProps(state: ApplicationState) {
  return {};
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        addLoginToken: (username: string, token: string) => {
            dispatch(Actions.LOGIN(username, token));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
