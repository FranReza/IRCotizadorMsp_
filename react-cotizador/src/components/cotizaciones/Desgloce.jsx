import React, { Fragment, useEffect } from 'react';
import { useArticulosStore } from '../../store/articulosStore';
import { useTotalesStore } from '../../store/totalesStore';

const Desgloce = () => {
  const listaArticulos = useArticulosStore((state) => state.listaArticulos);
  const { setSubtotal, setImpuestosTotal, setTotalGeneral } = useTotalesStore();
  
  // Calcular subtotal como suma de precios
  const calcularSubtotal = () => {
    const subtotal = listaArticulos.reduce((total, articulo) => {
      if (articulo.hasOwnProperty('TOTAL')) {
        return total + parseFloat(articulo.TOTAL);
      }
      return total;
    }, 0);

    return subtotal;
  };

  const calcularImpuestosTotal = () => {
    const impuestosTotal = listaArticulos.reduce((total, articulo) => {
      if (articulo.hasOwnProperty('IMPUESTOS')) {
        return total + parseFloat(articulo.IMPUESTOS);
      }
      return total;
    }, 0);

    return impuestosTotal;
  };

  const subtotal = calcularSubtotal();
  const impuestosTotal = calcularImpuestosTotal();
  const total = parseFloat(subtotal + impuestosTotal).toFixed(2);
  useEffect(() => {
    setSubtotal(subtotal);
    setImpuestosTotal(impuestosTotal);
    setTotalGeneral(total);
  }, [subtotal, impuestosTotal, setSubtotal, setImpuestosTotal, setTotalGeneral, total]);


  return (
    <Fragment>
      <div className="mt-1 mx-3 bg-white rounded-lg shadow-lg p-4 w-1/4">
        <div className="text-gray-600 text-sm font-light mb-4">
          <div className="flex justify-between items-center">
            <span className="text-xl">Subtotal</span>
            <span className="text-right text-xl">${parseFloat(subtotal).toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-left text-xl">Impuestos</span>
            <span className="text-right text-xl">
              ${parseFloat(impuestosTotal).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center font-bold">
            <span className="text-left text-xl">Total</span>
            <span className="text-right text-xl">
              ${parseFloat( subtotal + impuestosTotal ).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};


export default Desgloce;
