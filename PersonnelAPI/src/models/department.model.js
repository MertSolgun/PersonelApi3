"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");

const DepartmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  {
    collection: "departmens",
    timestamps: true,
  }
);

module.exports = mongoose.model("Department", DepartmentSchema);
/* ------------------------------------------------------- */
