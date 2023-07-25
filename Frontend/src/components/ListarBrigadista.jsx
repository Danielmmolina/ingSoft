import { Button, Container, Heading, Input, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import { Global } from '../helpers/Global'
import { useEffect, useState } from "react"
import { ActualizarBrigadista } from "./ActualizarBrigadista";
import { Link, Navigate } from "react-router-dom";

export const ListarBrigadista = () => {
    const [brigadistas, setBrigadistas] = useState([]);
    const [newBrigadista, setNewBrigadista] = useState([]);
    const [emailInput, setEmailInput] = useState([]);
    const [actualizar, setActualizar] = useState(false);
    const [navegar, setNavegar] = useState(false);

    useEffect(() => {
        getBrigadistas();
    }, [])
    useEffect(() => {
        console.log("Brigadista")
        const emailsArray = brigadistas.filter(brigadista => brigadista.email.startsWith(emailInput));
        setBrigadistas(emailsArray);
    }, [emailInput])
    const limpiar = () => {
        
    }
    // useEffect(() => {
    //     getBrigadistas(emailInput);

    // }, [emailInput])

    const getBrigadistas = async (emailInput = '') => {
        const request = await fetch(Global.url + 'getBrigadistas/' + emailInput, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await request.json();

        if (data.status === 'success') {
            setBrigadistas(data.brigadistas);
        }
    }
    const changed = (e) => {
        setEmailInput(e.target.value);
        // let brigadistasEmail = brigadistas.map(brigadista => brigadista.email);
        // setBrigadistas();
        // console.log('emails',brigadistasEmail);
        // brigadistasEmail.forEach((brigadista)=>{
        //     if (brigadista.startsWith(e.target.value)) {
        //         console.log(brigadistas)
        //     }
        // })
    }

    // const searchEmail = (email) => {
    //     console.log(email);
    //     const emailsArray = brigadistas.filter(brigadista => brigadista.email.startsWith(email));
    //     setBrigadistas(emailsArray);
    // }
    const eliminarBrigadista = async (brigadista) => {
        const request = await fetch(Global.url + 'deleteBrigadista/' + brigadista, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'aplication/json'
            }
        });
        setTimeout(() => {
            console.log('a');
            setNavegar(true);
        }, 1000);
        const data = await request.json();
        
    }
    const actualizarBrigadista = async (brigadista) => {
        setNewBrigadista(brigadista)
        setActualizar(true);
        
        //     const request = await fetch(Global.url+'updateBrigadista/'+brigadista,{
        //         method: 'PUT',
        //         body: 
        //         headers: {
        //             'Content-Type': 'aplication/json'
        //         }
        //     })
    }

    return (
        <>
            <Heading as={'h1'}  fontSize='2em' textAlign='center' pb={'10'}>Brigadistas registrados</Heading>
            <Container maxW='container.xl'>
                <Input
                    width={'30%'}
                    my={'10'}
                    color='teal'
                    placeholder='Buscar por email...'
                    _placeholder={{ color: 'inherit' }} onChange={changed}
                />
                <Button>Limpiar</Button>
                <TableContainer pb={'100'}>
                    <Table variant='striped' colorScheme='teal'>
                        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                        <Thead>
                            <Tr>
                                <Th>Nombres</Th>
                                <Th>Rut</Th>
                                <Th>Teléfono</Th>
                                <Th>Email</Th>
                                <Th></Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {brigadistas.map(brigadista => {
                                return (
                                    <Tr key={brigadista._id}>
                                        <Td>{brigadista.nombre + ' ' + ' ' + brigadista.apellido}</Td>
                                        <Td>{brigadista.rut}</Td>
                                        <Td>{brigadista.telefono}</Td>
                                        <Td>{brigadista.email}</Td>
                                        <Td><Button colorScheme='green' onClick={() => actualizarBrigadista(brigadista)}><Link >Actualizar</Link></Button></Td>
                                        <Td><Button colorScheme='red' onClick={() => eliminarBrigadista(brigadista._id)}>Eliminar</Button></Td>
                                        
                                    </Tr>
                                )
                            })}


                        </Tbody>
                    </Table>
                </TableContainer>
            </Container>
            {actualizar? <ActualizarBrigadista newBrigadista={newBrigadista}/> : ''}
            {navegar ? <Navigate to={'/inicio'}/> : ''}
        </>
    )

}
