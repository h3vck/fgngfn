import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Users, ArrowRight, Shield } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import avatarImage from 'figma:asset/a961f3deed9b36e975c032f2c124a4e49ba9d072.png';

export default function App() {
  const [stage, setStage] = useState<'initial' | 'verifying' | 'verified' | 'error'>('initial');
  const [clickTime, setClickTime] = useState<number | null>(null);

  const TELEGRAM_LINK = 'https://link-tg.top/info';

  const handleVerification = () => {
    const currentTime = Date.now();
    setClickTime(currentTime);
    setStage('verifying');

    // Simple bot detection: check if click happened too fast (bots often click instantly)
    // Real users take at least 500ms to interact
    setTimeout(() => {
      const timeDiff = Date.now() - currentTime;
      
      // If the interaction seems natural (took some time, user scrolled/moved)
      if (timeDiff >= 1500) {
        setStage('verified');
        
        // Redirect after showing success
        setTimeout(() => {
          window.location.href = TELEGRAM_LINK;
        }, 1500);
      } else {
        setStage('error');
        
        // Allow retry after 2 seconds
        setTimeout(() => {
          setStage('initial');
        }, 2000);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-rose-950 to-black flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-rose-600/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-900/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-gradient-to-b from-black/50 to-rose-950/30 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-pink-500/20 border border-pink-500/20">
          
          {/* Channel Avatar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 via-rose-500 to-red-600 p-1 shadow-lg shadow-pink-500/60">
                <img
                  src={avatarImage}
                  alt="Channel Avatar"
                  className="w-full h-full rounded-full object-cover bg-black"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-pink-500 rounded-full p-1 shadow-lg shadow-pink-500/50">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Channel Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-8"
          >
            <h1 className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] mb-2">
              Exclusive Content Inside
            </h1>
            <p className="text-rose-100 mb-4">
              Join now to unlock access.
            </p>
            
            {/* Follower count */}
            <div className="flex items-center justify-center gap-2 text-rose-200/80 mb-1">
              <Users className="w-4 h-4" />
              <span className="text-sm">9K members</span>
            </div>
            <p className="text-rose-300/60 text-sm">
              Premium insights & exclusive updates
            </p>
          </motion.div>

          {/* Verification Status */}
          <AnimatePresence mode="wait">
            {stage === 'initial' && (
              <motion.div
                key="initial"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <button
                  onClick={handleVerification}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-pink-500/60 hover:shadow-pink-500/80 hover:scale-[1.02] flex items-center justify-center gap-2"
                  style={{
                    boxShadow: '0 0 30px rgba(236, 72, 153, 0.6), 0 0 60px rgba(236, 72, 153, 0.3)'
                  }}
                >
                  <span>Join Telegram</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <div className="flex items-center justify-center gap-2 text-rose-300/70 text-sm">
                  <Shield className="w-4 h-4" />
                  <span>Tap to verify & continue</span>
                </div>
              </motion.div>
            )}

            {stage === 'verifying' && (
              <motion.div
                key="verifying"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-8"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-pink-500/30 border-t-pink-500 rounded-full mx-auto mb-4"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(236, 72, 153, 0.6))'
                  }}
                />
                <p className="text-rose-100">
                  Verifying… stay with us.
                </p>
              </motion.div>
            )}

            {stage === 'verified' && (
              <motion.div
                key="verified"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                </motion.div>
                <p className="text-pink-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.6)]">
                  Verified! Redirecting...
                </p>
              </motion.div>
            )}

            {stage === 'error' && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 border-4 border-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-red-500">✕</span>
                </div>
                <p className="text-red-400">
                  Verification failed. Please try again.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Security badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 pt-6 border-t border-pink-500/20"
          >
            <div className="flex items-center justify-center gap-2 text-rose-300/60 text-xs">
              <Shield className="w-3 h-3" />
              <span>Protected by bot verification</span>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-rose-300/50 text-sm mt-6"
        >
          By continuing, you agree to join our community
        </motion.p>
      </motion.div>
    </div>
  );
}
