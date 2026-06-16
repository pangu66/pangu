'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface HeaderProps {
  activeTab: 'yesterday' | 'today' | 'upcoming';
  onTabChange: (tab: 'yesterday' | 'today' | 'upcoming') => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs = [
    { id: 'yesterday', label: 'Yesterday' },
    { id: 'today', label: 'Today' },
    { id: 'upcoming', label: 'Upcoming' }
  ] as const;

  return (
    <motion.header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: isScrolled 
          ? 'linear-gradient(180deg, rgba(10, 14, 39, 0.95) 0%, rgba(18, 24, 41, 0.85) 100%)' 
          : 'linear-gradient(135deg, rgba(0, 212, 255, 0.08) 0%, rgba(0, 153, 255, 0.04) 100%)',
        backdropFilter: isScrolled ? 'blur(10px)' : 'blur(4px)',
        borderBottom: isScrolled ? '1px solid rgba(31, 37, 64, 0.5)' : 'none'
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            PANGU
          </h1>
          <p className="text-sm text-gray-400 mt-1">Live Sports Scores</p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-gray-800">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id as 'yesterday' | 'today' | 'upcoming')}
              className="relative px-4 py-3 text-sm font-medium transition-colors duration-200"
              style={{
                color: activeTab === tab.id ? '#ffffff' : '#8b92b5'
              }}
              whileHover={{ color: '#ffffff' }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.label}
              
              {/* Animated underline */}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.header>
  );
}
