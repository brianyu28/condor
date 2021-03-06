import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

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

export default connect(mapStateToProps, null)(App);
