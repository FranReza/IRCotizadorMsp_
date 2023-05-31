import {create} from 'zustand';

export const useStore = create((set) => ({
  fecha_doc: '',
  fecha_vencimiento: '',
  setFechas: (fechas) => set({ fecha_doc: fechas.fecha_doc, fecha_vencimiento: fechas.fecha_vencimiento }),
}));
