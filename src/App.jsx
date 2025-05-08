import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import './App.css'

// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef(null);
  const [theme, setTheme] = useState(() => {
    // Recuperar tema guardado en localStorage o usar 'light' por defecto
    return localStorage.getItem('theme') || 'light';
  });
  
  // Efecto para aplicar el tema al documento
  useEffect(() => {
    // Aplicar el atributo data-theme al documento
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    
    // Guardar preferencia en localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // Función para cambiar el tema
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  // Inicializar Lenis para scroll suave
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

  // Configurar animaciones con GSAP
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
      {/* Botón de cambio de tema */}
      <button 
        className="theme-toggle" 
        onClick={toggleTheme} 
        aria-label={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
      >
        {theme === 'light' ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0-7a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 17a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1zM5.636 4.222a1 1 0 0 1 0 1.414L4.93 6.344a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zm12.728 12.728a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zM3 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm17 0a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1zM4.222 18.364a1 1 0 0 1 1.414 0l.707.707a1 1 0 1 1-1.414 1.414l-.707-.707a1 1 0 0 1 0-1.414zm15.556-15.556a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0z" />
          </svg>
        )}
      </button>
      {/* Sección Hero */}
      <section className="hero-section">
        <h1 className="hero-title">Mi Portfolio</h1>
        <p className="hero-subtitle">Desarrollador Frontend especializado en React</p>
        <button className="cta-button">Ver Proyectos</button>
      </section>

      {/* Sección Sobre Mí */}
      <section className="about-section">
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
      <section className="projects-section">
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
      <section className="contact-section">
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
        <p>&copy; 2023 Mi Portfolio. Todos los derechos reservados.</p>
      </footer>
    </main>
  )
}

export default App
