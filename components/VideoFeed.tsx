import React from 'react';
import { Camera, Maximize, AlertTriangle, CheckCircle2, Coffee, Target } from 'lucide-react';

interface VideoFeedProps {
  isAlert?: boolean;
}

export const VideoFeed: React.FC<VideoFeedProps> = ({ isAlert }) => {
  return (
    <div className={`relative group rounded-xl overflow-hidden border-2 bg-slate-950 shadow-2xl transition-colors duration-200 ${isAlert ? 'border-red-500' : 'border-slate-700'}`}>
      
      {/* HUD: Recording Indicator */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
         <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
         <span className="font-mono text-red-500 font-bold text-xs tracking-widest">REC</span>
      </div>

      {/* Header of Video Feed */}
      <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/80 to-transparent z-20 flex justify-between items-start">
        <div className="flex items-center gap-2">
          <div className="bg-slate-900/80 px-2 py-1 rounded border border-slate-600 flex items-center gap-2">
             <Target className="w-3 h-3 text-safety-green" />
             <span className="text-xs font-mono text-slate-200 font-bold uppercase">CAM-04: HALA A</span>
          </div>
        </div>
        <button className="p-1 hover:bg-slate-700/50 rounded text-slate-400 hover:text-white transition-colors">
          <Maximize className="w-5 h-5" />
        </button>
      </div>

      {/* The Video Image Placeholder */}
      <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
        {/* Mock Industrial Feed Image */}
        <img 
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80" 
          alt="Factory Feed" 
          className={`w-full h-full object-cover transition-opacity duration-300 ${isAlert ? 'opacity-50 grayscale' : 'opacity-80'}`}
        />
        
        {/* Red Flash Overlay */}
        <div className={`absolute inset-0 bg-red-600/30 mix-blend-overlay transition-opacity duration-100 ${isAlert ? 'opacity-100' : 'opacity-0'}`}></div>

        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]"></div>
        
        {/* --- AR OVERLAYS --- */}

        {/* 1. PRODUCTION WORKER (Accident Victim Simulation Spot) */}
        <div className={`absolute top-[40%] left-[25%] w-[18%] h-[45%] border-2 z-20 transition-colors duration-200 
            ${isAlert ? 'border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.8)]' : 'border-safety-green'}`}>
           
           {/* Dynamic Label */}
           <div className={`absolute -top-8 left-0 flex items-center gap-1 px-2 py-1 text-xs font-bold font-mono tracking-wider transition-colors
               ${isAlert ? 'bg-red-600 text-white' : 'bg-safety-green text-slate-900'}`}>
              {isAlert ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
              <span>{isAlert ? 'CRITICAL ERROR' : 'PPE CONFIRMED'}</span>
           </div>

           {/* Stats */}
           {!isAlert && (
               <div className="absolute -bottom-6 left-0 text-[10px] font-mono text-safety-green bg-black/50 px-1">
                 ID: W-12 | CONFIDENCE: 99%
               </div>
           )}
           
           {/* Tech Corners */}
           <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/50"></div>
           <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/50"></div>
        </div>

        {/* 2. BACKGROUND WORKER (Canteen Context Simulation) */}
        <div className="absolute top-[35%] left-[60%] w-[12%] h-[35%] border border-dashed border-blue-400 z-20 opacity-60">
           <div className="absolute -top-6 left-0 flex items-center gap-1 bg-blue-500/80 text-white px-1 py-0.5 text-[10px] font-bold font-mono">
              <Coffee className="w-3 h-3" />
              <span>LEGAL BREAK</span>
           </div>
        </div>

        {/* 3. MACHINE STATUS */}
        <div className="absolute bottom-4 left-4 z-20 bg-black/60 backdrop-blur px-3 py-1 rounded border-l-2 border-safety-green">
            <div className="text-[10px] text-slate-400 font-mono">MACHINE STATUS</div>
            <div className={`font-bold font-mono ${isAlert ? 'text-red-500' : 'text-safety-green'}`}>
                {isAlert ? 'EMERGENCY STOP' : 'RUNNING - 98% EFF'}
            </div>
        </div>

      </div>

      {/* Footer Stats */}
      <div className="bg-slate-900 border-t border-slate-700 p-2 flex justify-between items-center text-xs font-mono text-slate-500">
        <div className="flex gap-4">
            <span>FPS: 24.0</span>
            <span className={isAlert ? 'text-red-500 font-bold' : ''}>{isAlert ? 'DETECT: HAZARD' : 'DETECT: NORMAL'}</span>
        </div>
        <div className="flex items-center gap-2">
           <Camera className="w-3 h-3" />
           <span>MODEL: YOLOv8-IND</span>
        </div>
      </div>
    </div>
  );
};
