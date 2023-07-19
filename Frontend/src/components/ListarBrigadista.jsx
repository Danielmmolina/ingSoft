import { Container, Heading, Input, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { Global } from '../helpers/Global'
import { useEffect, useState } from "react"

export const ListarBrigadista = () => {
    const [brigadistas, setBrigadistas] = useState([]);
    const [emailInput, setEmailInput] = useState([]);

    useEffect(() => {
        getBrigadistas();
    }, [])

    useEffect(() => {
        getBrigadistas();
    }, [brigadistas])
    
    const getBrigadistas = async () => {
        const request = await fetch(Global.url + 'getBrigadistas', {
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
        console.log(e.target.value);
        // let brigadistasEmail = brigadistas.map(brigadista => brigadista.email);
        // setBrigadistas();
        // console.log('emails',brigadistasEmail);
        // brigadistasEmail.forEach((brigadista)=>{
        //     if (brigadista.startsWith(e.target.value)) {
        //         console.log(brigadistas)
        //     }
        // })
    }
    return (
        <>
            <Heading as={'h1'} mt={'300'} fontSize='2em' textAlign='center' pb={'10'}>Brigadistas registrados</Heading>
            <Container maxW='container.xl'>
                <Input
                    width={'30%'}
                    my={'10'}
                    color='teal'
                    placeholder='Buscar por email...'
                    _placeholder={{ color: 'inherit' }} onChange={changed}
                />
                <TableContainer pb={'100'}>
                    <Table variant='striped' colorScheme='teal'>
                        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                        <Thead>
                            <Tr>
                                <Th>Nombres</Th>
                                <Th>Rut</Th>
                                <Th>Teléfono</Th>
                                <Th>Email</Th>
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
                                    </Tr>
                                )
                            })}


                        </Tbody>
                    </Table>
                </TableContainer>
            </Container>

        </>
    )
}
