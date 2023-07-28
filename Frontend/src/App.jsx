import { ChakraProvider } from '@chakra-ui/react'
import { ColorMode } from './components/ColorMode' 
import { ListarCuadrilla } from './components/ListarCuadrilla'
import { Exportar } from './components/Exportar'
import {FormCuadrilla} from './components/FormCuadrilla'

function App() {


  return (
    <ChakraProvider>
        <ListarCuadrilla/>
        <FormCuadrilla/>
        <Exportar/>
      <ColorMode/>
    </ChakraProvider>
  )
}

export default App
