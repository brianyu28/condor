import { User, UserModel, UserToken } from "../models/User";

const mongoose = require("mongoose");
const uuidv4 = require("uuid/v4");

export let addToken = async (user: UserModel) => {

    const token: UserToken = {
        token: uuidv4(),
        lastUse: new Date()
    };

    try {
        const result = await User.updateOne({
            "_id": mongoose.Types.ObjectId(user._id)
        }, {
            "$push": { tokens: token }
        });
        return token.token;
    } catch (error) {
        return null;
    }

};

export let removeToken = async (user: UserModel, token: string) => {
    const result = await User.updateOne({
        "_id": mongoose.Types.ObjectId(user._id)
    }, {
        "$pull": { tokens: { token }}
    });
    return true;
}
