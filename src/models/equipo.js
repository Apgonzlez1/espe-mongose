const mongoose = require("mongoose");
const EquipoSchema = new mongoose.Schema({
  nombre: String,
  estado: {
    type: String,
    enum: ["disponible", "en uso", "mantenimiento"],
  },
  laboratorio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Laboratorio",
  },
});
module.exports = mongoose.model("Equipo", EquipoSchema);
