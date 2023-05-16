import React, { Fragment } from 'react';

const FechasCotizacion = () => {
    return (
        <Fragment>
            <div className="w-4/12 h-50">
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <h2 className="text-lg font-bold mb-4">Fechas:</h2>
                    <form>
                        <div className="mb-4">
                            <input type="date" id="fecha" name="fecha" className="border rounded px-4 py-2 w-full" />
                        </div>
                        <div>
                            <label htmlFor="fecha-vencimiento" className="block text-gray-700 font-bold mt-8 mb-2">Fecha de vencimiento:</label>
                            <input type="date" id="fecha-vencimiento" name="fecha-vencimiento" className="border rounded px-4 py-2 w-full" />
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default FechasCotizacion;