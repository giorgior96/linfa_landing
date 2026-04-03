import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Portfolio from './Portfolio';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}
import { ArrowRight, Zap, Target, Code, CheckCircle, BarChart, Rocket, MonitorSmartphone, Brain, Search, MapPin, Share2, Briefcase, Calculator, Handshake } from 'lucide-react';

const Word = ({ children, progress, range }) => {
  // On a light background, text reveals by turning from light-gray to solid dark
  const color = useTransform(progress, range, ['#e2e8f0', '#011936']);
  return (
    <motion.span style={{ color, display: 'inline-block', marginRight: '0.25em' }}>
      {children}
    </motion.span>
  );
};

const VisionSection = () => {
  const text = "Non scriviamo solo codice. Costruiamo il motore tecnologico della tua visione. Dalla prima idea alla scalabilità globale, acceleriamo in modo decisivo il tuo successo.";
  const words = text.split(" ");
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 50%"] });

  return (
    <section ref={ref} className="section theme-light" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8rem 0' }}>
      <div style={{ padding: '0 5%' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 6.5vw, 6.5rem)', maxWidth: '1400px', textAlign: 'center', lineHeight: 1.15, fontWeight: 900, letterSpacing: '-0.04em', margin: 0 }}>
          {words.map((word, i) => {
            const start = i / (words.length + 3);
            const end = start + (1 / (words.length + 3));
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}

          {/* "Esplora i nostri progetti" Link - Animated just like the other words */}
          <Link to="/portfolio" style={{
            display: 'inline-flex',
            alignItems: 'center',
            textDecoration: 'underline',
            textDecorationThickness: '0.06em',
            textUnderlineOffset: '0.15em',
            textDecorationColor: '#011936',
            marginLeft: '0.25em',
            transition: 'opacity 0.3s ease'
          }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <Word progress={scrollYProgress} range={[0.9, 0.93]}>Esplora</Word>
            <Word progress={scrollYProgress} range={[0.94, 0.96]}>i</Word>
            <Word progress={scrollYProgress} range={[0.97, 1.0]}>progetti</Word>

            <motion.div style={{ color: useTransform(scrollYProgress, [0.97, 1.0], ['#e2e8f0', '#011936']), display: 'flex' }}>
              <ArrowRight style={{ width: '0.7em', height: '0.7em', marginLeft: '0.05em', transform: 'translateY(0.05em)', textDecoration: 'none' }} />
            </motion.div>
          </Link>.
        </h2>
      </div>
    </section>
  );
};


const PhasesInteractive = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const phases = [
    {
      title: "Foundation & Architecture",
      desc: "Niente esperimenti al buio. Progettiamo l'infrastruttura tecnologica e convalidiamo il modello di business con le logiche dei top player, prima ancora di scrivere una singola riga di codice, azzerando il rischio di spreco capitale."
    },
    {
      title: "High-Performance Engineering",
      desc: "Codice scritto esclusivamente per scalare. Sviluppiamo ecosistemi cloud-native e integriamo architetture di Intelligenza Artificiale per dominare enormi picchi di traffico minimizzando drasticamente i costi server."
    },
    {
      title: "Hyper-Growth & Exit",
      desc: "Ingegnerizziamo la tua acquisizione utenti come fosse un software algoritmico. Scateniamo funnel ad elevatissima conversione per saturare la tua nicchia, annientare il costo per lead e massimizzare la valutazione per il tuo prossimo Round o per l'Exit."
    }
  ];

  return (
    <div ref={containerRef} style={{ width: '100%', marginTop: isMobile ? '2rem' : '4rem', display: 'flex', flexDirection: 'column', gap: isMobile ? '4rem' : '6rem', position: 'relative', paddingLeft: isMobile ? '2.5rem' : '5rem' }}>

      {/* MASSIVE STATIC FROZEN WATERMARK */}
      {!isMobile && (
        <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translate(45%, -50%)', pointerEvents: 'none', zIndex: 0, opacity: 1 }}>
           <img 
             src="/Logo/Brand Mark.svg" 
             alt="Linfa Watermark"
             style={{ 
               width: '750px', 
               height: '750px' 
             }} 
           />
        </div>
      )}

      {/* BASE TIMELINE (GRAY) */}
      <div style={{ position: 'absolute', left: 0, top: '2rem', bottom: 0, width: '4px', backgroundColor: 'rgba(1, 25, 54, 0.05)', borderRadius: '4px' }} />

      {/* ACTIVE SCROLLING TIMELINE (DARK BRAND BLUE) */}
      <motion.div
        style={{
          position: 'absolute', left: 0, top: '2rem', bottom: 0, width: '4px',
          backgroundColor: '#011936', borderRadius: '4px',
          scaleY: scrollYProgress, transformOrigin: 'top'
        }}
      />

      {phases.map((phase, i) => {
        // Calculate dynamic threshold based on index
        const threshold = i === 0 ? 0 : i === 1 ? 0.5 : 1.0;
        const borderColor = useTransform(scrollYProgress, [threshold - 0.1, threshold], ['rgba(1, 25, 54, 0.1)', 'rgba(1, 25, 54, 1)']);
        const shadow = useTransform(scrollYProgress, [threshold - 0.1, threshold], ['0 0 0 0px rgba(1, 25, 54, 0)', '0 0 0 6px rgba(1, 25, 54, 0.2)']);

        return (
          <div key={i} style={{ position: 'relative' }}>

            {/* GLOWING DOT INDICATOR */}
            <div style={{ position: 'absolute', left: isMobile ? '-2.5rem' : '-5rem', top: '1.2rem', transform: 'translateX(-50%)', zIndex: 10 }}>
              <motion.div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#ffffff', border: '5px solid', borderColor: borderColor, boxShadow: shadow }} />
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ position: 'relative', zIndex: 1 }}
            >
              <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)', color: '#011936', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1, letterSpacing: '-0.04em' }}>
                {phase.title}
              </h3>
              <p style={{ color: '#475569', fontSize: 'clamp(1.1rem, 1.4vw, 1.35rem)', lineHeight: 1.7, fontWeight: 500, maxWidth: '850px', margin: 0 }}>
                {phase.desc}
              </p>
            </motion.div>
          </div>
        );
      })}

    </div>
  );
};

const OfferingsInteractive = () => {
  const [activeTab, setActiveTab] = useState('Tutti');
  const tabs = ['Tutti', 'Tech', 'Marketing', 'Business'];

  const offeringsData = {
    Tech: [
      {
        title: "Web App & App Native",
        subtitle: "MVP scalabili con architettura moderna e design user-centric.",
        features: ["Sviluppo Agile & Rilasci Rapidi", "UI/UX Ottimizzata per Conversione", "Stack Tecnologico Moderno", "Architettura Cloud-Native"],
        icon: <MonitorSmartphone size={32} />
      },
      {
        title: "Intelligenza Artificiale",
        subtitle: "Integrazione AI strategica per automatizzare processi e creare vantaggi competitivi.",
        features: ["Machine Learning & Deep Learning", "NLP & Analisi Predittiva", "Computer Vision", "Automazione Intelligente"],
        icon: <Brain size={32} />
      },
      {
        title: "Blockchain",
        subtitle: "Soluzioni blockchain sicure per tracciabilità, smart contract e decentralizzazione.",
        features: ["Smart Contract Sicuri", "DApp Development", "Tokenomics Design", "Web3 Integration"],
        icon: <Code size={32} />
      }
    ],
    Marketing: [
      {
        title: "SEO",
        subtitle: "Crescita organica strutturata. Visibilità online sostenibile.",
        features: ["Keyword Research Avanzata", "Technical SEO", "Content Strategy", "Link Building Premium"],
        icon: <Search size={32} />
      },
      {
        title: "SEM",
        subtitle: "Performance marketing immediato per risultati su scala (ROAS 5x+).",
        features: ["Google Ads Strategy", "Meta Ads Optimization", "A/B Testing", "Conversion Funnel"],
        icon: <Target size={32} />
      },
      {
        title: "GEO",
        subtitle: "Next-Gen AI-ready optimization per dominare i nuovi search engine.",
        features: ["Ottimizzazione ricerca locale AI", "Miglioramento E-E-A-T", "Integrazione Schema geolocalizzato", "Ottimizzazione per ChatGPT, Perplexity, Gemini"],
        icon: <MapPin size={32} />
      },
      {
        title: "Social Media",
        subtitle: "High Engagement, Community Building & target Lead Generation.",
        features: ["Content Strategy", "Paid Social Ads", "Community Growth", "Influencer Campaigns"],
        icon: <Share2 size={32} />
      }
    ],
    Business: [
      {
        title: "Business Model",
        subtitle: "Progetta modelli di business scalabili per ridurre il rischio di mercato.",
        features: ["Business Model Canvas & Value Prop", "Validazione Ipotesi (Lean Startup)", "Pricing Strategy & Posizionamento"],
        icon: <Briefcase size={32} />
      },
      {
        title: "Piani Finanziari",
        subtitle: "Modelli finanziari esecutivi pronti per investitori e direzionale.",
        features: ["Forecast P&L e Cash Flow 3-5 anni", "Analisi Fabbisogno Capitale", "Business Plan Esecutivo"],
        icon: <Calculator size={32} />
      },
      {
        title: "Ricerca Fondi",
        subtitle: "Supporto totale per ottenere i finanziamenti necessari alla crescita in Europa e US.",
        features: ["Pitch Deck & Investment Readiness", "Strategia Fundraising (VC, BA, Bandi)", "Term Sheet & Negoziazione"],
        icon: <Handshake size={32} />
      }
    ]
  };

  const categoryColors = {
    Tutti: '1, 25, 54',        // Navy Linfa
    Tech: '3, 112, 255',       // Blue Linfa
    Marketing: '139, 92, 246', // Indigo
    Business: '14, 165, 233'   // Sky Blue
  };

  const currentItems = activeTab === 'Tutti' 
    ? [
        ...offeringsData.Tech.map(i => ({...i, category: 'Tech'})), 
        ...offeringsData.Marketing.map(i => ({...i, category: 'Marketing'})), 
        ...offeringsData.Business.map(i => ({...i, category: 'Business'}))
      ] 
    : offeringsData[activeTab].map(i => ({...i, category: activeTab}));

  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
        {tabs.map((tab) => {
          const isAct = activeTab === tab;
          const tabRgb = tab === 'Tutti' ? '1, 25, 54' : categoryColors[tab];

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                position: 'relative',
                background: isAct ? 'transparent' : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.3) 100%)',
                color: isAct ? '#ffffff' : '#011936',
                border: '1px solid',
                borderColor: isAct ? 'transparent' : 'rgba(255, 255, 255, 0.5)',
                borderTopWidth: '1px',
                borderLeftWidth: '1px',
                backdropFilter: isAct ? 'none' : 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: isAct ? 'none' : 'blur(40px) saturate(180%)',
                padding: '0.8rem 2.8rem',
                borderRadius: '100px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                fontWeight: 700,
                transition: 'all 0.3s ease',
                boxShadow: isAct ? 'none' : '0 8px 32px rgba(3, 112, 255, 0.05), inset 0 0 0 1px rgba(255,255,255,0.3)'
              }}
            >
              {isAct && (
                <motion.div 
                  layoutId="active-tab" 
                  style={{ 
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
                    background: `linear-gradient(135deg, rgba(${tabRgb}, 0.9) 0%, rgba(${tabRgb}, 0.6) 100%)`,
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: `1px solid rgba(${tabRgb}, 1)`,
                    borderTop: '2px solid rgba(255,255,255,0.3)',
                    borderLeft: '2px solid rgba(255,255,255,0.3)',
                    borderRadius: '100px', 
                    zIndex: 0,
                    boxShadow: `0 10px 25px rgba(${tabRgb}, 0.3)`
                  }} 
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} 
                />
              )}
              <span style={{ position: 'relative', zIndex: 1 }}>{tab}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode='wait'>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30, transition: { duration: 0.2 } }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: '3rem' }}
        >
          {currentItems.map((item, idx) => {
            const itemRgb = categoryColors[item.category];
            
            return (
              <motion.div
                key={`${activeTab}-${idx}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -5, boxShadow: `0 20px 40px rgba(${itemRgb}, 0.15)`, border: `1px solid rgba(${itemRgb}, 0.6)` }}
                style={{ 
                  padding: '3.5rem 3rem', 
                  display: 'flex', 
                  flexDirection: 'column',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.2) 100%)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  borderTop: '2px solid rgba(255, 255, 255, 0.9)',
                  borderLeft: '2px solid rgba(255, 255, 255, 0.9)',
                  borderRadius: '30px',
                  boxShadow: `0 8px 32px 0 rgba(${itemRgb}, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.2)`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem', color: `rgb(${itemRgb})` }}>
                  {item.icon}
                  <h3 style={{ fontSize: '1.8rem', color: '#011936', margin: 0, fontWeight: 900, letterSpacing: '-0.04em' }}>{item.title}</h3>
                </div>
                <p style={{ color: '#475569', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>{item.subtitle}</p>

                <div style={{ marginTop: 'auto' }}>
                  <div style={{ borderTop: '1px solid rgba(1, 25, 54, 0.05)', paddingTop: '1.5rem', flex: 1, display: 'flex', flexWrap: 'wrap', columnGap: '0.75rem', rowGap: '0.4rem', alignItems: 'center' }}>
                    {item.features.map((feat, fIdx) => (
                      <React.Fragment key={fIdx}>
                        <span style={{ color: '#011936', fontSize: '0.98rem', fontWeight: 700, letterSpacing: '0.01em' }}>{feat}</span>
                        {fIdx < item.features.length - 1 && (
                          <span style={{ color: `rgba(${itemRgb}, 0.6)`, fontWeight: 900 }}>/</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const [isFinalSection, setIsFinalSection] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ascoltiamo l'avanzamento nativo dello scroll per capire quando entriamo nella fine del percorso
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setIsFinalSection(latest > 0.91);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const isLightTheme = location.pathname === "/portfolio" || location.pathname === "/offering" || (isFinalSection && location.pathname === "/");
  const isMobile = useIsMobile();

  return (
    <nav style={{
      position: 'fixed',
      top: isScrolled ? (isMobile ? '0.5rem' : '1rem') : '0',
      left: isScrolled ? '50%' : '0',
      transform: isScrolled ? 'translateX(-50%)' : 'none',
      width: isScrolled ? '90%' : '100%',
      maxWidth: isScrolled ? '1200px' : '100%',
      padding: isScrolled ? (isMobile ? '0.75rem 1.5rem' : '1rem 2.5rem') : (isMobile ? '1rem 1.5rem' : '1.5rem 3rem'),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 100,
      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      background: isScrolled 
         ? (isLightTheme ? 'rgba(255, 255, 255, 0.85)' : 'linear-gradient(135deg, rgba(1, 25, 54, 0.8) 0%, rgba(7, 11, 20, 0.9) 100%)')
         : 'transparent',
      backdropFilter: isScrolled ? 'blur(30px) saturate(180%)' : 'none',
      WebkitBackdropFilter: isScrolled ? 'blur(30px) saturate(180%)' : 'none',
      border: isScrolled 
         ? (isLightTheme ? '1px solid rgba(1, 25, 54, 0.05)' : '1px solid rgba(255, 255, 255, 0.15)') 
         : 'none',
      borderRadius: isScrolled ? '100px' : '0',
      boxShadow: isScrolled 
         ? (isLightTheme ? '0 20px 40px rgba(1, 25, 54, 0.05)' : '0 30px 60px rgba(0,0,0,0.3)') 
         : 'none',
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/Logo/Horizontal.svg" alt="Linfa Tech Logo" style={{ height: isMobile ? '24px' : '32px', filter: isLightTheme ? 'none' : 'brightness(0) invert(1)', transition: '0.6s' }} />
      </Link>
      <div style={{ display: 'flex', gap: isMobile ? '1rem' : '2.5rem', alignItems: 'center' }}>
        <Link to="/portfolio" style={{ color: isLightTheme ? '#011936' : '#fff', textDecoration: 'none', fontWeight: 600, transition: '0.6s', fontSize: isMobile ? '0.85rem' : '1rem' }}>{isMobile ? 'Lavori' : 'Portfolio'}</Link>
        <Link to="/offering" style={{ color: isLightTheme ? '#011936' : '#fff', textDecoration: 'none', fontWeight: 600, transition: '0.6s', fontSize: isMobile ? '0.85rem' : '1rem' }}>{isMobile ? 'Offering' : 'La Nostra Offering'}</Link>
        <a href="/#contact" className="btn" style={{ padding: isMobile ? '0.5rem 1.2rem' : '0.75rem 1.75rem', fontSize: isMobile ? '0.85rem' : '1rem', borderRadius: '100px' }}>
          Inizia {!isMobile && 'Ora'} {!isMobile && <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />}
        </a>
      </div>
    </nav>
  );
};

const ServicesThreeBoxes = () => {
  const brandBlue = "#0370FF";
  const brandDark = "#011936";
  const isMobile = useIsMobile();

  const services = [
    {
      num: "01",
      title: "Sviluppo Tecnologico",
      image: "/services/service_sviluppo.webp",
      subtitle: "Ingegneria hardware e software avanzata.",
      desc: "Progettiamo ecosistemi cloud-native, web application e piattaforme complesse. Scriviamo codice pulito, modulare e orientato alla performance pura, trasformando sfide tecniche in vantaggi competitivi tangibili per dominare la tua nicchia."
    },
    {
      num: "02",
      title: "AI Training & Formazione",
      image: "/services/service_ai_training.webp",
      subtitle: "Empowerment per i tuoi team interni.",
      desc: "Trasferiamo il nostro know-how in Intelligenza Artificiale direttamente nella tua azienda. Formiamo i tuoi sviluppatori sui migliori LLM e workflow AI, rendendo il team autonomo per integrare e scalare soluzioni generative proprietarie."
    },
    {
      num: "03",
      title: "Go-to-Market Strategico",
      image: "/services/service_go_to_market.webp",
      subtitle: "Dal rilascio alla vera trazione.",
      desc: "Un prodotto perfetto è inutile se nessuno lo usa. Architettiamo e lanciamo campagne di acquisizione ad altissime performance. Scaliamo i tuoi utenti con strategie di funnel avanzate, ottimizzando scientificamente conversioni e ROI."
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', width: '100%', maxWidth: '1850px', height: 'auto', gap: isMobile ? '1.5rem' : '3rem', margin: '0 auto', position: 'relative', zIndex: 10 }}>
      {services.map((svc, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            background: 'linear-gradient(135deg, #011936 0%, #01244e 100%)',
            border: `1px solid rgba(255,255,255,0.1)`,
            boxShadow: `0 10px 30px rgba(0,0,0,0.2)`,
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            position: 'relative'
          }}>

          {/* Image Presentation */}
          <div style={{ width: '100%', height: isMobile ? '220px' : '260px', position: 'relative', overflow: 'hidden' }}>
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              src={svc.image}
              alt={svc.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', backgroundColor: '#0f172a' }}
            />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, transparent 40%, rgba(1, 25, 54, 1) 100%)', pointerEvents: 'none' }}></div>

            {/* Architectural Giant Number Watermark over Image */}
            <div style={{
              position: 'absolute',
              top: '5%',
              right: '-2%',
              fontSize: '12rem',
              fontWeight: 900,
              color: 'transparent',
              WebkitTextStroke: `2px rgba(255, 255, 255, 0.4)`,
              lineHeight: 0.8,
              letterSpacing: '-0.06em',
              zIndex: 0,
              pointerEvents: 'none'
            }}>
              {svc.num}
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%', padding: isMobile ? '1.5rem 1.5rem 2.5rem 1.5rem' : '2rem 3rem 4rem 3rem' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 2.5vw, 2.8rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, color: '#ffffff', width: '80%' }}>
                {svc.title}
              </h2>
            </div>

            <p style={{ fontSize: '1.05rem', fontWeight: 600, color: '#e2e8f0', marginBottom: '1.5rem', letterSpacing: '-0.02em', textTransform: 'uppercase', opacity: 0.8 }}>
              {svc.subtitle}
            </p>

            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: `1px solid rgba(255,255,255,0.1)` }}>
              <p style={{ fontSize: 'clamp(1.05rem, 1.2vw, 1.25rem)', lineHeight: 1.8, color: '#cbd5e1', fontWeight: 500, margin: 0 }}>
                {svc.desc}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const featuredProjects = [
  {
    title: "GreenCart",
    desc: "L'Intelligenza Artificiale applicata all'efficienza della GDO. Piattaforma SaaS unificata zero-waste.",
    image: "/portfolio/greencart_desktop.webp",
    brandColor: "13, 148, 136", // #0d9488 RGB
    textColor: "#ffffff",
    centeredImage: true
  },
  {
    title: "Batoo",
    desc: "Il marketplace definitivo per il mercato nautico europeo. Ecosistema end-to-end immersivo e innovativo.",
    image: "/portfolio/batoo.webp",
    brandColor: "3, 112, 255", // #0370FF RGB
    textColor: "#ffffff"
  },
  {
    title: "Circlo",
    desc: "Il futuro del vuoto a rendere. Wallet digitale su logiche blockchain per il recupero plastiche.",
    image: "/portfolio/circlo_desktop.webp",
    brandColor: "234, 179, 8", // #eab308 RGB
    textColor: "#011936"
  }
];

const PortfolioHomeTeaser = () => {
  const isMobile = useIsMobile();
  return (
    <section className="section theme-light" style={{ padding: isMobile ? '5rem 0' : '8rem 5%', backgroundColor: '#ffffff', position: 'relative' }}>
      <div style={{ maxWidth: '1800px', margin: '0 auto', display: 'flex', flexDirection: 'column', padding: '0 5%' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-accent" style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>// PORTFOLIO HIGHLIGHTS</p>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '2rem' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, color: '#011936', margin: 0 }}>Prodotti <span style={{ color: 'rgba(1, 25, 54, 0.2)' }}>Plasmati.</span></h2>
            <Link to="/portfolio" className="btn" style={{ padding: '1rem 2.5rem' }}>Vedi Tutti i Lavori</Link>
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '2.5rem' }}>
          {featuredProjects.map((proj, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.15 }}
               viewport={{ once: true }}
               style={{
                 position: 'relative',
                 overflow: 'hidden',
                 borderRadius: '48px',
                 backgroundColor: `rgb(${proj.brandColor})`,
                 display: 'flex',
                 flexDirection: 'column',
                 height: isMobile ? '550px' : '750px',
                 transition: 'all 0.4s'
               }}
               whileHover={{ y: -10, boxShadow: `0 20px 40px rgba(${proj.brandColor}, 0.5)` }}
             >
               <div style={{ padding: isMobile ? '2rem' : '3.5rem 3.5rem 2rem 3.5rem', display: 'flex', flexDirection: 'column' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', gap: '1rem' }}>
                   <h3 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 900, letterSpacing: '-0.03em', color: proj.textColor, margin: 0, lineHeight: 1 }}>{proj.title}</h3>
                   <Link to="/portfolio" style={{ 
                     padding: '0.6rem 1.2rem', 
                     backgroundColor: proj.textColor === '#011936' ? 'rgba(1, 25, 54, 0.1)' : 'rgba(255,255,255,0.15)', 
                     borderRadius: '100px', 
                     color: proj.textColor, 
                     fontWeight: 700, 
                     display: 'flex', 
                     alignItems: 'center', 
                     textDecoration: 'none', 
                     fontSize: '0.9rem',
                     flexShrink: 0
                   }}>
                     Scopri <ArrowRight size={16} strokeWidth={3} style={{ marginLeft: '6px', transform: 'rotate(-45deg)' }} />
                   </Link>
                 </div>
                 <p style={{ color: proj.textColor === '#011936' ? 'rgba(1, 25, 54, 0.8)' : 'rgba(255, 255, 255, 0.9)', fontSize: '1.15rem', lineHeight: 1.5, fontWeight: 500, margin: 0 }}>
                   {proj.desc}
                 </p>
               </div>
               
               <div style={{ marginTop: 'auto', height: '55%', width: proj.centeredImage ? '80%' : '100%', marginLeft: proj.centeredImage ? '10%' : '8%', position: 'relative', overflow: 'hidden', borderTopLeftRadius: '24px', borderTopRightRadius: proj.centeredImage ? '24px' : '0' }}>
                 <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: proj.centeredImage ? 'center top' : 'left top' }} />
               </div>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FooterCTA = () => {
  return (
    <div style={{ padding: '8rem 5%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

      {/* Background Glow */}
      <div style={{ position: 'absolute', bottom: '-20%', left: '50%', transform: 'translateX(-50%)', width: '60vw', height: '50vh', background: 'radial-gradient(ellipse at bottom, rgba(3, 112, 255, 0.4) 0%, rgba(1, 25, 54, 0) 70%)', zIndex: 0, pointerEvents: 'none' }} />

      {/* Razzo Orbitante Naturale */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 35, ease: "linear", repeat: Infinity }}
        style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          width: '80vmin', 
          height: '80vmin', 
          marginTop: '-40vmin', 
          marginLeft: '-40vmin', 
          zIndex: 0, 
          pointerEvents: 'none' 
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%) rotate(90deg)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Rocket size={130} color="#ffffff" strokeWidth={0.8} style={{ transform: 'rotate(-45deg)', opacity: 0.95 }} />
          {/* Scia Bianca Morbida */}
          <div style={{ width: '8px', height: '18vh', background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4), transparent)', filter: 'blur(8px)', marginTop: '-25px', borderRadius: '100px' }} />
        </div>
      </motion.div>

      {/* Contenuto in primo piano */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1.5rem', letterSpacing: '0.2em', color: '#0370FF', textTransform: 'uppercase' }}>
          // Inizia il tuo viaggio
        </p>

        <h2 style={{ fontSize: 'clamp(2.5rem, 10vw, 7.5rem)', lineHeight: 0.9, textTransform: 'uppercase', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '2rem', color: '#ffffff' }}>
          PRONTI AL<br />
          <span style={{ color: 'transparent', WebkitTextStroke: '2px rgba(255,255,255,0.9)' }}>LANCIO?</span>
        </h2>

        <p style={{ fontSize: 'clamp(1.1rem, 1.2vw, 1.3rem)', maxWidth: '550px', marginBottom: '3rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
          Dalla validazione al lancio. Esperienza comprovata in MVP, GTM e Fundraising. Inizia il tuo viaggio ora.
        </p>
        <button className="btn" style={{ transform: 'scale(1.2)', zIndex: 2 }}>
          Richiedi un'Analisi Gratuita
        </button>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem', color: 'rgba(255,255,255,0.7)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="#0370FF" /> Risposta in 24h</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="#0370FF" /> Nessun impegno</span>
        </div>
      </div>

      {/* FOOTER BAR */}
      <div style={{ position: 'absolute', bottom: '0', left: 0, width: '100%', padding: '2rem 4rem', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', alignItems: 'center', color: '#a1a1aa', zIndex: 2 }}>
        <div>
          <img src="/Logo/Horizontal.svg" alt="Linfa" style={{ height: 30, filter: 'brightness(0) invert(1)' }} onError={(e) => { e.target.style.display = 'none' }} />
          <div style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>© {new Date().getFullYear()} Linfa Tech. P.IVA 14435250965</div>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>info@linfa.tech</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy & Cookie Policy</a>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const isMobile = useIsMobile();

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden' }}>

      {/* 1. HERO SECTION */}
      <section className="section theme-dark" style={{ position: 'relative', height: '100vh', minHeight: '100vh', width: '100vw', zIndex: 0, overflow: 'hidden' }}>
        <div className="hero-video-wrapper" style={{ zIndex: 0 }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay" style={{ zIndex: 1 }}></div>
        </div>

        <div style={{
          position: 'absolute',
          top: '50%',
          left: isMobile ? '50%' : 'auto',
          right: isMobile ? 'auto' : '5%',
          transform: isMobile ? 'translate(-50%, -50%)' : 'translateY(-50%)',
          width: isMobile ? '90%' : '100%',
          maxWidth: '700px',
          zIndex: 10,
          textAlign: isMobile ? 'center' : 'left'
        }}>
          <motion.div
            className="liquid-glass-hero"
            style={{ padding: isMobile ? '2rem' : '3rem', width: '100%' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p style={{ fontWeight: 700, fontSize: isMobile ? '0.85rem' : '1rem', marginBottom: '1.5rem', letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase' }}>
                // Growth Partner Strategico
            </p>

            <h1 style={{ fontSize: 'clamp(2.5rem, 10vw, 7.5rem)', lineHeight: 0.9, textTransform: 'uppercase', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '2rem', color: '#ffffff' }}>
              DA ZERO<br />
              ALLA VERA<br />
              <span style={{ color: 'transparent', WebkitTextStroke: '2px rgba(255,255,255,0.9)' }}>TRACTION.</span>
            </h1>

            <p style={{ fontSize: 'clamp(1.1rem, 1.2vw, 1.3rem)', maxWidth: '550px', marginBottom: '3rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
              Acceleriamo la tua crescita integrando ingegneria avanzata e strategie di mercato. Convertiamo idee complesse in prodotti profittevoli.
            </p>
            <button className="btn" style={{ display: 'inline-flex', padding: '1rem 2rem', fontSize: '1.1rem' }}>Inizia Ora <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} /></button>
          </motion.div>
        </div>
      </section>

      {/* 2. VISION SECTION */}
      <div style={{ width: '100vw', minHeight: '100vh', backgroundColor: 'var(--bg-light)' }}>
        <VisionSection />
      </div>

      {/* 3. SERVICES SECTION */}
      <section className="section theme-light" style={{ width: '100vw', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '80px 5% 40px 5%' : '80px 2% 0 2%', position: 'relative', backgroundColor: '#ffffff' }}>
        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1850px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '0 auto' }}>
          <div style={{ marginBottom: isMobile ? '1.5rem' : '2.5rem', paddingLeft: '0.5rem' }}>
            <p className="text-accent" style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              // Le nostre competenze
            </p>
            <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', color: '#011936', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>
              La nostra <span style={{ color: '#011936' }}>specializzazione.</span>
            </h2>
          </div>
          <ServicesThreeBoxes />
        </div>
      </section>

      {/* 4. PHASES SECTION */}
      <section className="section theme-light" style={{ width: '100vw', minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', paddingTop: isMobile ? '100px' : '100px', paddingBottom: isMobile ? '50px' : '100px', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <p className="text-accent" style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>// IL NOSTRO PROCESSO</p>
            <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, color: '#011936', marginBottom: '2rem' }}>Le nostre <span className="text-accent">fasi strategiche.</span></h2>
          </motion.div>
          <PhasesInteractive />
        </div>
      </section>

      {/* PORTFOLIO HIGHLIGHTS */}
      <PortfolioHomeTeaser />

      {/* 5. OFFERING TEASER */}
      <section className="section theme-light" style={{ width: '100vw', height: isMobile ? 'auto' : '100vh', minHeight: '100vh', flexShrink: 0, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '5rem 0' : 0, backgroundColor: '#ffffff' }}>

        {/* Huge Typography Background */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 'clamp(4rem, 15vw, 25rem)', fontWeight: 900, color: '#012c70', opacity: 0.15, whiteSpace: 'nowrap', zIndex: 0, pointerEvents: 'none', letterSpacing: '-0.05em' }}>
          ECOSISTEMA
        </div>

        {/* Ambient Glow per dar vita alla rifrazione del vetro (Risolto per Mobile Area Diffusa) */}
        <div style={{ position: 'absolute', width: isMobile ? '150vw' : '60vw', height: isMobile ? '150vw' : '60vw', minWidth: '600px', minHeight: '600px', background: 'radial-gradient(circle, rgba(3,112,255,0.15) 0%, rgba(255,255,255,0) 65%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, pointerEvents: 'none' }} />

        {/* Main Card */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            backgroundColor: 'rgba(248, 251, 255, 0.96)',
            WebkitTransform: 'translateZ(0)',
            transform: 'translateZ(0)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            borderTop: '2px solid rgba(255, 255, 255, 0.95)',
            borderLeft: '2px solid rgba(255, 255, 255, 0.95)',
            boxShadow: '0 10px 40px rgba(1, 25, 54, 0.05)',
            borderRadius: '40px',
            padding: isMobile ? '3rem 1.5rem' : '5rem 4rem',
            textAlign: 'center',
            maxWidth: '900px',
            width: '90%'
          }}
        >
          <h2 style={{ fontSize: 'clamp(2.2rem, 8vw, 4.5rem)', color: '#011936', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '1.5rem' }}>
            Un intero ecosistema<br />al tuo servizio.
          </h2>

          <p style={{ fontSize: 'clamp(1.1rem, 1.2vw, 1.3rem)', color: '#475569', marginBottom: '3rem', maxWidth: '650px', margin: '0 auto 3.5rem auto', lineHeight: 1.6, fontWeight: 500 }}>
            Ingegneria hardware/software avanzata, performance marketing scientifico e venture building in un'unica offering strutturata per dominare il mercato digitale.
          </p>

          <Link to="/offering" className="btn" style={{ display: 'inline-flex', alignItems: 'center', padding: '1.25rem 3rem', fontSize: '1.15rem' }}>
            Esplora la Nostra Offering <ArrowRight size={22} style={{ marginLeft: '0.75rem' }} />
          </Link>
        </div>
      </section>
      {/* 6. FOOTER CTA - SCROLL VERTICALE SOPRA LO SLIDER */}
      <div style={{ position: 'relative', zIndex: 10, backgroundColor: '#011936', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <FooterCTA />
      </div>
    </div>
  );
};

const OfferingPage = () => {
  return (
    <>
      <section className="section theme-light" style={{ minHeight: '100vh', paddingTop: '150px', position: 'relative', overflow: 'hidden', backgroundColor: '#f8fafc' }}>
         <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', width: '80vw', height: '80vw', background: 'radial-gradient(circle, rgba(3,112,255,0.08) 0%, rgba(255,255,255,0) 70%)', top: '-20%', left: '-10%', borderRadius: '50%', filter: 'blur(60px)' }} />
            <div style={{ position: 'absolute', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(1,25,54,0.03) 0%, rgba(255,255,255,0) 70%)', bottom: '-10%', right: '-10%', borderRadius: '50%', filter: 'blur(60px)' }} />
            <div style={{ position: 'absolute', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(3,112,255,0.05) 0%, rgba(255,255,255,0) 70%)', top: '30%', left: '30%', borderRadius: '50%', filter: 'blur(80px)' }} />
         </div>
        <div style={{ maxWidth: '1800px', width: '95%', margin: '0 auto', position: 'relative', zIndex: 1, padding: '2rem 2%' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="text-accent" style={{ fontWeight: 700, marginBottom: '1.5rem', fontSize: '1rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>// LA NOSTRA OFFERING</p>
            <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 6.5rem)', color: '#011936', marginBottom: '2rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>Mettiti in <span className="text-accent">Vantaggio.</span></h2>
            <p style={{ fontSize: '1.25rem', color: '#475569', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}>Tecnologie avanzate, marketing strategico e consulenza business per dominare il mercato digitale.</p>
          </motion.div>
          <OfferingsInteractive />
        </div>
      </section>
      <FooterCTA />
    </>
  );
};

import Lenis from 'lenis';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offering" element={<OfferingPage />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </Router>
  );
}

export default App;
