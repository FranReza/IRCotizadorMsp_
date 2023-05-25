import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { useClienteStore } from '../../store/clienteStore';


const BuscadorClientes = ({ onClienteActivo }) => {
    //usamos la libreria de zustand para lograr esta parte
    const setClienteZustand = useClienteStore((state) => state.setCliente);

    const [busquedaClientes, setBusquedaClientes] = useState('');
    const [resultadosClientes, setResultadosClientes] = useState([]);
    const [showResultadosClientes, setShowResultadosClientes] = useState(false);
    const [clienteSeleccionado, setClienteSeleccionado] = useState({});

    const axiosBuscarCliente = async (e) => {
        const query = e.target.value;
        if (query !== '') {
            setBusquedaClientes(query);
            try {
                const response = await axios.get(`http://localhost:5000/buscar-cliente?query=${query}`);
                if (response) {
                    setResultadosClientes(response.data);
                    setShowResultadosClientes(true);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setShowResultadosClientes(false);
            setBusquedaClientes('');
        }
    };

    const handleSeleccionarCliente = (cliente) => {
        
        setClienteSeleccionado(cliente);

        //aqui metemos lo nuevo de zustand
        setClienteZustand(cliente);

        setShowResultadosClientes(false);
        setBusquedaClientes('');
        onClienteActivo(true); //aqui esta para validar
    };

    return (
        <Fragment>
            <div className="w-8/12 h-50 mr-4">
                <div className="bg-white rounded-lg shadow-lg p-4 relative">
                    <h2 className="text-lg font-bold mb-4">Nueva Cotización</h2>
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Buscar cliente"
                            className="border rounded-l px-4 py-2 w-full"
                            value={busquedaClientes}
                            onChange={axiosBuscarCliente}
                        />
                        <button
                            type="button"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"

                        >
                            Buscar
                        </button>
                    </div>
                    {showResultadosClientes && (
                        <ul className="absolute left-0 w-full mt-0 bg-white border border-gray-300 rounded">
                            <li className="flex flex-col">
                                {resultadosClientes.map((resultado) => (
                                    <span
                                        key={resultado.CLIENTE_ID}
                                        className="py-2 px-4 cursor-pointer hover:bg-gray-200 w-full"
                                        onClick={() => handleSeleccionarCliente(resultado)}
                                    >
                                        {resultado.NOMBRE_CLIENTE}
                                    </span>
                                ))}
                            </li>
                        </ul>
                    )}
                    <div className="mt-4" style={{ display: 'block' }}>
                        <div className='grid grid-cols-2 gap-1'>
                            <div>
                                <p className="mt-2 font-bold">ID: {clienteSeleccionado.CLIENTE_ID}</p>
                                <p className="mt-2 font-bold">Cliente: {clienteSeleccionado.NOMBRE_CLIENTE}</p>
                                <p className="mt-2 font-bold">E-mail: {clienteSeleccionado.EMAIL}</p>
                            </div>
                            <div>
                                <p className="mt-2 font-bold">Moneda: {clienteSeleccionado.NOMBRE_MONEDA}</p>
                                <p className="mt-2 font-bold">Condicion de pago: {clienteSeleccionado.NOMBRE_CONDICION}</p>
                                <p className="mt-2 font-bold">RFC/CURP: {clienteSeleccionado.RFC_CURP}</p>
                            </div>
                        </div> 

                    </div>

                </div>
            </div>
        </Fragment>
    );
};

export default BuscadorClientes;
