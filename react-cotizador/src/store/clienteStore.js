import { create } from 'zustand';

export const useClienteStore = create((set) => ({
  CLIENTE_ID: 0,
  NOMBRE_CLIENTE: '',
  MONEDA_ID: 0,
  NOMBRE_MONEDA: '',
  COND_PAGO_ID: 0,
  NOMBRE_CONDICION: '',
  EMAIL: '',
  RFC_CURP: '',
  setCliente: (nuevoCliente) => set(() => nuevoCliente),
}));
