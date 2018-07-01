import _ from "lodash";
import mongoose from "mongoose";
const passwordHash = require("password-hash");

import { Request, Response } from "express";
import { User, UserModel, UserToken } from "../models/User";
import { addToken, removeToken } from "../utils/AuthenticationUtils";

export let login = async (req: Request, res: Response) => {

    const username: string = req.body.username;
    const password: string = req.body.password;
    const hashedPassword: string = passwordHash.generate(password);

    // Find user and authenticate.
    try {
        const user: UserModel | null = await User.findOne({ username });
        if (user !== null && passwordHash.verify(password, user.hash)) {
            const token: string = await addToken(user);
            if (token === null) {
                throw "Token error.";
            } else {
                res.json({
                    username: username,
                    authenticated: true,
                    token: token,
                    error: null
                });
            }
        } else {
            res.json({
                username: username,
                authenticated: false,
                token: null,
                error: "Your username or password is incorrect."
            });
        }
    } catch (error) {
        res.json({
            username: username,
            authenticated: false,
            token: null,
            error: "There was an error attempting to log in."
        })
    }
};

export let logout = async (req: Request, res: Response) => {
    const username: string = req.body.username;
    const token: string = req.body.token;
    try {
        let user: UserModel | null = await User.findOne({ username });
        if (user === null) {
            res.json({success: false});
        } else {
            let success: boolean = await removeToken(user, token);
            res.json({"success": success});
        }

    } catch (error) {
        res.json({
            success: false
        });
    }
};

// Helpers

// Authenticate users and sort through tokens
export let authenticate = async (username: string, token: string): Promise<UserModel | null> => {
    try {
        const user: UserModel | null = await User.findOne({ username });
        if (user === null) {
            return null;
        }
        let d: Date = new Date();
        const tokenIndex: number = _.findIndex(user.tokens, (userToken: UserToken) => userToken.token === token);
        if (tokenIndex !== -1) {
            user.tokens[tokenIndex].lastUse = d;
            await user.save();
        }
        d.setDate(d.getDate() - 14);
        await User.updateOne({ username }, {
            "$pull": { tokens: { lastUse: { "$lte": d }}}
        });
        return (tokenIndex !== -1) ? user : null;
    } catch (error) {
        return null;
    }
}
