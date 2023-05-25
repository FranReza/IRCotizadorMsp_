import React, { Fragment, useState, useEffect } from 'react';
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

    useEffect(() => {
        console.log(articuloDetalle);
    }, [articuloDetalle]);

    const calcularMcuadrado = () => {
        const ancho = articuloDetalle.ANCHO >= 1 ? articuloDetalle.ANCHO : 1;
        const alto = articuloDetalle.ALTO >= 1 ? articuloDetalle.ALTO : 1;
        return ancho * alto;
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
                    TOTAL: TOTAL,
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
            <div class="mt-1 mx-3 bg-white rounded-lg shadow-lg p-4 w-3/4 overflow-y-scroll" style={{ maxHeight: "300px" }}>
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
                                            value={articuloDetalle ? articuloDetalle.ANCHO : ''}
                                            onChange={(e) => {
                                                const newAncho = parseFloat(e.target.value.replace(',', '.'));
                                                const newMCuadrado = isNaN(newAncho) ? 0 : newAncho * articuloDetalle.ALTO;
                                                setArticuloDetalle({
                                                    ...articuloDetalle,
                                                    ANCHO: newAncho,
                                                    MCUADRADO: newMCuadrado,
                                                });
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Decimal' && !e.target.value.includes('.')) {
                                                    e.preventDefault();
                                                    const caretPosition = e.target.selectionStart;
                                                    e.target.value = e.target.value.slice(0, caretPosition) + '.' + e.target.value.slice(caretPosition);
                                                    e.target.setSelectionRange(caretPosition + 1, caretPosition + 1);
                                                }
                                            }}
                                            className="border border-gray-300 px-4 py-2 w-full"
                                        />
                                    </div>



                                    <div>
                                        <label className="block mb-2">Alto:</label>
                                        <input
                                            type="text"
                                            value={articuloDetalle ? articuloDetalle.ALTO : ''}
                                            onChange={(e) => {
                                                const newAlto = parseFloat(e.target.value.replace(',', '.'));
                                                const newMCuadrado = isNaN(newAlto) ? 0 : articuloDetalle.ANCHO * newAlto;
                                                setArticuloDetalle({
                                                    ...articuloDetalle,
                                                    ALTO: newAlto,
                                                    MCUADRADO: newMCuadrado,
                                                });
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === ',' && !e.target.value.includes('.')) {
                                                    e.target.value += '.';
                                                    e.preventDefault();
                                                }
                                            }}
                                            className="border border-gray-300 px-4 py-2 w-full"
                                        />
                                    </div>


                                    <div>
                                        <label className="block mb-2">M&sup2;:</label>
                                        <input
                                            type="text"
                                            value={articuloDetalle ? articuloDetalle.MCUADRADO : 0}
                                            onChange={(e) =>
                                                setArticuloDetalle({ ...articuloDetalle, MCUADRADO: e.target.value })
                                            }
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
                                            onChange={(e) => setSelectedArticulo({ ...selectedArticulo, UNIDAD_VENTA: e.target.value })}
                                            className="border border-gray-300 px-4 py-2 w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2">Cantidad:</label>
                                        <input
                                            type="text"
                                            value={articuloDetalle ? articuloDetalle.CANTIDAD : 0}
                                            onChange={(e) => setArticuloDetalle({ ...articuloDetalle, CANTIDAD: e.target.value })}
                                            className="border border-gray-300 px-4 py-2 w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2">Descuento:</label>
                                        <input
                                            value={articuloDetalle ? articuloDetalle.DESCTO : 0}
                                            onChange={(e) => setArticuloDetalle({ ...articuloDetalle, DESCTO: e.target.value })}
                                            type="text"
                                            className="border border-gray-300 px-4 py-2 w-full"
                                        />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <label className="block mb-2">Precio:</label>
                                        <input
                                            type="text"
                                            value={articuloDetalle ? articuloDetalle.PRECIO : 0}
                                            onChange={(e) => setArticuloDetalle({ ...articuloDetalle, PRECIO: e.target.value })}
                                            className="border border-gray-300 px-4 py-2 w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2">Importe Total:</label>
                                        <input
                                            type="text"
                                            value={articuloDetalle ? articuloDetalle.PRECIO : 0}
                                            onChange={(e) => setArticuloDetalle({ ...articuloDetalle, PRECIO: e.target.value })}
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
                <table class="w-full table-auto">
                    <thead>
                        <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th class="py-3 px-6 text-left">ID</th>
                            <th class="py-3 px-6 text-left">Nombre del Artículo</th>
                            <th class="py-3 px-6 text-center">Ancho</th>
                            <th class="py-3 px-6 text-center">Alto</th>
                            <th class="py-3 px-6 text-center">M&sup2;</th>
                            <th class="py-3 px-6 text-center">Total</th>
                            <th class="py-3 px-6 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-600 text-sm font-light">
                        <tr class="border-b border-gray-200 hover:bg-gray-100">
                            <td class="py-3 px-6 text-left whitespace-nowrap">1</td>
                            <td class="py-3 px-6 text-left whitespace-nowrap">Camiseta</td>
                            <td class="py-3 px-6 text-center whitespace-nowrap">$15</td>
                            <td class="py-3 px-6 text-center whitespace-nowrap">2</td>
                            <td class="py-3 px-6 text-center whitespace-nowrap">$30</td>
                            <td class="py-3 px-6 text-center whitespace-nowrap">$60</td>
                            <td class="py-3 px-4 text-center">
                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                    <i class="fa-solid fa-trash"></i>
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