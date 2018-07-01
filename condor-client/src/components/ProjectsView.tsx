import * as React from "react";
import * as _ from "lodash";

interface Props {
    authentication: {
        username: string;
        token: string;
    };

    logout: () => void;
}

interface State {
    projects: Array<{
        _id: string;
        name: string;
        position: number;
    }>;
}

class ProjectsView extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            projects: []
        };
    }

    componentDidMount() {
        fetch("/api/projects", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                username: this.props.authentication.username,
                token: this.props.authentication.token
            }
        }).then(res => {
            if (res.status === 401) {
                this.props.logout();
            }
            return res.json();
        }).then(data => {
            const projects = data.projects;
            this.setState({
                projects: _.sortBy(projects, "position")
            });
        });
    }

    render() {

        let projectList = this.state.projects.map((project, key) => (
            <li key={key}>{project.name}</li>
        ));
        return (
            <div id="projects">
                Projects
                <ul>
                    {projectList}
                    {
                        this.state.projects.length === 0 &&
                        <li>No projects to view.</li>
                    }
                </ul>
            </div>
        );
    }
}

export default ProjectsView;
