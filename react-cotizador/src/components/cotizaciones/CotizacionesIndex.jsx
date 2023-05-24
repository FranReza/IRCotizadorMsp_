import React, { Fragment, useState } from 'react';

//importamos los componentes de este index
import BuscadorClientes from './BuscadorClientes';
import FechasCotizacion from './FechasCotizacion';
import TablaProductos from './TablaProductos';
import Desgloce from './Desgloce';

const CotizacionesIndex = () => {

  //estados
  const [clienteActivo, setClienteActivo] = useState(false);



  return (
    <Fragment>
      <div className="flex justify-between m-5 h-full">
        {/*importamos el componente de buscador de clientes aquí*/}
        <BuscadorClientes 
          onClienteActivo={() => setClienteActivo(true)}/>
        {/*importamos el componente que asigna las fechas de la cotización aquí*/}
        <FechasCotizacion />
      </div>
      <div className="flex flex-row">
        {/*importamos el componente de la tabla de productos aquí*/}
        <TablaProductos
          onClienteActivo={ clienteActivo }/>
        {/*importamos el componente de desgloce de totales aquí*/}
        <Desgloce/>
      </div>
    </Fragment>
  );
}; 

export default CotizacionesIndex;