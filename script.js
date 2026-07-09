document.addEventListener('DOMContentLoaded', function() {
  var emailjsConfig = {
    publicKey: 'RKGRG2gh0ctzRla7w',
    serviceId: 'service_xexuz8j',
    templateId: 'template_wof5gaa'
  };

  var contactForm = document.getElementById('contactForm');
  var formStatus = document.getElementById('formStatus');

  function setFormStatus(message, state) {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.classList.remove('is-success', 'is-error');
    if (state) {
      formStatus.classList.add(state === 'success' ? 'is-success' : 'is-error');
    }
  }

  if (window.emailjs) {
    window.emailjs.init(emailjsConfig.publicKey);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      if (!window.emailjs) {
        setFormStatus('Email service is not available right now.', 'error');
        return;
      }

      var submitButton = contactForm.querySelector('.form-submit');
      var formData = new FormData(contactForm);
      var params = {
        user_name: formData.get('user_name'),
        user_email: formData.get('user_email'),
        project_type: formData.get('project_type'),
        message: formData.get('message'),
        to_email: 'pixpatch4@gmail.com'
      };

      submitButton.disabled = true;
      setFormStatus('Sending your message...', '');

      try {
        await window.emailjs.send(emailjsConfig.serviceId, emailjsConfig.templateId, params);
        contactForm.reset();
        setFormStatus('Message sent. We will check pixpatch4@gmail.com and reply soon.', 'success');
      } catch (error) {
        console.error('EmailJS send failed:', error);
        setFormStatus('Message could not be sent. Please try again or email pixpatch4@gmail.com directly.', 'error');
      } finally {
        submitButton.disabled = false;
      }
    });
  }

  // Loading screen
  const loader = document.getElementById('loader');
  window.addEventListener('load', function() {
    setTimeout(function() {
      loader.classList.add('hidden');
    }, 1600);
  });

  // Mouse glow
  const mouseGlow = document.getElementById('mouseGlow');
  document.addEventListener('mousemove', function(e) {
    mouseGlow.style.left = e.clientX + 'px';
    mouseGlow.style.top = e.clientY + 'px';
  });
  document.addEventListener('mouseleave', function() {
    mouseGlow.style.opacity = '0';
  });
  document.addEventListener('mouseenter', function() {
    mouseGlow.style.opacity = '1';
  });

  // Scroll progress bar
  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', function() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    scrollProgress.style.width = (scrollTop / scrollHeight) * 100 + '%';
  });

  // Header hides/shows on scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinkItems = navLinks.querySelectorAll('.nav-link');

  navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    var isOpen = navLinks.classList.contains('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinkItems.forEach(function(link) {
    link.addEventListener('click', function() {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Active nav highlight based on scroll
  var sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    var scrollPos = window.scrollY + 120;

    sections.forEach(function(section) {
      var sectionTop = section.offsetTop;
      var sectionBottom = sectionTop + section.offsetHeight;
      var sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        navLinkItems.forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  // Back to top
  var backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // FAQ accordion
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item) {
    var question = item.querySelector('.faq-question');
    question.addEventListener('click', function() {
      var isActive = item.classList.contains('active');
      faqItems.forEach(function(other) {
        other.classList.remove('active');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Scroll animations via IntersectionObserver
  var fadeElements = document.querySelectorAll('.fade-up');
  var processSteps = document.querySelectorAll('.process-step');

  function createObserver(elements, className) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(function(el) {
      observer.observe(el);
    });
  }

  if (fadeElements.length > 0) createObserver(fadeElements, 'visible');
  if (processSteps.length > 0) createObserver(processSteps, 'visible');

  var observeCards = document.querySelectorAll('.service-card, .why-item, .work-card, .about-card');
  if (observeCards.length > 0) createObserver(observeCards, 'visible');

  // Ripple on buttons
  var buttons = document.querySelectorAll('.btn');
  buttons.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      var rect = btn.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      var size = Math.max(rect.width, rect.height);
      ripple.style.width = size + 'px';
      ripple.style.height = size + 'px';
      btn.appendChild(ripple);
      setTimeout(function() {
        ripple.remove();
      }, 600);
    });
  });

  // Parallax hero shapes
  var shapes = document.querySelectorAll('.shape');
  document.addEventListener('mousemove', function(e) {
    var x = e.clientX / window.innerWidth;
    var y = e.clientY / window.innerHeight;
    shapes.forEach(function(shape, index) {
      var speed = (index + 1) * 10;
      shape.style.transform = 'translate(' + (x - 0.5) * speed + 'px, ' + (y - 0.5) * speed + 'px)';
    });
  });

});
