import { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  CheckboxGroup,
  Checkbox,
  Button,
  List,
  ListItem,
  Container,
  Heading,
  Box,
  Flex,
} from '@chakra-ui/react';
import { Global } from '../helpers/Global';

export const FormCuadrilla = () => {
  const [nombre, setNombre] = useState('');
  const [brigadistas, setBrigadistas] = useState([]);
  const [sector, setSector] = useState('');
  const [seleccion, setSeleccion] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nombre: nombre,
      brigadistas: seleccion,
      sector: sector,
    };
    const request = await fetch(Global.url + 'cuadrilla', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const response = await request.json();
  
    if (response.status == 'success') {
      console.log("yes")
    } else {
      let message = response.message
      console.log(message)
    }
  }
  
  const fetchBrigadistas = async () => {
    try {
      const response = await fetch(Global.url + "getBrigadistas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.brigadistas) {
        setBrigadistas(data.brigadistas);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBrigadistas();
  }, []);


  return (
    <>
    <Heading as={'h1'} fontSize='2em' textAlign='center' pb={'10'}>Crear Cuadrilla</Heading>
    <Container maxW='container.sm'>
    <form onSubmit={onSubmit}>
      <FormControl mb="3" isRequired>
        <FormLabel>Nombre</FormLabel>
        <Input type="text"  placeholder='Ingrese nombre de la cuadrilla' value={nombre} onChange={(event) => setNombre(event.target.value)}/>

      </FormControl>

      <FormControl mb="3" >
        <FormLabel>Brigadistas</FormLabel>
        <CheckboxGroup value={seleccion} onChange={setSeleccion}>
        <Box width="100%" height='300px'maxHeight="300px" overflowY="auto" borderWidth='2px' borderStyle='solid' borderColor='rgba(128, 128, 128, 0.2)' borderRadius='8px' padding="8px">
         <List>
        {brigadistas.map((brigadista) => (
        <ListItem key={brigadista.rut}>
        <Checkbox value={brigadista.rut}>{brigadista.nombre} {brigadista.apellido} </Checkbox>
      </ListItem>
    ))}
  </List>
</Box>

</CheckboxGroup>

      </FormControl >
      <FormControl mb="3" isRequired>
        <FormLabel>Sector</FormLabel>
        <Input placeholder="Ingrese sector de la cuadrilla" type="text" value={sector} onChange={(event) => setSector(event.target.value)}/>
      </FormControl>
      <Flex justifyContent="flex-end">
      <Button colorScheme="blue" type="submit">Crear</Button>
      </Flex>
    </form>
    </Container>
    </>
  );
};
