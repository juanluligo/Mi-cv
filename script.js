const menuIcon = document.getElementById('menuIcon');
        const menuDesplegable = document.getElementById('menuDesplegable');
        
        menuIcon.addEventListener('click',() => {
            menuDesplegable.classList.toggle('activo');
        });

        document.addEventListener('click', (e) => {
            if (!menuIcon.contains(e.target) && !menuDesplegable.contains(e.target)) {
                menuDesplegable.classList.remove('activo');
            }
        });

        // Animación de barras de habilidades
        const animateSkillBars = () => {
            const skillBars = document.querySelectorAll('.skill-bar');
            
            skillBars.forEach(bar => {
                const level = bar.getAttribute('data-level');
                bar.style.width = level + '%';
            });
        };

        // Observador de intersección para animar cuando las tarjetas aparezcan
        const observeSkillBars = () => {
            const skillSection = document.getElementById('experiencia');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(animateSkillBars, 500);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.3
            });

            if (skillSection) {
                observer.observe(skillSection);
            }
        };

        // Inicializar cuando el DOM esté listo
        document.addEventListener('DOMContentLoaded', () => {
            observeSkillBars();
            initContactForm();
            addNotificationStyles();
        });

        // Función para descargar CV
        const downloadCV = () => {
            // Aquí puedes poner la ruta real a tu CV
            const cvUrl = 'path/to/your/cv.pdf'; // Cambia esto por la ruta real
            
            // Crear enlace temporal para descarga
            const link = document.createElement('a');
            link.href = cvUrl;
            link.download = 'Juan_Luligo_CV.pdf';
            
            // Para navegadores que no soportan download attribute
            link.target = '_blank';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Mostrar mensaje de confirmación
            showNotification('CV descargado exitosamente', 'success');
        };

        // Función para mostrar notificaciones
        const showNotification = (message, type = 'info') => {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? '#28a745' : '#4636d9'};
                color: white;
                padding: 15px 25px;
                border-radius: 8px;
                font-family: 'Segoe UI', Arial, sans-serif;
                font-weight: 600;
                z-index: 10001;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                animation: slideInRight 0.3s ease;
            `;
            
            notification.textContent = message;
            document.body.appendChild(notification);
            
            // Remover notificación después de 3 segundos
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }, 3000);
        };

        // Agregar estilos de animación para notificaciones
        const addNotificationStyles = () => {
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        };

        // Hacer funciones globalmente accesibles
        window.downloadCV = downloadCV;

        // Funcionalidad del formulario de contacto
        const initContactForm = () => {
            const form = document.getElementById('contactForm');
            if (!form) return;

            form.addEventListener('submit', handleFormSubmit);
            
            // Validación en tiempo real
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', validateField);
                input.addEventListener('input', removeError);
            });
        };

        const handleFormSubmit = (e) => {
            e.preventDefault();
            
            const form = e.target;
            const formData = new FormData(form);
            
            // Validar formulario
            if (!validateForm(form)) {
                return;
            }
            
            // Simular envío (aquí conectarías con tu backend)
            const submitButton = form.querySelector('.cta-button');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitButton.disabled = true;
            
            // Simular procesamiento
            setTimeout(() => {
                // Mostrar mensaje de éxito
                showSuccessMessage();
                form.reset();
                
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        };

        const validateForm = (form) => {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    showFieldError(field, 'Este campo es obligatorio');
                    isValid = false;
                }
            });
            
            // Validar email
            const email = form.querySelector('#email');
            if (email.value && !isValidEmail(email.value)) {
                showFieldError(email, 'Por favor ingresa un email válido');
                isValid = false;
            }
            
            return isValid;
        };

        const validateField = (e) => {
            const field = e.target;
            
            if (field.hasAttribute('required') && !field.value.trim()) {
                showFieldError(field, 'Este campo es obligatorio');
                return false;
            }
            
            if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
                showFieldError(field, 'Por favor ingresa un email válido');
                return false;
            }
            
            removeError(e);
            return true;
        };

        const showFieldError = (field, message) => {
            field.style.borderColor = '#ff6b6b';
            
            // Remover error anterior si existe
            const existingError = field.parentNode.querySelector('.field-error');
            if (existingError) {
                existingError.remove();
            }
            
            // Agregar nuevo mensaje de error
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.color = '#ff6b6b';
            errorDiv.style.fontSize = '14px';
            errorDiv.style.marginTop = '5px';
            errorDiv.textContent = message;
            
            field.parentNode.appendChild(errorDiv);
        };

        const removeError = (e) => {
            const field = e.target;
            field.style.borderColor = '#e0e0e0';
            
            const errorDiv = field.parentNode.querySelector('.field-error');
            if (errorDiv) {
                errorDiv.remove();
            }
        };

        const isValidEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

        const showSuccessMessage = () => {
            // Crear modal de éxito
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
            `;
            
            const modalContent = document.createElement('div');
            modalContent.style.cssText = `
                background: white;
                padding: 40px;
                border-radius: 20px;
                text-align: center;
                max-width: 500px;
                margin: 20px;
                animation: slideIn 0.3s ease;
            `;
            
            modalContent.innerHTML = `
                <div style="color: #4636d9; font-size: 60px; margin-bottom: 20px;">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3 style="color: #4636d9; font-family: 'Permanent Marker', cursive; margin-bottom: 15px;">
                    ¡Mensaje enviado con éxito!
                </h3>
                <p style="color: #666; margin-bottom: 25px; line-height: 1.6;">
                    Gracias por tu interés. Te responderé en menos de 24 horas con una propuesta personalizada.
                </p>
                <button onclick="this.closest('.success-modal').remove()" style="
                    background: linear-gradient(135deg, #4636d9 0%, #d6ff6b 100%);
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 25px;
                    font-size: 16px;
                    cursor: pointer;
                    font-family: 'Segoe UI', Arial, sans-serif;
                    font-weight: 600;
                ">
                    ¡Perfecto!
                </button>
            `;
            
            modal.className = 'success-modal';
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            
            // Cerrar modal al hacer clic fuera
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
            
            // Cerrar automáticamente después de 5 segundos
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.remove();
                }
            }, 5000);
        };