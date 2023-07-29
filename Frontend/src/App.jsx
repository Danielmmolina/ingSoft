import { ChakraProvider } from '@chakra-ui/react'
import { ColorMode } from './components/ColorMode'
import { ListarPractica } from './components/ListarPracticas'


function App() {


  return (
    <ChakraProvider>
      <ColorMode/>
       
        <ListarPractica/>
        
    </ChakraProvider>
  )
}

export default App
