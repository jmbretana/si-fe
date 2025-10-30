export interface Action {
  payload?: object;
  type: string;
}

export interface Reset {
  ori: controlDataOri;
  fc: controlDataFc;
  sp: controlDataSp;
}

export interface Unify {
  ori: number;
  oriSeconds: number;
  fc: number;
  fcSeconds: number;
  sp: number;
  spSeconds: number;
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
}
export interface SpHistoryData {
  id: string;
  sp: number;
  spSeconds: number;
  spMinutes: number;
  timestamp: string;
}

export interface SpUpdateInput {
  sp: number;
  spSeconds: number;
  spMinutes: number;
}

// Ends SP

//
export interface errorData {
  message: string;
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
