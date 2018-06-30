import * as React from "react";

import LoginFormContainer from "../containers/LoginFormContainer";

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
                <div className="unauthenticated-app">
                    <h1>Condor</h1>
                    <LoginFormContainer />
                </div>
            );
        } else {
            return (
                <div>
                    <div>
                        User is logged in.
                    </div>
                    <button onClick={this.logout}>Log Out</button>
                </div>
            );
        }
    }
}

export default App;
