"use strict";
const passwordEncrypt = require("../helpers/passwordEncrypt");
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const Personel = require("../models/personnel.model");
const tokenModel = require("../models/token.model");

module.exports = {
  login: async (req, res) => {
    /* 
  #swagger.tags = ['Authentication']
  #swagger.summary = 'Login'
  #swagger.description = 'Login with username and password'
  #swagger.parameters['body'] = {
            in: 'body',
            required: 'true',
            schema: {
                username: 'testF0',
                password:'1234'
            }
        }

    
    */

    const { username, password } = req.body;

    if (username && password) {
      //boyle bir personel varmi?
      //! findOne ile filtreleme yaparken req.body'deki password sifreleyip yollamadik ama
      //! bunu personel modeldeki set methodu bunu yapiyor.
      const user = await Personel.findOne({ username, password });
      if (user && user.isActive) {
        //! Token

        //Login olucak usera ait daha önceden token varmi
        let tokenData = await tokenModel.findOne({ userId: user._id });

        //Eger yoksa
        if (!tokenData) {
          const tokenKey = passwordEncrypt(user._id + Date.now());
          tokenData = await tokenModel.create({
            userId: user._id,
            token: tokenKey,
          });
        }
        //attetion global scope and block scope
        res.status(200).send({
          error: false,
          token: tokenData.token,
          user,
        });
      } else {
        res.errorStatusCode = 401;
        throw new Error("Wrong Username or Password.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please entry username and password.");
    }
  },
  logout: async (req, res) => {
    /* 

    #swagger.tags = ["Authentication"]
    #swagger.summary = "Log out"
    #swagger.description = "Delete Token"

    
    */

    //1-yontem
    //await tokenModel.deleteOne({ userId: req.user._id });

    //2-yontem
    const auth = req.headers?.authorization || null;
    const tokenKey = auth ? auth.split(" ") : null;

    if (tokenKey && tokenKey[0] == "Token") {
      await tokenModel.deleteOne({ token: tokenKey[1] });
    }
    res.status(200).send({
      error: false,
      message: "Logout: Token Deleted.",
    });
  },
};

/// Autentication = Kimlik Kontrolü
// Authorization = Yetki kontrolü
