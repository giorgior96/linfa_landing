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
  const isMobile = useIsMobile();
  const text = "Non ci limitiamo a scrivere codice. Sviluppiamo le fondamenta tecnologiche del tuo business. Dall'idea iniziale al successo globale, siamo il partner affidabile per la tua crescita.";
  const words = text.split(" ");
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 50%"] });

  return (
    <section ref={ref} className="section theme-light" style={{ minHeight: isMobile ? '70vh' : '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '3rem 0' : '8rem 0' }}>
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
      title: "Strategy & Architettura",
      desc: "Analizziamo a fondo i requisiti e l'infrastruttura tecnologica. Validiamo il modello di business per minimizzare il rischio d'impresa e assicurare fondamenta solide per lo sviluppo successivo."
    },
    {
      title: "Sviluppo High-Performance",
      desc: "Codice pulito e ottimizzato nativamente per la scalabilità. Sviluppiamo ecosistemi cloud integrando i più moderni framework e strumenti di Intelligenza Artificiale per dominare qualsiasi complessità."
    },
    {
      title: "Go-to-Market & Trazione",
      desc: "Strutturiamo l'acquisizione utenti con un approccio altamente data-driven. Implementiamo pipeline ottimizzate per il ROI al fine di incrementare il valore effettivo dell'innovazione lanciata sul mercato."
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
  const tabs = ['Tutti', 'Tech', 'Marketing'];

  const offeringsData = {
    Tech: [
      {
        title: "Web App & App Native",
        subtitle: "Sviluppo di MVP scalabili con architetture moderne e interfacce user-centric.",
        features: ["Sviluppo Agile & Rilasci Rapidi", "UI/UX Ottimizzata per Conversione", "Stack Tecnologico Moderno", "Architettura Cloud-Native"],
        icon: <MonitorSmartphone size={32} />
      },
      {
        title: "Intelligenza Artificiale",
        subtitle: "Integrazione AI strategica per innovare i processi e consolidare il vantaggio competitivo.",
        features: ["Machine Learning & Deep Learning", "NLP & Analisi Predittiva", "Computer Vision", "Automazione Intelligente"],
        icon: <Brain size={32} />
      },
      {
        title: "AI Training & Formazione",
        subtitle: "Trasferimento del know-how per ottimizzare processi, generare contenuti multimediali (es. video) e automatizzare task aziendali.",
        features: ["Utilizzo Pratico degli LLM", "Generazione Video e Asset", "Automazione Task Ripetitivi", "Ottimizzazione Processi"],
        icon: <Zap size={32} />
      }
    ],
    Marketing: [
      {
        title: "SEO",
        subtitle: "Strategie di crescita organica per un posizionamento duraturo nei motori di ricerca.",
        features: ["Keyword Research Avanzata", "Technical SEO", "Content Strategy", "Link Building Premium"],
        icon: <Search size={32} />
      },
      {
        title: "SEM",
        subtitle: "Campagne data-driven orientate alla scalabilità e all'acquisizione efficiente nel tempo.",
        features: ["Google Ads Strategy", "Meta Ads Optimization", "A/B Testing", "Ottimizzazione Conversioni"],
        icon: <Target size={32} />
      },
      {
        title: "GEO & AI",
        subtitle: "Ottimizzazione avanzata per i nuovi motori di ricerca conversazionali e piattaforme AI.",
        features: ["Ottimizzazione ricerca locale", "Miglioramento E-E-A-T", "Integrazione Schema geolocalizzato", "Ottimizzazione per LLM"],
        icon: <MapPin size={32} />
      },
      {
        title: "Social Media",
        subtitle: "Posizionamento multicanale mirato alla lead generation e alla crescita della community.",
        features: ["Content Strategy", "Paid Social Ads", "Community Growth", "Influencer Campaigns"],
        icon: <Share2 size={32} />
      }
    ]
  };

  const categoryColors = {
    Tutti: '1, 25, 54',        // Navy Linfa
    Tech: '3, 112, 255',       // Blue Linfa
    Marketing: '139, 92, 246' // Indigo
  };

  const currentItems = activeTab === 'Tutti' 
    ? [
        ...offeringsData.Tech.map(i => ({...i, category: 'Tech'})), 
        ...offeringsData.Marketing.map(i => ({...i, category: 'Marketing'}))
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

      <div style={{ minHeight: '800px', position: 'relative' }}>
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
        <a href="/#contact" onClick={(e) => {
          if (location.pathname === '/') {
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }} className="btn" style={{ padding: isMobile ? '0.5rem 1.2rem' : '0.75rem 1.75rem', fontSize: isMobile ? '0.85rem' : '1rem', borderRadius: '100px', textDecoration: 'none' }}>
          Inizia {!isMobile && 'Ora'} {!isMobile && <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />}
        </a>
      </div>
    </nav>
  );
};

const ServicesThreeBoxes = () => {
  const isMobile = useIsMobile();

  const services = [
    {
      num: "01",
      title: "Sviluppo Tecnologico",
      image: "/services/service_sviluppo.webp",
      subtitle: "Ingegneria Software",
      desc: "Realizziamo piattaforme complesse, ecosistemi cloud e web application di ultima generazione. Codice modulare e orientato alle prestazioni pure per trasformare la complessità tecnica in vantaggi reali."
    },
    {
      num: "02",
      title: "Integrazione AI",
      image: "/services/service_ai_training.webp",
      subtitle: "Automazione & LLM",
      desc: "Portiamo l'Intelligenza Artificiale nei processi operativi. Sviluppiamo e integriamo solide soluzioni generative su misura pensate per ridurre i costi, automatizzare task ripetitivi e incrementare l'efficienza."
    },
    {
      num: "03",
      title: "Go-to-Market",
      image: "/services/service_go_to_market.webp",
      subtitle: "Lancio Strategico",
      desc: "Garantiamo il reale posizionamento sul mercato. Strutturiamo solide pipeline di acquisizione data-driven e ottimizziamo i canali di conversione con approccio analitico per generare la massima performance."
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', width: '100%', maxWidth: '1600px', gap: isMobile ? '1.5rem' : '2rem', margin: '0 auto', position: 'relative', zIndex: 10 }}>
       {services.map((svc, i) => (
         <motion.div
            key={i}
            initial="initial"
            whileHover="hover"
            style={{
              flex: isMobile ? 'none' : 1,
              width: '100%',
              height: isMobile ? '450px' : '650px',
              borderRadius: '32px',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(1, 25, 54, 0.05)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
            }}
         >
           {/* Background Image Container */}
           <motion.div 
             variants={{
               initial: { scale: 1 },
               hover: { scale: 1.05 }
             }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             style={{ position: 'absolute', inset: 0, zIndex: 0 }}
           >
             <img src={svc.image} alt={svc.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
           </motion.div>

           {/* Gradient Overlay for Text Readability - Bottom Heavy */}
           <motion.div 
             variants={{
               initial: { opacity: 0.9 },
               hover: { opacity: 1 }
             }}
             transition={{ duration: 0.4 }}
             style={{ 
               position: 'absolute', 
               inset: 0, 
               background: 'linear-gradient(to top, rgba(1, 25, 54, 1) 0%, rgba(1, 25, 54, 0.9) 40%, rgba(1, 25, 54, 0.3) 100%)',
               zIndex: 1 
             }} 
           />

           {/* Content Wrapper */}
           <div style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', flexDirection: 'column', padding: isMobile ? '2rem' : '3.5rem' }}>
             
             {/* Top Corner: Number & Subtitle Chip */}
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div style={{ 
                 backdropFilter: 'blur(20px)', 
                 WebkitBackdropFilter: 'blur(20px)',
                 background: 'rgba(255, 255, 255, 0.15)', 
                 border: '1px solid rgba(255, 255, 255, 0.25)', 
                 borderRadius: '100px', 
                 padding: '0.6rem 1.2rem', 
                 color: '#ffffff', 
                 display: 'flex', 
                 gap: '0.75rem',
                 alignItems: 'center'
               }}>
                 <span style={{ fontWeight: 900, color: '#3b82f6' }}>{svc.num}</span>
                 <span style={{ height: '4px', width: '4px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.6)' }} />
                 <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{svc.subtitle}</span>
               </div>
             </div>

             {/* Bottom Text */}
             <div style={{ marginTop: 'auto' }}>
               <motion.h3 
                 variants={{
                   initial: { y: 0, color: 'rgba(255,255,255, 0.95)' },
                   hover: { y: -5, color: '#ffffff' }
                 }}
                 transition={{ duration: 0.3 }}
                 style={{ fontSize: 'clamp(2rem, 3vw, 2.7rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '1.2rem', textShadow: '0 4px 20px rgba(0,0,0,0.6)' }}
               >
                 {svc.title}
               </motion.h3>
               <motion.p 
                 variants={{
                   initial: { opacity: 0.85, y: 0 },
                   hover: { opacity: 1, y: -5 }
                 }}
                 transition={{ duration: 0.3 }}
                 style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.95)', fontWeight: 500, margin: 0, paddingRight: '1rem', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
               >
                 {svc.desc}
               </motion.p>
             </div>

           </div>
         </motion.div>
       ))}
    </div>
  );
};

const featuredProjects = [
  {
    title: "GreenCart",
    desc: "L'app di cashback sostenibile. Scansiona scontrini, acquista responsabilmente e guadagna ricompense reali tracciate, tramite il nostro ecosistema wallet integrato.",
    image: "/portfolio/greencart_mobile.webp",
    brandColor: "13, 148, 136", // #0d9488 RGB
    textColor: "#ffffff",
    centeredImage: true
  },
  {
    title: "Batoo",
    desc: "Il salone nautico digitale di nuova generazione. Sfrutta avanzati modelli di IA per semplificare l'esplorazione del mercato e incrociare acquirenti e imbarcazioni in tempo reale.",
    image: "/portfolio/batoo.webp",
    brandColor: "3, 112, 255", // #0370FF RGB
    textColor: "#ffffff"
  },
  {
    title: "Circlo",
    desc: "L'alleato urbano della moda circolare. Un'app progettata per organizzare il tuo guardaroba e permetterti di prenotare e attivare servizi di upcycling nella tua città.",
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
          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, color: '#011936', margin: 0 }}>Prodotti <span style={{ color: 'rgba(1, 25, 54, 0.2)' }}>Digitali.</span></h2>
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
               
               {proj.centeredImage ? (
                 <div style={{ marginTop: 'auto', height: '55%', width: '100%', display: 'flex', justifyContent: 'center' }}>
                   <div style={{
                     width: '75%',
                     maxWidth: '380px',
                     height: '100%',
                     backgroundColor: '#111111',
                     borderTopLeftRadius: '40px',
                     borderTopRightRadius: '40px',
                     padding: '14px 14px 0 14px',
                     boxShadow: '0 -20px 40px rgba(0,0,0,0.25)',
                     position: 'relative'
                   }}>
                     {/* Dynamic Island Mockup */}
                     <div style={{ position: 'absolute', top: '22px', left: '50%', transform: 'translateX(-50%)', width: '30%', height: '26px', backgroundColor: '#111111', borderRadius: '15px', zIndex: 10 }} />
                     
                     <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', borderTopLeftRadius: '28px', borderTopRightRadius: '28px' }} />
                   </div>
                 </div>
               ) : (
                 <div style={{ marginTop: 'auto', height: '55%', width: '100%', marginLeft: '8%', position: 'relative', overflow: 'hidden', borderTopLeftRadius: '24px' }}>
                   <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top' }} />
                 </div>
               )}
             </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
           <Link to="/portfolio" className="btn" style={{ padding: '1.2rem 3.5rem', fontSize: '1.15rem', borderRadius: '100px' }}>
             Vedi Tutti i Nostri Lavori <ArrowRight size={22} style={{ marginLeft: '0.75rem' }} />
           </Link>
        </motion.div>
      </div>
    </section>
  );
};

export const FooterCTA = () => {
  const isMobile = useIsMobile();
  return (
    <div id="contact" style={{ backgroundColor: '#011936', width: '100%', display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

      {/* Background Glow */}
      <div style={{ position: 'absolute', bottom: '-20%', left: '50%', transform: 'translateX(-50%)', width: '60vw', height: '50vh', background: 'radial-gradient(ellipse at bottom, rgba(3, 112, 255, 0.4) 0%, rgba(1, 25, 54, 0) 70%)', zIndex: 0, pointerEvents: 'none' }} />

      {/* Razzo Orbitante Naturale */}
      {!isMobile && (
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
      )}

      {/* Area Contenuti Form */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '6rem 1rem 3rem 1rem' : '8rem 5% 4rem 5%', position: 'relative', zIndex: 2, width: '100%' }}>

        <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1.5rem', letterSpacing: '0.2em', color: '#38bdf8', textTransform: 'uppercase' }}>
          // Inizia la tua evoluzione
        </p>

        <h2 style={{ fontSize: 'clamp(2.5rem, 10vw, 7.5rem)', lineHeight: 0.9, textTransform: 'uppercase', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '2rem', color: '#ffffff' }}>
          PRONTI A<br />
          <span style={{ color: 'transparent', WebkitTextStroke: '2px rgba(255,255,255,0.9)' }}>SCALARE?</span>
        </h2>

        <p style={{ fontSize: 'clamp(1.1rem, 1.2vw, 1.3rem)', maxWidth: '550px', marginBottom: '4rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
          Dalla validazione tecnica al lancio strategico sul mercato. Affidati ad un partner capace di tradurre le tue prime idee industriali in ecosistemi completi ed efficienti.
        </p>

        {/* Struttura Premium Form */}
        <div className="premium-form-card" style={{ padding: isMobile ? '2.5rem 1.5rem' : '4rem', maxWidth: '1050px', width: '100%' }}>
          
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h3 style={{ color: '#ffffff', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>Parlaci della tua visione.</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', margin: 0 }}>Compila i campi qui sotto. Il team tecnico ti risponderà entro 24 ore con una prima valutazione.</p>
          </div>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} onSubmit={(e) => e.preventDefault()}>
            <div style={{ display: 'flex', gap: '2rem', flexDirection: isMobile ? 'column' : 'row' }}>
              
              {/* Colonna Sinistra: Anagrafica */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="premium-input-group">
                  <label>Nome Completo</label>
                  <input type="text" className="premium-input" placeholder="Es. Mario Rossi" />
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', flexDirection: isMobile ? 'column' : 'row' }}>
                  <div className="premium-input-group" style={{ flex: 1 }}>
                    <label>Azienda / Startup</label>
                    <input type="text" className="premium-input" placeholder="Es. Linfa Tech" />
                  </div>
                  <div className="premium-input-group" style={{ flex: 1 }}>
                    <label>Email Lavorativa</label>
                    <input type="email" className="premium-input" placeholder="mario@azienda.com" />
                  </div>
                </div>
              </div>

              {/* Colonna Destra: Messaggio */}
              <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column' }}>
                <div className="premium-input-group" style={{ height: '100%' }}>
                  <label>Dettagli del Progetto</label>
                  <textarea className="premium-input" style={{ flex: 1, minHeight: '140px' }} placeholder="Descrivi brevemente il tuo modello di business e le tue sfide attuali..."></textarea>
                </div>
              </div>
            </div>

            {/* Bottom Form Action */}
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2.5rem', marginTop: '0.5rem' }}>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.5)', margin: 0, textAlign: isMobile ? 'center' : 'left', maxWidth: '400px', lineHeight: 1.6 }}>
                Compilando questo modulo confermi di aver preso visione della nostra informativa e accetti di essere ricontattato.
              </p>
              <button type="submit" className="btn" style={{ padding: '1.2rem 3rem', justifyContent: 'center', fontSize: '1.15rem', borderRadius: '100px', gap: '0.75rem', fontWeight: 800, width: isMobile ? '100%' : 'auto' }}>
                Invia Richiesta <ArrowRight size={22} />
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* FOOTER BAR (Non absolute, spinta in fondo tramite normal flow) */}
      <div style={{ padding: isMobile ? '2rem 1.5rem' : '2rem 4rem', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', color: '#a1a1aa', zIndex: 2, gap: isMobile ? '1.5rem' : 0, width: '100%' }}>
        <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
          <img src="/Logo/Horizontal.svg" alt="Linfa" style={{ height: 30, filter: 'brightness(0) invert(1)' }} onError={(e) => { e.target.style.display = 'none' }} />
          <div style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>© {new Date().getFullYear()} Linfa Tech. P.IVA 14435250965</div>
        </div>
        <div style={{ display: 'flex', gap: isMobile ? '1rem' : '1.5rem', flexWrap: 'wrap', justifyContent: 'center', fontSize: isMobile ? '0.85rem' : '1rem' }}>
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
            <p style={{ fontWeight: 700, fontSize: isMobile ? '0.85rem' : '1rem', marginBottom: '1.5rem', letterSpacing: '0.2em', color: '#38bdf8', textTransform: 'uppercase' }}>
                // Partner Strategico & Tecnologico
            </p>

            <h1 style={{ fontSize: 'clamp(2.5rem, 10vw, 7.5rem)', lineHeight: 0.9, textTransform: 'uppercase', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '2rem', color: '#ffffff' }}>
              DA ZERO<br />
              ALLA VERA<br />
              <span style={{ color: 'transparent', WebkitTextStroke: '2px rgba(255,255,255,0.9)' }}>CRESCITA.</span>
            </h1>

            <p style={{ fontSize: 'clamp(1.1rem, 1.2vw, 1.3rem)', maxWidth: '550px', marginBottom: '3rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
              Guidiamo l'evoluzione ecosistemica del tuo business combinando un'avanzata ingegneria software assieme alle migliori dinamiche di go-to-market.
            </p>
            <a href="#contact" onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }} className="btn" style={{ display: 'inline-flex', padding: '1rem 2rem', fontSize: '1.1rem', textDecoration: 'none', cursor: 'pointer' }}>
              Inizia Ora <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
            </a>
          </motion.div>
        </div>

        {/* Lavori Marquee (Infinite Ticker) */}
        <div className="marquee-container">
          <div className="marquee-track">
            {[...Array(4)].map((_, i) => (
              <div style={{ display: 'flex' }} key={i}>
                <div className="marquee-item">GreenCart <span style={{ color: '#38bdf8' }}>•</span></div>
                <div className="marquee-item">Batoo <span style={{ color: '#38bdf8' }}>•</span></div>
                <div className="marquee-item">Circlo <span style={{ color: '#38bdf8' }}>•</span></div>
                <div className="marquee-item">Maurizio Lupi <span style={{ color: '#38bdf8' }}>•</span></div>
                <div className="marquee-item">Noi Moderati <span style={{ color: '#38bdf8' }}>•</span></div>
                <div className="marquee-item">Navisnet <span style={{ color: '#38bdf8' }}>•</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. VISION SECTION */}
      <div style={{ width: '100vw', minHeight: isMobile ? 'auto' : '100vh', backgroundColor: 'var(--bg-light)' }}>
        <VisionSection />
      </div>

      {/* 3. SERVICES SECTION */}
      <section className="section theme-light" style={{ width: '100vw', minHeight: isMobile ? 'auto' : '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '40px 5% 80px 5%' : '80px 2% 0 2%', position: 'relative', backgroundColor: '#ffffff' }}>
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
            Competenze centralizzate che spaziano dall'innovazione tecnologica all'efficienza sul mercato: la soluzione completa per supportare i tuoi piani industriali.
          </p>

          <Link to="/offering" className="btn" style={{ display: 'inline-flex', alignItems: 'center', padding: '1.25rem 3rem', fontSize: '1.15rem' }}>
            Scopri l'Offering <ArrowRight size={22} style={{ marginLeft: '0.75rem' }} />
          </Link>
        </div>
      </section>
      {/* 6. FOOTER CTA - SCROLL VERTICALE SOPRA LO SLIDER */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', flexDirection: 'column' }}>
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
