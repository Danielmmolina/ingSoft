import { ChakraProvider } from '@chakra-ui/react'
import { ColorMode } from './components/ColorMode' 
import { ListarCuadrilla } from './components/ListarCuadrilla'
import { Exportar } from './components/Exportar'
import {FormCuadrilla} from './components/FormCuadrilla'
import {ActualizarCuadrilla} from './components/ActualizarCuadrilla'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {


  return (
    <ChakraProvider>
        <BrowserRouter>
    <Routes>
      <Route path="/ListarCuadrilla" element={<ListarCuadrilla />} />
      <Route path="/ActualizarCuadrilla/:id" element={<ActualizarCuadrilla />} />
      <Route path="/FormCuadrilla" element={<FormCuadrilla />} />
      <Route path="/Exportar" element={<Exportar />} />
    </Routes>
    </BrowserRouter>
      <ColorMode/>
    </ChakraProvider>
  )
}

export default App
