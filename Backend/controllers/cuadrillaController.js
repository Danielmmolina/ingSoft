const Cuadrilla = require('../models/cuadrilla');
const Brigadista = require('../models/brigadista');

// Función para crear una cuadrilla

const createCuadrilla = async (req, res) => {
  const { nombre, brigadistas: brigadistasRut, sector } = req.body;

  // Validar el nombre de la cuadrilla
  if (!nombre || nombre.length < 3) {
    return res.status(400).send('ERROR: El nombre de la cuadrilla debe tener al menos 3 caracteres');
  }

  // Validar que el nombre de la cuadrilla no contenga caracteres especiales
  const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  if (specialCharsRegex.test(nombre)) {
    return res.status(400).send('ERROR: El nombre de la cuadrilla no puede contener caracteres especiales');
  }

  // Verificar si ya existe una cuadrilla con el mismo nombre
  const existingCuadrilla = await Cuadrilla.findOne({ nombre: nombre });
  if (existingCuadrilla) {
    return res.status(400).send(`ERROR: Ya existe una cuadrilla con el nombre ${nombre}`);
  }

  // Validar el número de brigadistas
  if (!brigadistasRut || brigadistasRut.length < 1 || brigadistasRut.length > 50) {
    return res.status(400).send('ERROR: Ingrese una cantidad válida de brigadistas.');
  }

  // Se verifica si los brigadistas están en la base de datos y se obtienen sus IDs
  const brigadistas = [];
  for (const rut of brigadistasRut) {
    const brigadista = await Brigadista.findOne({ rut: rut });
    if (!brigadista) {
      // El brigadista no está en la base de datos
      return res.status(400).send(`ERROR: El brigadista con RUT ${rut} no existe en la base de datos`);
    }
    brigadistas.push(brigadista._id);
  }

  // Validar el sector
  if (!sector || sector.length < 3 || sector.length > 32) {
    return res.status(400).send('ERROR: El sector debe tener entre 3 y 32 caracteres');
  }
  if (specialCharsRegex.test(sector)) {
    return res.status(400).send('ERROR: El sector no puede contener caraceteres especiales');
  }

  // Los brigadistas están en la base de datos, continuar con la creación de la cuadrilla
  const newCuadrilla = new Cuadrilla({ nombre, brigadistas, sector });
  newCuadrilla.save((err, Cuadrilla) => {
    if (err) {
      return res.status(400).send('ERROR: no se pudo crear el brigadista');
    }
    return res.status(201).send(Cuadrilla);
  });
};

// Función para obtener todas las cuadrillas

const getCuadrilla = async (req, res) => {
  try {
    const cuadrillas = await Cuadrilla.find({}).populate('brigadistas', 'rut nombre apellido -_id');
    return res.status(200).send(cuadrillas);
  } catch (err) {
    return res.status(400).send('ERROR: no fue posible obtener las cuadrillas');
  }
}

// Función para actualizar una cuadrilla

const updateCuadrilla = async (req, res) => {
  try {
    const { id } = req.params;
    const { brigadistas: brigadistasRut } = req.body;

    // Verificar si los brigadistas están en la base de datos y obtener sus IDs
    const brigadistas = [];
    for (const rut of brigadistasRut) {
      const brigadista = await Brigadista.findOne({ rut: rut });
      if (!brigadista) {
        // El brigadista no está en la base de datos
        return res.status(400).send(`ERROR: El brigadista con RUT ${rut} no existe en la base de datos`);
      }
      brigadistas.push(brigadista._id);
    }

    /* Se actualiza una cuadrilla existente en la base de datos añadiendo nuevos brigadistas, si se actualiza correctamente nos
     devolverá la cuadrilla actualizada correctamente. */

    const cuadrilla = await Cuadrilla.findByIdAndUpdate(id, { $push: { brigadistas: { $each: brigadistas } } }, { new: true });
    return res.status(200).send(cuadrilla);
  } catch (err) {
    return res.status(400).send({ message: "Error al actualizar cuadrilla" });
  }
}

// Función para eliminar una cuadrilla

const deleteCuadrilla = (req, res) => {
  const { id } = req.params;
  Cuadrilla.findByIdAndDelete(id, (err, Cuadrilla) => {
    if (err) {
      return res.status(400).send({ message: "Error al obtener cuadrilla" })
    }
    if (!Cuadrilla) {
      return res.status(404).send({ message: "Cuadrilla no encontrada" })
    }
    return res.status(200).send(Cuadrilla)
  });

}




module.exports = {
  createCuadrilla,
  getCuadrilla,
  deleteCuadrilla,
  updateCuadrilla
}