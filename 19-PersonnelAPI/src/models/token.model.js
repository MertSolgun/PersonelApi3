"use strict";
/* -------------------------------------------------------
    EXPRESS - Token Model
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");

//Token Model

const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Personel",
      required: true,
      index: true,
    },
    token: {
      type: String,
      trim: true,
      required: true,
      index: true,
      unique: true,
    },
  },
  {
    collection: "tokensSchema",
    timestamps: true,
  }
);

module.exports = mongoose.model("Token", TokenSchema);

// {
//     "userId": "65343222b67e9681f937f001",
//     "token": "...tokenKey..."
//   }
