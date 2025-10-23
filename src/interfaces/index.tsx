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
}

export interface controlDataFc {
  id: string;
  fc: number;
  fcSeconds: number;
}

export interface errorData {
  message: string;
}
