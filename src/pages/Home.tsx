import { useState } from 'react';
import { MessageSquare, Database, Github, Globe, Info, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import FloatingParticles from '@/components/FloatingParticles';

interface HomeProps {
  onSelectOption: (option: string) => void;
}

const Home = ({ onSelectOption }: HomeProps) => {
  // Animation variants with proper TypeScript types
  const container: { [key: string]: any } = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item: { [key: string]: any } = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#00081d] text-white">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00081d] via-[#0a1a3a] to-[#00081d]" />
      
      {/* Floating particles */}
      <FloatingParticles />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.03]" />
      
      {/* Glow effects */}
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#119cff] rounded-full filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-[#119cff] rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-16">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="text-8xl md:text-9xl">
            🤖
          </div>
        </motion.div>
        
        {/* Title section */}
        <motion.div 
          className="text-center mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#a0c4ff] leading-tight">
            AI Agent
            <br />
            <span className="text-[#119cff]">Superbot</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Your intelligent AI assistant powered by advanced language models.
            Chat with the bot or explore your database.
          </p>
        </motion.div>
        
        {/* Main Options */}
        <motion.div 
          className="w-full max-w-5xl mx-auto"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Chat Option */}
            <motion.div variants={item}>
              <button
                onClick={() => onSelectOption('Chat')}
                className="w-full group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02]"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#119cff]/20 via-[#0d7acc]/10 to-transparent" />
                
                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#119cff]/30 to-transparent blur-xl" />
                </div>
                
                {/* Border Gradient */}
                <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-[#119cff]/50 to-transparent">
                  <div className="h-full w-full bg-[#0a1a3a] rounded-3xl" />
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-10 flex flex-col items-center text-center space-y-6">
                  {/* Icon Container with Animation */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#119cff]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#119cff] to-[#0d7acc] flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-500">
                      <MessageSquare className="w-10 h-10 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="space-y-3">
                    <h3 className="text-3xl font-bold text-white group-hover:text-[#119cff] transition-colors duration-300">
                      Chat with AI
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed">
                      Start a conversation with our intelligent assistant
                    </p>
                  </div>
                  
                  {/* Arrow Indicator */}
                  <div className="flex items-center gap-2 text-[#119cff] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-sm font-medium">Get Started</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </button>
            </motion.div>
            
            {/* Database Option */}
            <motion.div variants={item}>
              <button
                onClick={() => onSelectOption('Supabase Dashboard')}
                className="w-full group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02]"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent" />
                
                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-transparent blur-xl" />
                </div>
                
                {/* Border Gradient */}
                <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-emerald-500/50 to-transparent">
                  <div className="h-full w-full bg-[#0a1a3a] rounded-3xl" />
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-10 flex flex-col items-center text-center space-y-6">
                  {/* Icon Container with Animation */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-emerald-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-500">
                      <Database className="w-10 h-10 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="space-y-3">
                    <h3 className="text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
                      View Database
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed">
                      Explore and manage your live Supabase data
                    </p>
                  </div>
                  
                  {/* Arrow Indicator */}
                  <div className="flex items-center gap-2 text-emerald-400 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-sm font-medium">Explore Data</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </button>
            </motion.div>
            
            {/* How It Works Option */}
            <motion.div variants={item}>
              <button
                onClick={() => onSelectOption('How It Works')}
                className="w-full group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02]"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent" />
                
                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-transparent blur-xl" />
                </div>
                
                {/* Border Gradient */}
                <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-purple-500/50 to-transparent">
                  <div className="h-full w-full bg-[#0a1a3a] rounded-3xl" />
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-10 flex flex-col items-center text-center space-y-6">
                  {/* Icon Container with Animation */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-500">
                      <Info className="w-10 h-10 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="space-y-3">
                    <h3 className="text-3xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                      How It Works
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed">
                      Understand the AI architecture and pipeline
                    </p>
                  </div>
                  
                  {/* Arrow Indicator */}
                  <div className="flex items-center gap-2 text-purple-400 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-sm font-medium">Learn More</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </button>
            </motion.div>
            
            {/* Sample Queries Option */}
            <motion.div variants={item}>
              <button
                onClick={() => onSelectOption('Sample Queries')}
                className="w-full group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02]"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-transparent" />
                
                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-transparent blur-xl" />
                </div>
                
                {/* Border Gradient */}
                <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-orange-500/50 to-transparent">
                  <div className="h-full w-full bg-[#0a1a3a] rounded-3xl" />
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-10 flex flex-col items-center text-center space-y-6">
                  {/* Icon Container with Animation */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-500">
                      <BookOpen className="w-10 h-10 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="space-y-3">
                    <h3 className="text-3xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
                      Sample Queries
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed">
                      Explore example questions to ask the AI
                    </p>
                  </div>
                  
                  {/* Arrow Indicator */}
                  <div className="flex items-center gap-2 text-orange-400 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-sm font-medium">View Examples</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </button>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Footer */}
        <motion.div 
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-gray-400 mb-4">
            Built with React, TypeScript, Supabase & AI
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm">
            <a 
              href="https://github.com/Rathore-Rajpal" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-[#119cff] transition-colors"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
            <a 
              href="https://www.rathorerajpal.live" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-[#119cff] transition-colors"
            >
              <Globe className="w-5 h-5" />
              Portfolio
            </a>
          </div>
          <p className="text-sm text-gray-600 mt-6">
            © 2026 Rajpal Rathore. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
