import { useState } from 'react';
import { motion } from 'framer-motion';
import { apiUrl } from '../api.js';

export default function MembershipCTA() {
  const [form, setForm] = useState({ name: '', email: '', age: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(apiUrl('/api/members'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section id="join" className="relative overflow-hidden" style={{ paddingTop: '4rem', paddingBottom: '4rem', paddingLeft: '5vw', paddingRight: '5vw' }}>
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blood/5 -skew-x-12 origin-top-right" />

      <div className="relative z-10" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="border-3 border-blood bg-dark-gray" style={{ padding: '3rem' }}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <span className="text-6xl mb-6 block">⚡</span>
              <h3 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-tighter text-blood-bright mb-4">
                YOU'RE IN.
              </h3>
              <p className="text-light-gray text-lg">
                Welcome to the rebellion. We'll hit you up real soon.
              </p>
            </motion.div>
          ) : (
            <>
              <div style={{ marginBottom: '2.5rem' }}>
                <p className="font-heading text-sm tracking-[0.3em] text-blood-bright uppercase mb-3">
                  Membership
                </p>
                <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4">
                  JOIN THE <span className="text-blood-bright">REBELLION</span>
                </h2>
                <p className="text-light-gray text-base max-w-lg">
                  Tired of doom-scrolling alone? Same. Drop your info
                  and we'll get you into the next gathering. No fees. No catch.
                  Just people who actually give a damn.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-heading text-xs tracking-widest uppercase text-light-gray">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What do they call you?"
                    className="bg-black border-3 border-mid-gray text-off-white px-4 py-3 font-body text-base focus:border-blood focus:outline-none transition-colors placeholder:text-mid-gray"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-heading text-xs tracking-widest uppercase text-light-gray">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="no-spam@promise.com"
                    className="bg-black border-3 border-mid-gray text-off-white px-4 py-3 font-body text-base focus:border-blood focus:outline-none transition-colors placeholder:text-mid-gray"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-heading text-xs tracking-widest uppercase text-light-gray">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    required
                    min="18"
                    max="24"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="18–24"
                    className="bg-black border-3 border-mid-gray text-off-white px-4 py-3 font-body text-base focus:border-blood focus:outline-none transition-colors placeholder:text-mid-gray"
                  />
                </div>

                <div className="flex items-end">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 bg-blood text-off-white font-heading font-bold text-lg tracking-wider border-3 border-blood hover:bg-blood-light transition-colors duration-200 cursor-pointer"
                  >
                    LET'S GO →
                  </motion.button>
                </div>

                {error && (
                  <p className="md:col-span-2 text-red-400 font-heading text-sm">
                    {error}
                  </p>
                )}
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
