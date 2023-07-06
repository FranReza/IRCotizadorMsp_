import { create } from 'zustand';

/*añadimos descuento total aqui porq ps nose porque no funciona en otras partes*/
export const useTotalesStore = create((set) => ({
  subtotaldoc: 0,
  impuestosTotaldoc: 0,
  desctoExtra: 0,
  totalGeneral: 0,
  setSubtotal: (value) => set({ subtotaldoc: value }),
  setImpuestosTotal: (value) => set({ impuestosTotaldoc: value }),
  setDescuentoExtra : (value) => set({ desctoExtra: value }),
  setTotalGeneral: (value) => set({ totalGeneral: value }),
}));


