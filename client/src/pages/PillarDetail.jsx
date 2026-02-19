import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

const pillarData = {
  play: {
    number: '01',
    title: 'PLAY CREATES CHANGE',
    tagline: 'Play is not the opposite of work. It is the opposite of depression.',
    description: [
      "Play isn't childish, it's radical. When we play, we drop the armor. We stop performing 'adulthood' and start actually living. Every game night, every dance floor, every dumb bit with strangers is a tiny revolution.",
      "We believe that transformation doesn't happen in lecture halls or self-help seminars. It happens when you're laughing so hard you forget to be anxious. When you're dancing like nobody's watching because, for once, you actually don't care.",
      "YOUNGBLOOD events are designed around play as a vehicle for connection. We create spaces where vulnerability is disguised as fun, where healing looks like a game night, and where the most radical thing you can do is let yourself be silly.",
    ],
    principles: [
      'Every event starts with play, not introductions',
      'We design for laughter before learning',
      'Vulnerability is easier when you are having fun',
      'The best connections happen when guards are down',
    ],
  },
  caring: {
    number: '02',
    title: 'CARING IS COOL',
    tagline: 'In a world that profits from your loneliness, giving a damn is punk.',
    description: [
      "In a world that profits from your loneliness, giving a damn is punk as hell. We disguise mental health support as youth culture, because showing up for each other shouldn't feel clinical. It should feel like home.",
      "We are not therapists. We are not a hotline. We are your people. The ones who text back. The ones who show up. The ones who notice when you have been quiet for too long.",
      "YOUNGBLOOD builds care into the fabric of everything we do. From check-in circles disguised as icebreakers to buddy systems that feel like friendship, we make sure nobody falls through the cracks.",
    ],
    principles: [
      'Mental health support should feel like friendship',
      'Showing up is the most radical act of care',
      'Community is the first line of defense against loneliness',
      'Care is not clinical, it is cultural',
    ],
  },
  community: {
    number: '03',
    title: 'COMMUNITY IS BELONGING',
    tagline: 'Not a network. Not a following. A ritual.',
    description: [
      "Not a network. Not a following. A ritual. Something you return to, again and again, because it feeds you. We're building the spaces where strangers become family, one gathering at a time.",
      "We reject the idea that community is something you find. Community is something you build, brick by brick, gathering by gathering, conversation by conversation. It takes intention. It takes showing up even when you don't feel like it.",
      "YOUNGBLOOD is not an app. It is not a platform. It is a room full of people who chose to be there. Who chose each other. That is what makes it sacred.",
    ],
    principles: [
      'Community is built, not found',
      'Rituals create belonging',
      'Strangers are just friends you have not played with yet',
      'Showing up is the membership fee',
    ],
  },
};

export default function PillarDetail() {
  const { slug } = useParams();
  const pillar = pillarData[slug];

  if (!pillar) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold text-off-white mb-4">Pillar not found</h1>
          <Link to="/" className="text-blood-bright font-heading tracking-wider hover:underline">
            ← BACK HOME
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-off-white">
      <ScrollToTop />
      {/* Header */}
      <div className="border-b-3 border-blood" style={{ paddingTop: '6rem', paddingBottom: '4rem', paddingLeft: '8vw', paddingRight: '8vw' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Link to="/" className="inline-block text-blood-bright font-heading text-sm tracking-wider hover:underline mb-8">
            ← BACK HOME
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-heading text-8xl md:text-9xl font-bold text-mid-gray/30">
              {pillar.number}
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tighter mt-2">
              {pillar.title}
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-off-white/70 font-heading tracking-tight leading-relaxed" style={{ maxWidth: '600px' }}>
              {pillar.tagline}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div style={{ paddingTop: '4rem', paddingBottom: '6rem', paddingLeft: '8vw', paddingRight: '8vw' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '3rem' }}>
            {/* Main text — 2 columns */}
            <div className="md:col-span-2">
              {pillar.description.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                  className="text-light-gray text-lg leading-relaxed"
                  style={{ marginBottom: '1.5rem' }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Sidebar — principles */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="border-3 border-blood bg-dark-gray"
              style={{ padding: '1.5rem' }}
            >
              <h3 className="font-heading text-sm tracking-[0.2em] text-blood-bright uppercase mb-6">
                What We Live By
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {pillar.principles.map((p, i) => (
                  <li
                    key={i}
                    className="text-off-white/80 text-sm leading-relaxed border-b border-mid-gray/30 last:border-0"
                    style={{ paddingTop: '0.75rem', paddingBottom: '0.75rem' }}
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            style={{ marginTop: '4rem', textAlign: 'center' }}
          >
            <p className="text-off-white/60 font-heading text-lg tracking-tight mb-6">
              Ready to experience this firsthand?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center" style={{ gap: '1rem' }}>
              <Link
                to="/#join"
                className="px-10 py-4 bg-blood text-off-white font-heading font-bold text-lg tracking-wider hover:bg-blood-light transition-colors duration-200"
              >
                JOIN THE REBELLION →
              </Link>
              <Link
                to="/#events"
                className="px-10 py-4 bg-transparent text-off-white font-heading font-bold text-lg tracking-wider border-3 border-off-white/20 hover:bg-blood hover:border-blood transition-colors duration-200"
              >
                SEE EVENTS
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
