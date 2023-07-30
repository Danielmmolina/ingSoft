import { Button, Container, Heading, InputGroup, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Input } from '@chakra-ui/react'

export const Login = () => {
    const [mostrarInput, setMostrarInput] = useState(false);
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const ingresarDatos = () => {
        setMostrarInput(true);
    }

    return (
        <>
            {mostrarInput ?
                <div>
                    <Heading as={'h1'} fontSize='2em' textAlign='center' pb={'10'}>Login</Heading>
                    <Container maxW='container.sm'>
                        <Input placeholder='Basic usage' />
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>

                    </Container>

                </div>

                : <Button m={400} onClick={ingresarDatos}>Login</Button>
            }

        </>


    )
}
