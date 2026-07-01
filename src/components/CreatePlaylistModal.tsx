import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Music } from 'lucide-react';
import { useStore } from '@/store/useStore';

function CreatePlaylistModal() {
  const show = useStore(s => s.showCreatePlaylist);
  const setShow = useStore(s => s.setShowCreatePlaylist);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    if (!name.trim()) return;
    setShow(false);
    setName('');
    setDescription('');
  };

  const handleClose = () => {
    setShow(false);
    setName('');
    setDescription('');
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-aura-accent/20 flex items-center justify-center">
                  <Music size={18} className="text-aura-accent" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-lg font-light text-white">Create Playlist</h2>
                  <p className="text-xs text-white/30">Give your playlist a name</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X size={16} className="text-white/40" strokeWidth={1.5} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-white/40 tracking-wide mb-1.5 block">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="My awesome playlist"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-aura-accent/50 transition-colors"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                />
              </div>

              <div>
                <label className="text-xs text-white/40 tracking-wide mb-1.5 block">Description (optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add an optional description"
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-aura-accent/50 transition-colors resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleClose}
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 text-sm text-white/50 hover:bg-white/10 hover:text-white/70 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!name.trim()}
                className="flex-1 px-4 py-2.5 rounded-xl bg-aura-accent text-sm text-white font-light hover:bg-aura-accent/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Plus size={14} strokeWidth={2} /> Create
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(CreatePlaylistModal);
