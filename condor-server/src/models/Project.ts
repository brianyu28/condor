import { Document, Schema, Types, Model, model } from "mongoose";

export interface ProjectModel extends Document {
    owner_id: Types.ObjectId;
    name: string;
    parent: Types.ObjectId | null;
    position: number;
    template: boolean;
}

export const ProjectSchema: Schema = new Schema({
    owner_id: Schema.Types.ObjectId,
    name: String,
    parent: Schema.Types.ObjectId,
    position: Number,
    template: Boolean
});

export const Project: Model<ProjectModel> = model<ProjectModel>("Project", ProjectSchema);
