import * as React from "react";

import "../css/Content.css";

interface Props {
    username: string;
    token: string;
}

class Content extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div id="content">
                You are logged in as {this.props.username}.
            </div>
        );
    }
}

export default Content;
