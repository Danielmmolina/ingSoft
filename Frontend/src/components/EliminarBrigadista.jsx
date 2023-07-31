import { Box, Button, Container, Heading, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Global } from "../helpers/Global";
import { Link, useParams, useNavigate } from "react-router-dom";

export const EliminarBrigadista = () => {
  useEffect(() => {
    getCuadrilla();
    fetchBrigadistas();
  }, []);

  const params = useParams();
  const id = params.id;
  const [cuadrilla, setCuadrilla] = useState({});
  const [brigadistas, setBrigadistas] = useState([]);
  const [brigadistaCuadrilla, setBrigadistaCuadrilla] = useState([]);
  const [selectedBrigadista, setSelectedBrigadista] = useState("");
  const navigate = useNavigate();

  const getCuadrilla = async () => {
    const request = await fetch(Global.url + "getCuadrillaID/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await request.json();
    console.log(data);
    if (data.status === "success") {
      setCuadrilla(data.cuadrillas);
      setBrigadistaCuadrilla(data.cuadrillas.brigadistas);
      console.log("BRIGADISTAS EN LA CUADRILLA:", brigadistaCuadrilla);
    }
  };

  const handleRemoveBrigadista = async () => {
    if (!selectedBrigadista) {
      console.log("Debes seleccionar un brigadista para eliminar.");
      return;
    }

    try {
      const response = await fetch(Global.url + "removeBrigadista/" + id, {
        method: "PUT",
        body: JSON.stringify({ brigadistaId: selectedBrigadista }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status === "success") {
        getCuadrilla();
        navigate("/inicio/ListarCuadrilla");
      } else {
        console.log("Error al eliminar el brigadista:", data.message);
      }
    } catch (error) {
      console.error("Error al eliminar el brigadista:", error);
    }
  };

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
        const filteredBrigadistas = data.brigadistas.filter(
          (brigadista) => !brigadistaCuadrilla.includes(brigadista._id)
        );
        setBrigadistas(filteredBrigadistas);
        console.log("Brigadistas filtrados:", filteredBrigadistas);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleBrigadistasSelection = (selectedBrigadistas) => {
    setBrigadistaCuadrilla(selectedBrigadistas);
  };

  return (
    <>
      <Heading as={"h1"} fontSize="2em" textAlign="center" pb={"10"}>
        Eliminar Brigadista
      </Heading>
      <Container maxW="container.sm">
        <Select
          value={selectedBrigadista}
          onChange={(e) => setSelectedBrigadista(e.target.value)}
        >
          {brigadistas.map((brigadista) => (
            <option key={brigadista._id} value={brigadista._id}>
              {brigadista.nombre} {brigadista.apellido}
            </option>
          ))}
        </Select>

        <Box Box marginLeft={"60"} display="flex" justifyContent="flex-end">
          <Button colorScheme="teal" variant="outline">
            <Link to={"/inicio/ListarCuadrilla"}>Cancelar</Link>
          </Button>
          <Button
            ml="2"
            colorScheme="teal"
            type="submit"
            onClick={handleRemoveBrigadista}
          >
            Enviar
          </Button>
        </Box>
      </Container>
    </>
  );
};
