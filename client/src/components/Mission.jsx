import { motion } from 'framer-motion';

export default function Mission() {
  return (
    <section className="py-24 md:py-32 px-6 bg-black">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-off-white text-xl md:text-2xl lg:text-3xl leading-relaxed font-heading tracking-tight"
        >
          Young adulthood is lonely as hell. We're building the antidote, 
          a space where community, music, and rebellious care collide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#join"
            className="px-8 py-4 bg-blood text-off-white font-heading font-bold text-lg tracking-wider hover:bg-blood-light transition-colors duration-200"
          >
            JOIN THE REBELLION →
          </a>
          <a
            href="#events"
            className="px-8 py-4 bg-transparent text-off-white font-heading font-bold text-lg tracking-wider border-3 border-off-white/20 hover:bg-blood hover:border-blood transition-colors duration-200"
          >
            SEE EVENTS
          </a>
        </motion.div>
      </div>
    </section>
  );
}
