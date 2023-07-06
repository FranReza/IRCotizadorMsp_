import { create } from 'zustand';

export const useArticulosStore = create((set) => ({
  listaArticulos: [],
  agregarArticulo: (articulo) => 
    set((state) => ({ listaArticulos: [...state.listaArticulos, articulo] })),
  eliminarArticulo: (articuloId) =>
    set((state) => ({
      listaArticulos: state.listaArticulos.filter((articulo) => articulo.ARTICULO_ID !== articuloId),
    })),
  // Otras funciones y estados que necesites
}));
