'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useEffect } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
};

export function MobileMenu({ open, onClose, links }: Props) {
  // ESC to close + body scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/70 z-50 md:hidden"
            aria-hidden
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            className="fixed top-0 left-0 bottom-0 w-[82vw] max-w-sm bg-circuit-900 border-r border-circuit-700 z-50 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex items-center justify-between px-6 h-[72px] border-b border-circuit-700">
              <span className="font-display uppercase tracking-[0.2em] text-ivory">
                Menu
              </span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="p-2 text-ivory/80 hover:text-ivory focus-ring rounded-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex flex-col p-6 gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={onClose}
                  className="font-display uppercase tracking-[0.16em] text-2xl text-ivory hover:text-mauli-500 transition py-2 focus-ring rounded-sm"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-6 pt-6 border-t border-circuit-700 flex flex-col gap-3">
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="nav-link"
                >
                  Cart
                </Link>
              </div>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
