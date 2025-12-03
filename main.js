import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger)

// Initialize Lenis for Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Custom Cursor Logic
const cursor = document.querySelector('.cursor')
const cursorFollower = document.querySelector('.cursor-follower')

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    })
    gsap.to(cursorFollower, {
        x: e.clientX - 12, // Offset to center
        y: e.clientY - 12,
        duration: 0.3
    })
})

// Hover effects for cursor
const links = document.querySelectorAll('a, button')
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(cursorFollower, {
            scale: 1.5,
            borderColor: 'transparent',
            backgroundColor: 'rgba(0, 255, 157, 0.2)',
            duration: 0.3
        })
    })
    link.addEventListener('mouseleave', () => {
        gsap.to(cursorFollower, {
            scale: 1,
            borderColor: '#00ff9d',
            backgroundColor: 'transparent',
            duration: 0.3
        })
    })
})

// Animations
const initAnimations = () => {
    // Hero Text Reveal
    const tl = gsap.timeline()

    tl.from('.hero-content h1', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.2
    })
        .from('.hero-content p', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-content div a', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-image', {
            scale: 0.8,
            opacity: 0,
            duration: 1.5,
            ease: 'elastic.out(1, 0.5)'
        }, '-=1')

    // Section Headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        })
    })

    // Skill Progress Bars
    gsap.utils.toArray('.skill-progress').forEach(bar => {
        gsap.to(bar, {
            scrollTrigger: {
                trigger: bar,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            width: bar.dataset.width,
            duration: 1.5,
            ease: 'power3.out'
        })
    })

    // Project Cards Parallax
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
            },
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        })
    })

    // About Image Parallax
    gsap.to('.about-visual div', {
        scrollTrigger: {
            trigger: '.about-visual',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        },
        y: 50,
        ease: 'none'
    })
}

// Magnetic Card Effect & Text Animations
const initMagneticCards = () => {
    const cards = document.querySelectorAll('.project-card, .skill-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation based on mouse position
            // Max rotation: 10 degrees
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            gsap.to(card, {
                duration: 0.0001,
                rotateX: rotateX,
                rotateY: rotateY,
                scale: 1.05,
                ease: 'none',
                transformPerspective: 1000,
                transformOrigin: 'center'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.1,
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                ease: 'power1.out'
            });

            // Reset text position
            const content = card.querySelectorAll('h3, p, span, a, img');
            gsap.to(content, {
                y: 0,
                x: 0,
                duration: 0.2,
                ease: 'power2.out'
            });
        });

        // Text/Content Animation on Hover
        card.addEventListener('mouseenter', () => {
            const content = card.querySelectorAll('h3, p, span, a, img');
            gsap.to(content, {
                y: -5,
                stagger: 0.01,
                duration: 0.15,
                ease: 'power1.out'
            });
        });
    });
}

// Typing Effect
const initTypingEffect = () => {
    const words = ["Experiences", "Interfaces", "Solutions",];
    const typingText = document.querySelector('.typing-text');
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    const type = () => {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', () => {
    initAnimations()
    initMagneticCards()
    initTypingEffect()

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('translate-x-0');

            if (isOpen) {
                // Close menu
                mobileMenu.classList.remove('translate-x-0');
                mobileMenu.classList.add('translate-x-full');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            } else {
                // Open menu
                mobileMenu.classList.remove('translate-x-full');
                mobileMenu.classList.add('translate-x-0');
                menuIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
            }
        });

        // Close menu when clicking on a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('translate-x-0');
                mobileMenu.classList.add('translate-x-full');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            });
        });
    }

    // WhatsApp Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('contact-message').value;

            // Your WhatsApp number (with country code, no + or spaces)
            // Example: For +1 234 567 8900, use: 12345678900
            const whatsappNumber = '923082860916'; // REPLACE THIS WITH YOUR ACTUAL WHATSAPP NUMBER

            // Create the pre-filled message
            const whatsappMessage = `Hi! I'm ${name}%0A%0AEmail: ${email}%0A%0AMessage:%0A${message}`;

            // Create WhatsApp URL
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

            // Redirect to WhatsApp
            window.open(whatsappURL, '_blank');

            // Optional: Reset form after submission
            contactForm.reset();
        });
    }
})
const words = [
  "Experiences",
  "Interfaces",
  "Development",
  "Websites"
];

const typingSpeed = 90;
const deletingSpeed = 50;
const pauseAfterTyping = 1000;
const pauseAfterDeleting = 300;

const el = document.getElementById("typed");

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function typeWord(word) {
  for (let i = 0; i <= word.length; i++) {
    el.textContent = word.slice(0, i);
    await sleep(typingSpeed);
  }
}

async function deleteWord(word) {
  for (let i = word.length; i >= 0; i--) {
    el.textContent = word.slice(0, i);
    await sleep(deletingSpeed);
  }
}

async function loop() {
  let i = 0;
  while (true) {
    const word = words[i % words.length];
    await typeWord(word);
    await sleep(pauseAfterTyping);
    await deleteWord(word);
    await sleep(pauseAfterDeleting);
    i++;
  }
}

loop();
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("nameInput").value.trim();
  const email = document.getElementById("emailInput").value.trim();
  const message = document.getElementById("messageInput").value.trim();

  const text =
    `━━━━━━━━━━━━━━%0A` +
    `👤 *Name:* ${name}%0A` +
    `📧 *Email:* ${email}%0A` +
    `📝 *Message:*%0A${message}%0A` +
    `━━━━━━━━━━━━━━`;

  const phone = "923082860916";
  const whatsappURL = `https://wa.me/${phone}?text=${text}`;

  window.open(whatsappURL, "_blank");
});

