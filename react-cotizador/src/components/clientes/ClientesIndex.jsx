import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ClientesIndex = () => {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [condicionesPago, setCondicionesPago] = useState([]);
  const [condicionPagoSeleccionado, setcondicionPagoSeleccionado] = useState(""); // Estado para almacenar el vendedor seleccionado
  const [rfc, setRfc] = useState("");
  const [moneda, setMoneda] = useState([]);
  const [monedaSeleccionado, setMonedaSeleccionado] = useState(""); // Estado para almacenar el vendedor seleccionado
  const [vendedor, setVendedor] = useState([]);
  const [vendedorSeleccionado, setVendedorSeleccionado] = useState(""); // Estado para almacenar el vendedor seleccionado
  const [archivoPDF, setArchivoPDF] = useState(null); // Estado para almacenar el archivo PDF

  useEffect(() => {
    axios.get('http://vaespersianas.ddns.net:5000/obtener-monedas')
      .then((response) => {
        setMoneda(response.data);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Problemas de conexión',
          text: `${error}`,

        })
      });

    axios.get('http://vaespersianas.ddns.net:5000/obtener-condicionpago')
      .then((response) => {
        setCondicionesPago(response.data);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Problemas de conexión',
          text: `${error}`,

        })
      });

    axios.get('http://vaespersianas.ddns.net:5000/obtener-vendedores')
      .then((response) => {
        setVendedor(response.data);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Problemas de conexión',
          text: `${error}`,

        })
      });

  }, [])

  const handleArchivoChange = (event) => {
    const archivoSeleccionado = event.target.files[0];
    // Aquí puedes manejar el archivo seleccionado, por ejemplo, subirlo a un servidor o almacenarlo en el estado del componente.
    setArchivoPDF(archivoSeleccionado);
  };


  const guardarDatos = () => {
    console.log(archivoPDF);
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('telefono', telefono);
    formData.append('email', email);
    formData.append('condicionPagoSeleccionado', parseInt(condicionPagoSeleccionado));
    formData.append('rfc', rfc);
    formData.append('monedaSeleccionado', parseInt(monedaSeleccionado));
    formData.append('vendedorSeleccionado', parseInt(vendedorSeleccionado));
    formData.append('archivoPDF', archivoPDF);

    console.log(formData);

    // Realizar la solicitud POST a la ruta /guardar-cliente
    axios.post('http://vaespersianas.ddns.net:5000/guardar-cliente', formData)
      .then((response) => {
        // Lógica para manejar la respuesta del servidor si es necesario
        console.log("Respuesta del servidor:", response.data);
        Swal.fire(
          'Exito!',
          `${response.data}`,
          'success'
        );
        window.location.reload();
      })
      .catch((error) => {
        // Lógica para manejar errores si ocurren
        console.error("Error al enviar los datos:", error);
      });


  };

  return (
    <Fragment>
      <div className="flex items-center justify-center h-screen m-20">
        <div className="w-8/12 bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-bold mb-4">Nuevo Cliente</h2>
          <div className="mb-4">
            <label className="block font-bold">Nombre</label>
            <input
              type="text"
              className="border rounded px-4 py-2 w-full"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold">Telefono</label>
            <input
              type="tel"
              className="border rounded px-4 py-2 w-full"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold">E-mail</label>
            <input
              type="email"
              className="border rounded px-4 py-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold">Condiciones de Pago</label>
            <select
              className="border rounded px-4 py-2 w-full"
              value={condicionPagoSeleccionado}
              onChange={(e) => setcondicionPagoSeleccionado(e.target.value)}
            >
              <option value="">Seleccione una opción</option>
              {condicionesPago.map((cp) => (
                <option key={cp.COND_PAGO_ID} value={cp.COND_PAGO_ID}>
                  {cp.NOMBRE}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-bold">RFC</label>
            <input
              type="text"
              className="border rounded px-4 py-2 w-full"
              value={rfc}
              onChange={(e) => setRfc(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold">Moneda</label>
            <select
              className="border rounded px-4 py-2 w-full"
              value={monedaSeleccionado}
              onChange={(e) => setMonedaSeleccionado(e.target.value)}
            >
              <option value="">Seleccione una opción</option>
              {moneda.map((moneda) => (
                <option key={moneda.MONEDA_ID} value={moneda.MONEDA_ID}>
                  {moneda.NOMBRE}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-bold">Vendedor</label>

            <select
              className="border rounded px-4 py-2 w-full"
              value={vendedorSeleccionado}
              onChange={(e) => setVendedorSeleccionado(e.target.value)}
            >
              <option value="">Seleccione una opción</option>
              {vendedor.map((vendedor) => (
                <option key={vendedor.VENDEDOR_ID} value={vendedor.VENDEDOR_ID}>
                  {vendedor.NOMBRE}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-bold">Subir Constancia de Situación Fiscal (opcional)</label>
            <input
              type="file"
              accept=".pdf"
              className="border rounded px-4 py-2 w-full"
              onChange={handleArchivoChange}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={guardarDatos}
            >
              Guardar
            </button>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ClientesIndex;