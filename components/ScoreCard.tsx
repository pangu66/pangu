'use client';

import { motion } from 'framer-motion';
import { Clock, Zap } from 'lucide-react';

interface ScoreCardProps {
  sport: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | string;
  awayScore: number | string;
  status: 'live' | 'final' | 'upcoming';
  time?: string;
  index?: number;
}

export default function ScoreCard({
  sport,
  league,
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  status,
  time,
  index = 0
}: ScoreCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'live':
        return 'from-red-500/20 to-red-500/5';
      case 'final':
        return 'from-gray-500/10 to-gray-500/5';
      default:
        return 'from-blue-500/10 to-blue-500/5';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <div
        className={`relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br ${getStatusColor()} backdrop-blur-sm transition-all duration-300 hover:border-gray-700 hover:shadow-xl`}
        style={{
          boxShadow: status === 'live' 
            ? '0 0 20px rgba(255, 59, 48, 0.1)' 
            : 'none'
        }}
      >
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/2 to-transparent pointer-events-none" />

        <div className="relative p-6">
          {/* Header: Sport badge & status */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                {sport}
              </span>
              <span className="text-xs text-gray-600">•</span>
              <span className="text-xs text-gray-500">{league}</span>
            </div>

            {/* Live Badge */}
            {status === 'live' && (
              <motion.div
                animate={{ opacity: [1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex items-center gap-1.5 bg-red-500/20 px-3 py-1 rounded-full"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-red-500"
                />
                <span className="text-xs font-bold text-red-400">LIVE</span>
              </motion.div>
            )}

            {status === 'final' && (
              <span className="text-xs font-bold text-gray-500 uppercase">Final</span>
            )}

            {status === 'upcoming' && (
              <div className="flex items-center gap-1 text-xs text-blue-400">
                <Clock size={12} />
                <span>{time}</span>
              </div>
            )}
          </div>

          {/* Match details */}
          <div className="space-y-4">
            {/* Home Team */}
            <motion.div
              className="flex items-center justify-between"
              whileHover={{ paddingLeft: 8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex-1">
                <p className="text-sm text-gray-400 uppercase tracking-wide mb-1">
                  {homeTeam}
                </p>
              </div>
              {status !== 'upcoming' && (
                <motion.div
                  key={`home-${homeScore}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                >
                  {homeScore}
                </motion.div>
              )}
              {status === 'upcoming' && (
                <p className="text-gray-500 text-sm">vs</p>
              )}
            </motion.div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" />

            {/* Away Team */}
            <motion.div
              className="flex items-center justify-between"
              whileHover={{ paddingLeft: 8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex-1">
                <p className="text-sm text-gray-400 uppercase tracking-wide mb-1">
                  {awayTeam}
                </p>
              </div>
              {status !== 'upcoming' && (
                <motion.div
                  key={`away-${awayScore}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-bold text-white"
                >
                  {awayScore}
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Footer info */}
          {status === 'live' && (
            <motion.div
              animate={{ opacity: [0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-5 pt-4 border-t border-gray-800 flex items-center gap-2 text-xs text-gray-500"
            >
              <Zap size={12} className="text-yellow-500" />
              <span>Live updates • Tap to view details</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
