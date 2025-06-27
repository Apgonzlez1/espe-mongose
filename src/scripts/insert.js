const mongoose = require("mongoose");
require("dotenv").config(); // Asegúrate de tener el archivo .env con MONGO_URI

const User = require("../models/user");
const Laboratorio = require("../models/laboratorio");
const Equipo = require("../models/equipo");

async function insertarDatos() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB");

    // Limpiar colecciones antes de insertar (opcional)
    await User.deleteMany({});
    await Laboratorio.deleteMany({});
    await Equipo.deleteMany({});

    // Insertar usuarios
    const usuarios = await User.insertMany([
        { name: "Ana Lema", email: "ana@universidad.edu" },
        { name: "Carlos Silva", email: "carlos@universidad.edu" },
        { name: "Luis Pérez", email: "luis@universidad.edu" }
      ]);

    console.log("👤 Usuarios insertados:", usuarios.length);

    // Insertar laboratorios
    const labRedes = await Laboratorio.create({ nombre: "Laboratorio de Redes", ubicacion: "Piso 2" });
    const labElectronica = await Laboratorio.create({ nombre: "Laboratorio de Electrónica", ubicacion: "Piso 3" });

    console.log("🏢 Laboratorios insertados");

    // Insertar equipos (con referencia al laboratorio)
    const equipos = await Equipo.insertMany([
      { nombre: "Router Cisco", estado: "disponible", laboratorio: labRedes._id },
      { nombre: "Switch HP", estado: "en uso", laboratorio: labRedes._id },
      { nombre: "Multímetro", estado: "mantenimiento", laboratorio: labElectronica._id },
      { nombre: "Osciloscopio", estado: "disponible", laboratorio: labElectronica._id },
    ]);

    console.log("🛠️ Equipos insertados:", equipos.length);

    console.log("🎉 Inserción completa.");
    process.exit(); // Salir del script
  } catch (error) {
    console.error("❌ Error durante la inserción:", error);
    process.exit(1);
  }
}

insertarDatos();
