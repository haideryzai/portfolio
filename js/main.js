// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    const html = document.documentElement;
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      html.classList.add('dark');
      moonIcon.classList.add('hidden');
      sunIcon.classList.remove('hidden');
    }
    
    themeToggle.addEventListener('click', function() {
      html.classList.toggle('dark');
      moonIcon.classList.toggle('hidden');
      sunIcon.classList.toggle('hidden');
      
      // Save theme preference
      if (html.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    });
    
    // Mobile Menu Toggle
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuButton.addEventListener('click', function() {
      const isOpen = mobileMenu.classList.contains('translate-x-0');
      
      if (isOpen) {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
      } else {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
      }
      
      // Toggle menu button appearance
      const spans = menuButton.querySelectorAll('span');
      if (isOpen) {
        spans[0].classList.remove('rotate-45', 'translate-y-1.5');
        spans[1].classList.remove('opacity-0');
        spans[2].classList.remove('-rotate-45', '-translate-y-1.5');
      } else {
        spans[0].classList.add('rotate-45', 'translate-y-1.5');
        spans[1].classList.add('opacity-0');
        spans[2].classList.add('-rotate-45', '-translate-y-1.5');
      }
    });
    
    // Close mobile menu when clicking on a link
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
    
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
        
        // Reset menu button appearance
        const spans = menuButton.querySelectorAll('span');
        spans[0].classList.remove('rotate-45', 'translate-y-1.5');
        spans[1].classList.remove('opacity-0');
        spans[2].classList.remove('-rotate-45', '-translate-y-1.5');
      });
    });
    
    // Skills Filter
    const skillFilterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillFilterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        skillFilterBtns.forEach(b => {
          b.classList.remove('bg-primary', 'text-white');
          b.classList.add('bg-gray-200', 'dark:bg-gray-700');
        });
        
        // Add active class to clicked button
        this.classList.remove('bg-gray-200', 'dark:bg-gray-700');
        this.classList.add('bg-primary', 'text-white');
        
        const category = this.getAttribute('data-category');
        
        // Show/hide skill cards based on category
        skillCards.forEach(card => {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
    
    // Projects Filter
    const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    projectFilterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        projectFilterBtns.forEach(b => {
          b.classList.remove('bg-primary', 'text-white');
          b.classList.add('bg-white', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-white');
        });
        
        // Add active class to clicked button
        this.classList.remove('bg-white', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-white');
        this.classList.add('bg-primary', 'text-white');
        
        const filter = this.getAttribute('data-filter');
        
        // Show/hide project cards based on filter
        projectCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-type') === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          subject: document.getElementById('subject').value,
          message: document.getElementById('message').value
        };
        
        // Show sending status
        formStatus.textContent = 'Sending message...';
        formStatus.classList.remove('hidden', 'bg-green-100', 'text-green-700', 'bg-red-100', 'text-red-700');
        formStatus.classList.add('bg-blue-100', 'text-blue-700');
        
        // Simulate API call with timeout
        setTimeout(function() {
          // Success response
          formStatus.textContent = 'Your message has been sent successfully. I\'ll get back to you soon!';
          formStatus.classList.remove('bg-blue-100', 'text-blue-700', 'bg-red-100', 'text-red-700');
          formStatus.classList.add('bg-green-100', 'text-green-700');
          
          // Reset form
          contactForm.reset();
          
          // Clear status after 5 seconds
          setTimeout(function() {
            formStatus.classList.add('hidden');
          }, 5000);
        }, 1500);
      });
    }
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.remove('opacity-0', 'invisible');
        backToTopBtn.classList.add('opacity-100', 'visible');
      } else {
        backToTopBtn.classList.remove('opacity-100', 'visible');
        backToTopBtn.classList.add('opacity-0', 'invisible');
      }
    });
    
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Animate skill cards on scroll
    function animateSkillCards() {
      const skillCards = document.querySelectorAll('.skill-card');
      
      skillCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.remove('opacity-0', 'translate-y-4');
        }, index * 50);
      });
    }
    
    // Check if skills section is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }
    
    // Trigger animation when skills section comes into view
    const skillsSection = document.getElementById('skills');
    let animated = false;
    
    function checkSkillsVisibility() {
      if (!animated && skillsSection && isInViewport(skillsSection)) {
        animateSkillCards();
        animated = true;
        window.removeEventListener('scroll', checkSkillsVisibility);
      }
    }
    
    window.addEventListener('scroll', checkSkillsVisibility);
    
    // Check on page load
    checkSkillsVisibility();
    
    // Handle window resize for responsive adjustments
    window.addEventListener('resize', function() {
      // Recalculate any size-dependent elements if needed
    });
  });