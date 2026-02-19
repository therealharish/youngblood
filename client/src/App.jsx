import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pillars from './components/Pillars';
import EventsFeed from './components/EventsFeed';
import MembershipCTA from './components/MembershipCTA';
import Footer from './components/Footer';
import TheCode from './components/TheCode';
import PillarDetail from './pages/PillarDetail';
import AllEvents from './pages/AllEvents';
import EventDetail from './pages/EventDetail';
import Admin from './pages/Admin';

function HomePage() {
  return (
    <div className="min-h-screen bg-black text-off-white">
      <Navbar />
      <main>
        <Hero />
        <div className="border-t-3 border-blood" />
        <Pillars />
        <div style={{ paddingTop: '2rem', paddingBottom: '2rem' }}><div className="border-t-3 border-blood" /></div>
        <EventsFeed />
        <div style={{ paddingTop: '2rem', paddingBottom: '2rem' }}><div className="border-t-3 border-blood" /></div>
        <TheCode />
        <div style={{ paddingTop: '2rem', paddingBottom: '2rem' }}><div className="border-t-3 border-blood" /></div>
        <MembershipCTA />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pillar/:slug" element={<PillarDetail />} />
      <Route path="/events" element={<AllEvents />} />
      <Route path="/event/:id" element={<EventDetail />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
