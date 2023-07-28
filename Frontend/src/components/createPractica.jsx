import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  Select,
  Stack,
} from "@chakra-ui/react";
import { Global } from '../helpers/Global'
import { useForm } from "../hooks/useForm"

export const CrearPractica = () => {
  // Crea un estado para guardar los datos del formulario
  const [datos, setDatos] = useState({
    nombrePractica: "",
    descripcion: "",
    fecha: "",
    lugar: "",
    recursos: "",
    cuadrilla: "",
  });

  const [cuadrillas, setCuadrillas] = useState([]);
  const [loading, setLoading] = useState();
  const { form, changed } = useForm({});
  const [mensaje, setMensaje] = useState('');
  const [saved, setSaved] = useState("not_saved");


  // Usar useEffect para hacer una petición al servidor
  // useEffect(() => {
  //   // Usar fetch o axios para obtener las cuadrillas
  //   fetch("http://localhost:3001/getCuadrilla")
  // .then((response) => {
  //   // Verificar si la respuesta fue exitosa
  //   if (response.ok) {
  //     // Devolver los datos como JSON
  //     return response.json();
  //   } else {
  //     // Rechazar la promesa con el código de error
  //     return Promise.reject(response.status);
  //   }
  // })
  // .then((data) => {
  //   // Guardar las cuadrillas en el estado
  //   setCuadrillas(data);
  //   console.log("pene")
  // })
  // .catch((error) => {
  //   // Mostrar un mensaje de error según el código
  //   console.error(error);
  //   if (error === 404) {
  //     alert("No se encontraron las cuadrillas");
  //   } else {
  //     alert("Ocurrió un error al obtener las cuadrillas");
  //   }
  // });
  // }, []);

  useEffect(() => {
    getCuadrilla();
  }, [])

  const getCuadrilla = async () => {
    const request = await fetch(Global.url + 'getCuadrilla', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await request.json();
    console.log(data);

    if (data.status === 'success') {
      setCuadrillas(data.cuadrillas);
      console.log("Cuadrillas: ", cuadrillas);
    }
  }
  
  // Crea una función para actualizar el estado cuando cambien los inputs
  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  // Crea una función para enviar los datos al servidor cuando se envíe el formulario
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // Usa fetch con el método POST y los datos del estado como cuerpo de la petición
  //   let datos = state; // o el nombre que le hayas dado al estado
  //   const request = await fetch("http://localhost:3001/api/practica", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(datos),
  //   });
  //   const data = await request.json();
  //   // Maneja la respuesta del servidor y muestra un mensaje de éxito o error según el caso
  //   if (data.status == "success") {
  //     alert("Práctica creada con éxito");
  //   } else {
  //     let message = data.message;
  //     console.error(message);
  //     alert("Ocurrió un error al crear la práctica");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let newPractica = form;

    const request = await fetch(Global.url + 'createPractica', {
      method: 'POST',
      body: JSON.stringify(newPractica),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await request.json();

    if (data.status == 'success') {
      setSaved("saved");
      setLoading(false);
    } else {
      let message = data.message
      setMensaje(message)
      setSaved("error");
      setLoading()
    }
  }

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        Crear práctica
      </Heading>
      <Stack spacing={4}>
        <Heading as="h2" size="md">
          Datos generales
        </Heading>
        <FormControl id="nombre-practica" mb={2}>
          <FormLabel>Nombre de la práctica</FormLabel>
          {/* Usa el atributo value para vincular el input al estado y el atributo onChange para actualizar el estado cuando cambie el valor */}
          <Input
            type="text"
            name="nombrePractica"
            value={datos.nombrePractica}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="descripcion" mb={2}>
          <FormLabel>Descripción</FormLabel>
          {/* Usa el atributo value para vincular el textarea al estado y el atributo onChange para actualizar el estado cuando cambie el valor */}
          <Textarea name="descripcion" value={datos.descripcion} onChange={handleChange} />
        </FormControl>
        {/* Usar el componente Input con tipo date para elegir la fecha */}
        <FormControl id="fecha" mb={2}>
          <FormLabel>Fecha</FormLabel>
          {/* Usa el atributo value para vincular el input al estado y el atributo onChange para actualizar el estado cuando cambie el valor */}
          <Input
            type="date"
            name="fecha"
            value={datos.fecha}
            onChange={handleChange}
            min={new Date().toISOString().slice(0, 10)}
            max="2023-12-31"
            style={{ border: "none", background: "transparent" }}
          />
        </FormControl>
        <FormControl id="lugar" mb={2}>
          <FormLabel>Lugar</FormLabel>
          {/* Usa el atributo value para vincular el input al estado y el atributo onChange para actualizar el estado cuando cambie el valor */}
          <Input type="text" name="lugar" value={datos.lugar} onChange={handleChange} />
        </FormControl>
        <Heading as="h2" size="md">
          Recursos
        </Heading>
        <FormControl id="recursos" mb={2}>
          <FormLabel>Recursos</FormLabel>
          {/* Usa el atributo value para vincular el input al estado y el atributo onChange para actualizar el estado cuando cambie el valor */}
          <Input type="text" name="recursos" value={datos.recursos} onChange={handleChange} />
        </FormControl>
        <FormControl id="cuadrilla" mb={2}>
          <FormLabel>Cuadrilla</FormLabel>
          {/* Usa el atributo value para vincular el select al estado y el atributo onChange para actualizar el estado cuando cambie el valor */}
          <Select name="cuadrilla" value={datos.cuadrilla} onChange={handleChange}>
            <option value="">Selecciona una opción</option>
            {/* Usar map para generar los options a partir de las cuadrillas */}
            {cuadrillas.map((cuadrilla) => (
              // Agregar una prop key con el id de cada cuadrilla
              <option key={cuadrilla.id} value={cuadrilla.nombre}>
                {cuadrilla.nombre}
              </option>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Usa el evento onSubmit del formulario para llamar a la función handleSubmit */}
      <form onSubmit={handleSubmit}>
        <Button type="submit" colorScheme="blue">
          Enviar
        </Button>
      </form>
    </Box>
  );
};