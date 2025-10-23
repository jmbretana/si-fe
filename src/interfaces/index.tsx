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
  fcSeconds: number;
  fcMinutes: number;
}

// SP

export interface controlDataSp {
  id?: string;
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
