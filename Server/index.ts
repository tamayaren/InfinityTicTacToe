const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// routes
const player_routes = require("./routes/player_routes");

const Debug = require("./utility/Debug");
dotenv.config();

const url: string = (process.env.MONGODB_URI)
    ?.replace("$DB_USER$", process.env.MONGODB_USR as string)
    .replace("$DB_PASSWORD$", process.env.MONGODB_PWD as string) as string;

mongoose.connect(url)
    .then(() => Debug.log("Server successfully connected to DB"))
    .catch((err: string) => Debug.error(err));

const server = express();
server.use(express.json());
server.use("/api/players", player_routes);

server.listen((process.env.PORT) as string, () => {
    Debug.log(`Process connection success at ${process.env.PORT}`);
})