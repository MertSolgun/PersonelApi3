"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
const personel = require("../controllers/personnel.controller");
const permission = require("../middlewares/permission");

// URL: /personnels

router
  .route("/")
  .get(permission.isAdmin, personel.list)
  .post(permission.isAdmin, personel.create);

router
  .route("/:id")
  .get(permission.isAdminOrOwn, personel.read)
  .put(permission.isAdminOrOwn, personel.update)
  .patch(permission.isAdminOrOwn, personel.update)
  .delete(permission.isAdmin, personel.delete);

/* ------------------------------------------------------- */
module.exports = router;
