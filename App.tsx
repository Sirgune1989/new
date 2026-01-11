import React, { useState, useEffect, useMemo } from 'react';
import { DashboardHeader } from './components/DashboardHeader';
import { VideoFeed } from './components/VideoFeed';
import { ControlPanel } from './components/ControlPanel';
import { WorkerTable } from './components/WorkerTable';
import { LiveLog } from './components/LiveLog';
import { SystemStatus, Worker, WorkerStatus, LogEntry, ZoneType } from './types';

// --- DATA GENERATION UTILS ---
const NAMES = ["Janusz K.", "Piotr N.", "Adam M.", "Krzysztof J.", "Michał A.", "Tomasz B.", "Robert C.", "Andrzej D.", "Marcin E.", "Marek F.", "Łukasz G.", "Grzegorz H.", "Dariusz I.", "Mariusz J.", "Rafał K.", "Wojciech L.", "Zbigniew M.", "Jacek N.", "Mateusz O.", "Kamil P."];
const SURNAMES = ["Kowalski", "Nowak", "Wiśniewski", "Wójcik", "Kowalczyk", "Kamiński", "Lewandowski", "Zieliński", "Szymański", "Woźniak"];

const generateWorkers = (count: number): Worker[] => {
  return Array.from({ length: count }, (_, i) => {
    // 30 production (index 0-29), 20 canteen (index 30-49)
    const isProduction = i < 30; 
    const zone: ZoneType = isProduction ? 'PRODUCTION' : 'CANTEEN';
    
    // Base setup: Everyone is safe initially
    const hasHelmet = isProduction; // Production needs helmet, Canteen doesn't
    const status = isProduction ? WorkerStatus.SAFE : WorkerStatus.LEGAL_BREAK;
    const score = Math.floor(Math.random() * (100 - 80) + 80); // High scores initially

    return {
      id: `w-${i}`,
      name: `${NAMES[i % NAMES.length]} ${SURNAMES[i % SURNAMES.length]}`,
      score: score,
      status: status,
      zone: zone,
      hasHelmet: hasHelmet,
      shift: 'II',
    };
  });
};

const INITIAL_STATUS: SystemStatus = {
  shift: 'II (POPOŁUDNIOWA)',
  master: 'INŻ. A. BETON',
  safetyScore: 94,
  activeCameras: 12,
  incidentsToday: 0,
  activeZone: 'PRODUCTION'
};

export default function App() {
  const [status, setStatus] = useState<SystemStatus>(INITIAL_STATUS);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filterZone, setFilterZone] = useState<'ALL' | ZoneType>('ALL');
  const [globalAlert, setGlobalAlert] = useState(false);

  // Initialize Data
  useEffect(() => {
    const initialWorkers = generateWorkers(50);
    setWorkers(initialWorkers);
    addLog('System zainicjowany. Wczytano 50 profili pracowników.', 'INFO', 'SYSTEM');
  }, []);

  // Log Helper
  const addLog = (message: string, type: LogEntry['type'], zone: string) => {
    const newLog: LogEntry = {
      id: Date.now().toString() + Math.random(),
      timestamp: new Date().toLocaleTimeString('pl-PL'),
      message,
      type,
      zone
    };
    setLogs(prev => [newLog, ...prev].slice(0, 50));
  };

  // --- SIMULATION LOGIC ---
  const handleSimulateAccident = () => {
    // 1. Trigger Visual Alarm
    setGlobalAlert(true);
    setTimeout(() => setGlobalAlert(false), 2000);

    // 2. Find a victim in Production
    const productionWorkers = workers.filter(w => w.zone === 'PRODUCTION' && w.status === WorkerStatus.SAFE);
    if (productionWorkers.length === 0) return;
    
    const victimIndex = Math.floor(Math.random() * productionWorkers.length);
    const victimId = productionWorkers[victimIndex].id;

    // 3. Update State
    setWorkers(prev => prev.map(w => {
      if (w.id === victimId) {
        return {
          ...w,
          status: WorkerStatus.DANGER,
          hasHelmet: false,
          score: Math.max(0, w.score - 50), // Huge penalty
          lastIncident: 'Zdjęcie kasku w strefie pracy'
        };
      }
      return w;
    }));

    // 4. Update System Stats
    setStatus(prev => ({
      ...prev,
      safetyScore: Math.max(0, prev.safetyScore - 15),
      incidentsToday: prev.incidentsToday + 1
    }));

    // 5. Log it
    addLog(`!!! WYKRYTO ZAGROŻENIE: Pracownik ${productionWorkers[victimIndex].name} bez kasku!`, 'CRITICAL', 'HALA A');
  };

  const handleSendToTraining = (id: string) => {
    setWorkers(prev => prev.map(w => {
      if (w.id === id) {
        return { ...w, score: 70, status: WorkerStatus.WARNING, lastIncident: 'Skierowany na szkolenie' };
      }
      return w;
    }));
    addLog(`Pracownik ID ${id} skierowany na reedukację BHP.`, 'INFO', 'HR');
  };

  // --- FILTERING ---
  const filteredWorkers = useMemo(() => {
    if (filterZone === 'ALL') return workers;
    return workers.filter(w => w.zone === filterZone);
  }, [workers, filterZone]);

  return (
    <div className={`min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-safety-orange/30 relative overflow-hidden ${globalAlert ? 'animate-pulse bg-red-950/30' : ''}`}>
      
      {/* GLOBAL RED ALERT OVERLAY */}
      {globalAlert && (
        <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center bg-red-600/20 backdrop-blur-sm">
          <div className="text-9xl font-black text-red-500 animate-bounce tracking-widest opacity-50">ALARM</div>
        </div>
      )}

      <DashboardHeader status={status} />

      <main className="p-4 md:p-6 lg:p-8 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left Column: Vision & Control (8/12) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2 border-l-4 border-safety-orange pl-3">
                Monitoring Wizyjny AI
                <span className="text-xs font-normal text-slate-500 ml-auto font-mono">
                  ACTIVE STREAM: {status.activeZone}
                </span>
              </h3>
              
              <VideoFeed isAlert={globalAlert} />
              
              <ControlPanel onSimulateAccident={handleSimulateAccident} />
            </div>
          </div>

          {/* Right Column: Data & People (4/12) */}
          <div className="lg:col-span-4 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4 pl-3 border-l-4 border-blue-500">
               <h3 className="text-xl font-bold text-slate-100">Personel</h3>
               <div className="flex bg-slate-800 rounded-lg p-1">
                 <button 
                    onClick={() => setFilterZone('ALL')}
                    className={`px-3 py-1 text-xs font-bold rounded ${filterZone === 'ALL' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                    ALL
                 </button>
                 <button 
                    onClick={() => setFilterZone('PRODUCTION')}
                    className={`px-3 py-1 text-xs font-bold rounded ${filterZone === 'PRODUCTION' ? 'bg-safety-orange text-white' : 'text-slate-400 hover:text-white'}`}>
                    PROD
                 </button>
                 <button 
                    onClick={() => setFilterZone('CANTEEN')}
                    className={`px-3 py-1 text-xs font-bold rounded ${filterZone === 'CANTEEN' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'}`}>
                    CAFE
                 </button>
               </div>
            </div>

            <div className="flex-1 flex flex-col gap-6">
               <div className="flex-1 min-h-[400px]">
                 <WorkerTable workers={filteredWorkers} onTraining={handleSendToTraining} />
               </div>
               <div className="flex-1 min-h-[300px]">
                 <LiveLog logs={logs} />
               </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
