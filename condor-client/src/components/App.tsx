import * as React from "react";

import LoginFormContainer from "../containers/LoginFormContainer";

import "../css/App.css";

interface Props {
    username?: string;
    token?: string;

    logout: () => void;
}

class App extends React.Component<Props> {

    constructor(props: Props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    logout() {
        fetch("/api/authentication/logout", {
            method: "POST",
            body: JSON.stringify({
                username: this.props.username,
                token: this.props.token
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            this.props.logout();
        });
    }

    render() {
        if (this.props.username === undefined) {
            return (
                <LoginFormContainer />
            );
        } else {
            return (
                <div className="app">
                    <div>
                        User {this.props.username} is logged in.
                    </div>
                    <button onClick={this.logout}>Log Out</button>
                </div>
            );
        }
    }
}

export default App;
