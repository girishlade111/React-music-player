import { memo } from 'react';
import { motion } from 'framer-motion';
import { type View, useStore } from '@/store/useStore';
import { Home, Search, Compass, User } from 'lucide-react';

const navItems: { view: View; label: string; icon: typeof Home }[] = [
  { view: 'home', label: 'Home', icon: Home },
  { view: 'search', label: 'Search', icon: Search },
  { view: 'explore', label: 'Explore', icon: Compass },
  { view: 'profile', label: 'Profile', icon: User },
];

function MobileNav() {
  const currentView = useStore(s => s.currentView);
  const setCurrentView = useStore(s => s.setCurrentView);

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-14 bg-black/95 backdrop-blur-lg border-t border-white/10 z-50 flex lg:hidden items-center justify-around pb-1 safe-area-bottom">
      {navItems.map((item) => {
        const isActive = currentView === item.view;
        return (
          <motion.button
            key={item.view}
            onClick={() => setCurrentView(item.view)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1 transition-colors ${
              isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
            }`}
          >
            <item.icon size={20} strokeWidth={isActive ? 2 : 1.5} />
            <span className="text-[9px] tracking-wider uppercase">{item.label}</span>
            {isActive && (
              <motion.div
                layoutId="mobileNavIndicator"
                className="absolute -bottom-0.5 w-6 h-[2px] bg-white rounded-full"
                transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
              />
            )}
          </motion.button>
        );
      })}
    </nav>
  );
}

export default memo(MobileNav);
