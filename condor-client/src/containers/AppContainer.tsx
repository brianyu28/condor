import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from "../actions/Actions";
import * as Reducers from "../reducers/Reducers";
import { ApplicationState, defaultState } from "../reducers/State";

import App from "../components/App";

export function mapStateToProps(state: ApplicationState) {
  return {
      username: state.authentication.username,
      token: state.authentication.token
  };
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        logout: () => { dispatch(Actions.LOGOUT()); }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
