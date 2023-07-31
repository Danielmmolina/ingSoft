import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useForm } from "../hooks/useForm";
import { useEffect, useState } from "react";
import { Global } from "../helpers/Global";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AlertaError } from "./AlertaError";

export const ActualizarCuadrilla = () => {
  useEffect(() => {
    getCuadrilla();
    fetchBrigadistas();
  }, []);

  const params = useParams();
  const id = params.id;
  const { form, changed } = useForm({});
  const [cuadrilla, setCuadrilla] = useState({});
  const [saved, setSaved] = useState("not_saved");
  const [mensaje, setMensaje] = useState("");
  const [brigadistas, setBrigadistas] = useState([]);
  const [brigadistaCuadrilla, setBrigadistaCuadrilla] = useState([]);
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

  const sendForm = async (e) => {
    e.preventDefault();
    let updateCuadrilla = {
      ...form,
      brigadistas: brigadistaCuadrilla,
    };
    const request = await fetch(Global.url + "updateCuadrilla/" + id, {
      method: "PUT",
      body: JSON.stringify(updateCuadrilla),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await request.json();
    if (data.status === "success") {
      setSaved("saved");
      console.log(data);
      // Aquí redirigimos manualmente a ListarCuadrilla
      navigate("/ListarCuadrilla");
    } else {
      let message = data.message;
      setMensaje(message);
      setSaved("error");
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
        Actualizar Cuadrilla
      </Heading>
      <Container maxW="container.sm">
        <form>
          <FormControl mb="3" isRequired>
            <FormLabel>Nombre</FormLabel>
            <Input
              defaultValue={cuadrilla.nombre}
              type="text"
              name="nombre"
              onChange={changed}
            />
          </FormControl>

          <FormControl mb="3">
            <FormLabel>Brigadistas</FormLabel>
            <CheckboxGroup
              value={brigadistaCuadrilla}
              onChange={handleBrigadistasSelection}
            >
              <Box
                width="100%"
                height="300px"
                maxHeight="300px"
                overflowY="auto"
                borderWidth="2px"
                borderStyle="solid"
                borderColor="rgba(128, 128, 128, 0.2)"
                borderRadius="8px"
                padding="8px"
              >
                <List>
                  {brigadistas.map((brigadista) => (
                    <ListItem key={brigadista._id}>
                      <Checkbox
                        value={brigadista._id}
                        isChecked={brigadista.isChecked}
                      >
                        {brigadista.nombre} {brigadista.apellido}
                      </Checkbox>
                    </ListItem>
                  ))}
                </List>
              </Box>
              <FormHelperText>
                Seleccione los brigadistas que participarán en la cuadrilla
              </FormHelperText>
            </CheckboxGroup>
          </FormControl>

          <FormControl mb="3" isRequired>
            <FormLabel>Sector</FormLabel>
            <Input
              defaultValue={cuadrilla.sector}
              type="text"
              name="sector"
              onChange={changed}
            />
          </FormControl>

          <Box marginLeft={"60"} display="flex" justifyContent="flex-end">
            <Button colorScheme="teal" variant="outline">
              <Link to={"/ListarCuadrilla"}>Cancelar</Link>
            </Button>
            <Button ml="2" colorScheme="teal" type="submit" onClick={sendForm}>
              Enviar
            </Button>
          </Box>
        </form>
        {saved === "error" ? <AlertaError mensaje={mensaje} /> : ""}
      </Container>
    </>
  );
};