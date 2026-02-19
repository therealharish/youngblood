import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'MISSION', href: '#hero' },
  { label: 'PILLARS', href: '#pillars' },
  { label: 'EVENTS', href: '#events' },
  { label: 'JOIN', href: '#join' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b-3 border-blood">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="font-heading text-2xl font-bold tracking-tighter text-blood">
          YOUNGBLOOD
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-heading text-sm font-semibold tracking-widest text-off-white hover:text-blood transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#join"
            className="ml-4 px-5 py-2 bg-blood text-off-white font-heading font-bold text-sm tracking-wider hover:bg-blood-light transition-colors duration-200 border-2 border-blood"
          >
            JOIN THE REBELLION →
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-blood text-3xl font-heading cursor-pointer bg-transparent border-none"
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black border-t-3 border-blood overflow-hidden"
          >
            <div className="flex flex-col items-center gap-6 py-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-heading text-lg font-bold tracking-widest text-off-white hover:text-blood transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#join"
                onClick={() => setMenuOpen(false)}
                className="px-6 py-3 bg-blood text-off-white font-heading font-bold tracking-wider border-2 border-blood"
              >
                JOIN THE REBELLION →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
