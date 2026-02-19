import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { apiUrl } from '../api.js';

export default function EventsFeed() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });
  const moveDistRef = useRef(0);
  const sectionRef = useRef(null);
  const rafRef = useRef(null);

  // Fetch featured events from API
  useEffect(() => {
    fetch(apiUrl('/api/events?featured=true'))
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Smooth cursor follow with lerp
  useEffect(() => {
    const animate = () => {
      setSmoothPos((prev) => ({
        x: prev.x + (cursorPos.x - prev.x) * 0.15,
        y: prev.y + (cursorPos.y - prev.y) * 0.15,
      }));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [cursorPos]);

  const handleMouseMove = (e, event) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });

    const dx = e.movementX || 0;
    const dy = e.movementY || 0;
    moveDistRef.current += Math.sqrt(dx * dx + dy * dy);
    if (moveDistRef.current > 120 && event.images?.length) {
      moveDistRef.current = 0;
      setImageIndex((prev) => (prev + 1) % event.images.length);
    }
  };

  const handleMouseEnter = (id) => {
    setHoveredId(id);
    setImageIndex(0);
    moveDistRef.current = 0;
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
    setImageIndex(0);
    moveDistRef.current = 0;
  };

  return (
    <section id="events" className="bg-black" style={{ padding: '4rem 5vw' }}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        style={{ marginBottom: '2rem' }}
      >
        <div>
          <p className="font-heading text-sm tracking-[0.3em] text-blood-bright uppercase mb-3">
            Events We've Hosted
          </p>
          <Link to="/events">
            <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tighter hover:text-blood-bright transition-colors duration-200 cursor-pointer">
              PAST <span className="text-blood-bright">EVENTS</span>
            </h2>
          </Link>
        </div>
        <p className="text-light-gray text-sm max-w-sm">
          Every event is an experiment in connection. No awkward mixers.
          No forced fun. Just real play, real people, real FUN.
        </p>
      </motion.div>

      {/* Events list — full width */}
      {loading ? (
        <div className="text-center py-16">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            className="inline-block w-8 h-8 border-3 border-blood border-t-transparent rounded-full"
          />
        </div>
      ) : (
        <div ref={sectionRef} className="relative flex flex-col gap-0">
          {events.map((event, i) => (
            <Link to={`/event/${event.id}`} key={event.id}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                onMouseEnter={() => handleMouseEnter(event.id)}
                onMouseLeave={handleMouseLeave}
                onMouseMove={(e) => handleMouseMove(e, event)}
                className="group border-t-3 border-blood flex flex-col md:flex-row md:items-center gap-4 md:gap-8 cursor-pointer" style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}
              >
                {/* Date block */}
                <div className="flex-shrink-0 w-24">
                  <p className="font-heading text-3xl font-bold text-blood-bright leading-none">
                    {event.day}
                  </p>
                  <p className="font-heading text-sm tracking-widest text-light-gray uppercase">
                    {event.month}
                  </p>
                </div>

                {/* Event info */}
                <div className="flex-1">
                  <h3 className="font-heading text-xl md:text-2xl font-bold uppercase tracking-tight text-off-white group-hover:text-blood-bright transition-colors duration-200">
                    {event.title}
                  </h3>
                  <p className="text-light-gray text-sm mt-1">{event.shortDescription}</p>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="px-3 py-1 border-2 border-blood text-blood-bright font-heading text-xs tracking-wider uppercase">
                    {event.borough}
                  </span>
                  <span className="px-3 py-1 border-2 border-mid-gray text-light-gray font-heading text-xs tracking-wider uppercase">
                    {event.playType}
                  </span>
                </div>

                {/* Arrow */}
                <span className="hidden md:block text-blood-bright text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  →
                </span>
              </motion.div>
            </Link>
          ))}

          {/* Bottom border */}
          <div className="border-t-3 border-blood" />

          {/* View all link */}
          <Link to="/events" className="block text-center" style={{ marginTop: '2rem' }}>
            <span className="font-heading text-sm tracking-[0.2em] text-blood-bright uppercase hover:underline">
              VIEW ALL EVENTS →
            </span>
          </Link>

          {/* Cursor-following image preview */}
          <AnimatePresence>
            {hoveredId !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="hidden md:block fixed z-50 pointer-events-none"
                style={{
                  left: smoothPos.x + (sectionRef.current?.getBoundingClientRect().left || 0) + 20,
                  top: smoothPos.y + (sectionRef.current?.getBoundingClientRect().top || 0) - 90,
                  width: '260px',
                  height: '170px',
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${hoveredId}-${imageIndex}`}
                    src={events.find((e) => e.id === hoveredId)?.images?.[imageIndex]}
                    alt="Event preview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full object-cover border-3 border-blood"
                    style={{ filter: 'grayscale(20%) contrast(1.1)' }}
                  />
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
