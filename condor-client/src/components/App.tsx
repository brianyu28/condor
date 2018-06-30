import * as React from "react";

import LoginFormContainer from "../containers/LoginFormContainer";
import HeaderContainer from "../containers/HeaderContainer";
import ContentContainer from "../containers/ContentContainer";

import "../css/App.css";

interface Props {
    username?: string;
    token?: string;
}

class App extends React.Component<Props> {

    render() {
        if (this.props.username === undefined) {
            return (
                <LoginFormContainer />
            );
        } else {
            return (
                <div className="app">
                    <HeaderContainer />
                    <ContentContainer />
                </div>
            );
        }
    }
}

export default App;
