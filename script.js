// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Gallery Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Add transition styles to gallery items
galleryItems.forEach(item => {
    item.style.transition = 'opacity 0.3s, transform 0.3s';
});

// Video hover play functionality
const videoItems = document.querySelectorAll('.video-item video');

videoItems.forEach(video => {
    video.addEventListener('mouseenter', () => {
        video.play();
    });
    
    video.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});

// Service Modal
const modal = document.getElementById('serviceModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close');
const serviceButtons = document.querySelectorAll('[data-service]');

const serviceDetails = {
    playeras: {
        title: 'Impresión en Playeras',
        content: `
            <h3>Técnicas disponibles:</h3>
            <ul>
                <li><strong>Serigrafía:</strong> Ideal para pedidos grandes, colores vibrantes y duraderos</li>
                <li><strong>Sublimación:</strong> Perfecta para diseños full color en playeras de poliéster</li>
                <li><strong>Vinil textil:</strong> Excelente para nombres y números</li>
                <li><strong>DTF:</strong> La mejor opción para diseños complejos en pequeñas cantidades</li>
            </ul>
            <h3>Materiales:</h3>
            <p>Trabajamos con algodón, poliéster, y mezclas. Todas las tallas disponibles.</p>
            <h3>Cantidad mínima:</h3>
            <p>Desde 1 pieza (precios especiales por volumen)</p>
        `
    },
    tazas: {
        title: 'Impresión en Tazas',
        content: `
            <h3>Tipos de tazas:</h3>
            <ul>
                <li><strong>Cerámicas blancas:</strong> Clásicas de 11oz y 15oz</li>
                <li><strong>Tazas mágicas:</strong> Cambian de color con el calor</li>
                <li><strong>Tazas de color:</strong> Interior y asa de colores</li>
                <li><strong>Termos:</strong> Acero inoxidable personalizado</li>
            </ul>
            <h3>Técnica:</h3>
            <p>Sublimación de alta calidad, resistente al microondas y lavavajillas</p>
            <h3>Diseño:</h3>
            <p>Impresión envolvente 360° disponible</p>
        `
    },
    laser: {
        title: 'Grabado Láser',
        content: `
            <h3>Materiales que trabajamos:</h3>
            <ul>
                <li><strong>Madera:</strong> MDF, pino, cedro, bambú</li>
                <li><strong>Acrílico:</strong> Transparente y de colores</li>
                <li><strong>Metal:</strong> Aluminio anodizado, acero inoxidable</li>
                <li><strong>Cuero:</strong> Natural y sintético</li>
                <li><strong>Vidrio:</strong> Copas, vasos, espejos</li>
            </ul>
            <h3>Aplicaciones:</h3>
            <p>Placas conmemorativas, trofeos, joyería, decoración, señalización, regalos corporativos</p>
            <h3>Precisión:</h3>
            <p>Grabado de alta precisión con detalles mínimos de 0.1mm</p>
        `
    }
};

serviceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const service = button.getAttribute('data-service');
        if (serviceDetails[service]) {
            modalTitle.textContent = serviceDetails[service].title;
            modalBody.innerHTML = serviceDetails[service].content;
            modal.style.display = 'block';
        }
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would normally send the data to a server
    // For now, we'll just show an alert
    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
    
    // Reset form
    contactForm.reset();
});

// Animate on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.service-card, .feature, .gallery-item, .technique-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(el);
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'var(--shadow-sm)';
    } else if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = 'var(--shadow-lg)';
    }
    
    lastScroll = currentScroll;
});

// Add smooth transition to navbar
navbar.style.transition = 'transform 0.3s, box-shadow 0.3s';

// Lazy loading for videos
const lazyVideos = document.querySelectorAll('video[data-src]');

const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const video = entry.target;
            video.src = video.dataset.src;
            video.load();
            videoObserver.unobserve(video);
        }
    });
});

lazyVideos.forEach(video => {
    videoObserver.observe(video);
});

// Particle effect for hero section (optional enhancement)
const heroSection = document.querySelector('.hero');
if (heroSection) {
const particlesContainer = document.createElement('div');
particlesContainer.className = 'particles';
particlesContainer.style.position = 'absolute';
particlesContainer.style.top = '0';
particlesContainer.style.left = '0';
particlesContainer.style.width = '100%';
particlesContainer.style.height = '100%';
particlesContainer.style.pointerEvents = 'none';
heroSection.appendChild(particlesContainer);

// Create floating particles
for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'rgba(255,255,255,0.5)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animation = `float ${3 + Math.random() * 4}s linear infinite`;
    particle.style.animationDelay = Math.random() * 2 + 's';
    particlesContainer.appendChild(particle);
}

// Add floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translateY(0) translateX(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100px) translateX(50px); opacity: 0; }
    }
`;
document.head.appendChild(style);
}

// Lightbox for gallery images
(() => {
    const getTargetImage = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return null;
    return target.closest('.product-card img');
};

    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('aria-hidden', 'true');

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '&times;';

    const fullImg = document.createElement('img');
    fullImg.alt = '';

    overlay.appendChild(closeBtn);
    overlay.appendChild(fullImg);
    document.body.appendChild(overlay);

    const open = (src, alt) => {
        fullImg.src = src;
        fullImg.alt = alt || '';
        overlay.classList.add('open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const close = () => {
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
        fullImg.src = '';
        document.body.style.overflow = '';
    };

    document.addEventListener('click', (event) => {
    const img = getTargetImage(event);
    if (img) open(img.src, img.alt);
});

    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) close();
    });

    closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && overlay.classList.contains('open')) {
            close();
        }
    });
})();
console.log('Impresiones Gonsy - Website loaded successfully!');


