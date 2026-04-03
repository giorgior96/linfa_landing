import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FooterCTA } from './App';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}

const projects = [
  {
    title: "GreenCart",
    desc: "L'Intelligenza Artificiale applicata all'efficienza della GDO. Una piattaforma SaaS unificata che abilita un e-commerce alimentare consapevole, premiando chi salva i prodotti in ottica zero-waste attraverso un wallet digitale perfettamente integrato.",
    tags: ["E-Commerce AI", "App Mobile", "SaaS"],
    url: "https://greencart.ai",
    brandColor: "#0d9488", // Teal
    imageWeb: "/portfolio/greencart_desktop.png",
    imageMobile: "/portfolio/greencart_mobile.png",
    isDualLayout: true
  },
  {
    title: "Batoo",
    desc: "Il marketplace definitivo e olistico per il mercato nautico europeo. Batoo centralizza mediatori, concessionari e compratori in un unico ecosistema end-to-end, fungendo da vero e proprio salone nautico digitale permanente ed immersivo.",
    tags: ["Marketplace", "Nautica", "Web App"],
    url: "https://batoo.it",
    brandColor: "#0370FF", // Blue
    image: "/portfolio/batoo.png"
  },
  {
    title: "Circlo",
    desc: "L'app mobile cross-platform che converte le azioni virtuose in un sistema di reward economici reali. Un'architettura ad elevate prestazioni per la gestione sicura del portafoglio degli utenti e la tracciabilità live nel mondo del retail ecosostenibile.",
    tags: ["Sostenibilità", "App Mobile", "Piattaforma"],
    url: "https://www.circloapp.eu/",
    brandColor: "#eab308", // Yellow
    imageWeb: "/portfolio/circlo_desktop.png",
    imageMobile: "/portfolio/circlo_mobile.png",
    isDualLayout: true
  },
  {
    title: "Maurizio Lupi",
    desc: "La piattaforma di comunicazione politica ad alte prestazioni basata su infrastrutture cloud ultra rapide. Un hub di identità digitale concepito per gestire enormi picchi di traffico mantenendo una navigazione informativa elegante e fluida.",
    tags: ["Digital Identity", "Web Platform", "Politica"],
    url: "https://mauriziolupi.it",
    brandColor: "#be123c", // Rose
    image: "/portfolio/lupi.png"
  },
  {
    title: "Noi Moderati",
    desc: "L'ecosistema ufficiale web del movimento politico. Il sistema unisce backend CMS custom avanzato e gestione documentale multi-tier in una veste solida e accademica, pensata per comunicare autorevolezza e coinvolgere direttamente il cittadino.",
    tags: ["Web Platform", "Politica", "CMS Custom"],
    url: "https://noimoderati.it",
    brandColor: "#1e40af", // Blue
    image: "/portfolio/noimoderati.png"
  },
  {
    title: "Navisnet",
    desc: "Il sistema gestionale B2B per professionisti del mare. Navisnet è il software su misura progettato per automatizzare le reti di concessionari nautici, semplificando incredibilmente l'inventario, la flotta e lo scambio barche tra broker a livello Europeo.",
    tags: ["B2B SaaS", "Nautica", "Gestione Concessionari"],
    url: "#",
    brandColor: "#0284c7", // Light Blue
    image: "/portfolio/navisnet.png"
  }
];

const PortfolioCard = ({ project, index }) => {
  const isMobile = useIsMobile();
  
  // Deterministic "random" positions for the blobs based on the project index
  const blob1Pos = [
    { top: '-10%', right: '-10%' },
    { top: '20%', left: '-15%' },
    { bottom: '-15%', right: '5%' },
    { top: '-5%', left: '10%' },
    { bottom: '10%', left: '-10%' },
    { top: '15%', right: '15%' }
  ][index % 6];
  
  const blob2Pos = [
    { bottom: '-20%', left: '-10%' },
    { top: '-5%', right: '15%' },
    { top: '15%', left: '5%' },
    { bottom: '-5%', right: '-15%' },
    { top: '40%', right: '-10%' },
    { bottom: '-10%', left: '25%' }
  ][index % 6];
  
  const blob3Pos = [
    { top: '40%', left: '30%' },
    { bottom: '20%', right: '25%' },
    { top: '10%', left: '40%' },
    { bottom: '50%', left: '10%' },
    { top: '60%', right: '30%' },
    { top: '20%', right: '40%' }
  ][index % 6];

  return (
    <div style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: isMobile ? '6rem' : '10rem',
        paddingBottom: isMobile ? '6rem' : '10rem',
        borderTop: index !== 0 ? '2px solid #e2e8f0' : 'none',
        overflow: 'hidden'
    }}>
      {/* Dynamic Dark Blue Gradients Background */}
      <div style={{ position: 'absolute', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(1, 25, 54, 0.1) 0%, transparent 70%)', zIndex: 1, pointerEvents: 'none', ...blob1Pos }} />
      <div style={{ position: 'absolute', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(3, 112, 255, 0.08) 0%, transparent 70%)', zIndex: 1, pointerEvents: 'none', ...blob2Pos }} />
      <div style={{ position: 'absolute', width: '40vw', height: '40vw', background: `radial-gradient(circle, ${project.brandColor}1A 0%, transparent 60%)`, zIndex: 1, pointerEvents: 'none', ...blob3Pos }} />


      {/* Content Wrapper */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1400px', display: 'flex', flexDirection: 'column', padding: '0 5%' }}>
        
        {/* Header row */}
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', marginBottom: isMobile ? '2rem' : '3rem', gap: '1.5rem' }}>
           <div style={{ maxWidth: '800px' }}>
              <h2 style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)', fontWeight: 900, color: '#011936', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '1rem' }}>
                {project.title}
              </h2>
              <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '1.5rem', lineHeight: 1.5, fontWeight: 500 }}>
                {project.desc}
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                 {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', fontWeight: 600, color: '#475569', backgroundColor: '#f8fafc', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                       {tag}
                    </span>
                 ))}
              </div>
           </div>
           <div style={{ flexShrink: 0 }}>
              <a href={project.url} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#011936', color: '#ffffff', padding: '1rem 2rem', borderRadius: '100px', fontWeight: 700, textDecoration: 'none', fontSize: '1rem', transition: 'all 0.3s' }}>
                 Live Project <ArrowUpRight size={20} />
              </a>
           </div>
        </div>
      </div>
      {/* End Content Wrapper */}

      {/* Constrained Image Presentation Area with Hover Zoom */}
      <div style={{ width: '100%', position: 'relative', display: 'flex', gap: isMobile ? '1rem' : '0', justifyContent: 'center', backgroundColor: 'transparent', padding: isMobile ? '0 5%' : '0 5%', marginTop: '2rem' }}>
         
         {project.isDualLayout ? (
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '2rem', width: '100%', maxWidth: '1400px' }}>
               {/* Desktop Presentation */}
               <div style={{ flex: isMobile ? 'none' : '0 0 75%', width: '100%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                  <motion.img 
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    src={project.imageWeb} 
                    alt={`${project.title} Web mockup`} 
                    style={{ width: '100%', height: 'auto', display: 'block' }} 
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
               </div>
               {/* Mobile Presentation */}
               <div style={{ flex: isMobile ? 'none' : '0 0 22%', width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: '100%', maxWidth: isMobile ? '280px' : '400px', borderRadius: isMobile ? '24px' : '36px', overflow: 'hidden', border: isMobile ? '8px solid #0f172a' : '12px solid #0f172a', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
                     <motion.img 
                       whileHover={{ scale: 1.05 }}
                       transition={{ duration: 0.6, ease: "easeOut" }}
                       src={project.imageMobile} 
                       alt={`${project.title} Mobile mockup`} 
                       style={{ width: '100%', height: 'auto', display: 'block' }} 
                       onError={(e) => { e.target.style.display = 'none'; }}
                     />
                  </div>
               </div>
            </div>
         ) : (
            <div style={{ width: '100%', maxWidth: '1400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
               <motion.img 
                 whileHover={{ scale: 1.03 }}
                 transition={{ duration: 0.6, ease: "easeOut" }}
                 src={project.image} 
                 alt={`${project.title} mockup`}
                 style={{ width: '100%', height: 'auto', display: 'block' }}
                 onError={(e) => {
                   e.target.style.display = 'none';
                 }}
               />
            </div>
         )}
      </div>

    </div>
  );
};

const Portfolio = () => {
  const isMobile = useIsMobile();

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* Intro Header */}
      <div style={{ minHeight: '60vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 50, backgroundColor: '#ffffff', paddingTop: '150px', paddingBottom: '3rem' }}>
        <p style={{ color: '#0370FF', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>// I Nostri Lavori</p>
        <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 8rem)', color: '#011936', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, textAlign: 'center', maxWidth: '1200px' }}>
           Digital <span style={{ color: 'rgba(1, 25, 54, 0.2)' }}>Eccellenza.</span>
        </h1>
        <p style={{ color: '#475569', marginTop: '2rem', fontSize: '1.2rem', maxWidth: '600px', textAlign: 'center', lineHeight: 1.6, padding: '0 20px' }}>
           Esplora i prodotti tecnologici che abbiamo plasmato per le aziende più ambiziose.
        </p>
      </div>

      {/* Normal Layout Container */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
         {projects.map((project, index) => (
           <PortfolioCard 
             key={index} 
             project={project} 
             index={index} 
           />
         ))}
      </div>

      {/* Footer Buffer */}
      <div style={{ position: 'relative', zIndex: 10, backgroundColor: '#011936', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <FooterCTA />
      </div>

    </div>
  );
};

export default Portfolio;
