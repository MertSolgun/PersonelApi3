"use strict";

const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");

const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

app.use(express.json());
/* ------------------------------------------------------- */

// middleware:
app.use(require("cookie-session")({ secret: process.env?.SECRET_KEY }));
app.use(require("./src/middlewares/findSearchSortPage"));
app.use(require("./src/middlewares/authentication"));
//app.use(require("./src/middlewares/loggin"));

//Routes
app.use(require("./src/routes/"));

//swagger
app.use("/swagger", express.static("swagger"));

app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to PERSONNEL API",
    user: req.user,
    api: {
      documents: {
        swagger: "https://personel-api-gamma.vercel.app/swagger",
        redoc: "https://personel-api-gamma.vercel.app/redoc",
        json: "https://personel-api-gamma.vercel.app/documents/json",
      },
      contact: "contact@clarusway.com",
    },
  });
});

//Documention

//?JSON

app.use("/documents/json", (req, res) => {
  res.sendFile("swagger.json", { root: "." });
});

//? Swagger
const swaggerJson = require("./swagger.json");
const swaggerUi = require("swagger-ui-express");

//? Redoc

const redoc = require("redoc-express");
app.use(
  "/documents/redoc",
  redoc({
    title: "Personel Api",
    specUrl: "/documents/json",
  })
);

app.use(
  "/documents/swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJson, {
    swaggerOptions: { persistAuthorization: true },
  })
);

app.use(require("./src/middlewares/errorHandler"));

const PORT = process.env?.PORT;

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
//require("./src/helpers/sync")();

// Autentication  = Kimlik kontrolü

// Authorization = Yetki kontrolu= permissions

// /$ npm i swagger-autogen JSON DOSYAYI OLUSTURUR
//$ npm i swagger-ui-express // UI
//npm i redoc-express
