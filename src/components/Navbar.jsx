import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

const Navbar = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Efecto para animar el navbar cuando aparece
  useEffect(() => {
    gsap.from('.navbar', {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
    
    // Animar los enlaces cuando aparecen
    gsap.from('.nav-link', {
      opacity: 0,
      y: -20,
      stagger: 0.1,
      duration: 0.5,
      delay: 0.3,
      ease: 'power2.out'
    });
  }, []);
  
  // Efecto para animar el menú móvil cuando se abre/cierra
  useEffect(() => {
    if (isOpen) {
      gsap.to('.mobile-menu', {
        height: 'auto',
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to('.mobile-menu', {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  }, [isOpen]);
  
  return (
    <nav className="navbar">
      <div className="desktop-menu">
        <a href="#home" className="nav-link">Inicio</a>
        <a href="#about" className="nav-link">Sobre Mí</a>
        <a href="#projects" className="nav-link">Proyectos</a>
        <a href="#contact" className="nav-link">Contacto</a>
        
        <button 
          className="theme-toggle nav-theme-toggle" 
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
      </div>
      
      <div className="mobile-nav">
        <button 
          className={`hamburger ${isOpen ? 'active' : ''}`} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menú de navegación"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      
      <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
        <a href="#home" className="nav-link" onClick={() => setIsOpen(false)}>Inicio</a>
        <a href="#about" className="nav-link" onClick={() => setIsOpen(false)}>Sobre Mí</a>
        <a href="#projects" className="nav-link" onClick={() => setIsOpen(false)}>Proyectos</a>
        <a href="#contact" className="nav-link" onClick={() => setIsOpen(false)}>Contacto</a>
        
        <button 
          className="theme-toggle mobile-theme-toggle" 
          onClick={(e) => {
            e.stopPropagation();
            toggleTheme();
            setIsOpen(false);
          }} 
          aria-label={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
        >
          {theme === 'light' ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6a3 3 0 0 1 0-6zm0-7a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 17a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1zM5.636 4.222a1 1 0 0 1 0 1.414L4.93 6.344a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zm12.728 12.728a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zM3 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm17 0a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1zM4.222 18.364a1 1 0 0 1 1.414 0l.707.707a1 1 0 1 1-1.414 1.414l-.707-.707a1 1 0 0 1 0-1.414zm15.556-15.556a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0z" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;