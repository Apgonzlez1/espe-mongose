const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../models/user");
const Laboratorio = require("../models/laboratorio");
const Equipo = require("../models/equipo");

async function ejecutarConsultas() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB");

    // 1. Listar todos los usuarios
    console.log("\n🔍 1. Todos los usuarios:");
    const usuarios = await User.find();
    console.log(usuarios);

    // 2. Buscar laboratorios que tengan equipos disponibles
    console.log("\n🔍 2. Laboratorios con equipos disponibles:");
    const equiposDisponibles = await Equipo.find({ estado: "disponible" }).populate("laboratorio");
    console.log(equiposDisponibles);

    // 3. Contar cantidad de equipos por estado
    console.log("\n🔍 3. Cantidad de equipos por estado:");
    const conteoPorEstado = await Equipo.aggregate([
      { $group: { _id: "$estado", cantidad: { $sum: 1 } } }
    ]);
    console.log(conteoPorEstado);

    // 4. Buscar usuarios cuyo correo termine en @universidad.edu
    console.log("\n🔍 4. Usuarios con correo @universidad.edu:");
    const usuariosUniversidad = await User.find({ email: /@universidad\.edu$/ });
    console.log(usuariosUniversidad);

    // 5. Promedio de equipos por laboratorio
    console.log("\n🔍 5. Promedio de equipos por laboratorio:");
    const promedioEquipos = await Equipo.aggregate([
      {
        $group: {
          _id: "$laboratorio",
          cantidadEquipos: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "laboratorios",
          localField: "_id",
          foreignField: "_id",
          as: "laboratorio"
        }
      },
      {
        $unwind: "$laboratorio"
      },
      {
        $project: {
          _id: 0,
          laboratorio: "$laboratorio.nombre",
          cantidadEquipos: 1
        }
      }
    ]);
    console.log(promedioEquipos);

    console.log("\n✅ Consultas ejecutadas con éxito.");
    process.exit();
  } catch (error) {
    console.error("❌ Error en las consultas:", error);
    process.exit(1);
  }
}

ejecutarConsultas();
