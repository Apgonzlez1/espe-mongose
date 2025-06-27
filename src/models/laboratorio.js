const mongoose = require("mongoose");
const LabSchema = new mongoose.Schema({
  nombre: String,
  ubicacion: String,
});
module.exports = mongoose.model("Laboratorio", LabSchema);
