import { create } from 'zustand';

export const useArticulosStore = create((set) => ({
  listaArticulos: [],
  agregarArticulo: (articulo) => 
    set((state) => ({ listaArticulos: [...state.listaArticulos, articulo] })),
  // Otras funciones y estados que necesites
}));


