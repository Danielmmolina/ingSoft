import { Tab, TabList, Tabs } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <Tabs p={'10'} ml={'200'} variant='soft-rounded' colorScheme='green'>
            <TabList>
                <Tab><Link to={'/inicio/listarBrigadista'}>Inicio</Link></Tab>
                <Tab><Link to={'/inicio/registrarBrigadista'}>Registrar Brigadista</Link></Tab>
                <Tab><Link to={'/inicio/listarBrigadista'}>Ver Brigadistas</Link></Tab>
                <Tab><Link to={'/inicio/ListarPracticas'}>Ver Practicas</Link></Tab>
                <Tab><Link to={'/inicio/crearPractica'}>Crear Practica</Link></Tab>
                <Tab><Link to={'/inicio/ListarCuadrilla'}>Ver Cuadrillas</Link></Tab>
                <Tab><Link to={'/inicio/Exportar'}>Exportar CSV</Link></Tab>
            </TabList>
        </Tabs>
    )
}
