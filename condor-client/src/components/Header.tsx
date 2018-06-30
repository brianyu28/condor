import * as React from "react";

import "../css/Header.css";

interface Props {
    username?: string;
    token?: string;

    logout: () => void;
}

class Header extends React.Component<Props> {

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
        return (
            <div id="header">
                <img id="appLogo" src={"/assets/img/CondorSmall.png"} />
                <div id="title">
                    Condor
                </div>
                <div className="controls">
                    {this.props.username}
                    <button className="btn-small" onClick={this.props.logout}>Log Out</button>
                </div>
            </div>
        );
    }
}

export default Header;
