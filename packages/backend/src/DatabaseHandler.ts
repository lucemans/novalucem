import { Logger } from "@lucemans/logger";
import { User } from "@novalucem/common";
import chalk from "chalk";
import mongoose, { Schema, Document } from 'mongoose';

export default class DatabaseHandler extends Logger {
    constructor() {
        super(chalk.green('MONGO'));
        mongoose.connect("mongodb://mongo.db.svc.cluster.local/novalucem", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            this.success('Connection successful');
        }).catch((err) => {
            this.error(err);
        });
    }
}

export const MUser = mongoose.model('user', new Schema({
    username: { type: String },
    user_id: { type: String },
    github_id: { type: Number },
    avatar: { type: String }
}));