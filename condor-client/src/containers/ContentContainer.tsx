import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import * as Actions from "../actions/Actions";
import * as Reducers from "../reducers/Reducers";
import { ApplicationState } from "../reducers/State";

import Content from "../components/Content";

export function mapStateToProps(state: ApplicationState) {
  return {
      username: state.authentication.username,
      token: state.authentication.token
  };
}

export default connect(mapStateToProps, null)(Content);
