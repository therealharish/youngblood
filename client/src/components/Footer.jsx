export default function Footer() {
  return (
    <footer className="border-t-3 border-blood bg-black" style={{ paddingTop: '3rem', paddingBottom: '3rem', paddingLeft: '5vw', paddingRight: '5vw' }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Brand */}
        <div>
          <h3 className="font-heading text-2xl font-bold text-blood-bright tracking-tighter mb-3">
            YOUNGBLOOD
          </h3>
          <p className="text-light-gray text-sm leading-relaxed max-w-xs">
            A social club making adulthood less lonely through
            community, culture, play, and rebellious care.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-heading text-xs tracking-[0.3em] text-blood-bright uppercase mb-4">
            Navigate
          </h4>
          <div className="flex flex-col gap-2">
            {['Pillars', 'Events', 'Code', 'Join'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-light-gray text-sm hover:text-blood-bright transition-colors arrow-motif"
              >
                {link.toUpperCase()}
              </a>
            ))}
          </div>
        </div>

        {/* Social + legal */}
        <div>
          <h4 className="font-heading text-xs tracking-[0.3em] text-blood-bright uppercase mb-4">
            Connect
          </h4>
          <div className="flex gap-4 mb-6">
            {['IG', 'TT', 'X'].map((platform) => (
              <a
                key={platform}
                href="#"
                className="w-10 h-10 border-2 border-blood flex items-center justify-center font-heading text-xs font-bold text-blood-bright hover:bg-blood hover:text-off-white transition-colors duration-200"
              >
                {platform}
              </a>
            ))}
          </div>
          <p className="text-mid-gray text-xs">
            © {new Date().getFullYear()} YOUNGBLOOD NYC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
