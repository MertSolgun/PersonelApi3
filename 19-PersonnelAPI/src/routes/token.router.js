"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const Token = require("../controllers/token.controller");
const permission = require("../middlewares/permission");

router.use(permission.isAdmin);

router.route("/").get(Token.list).post(Token.create);

router
  .route("/:id")
  .get(Token.read)
  .put(Token.update)
  .patch(Token.update)
  .delete(Token.delete);

/* ------------------------------------------------------- */
module.exports = router;
