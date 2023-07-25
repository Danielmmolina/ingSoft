import { Box, Button, Container, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react"
import { useForm } from "../hooks/useForm";
import { useState } from "react";
import { Global } from '../helpers/Global'

export const ActualizarBrigadista = ({ newBrigadista }) => {
    const { form, changed } = useForm({});
    const [saved, setSaved] = useState("not_saved");
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState();

    const sendForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        let updateBrigadista = form;

        const request = await fetch(Global.url + 'updateBrigadista/'+newBrigadista._id1, {
            method: 'PUT',
            body: JSON.stringify(updateBrigadista),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await request.json();
        console.log('nueva data',data)
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
        <>
            <Heading as={'h1'} fontSize='2em' textAlign='center' pb={'10'}>Actualizar Brigadista</Heading>
            <Container maxW='container.sm'>
                <HStack spacing='10px'>

                    <FormControl >
                        <FormLabel>Nombre</FormLabel>
                        <Input placeholder='Nombre' onChange={changed} name="nombre" defaultValue={newBrigadista.nombre} />
                    </FormControl>

                    <FormControl >
                        <FormLabel>Apellido</FormLabel>
                        <Input placeholder='Apellido' name="apellido" onChange={changed} defaultValue={newBrigadista.apellido} />

                    </FormControl>
                </HStack>
                <HStack spacing='10px'>
                    <FormControl >
                        <FormLabel>Rut</FormLabel>
                        <Input placeholder='Rut' name="rut" onChange={changed} defaultValue={newBrigadista.rut} />
                        <FormHelperText>ej: 12345678-2</FormHelperText>
                    </FormControl>

                    <FormControl >
                        <FormLabel>Edad</FormLabel>
                        <Input placeholder='edad' name="edad" onChange={changed} defaultValue={newBrigadista.edad} />
                        <FormHelperText>Debe ser mayor a 18</FormHelperText>

                    </FormControl>

                </HStack>
                <FormControl >
                    <FormLabel>Email</FormLabel>
                    <Input type='email' name="email" onChange={changed} defaultValue={newBrigadista.email} />
                    <FormHelperText>email@gmail.com</FormHelperText>
                </FormControl>

                <FormControl >
                    <FormLabel>Teléfono</FormLabel>
                    <Input type='telefono' name="telefono" onChange={changed} defaultValue={newBrigadista.telefono} />
                    <FormHelperText>Debe comenzar con 9 y seguir de 8 digitos</FormHelperText>
                </FormControl>
                <Box marginLeft={'60'}>
                    <Button mt={4} colorScheme='teal' type='submit' onClick={sendForm}>Enviar</Button>
                </Box>
                <br />
                {/* {saved === 'saved' ?
                    <AlertaSuccess />
                    : ''}
                {saved === 'error' ?
                    <AlertaError mensaje={mensaje} />
                    : ''}
                {loading ?
                    <Box marginLeft={'60'}>
                        <CircularProgress isIndeterminate color='green.300' />
                    </Box>
                    : ''
                } */}
            </Container>
        </>

    )
}
