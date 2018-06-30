import * as React from "react";

interface Props {
    addLoginToken: (username: string, token: string) => void;
}

interface State {
    username: string;
    password: string;

    error: string | null;
}

class Login extends React.Component<Props, State> {

    _input: HTMLInputElement | null;

    constructor(props: Props) {
        super(props);
        this.state = {username: "", password: "", error: null};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (name === "username")
            this.setState({username: value});
        else if (name == "password")
            this.setState({password: value});
    }

    handleSubmit(event: any) {

        interface APIAuthResponse {
            username: string;
            token: string | null;
            authenticated: boolean;
            error: string | null;
        }

        fetch("/api/authentication/login", {
            method: "POST",
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then((data: APIAuthResponse) => {
            if (!data.authenticated) {
                this.setState({error: data.error!, username: "", password: ""});
            } else {
                console.log(data);
                this.props.addLoginToken(data.username, data.token!);
            }
        });
        event.preventDefault();
    }

    componentDidMount() {
        if (this._input !== null) {
            this._input.focus();
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.error !== null &&
                    <div>
                        {this.state.error}
                    </div>
                }
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Username"
                            ref={c => (this._input = c)}
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <button>Log In</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;
