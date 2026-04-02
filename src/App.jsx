import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

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
  const color = useTransform(progress, range, ['#e2e8f0', '#0f172a']);
  return (
    <motion.span style={{ color, display: 'inline-block', marginRight: '0.25em' }}>
      {children}
    </motion.span>
  );
};

const VisionSection = ({ scrollYProgress }) => {
  const text = "Non scriviamo solo codice. Costruiamo il motore tecnologico della tua visione. Dalla prima idea alla scalabilità globale, acceleriamo in modo decisivo il tuo successo.";
  const words = text.split(" ");

  return (
    <section className="section theme-light" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ padding: '0 5%' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', maxWidth: '1200px', textAlign: 'center', lineHeight: 1.2, fontWeight: 700, letterSpacing: '-0.03em' }}>
          {words.map((word, i) => {
            // Text illuminates during 0.12 -> 0.25 scroll phase
            const start = 0.12 + (i / words.length) * 0.13;
            const end = start + (0.13 / words.length);
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </h2>
      </div>
    </section>
  );
};


const PhasesInteractive = () => {
  const [activeTab, setActiveTab] = useState(0);
  const isMobile = useIsMobile();

  const phases = [
    {
      num: "01",
      title: "Foundation & Architecture",
      desc: "Niente esperimenti al buio. Progettiamo l'infrastruttura tecnologica e convalidiamo il modello di business con le logiche dei top player, prima ancora di scrivere una singola riga di codice, azzerando il rischio di spreco capitale."
    },
    {
      num: "02",
      title: "High-Performance Engineering",
      desc: "Codice scritto esclusivamente per scalare. Sviluppiamo ecosistemi cloud-native e integriamo architetture di Intelligenza Artificiale per dominare enormi picchi di traffico minimizzando drasticamente i costi server."
    },
    {
      num: "03",
      title: "Hyper-Growth & Exit",
      desc: "Ingegnerizziamo la tua acquisizione utenti come fosse un software algoritmico. Scateniamo funnel ad elevatissima conversione per saturare la tua nicchia, annientare il costo per lead e massimizzare la valutazione per il tuo prossimo Round o per l'Exit."
    }
  ];

  return (
    <div style={{ width: '100%', marginTop: isMobile ? '2rem' : '4rem', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', height: isMobile ? 'auto' : '60vh', padding: isMobile ? '0' : '0 2rem' }}>
      
      {/* COLONNA SINISTRA: NUMERI CLICCABILI (TABS) */}
      <div style={{ flex: isMobile ? 'none' : '0 0 25%', width: '100%', display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: isMobile ? '1rem' : '2rem', alignItems: 'center', justifyContent: 'center', marginBottom: isMobile ? '2rem' : 0 }}>
         {phases.map((phase, i) => (
           <h2 
             key={i} 
             onClick={() => setActiveTab(i)}
             style={{
               fontSize: activeTab === i ? 'clamp(6rem, 10vw, 10rem)' : 'clamp(3rem, 5vw, 5rem)',
               fontWeight: 900,
               color: activeTab === i ? '#011936' : 'transparent',
               WebkitTextStroke: activeTab === i ? 'none' : '2px rgba(1, 25, 54, 0.25)',
               cursor: 'pointer',
               transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
               lineHeight: 0.8,
               margin: 0,
               userSelect: 'none',
               transform: activeTab === i ? 'scale(1)' : 'scale(0.9)',
               opacity: activeTab === i ? 1 : 0.6
             }}
           >
             {phase.num}
           </h2>
         ))}
      </div>

      {/* COLONNA DESTRA: DESCRIZIONE DINAMICA */}
      <div style={{ flex: isMobile ? 'none' : '0 0 75%', paddingLeft: isMobile ? '0' : '4rem', textAlign: isMobile ? 'center' : 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', minHeight: isMobile ? '250px' : 'auto' }}>
         <AnimatePresence mode="wait">
            <motion.div
              key={`desc-${activeTab}`}
              initial={{ opacity: 0, x: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
               {/* Decoratore Lineare Affilato */}
               <div style={{ width: '60px', height: '5px', background: 'linear-gradient(90deg, #0370FF, #00f0ff)', marginBottom: '2rem', borderRadius: '4px', marginInline: isMobile ? 'auto' : '0' }} />
               
               <h3 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', color: '#011936', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                 {phases[activeTab].title}
               </h3>
               
               <p style={{ color: '#475569', fontSize: 'clamp(1.2rem, 1.6vw, 1.6rem)', lineHeight: 1.65, fontWeight: 500, maxWidth: '90%' }}>
                 {phases[activeTab].desc}
               </p>
            </motion.div>
         </AnimatePresence>
         
         {/* Glow Decorativo di Sfondo Dietro ai Testi */}
         <motion.div 
           animate={{ backgroundColor: activeTab === 0 ? '#0370FF' : activeTab === 1 ? '#6366F1' : '#db2777' }} 
           transition={{ duration: 1.2 }} 
           style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', filter: 'blur(140px)', opacity: 0.08, zIndex: -1, pointerEvents: 'none' }} 
         />
      </div>

    </div>
  );
};

const OfferingsInteractive = () => {
  const [activeTab, setActiveTab] = useState('Tech');
  const tabs = ['Tech', 'Marketing', 'Business'];

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

  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
        {tabs.map((tab) => (
          <button 
            key={tab} 
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {activeTab === tab && (
              <motion.div layoutId="active-tab" className="tab-btn-bg" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />
            )}
            <span style={{ position: 'relative', zIndex: 1 }}>Area {tab}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode='wait'>
        <motion.div
           key={activeTab}
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -30, transition: { duration: 0.2 } }}
           transition={{ duration: 0.5, staggerChildren: 0.1 }}
           style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}
        >
           {offeringsData[activeTab].map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="liquid-glass" 
                style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}
              >
                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem', color: 'var(--accent)' }}>
                    {item.icon}
                    <h3 style={{ fontSize: '1.6rem', color: 'var(--text-dark)', margin: 0, fontWeight: 700 }}>{item.title}</h3>
                 </div>
                 <p style={{ color: 'var(--text-muted-dark)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>{item.subtitle}</p>
                 
                 <div style={{ marginTop: 'auto' }}>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
                       {item.features.map((feat, fIdx) => (
                          <div key={fIdx} className="feature-list-item">
                             <CheckCircle size={18} color="var(--accent)" style={{ flexShrink: 0, marginTop: '3px' }} />
                             <span style={{ color: '#cbd5e1', fontSize: '1.05rem' }}>{feat}</span>
                          </div>
                       ))}
                    </div>
                 </div>
              </motion.div>
           ))}
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

  const showWhiteNavbar = isFinalSection && location.pathname === "/";

  return (
    <nav style={{
      position: 'fixed',
      top: isScrolled ? '1rem' : '0',
      left: isScrolled ? '50%' : '0',
      transform: isScrolled ? 'translateX(-50%)' : 'none',
      width: isScrolled ? '90%' : '100%',
      maxWidth: isScrolled ? '1200px' : '100%',
      padding: isScrolled ? '1rem 2.5rem' : '1.5rem 3rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 100,
      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      background: showWhiteNavbar ? 'rgba(255, 255, 255, 0.96)' : (isScrolled ? 'linear-gradient(135deg, rgba(1, 25, 54, 0.8) 0%, rgba(7, 11, 20, 0.9) 100%)' : 'transparent'),
      backdropFilter: isScrolled ? 'blur(30px) saturate(180%)' : 'none',
      WebkitBackdropFilter: isScrolled ? 'blur(30px) saturate(180%)' : 'none',
      border: showWhiteNavbar ? '1px solid rgba(226, 232, 240, 0.8)' : (isScrolled ? '1px solid rgba(255, 255, 255, 0.15)' : 'none'),
      borderRadius: isScrolled ? '100px' : '0',
      boxShadow: showWhiteNavbar ? '0 20px 40px rgba(1, 25, 54, 0.05)' : (isScrolled ? '0 30px 60px rgba(0,0,0,0.3)' : 'none'),
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/Logo/Horizontal.svg" alt="Linfa Tech Logo" style={{ height: '32px', filter: showWhiteNavbar ? 'none' : 'brightness(0) invert(1)', transition: '0.6s' }} />
      </Link>
      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        <Link to="/offering" style={{ color: showWhiteNavbar ? '#011936' : '#fff', textDecoration: 'none', fontWeight: 600, transition: '0.6s' }}>La Nostra Offering</Link>
        <a href="/#contact" className="btn" style={{ padding: '0.75rem 1.75rem', fontSize: '1rem', borderRadius: '100px' }}>
          Inizia Ora <ArrowRight size={18} style={{marginLeft: '0.5rem'}} />
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
      title: "MVP Rapido",
      subtitle: "Da zero a mercato in 4 settimane.",
      desc: "Sviluppiamo il nucleo centrale del tuo prodotto per raccogliere feedback reali e validare l'idea commerciale, abbattendo il rischio quasi a zero ed evitando gli sprechi.",
      points: ["Prototipazione veloce", "Test di mercato immediati", "Architettura scalabile", "Validazione dinamica"]
    },
    {
      num: "02",
      title: "Go-to-Market",
      subtitle: "Acquisisci i tuoi primi veri clienti.",
      desc: "Il miglior prodotto software è inutile senza utenti. Costruiamo assieme un piano strategico di trazione: canali, acquisition funnel e ottimizzazione delle conversioni.",
      points: ["Strategia multi-canale", "Campagne Performance", "Funnel di Acquisizione", "KPI di valore"]
    },
    {
      num: "03",
      title: "Tech & Business",
      subtitle: "Il partner per scalare i margini.",
      desc: "Non solo sviluppatori: valutiamo le scelte ingegneristiche analizzandone l'impatto sul tuo bilancio. La tecnologia deve proteggere la profittabilità della tua azienda.",
      points: ["Sinergia operativa", "Costi server ottimizzati", "Review Architetturale", "ROI massimizzato"]
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', width: '100%', maxWidth: '1850px', height: 'auto', gap: '3rem', margin: '0 auto', position: 'relative', zIndex: 10 }}>
      {services.map((svc, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.6 + i * 0.2, type: 'spring', bounce: 0.15 }}
          whileHover={{ y: -15, scale: 1.02 }}
          style={{ 
            flex: 1, 
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.5) 100%)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            border: `1px solid rgba(255,255,255,0.8)`,
            boxShadow: `0 30px 60px rgba(1, 25, 54, 0.05), inset 0 0 20px rgba(255,255,255,0.5)`,
            borderRadius: '24px',
            padding: '4rem 3rem', 
            display: 'flex', 
            flexDirection: 'column',
            cursor: 'pointer',
            overflow: 'hidden',
            position: 'relative'
        }}>
           
           {/* Architectural Giant Number Watermark */}
           <motion.div style={{
              position: 'absolute', 
              top: '-15%', 
              right: '-5%', 
              fontSize: '18rem', 
              fontWeight: 900, 
              color: 'transparent',
              WebkitTextStroke: `2px ${brandBlue}10`, 
              lineHeight: 0.8, 
              letterSpacing: '-0.06em',
              zIndex: 0,
              pointerEvents: 'none'
            }}>
              {svc.num}
           </motion.div>

           <div style={{ position: 'relative', zIndex: 1 }}>
               
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
                   <h2 style={{ fontSize: 'clamp(2rem, 2.5vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1.1, color: brandDark, width: '70%' }}>
                     {svc.title}
                   </h2>
                   
                   <motion.div whileHover={{ scale: 1.1, rotate: 15 }} style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: `${brandBlue}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: brandBlue, border: `1px solid ${brandBlue}20`, flexShrink: 0 }}>
                      <ArrowRight size={24} />
                   </motion.div>
               </div>
               
               <p style={{ fontSize: '1.05rem', fontWeight: 600, color: brandDark, marginBottom: '1.5rem', letterSpacing: '-0.02em', textTransform: 'uppercase', opacity: 0.8 }}>
                 {svc.subtitle}
               </p>

               <p style={{ fontSize: 'clamp(0.95rem, 1vw, 1.1rem)', lineHeight: 1.7, marginBottom: '3rem', color: '#334155', fontWeight: 500 }}>
                 {svc.desc}
               </p>

               <ul style={{ listStyle: 'none', padding: 0, marginTop: 'auto' }}>
                  {svc.points.map((p, pIdx) => (
                    <li key={pIdx} style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.75rem', borderTop: `1px solid ${brandDark}10`, paddingTop: '1.25rem' }}>
                       <div style={{ width: '6px', height: '6px', backgroundColor: brandBlue, flexShrink: 0, transform: 'rotate(45deg)' }}></div> <span style={{ fontWeight: 600, fontSize: 'clamp(0.95rem, 1vw, 1rem)', color: brandDark }}>{p}</span>
                    </li>
                  ))}
               </ul>
           </div>
        </motion.div>
      ))}
    </div>
  );
};

const FooterCTA = () => {
  return (
    <div style={{ padding: '8rem 5%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Glow */}
      <div style={{ position: 'absolute', bottom: '-20%', left: '50%', transform: 'translateX(-50%)', width: '60vw', height: '50vh', background: 'radial-gradient(ellipse at bottom, rgba(3, 112, 255, 0.4) 0%, rgba(1, 25, 54, 0) 70%)', zIndex: 0, pointerEvents: 'none' }} />

      {/* Razzo Orbitante Elegante */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 45, ease: "linear", repeat: Infinity }}
        style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0, zIndex: 0, pointerEvents: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
         <div style={{ transform: 'translateY(-45vh) rotate(90deg)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Rocket size={250} color="#0370FF" strokeWidth={0.6} style={{ transform: 'rotate(-45deg)', opacity: 0.15, filter: 'blur(2px)' }} />
            {/* Scia */}
            <div style={{ width: '15px', height: '80vh', background: 'linear-gradient(to bottom, rgba(3, 112, 255, 0.2), transparent)', filter: 'blur(15px)', marginTop: '-30px', borderRadius: '100px' }} />
         </div>
      </motion.div>

      {/* Contenuto in primo piano */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1.5rem', letterSpacing: '0.2em', color: '#0370FF', textTransform: 'uppercase' }}>
          // Inizia il tuo viaggio
        </p>
        
        <h2 style={{ fontSize: 'clamp(4rem, 6.5vw, 7.5rem)', lineHeight: 0.9, textTransform: 'uppercase', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '2rem', color: '#ffffff' }}>
           PRONTI AL<br/>
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
          <img src="/Logo/Horizontal.svg" alt="Linfa" style={{ height: 30, filter: 'brightness(10)' }} onError={(e) => { e.target.style.display = 'none' }} />
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
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const isMobile = useIsMobile();

  // By using a linear 1:1 map over 500vh, horizontal scroll feels perfettamente accoppiato alla rotella
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", "-400vw"]
  );

  return (
    <div style={{ position: 'relative' }}>
       {/* LO SLIDER ORIZZONTALE STICKY / VERTICAL FLOW ON MOBILE */}
       <div ref={containerRef} style={{ height: isMobile ? 'auto' : '500vh', position: 'relative' }}>
         <div style={{ position: isMobile ? 'relative' : 'sticky', top: 0, height: isMobile ? 'auto' : '100vh', width: '100vw', overflow: isMobile ? 'visible' : 'hidden', backgroundColor: 'var(--bg-dark)' }}>
        
        {/* 1. HERO SECTION (REMAINS STICKY AT LEFT 0) */}
        <section className="section theme-dark" style={{ position: isMobile ? 'relative' : 'absolute', left: 0, top: 0, height: isMobile ? 'auto' : '100vh', minHeight: '100vh', width: '100vw', zIndex: 0, overflow: 'hidden' }}>
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

          <div style={{ position: 'absolute', top: '50%', right: '5%', transform: 'translateY(-50%)', width: '100%', maxWidth: '700px', zIndex: 10, textAlign: 'left' }}>
            <motion.div
              className="liquid-glass-hero"
              style={{ padding: '3rem', width: '100%' }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1.5rem', letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase' }}>
                // Growth Partner Strategico
              </p>
              
              <h1 style={{ fontSize: 'clamp(4rem, 6.5vw, 7.5rem)', lineHeight: 0.9, textTransform: 'uppercase', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '2rem', color: '#ffffff' }}>
                 DA ZERO<br/>
                 ALLA VERA<br/>
                 <span style={{ color: 'transparent', WebkitTextStroke: '2px rgba(255,255,255,0.9)' }}>TRACTION.</span>
              </h1>

              <p style={{ fontSize: 'clamp(1.1rem, 1.2vw, 1.3rem)', maxWidth: '550px', marginBottom: '3rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                Acceleriamo la tua crescita integrando ingegneria avanzata e strategie di mercato. Convertiamo idee complesse in prodotti profittevoli.
              </p>
              <button className="btn" style={{ display: 'inline-flex', padding: '1rem 2rem', fontSize: '1.1rem' }}>Inizia Ora <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} /></button>
            </motion.div>
          </div>
        </section>

        {/* OVERLAYING CONTENT SLIDING HORIZONTALLY (OR VERTICALLY IF MOBILE) */}
        <motion.div style={{ x: isMobile ? "0vw" : x, display: 'flex', flexDirection: isMobile ? 'column' : 'row', position: isMobile ? 'relative' : 'absolute', left: isMobile ? 0 : '100vw', top: 0, height: isMobile ? 'auto' : '100vh', zIndex: 10, backgroundColor: 'var(--bg-dark)' }}>
          
          {/* 2. VISION SECTION */}
          <div style={{ width: '100vw', height: isMobile ? 'auto' : '100vh', minHeight: '100vh', flexShrink: 0, overflowY: isMobile ? 'visible' : 'auto', overflowX: 'hidden', backgroundColor: 'var(--bg-light)' }}>
            <VisionSection scrollYProgress={scrollYProgress} />
          </div>

          {/* 3. SERVICES SECTION (THREE BOXES IN LIGHT THEME) */}
          <section className="section theme-light" style={{ width: '100vw', height: isMobile ? 'auto' : '100vh', minHeight: '100vh', flexShrink: 0, overflowY: isMobile ? 'visible' : 'hidden', overflowX: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 2% 0 2%', position: 'relative', backgroundColor: '#ffffff' }}>
             
             {/* HUGE WATERMARK BRAND MARK SOTTO I BOX */}
             <div style={{ position: 'absolute', top: '55%', left: '38%', transform: 'translate(-50%, -50%)', zIndex: 0, pointerEvents: 'none', opacity: 1, width: '45vw', display: 'flex', justifyContent: 'center' }}>
                <img src="/Logo/Brand Mark.svg" alt="Linfa Brand Mark bg" style={{ width: '100%', height: 'auto', opacity: 0.95 }} />
             </div>

             {/* Big colorful ambient glow to soften the background */}
             <div className="ambient-glow" style={{ position: 'absolute', width: '50vw', height: '50vw', background: 'radial-gradient(circle, #0370FF, #011936)', left: '38%', top: '55%', transform: 'translate(-50%, -50%)', opacity: 0.1, filter: 'blur(150px)', zIndex: 0 }}></div>
             
             <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1850px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '0 auto' }}>
                <div style={{ marginBottom: '2.5rem', paddingLeft: '0.5rem' }}>
                   <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#011936', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem', opacity: 0.6 }}>
                      // Le nostre competenze
                   </p>
                   <h2 style={{ fontSize: 'clamp(2.5rem, 3.5vw, 4.5rem)', color: '#011936', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                      La nostra <span style={{ color: '#011936' }}>specializzazione.</span>
                   </h2>
                </div>
                <ServicesThreeBoxes />
             </div>
          </section>

          {/* 4. PHASES SECTION */}
          {/* Aggiunto paddingTop "sicuro" per non intersecare mai la Navbar fissa */}
          <section className="section theme-light" style={{ width: '100vw', height: isMobile ? 'auto' : '100vh', minHeight: '100vh', flexShrink: 0, overflowY: isMobile ? 'visible' : 'auto', overflowX: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', paddingTop: isMobile ? '130px' : '100px', paddingBottom: isMobile ? '50px' : 0, backgroundColor: '#ffffff' }}>
            
            <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                <p className="text-accent" style={{ fontWeight: 600, marginBottom: '0.5rem' }}>// IL NOSTRO PROCESSO</p>
                <h2 style={{ color: '#011936' }}>Le nostre <span className="text-accent">fasi strategiche</span></h2>
              </motion.div>
              <PhasesInteractive scrollYProgress={scrollYProgress} />
            </div>
          </section>

          {/* 5. OFFERING TEASER */}
          <section className="section theme-light" style={{ width: '100vw', height: isMobile ? 'auto' : '100vh', minHeight: '100vh', flexShrink: 0, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '5rem 0' : 0, backgroundColor: '#ffffff' }}>
             
             {/* Huge Typography Background */}
             <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 'clamp(10rem, 15vw, 25rem)', fontWeight: 900, color: '#012c70', opacity: 0.15, whiteSpace: 'nowrap', zIndex: 0, pointerEvents: 'none', letterSpacing: '-0.05em' }}>
                ECOSISTEMA
             </div>

             {/* Ambient Glow per dar vita alla rifrazione del vetro (Risolto per Mobile Area Diffusa) */}
             <div style={{ position: 'absolute', width: isMobile ? '150vw' : '60vw', height: isMobile ? '150vw' : '60vw', minWidth: '600px', minHeight: '600px', background: 'radial-gradient(circle, rgba(3,112,255,0.15) 0%, rgba(255,255,255,0) 65%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, pointerEvents: 'none' }} />

             {/* Main Card */}
             <div 
               style={{ 
                 position: 'relative', 
                 zIndex: 10, 
                 background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.70) 0%, rgba(255, 255, 255, 0.25) 100%)',
                 backdropFilter: 'blur(50px) saturate(150%)',
                 WebkitBackdropFilter: 'blur(50px) saturate(150%)',
                 WebkitTransform: 'translateZ(0)',
                 transform: 'translateZ(0)',
                 border: '1px solid rgba(255, 255, 255, 0.5)',
                 borderTop: '2px solid rgba(255, 255, 255, 0.95)',
                 borderLeft: '2px solid rgba(255, 255, 255, 0.95)',
                 boxShadow: '0 30px 60px rgba(1, 25, 54, 0.12), inset 0 0 30px rgba(255,255,255,1)',
                 borderRadius: '40px',
                 padding: '5rem 4rem',
                 textAlign: 'center',
                 maxWidth: '900px',
                 width: '90%'
               }}
             >
                <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', color: '#011936', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                   Un intero ecosistema<br/>al tuo servizio.
                </h2>
                
                <p style={{ fontSize: 'clamp(1.1rem, 1.2vw, 1.3rem)', color: '#475569', marginBottom: '3rem', maxWidth: '650px', margin: '0 auto 3.5rem auto', lineHeight: 1.6, fontWeight: 500 }}>
                   Ingegneria hardware/software avanzata, performance marketing scientifico e venture building in un'unica offering strutturata per dominare il mercato digitale.
                </p>
                
                <Link to="/offering" className="btn" style={{ display: 'inline-flex', alignItems: 'center', padding: '1.25rem 3rem', fontSize: '1.15rem' }}>
                   Esplora la Nostra Offering <ArrowRight size={22} style={{ marginLeft: '0.75rem' }} />
                </Link>
             </div>
          </section>

        </motion.div>
      </div>
      </div>

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
      <section className="section theme-dark" style={{ minHeight: '100vh', paddingTop: '150px', position: 'relative', overflow: 'hidden' }}>
        <div className="ambient-glow" style={{ width: '80vw', height: '80vw', background: 'radial-gradient(circle, rgba(219,39,119,0.3), rgba(99,102,241,0.3))', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.15 }}></div>
        <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 1, padding: '2rem 5%' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
             <p className="text-gradient" style={{ fontWeight: 600, marginBottom: '1rem', fontSize: '1.2rem', letterSpacing: '0.1em' }}>// LA NOSTRA OFFERING</p>
             <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>Trasformare la tua idea in <span className="text-gradient">realtà</span></h2>
             <p style={{ fontSize: '1.4rem', color: 'var(--text-muted-dark)', maxWidth: '800px', margin: '0 auto' }}>Tecnologie avanzate, marketing strategico e consulenza business per dominare il mercato digitale.</p>
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
    const lenis = new Lenis();
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
      <div className="noise-overlay" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offering" element={<OfferingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
