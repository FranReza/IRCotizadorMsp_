import React, { Fragment } from "react";

//importamos el layout
import Header from "./components/layouts/Header.jsx";

function App() {
  return (
    <Fragment>
      <Header />
      <div className="flex justify-between m-5 h-full">
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
              <h2 className="mt-2 font-bold">ID: </h2>
              <p className="mt-2 font-bold">Cliente: </p>
              <p className="mt-2 font-bold">E-mail:</p>
            </div>
          </div>
        </div>
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
      </div>
      <div className="flex flex-row h-screen/2">
        <div class="mt-1 mx-3 bg-white rounded-lg shadow-lg p-4 w-3/4 overflow-y-scroll" style={{maxHeight: "400px"}}>
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
                <td class="text-left py-3 px-4">
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1">
                    Editar
                  </button>
                  <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                    Eliminar
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
                <td class="text-left py-3 px-4">
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1">
                    Editar
                  </button>
                  <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                    Eliminar
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
                <td class="text-left py-3 px-4">
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1">
                    Editar
                  </button>
                  <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                    Eliminar
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
                <td class="text-left py-3 px-4">
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1">
                    Editar
                  </button>
                  <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                    Eliminar
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
                <td class="text-left py-3 px-4">
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1">
                    Editar
                  </button>
                  <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                    Eliminar
                  </button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
        <div class="mt-1 mx-3 bg-white rounded-lg shadow-lg p-4 w-1/4">
          <div class="text-gray-600 text-sm font-light mb-4">
            <div class="flex justify-between items-center">
              <span class="text-xl">Subtotal</span>
              <span class="text-right text-xl">$145</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-left text-xl">IVA 16%</span>
              <span class="text-right text-xl">$23.20</span>
            </div>
            <div class="flex justify-between items-center font-bold">
              <span class="text-left text-xl">Total</span>
              <span class="text-right text-xl">$168.20</span>
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  );
};

export default App;
