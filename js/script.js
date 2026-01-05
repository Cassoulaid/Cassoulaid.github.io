// Smooth scrolling
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

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.8)';
    }
});

// Gallery item animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.opacity = '0';
    observer.observe(item);
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const galleryItems = document.querySelectorAll('.gallery-item');
const closeLightbox = document.getElementById('closeLightbox');
const prevImage = document.getElementById('prevImage');
const nextImage = document.getElementById('nextImage');

let currentIndex = 0;
const images = Array.from(galleryItems).map(item => item.querySelector('img').src);

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = index;
        showLightbox();
    });
});

function showLightbox() {
    lightbox.classList.add('active');
    lightboxImage.src = images[currentIndex];
    document.body.style.overflow = 'hidden';
}

function hideLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

closeLightbox.addEventListener('click', hideLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        hideLightbox();
    }
});

prevImage.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImage.src = images[currentIndex];
});

nextImage.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImage.src = images[currentIndex];
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') hideLightbox();
    if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImage.src = images[currentIndex];
    }
    if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImage.src = images[currentIndex];
    }
});