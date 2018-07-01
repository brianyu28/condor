import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import path from "path";

import * as authentication from "./controllers/AuthenticationController";
import * as projects from "./controllers/ProjectsController";

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.set("port", process.env.PORT || 5000);
app.set("views", path.join(__dirname, "../views"));
app.set("db_uri", process.env.DB_URI);
mongoose.connect(process.env.DB_URI).then(() => {
    console.log("Database connection successful.");
}
).catch(err => {
    console.log("Database connection error.");
});

app.post("/api/authentication/login", authentication.login);
app.post("/api/authentication/logout", authentication.logout);

app.get("/api/projects", projects.get);
app.post("/api/projects/add", projects.add);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../condor-client/build")));
    app.get("*", function(req: express.Request, res: express.Response) {
        res.sendfile(path.join(__dirname, "../../condor-client/build", "index.html"));
    });
}

export default app;
