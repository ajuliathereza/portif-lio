document.addEventListener('DOMContentLoaded', function() {
    // Atualiza o ano no rodapé
    const anoAtual = document.getElementById('year');
    if (anoAtual) {
        anoAtual.textContent = new Date().getFullYear();
    }

    // Menu mobile
    const menuHamburguer = document.querySelector('.hamburger');
    const menuLinks = document.querySelector('.nav-links');
    const itensMenu = document.querySelectorAll('.nav-links a');
    
    if (menuHamburguer && menuLinks) {
        menuHamburguer.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            menuLinks.classList.toggle('active');
            document.body.style.overflow = this.classList.contains('active') ? 'hidden' : '';
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!menuLinks.contains(e.target) && !menuHamburguer.contains(e.target)) {
                menuHamburguer.classList.remove('active');
                menuLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Fechar menu ao clicar em um link
    itensMenu.forEach(link => {
        link.addEventListener('click', function() {
            if (menuHamburguer && menuLinks) {
                menuHamburguer.classList.remove('active');
                menuLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Rolagem suave
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const alvoId = this.getAttribute('href');
            if (alvoId === '#') return;
            
            e.preventDefault();
            
            const elementoAlvo = document.querySelector(alvoId);
            if (elementoAlvo) {
                const alturaCabecalho = 80;
                const posicaoElemento = elementoAlvo.getBoundingClientRect().top;
                const posicaoRolagem = posicaoElemento + window.pageYOffset - alturaCabecalho;

                window.scrollTo({
                    top: posicaoRolagem,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efeito de digitação
    setTimeout(() => {
        const elementoNome = document.querySelector('.name');
        if (elementoNome) {
            const nome = elementoNome.textContent.trim();
            elementoNome.textContent = '';
            
            let i = 0;
            const velocidade = 100; // Velocidade da digitação (quanto menor, mais rápido)
            
            function digitar() {
                if (i < nome.length) {
                    elementoNome.textContent += nome.charAt(i);
                    i++;
                    setTimeout(digitar, velocidade);
                }
            }
            
            digitar();
        }
    }, 1000);

    // Adiciona classe quando a página carregar
    window.addEventListener('load', function() {
        document.body.classList.add('carregado');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section');
    
    function highlightNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    highlightNav(); // Run once on page load

    // Typewriter effect for hero section
    const typeWriter = (element, text, speed = 50, i = 0) => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(() => typeWriter(element, text, speed, i), speed);
        }
    };

    // Initialize typewriter effect after a short delay
    setTimeout(() => {
        const nameElement = document.querySelector('.name');
        if (nameElement) {
            const name = nameElement.textContent;
            nameElement.textContent = '';
            typeWriter(nameElement, name);
        }
    }, 1000);

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            const successMessage = document.getElementById('form-success');
            
            // Desabilita o botão e mostra "Enviando..."
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            
            try {
                // Envia os dados do formulário via Fetch API
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Mostra mensagem de sucesso
                    successMessage.style.display = 'block';
                    // Reseta o formulário
                    this.reset();
                    
                    // Esconde a mensagem após 5 segundos
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                } else {
                    throw new Error('Falha ao enviar mensagem');
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
            } finally {
                // Restaura o botão
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }

    // Add parallax effect to elements
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
            const yPos = -(scrollPosition * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });

    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // Add glitch effect on hover for specific elements
    const glitchElements = document.querySelectorAll('.glitch-hover');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.classList.add('glitch-active');
        });
        
        element.addEventListener('animationend', () => {
            element.classList.remove('glitch-active');
        });
    });

    // Add noise effect to terminal windows
    const terminals = document.querySelectorAll('.terminal');
    
    terminals.forEach(terminal => {
        const noise = document.createElement('div');
        noise.className = 'terminal-noise';
        terminal.appendChild(noise);
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

// Add custom cursor effect
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Add hover effect for links
const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .social-link');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
    });
});



// Modal para visualização de certificados
const modal = document.createElement('div');
modal.className = 'modal';
modal.innerHTML = `
    <span class="close-modal">&times;</span>
    <div class="modal-content">
        <img src="" alt="Certificado">
    </div>
`;
document.body.appendChild(modal);

const modalImg = modal.querySelector('img');
const closeModal = modal.querySelector('.close-modal');

// Abrir modal ao clicar em um certificado
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-certificate')) {
        const imgSrc = e.target.getAttribute('data-image');
        modal.style.display = 'flex';
        modalImg.src = imgSrc;
        document.body.style.overflow = 'hidden';
    }
});

// Fechar modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
});

// Fechar ao clicar fora da imagem
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
});