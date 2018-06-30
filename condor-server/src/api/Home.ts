import { Request, Response } from "express";
import { User, UserModel } from "../models/User";

export let index = (req: Request, res: Response) => {
    res.send("Hello");
};

export let testing = (req: Request, res: Response) => {
    res.send("Testing!");
    return;
    /*
    const user : UserModel = new User({
        "firstName": "Test",
        "lastName": "Last",
        "hash": "hashTest",
        "email": "foo@bar.com"
    });
    user.save((err: Error) => {
        if (err !== null) {
            res.send("Error");
        }
        else {
            res.send("Success");
        }
    });
    */
};
