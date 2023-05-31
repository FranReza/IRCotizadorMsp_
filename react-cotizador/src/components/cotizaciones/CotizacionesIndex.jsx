import React, { Fragment, useState } from 'react';
import Swal from 'sweetalert2';
// Importar componentes
import BuscadorClientes from './BuscadorClientes';
import FechasCotizacion from './FechasCotizacion';
import TablaProductos from './TablaProductos';
import Desgloce from './Desgloce';

//importamos zustand js 
import { useArticulosStore } from '../../store/articulosStore';
import { useClienteStore } from '../../store/clienteStore';
import { useStore } from '../../store/fechaCotizacionStore'; //fecha

const CotizacionesIndex = () => {

  //zustand js 
  const listaArticulos = useArticulosStore((state) => state.listaArticulos);
  const cliente = useClienteStore((state) => state);
  const fechas = useStore((state) => state);

  //usestate
  const [clienteActivo, setClienteActivo] = useState(false);
  const [descuentoExtra, setDescuentoExtra] = useState(0);

  const handleDescuentoExtraChange = (event) => {
    const { value } = event.target;
    setDescuentoExtra(parseFloat(value));
  };

  const handleGrabarCotizacion = () => {
    // Aquí puedes realizar las acciones necesarias al grabar la cotización
    // Puedes acceder al valor de descuentoExtra y otros datos relevantes desde aquí
    // Por ejemplo, puedes guardar los valores en una base de datos, enviar una solicitud HTTP, etc.
    console.log(fechas);
    console.log(cliente);
    console.log(listaArticulos);

    Swal.fire({
      title: 'Confirmar Grabar Cotización',
      text: 'Se grabará la cotización en Microsip.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Selecciona Método de Pago',
          input: 'select',
          inputOptions: {
            efectivo: 'Efectivo',
            transferencia: 'Transferencia',
            credito: 'Crédito',
            debito: 'Débito',
          },
          showCancelButton: true,
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {

            const metodoPago = result.value;

            Swal.fire({
              title: 'Tercer Mensaje',
              text: 'Este es el tercer mensaje emergente.',
              showCancelButton: true,
              confirmButtonText: 'Continuar',
              cancelButtonText: 'Cancelar',
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                // Realizar acciones necesarias después de los mensajes emergentes
                // ...
              }
            });
          }
        });
      }
    });
  };


  const handleCancelarCotizacion = () => {
    // Aquí puedes realizar las acciones necesarias al cancelar la cotización
    // Por ejemplo, limpiar los datos, redirigir a otra página, etc.
  };

  return (
    <Fragment>
      <div className="flex justify-between m-5 h-full">
        <BuscadorClientes onClienteActivo={() => setClienteActivo(true)} />
        <FechasCotizacion />
      </div>
      <div className="flex flex-row">
        <TablaProductos onClienteActivo={clienteActivo} />
        <Desgloce />
      </div>
      <div className="flex justify-end m-5">
        <div className="flex items-center mr-4">
          <h2 className="text-lg font-bold mr-2">Descuento Extra:</h2>
          <input
            type="number"
            className="border rounded px-4 py-2"
            value={descuentoExtra}
            onChange={handleDescuentoExtraChange}
          />
        </div>
        <div>
          <button
            className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleGrabarCotizacion}
          >
            Grabar Cotización
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleCancelarCotizacion}
          >
            Cancelar Cotización
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default CotizacionesIndex;
