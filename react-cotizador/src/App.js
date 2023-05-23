import React, { Fragment } from "react";
//routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//importamos el layout
import Header from "./components/layouts/Header.jsx";
//importamos las vistas de componentes
import CotizacionesIndex from './components/cotizaciones/CotizacionesIndex';
import ClientesIndex from "./components/clientes/ClientesIndex";

function App() {
  return (

    <Router>
      <Fragment>
        <Header />
        <Routes>
          <Route path="/" element={<CotizacionesIndex />} />
          <Route path="/nuevo-cliente" element={<ClientesIndex />} />
          <Route path=""/>
        </Routes>
      </Fragment>
    </Router>

  );
};

export default App;
