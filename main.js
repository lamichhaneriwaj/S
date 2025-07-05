import './style.css';

// App State
let currentNotice = 0;
let currentTheme = localStorage.getItem('theme') || 'light';

// Mock Data
const notices = [
    {
        title: "Annual Sports Day 2025",
        content: "Join us for our Annual Sports Day on December 15th. Registration is now open for all students!"
    },
    {
        title: "Science Fair 2025",
        content: "Showcase your innovative projects at the Science Fair. Submission deadline: January 20th."
    },
    {
        title: "Winter Break Holiday",
        content: "School will be closed from December 23rd to January 6th. Happy holidays to all!"
    },
    {
        title: "New Library Opening",
        content: "Our new state-of-the-art library will be opening next month with expanded digital resources."
    }
];

const events = [
    {
        title: "Annual Sports Day",
        date: "Dec 15, 2024",
        description: "A day of athletic competition and school spirit with various sports and activities for all grade levels."
    },
    {
        title: "Science Fair 2025",
        date: "Jan 25, 2025",
        description: "Students showcase their innovative projects and scientific discoveries to the community."
    },
    {
        title: "Cultural Festival",
        date: "Feb 10, 2025",
        description: "Celebrating diversity through music, dance, and cultural performances from around the world."
    },
    {
        title: "Spring Concert",
        date: "Mar 5, 2025",
        description: "Our talented music students perform in the annual spring concert featuring choir and orchestra."
    },
    {
        title: "Graduation Ceremony",
        date: "Mar 20, 2025",
        description: "Celebrating the achievements of our graduating class and their journey to the next chapter."
    },
    {
        title: "Art Exhibition",
        date: "Apr 8, 2025",
        description: "Showcasing the creative works of our art students in a professional gallery setting."
    }
];

const galleryItems = [
    {
        id: 1,
        title: "Advanced Chemistry Lab",
        category: "academics",
        description: "Students conducting cutting-edge experiments in our state-of-the-art chemistry laboratory with modern equipment and safety protocols."
    },
    {
        id: 2,
        title: "Basketball Championship Victory",
        category: "sports",
        description: "Our varsity basketball team celebrating their regional championship victory after an intense final game."
    },
    {
        id: 3,
        title: "Science Fair Innovation Award",
        category: "achievements",
        description: "Students presenting their award-winning robotics project that earned first place at the regional science fair."
    },
    {
        id: 4,
        title: "Annual Art Exhibition",
        category: "events",
        description: "The opening night of our annual art exhibition showcasing incredible student creativity and artistic talent."
    },
    {
        id: 5,
        title: "Robotics Club Competition",
        category: "academics",
        description: "Our robotics team working on their competition robot, demonstrating STEM skills and teamwork."
    },
    {
        id: 6,
        title: "Track and Field Championships",
        category: "sports",
        description: "Athletes competing in the regional track and field championships, showing dedication and sportsmanship."
    },
    {
        id: 7,
        title: "Drama Club Performance",
        category: "events",
        description: "Students performing in the annual school play, showcasing their theatrical talents and creativity."
    },
    {
        id: 8,
        title: "Academic Excellence Awards",
        category: "achievements",
        description: "Honoring students who achieved outstanding academic performance throughout the school year."
    }
];

const achievements = [
    {
        icon: "fas fa-trophy",
        title: "State Champions",
        description: "Basketball Team 2024"
    },
    {
        icon: "fas fa-medal",
        title: "Science Olympiad",
        description: "Gold Medal Winners"
    },
    {
        icon: "fas fa-graduation-cap",
        title: "Academic Excellence",
        description: "Top 5% Nationally"
    },
    {
        icon: "fas fa-certificate",
        title: "STEM Recognition",
        description: "Outstanding STEM Program"
    },
    {
        icon: "fas fa-star",
        title: "Teacher Excellence",
        description: "Award-Winning Faculty"
    },
    {
        icon: "fas fa-globe",
        title: "International Recognition",
        description: "Global Education Network"
    }
];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Set theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeToggle();
    
    // Initialize components
    initializeNavigation();
    initializeNoticeBoard();
    initializeEvents();
    initializeGallery();
    initializeAchievements();
    initializeAnimations();
    initializeCountdown();
    initializeVirtualTour();
    initializeContactForm();
    
    // Hide loading screen
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 2500);
}

// Navigation
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            scrollToSection(target.substring(1));
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.style.background = currentTheme === 'dark' 
                ? 'rgba(23, 23, 23, 0.98)' 
                : 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = currentTheme === 'dark' 
                ? 'rgba(0, 0, 0, 0.2)' 
                : 'rgba(255, 255, 255, 0.1)';
        }
    });
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 130;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 180;
        if (window.pageYOffset >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Theme Toggle
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeToggle();
}

function updateThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Notice Board
function initializeNoticeBoard() {
    const noticeContent = document.getElementById('notice-content');
    
    notices.forEach((notice, index) => {
        const noticeItem = document.createElement('div');
        noticeItem.className = `notice-item ${index === 0 ? 'active' : ''}`;
        noticeItem.innerHTML = `
            <h4>${notice.title}</h4>
            <p>${notice.content}</p>
        `;
        noticeContent.appendChild(noticeItem);
    });
    
    // Auto-rotate notices
    setInterval(() => {
        changeNotice(1);
    }, 5000);
}

function changeNotice(direction) {
    const noticeItems = document.querySelectorAll('.notice-item');
    noticeItems[currentNotice].classList.remove('active');
    
    currentNotice += direction;
    if (currentNotice < 0) currentNotice = notices.length - 1;
    if (currentNotice >= notices.length) currentNotice = 0;
    
    noticeItems[currentNotice].classList.add('active');
}

// Virtual Tour Video
function initializeVirtualTour() {
    const mapPoints = document.querySelectorAll('.map-point');
    
    mapPoints.forEach(point => {
        point.addEventListener('click', () => {
            const location = point.getAttribute('data-location');
            openLocationModal(location);
        });
    });
}

function showVirtualTourVideo() {
    const video = document.getElementById('virtual-tour-video');
    video.classList.add('active');
}

function hideVirtualTourVideo() {
    const video = document.getElementById('virtual-tour-video');
    video.classList.remove('active');
}

function openLocationModal(location) {
    const modal = document.getElementById('location-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    const locations = {
        library: {
            title: 'Central Library',
            description: 'Our state-of-the-art library houses over 50,000 books, digital resources, and quiet study spaces. The library features modern computer labs, group study rooms, and a comfortable reading area with natural lighting.',
            features: ['50,000+ Books & E-Resources', 'Digital Learning Center', 'Group Study Rooms', 'Research Assistance', 'Quiet Study Zones', 'Computer Lab Access']
        },
        lab: {
            title: 'Science Laboratories',
            description: 'Fully equipped science laboratories for Physics, Chemistry, and Biology. Students conduct hands-on experiments with modern equipment and comprehensive safety protocols.',
            features: ['Modern Equipment', 'Safety Protocols', 'Multiple Specialized Labs', 'Research Facilities', 'Interactive Learning', 'Expert Supervision']
        },
        auditorium: {
            title: 'Main Auditorium',
            description: 'A 500-seat auditorium equipped with advanced sound and lighting systems. Perfect for presentations, performances, and school events with professional-grade facilities.',
            features: ['500-Seat Capacity', 'Advanced Sound System', 'Professional Lighting', 'Stage Equipment', 'Recording Capabilities', 'Climate Control']
        },
        sports: {
            title: 'Sports Complex',
            description: 'Complete sports facilities including basketball courts, soccer field, track, and swimming pool. Promoting physical fitness, team spirit, and healthy competition.',
            features: ['Basketball Courts', 'Soccer Field', 'Running Track', 'Swimming Pool', 'Fitness Center', 'Sports Equipment']
        }
    };
    
    const locationData = locations[location];
    modalTitle.textContent = locationData.title;
    modalBody.innerHTML = `
        <div style="height: 250px; background: linear-gradient(135deg, var(--primary-500), var(--secondary-500)); border-radius: 12px; margin: 20px 0; display: flex; align-items: center; justify-content: center; color: white; font-size: 48px;">
            <i class="fas fa-building"></i>
        </div>
        <p style="font-size: 16px; line-height: 1.7; margin-bottom: 20px; color: var(--text-secondary);">${locationData.description}</p>
        <h4 style="color: var(--text-primary); margin-bottom: 15px; font-size: 18px;">Key Features:</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
            ${locationData.features.map(feature => `
                <div style="background: var(--bg-secondary); padding: 10px 15px; border-radius: 8px; border: 1px solid var(--border-color); display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-check" style="color: var(--success-500);"></i>
                    <span style="font-size: 14px; color: var(--text-primary);">${feature}</span>
                </div>
            `).join('')}
        </div>
    `;
    
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('location-modal').classList.remove('active');
}

// Events
function initializeEvents() {
    const eventsGrid = document.getElementById('events-grid');
    
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <div class="event-date">${event.date}</div>
            <h4>${event.title}</h4>
            <p>${event.description}</p>
        `;
        eventsGrid.appendChild(eventCard);
    });
}

// Countdown Timer
function initializeCountdown() {
    const targetDate = new Date('2024-12-15T09:00:00');
    
    function updateCountdown() {
        const now = new Date();
        const difference = targetDate - now;
        
        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            // Event has passed, show next event or "Event Started"
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Gallery
function initializeGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    function renderGallery(items) {
        galleryGrid.innerHTML = '';
        items.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('data-category', item.category);
            galleryItem.innerHTML = `
                <div class="gallery-overlay">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                </div>
            `;
            galleryItem.addEventListener('click', () => openGalleryModal(item));
            galleryGrid.appendChild(galleryItem);
        });
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filteredItems = filter === 'all' 
                ? galleryItems 
                : galleryItems.filter(item => item.category === filter);
            
            renderGallery(filteredItems);
        });
    });
    
    renderGallery(galleryItems);
}

function openGalleryModal(item) {
    const modal = document.getElementById('gallery-modal');
    const modalTitle = document.getElementById('gallery-modal-title');
    const modalBody = document.getElementById('gallery-modal-body');
    
    modalTitle.textContent = item.title;
    modalBody.innerHTML = `
        <div style="height: 400px; background: linear-gradient(135deg, var(--primary-500), var(--secondary-500)); border-radius: 12px; margin: 20px 0; display: flex; align-items: center; justify-content: center; color: white; font-size: 48px;">
            <i class="fas fa-image"></i>
        </div>
        <p style="font-size: 16px; line-height: 1.6; color: var(--text-secondary);">${item.description}</p>
        <div style="margin-top: 20px; padding: 15px; background: var(--bg-secondary); border-radius: 12px; border: 1px solid var(--border-color);">
            <strong>Category:</strong> ${item.category.charAt(0).toUpperCase() + item.category.slice(1)}
        </div>
    `;
    
    modal.classList.add('active');
}

function closeGalleryModal() {
    document.getElementById('gallery-modal').classList.remove('active');
}

// Achievements
function initializeAchievements() {
    const achievementsGrid = document.getElementById('achievements-grid');
    
    achievements.forEach(achievement => {
        const achievementCard = document.createElement('div');
        achievementCard.className = 'achievement-card';
        achievementCard.innerHTML = `
            <div class="achievement-icon">
                <i class="${achievement.icon}"></i>
            </div>
            <h4>${achievement.title}</h4>
            <p>${achievement.description}</p>
        `;
        achievementsGrid.appendChild(achievementCard);
    });
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simulate form submission with loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert(`Thank you, ${firstName}! Your message has been sent successfully. We'll get back to you within 24 hours.`);
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Animations
function initializeAnimations() {
    // Animate statistics
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                if (target.classList.contains('stat-number')) {
                    animateNumber(target);
                }
                
                if (target.classList.contains('fade-in')) {
                    target.classList.add('visible');
                }
                
                // Add animation classes
                if (target.classList.contains('program-card')) {
                    target.classList.add('animate-slide-up');
                }
                
                if (target.classList.contains('event-card')) {
                    target.classList.add('animate-slide-up');
                }
                
                if (target.classList.contains('achievement-card')) {
                    target.classList.add('animate-slide-up');
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.stat-number').forEach(el => observer.observe(el));
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    document.querySelectorAll('.program-card').forEach(el => observer.observe(el));
    document.querySelectorAll('.event-card').forEach(el => observer.observe(el));
    document.querySelectorAll('.achievement-card').forEach(el => observer.observe(el));
}

function animateNumber(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    
    let current = start;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.round(current);
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Close modals when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal();
        closeGalleryModal();
    }
});

// Smooth scroll for all internal links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        scrollToSection(targetId);
    }
});

// Add scroll-triggered animations
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Make functions globally available
window.scrollToSection = scrollToSection;
window.showVirtualTourVideo = showVirtualTourVideo;
window.hideVirtualTourVideo = hideVirtualTourVideo;
window.changeNotice = changeNotice;
window.closeModal = closeModal;
window.closeGalleryModal = closeGalleryModal;