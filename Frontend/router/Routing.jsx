import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import { LayoutMain } from '../layout/LayoutMain'
import { ListarBrigadista } from '../src/components/ListarBrigadista';
import { ActualizarBrigadista } from '../src/components/ActualizarBrigadista';
import { FormBrigadista } from '../src/components/FormBrigadista';
import { Cargando } from '../src/components/Cargando';
import { ListarPractica } from '../src/components/ListarPracticas';


export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/inicio' element={<LayoutMain />}>
          <Route index element={<ListarBrigadista />} />
          <Route path='cargando' element={<Cargando />} />
          <Route path='listarBrigadista' element={<ListarBrigadista />} />
          <Route path='actualizarBrigadista/:id' element={<ActualizarBrigadista />} />
          <Route path='registrarBrigadista' element={<FormBrigadista />} />
          <Route path='listarPracticas' element={<ListarPractica />} />
          
        </Route>

        <Route path='*' element={
          <>
            <p>
              <h1>ERROR 404</h1>
              <Link to='/inicio'>Volver al inicio</Link>
            </p>
          </>
        }
        />
      </Routes>
    </BrowserRouter>
  )
}
