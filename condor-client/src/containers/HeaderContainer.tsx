import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import * as Actions from "../actions/Actions";
import * as Reducers from "../reducers/Reducers";
import { ApplicationState } from "../reducers/State";

import Header from "../components/Header";

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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
