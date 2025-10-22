export interface Action {
  payload?: object;
  type: string;
}

export interface RowProduct {
  id: number;
  cantidad: number;
  producto: string;
  lista: string;
  precio: number;
}

//

export interface Account {
  _id?: string;
  asiento_id?: number;
  budget_id: number;
  client_id: number;
  cliente: string;
  fecha_tran: string;
  fecha: string;
  tipo: string;
  tipoPago?: string;
  proveedor?: string;
  comentarios: string;
  saldo: number;
  totalBalance: number;
}

export interface AccountProvider {
  _id?: string;
  asiento_id?: number;
  comprobante: string;
  provider_id: number;
  fecha: string;
  fecha_tran: string;
  tipo: string;
  tipoPago: string;
  saldo: number;
  comentarios: string;
}

export interface ComprobanteProvider {
  id?: string;
  comprobante_id?: number;
  provider_id: number;
  proveedor?: string;
  nro_comprobante: string;
  fecha: string;
  monto: number;
  tipo: string;
  comentarios: string;
  created_at?: string;
  updated_at?: string;
}

export interface AccountBalance {
  balance: number;
}

export interface Accounts {
  client_id: number;
  cliente: string;
  total_deuda: number;
  total_facturado: number;
  total_pagos: number;
}

export interface ErrorControl {
  statusError: boolean;
  fieldError: string;
  messageError: string;
}

export interface BalanceMovement {
  asiento_id: number;
  fecha: string;
  tipo: string;
  monto: number;
}

export interface ConfigParams {
  cae: string;
  cae_fecha_vto: string;
}
export interface Balance {
  client_id: number;
  cliente: string;
  debe: number;
  haber: number;
  saldo: number;
  movimientos: BalanceMovement[];
}

export interface Budget {
  budget_id: number;
  client_id?: number;
  cliente?: string;
  client?: Client;
  control_interno: string;
  comentarios: string;
  fecha: string;
  status: string;
  enviado: boolean;
  productsList: RowProduct[];
  discountA: number;
  subtotalA: number;
  discountV: number;
  subtotalV: number;
  subtotal: number;
  discount: number;
  total: number;
  totalBudget: number;
}

export interface BudgetsPagination {
  budgetData: Budget[];
  pagination: {
    totalPages: number;
    pageSize: number;
  };
}

export interface BudgetTotal {
  subtotal: number;
  discount: number;
  total: number;
}

export interface BudgetPDF {
  budget_id: number;
  control_interno: string;
  fecha: string;
  cliente: Client;
  balance: number;
  comentarios: string;
  status: string;
  enviado: boolean;
  productsList: RowProduct[];
  //
  subtotalA: number;
  subtotalV: number;
  discountMoneyA: number;
  discountMoneyV: number;
  discountA: number;
  discountV: number;
  total: number;
  totalA: number;
  totalV: number;
}
export interface BudgetCaja {
  client_id: number;
  cliente: string;
  fecha: string;
  subtotalA: number;
  discountA: number;
  subtotalV: number;
  discountV: number;
  total: number;
  totalBudget: number;
  total_facturado: number;
  total_pagos: number;
  saldo_total: number;
  saldo_pendiente: number;
  saldo_calculado?: number;
}

export interface Client {
  id?: number;
  balance?: number;
  client_id: number;
  cliente: string;
  domicilio: string;
  envios?: string;
  localidad: string;
  municipio?: string;
  provincia?: string;
  cuit: string;
  telefono?: string;
  atencion?: string;
  horario?: string;
  lista_a?: string;
  lista_v?: string;
}

export interface CreditNote {
  credit_note_id?: number;
  budget_id: number;
  client_id: number;
  cliente: string;
  fecha: string;
  productos: RowProduct[] | undefined;
  total: number;
  comentarios?: string;
}
export interface Distribution {
  distribution_id?: number;
  cliente?: string;
  client_id: number;
  budget_id: number;
  total: number;
  fecha: string;
  vehiculo: string;
  direccion?: string;
  localidad?: string;
  municipio?: string;
  provincia?: string;
}

export interface DistributionTruck {
  fecha: string;
  vehiculo: string;
  distribution: Distribution[];
}

export interface Product {
  id?: string;
  lista?: string;
  sublista?: string;
  producto: string;
  cantidad: string;
  precio?: number;
  deshabilitado?: boolean;
  fecha?: string;
  updated?: string;
}

export interface Provider {
  _id?: string;
  proveedor_id?: number;
  proveedor: string;
}

export interface Locality {
  _id: string;
  provincia_nombre: string;
  municipio_nombre: string;
  localidad_nombre: string;
}

export interface Province {
  id: number;
  nombre: string;
}

export interface User {
  id?: string;
  username: string;
  password?: string; // Optional for security - only used during login
  name?: string;
  surname?: string;
  email?: string;
  status?: boolean;
  role?: string;
  avatar?: string;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthUser {
  id: string;
  username: string;
  name?: string;
  surname?: string;
  email?: string;
  role?: string;
  avatar?: string;
  lastLogin?: string;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  loginAttempts: number;
  lastLoginAttempt?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  data: {
    user: AuthUser;
    token: string;
    refreshToken?: string;
    expiresIn?: number;
  };
}

export interface NavigationBudget {
  page?: number;
  limit?: number;
  status?: string;
}
