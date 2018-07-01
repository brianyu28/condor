import { Request, Response } from "express";
import { Types } from "mongoose";

import { User, UserModel, UserToken } from "../models/User";
import { Project, ProjectModel } from "../models/Project";
import { authenticate } from "../controllers/AuthenticationController";

export let get = async (req: Request, res: Response) => {
    let username: string = req.get("username");
    let token: string = req.get("token");
    const user: UserModel | null = await authenticate(username, token);
    if (user === null) {
        res.status(401);
        res.json({success: false});
        return;
    }
    const projects: Array<ProjectModel> = await Project.find({
        owner_id: user._id
    });
    res.json({
        username,
        token,
        projects: projects.map(project => project.toJSON())
    });
};

export let add = async (req: Request, res: Response) => {
    try {
        const username: string = req.body.username;
        const token: string = req.body.token;
        const user: UserModel | null = await authenticate(username, token);
        if (user === null) {
            res.status(401);
            res.json({success: false});
            return;
        }
        const project : ProjectModel = await addProject(user._id);
        res.send({
            success: true,
            project: {
                name: project.name
            }
        });
    } catch (error) {
        res.send({success: false});
    }
};

// Helpers

export let addProject = async (owner_id: Types.ObjectId) => {
    const project : ProjectModel = new Project({
        owner_id: owner_id,
        name: "Untitled Project",
        parent: null,
        position: 0,
        template: false
    });
    await project.save();
    return project;
};
