import { create } from 'zustand';

export const useTotalesStore = create((set) => ({
  subtotaldoc: 0,
  impuestosTotaldoc: 0,
  totalGeneral: 0,
  setSubtotal: (value) => set({ subtotaldoc: value }),
  setImpuestosTotal: (value) => set({ impuestosTotaldoc: value }),
  setTotalGeneral: (value) => set({ totalGeneral: value }),
}));


