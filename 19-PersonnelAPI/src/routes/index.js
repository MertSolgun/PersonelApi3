"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();

router.use("/auth", require("./auth.router"));
router.use("/tokens", require("./token.router"));

router.use("/departments", require("./department.router"));
router.use("/personels", require("./personnel.router"));

module.exports = router;
