import { Document, Schema, Types, Model, model } from "mongoose";

export interface UserToken {
    token: string;
    lastUse: Date
}

export interface UserModel extends Document {

    // Basic properties
    username: string;
    firstName: string;
    lastName: string;
    email?: string;

    // Authentication properties
    hash: string;
    tokens: Array<UserToken>;
}

export const UserSchema: Schema = new Schema({

    // Basic properties
    username: String,
    firstName: String,
    lastName: String,
    email: String,

    // Authentication properties
    hash: String,
    tokens: [{ token: String, lastUse: Date }]
});

export const User: Model<UserModel> = model<UserModel>("User", UserSchema);
