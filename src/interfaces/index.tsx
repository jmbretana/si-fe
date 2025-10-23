export interface controlData {
  id: string;
  value: number;
  seconds: number;
}
export interface controlDataOri {
  id: string;
  ori: number;
  oriSeconds: number;
}

export interface OriHistoryData {
  id: string;
  indice?: number;
  oriSeconds?: number;
  oriMinutes?: number;
  timestamp?: string;
}

export interface controlDataSp {
  id: string;
  sp: number;
  spSeconds: number;
  spMinutes: number;
  saturacion: number;
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
  fcMinutes: number;
  timestamp: string;
}

export interface FCUpdateInput {
  frecuencia: number;
  segundos: number;
  minutos: number;
}

// SP
export interface SpHistoryData {
  id: string;
  saturacion: number;
  segundos: number;
  minutos: number;
  timestamp: string;
}
// Ends SP

//
export interface errorData {
  message: string;
}
