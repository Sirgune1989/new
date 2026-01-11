import React from 'react';
import { Worker, WorkerStatus } from '../types';
import { Trophy, School, Star, Coffee, HardHat } from 'lucide-react';

interface WorkerTableProps {
  workers: Worker[];
  onTraining: (id: string) => void;
}

export const WorkerTable: React.FC<WorkerTableProps> = ({ workers, onTraining }) => {
  // Sort: Danger first, then Score Ascending (worst first)
  const sortedWorkers = [...workers].sort((a, b) => a.score - b.score);

  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden flex flex-col h-full shadow-xl">
      <div className="p-4 border-b border-slate-700 bg-slate-800 flex justify-between items-center">
        <h2 className="font-bold text-slate-100 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Ranking Bezpieczeństwa
        </h2>
        <span className="text-xs font-mono text-slate-400">
          ONLINE: <span className="text-white font-bold">{workers.length}</span>
        </span>
      </div>

      <div className="overflow-y-auto flex-1 h-[400px]">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-900/90 text-xs font-mono text-slate-500 uppercase sticky top-0 z-10">
            <tr>
              <th className="p-3">Pracownik / Strefa</th>
              <th className="p-3 text-center">Score</th>
              <th className="p-3 text-right">Akcja</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {sortedWorkers.map((worker) => (
              <tr key={worker.id} className="hover:bg-slate-700/30 transition-colors group">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    {/* Avatar / Status Dot */}
                    <div className="relative">
                        <div className={`w-2 h-2 rounded-full absolute -top-1 -right-1 
                            ${worker.status === WorkerStatus.SAFE ? 'bg-safety-green' : 
                              worker.status === WorkerStatus.LEGAL_BREAK ? 'bg-blue-400' : 'bg-safety-red animate-pulse'}`}>
                        </div>
                        <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center text-slate-300 text-xs font-bold">
                            {worker.name.charAt(0)}{worker.name.split(' ')[1].charAt(0)}
                        </div>
                    </div>
                    
                    <div>
                      <div className="font-medium text-slate-200 flex items-center gap-2 text-sm">
                        {worker.name}
                        {worker.score >= 98 && <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono uppercase flex items-center gap-1 mt-0.5">
                         {worker.zone === 'PRODUCTION' ? <HardHat className="w-3 h-3" /> : <Coffee className="w-3 h-3" />}
                         {worker.zone}
                         {worker.status === WorkerStatus.LEGAL_BREAK && <span className="text-blue-400">• PRZERWA</span>}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-center">
                  <div className={`font-mono font-bold text-sm ${worker.score < 80 ? 'text-safety-red' : 'text-safety-green'}`}>
                    {worker.score}%
                  </div>
                </td>
                <td className="p-3 text-right">
                    {worker.score < 85 ? (
                        <button 
                            onClick={() => onTraining(worker.id)}
                            className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/50 px-2 py-1 rounded hover:bg-red-500 hover:text-white transition-all flex items-center gap-1 ml-auto whitespace-nowrap">
                            <School className="w-3 h-3" />
                            <span>Szkolenie</span>
                        </button>
                    ) : worker.score > 98 ? (
                        <span className="text-[10px] text-yellow-500 border border-yellow-500/30 px-2 py-1 rounded bg-yellow-500/10">
                            BONUS +
                        </span>
                    ) : (
                        <span className="text-[10px] text-slate-600 font-mono">OK</span>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
