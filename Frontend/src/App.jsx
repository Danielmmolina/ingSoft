import { ChakraProvider, Container, Heading } from '@chakra-ui/react'
import { ColorMode } from './components/ColorMode'
import { FormBrigadista } from './components/FormBrigadista'

function App() {


  return (
    <ChakraProvider>
      <ColorMode/>
      <Container maxW='container.sm'>
        <Heading as={'h1'} fontSize='2em' textAlign='center' pb={'10'}>Registrar Brigadista</Heading>
        <FormBrigadista/>
      </Container>
    </ChakraProvider>
  )
}

export default App
