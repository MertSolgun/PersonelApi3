"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const Personel = require("../models/personnel.model");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Personel);
    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(Personel),
      data: data,
    });
  },
  create: async (req, res) => {
    const isLead = req.body.isLead || false;

    // isLead:true olarak ekledigimiz personel
    //oldugunda calisir eski lider olani false yapar kendisi true olur
    if (isLead) {
      await Personel.updateMany(
        {
          departmentId: req.body.departmentId, //ayni departmandaki personeller
          isLead: true, // isLead:true olanlari filtrele
        },
        { isLead: false } //ve false yap
      );
    }
    const data = await Personel.create(req.body);
    res.status(201).send({
      error: false,
      data: data,
    });
  },
  read: async (req, res) => {
    const data = await Personel.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
      data: data,
    });
  },
  // 65f8a28ce931033299dcbd99
  update: async (req, res) => {
    //Update edilcek personelin isLead:true ise
    // hangi departmanda lider oldugunu bilmedigimiz icin
    //departmenId'sini findOne ile getiriyoruz

    // updateMany kisminda ise o departmentIdsine sahip diger liderlerin isLead:true durumun false
    //yapiyoruz..

    if (!req.user.isAdmin) {
      req.body.isAdmin = false;
      req.body.isLead = false;
      delete req.body.salary;
    }

    const isLead = req.body.isLead || false;
    if (isLead) {
      // req.params.id deki departmenIdyi getirir.!!!
      const { departmentId } = await Personel.findOne(
        { _id: req.params.id },
        { departmentId: 1 }
      );
      await Personel.updateMany(
        { departmentId, isLead: true },
        { isLead: false }
      );
    }

    const data = await Personel.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
    res.status(200).send({
      error: false,
      data: data,
      newData: await Personel.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    const data = await Personel.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data: data,
    });
  },
};

//her departmanda bir isLead true
