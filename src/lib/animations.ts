import type { Variants } from 'framer-motion';

export const easeOut = [0.16, 1, 0.3, 1] as const;

export const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};

export const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { ease: easeOut, duration: 0.4 } },
};

export const itemFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { ease: easeOut, duration: 0.4 } },
};

export const itemScale: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { ease: easeOut, duration: 0.4 } },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { ease: easeOut, duration: 0.5 } },
};

export const cardHover = {
  whileHover: { y: -4, scale: 1.01, transition: { ease: easeOut, duration: 0.3 } },
  whileTap: { scale: 0.98 },
};

export const btnHover = {
  whileHover: { scale: 1.06, transition: { ease: easeOut, duration: 0.2 } },
  whileTap: { scale: 0.94 },
};

export const iconBtnHover = {
  whileHover: { scale: 1.12, transition: { ease: easeOut, duration: 0.2 } },
  whileTap: { scale: 0.9 },
};

export const playBtnHover = {
  whileHover: { scale: 1.08, transition: { ease: easeOut, duration: 0.2 } },
  whileTap: { scale: 0.92 },
};

export const sidebarItem = (delay: number): Variants => ({
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { delay, ease: easeOut, duration: 0.4 } },
});

export const homeItem = (i: number): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4, ease: easeOut } },
});
