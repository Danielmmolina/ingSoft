import { Button, FormControl, FormHelperText, FormLabel, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react"
import { Global } from '../helpers/Global'
import { useForm } from "../hooks/useForm"
import { useState } from "react";
import { AlertaSuccess } from "./AlertaSuccess";
import { AlertaError } from "./AlertaError";

export const FormBrigadista = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_saved");
  const [mensaje, setMensaje] = useState('');

  const sendForm = async (e) => {
    e.preventDefault();
    let newBrigadista = form;

    const request = await fetch(Global.url + 'createBrigadista', {
      method: 'POST',
      body: JSON.stringify(newBrigadista),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await request.json();

    if (data.status == 'success') {
      setSaved("saved");
    } else {
      let message = data.message
      setMensaje(message)
      setSaved("error");
    }
  }

  return (
    <>
      <HStack spacing='10px'>

        <FormControl isRequired>
          <FormLabel>Nombre</FormLabel>
          <Input placeholder='Nombre' onChange={changed} name="nombre" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Apellido</FormLabel>
          <Input placeholder='Apellido' name="apellido" onChange={changed} />

        </FormControl>
      </HStack>
      <HStack spacing='10px'>
        <FormControl isRequired>
          <FormLabel>Rut</FormLabel>
          <Input placeholder='Rut' name="rut" onChange={changed} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Edad</FormLabel>
          <NumberInput max={100} min={18} >
            <NumberInputField name="edad" onChange={changed} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

      </HStack>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input type='email' name="email" onChange={changed} />
        <FormHelperText>email@gmail.com</FormHelperText>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Teléfono</FormLabel>
        <NumberInput >
          <NumberInputField name="telefono" onChange={changed} />
        </NumberInput>
      </FormControl>
      <Button mt={4} colorScheme='teal' type='submit' onClick={sendForm}>Enviar</Button>
      <br />
      <br />
      {saved === 'saved' ?
        <AlertaSuccess />
        : ''}
      {saved === 'error' ?
        <AlertaError mensaje={mensaje}/> 
      :''}

    </>


  )
}
