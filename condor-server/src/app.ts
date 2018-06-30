import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import path from "path";

import * as home from "./api/Home";
import * as authentication from "./api/Authentication";

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

// Basic routes
app.get("/hello", home.index);
app.get("/testing", home.testing);

app.post("/api/authentication/login", authentication.login);
app.post("/api/authentication/logout", authentication.logout);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../condor-client/build")));
    app.get("*", function(req: express.Request, res: express.Response) {
        res.sendfile(path.join(__dirname, "../../condor-client/build", "index.html"));
    });
}

export default app;
