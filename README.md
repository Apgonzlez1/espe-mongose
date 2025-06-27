# 🗂️ Tarea 1: Consultas Avanzadas y Relaciones con MongoDB y Mongoose

---

## 🧾 Portada

- **Título del proyecto:** Consultas Avanzadas y Relaciones en MongoDB con Mongoose  
- **Nombre completo del estudiante:** Adriana Pamela González Orellana  
- **Carrera / Curso:** 7mo Curso - 23128 Aplicaciones Distribuidas  
- **Fecha de entrega:** 27 de junio de 2025  

---

## 💡 Introducción

Esta práctica busca desarrollar consultas avanzadas y establecer relaciones entre colecciones en MongoDB utilizando Mongoose. Se emplea Docker para levantar los contenedores de MongoDB y Mongo Express, facilitando el entorno de desarrollo y administración.

---

## 🛠️ Tecnologías Utilizadas

- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- Docker Compose  
- Mongo Express  

---

## 🗂️ Estructura del Proyecto

espe-mongoose-main/
│
├── src/
│ ├── models/
│ │ ├── user.js
│ │ ├── laboratorio.js
│ │ └── equipo.js
│ ├── scripts/
│ │ ├── insert.js
│ │ └── consultas.js
│ └── server.js
│
├── docker-compose.yml
├── package.json
├── .env
├── README.md
└── screenshots/
├── usuarios.png
├── laboratorios.png
└── equipos.png


---

## 🚀 Configuración y Ejecución

1. Levantar MongoDB y Mongo Express con Docker:

```bash
docker-compose up -d

    Instalar dependencias:

npm install

    Insertar datos iniciales:

node src/scripts/insert.js

    Iniciar servidor:

npm start

    Probar en Postman o navegador:

    GET http://localhost:8080/users

    GET http://localhost:8080/laboratorios

    GET http://localhost:8080/equipos

📸 Evidencia de Funcionamiento
Usuarios


Listado de usuarios con correos válidos.
Laboratorios


Laboratorios registrados y sus datos.
Equipos


Equipos vinculados a laboratorios con su estado.
🔎 Consultas Implementadas
Consulta	Descripción	Método utilizado
1. Listar todos los usuarios	Recuperar todos los documentos de usuarios	.find()
2. Laboratorios con equipos disponibles	Filtrar equipos con estado "disponible" y mostrar laboratorio	.find() + .populate()
3. Contar equipos por estado	Contar cantidad de equipos agrupados por estado	.countDocuments() + .aggregate()
4. Buscar usuarios por correo	Buscar usuarios cuyo correo termine en @universidad.edu	$regex
5. Promedio de equipos por laboratorio	Calcular promedio de equipos en cada laboratorio	$lookup, $group, $avg en aggregate()
📖 Resultados
1. Listar todos los usuarios

[
  {
    "_id": "64abcde1234567890fghijk1",
    "name": "Ana Lema",
    "email": "ana@universidad.edu"
  },
  {
    "_id": "64abcde1234567890fghijk2",
    "name": "Carlos Silva",
    "email": "carlos@universidad.edu"
  }
]

2. Laboratorios con equipos disponibles

3. Conteo de equipos por estado

[
  { "_id": "disponible", "cantidad": 2 },
  { "_id": "en uso", "cantidad": 1 },
  { "_id": "mantenimiento", "cantidad": 1 }
]

4. Usuarios con correo @universidad.edu

5. Promedio de equipos por laboratorio

[
  { "laboratorio": "Laboratorio de Redes", "promedioEquipos": 2 },
  { "laboratorio": "Laboratorio de Electrónica", "promedioEquipos": 2 }
]

📝 Conclusiones

    Se consolidó la comprensión sobre consultas avanzadas y relaciones en MongoDB con Mongoose.

    Las referencias entre colecciones y .populate() facilitan la gestión de datos relacionados.

    Docker Compose agilizó la creación y administración del entorno de base de datos.

    Validar datos y manejar correctamente las consultas es vital para mantener integridad.

📚 Referencias

    Mongoose Documentation

    MongoDB Aggregation

    Docker Compose

    Express.js
