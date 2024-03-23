"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
const Auth = require("../controllers/auth.controller");

// URL: /personnels

router.post("/login", Auth.login);
router.get("/logout", Auth.logout);

/* ------------------------------------------------------- */
module.exports = router;

//"username": "testF0",
//"password": "fc44f8c54f1dd87f3a8e8c9ff4ab2bd7c36cb975cf30f32f3238ab52fdfc6c11",
