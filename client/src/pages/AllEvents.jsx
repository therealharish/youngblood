import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl } from '../api.js';
import { motion } from 'framer-motion';

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

export default function AllEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiUrl('/api/events'))
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-black text-off-white">
      <ScrollToTop />

      {/* Header */}
      <div className="border-b-3 border-blood" style={{ paddingTop: '6rem', paddingBottom: '3rem', paddingLeft: '8vw', paddingRight: '8vw' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Link to="/" className="inline-block text-blood-bright font-heading text-sm tracking-wider hover:underline mb-8">
            ← BACK HOME
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-heading text-sm tracking-[0.3em] text-blood-bright uppercase mb-3">
              Everything We've Done
            </p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tighter">
              ALL <span className="text-blood-bright">EVENTS</span>
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Events grid */}
      <div style={{ padding: '3rem 8vw 6rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {loading ? (
            <div className="text-center py-16">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="inline-block w-8 h-8 border-3 border-blood border-t-transparent rounded-full"
              />
            </div>
          ) : (
            <div className="flex flex-col">
              {events.map((event, i) => (
                <Link
                  to={`/event/${event.id}`}
                  key={event.id}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="group border-t-3 border-blood flex flex-col md:flex-row md:items-center gap-4 md:gap-8 cursor-pointer"
                    style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}
                  >
                    {/* Date */}
                    <div className="flex-shrink-0 w-24">
                      <p className="font-heading text-3xl font-bold text-blood-bright leading-none">
                        {event.day}
                      </p>
                      <p className="font-heading text-sm tracking-widest text-light-gray uppercase">
                        {event.month} {event.year}
                      </p>
                    </div>

                    {/* Info */}
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
              <div className="border-t-3 border-blood" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
