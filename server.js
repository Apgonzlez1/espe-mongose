const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // 👈 Esto carga las variables del .env
const Course = require("./src/models/course");

const connectionString =
  "mongodb://admin:password123@localhost:27017/espe-mongoose?authSource=admin";
// Utilizando async/await para conectar a MongoDB
mongoose
  .connect(connectionString)
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((error) => console.error("Error de conexión a MongoDB:", error));

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/course", async (req, res) => {
  Course.create({
    title: "Curso de Express",
    description: "Curso de Express para aprender a manejar Backend con Node",
    numberOfTopics: 5,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((error) => {
      console.log("Error al crear el curso:", error);
      res.json(error);
    });
});

app.get("/course", (req, res) => {
  Course.find()
    .then((courses) => {
      res.json(courses);
    })
    .catch((error) => {
      console.log("Error al obtener los cursos:", error);
      res.json(error);
    });
});

app.get("/course/:id", (req, res) => {
  const id = req.params.id;
  Course.findById(id)
    .then((course) => {
      res.json(course);
    })
    .catch((error) => {
      console.log("Error al obtener el curso:", error);
      res.json(error);
    });
});

app.put("/course/:id", (req, res) => {
  const id = req.params.id;
  // 1. Actualizar multiples campos
  Course.findByIdAndUpdate(
    { _id: id },
    { numberOfTopics: 20 },
    { publishedAt: new Date() },
    { new: true }
  )
    .then((course) => {
      res.json(course);
    })
    .catch((error) => {
      console.log("Error al actualizar el curso:", error);
      res.json(error);
    });
});

app.delete("/course/:id", (req, res) => {
  // Eliminar registros multiples
  const id = req.params.id;
  // 1. Actualizar multiples campos
  Course.findByIdAndDelete({ _id: id })
    .then(() => {
      res.json("Curso eliminado");
    })
    .catch((error) => {
      console.log("Error al eliminar el curso:", error);
      res.json(error);
    });
});

app.listen(8080, () => console.log("Servidor iniciado"));
// Importa los modelos al inicio, junto con Course si quieres
const User = require("./src/models/user");
const Laboratorio = require("./src/models/laboratorio");
const Equipo = require("./src/models/equipo");

// Ruta para listar todos los usuarios
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para listar todos los laboratorios
app.get("/laboratorios", async (req, res) => {
  try {
    const labs = await Laboratorio.find();
    res.json(labs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para listar todos los equipos con laboratorio poblado
app.get("/equipos", async (req, res) => {
  try {
    const equipos = await Equipo.find().populate("laboratorio");
    res.json(equipos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/users/searchByEmail", async (req, res) => {
  try {
    const { emailPattern } = req.body; // espera { "emailPattern": "@universidad.edu" }
    const regex = new RegExp(emailPattern + "$"); // termina con ese patrón
    const users = await User.find({ email: { $regex: regex } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
