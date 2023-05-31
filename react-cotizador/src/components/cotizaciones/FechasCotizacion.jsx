import React, { Fragment, useState, useEffect } from 'react';
import { useStore } from '../../store/fechaCotizacionStore';

const FechasCotizacion = () => {
  const { fecha_doc, fecha_vencimiento, setFechas } = useStore();

  const [fechaActual, setFechaActual] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = formatDate(today);
    setFechaActual(formattedDate);

    const fechaVencimiento = new Date(today);
    fechaVencimiento.setDate(fechaVencimiento.getDate() + 3);
    const formattedFechaVencimiento = formatDate(fechaVencimiento);
    setFechaVencimiento(formattedFechaVencimiento);

    setFechas({
      fecha_doc: formattedDate,
      fecha_vencimiento: formattedFechaVencimiento,
    });
  }, [setFechas]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();

    if (month.length === 1) {
      month = '0' + month;
    }

    if (day.length === 1) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  };

  const handleFechaChange = (event) => {
    const { name, value } = event.target;
    setFechas({ ...useStore.getState(), [name]: value });
  };

  return (
    <Fragment>
      <div className="w-4/12 h-50">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-bold mb-4">Fechas:</h2>
          <form>
            <div className="mb-4">
              <input
                type="date"
                id="fecha"
                name="fecha_doc"
                className="border rounded px-4 py-2 w-full"
                value={fecha_doc || fechaActual}
                onChange={handleFechaChange}
              />
            </div>
            <div>
              <label htmlFor="fecha-vencimiento" className="block text-gray-700 font-bold mt-8 mb-2">
                Fecha de vencimiento:
              </label>
              <input
                type="date"
                id="fecha-vencimiento"
                name="fecha_vencimiento"
                className="border rounded px-4 py-2 w-full"
                value={fecha_vencimiento || fechaVencimiento}
                onChange={handleFechaChange}
              />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default FechasCotizacion;
