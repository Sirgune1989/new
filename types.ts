export enum WorkerStatus {
  SAFE = 'SAFE',
  WARNING = 'WARNING',
  DANGER = 'DANGER',
  LEGAL_BREAK = 'LEGAL_BREAK' // Nowy status dla stołówki
}

export type ZoneType = 'PRODUCTION' | 'CANTEEN' | 'LOGISTICS';

export interface Worker {
  id: string;
  name: string;
  score: number;
  status: WorkerStatus;
  zone: ZoneType;
  hasHelmet: boolean;
  lastIncident?: string;
  shift: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'INFO' | 'WARNING' | 'CRITICAL' | 'SUCCESS';
  zone: string;
}

export interface SystemStatus {
  shift: string;
  master: string;
  safetyScore: number;
  activeCameras: number;
  incidentsToday: number;
  activeZone: ZoneType; // Śledzenie strefy kamery
}
