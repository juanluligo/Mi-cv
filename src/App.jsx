import { useState, useEffect, useRef } from 'react'
import './App.css'

// Componente Header/Menu
function Menu() {
  const [menuActivo, setMenuActivo] = useState(false)
  const menuRef = useRef(null)
  const iconRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && 
          iconRef.current && !iconRef.current.contains(e.target)) {
        setMenuActivo(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div className="menu-container">
      <div 
        className="menu-icon" 
        ref={iconRef}
        tabIndex="0"
        onClick={() => setMenuActivo(!menuActivo)}
      >
        <svg>
          <rect y="20" width="80" height="10" rx="5" fill="#d6ff6b"/>
          <rect x="45" width="50" height="10" rx="5" fill="#d6ff6b"/>
          <rect x="20" width="80" height="10" rx="5" fill="#d6ff6b"/>
        </svg>
      </div>
      <div 
        ref={menuRef}
        className={`menu-desplegable ${menuActivo ? 'activo' : ''}`}
      >
        <a href="#inicio" onClick={() => setMenuActivo(false)}>inicio</a>
        <a href="#me" onClick={() => setMenuActivo(false)}>me</a>
        <a href="#experiencia" onClick={() => setMenuActivo(false)}>Experiencia</a>
        <a href="#proyectos" onClick={() => setMenuActivo(false)}>Proyectos</a>
        <a href="#contacto" onClick={() => setMenuActivo(false)}>contacto</a>
      </div>
    </div>
  )
}

// Sección Inicio
function Inicio() {
  return (
    <section id="inicio">
      <div className="pantalla">
        <div className="columna-izquierda">
          <Menu />
        </div>
        
        <div className="foto-mia">
          <img src="/imganenmia.png" alt="Foto de Juan Luligo" />
        </div>
        
        <div className="columna-derecha">
          <div className="splash-grafiti">
            <h1>SOFTWARE ENGINEER</h1>
          </div>
          <div className="textos-derecha">
            <h2>soy un apasionado por el desarrollo de software, soluciones eficaces y precisas.</h2>
            <div className="parrafos-derecha">
              <p>Transformo ideas en soluciones de software funcionales, limpias y escalables que realmente resuelven problemas.</p>
              <p>Código con propósito: desarrollo sistemas eficientes y claros, pensados para ofrecer resultados reales y duraderos.</p>
            </div>
          </div>
        </div>
        
        {/* SVG decorativos */}
        <svg className="grafiti-doodle doodle-1" width="48" height="48" viewBox="0 0 48 48">
          <polyline points="4,44 12,36 20,44 28,36 36,44" fill="none" stroke="#d6ff6b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        <svg className="grafiti-doodle doodle-2" width="40" height="40" viewBox="0 0 40 40">
          <polyline points="0,30 10,20 20,30 30,20 40,30" fill="none" stroke="#4636d9" strokeWidth="4" strokeLinecap="round"/>
        </svg>

        <svg className="grafiti-doodle doodle-3" width="32" height="32" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="12" fill="none" stroke="#d6ff6b" strokeWidth="4" strokeDasharray="4 4"/>
        </svg>
      </div>
    </section>
  )
}

// Sección Me
function Me() {
  const downloadCV = () => {
    const link = document.createElement('a')
    link.href = '/Cv Juan Luligo.pdf'
    link.download = 'Juan_Luligo_CV.pdf'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="me">
      <div className="me">
        <div className="izquierdo me">
          <h1>Juan Luligo</h1>
          <div className="textos-izquierda">
            <p>Soy un apasionado desarrollador de software con experiencia en crear soluciones innovadoras y eficientes. 
              Me especializo en el desarrollo de aplicaciones web y móviles, utilizando tecnologías modernas para ofrecer experiencias de usuario excepcionales.</p>
            
            <p>Mi enfoque se centra en la calidad del código, la escalabilidad y la mantenibilidad, asegurando que cada proyecto no solo cumpla con los requisitos funcionales, 
              sino que también sea fácil de mantener y evolucionar a lo largo del tiempo.</p>
            
            <button className="cv-download-button" onClick={downloadCV}>
              <i className="fas fa-download"></i>
              Descargar CV
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// Componente TechCard
function TechCard({ icon, title, description, level, delay }) {
  const [animated, setAnimated] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => setAnimated(true), 500)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="tech-card" ref={cardRef} style={{ animationDelay: `${delay}s` }}>
      <div className="tech-icon">
        <i className={icon}></i>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="skill-level">
        <div 
          className="skill-bar" 
          style={{ width: animated ? `${level}%` : '0%' }}
        ></div>
      </div>
    </div>
  )
}

// Sección Experiencia
function Experiencia() {
  const tecnologias = [
    { icon: 'fab fa-js-square', title: 'JavaScript', description: 'Desarrollo dinámico y interactivo', level: 90 },
    { icon: 'fab fa-react', title: 'React', description: 'Interfaces de usuario modernas', level: 85 },
    { icon: 'fab fa-node-js', title: 'Node.js', description: 'Backend escalable y eficiente', level: 80 },
    { icon: 'fab fa-python', title: 'Python', description: 'Desarrollo versátil y potente', level: 75 },
    { icon: 'fab fa-html5', title: 'HTML5', description: 'Estructura web semántica', level: 95 },
    { icon: 'fab fa-css3-alt', title: 'CSS3', description: 'Diseño visual atractivo', level: 90 },
    { icon: 'fab fa-git-alt', title: 'Git', description: 'Control de versiones', level: 85 },
    { icon: 'fas fa-database', title: 'Databases', description: 'Gestión de datos eficiente', level: 80 },
    { icon: 'fab fa-java', title: 'Java', description: 'Gestión de Mobile apps', level: 80 },
  ]

  return (
    <section id="experiencia">
      <div className="experiencia-container">
        <h2>Como Desarrollador, me caracterizo por siempre aplicar mis conocimientos adquiridos</h2>
        
        <div className="tecnologias-grid">
          {tecnologias.map((tech, index) => (
            <TechCard 
              key={tech.title}
              icon={tech.icon}
              title={tech.title}
              description={tech.description}
              level={tech.level}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Componente ProjectCard
function ProjectCard({ title, description, technologies, link, image, delay }) {
  const [animated, setAnimated] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => setAnimated(true), 300)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div 
      className={`project-card ${animated ? 'animated' : ''}`} 
      ref={cardRef} 
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="project-image">
        <img src={image} alt={title} />
        <div className="project-overlay">
          <a href={link} target="_blank" rel="noopener noreferrer" className="project-link">
            <i className="fas fa-external-link-alt"></i>
            Ver Proyecto
          </a>
        </div>
      </div>
      <div className="project-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="project-tech">
          {technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// Sección Proyectos
function Proyectos() {
  const proyectos = [
    {
      title: 'VozSegura',
      description: 'Sistema de monitoreo y análisis de voz en tiempo real con inteligencia artificial. Detecta patrones de habla y proporciona retroalimentación instantánea.',
      technologies: ['React', 'FullStack', 'JavaScript', 'MySQL'],
      link: 'https://github.com/juanluligo/VozSegura',
      image: '/VozSegura.png'
    },
    {
      title: 'Tracking de Bugs',
      description: 'Aplicación web para gestión y seguimiento de errores en proyectos de software. Permite crear, asignar y resolver bugs de manera eficiente.',
      technologies: ['React', 'Node.js', 'Vercel', 'Database'],
      link: 'https://tracking-de-bugs.vercel.app/',
      image: '/bugs.png'
    },
    {
      title: 'MiniArcade',
      description: 'Colección interactiva de minijuegos clásicos creados con JavaScript vanilla. Experiencia nostálgica con diseño moderno y controles intuitivos.',
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'Canvas API'],
      link: 'https://mini-arcade-eta.vercel.app/',
      image: '/image.png'
    }
  ]

  return (
    <section id="proyectos">
      <div className="proyectos-container">
        <h2>Mis Proyectos Destacados</h2>
        <p className="proyectos-subtitle">Estos son algunos de los proyectos en los que he trabajado</p>
        
        <div className="proyectos-grid">
          {proyectos.map((proyecto, index) => (
            <ProjectCard 
              key={proyecto.title}
              title={proyecto.title}
              description={proyecto.description}
              technologies={proyecto.technologies}
              link={proyecto.link}
              image={proyecto.image}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Componente Formulario de Contacto
function ContactForm() {
  const [formData, setFormData] = useState({
    empresa: '',
    posicion: '',
    nombre: '',
    email: '',
    modalidad: '',
    ubicacion: '',
    mensaje: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.empresa.trim()) newErrors.empresa = 'Este campo es obligatorio'
    if (!formData.posicion.trim()) newErrors.posicion = 'Este campo es obligatorio'
    if (!formData.nombre.trim()) newErrors.nombre = 'Este campo es obligatorio'
    if (!formData.email.trim()) {
      newErrors.email = 'Este campo es obligatorio'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido'
    }
    if (!formData.mensaje.trim()) newErrors.mensaje = 'Este campo es obligatorio'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      setFormData({
        empresa: '', posicion: '', nombre: '', email: '',
        modalidad: '', ubicacion: '', mensaje: ''
      })
      setTimeout(() => setShowSuccess(false), 5000)
    }, 2000)
  }

  return (
    <>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="empresa">Empresa *</label>
            <input 
              type="text" 
              id="empresa" 
              name="empresa" 
              value={formData.empresa}
              onChange={handleChange}
              placeholder="Nombre de tu empresa"
              style={errors.empresa ? { borderColor: '#ff6b6b' } : {}}
            />
            {errors.empresa && <div className="field-error">{errors.empresa}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="posicion">Posición *</label>
            <input 
              type="text" 
              id="posicion" 
              name="posicion"
              value={formData.posicion}
              onChange={handleChange}
              placeholder="Título del puesto"
              style={errors.posicion ? { borderColor: '#ff6b6b' } : {}}
            />
            {errors.posicion && <div className="field-error">{errors.posicion}</div>}
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nombre">Tu nombre *</label>
            <input 
              type="text" 
              id="nombre" 
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Reclutador o hiring manager"
              style={errors.nombre ? { borderColor: '#ff6b6b' } : {}}
            />
            {errors.nombre && <div className="field-error">{errors.nombre}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email empresarial *</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu.email@empresa.com"
              style={errors.email ? { borderColor: '#ff6b6b' } : {}}
            />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="modalidad">Modalidad de trabajo</label>
          <select 
            id="modalidad" 
            name="modalidad"
            value={formData.modalidad}
            onChange={handleChange}
          >
            <option value="">Selecciona modalidad</option>
            <option value="remoto">100% Remoto</option>
            <option value="hibrido">Híbrido</option>
            <option value="presencial">Presencial</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="ubicacion">Ubicación (si aplica)</label>
          <input 
            type="text" 
            id="ubicacion" 
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            placeholder="Ciudad, país"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="mensaje">Mensaje *</label>
          <textarea 
            id="mensaje" 
            name="mensaje" 
            rows="4"
            value={formData.mensaje}
            onChange={handleChange}
            placeholder="Cuéntame sobre la oportunidad, responsabilidades, equipo de trabajo, stack tecnológico, etc."
            style={errors.mensaje ? { borderColor: '#ff6b6b' } : {}}
          ></textarea>
          {errors.mensaje && <div className="field-error">{errors.mensaje}</div>}
        </div>
        
        <button type="submit" className="cta-button submit" disabled={isSubmitting}>
          <i className={isSubmitting ? "fas fa-spinner fa-spin" : "fas fa-paper-plane"}></i>
          {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
        </button>
        
        <p className="form-disclaimer">
          <i className="fas fa-shield-alt"></i>
          Información confidencial. Solo responderé a oportunidades laborales serias.
        </p>
      </form>

      {showSuccess && (
        <div className="success-modal" onClick={(e) => e.target.className === 'success-modal' && setShowSuccess(false)}>
          <div className="modal-content">
            <div style={{ color: '#4636d9', fontSize: '60px', marginBottom: '20px' }}>
              <i className="fas fa-check-circle"></i>
            </div>
            <h3>¡Mensaje enviado con éxito!</h3>
            <p>Gracias por tu interés. Te responderé en menos de 24 horas con una propuesta personalizada.</p>
            <button onClick={() => setShowSuccess(false)}>¡Perfecto!</button>
          </div>
        </div>
      )}
    </>
  )
}

// Sección Contacto
function Contacto() {
  const downloadCV = () => {
    const link = document.createElement('a')
    link.href = '/Cv Juan Luligo.pdf'
    link.download = 'Juan_Luligo_CV.pdf'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="contacto">
      <div className="contacto-container">
        {/* Header profesional */}
        <div className="contacto-header">
          <h2>¿Buscas un desarrollador comprometido?</h2>
          <p className="contacto-subtitle">Estoy disponible para nuevas oportunidades laborales y listo para contribuir al éxito de tu equipo</p>
          
          {/* Indicadores profesionales */}
          <div className="credibilidad-indicators">
            <div className="indicator">
              <i className="fas fa-briefcase"></i>
              <span>Disponible para <strong>trabajo remoto</strong></span>
            </div>
            <div className="indicator">
              <i className="fas fa-clock"></i>
              <span>Incorporación <strong>inmediata</strong></span>
            </div>
            <div className="indicator">
              <i className="fas fa-handshake"></i>
              <span><strong>Entrevista disponible</strong></span>
            </div>
          </div>
        </div>

        <div className="contacto-content">
          {/* Información profesional y CV */}
          <div className="formulario-section">
            <div className="form-header">
              <h3>Conectemos Profesionalmente</h3>
              <p>¿Tienes una oportunidad que podría interesarme? Me encantaría conocer más.</p>
            </div>
            
            {/* Botones de acción principales */}
            <div className="cta-buttons">
              <a 
                href="mailto:juan.luligo@uniautnoma.edu.co?subject=Oportunidad Laboral - [Nombre de la Empresa]&body=Hola Juan,%0D%0A%0D%0ATenemos una oportunidad que podría interesarte..." 
                className="cta-button primary"
              >
                <i className="fas fa-envelope"></i>
                Contactar por Email
              </a>
              
              <a href="#" className="cta-button secondary" onClick={(e) => { e.preventDefault(); downloadCV(); }}>
                <i className="fas fa-download"></i>
                Descargar CV
              </a>
              
              <a href="https://www.linkedin.com/in/juan-camilo-luligo-4438a4338" target="_blank" rel="noopener noreferrer" className="cta-button linkedin">
                <i className="fab fa-linkedin"></i>
                Ver LinkedIn
              </a>
            </div>

            {/* Formulario de contacto empresarial */}
            <div className="separator">
              <span>O envíame un mensaje directo</span>
            </div>
            
            <ContactForm />
          </div>

          {/* Información profesional */}
          <div className="info-profesional">
            {/* Disponibilidad */}
            <div className="disponibilidad-card">
              <div className="status-indicator available"></div>
              <h4>Disponible para nuevas oportunidades</h4>
              <p>Actualmente evaluando propuestas laborales interesantes</p>
              <div className="disponibilidad-info">
                <div className="info-item">
                  <i className="fas fa-calendar-check"></i>
                  <span>Incorporación: <strong>Inmediata</strong></span>
                </div>
                <div className="info-item">
                  <i className="fas fa-globe"></i>
                  <span>Modalidad: <strong>Remoto/Híbrido preferido</strong></span>
                </div>
                <div className="info-item">
                  <i className="fas fa-clock"></i>
                  <span>Horario: <strong>Flexible, adaptable</strong></span>
                </div>
              </div>
            </div>

            {/* Enlaces profesionales */}
            <div className="enlaces-profesionales">
              <h4>Perfil Profesional</h4>
              <div className="enlaces-grid">
                <a href="https://www.linkedin.com/in/juan-camilo-luligo-4438a4338" target="_blank" rel="noopener noreferrer" className="enlace-prof">
                  <i className="fab fa-linkedin"></i>
                  <div>
                    <strong>LinkedIn</strong>
                    <span>Perfil profesional completo</span>
                  </div>
                </a>
                <a href="https://github.com/juanluligo" target="_blank" rel="noopener noreferrer" className="enlace-prof">
                  <i className="fab fa-github"></i>
                  <div>
                    <strong>GitHub</strong>
                    <span>Repositorios y proyectos</span>
                  </div>
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); downloadCV(); }} className="enlace-prof">
                  <i className="fas fa-file-pdf"></i>
                  <div>
                    <strong>CV Actualizado</strong>
                    <span>Descargar PDF</span>
                  </div>
                </a>
                <a href="tel:+573207904948" className="enlace-prof">
                  <i className="fas fa-phone"></i>
                  <div>
                    <strong>+57 3207904948</strong>
                    <span>Disponible para llamadas</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Lo que ofrezco */}
            <div className="valor-profesional">
              <h4>Lo que aporto al equipo</h4>
              <div className="valores-list">
                <div className="valor-item">
                  <i className="fas fa-rocket"></i>
                  <div>
                    <strong>Proactividad</strong>
                    <span>Tomo iniciativa y propongo mejoras</span>
                  </div>
                </div>
                <div className="valor-item">
                  <i className="fas fa-users"></i>
                  <div>
                    <strong>Colaboración</strong>
                    <span>Trabajo excelente en equipo</span>
                  </div>
                </div>
                <div className="valor-item">
                  <i className="fas fa-lightbulb"></i>
                  <div>
                    <strong>Aprendizaje continuo</strong>
                    <span>Siempre actualizado con nuevas tecnologías</span>
                  </div>
                </div>
                <div className="valor-item">
                  <i className="fas fa-bullseye"></i>
                  <div>
                    <strong>Orientado a resultados</strong>
                    <span>Enfoque en entregar valor real</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonios laborales */}
            <div className="testimonios-laborales">
              <h4>Referencias profesionales</h4>
              <div className="testimonio-laboral">
                <i className="fas fa-quote-left"></i>
                <p>"Juan es un desarrollador excepcional. Su capacidad para resolver problemas complejos y su actitud colaborativa lo hacen invaluable para cualquier equipo."</p>
                <div className="referencia-author">
                  <span>VozSegura</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA final para empleadores */}
        <div className="cta-final">
          <h3>¿Tu empresa necesita un desarrollador como yo?</h3>
          <p>Hablemos sobre cómo puedo contribuir al éxito de tu equipo</p>
          <button className="cta-urgente" onClick={() => document.getElementById('empresa').focus()}>
            <i className="fas fa-handshake"></i>
            ¡Iniciemos la conversación!
          </button>
        </div>
      </div>
    </section>
  )
}

// App Principal
function App() {
  return (
    <main>
      <Inicio />
      <Me />
      <Experiencia />
      <Proyectos />
      <Contacto />
    </main>
  )
}

export default App
