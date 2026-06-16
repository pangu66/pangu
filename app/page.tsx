'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import ScoreCard from '../components/ScoreCard';

type Tab = 'yesterday' | 'today' | 'upcoming';

interface Game {
  id: string;
  sport: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | string;
  awayScore: number | string;
  status: 'live' | 'final' | 'upcoming';
  time?: string;
}

const GAMES: Record<Tab, Game[]> = {
  yesterday: [
    {
      id: '1',
      sport: 'Football',
      league: 'Premier League',
      homeTeam: 'Manchester City',
      awayTeam: 'Arsenal',
      homeScore: 3,
      awayScore: 1,
      status: 'final'
    },
    {
      id: '2',
      sport: 'Basketball',
      league: 'NBA',
      homeTeam: 'Boston Celtics',
      awayTeam: 'Los Angeles Lakers',
      homeScore: 108,
      awayScore: 102,
      status: 'final'
    },
    {
      id: '3',
      sport: 'Esports',
      league: 'CS:GO Pro League',
      homeTeam: 'FaZe Clan',
      awayTeam: 'NAVI',
      homeScore: 2,
      awayScore: 1,
      status: 'final'
    },
    {
      id: '4',
      sport: 'Tennis',
      league: 'Wimbledon',
      homeTeam: 'Jannik Sinner',
      awayTeam: 'Novak Djokovic',
      homeScore: '2-1',
      awayScore: 'Sets',
      status: 'final'
    }
  ],
  today: [
    {
      id: '5',
      sport: 'Football',
      league: 'La Liga',
      homeTeam: 'Real Madrid',
      awayTeam: 'Barcelona',
      homeScore: 2,
      awayScore: 1,
      status: 'live'
    },
    {
      id: '6',
      sport: 'Basketball',
      league: 'NBA',
      homeTeam: 'Denver Nuggets',
      awayTeam: 'Golden State Warriors',
      homeScore: 95,
      awayScore: 88,
      status: 'live'
    },
    {
      id: '7',
      sport: 'Formula 1',
      league: '2024 Season',
      homeTeam: 'Max Verstappen',
      awayTeam: 'Lewis Hamilton',
      homeScore: 'Lap 42',
      awayScore: 'P2',
      status: 'live'
    },
    {
      id: '8',
      sport: 'American Football',
      league: 'NFL',
      homeTeam: 'Kansas City Chiefs',
      awayTeam: 'Buffalo Bills',
      homeScore: 24,
      awayScore: 17,
      status: 'live'
    },
    {
      id: '9',
      sport: 'Hockey',
      league: 'NHL',
      homeTeam: 'Toronto Maple Leafs',
      awayTeam: 'Montreal Canadiens',
      homeScore: 4,
      awayScore: 2,
      status: 'live'
    },
    {
      id: '10',
      sport: 'Esports',
      league: 'Valorant Champions',
      homeTeam: 'Fnatic',
      awayTeam: 'Evil Geniuses',
      homeScore: 2,
      awayScore: 1,
      status: 'live'
    }
  ],
  upcoming: [
    {
      id: '11',
      sport: 'Football',
      league: 'Champions League',
      homeTeam: 'Paris Saint-Germain',
      awayTeam: 'Bayern Munich',
      homeScore: '-',
      awayScore: '-',
      status: 'upcoming',
      time: '20:00 CET'
    },
    {
      id: '12',
      sport: 'Basketball',
      league: 'NBA',
      homeTeam: 'Miami Heat',
      awayTeam: 'Phoenix Suns',
      homeScore: '-',
      awayScore: '-',
      status: 'upcoming',
      time: '19:30 EST'
    },
    {
      id: '13',
      sport: 'Tennis',
      league: 'US Open',
      homeTeam: 'Serena Williams',
      awayTeam: 'Naomi Osaka',
      homeScore: '-',
      awayScore: '-',
      status: 'upcoming',
      time: '15:00 EDT'
    },
    {
      id: '14',
      sport: 'Cricket',
      league: 'ICC World Cup',
      homeTeam: 'India',
      awayTeam: 'Pakistan',
      homeScore: '-',
      awayScore: '-',
      status: 'upcoming',
      time: '14:30 IST'
    },
    {
      id: '15',
      sport: 'Rugby',
      league: 'Six Nations',
      homeTeam: 'England',
      awayTeam: 'France',
      homeScore: '-',
      awayScore: '-',
      status: 'upcoming',
      time: '15:00 GMT'
    }
  ]
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('today');
  const games = GAMES[activeTab];

  return (
    <main className="min-h-screen bg-gray-950">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Games Grid */}
            {games.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {games.map((game, index) => (
                  <ScoreCard
                    key={game.id}
                    sport={game.sport}
                    league={game.league}
                    homeTeam={game.homeTeam}
                    awayTeam={game.awayTeam}
                    homeScore={game.homeScore}
                    awayScore={game.awayScore}
                    status={game.status}
                    time={game.time}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <p className="text-gray-500 text-lg">No games scheduled</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-8 border-t border-gray-800"
        >
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {games.length}
              </p>
              <p className="text-sm text-gray-500 mt-2">Games</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">
                {games.filter(g => g.status === 'live').length}
              </p>
              <p className="text-sm text-gray-500 mt-2">Live Now</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">
                15+
              </p>
              <p className="text-sm text-gray-500 mt-2">Leagues</p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
