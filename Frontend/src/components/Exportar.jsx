import * as React from "react";
import { VStack, Select, Container, Button, Heading } from "@chakra-ui/react";
import { Global } from '../helpers/Global'

export const Exportar = () => {
    const [selectedValue, setSelectedValue] = React.useState("");
    const [selectedId, setSelectedId] = React.useState("");
    const [cuadrillas, setCuadrillas] = React.useState([])

 const handleOptionChange = (event) => {
    setSelectedValue(event.target.value);
    if (event.target.value === "cuadrilla") {
      fetch(Global.url + 'getCuadrilla')
      .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCuadrillas(data);
        });
    }
  };

    const handleIdChange = (event) => {
      setSelectedId(event.target.value);
    };
  
    const handleExport = () => {
        let url;
        if (selectedValue === "cuadrilla") {
          url = `http://localhost:3001/api/exportCuadrilla/${selectedId}`;
        } else if (selectedValue === "cuadrillas") {
          url = "http://localhost:3001/api/exportCuadrilla";
        } else if (selectedValue === "brigadistas") {
          url = "http://localhost:3001/api/exportBrigadistas";
        } else if (selectedValue === "practicas") {
          url = "http://localhost:3001/api/exportPracticas";
        }
    
        window.location.href = url;
      }; 
  
    return (
    <Container maxW='container.sm'>
      <VStack spacing={3}>
      <Heading as={'h1'} fontSize='2em' textAlign='center' pb={'10'}>Exportar CSV</Heading>
        <Select
          placeholder="Seleccione una opción"
          onChange={handleOptionChange}
          w="50%"
        >
          <option value="cuadrilla">Cuadrilla</option>
          <option value="cuadrillas">Cuadrillas</option>
          <option value="brigadistas">Brigadistas</option>
          <option value="practicas">Practicas</option>
        </Select>
        {selectedValue === "cuadrilla" && (
        
        <Select
         placeholder="Selecciona una cuadrilla"
         onChange={handleIdChange}
         w="50%"
      >
        {cuadrillas.map((cuadrilla) => (
          <option key={cuadrilla._id} value={cuadrilla._id}>
            {cuadrilla.nombre}
          </option>
        ))}
      </Select>
    )}
        <Button colorScheme="blue" onClick={handleExport} isDisabled={!selectedValue || (selectedValue === "cuadrilla" && !selectedId)}>Exportar</Button>
    </VStack>
    </Container>
    );
  };