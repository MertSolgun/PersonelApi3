"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const department = require("../controllers/department.controller");
const permissions = require("../middlewares/permission");

router
  .route("/")
  .get(permissions.isLogin, department.list)
  .post(permissions.isAdmin, department.create);

router
  .route("/:id")
  .get(permissions.isLogin, department.read)
  .put(permissions.isAdmin, department.update)
  .patch(permissions.isAdmin, department.update)
  .delete(permissions.isAdmin, department.delete);

router.get("/:id/personel", permissions.isAdminOrLead, department.personel);

/* ------------------------------------------------------- */
module.exports = router;

//departman ekleme dene admin!!
