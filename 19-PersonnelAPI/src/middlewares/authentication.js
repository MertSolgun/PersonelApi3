"use strict";

const tokenModel = require("../models/token.model");

module.exports = async (req, res, next) => {
  // Authorization: Token ...
  // Authorization: ApiKey ...
  // Authorization: X-API-KEY ...
  // Authorization: x-auth-token ...
  // Authorization: Bearer ...

  const auth = req.headers?.authorization || null;
  const tokenKey = auth ? auth.split(" ") : null;

  if (tokenKey && tokenKey[0] == "Token") {
    const tokenData = await tokenModel
      .findOne({ token: tokenKey[1] })
      .populate("userId");
    //globale tanimladik req.user diyerek
    if (tokenData) req.user = tokenData.userId;
    // /console.log(req.user);
  }
  next();
};

// Autentication  = Kimlik kontrolü

// Authorization = Yetki kontrolu= permissions
