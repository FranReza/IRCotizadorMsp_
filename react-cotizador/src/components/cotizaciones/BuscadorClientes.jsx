import React, { Fragment } from 'react'

const BuscadorClientes = () => {
    return (
        <Fragment>
            <div className="w-8/12 h-50 mr-4">
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <h2 className="text-lg font-bold mb-4">Nueva Cotización</h2>
                    <form className="flex items-center">
                        <input type="text" placeholder="Buscar cliente" class="border rounded-l px-4 py-2 w-full" />
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r">
                            Buscar
                        </button>
                    </form>
                    <div className="mt-4" style={{ display: "block" }}>
                        <p className="mt-2 font-bold">ID: </p>
                        <p className="mt-2 font-bold">Cliente: </p>
                        <p className="mt-2 font-bold">E-mail:</p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default BuscadorClientes;