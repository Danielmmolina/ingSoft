import { ChakraProvider } from '@chakra-ui/react'
import { ColorMode } from './components/ColorMode'
import { FormBrigadista } from './components/FormBrigadista'
import { ListarBrigadista } from './components/ListarBrigadista'
import { ListarPractica } from './components/ListarPracticas'
import { CrearPractica } from './components/createPractica'

function App() {


  return (
    <ChakraProvider>
      <ColorMode/>
        <FormBrigadista/>
        <ListarBrigadista/>
        <ListarPractica/>
        <CrearPractica/>
    </ChakraProvider>
  )
}

export default App
