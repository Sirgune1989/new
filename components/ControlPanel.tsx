import React from 'react';
import { Octagon, Camera, Shield, Zap } from 'lucide-react';

interface ControlPanelProps {
    onSimulateAccident: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ onSimulateAccident }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
      
      {/* Emergency Stop */}
      <button 
        className="md:col-span-2 group relative overflow-hidden rounded-lg p-6 flex flex-col items-center justify-center gap-3 transition-all duration-200 bg-red-950/30 border border-red-900/50 hover:bg-red-900/50 hover:border-red-500"
      >
        <div className="p-3 rounded-full bg-red-500/10 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
            <Octagon className="w-6 h-6" />
        </div>
        <div className="text-center">
            <div className="font-bold text-lg tracking-wider text-red-100 uppercase">STOP MASZYNY</div>
            <div className="text-[10px] text-red-400 font-mono uppercase tracking-widest">Manual Override</div>
        </div>
      </button>

      {/* Demo Action: Simulate Accident */}
      <button 
        onClick={onSimulateAccident}
        className="md:col-span-2 group relative overflow-hidden rounded-lg p-6 flex flex-col items-center justify-center gap-3 transition-all duration-200 bg-slate-800 border border-slate-700 hover:border-yellow-500 hover:bg-slate-700 active:scale-95"
      >
        <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-yellow-500/20 text-yellow-500 text-[9px] font-mono rounded border border-yellow-500/30 uppercase">
            Demo Only
        </div>
        <div className="p-3 rounded-full bg-yellow-500/10 text-yellow-500 group-hover:text-yellow-400 transition-colors">
            <Zap className="w-6 h-6" />
        </div>
        <div className="text-center">
            <div className="font-bold text-lg tracking-wider text-slate-200 uppercase">Symuluj Wypadek</div>
            <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Test Reakcji Systemu</div>
        </div>
      </button>

      {/* Secondary Actions */}
      <div className="md:col-span-4 grid grid-cols-2 gap-4">
        <button className="flex flex-row items-center justify-center gap-3 p-3 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 hover:border-safety-orange transition-all group">
            <Camera className="w-5 h-5 text-safety-orange" />
            <div className="text-left">
                <div className="font-semibold text-slate-200 text-sm">Zrób Zdjęcie</div>
                <div className="text-[10px] text-slate-500">Dowód Incydentu</div>
            </div>
        </button>

        <button className="flex flex-row items-center justify-center gap-3 p-3 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 hover:border-blue-500 transition-all group">
            <Shield className="w-5 h-5 text-blue-500" />
            <div className="text-left">
                <div className="font-semibold text-slate-200 text-sm">Wezwij Ochronę</div>
                <div className="text-[10px] text-slate-500">Interwencja</div>
            </div>
        </button>
      </div>

    </div>
  );
};
