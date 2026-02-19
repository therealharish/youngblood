import { motion } from 'framer-motion';

const codeItems = [
  {
    title: 'Start the conversation.',
    body: "Don't wait for the perfect moment. A passing comment, a shared laugh, a simple \"how's your day?\" can change the course of an ordinary afternoon. Connection favors the brave in small ways.",
  },
  {
    title: 'Let people step into your orbit.',
    body: 'Offer your favorite song. Share the story behind your tattoo. Invite someone along for coffee, for a walk, for the randomness of your Tuesday. Generosity with your inner world turns strangers into something softer.',
  },
  {
    title: 'Decline with grace. Accept with appetite.',
    body: "Honor your limits without building walls. Protect your peace, but don't shrink your life. Say no when you must. Say yes when it makes your eyes light up. Luck often hides behind willingness.",
  },
  {
    title: 'Choose curiosity over conclusions.',
    body: 'Every person carries invisible chapters. Ask about them. Wonder about them. Trade assumptions for questions. Understanding is built, not guessed.',
  },
  {
    title: 'Treat play as a practice.',
    body: "Lightness is not immaturity — it's resilience. Tease gently. Laugh loudly. Let delight interrupt your seriousness.",
  },
  {
    title: 'Care like it matters, because it does.',
    body: "In a world that rewards detachment, tenderness is radical. Show up. Check in. Mean it. Audacity isn't always loud — sometimes it's simply loving openly.",
  },
  {
    title: 'Move first.',
    body: "Be the one who waves. Who dances. Who admits they're nervous. Courage is contagious. When you go first, you make space for others to follow.",
  },
  {
    title: 'Live as an invitation.',
    body: 'Open posture. Open mind. Open hands. The energy you embody becomes permission for someone else to soften, to risk, to belong.',
  },
];

export default function TheCode() {
  return (
    <section id="code" className="bg-black" style={{ padding: '6rem 5vw' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{ marginBottom: '4rem' }}
        >
          <p className="font-heading text-sm tracking-[0.3em] text-blood-bright uppercase mb-3">
            YOUNGBLOOD's Manifesto
          </p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tighter">
            THE <span className="text-blood-bright">CODE</span>
          </h2>
        </motion.div>

        {/* Code items */}
        <div className="flex flex-col" style={{ gap: '0' }}>
          {codeItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="border-t-3 border-blood"
              style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}
            >
              <div className="flex flex-col md:flex-row md:gap-8">
                <div className="flex-shrink-0 md:w-1/3">
                  <span className="font-heading text-xs tracking-widest text-blood-bright uppercase">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-heading text-lg md:text-xl font-bold uppercase tracking-tight text-off-white mt-1">
                    {item.title}
                  </h3>
                </div>
                <p className="flex-1 text-light-gray text-base leading-relaxed mt-3 md:mt-0">
                  {item.body}
                </p>
              </div>
            </motion.div>
          ))}
          <div className="border-t-3 border-blood" />
        </div>
      </div>
    </section>
  );
}
