import { ChakraProvider } from '@chakra-ui/react'
import { ColorMode } from './components/ColorMode'
import { FormBrigadista } from './components/FormBrigadista'
import { ListarBrigadista } from './components/ListarBrigadista'

function App() {


  return (
    <ChakraProvider>
      <ColorMode/>
        <FormBrigadista/>
        <ListarBrigadista/>
    </ChakraProvider>
  )
}

export default App
