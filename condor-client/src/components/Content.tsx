import * as React from "react";

import ProjectsContainer from "../containers/ProjectsContainer";

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
                <ProjectsContainer />
            </div>
        );
    }
}

export default Content;
