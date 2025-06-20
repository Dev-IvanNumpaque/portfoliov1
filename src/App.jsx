// Importaciones necesarias
// - React hooks para estado y efectos
// - GSAP para animaciones
// - Lenis para scroll suave
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import './App.css';

// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Componente principal de la aplicación
function App() {
  // Referencia al contenedor principal para animaciones GSAP
  const mainRef = useRef(null);

  // Estado para gestionar el tema (claro/oscuro)
  const [theme, setTheme] = useState(() => {
    // Recuperar tema guardado en localStorage o usar 'light' por defecto
    return localStorage.getItem('theme') || 'light';
  });
  
  // Efecto para aplicar el tema al documento y sincronizar con localStorage
  useEffect(() => {
    // Aplicar el atributo data-theme al documento
    document.documentElement.setAttribute('data-theme', theme);
    
    // Guardar preferencia en localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Efecto para cargar el tema inicial desde localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);
  
  // Función para cambiar el tema
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  // Configuración de Lenis para scroll suave
  // - duration: duración de la animación
  // - easing: función de suavizado
  // - orientation: dirección del scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true
    });

    // Integración de Lenis con GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Función para actualizar Lenis en cada frame
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);

    return () => {
      // Limpiar cuando el componente se desmonte
      lenis.destroy();
    };
  }, []);

  // Configuración de animaciones GSAP
  // - Animaciones de entrada para elementos
  // - Animaciones al hacer scroll
  // - Efectos de parallax y fade
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de entrada para el título
      gsap.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      // Animación para la sección de proyectos
      gsap.from('.project-card', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.projects-section',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });

      // Animación para la sección de habilidades
      gsap.from('.skill-item', {
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.skills-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }, mainRef);

    return () => ctx.revert(); // Limpiar animaciones
  }, []);

  return (
    <main ref={mainRef} className="portfolio-container">
      <button
        onClick={toggleTheme}
        className="theme-toggle"
        aria-label={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
      >
        <div className="toggle-track">
          <div className="toggle-thumb"></div>
        </div>
      </button>
      {/* Sección Hero */}
      <section id="home" className="hero-section">
        <h1 className="hero-title">Hola! Soy Ivan</h1>
        <p className="hero-subtitle">Me encanta construir cositas para la web, construir sueños es lo que quiero en mi vida.</p>
        <button className="cta-button">Trabajemos juntos</button>
      </section>

      {/* Sección Sobre Mí */}
      <section id="about" className="about-section">
        <h2>Sobre Mí</h2>
        <div className="about-content">
          <div className="about-text">
            <p>Soy un desarrollador apasionado por crear experiencias web interactivas y atractivas utilizando tecnologías modernas como React, GSAP y Lenis.</p>
          </div>
          <div className="about-skills">
            <h3>Mis Habilidades</h3>
            <div className="skills-section">
              <div className="skill-item">React</div>
              <div className="skill-item">GSAP</div>
              <div className="skill-item">JavaScript</div>
              <div className="skill-item">CSS</div>
              <div className="skill-item">HTML</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Proyectos */}
      <section id="projects" className="projects-section">
        <h2>Mis Proyectos</h2>
        <div className="projects-grid">
          <div className="project-card">
            <h3>Proyecto 1</h3>
            <p>Descripción del proyecto utilizando React y GSAP para animaciones fluidas.</p>
          </div>
          <div className="project-card">
            <h3>Proyecto 2</h3>
            <p>Aplicación web con scroll suave implementado con Lenis.</p>
          </div>
          <div className="project-card">
            <h3>Proyecto 3</h3>
            <p>Sitio web interactivo con animaciones avanzadas.</p>
          </div>
        </div>
      </section>

      {/* Sección Contacto */}
      <section id="contact" className="contact-section">
        <h2>Contacto</h2>
        <form className="contact-form">
          <input type="text" placeholder="Nombre" />
          <input type="email" placeholder="Email" />
          <textarea placeholder="Mensaje"></textarea>
          <button type="submit">Enviar</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Mi Portfolio. Todos los derechos reservados.</p>
      </footer>
    </main>
  )
}

export default App
