import React from 'react';
import { Eye, ShieldAlert, Activity } from 'lucide-react';
import { SystemStatus } from '../types';

interface DashboardHeaderProps {
  status: SystemStatus;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ status }) => {
  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-safety-green';
    if (score >= 70) return 'text-yellow-400';
    return 'text-safety-red';
  };

  return (
    <header className="bg-slate-800/80 backdrop-blur-md border-b border-slate-700 p-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-safety-orange/20 rounded-full animate-ping"></div>
            <div className="bg-slate-900 p-2 rounded-lg border border-slate-600 relative z-10">
              <Eye className="w-8 h-8 text-safety-orange" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-wider text-white font-sans">NEURAL GUARDIANS</h1>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-mono">AI Safety Oversight System v2.4</p>
          </div>
        </div>

        {/* Status Metrics */}
        <div className="flex gap-8 items-center bg-slate-900/50 p-3 rounded-xl border border-slate-700/50">
            <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-mono uppercase">ZMIANA</span>
                <span className="font-semibold text-slate-200">{status.shift}</span>
            </div>
            <div className="w-px h-8 bg-slate-700"></div>
            <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-mono uppercase">MISTRZ</span>
                <span className="font-semibold text-slate-200">{status.master}</span>
            </div>
            <div className="w-px h-8 bg-slate-700"></div>
            <div className="flex flex-col">
                 <span className="text-xs text-slate-500 font-mono uppercase">Incydenty (24h)</span>
                 <span className="font-mono font-bold text-safety-red">{status.incidentsToday}</span>
            </div>
        </div>

        {/* KPI - Safety Score */}
        <div className="flex items-center gap-4 bg-slate-900 border border-slate-700 px-6 py-2 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.3)]">
          <div className="text-right">
            <div className="text-xs text-slate-400 font-mono uppercase mb-1">Safety Score</div>
            <div className={`text-4xl font-bold font-mono ${getScoreColor(status.safetyScore)}`}>
              {status.safetyScore}/100
            </div>
          </div>
          <Activity className={`w-10 h-10 ${getScoreColor(status.safetyScore)} opacity-80`} />
        </div>

      </div>
    </header>
  );
};
