export interface Action {
  payload?: object;
  type: string;
}
export interface controlData {
  id: string;
  value: number;
  seconds: number;
}
export interface controlDataOri {
  id: number;
  ori: number;
  oriSeconds: number;
}

export interface OriHistoryData {
  id: string;
  indice?: number;
  oriSeconds?: number;
  timestamp?: string;
}

// FC
export interface controlDataFc {
  id: string;
  fc: number;
  fcSeconds: number;
}

export interface FCHistoryData {
  id: string;
  fc: number;
  frecuencia: number;
  fcSeconds: number;
  timestamp: string;
}

export interface FCUpdateInput {
  frecuencia: number;
  fcSeconds: number;
}

// SP

export interface controlDataSp {
  id?: number;
  sp: number;
  spSeconds: number;
  spMinutes?: number;
  saturacion?: number;
}
export interface SpHistoryData {
  id: string;
  sp: number;
  spSeconds: number;
  spMinutes: number;
  saturacion: number;
  timestamp: string;
}

export interface SpUpdateInput {
  sp: number;
  saturacion: number;
  spSeconds: number;
  spMinutes: number;
}

// Ends SP

//
export interface errorData {
  message: string;
}
