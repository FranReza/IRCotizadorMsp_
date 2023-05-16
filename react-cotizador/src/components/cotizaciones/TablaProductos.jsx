import React, { Fragment, useState } from 'react';
import Modal from 'react-modal';


const TablaProductos = () => {

    //estados
    const [ModalArticulos, setModalArticulos] = useState(false);

    //funciones que interactuan con mis estados
    const AbrirModalArticulos = () => { setModalArticulos(true); }
    const CerrarModalArticulos = () => { setModalArticulos(false); }
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
                            >
                                X
                            </button>
                            <h2>Título del Modal</h2>
                            <p>Contenido del Modal</p>
                        </Modal>

                    )}
                <table class="w-full table-auto">
                    <thead>
                        <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th class="py-3 px-6 text-left">ID</th>
                            <th class="py-3 px-6 text-left">Nombre del Artículo</th>
                            <th class="py-3 px-6 text-center">Precio</th>
                            <th class="py-3 px-6 text-center">Unidades</th>
                            <th class="py-3 px-6 text-center">Costo</th>
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
                        <tr class="border-b border-gray-200 hover:bg-gray-100">
                            <td class="py-3 px-6 text-left whitespace-nowrap">2</td>
                            <td class="py-3 px-6 text-left whitespace-nowrap">Pantalón</td>
                            <td class="py-3 px-6 text-center whitespace-nowrap">$35</td>
                            <td class="py-3 px-6 text-center whitespace-nowrap">1</td>
                            <td class="py-3 px-6 text-center whitespace-nowrap">$35</td>
                            <td class="py-3 px-6 text-center whitespace-nowrap">$35</td>
                            <td class="py-3 px-4 text-center">
                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                        <tr class="border-b border-gray-200 hover:bg-gray-100">
                            <td class="py-3 px-6 text-left whitespace-nowrap">3</td>
                            <td class="py-3 px-6 text-left whitespace-nowrap">Zapatos</td>
                            <td class="py-3 px-6 text-center whitespace-nowrap">$50</td>
                            <td class="py-3 px-6 text-center whitespace-nowrap">1</td>
                            <td class="py-3 px-6 text-center whitespace-nowrap">$50</td>
                            <td class="py-3 px-6 text-center whitespace-nowrap">$50</td>
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