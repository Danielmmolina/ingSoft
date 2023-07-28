import { ChakraProvider } from '@chakra-ui/react'
import { ColorMode } from './components/ColorMode' 
import { ListarCuadrilla } from './components/ListarCuadrilla'
import { Exportar } from './components/Exportar'

function App() {


  return (
    <ChakraProvider>
        <ListarCuadrilla/>
        <Exportar/>
      <ColorMode/>
    </ChakraProvider>
  )
}

export default App
