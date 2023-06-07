const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const router = require("./router/main");

require('dotenv').config();
const port = 8060;

mongoose.connect(process.env.URI)
    .then(() => {
        console.log('DB CONECT SUCCESS');
    }).catch(e => {
        console.log(e);
    });

app.use(cors());
app.use(express.json());

app.use("/", router);

app.listen(port, () => console.log(
    `the service are running on port http://localhost:${port}`
));