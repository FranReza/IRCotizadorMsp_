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
  const clienteStore = useClienteStore();
  const cliente = useClienteStore((state) => state);
  const corregirCorreo = useClienteStore((state) => state.corregirCorreo);
  const setCliente = useClienteStore((state) => state.setCliente);
  const fechas = useStore((state) => state);
  const { setDescuentoExtra } = useTotalesStore((state) => state);
  const { subtotaldoc, impuestosTotaldoc, desctoExtra, totalGeneral } = useTotalesStore();

  //usestate
  const [clienteActivo, setClienteActivo] = useState(false);
  const [descuentoExtra, setDescuentoExtraState] = useState(0);



  const validateEmail = (email) => {
    // Expresión regular para validar el formato de un correo electrónico
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    return emailRegex.test(email);
  };

  const corregirMail = (correo) => {
    cliente.setCliente((prevCliente) => ({
      ...prevCliente,
      EMAIL: correo,
    }));
  };


  const handleDescuentoExtraChange = (event) => {

    if (listaArticulos === 0) {
      alert('Aun no hay nada en la tabla');
      setDescuentoExtraState(0);
      return;
    }

    const { value } = event.target;
    let parsedValue = parseFloat(value);

    // Convertir el valor a cadena y luego a número para eliminar los ceros a la izquierda
    parsedValue = Number(parsedValue.toString());

    // Verificar si el valor es un número válido
    if (isNaN(parsedValue) || parsedValue < 0) {
      parsedValue = 0; // Si no es válido, establecer el valor en cero
    }

    if (parsedValue > subtotaldoc) {
      Swal.fire({
        title: 'Valor inválido',
        text: 'El descuento no puede ser mayor al subtotal',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        parsedValue = 0; // Establecer el valor en cero
        setDescuentoExtra(parsedValue);
        setDescuentoExtraState(parsedValue);
      });
    } else {
      setDescuentoExtra(parsedValue);
      setDescuentoExtraState(parsedValue);
    }
  };

  const handleGrabarCotizacion = async () => {

    if (listaArticulos.length === 0) {
      alert('Aun no hay nada en la tabla');
      return;
    }

    try {
      const response = await axios.get('http://vaespersianas.ddns.net:5000/obtener-vendedores');
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
                  const { EMAIL } = cliente;

                  let confirmButtonText = 'Enviar';
                  let showCancelButton = true;
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
                        DESCUENTO_EXTRA: desctoExtra,
                        TOTAL_GENERAL: totalGeneral
                      }

                      axios.post('http://vaespersianas.ddns.net:5000/grabar-cotizacion', cotizacionjson,
                        {
                          responseType: 'blob'
                        })
                        .then((response) => {
                          console.log(response.status);
                          const url = window.URL.createObjectURL(new Blob([response.data]));
                          const link = document.createElement('a');
                          link.href = url;
                          console.log(link);
                          link.setAttribute('download', 'cotizacion.pdf');
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                          window.URL.revokeObjectURL(url);

                          Swal.fire({
                            title: 'Éxito',
                            text: 'La cotización se descargó correctamente.',
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                          });
                        })
                        .catch((error) => {
                          console.log(error);
                          Swal.fire({
                            title: 'Problemas de conexión',
                            text: 'La cotización se grabo en microsip pero no se pudo descargar en su navegador, contacte al administrador del sistema.',
                            icon: 'info',
                            confirmButtonText: 'Aceptar'
                          });
                        });
                    }
                  });
                
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
        {listaArticulos.length > 0 && (
          <div className="flex items-center mr-4">
            <h2 className="text-lg font-bold mr-2">Descuento Extra en Importe:</h2>
            <input
              type="number"
              className="border rounded px-4 py-2"
              min={0}
              value={descuentoExtra}
              onChange={handleDescuentoExtraChange}
              inputMode="decimal" // Asegura que se trate como un número
            />
          </div>
        )}
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
