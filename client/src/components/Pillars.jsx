import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const pillars = [
  {
    number: '01',
    slug: 'play',
    title: 'PLAY CREATES CHANGE',
    description:
      "Play isn't childish, it's radical. When we play, we drop the armor. We stop performing 'adulthood' and start actually living. Every game night, every dance floor, every dumb bit with strangers is a tiny revolution.",
  },
  {
    number: '02',
    slug: 'caring',
    title: 'CARING IS COOL',
    description:
      "In a world that profits from your loneliness, giving a damn is punk as hell. We disguise mental health support as youth culture, because showing up for each other shouldn't feel clinical. It should feel like home.",
  },
  {
    number: '03',
    slug: 'community',
    title: 'COMMUNITY IS BELONGING',
    description:
      "Not a network. Not a following. A ritual. Something you return to, again and again, because it feeds you. We're building the spaces where strangers become family, one gathering at a time.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.2, ease: 'easeOut' },
  }),
};

export default function Pillars() {
  return (
    <section id="pillars" style={{ paddingTop: '4rem', paddingBottom: '4rem', paddingLeft: '5vw', paddingRight: '5vw' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center" style={{ marginBottom: '1.5rem' }}
        >
          <p className="font-heading text-sm tracking-[0.3em] text-blood-bright uppercase mb-3">
            What We Believe
          </p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tighter">
            THE THREE <span className="text-blood-bright">PILLARS</span>
          </h2>
        </motion.div>

        {/* Pillar cards — grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '1.5rem' }}>
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative border-3 border-blood bg-dark-gray flex flex-col justify-between min-h-[360px] cursor-default" style={{ padding: '1.5rem' }}
            >
              {/* Number */}
              <div className="mb-6">
                <span className="font-heading text-6xl font-bold text-mid-gray group-hover:text-blood-bright transition-colors duration-300">
                  {pillar.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-heading text-xl font-bold uppercase tracking-tight mb-4 text-off-white group-hover:text-blood-bright transition-colors duration-300" style={{ whiteSpace: 'nowrap' }}>
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="text-light-gray text-sm leading-relaxed">
                {pillar.description}
              </p>

              {/* Bottom arrow accent */}
              <Link
                to={`/pillar/${pillar.slug}`}
                className="mt-6 flex items-center gap-2 text-blood-bright opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div className="h-[2px] w-8 bg-blood" />
                <span className="font-heading text-sm tracking-widest">EXPLORE</span>
                <span>→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
