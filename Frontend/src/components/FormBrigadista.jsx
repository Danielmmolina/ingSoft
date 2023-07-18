import { Button, FormControl, FormHelperText, FormLabel, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react"
import { Global } from '../helpers/Global'
import { useForm } from "../hooks/useForm"
import { useState } from "react";
import { AlertaSuccess } from "./AlertaSuccess";
import { AlertaError } from "./AlertaError";

export const FormBrigadista = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_saved");

  const sendForm = async (e) => {
    e.preventDefault();
    let newBrigadista = form;
    console.log('form', newBrigadista);

    const request = await fetch(Global.url + 'createBrigadista', {
      method: 'POST',
      body: JSON.stringify(newBrigadista),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await request.json();
    console.log(data);
    if (data.status === 'success') {
      setSaved("saved");
    } else {
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

        <FormControl>
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
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input type='email' name="email" onChange={changed} />
        <FormHelperText>email@gmail.com</FormHelperText>
      </FormControl>

      <FormControl>
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
        : <AlertaError />}

    </>


  )
}
