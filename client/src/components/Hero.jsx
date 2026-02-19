import bgVideo from '../assets/BG Video.mp4';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Looping background video ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-110"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* ── Dark overlay so text is always readable ── */}
      <div className="absolute inset-0 z-[5] bg-black/70" />

      {/* ── Center logo lockup ── */}
      <div className="relative z-10 flex flex-col items-center" style={{ paddingLeft: '8vw', paddingRight: '8vw', background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, transparent 70%)', paddingTop: '4rem', paddingBottom: '4rem' }}>
        {/* Red block banner with YOUNGBLOOD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h1 className="font-heading font-bold uppercase leading-[1.15] select-none" style={{ fontSize: 'clamp(3.5rem, 12vw, 6rem)', color: '#C62828', textShadow: '0 0 40px rgba(198,40,40,0.4), 0 0 80px rgba(198,40,40,0.2), 0 4px 20px rgba(0,0,0,0.6)', WebkitTextStroke: '1px #C62828' }}>
            YOUNGBLOOD
          </h1>
        </motion.div>

        {/* Tagline below the banner */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 md:mt-8 font-heading text-base md:text-lg lg:text-xl tracking-[0.25em] text-off-white uppercase select-none"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.5)' }}
        >
          for the love of culture
        </motion.p>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-off-white/90 text-lg md:text-xl max-w-2xl leading-relaxed text-justify-mobile"  style={{ textShadow: '0 2px 12px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.5)' }}
        >
          Adulthood is lonely as hell. We're building the antidote. A space where community, culture, play, and rebellious care collide.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4" style={{ marginTop: '2rem' }}
        >
          <a
            href="#join"
            className="px-10 py-4 bg-blood text-off-white font-heading font-bold text-lg tracking-wider hover:bg-blood-light transition-colors duration-200"
          >
            JOIN THE REBELLION →
          </a>
          <a
            href="#events"
            className="px-10 py-4 bg-transparent text-off-white font-heading font-bold text-lg tracking-wider border-3 border-off-white/20 hover:bg-blood hover:border-blood transition-colors duration-200"
          >
            SEE EVENTS
          </a>
        </motion.div>
      </div>

      {/* ── Scroll hint at bottom ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 border-2 border-off-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-off-white/70 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
