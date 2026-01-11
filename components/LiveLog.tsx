import React from 'react';
import { LogEntry } from '../types';
import { AlertOctagon, Info, AlertTriangle } from 'lucide-react';

interface LiveLogProps {
  logs: LogEntry[];
}

export const LiveLog: React.FC<LiveLogProps> = ({ logs }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden flex flex-col h-full mt-6">
      <div className="p-4 border-b border-slate-700 bg-slate-800 flex justify-between items-center">
        <h2 className="font-bold text-slate-100 flex items-center gap-2">
          <AlertOctagon className="w-5 h-5 text-slate-400" />
          Live Event Log
        </h2>
        <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-safety-green animate-pulse"></span>
            <span className="text-xs font-mono text-slate-400">REAL-TIME</span>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 p-2 space-y-2 max-h-[300px]">
        {logs.map((log) => (
          <div key={log.id} className="flex gap-3 items-start p-3 rounded bg-slate-900/50 border border-slate-700/50 hover:border-slate-600 transition-colors">
            <div className="mt-1">
                {log.type === 'CRITICAL' && <AlertOctagon className="w-4 h-4 text-safety-red" />}
                {log.type === 'WARNING' && <AlertTriangle className="w-4 h-4 text-safety-orange" />}
                {log.type === 'INFO' && <Info className="w-4 h-4 text-blue-400" />}
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <span className={`text-sm font-medium ${log.type === 'CRITICAL' ? 'text-red-200' : 'text-slate-300'}`}>
                        {log.message}
                    </span>
                    <span className="text-xs font-mono text-slate-500 whitespace-nowrap ml-2">
                        {log.timestamp}
                    </span>
                </div>
                <div className="text-xs text-slate-500 mt-1 font-mono uppercase tracking-wider">
                    STREFA: {log.zone}
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
