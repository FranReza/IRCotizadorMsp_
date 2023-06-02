import React, { Fragment, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

// Importar componentes
import BuscadorClientes from './BuscadorClientes';
import FechasCotizacion from './FechasCotizacion';
import TablaProductos from './TablaProductos';
import Desgloce from './Desgloce';

//importamos zustand js 
import { useArticulosStore } from '../../store/articulosStore';
import { useClienteStore } from '../../store/clienteStore';
import { useStore } from '../../store/fechaCotizacionStore'; //fecha
import { useTotalesStore } from '../../store/totalesStore';

const CotizacionesIndex = () => {

  //zustand js 
  const listaArticulos = useArticulosStore((state) => state.listaArticulos);
  const cliente = useClienteStore((state) => state);
  const fechas = useStore((state) => state);
  const { subtotaldoc, impuestosTotaldoc, totalGeneral } = useTotalesStore();
  //usestate
  const [clienteActivo, setClienteActivo] = useState(false);
  const [descuentoExtra, setDescuentoExtra] = useState(0);

  const handleDescuentoExtraChange = (event) => {
    const { value } = event.target;
    setDescuentoExtra(parseFloat(value));
  };

  const handleGrabarCotizacion = async () => {
    try {
      const response = await axios.get('http://localhost:5000/obtener-vendedores');
      const vendedores = response.data;
  
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
                title: 'Selecciona un vendedor',
                input: 'select',
                inputOptions: {
                  ...vendedores.reduce((options, vendedor) => {
                    options[vendedor.VENDEDOR_ID] = vendedor.NOMBRE;
                    return options;
                  }, {}),
                },
                showCancelButton: true,
                confirmButtonText: 'Continuar',
                cancelButtonText: 'Cancelar',
                allowOutsideClick: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  const vendedorIdSeleccionado = result.value;
                  //const vendedorSeleccionado = vendedores.find((vendedor) => vendedor.VENDEDOR_ID === vendedorIdSeleccionado);
  
                  console.log(vendedorIdSeleccionado);
                  console.log(metodoPago);

                  Swal.fire({
                    title: 'Enviando solicitud...',
                    showCancelButton: false,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    didOpen: () => {
                      Swal.showLoading();
                      
                      const cotizacionjson = {
                        CLIENTE: cliente,
                        FECHAS: fechas,
                        ARTICULOS: listaArticulos,
                        METODO_PAGO: metodoPago,
                        VENDEDOR_ID: vendedorIdSeleccionado,
                        SUBTOTAL_DOC: subtotaldoc,
                        IMPUESTOS_TOTAL_DOC: impuestosTotaldoc,
                        TOTAL_GENERAL: totalGeneral
                      }
 
                      console.log(cotizacionjson);

                      axios.post('http://localhost:5000/grabar-cotizacion', cotizacionjson);


                      // Aquí puedes realizar la solicitud al servidor
                      // Puedes utilizar Axios o la biblioteca que prefieras para hacer la solicitud
                      
                      // Ejemplo de solicitud usando Axios
                      /*axios.post('http://localhost:5000/enviar-cotizacion', data)
                        .then((response) => {
                          // Aquí puedes manejar la respuesta del servidor después de enviar la cotización
                          // Puedes mostrar un mensaje de éxito, redirigir al usuario, etc.
                          
                          Swal.fire({
                            title: 'Éxito',
                            text: 'La cotización se envió correctamente.',
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                          });
                        })
                        .catch((error) => {
                          // Aquí puedes manejar los errores de la solicitud al servidor
                          // Puedes mostrar un mensaje de error, notificar al usuario, etc.
                          
                          Swal.fire({
                            title: 'Error',
                            text: 'Hubo un error al enviar la cotización.',
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                          });
                        });*/
                    }
                  });
                  
                  // Realizar acciones necesarias después de los mensajes emergentes
                  // Puedes utilizar el objeto vendedorSeleccionado que contiene tanto el ID como el nombre
                  // ...
  
                  // Ejemplo de solicitud POST con el ID del vendedor
                  /*axios.post('http://localhost:5000/grabar-cotizacion', {
                    vendedorId: vendedorIdSeleccionado,
                    metodoPago: metodoPago,
                  }).then((response) => {
                    // Manejar la respuesta de la solicitud POST
                  }).catch((error) => {
                    // Manejar el error de la solicitud POST
                  });*/
                }
              });
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
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
