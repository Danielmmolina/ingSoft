import React, { useState, useEffect } from 'react';
import { Global } from '../helpers/Global';
import { Checkbox, CheckboxGroup, Container, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Select, ModalFooter, List, ListItem } from "@chakra-ui/react"

export const ListarCuadrilla = () => {
  const [cuadrillas, setCuadrillas] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [brigadistas, setBrigadistas] = useState([]);
  const [selectedBrigadista, setSelectedBrigadista] = useState(null);
  const [selectedId, setSelectedId] = React.useState("");
  const [isOpenId, setIsOpenId] = useState(false);

  //AQUI OBTENGO LAS CUADRILLAS
  useEffect(() => {
    const obtenerCuadrillas = async () => {
      try {
        const response = await fetch(Global.url + "getCuadrilla", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setCuadrillas(data);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerCuadrillas();
  }, []);

  //AQUI OBTENGO LOS BRIGADISTAS
  const open = async () => {
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
    setIsOpen(true);
  };

//EXPORTAR LISTADO DE CUADRILLAS
  const handleExport = () => {
    let url;
    url = "http://localhost:3001/api/exportCuadrilla";

    window.location.href = url;
  };

//EXPORTAR LA CUADRILLA POR NOMBRE
  const handleExportID = () => {
    let url;
    url = `http://localhost:3001/api/exportCuadrilla/${selectedId}`;

    window.location.href = url;
  };

  //ESTADO DE LA SELECCION
  const handleIdChange = (event) => {
    setSelectedId(event.target.value);
  };

  //CERRAR RECUADRO 
  const close = () => {
    setIsOpen(false);
  };
  //SELECCION DE BRIGADISTAS
  const seleccion = (event) => {
    setSelectedBrigadista(event.target.value);
  };

  return (
    <>
      <Heading as={"h1"} mt={"50"} fontSize="2em" textAlign="center" pb={"10"}>
        Cuadrillas
      </Heading>
      <Container maxW="container.xl">
        <TableContainer pb={"100"}>

                              {/* BOTONES PARA EXPORTAR */}

          <Container maxW='container.xl' display='flex' justifyContent='flex-end'>
           <Button colorScheme="teal" variant="outline" onClick={handleExport}>Exportar</Button>
           <Button colorScheme="teal" variant="outline" onClick={() => setIsOpenId(true)} ml={2}>Exportar por nombre</Button>
          </Container>

                          {/* LISTADO */}

          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Nombre</Th>
                <Th>Brigadistas</Th>
                <Th> </Th>                  {/* DEJE ESTE ESPACIO PARA EL BOTÓN */}
                <Th>Sector</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cuadrillas.map((cuadrilla) => {
                return (
                  <Tr key={cuadrilla._id}>
                    <Td>{cuadrilla.nombre}</Td>
                    <Td>{cuadrilla.brigadistas.map((brigadista) => (<li key={brigadista.nombre}> {brigadista.nombre} {brigadista.apellido}</li>))}</Td>
                    <Td><Button onClick={open}>Añadir brigadista</Button></Td>
                    <Td>{cuadrilla.sector}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>

                {/* AÑADIR BRIGADISTA MODAL */}

      <Modal isOpen={isOpen} onClose={close}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Añadir brigadista</ModalHeader>
          <ModalCloseButton /> {/* EL CLOSE BUTTON AÑADE EL BOTON DE CERRAR ARRIBA A LA DERECHA */}
          <ModalBody>
          <CheckboxGroup onChange={seleccion}>
           <List>
            {brigadistas.map((brigadista) => (
            <ListItem key={brigadista.nombre}>
             <Checkbox value={brigadista.nombre}>{brigadista.nombre} {brigadista.apellido}</Checkbox>
             
                  </ListItem>
               ))}
                </List>
              </CheckboxGroup>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={close}>Cerrar</Button>
            <Button colorScheme="blue" isDisabled={!selectedBrigadista}>Añadir</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

                {/* EXPORTAR POR NOMBRE MODAL*/}

      <Modal isOpen={isOpenId} onClose={() => setIsOpenId(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Exportar por nombre</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select placeholder="Selecciona una cuadrilla" onChange={handleIdChange}>
            {cuadrillas.map((cuadrilla) => (
            <option key={cuadrilla._id} value={cuadrilla._id}>
            {cuadrilla.nombre}
            </option>
        ))}
      </Select>
          </ModalBody>
          
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => setIsOpenId(false)}>Cancelar</Button>
            <Button colorScheme="blue"  onClick={handleExportID}>Exportar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
