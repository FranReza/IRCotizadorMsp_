import React, { Fragment, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useClienteStore } from '../../store/clienteStore';

const TablaProductos = ({ onClienteActivo }) => {

    const cliente = useClienteStore((state) => state);

    //estados
    //use state para todos los articulos y modal de los articulos
    const [ModalArticulos, setModalArticulos] = useState(false);
    const [buscarArticulos, setbuscarArticulos] = useState('');
    const [showResultadosArticulos, setShowResultadosArticulos] = useState(false);
    const [resultadosArticulos, setResultadosArticulos] = useState([]);

    const [selectedArticulo, setSelectedArticulo] = useState({
        ARTICULO_ID: 0,
        CLAVE_ARTICULO: 0,
        NOMBRE_ARTICULO: '',
        UNIDAD_VENTA: '',
    });

    const [articuloDetalle, setArticuloDetalle] = useState({
        ARTICULO_ID: 0,
        CLAVE_ARTICULO: 0,
        ANCHO: 0,
        ALTO: 0,
        MCUADRADO: 0,
        CANTIDAD: 0,
        PRECIO: 0,
        IMPUESTOS: 0,
        DESCTO: 0,
        TOTAL: 0,
        NOTAS: ''
    });

    const handleAnchoChange = (e) => {
        const value = e.target.value.trim(); // Eliminar espacios en blanco al principio y al final

        if (value === '0' || value === '.') {
            // Si el valor es vacío, 0 o ".", establecer el valor en 1
            setArticuloDetalle((prevDetalle) => ({
                ...prevDetalle,
                ANCHO: '1',
                MCUADRADO: 'N/V'
            }));
        } else {
            const newCuadrado = (parseFloat(value) * parseFloat(articuloDetalle.ALTO)).toFixed(2);

            if (!isNaN(newCuadrado)) {
                // Si el valor es válido, actualizar el estado
                setArticuloDetalle((prevDetalle) => ({
                    ...prevDetalle,
                    ANCHO: value,
                    MCUADRADO: newCuadrado,
                    IMPUESTOS: ((newCuadrado * prevDetalle.PRECIO) * 0.16).toFixed(2),
                    TOTAL: (newCuadrado * prevDetalle.PRECIO).toFixed(2)
                }));
            } else {
                setArticuloDetalle((prevDetalle) => ({
                    ...prevDetalle,
                    ANCHO: value,
                    MCUADRADO: 0,
                }));
            }
        }

        console.log(articuloDetalle);
    };

    const handleAltoChange = (e) => {
        const value = e.target.value.trim(); // Eliminar espacios en blanco al principio y al final

        if (value === '0' || value === '.') {
            // Si el valor es vacío, 0 o ".", establecer el valor en 1
            setArticuloDetalle((prevDetalle) => ({
                ...prevDetalle,
                ALTO: '1',
                MCUADRADO: 'N/V'
            }));
        } else {

            const newCuadrado = (parseFloat(value) * parseFloat(articuloDetalle.ANCHO)).toFixed(2);
            if (!isNaN(newCuadrado)) {
                // Si el valor es válido, actualizar el estado
                setArticuloDetalle((prevDetalle) => ({
                    ...prevDetalle,
                    ALTO: value,
                    MCUADRADO: newCuadrado,
                    IMPUESTOS: ((newCuadrado * prevDetalle.PRECIO) * 0.16).toFixed(2),
                    TOTAL: (newCuadrado * prevDetalle.PRECIO).toFixed(2)
                }));
            } else {
                setArticuloDetalle((prevDetalle) => ({
                    ...prevDetalle,
                    ALTO: value,
                    MCUADRADO: 0,
                }));
            }


        }
        console.log(articuloDetalle);
    };

    const handleCantidadChange = (e) => {
        const newCantidad = parseInt(e.target.value);
        const ancho = parseFloat(articuloDetalle.ANCHO);
        const alto = parseFloat(articuloDetalle.ALTO);
        const precioUnitario = parseFloat(articuloDetalle.PRECIO);
        const mcuadrado = (ancho * alto).toFixed(2);
        const newTotal = (mcuadrado * newCantidad * precioUnitario).toFixed(2);
        const newImpuesto = (newTotal * 0.16).toFixed(2);

        setArticuloDetalle((prevDetalle) => ({
            ...prevDetalle,
            IMPUESTOS: newImpuesto,
            CANTIDAD: newCantidad,
            TOTAL: newTotal,
            MCUADRADO: mcuadrado,
        }));
    };

    const handleDescuentoChange = (e) => {
        const value = parseFloat(e.target.value);// este es el descuento
        const newCantidad = parseInt(articuloDetalle.CANTIDAD);
        const ancho = parseFloat(articuloDetalle.ANCHO);
        const alto = parseFloat(articuloDetalle.ALTO);
        const precioUnitario = parseFloat(articuloDetalle.PRECIO);
        const mcuadrado = (ancho * alto).toFixed(2);
        const newTotal = (mcuadrado * newCantidad * precioUnitario).toFixed(2);
        const newImpuesto = (newTotal * 0.16).toFixed(2);

        if (!isNaN(value) && value >= 0) { //si el valor es un numero real, por ejemplo 15 
            const newDescuento = value;
            const newTotalDsctoAplicado = (newTotal - (newTotal * (newDescuento / 100))).toFixed(2);
            const newImpuestoDsctoAplicado = (newTotalDsctoAplicado * 0.16).toFixed(2);

            setArticuloDetalle((prevDetalle) => ({
                ...prevDetalle,
                DESCTO: newDescuento,
                TOTAL: newTotalDsctoAplicado,
                IMPUESTOS: newImpuestoDsctoAplicado,
            }));

        } else {
            setArticuloDetalle((prevDetalle) => ({
                ...prevDetalle,
                DESCTO: 0,
                TOTAL: newTotal,
                IMPUESTOS: newImpuesto,
            }));
        }
    };



    //funciones que interactuan con mis estados
    const AbrirModalArticulos = () => {
        if (onClienteActivo) {
            setModalArticulos(true);
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'error',
                title: 'Selecciona un cliente antes de agregar una partida'
            })
        }
    }
    const CerrarModalArticulos = () => { setModalArticulos(false); }

    const AxiosbuscarArticulos = async (e) => {
        const query = e.target.value;
        if (query !== '') {
            setbuscarArticulos(query);

            try {
                const response = await axios.get(`http://localhost:5000/buscar-articulo?query=${query}`);

                if (response) {
                    console.log(response.data);
                    setResultadosArticulos(response.data);
                    setShowResultadosArticulos(true);
                } else {
                    setShowResultadosArticulos(false);
                }

            } catch (error) {
                console.log(error);
            }
        } else {
            setShowResultadosArticulos(false);
            setbuscarArticulos('');
        }

    }

    const handleSelectorArticulos = async (articulo) => {
        setSelectedArticulo({
            ...selectedArticulo,
            ARTICULO_ID: articulo.ARTICULO_ID,
            CLAVE_ARTICULO: articulo.CLAVE_ARTICULO,
            NOMBRE_ARTICULO: articulo.NOMBRE_ARTICULO,
            UNIDAD_VENTA: articulo.UNIDAD_VENTA,
        });

        try {
            const articuloID = articulo.ARTICULO_ID;
            const clienteID = cliente.CLIENTE_ID;

            const response = await axios.get(
                `http://localhost:5000/precio-articulo?articuloID=${articuloID}&clienteID=${clienteID}`
            );
            if (response) {
                const { PRECIO_UNITARIO, IVA, TOTAL } = response.data;

                setArticuloDetalle({
                    ...articuloDetalle,
                    ARTICULO_ID: articulo.ARTICULO_ID,
                    CLAVE_ARTICULO: articulo.CLAVE_ARTICULO,
                    ANCHO: 1,
                    ALTO: 1,
                    MCUADRADO: 1,
                    CANTIDAD: 1,
                    PRECIO: PRECIO_UNITARIO,
                    IMPUESTOS: IVA,
                    TOTAL: (TOTAL - (PRECIO_UNITARIO * 0.16)).toFixed(2),
                });

            }
        } catch (error) {
            console.log(error);
        }
        setShowResultadosArticulos(false);
        setbuscarArticulos('');
    };

    const EstilosModal = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '500px',
            width: '90%',
            borderRadius: '0.5rem',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 9999,
        },
    };
    const EstilosBotonCerrarModal = {
        position: 'absolute',
        top: '0.5rem',
        right: '0.5rem',
        cursor: 'pointer',
    };

    return (
        <Fragment>
            <div className="mt-1 mx-3 bg-white rounded-lg shadow-lg p-4 w-3/4 overflow-y-scroll" style={{ maxHeight: "300px" }}>
                <button onClick={AbrirModalArticulos}>Agregar Partida</button>

                {ModalArticulos &&
                    (
                        <Modal
                            isOpen={ModalArticulos}
                            onRequestClose={CerrarModalArticulos}
                            contentLabel="Ejemplo de Modal"
                            style={EstilosModal}
                        >
                            <button
                                onClick={CerrarModalArticulos}
                                style={EstilosBotonCerrarModal}
                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            >X</button>
                            <div className="p-4">

                                <h2 className="text-2xl font-bold mb-4">Agregar Partida</h2>
                                <div className="mb-4 relative">
                                    <label className="block mb-2">Buscar artículo:</label>
                                    <input
                                        type="text"
                                        value={buscarArticulos}
                                        onChange={AxiosbuscarArticulos}
                                        className="border border-gray-300 px-4 py-2 w-full"
                                    />
                                    {/*resultados de la busqueda del articulo*/}
                                    {showResultadosArticulos && (
                                        <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded">
                                            <li
                                                className="flex flex-col">
                                                {resultadosArticulos.map((resultado) => (
                                                    <span
                                                        key={resultado.ARTICULO_ID}
                                                        className="py-2 px-4 cursor-pointer"
                                                        onClick={() => handleSelectorArticulos(resultado)}>
                                                        {resultado.NOMBRE_ARTICULO}
                                                    </span>
                                                ))}
                                            </li>
                                        </ul>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">Nombre del articulo:</label>
                                    <input
                                        type="text"
                                        value={selectedArticulo ? selectedArticulo.NOMBRE_ARTICULO : ""}
                                        onChange={(e) => setSelectedArticulo({ ...selectedArticulo, NOMBRE_ARTICULO: e.target.value })}
                                        className="border border-gray-300 px-4 py-2 w-full"
                                        disabled
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block mb-2">Ancho:</label>
                                        <input
                                            type="text"
                                            onChange={handleAnchoChange}
                                            value={articuloDetalle ? articuloDetalle.ANCHO : ''}
                                            className="border border-gray-300 px-4 py-2 w-full"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2">Alto:</label>
                                        <input
                                            type="text"
                                            onChange={handleAltoChange}
                                            value={articuloDetalle ? articuloDetalle.ALTO : ''}
                                            className="border border-gray-300 px-4 py-2 w-full"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2">M&sup2;:</label>
                                        <input
                                            type="text"
                                            value={articuloDetalle ? articuloDetalle.MCUADRADO : 0}
                                            className="border border-gray-300 px-4 py-2 w-full"
                                            disabled
                                        />
                                    </div>

                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block mb-2">U.Medida:</label>
                                        <input
                                            type="text"
                                            value={selectedArticulo ? selectedArticulo.UNIDAD_VENTA : ""}
                                            className="border border-gray-300 px-4 py-2 w-full"
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2">Cantidad:</label>
                                        <input
                                            type="number"
                                            value={articuloDetalle ? articuloDetalle.CANTIDAD : ""}
                                            onChange={(e) => handleCantidadChange(e)}
                                            className="border border-gray-300 px-4 py-2 w-full"
                                            min="1"
                                        />

                                    </div>
                                    <div>
                                        <label className="block mb-2">Descuento:</label>
                                        <input
                                            value={articuloDetalle ? articuloDetalle.DESCTO : 0}
                                            onChange={(e) => handleDescuentoChange(e)}
                                            type="text"
                                            className="border border-gray-300 px-4 py-2 w-full"
                                        />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <label className="block mb-2">Precio unitario:</label>
                                        <input
                                            type="text"
                                            value={articuloDetalle ? articuloDetalle.PRECIO : 0}
                                            className="border border-gray-300 px-4 py-2 w-full"
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2">Importe Total:</label>
                                        <input
                                            type="text"
                                            value={articuloDetalle ? articuloDetalle.TOTAL : ""}
                                            className="border border-gray-300 px-4 py-2 w-full"
                                        />
                                    </div>

                                </div>

                                <div className="mb-4">
                                    <label className="block mb-2">Notas adicionales:</label>
                                    <textarea
                                        className="border border-gray-300 px-4 py-2 w-full"
                                    ></textarea>
                                </div>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Agregar
                                </button>
                            </div>
                        </Modal>

                    )}
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Nombre del Artículo</th>
                            <th className="py-3 px-6 text-center">Ancho</th>
                            <th className="py-3 px-6 text-center">Alto</th>
                            <th className="py-3 px-6 text-center">M&sup2;</th>
                            <th className="py-3 px-6 text-center">Total</th>
                            <th className="py-3 px-6 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left whitespace-nowrap">1</td>
                            <td className="py-3 px-6 text-left whitespace-nowrap">Camiseta</td>
                            <td className="py-3 px-6 text-center whitespace-nowrap">$15</td>
                            <td className="py-3 px-6 text-center whitespace-nowrap">2</td>
                            <td className="py-3 px-6 text-center whitespace-nowrap">$30</td>
                            <td className="py-3 px-6 text-center whitespace-nowrap">$60</td>
                            <td className="py-3 px-4 text-center">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1">
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>



                    </tbody>
                </table>
            </div>
        </Fragment>
    );
};

export default TablaProductos;