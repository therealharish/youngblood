import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { apiUrl } from '../api.js';

function formatParagraph(text) {
  // Bold the first sentence of each paragraph
  const firstDot = text.indexOf('. ');
  if (firstDot === -1) {
    return <span className="font-semibold text-off-white">{text}</span>;
  }
  const firstSentence = text.slice(0, firstDot + 1);
  const rest = text.slice(firstDot + 1);
  return (
    <>
      <span className="font-semibold text-off-white">{firstSentence}</span>
      {rest}
    </>
  );
}

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiUrl(`/api/events/${id}`))
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-8 h-8 border-3 border-blood border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold text-off-white mb-4">Event not found</h1>
          <Link to="/" className="text-blood-bright font-heading tracking-wider hover:underline">
            ← BACK HOME
          </Link>
        </div>
      </div>
    );
  }

  const paragraphs = event.fullDescription.split('\n\n');

  return (
    <div className="min-h-screen bg-black text-off-white">
      <ScrollToTop />

      {/* Header */}
      <div className="border-b-3 border-blood" style={{ paddingTop: '6rem', paddingBottom: '4rem', paddingLeft: '8vw', paddingRight: '8vw' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Link to="/events" className="inline-block text-blood-bright font-heading text-sm tracking-wider hover:underline mb-8">
            ← ALL EVENTS
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="font-heading text-5xl md:text-7xl font-bold text-blood-bright leading-none">
                {event.day}
              </span>
              <div>
                <span className="font-heading text-lg tracking-widest text-light-gray uppercase">
                  {event.month} {event.year}
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <span className="px-3 py-1 border-2 border-blood text-blood-bright font-heading text-xs tracking-wider uppercase">
                    {event.borough}
                  </span>
                  <span className="px-3 py-1 border-2 border-mid-gray text-light-gray font-heading text-xs tracking-wider uppercase">
                    {event.playType}
                  </span>
                </div>
              </div>
            </div>
            <h1 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-tighter mt-6">
              {event.title}
            </h1>
            <p className="mt-4 text-lg text-off-white/60 leading-relaxed" style={{ maxWidth: '600px' }}>
              {event.shortDescription}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Full description */}
      <div style={{ paddingTop: '2rem', paddingLeft: '8vw', paddingRight: '8vw' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {paragraphs.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="text-light-gray text-lg leading-relaxed"
              style={{ marginBottom: '1.75rem' }}
            >
              {formatParagraph(para)}
            </motion.p>
          ))}
        </div>
      </div>

      {/* Image gallery — 3 per row grid, centered */}
      {event.images && event.images.length > 0 && (
        <div style={{ padding: '2rem 8vw' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3" style={{ gap: '1rem', maxWidth: '900px', margin: '0 auto' }}>
            {event.images.map((img, i) => (
              <motion.img
                key={i}
                src={img}
                alt={`${event.title} photo ${i + 1}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="w-full border-3 border-blood object-cover"
                style={{ height: '250px', filter: 'grayscale(20%) contrast(1.1)' }}
              />
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div style={{ paddingBottom: '6rem', paddingLeft: '8vw', paddingRight: '8vw' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="border-t-3 border-blood"
            style={{ marginTop: '3rem', paddingTop: '2rem', textAlign: 'center' }}
          >
            <p className="text-off-white/60 font-heading text-lg tracking-tight mb-6">
              Want to be at the next one?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center" style={{ gap: '1rem' }}>
              <Link
                to="/#join"
                className="px-10 py-4 bg-blood text-off-white font-heading font-bold text-lg tracking-wider hover:bg-blood-light transition-colors duration-200"
              >
                JOIN THE REBELLION →
              </Link>
              <Link
                to="/events"
                className="px-10 py-4 bg-transparent text-off-white font-heading font-bold text-lg tracking-wider border-3 border-off-white/20 hover:bg-blood hover:border-blood transition-colors duration-200"
              >
                MORE EVENTS
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
