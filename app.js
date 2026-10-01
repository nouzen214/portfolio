/**
 * Developer Portfolio Client-Side Engine
 * Lance Angelo A. Policarpio - Intern @ CloudSwyft & BSIT
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // A. CUSTOM CURSOR + SPOTLIGHT (A24-inspired)
  // =========================================================================
  const cursorDot      = document.getElementById('cursor-dot');
  const cursorRing     = document.getElementById('cursor-ring');
  const cursorSpot     = document.getElementById('cursor-spotlight');

  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let ringX  = mouseX, ringY  = mouseY;
  let spotX  = mouseX, spotY  = mouseY;

  // Raw mouse position (dot follows exactly)
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot) {
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top  = mouseY + 'px';
    }
    // Spotlight with slight lag
    if (cursorSpot) {
      cursorSpot.style.left = mouseX + 'px';
      cursorSpot.style.top  = mouseY + 'px';
    }
  });

  // Ring follows with easing via rAF
  const animateRing = () => {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    if (cursorRing) {
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top  = ringY + 'px';
    }
    requestAnimationFrame(animateRing);
  };
  animateRing();

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    if (cursorDot)  cursorDot.style.opacity  = '0';
    if (cursorRing) cursorRing.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    if (cursorDot)  cursorDot.style.opacity  = '1';
    if (cursorRing) cursorRing.style.opacity = '1';
  });

  // =========================================================================
  // B. KINETIC HERO TEXT (A24-inspired split-word entrance)
  // =========================================================================
  const kineticWords = document.querySelectorAll('.kinetic-word');
  if (kineticWords.length > 0) {
    kineticWords.forEach((word, i) => {
      setTimeout(() => {
        word.classList.add('animate');
      }, 180 + i * 100);
    });
  }

  // =========================================================================
  // C. MAGNETIC BUTTON EFFECT (A24-inspired)
  // =========================================================================
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const bx = e.clientX - rect.left - rect.width  / 2;
      const by = e.clientY - rect.top  - rect.height / 2;
      btn.style.transform = `translate(${bx * 0.28}px, ${by * 0.28}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  // =========================================================================
  // D. PROJECT CARD CLIP-PATH WIPE (cursor position tracking)
  // =========================================================================
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
      // Also apply 3D tilt
      const cx = e.clientX - rect.left - rect.width  / 2;
      const cy = e.clientY - rect.top  - rect.height / 2;
      const rotX = (cy / (rect.height / 2)) * -4;
      const rotY = (cx / (rect.width  / 2)) *  4;
      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // =========================================================================
  // E. HEADING WIPE UNDERLINE (fires when section heading becomes visible)
  // =========================================================================
  const wipeHeadings = document.querySelectorAll('.heading-wipe');
  if ('IntersectionObserver' in window && wipeHeadings.length > 0) {
    const wipeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          wipeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    wipeHeadings.forEach(h => wipeObserver.observe(h));
  }

  // =========================================================================
  // F. TIMELINE ANIMATED LINE DRAW
  // =========================================================================
  const timelineContainers = document.querySelectorAll('.timeline-container');
  if ('IntersectionObserver' in window && timelineContainers.length > 0) {
    const tlObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          tlObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    timelineContainers.forEach(c => tlObserver.observe(c));
  }

  // 1. Set current year in footer
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Mobile Menu Drawer Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 3. Navbar scroll blur enhancement & active section observer
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('bg-slate-950/80', 'backdrop-blur-lg', 'border-b', 'border-slate-800/80', 'shadow-xl');
    } else {
      navbar.classList.remove('bg-slate-950/80', 'backdrop-blur-lg', 'border-b', 'border-slate-800/80', 'shadow-xl');
    }
  });

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav);

  // 4. Skills Category Filtering
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillItems = document.querySelectorAll('.skill-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-cyan-500', 'text-slate-950', 'font-semibold');
        b.classList.add('text-slate-400');
      });
      btn.classList.add('bg-cyan-500', 'text-slate-950', 'font-semibold');
      btn.classList.remove('text-slate-400');

      const selectedCategory = btn.getAttribute('data-category');

      skillItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (selectedCategory === 'all' || itemCategory === selectedCategory) {
          item.classList.remove('hidden');
          item.style.animation = 'fadeIn 0.3s ease-in-out';
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // 5. Interactive Developer Terminal
  const terminalInput = document.getElementById('terminal-input');
  const terminalHistory = document.getElementById('terminal-history');
  const terminalRunBtn = document.getElementById('terminal-run-btn');

  const commands = {
    help: () => `
<div class="text-cyan-400 font-bold mb-1">Available commands:</div>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs">
  <div><span class="text-emerald-400 font-bold">experience</span> - CloudSwyft active internship</div>
  <div><span class="text-emerald-400 font-bold">projects</span>   - CloudSwyft (NDA), MoodTracker, PAMANA</div>
  <div><span class="text-emerald-400 font-bold">about</span>      - Bio & career background</div>
  <div><span class="text-emerald-400 font-bold">skills</span>     - Technical capabilities</div>
  <div><span class="text-emerald-400 font-bold">education</span>  - UPHSL BSIT & Certifications</div>
  <div><span class="text-emerald-400 font-bold">contact</span>    - Email, phone, location & GitHub</div>
  <div><span class="text-emerald-400 font-bold">clear</span>      - Clear terminal screen</div>
  <div><span class="text-emerald-400 font-bold">sudo</span>       - Superuser access check</div>
  <div><span class="text-emerald-400 font-bold">date</span>       - Current system timestamp</div>
</div>
`,
    experience: () => `
<div class="text-slate-300 space-y-1">
  <div><span class="text-cyan-400 font-bold">• Intern @ CloudSwyft Global Systems</span> (Current Internship)</div>
  <div class="text-xs text-slate-400 pl-3">- Contributed to platform enhancements, interface modernizations, and user experience.</div>
  <div class="text-xs text-slate-400 pl-3">- Adhered to enterprise development standards and strict NDA source code protection.</div>
</div>
`,
    about: () => `
<div class="text-slate-300">
  <span class="text-cyan-400 font-bold">Lance Angelo A. Policarpio</span> (Age 21)<br/>
  • <span class="text-emerald-400 font-bold">Intern</span> at CloudSwyft Global Systems.<br/>
  • <span class="text-emerald-400 font-bold">BSIT Student</span> at University of Perpetual Help System Laguna (2023 - 2027).<br/>
  Creative IT student and UI/UX designer with hands-on enterprise internship experience and multimedia capabilities.
</div>
`,
    skills: () => `
<div class="text-slate-300 space-y-1">
  <div><span class="text-cyan-400 font-bold">Enterprise & App:</span> Platform Enhancement, PWA, JavaScript, HTML5/CSS3, Database Connectivity (SQL)</div>
  <div><span class="text-emerald-400 font-bold">UI/UX & Prototyping:</span> Axure RP, User Flows, Wireframing, Adobe Animate, Premiere Pro</div>
  <div><span class="text-violet-400 font-bold">Game Dev & 3D:</span> Unity Engine (Certified User: Artist), C# Scripting, Blender 3D (Sculpting, FK Rigging)</div>
  <div><span class="text-amber-400 font-bold">Hardware & Core:</span> NC II Electronics Passer, Team Collaboration, Project Management</div>
</div>
`,
    projects: () => `
<div class="text-slate-300 space-y-2">
  <div>1. <span class="text-cyan-400 font-bold">CloudSwyft Website Enhancement</span> (Enterprise Internship Project)<br/>
  &nbsp;&nbsp;&nbsp;Status: <span class="text-amber-400">🔒 Proprietary / Confidential (NDA Protected)</span></div>

  <div>2. <span class="text-emerald-400 font-bold">MoodTracker PWA</span>: Daily emotional state tracker with calendar, intensity slider, and AI Chat.<br/>
  &nbsp;&nbsp;&nbsp;Repo: <a href="https://github.com/nouzen214/moodtracker-pwa.git" target="_blank" class="text-emerald-300 underline">https://github.com/nouzen214/moodtracker-pwa.git</a></div>
  
  <div>3. <span class="text-violet-400 font-bold">PAMANA Capstone System</span>: Interactive Filipino cultural heritage capstone & database connectivity.<br/>
  &nbsp;&nbsp;&nbsp;Repo: <a href="https://github.com/nouzen214/IT9_DatabaseConnectivity.git" target="_blank" class="text-violet-300 underline">https://github.com/nouzen214/IT9_DatabaseConnectivity.git</a></div>
  
  <div>4. <span class="text-amber-400 font-bold">Unity 2D/3D Game & Blender Rigging</span>: Playable C# game and organic character Forward Kinematics rigs.</div>
</div>
`,
    education: () => `
<div class="text-slate-300 space-y-1">
  <div>• <span class="text-cyan-400 font-bold">University of Perpetual Help System Laguna</span> (2023 - 2027) - BS Information Technology</div>
  <div>• <span class="text-emerald-400 font-bold">Unity Certified User: Artist</span> (Certiport, 2025 - Present)</div>
  <div>• <span class="text-violet-400 font-bold">South City Homes Academy</span> (2017 - 2023) - NC II Passer in Electronics, Top 3 (Grade 8)</div>
</div>
`,
    contact: () => `
<div class="text-slate-300 space-y-1">
  <div><span class="text-cyan-400 font-bold">Email:</span> lancealmenanza@gmail.com</div>
  <div><span class="text-emerald-400 font-bold">Phone:</span> 09105628157</div>
  <div><span class="text-violet-400 font-bold">Location:</span> 120 Brgy. Tubigan, Biñan City, Laguna, Philippines</div>
  <div><span class="text-amber-400 font-bold">GitHub:</span> https://github.com/nouzen214</div>
</div>
`,
    sudo: () => `<div class="text-amber-400">Visitor permission granted: You have full access to explore Lance's portfolio! 🚀</div>`,
    date: () => `<div class="text-slate-300">${new Date().toLocaleString()}</div>`,
    clear: () => '__CLEAR__'
  };

  const handleCommand = (rawInput) => {
    const cmd = rawInput.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      terminalHistory.innerHTML = `
        <p class="text-slate-500">// Terminal screen cleared. Type <span class="text-cyan-400 font-bold">help</span> for commands.</p>
      `;
      return;
    }

    // Append user input line
    const userLine = document.createElement('div');
    userLine.className = 'flex items-center gap-2 text-slate-100 font-bold pt-2';
    userLine.innerHTML = `<span class="text-emerald-400 font-mono">visitor@lance-dev:~$</span> <span>${escapeHtml(rawInput)}</span>`;
    terminalHistory.appendChild(userLine);

    // Append output
    const outputDiv = document.createElement('div');
    outputDiv.className = 'text-xs text-slate-300 pl-4 py-1';

    if (commands[cmd]) {
      outputDiv.innerHTML = commands[cmd]();
    } else {
      outputDiv.innerHTML = `<span class="text-rose-400">zsh: command not found: ${escapeHtml(cmd)}</span>. Try typing <span class="text-cyan-400 font-bold">help</span>.`;
    }

    terminalHistory.appendChild(outputDiv);
    terminalHistory.scrollTop = terminalHistory.scrollHeight;
  };

  const escapeHtml = (str) => {
    return str.replace(/[&<>"']/g, function(m) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[m];
    });
  };

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const value = terminalInput.value;
        terminalInput.value = '';
        handleCommand(value);
      }
    });

    if (terminalRunBtn) {
      terminalRunBtn.addEventListener('click', () => {
        const value = terminalInput.value;
        terminalInput.value = '';
        handleCommand(value);
      });
    }
  }

  // 6. Copy Email Buttons
  const copyButtons = [
    { btnId: 'copy-email-btn', feedback: 'Copied!' },
    { btnId: 'copy-email-hero', feedback: 'Copied email!' }
  ];

  copyButtons.forEach(({ btnId, feedback }) => {
    const el = document.getElementById(btnId);
    if (el) {
      el.addEventListener('click', () => {
        const email = 'lancealmenanza@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
          const originalContent = el.innerHTML;
          el.innerHTML = `<span class="text-emerald-400 font-bold text-xs">${feedback}</span>`;
          setTimeout(() => {
            el.innerHTML = originalContent;
          }, 2000);
        }).catch(() => {
          alert('Email copied: ' + email);
        });
      });
    }
  });

  // 7. Contact Form Simulation
  const contactForm = document.getElementById('contact-form');
  const toastSuccess = document.getElementById('toast-success');
  const toastResetBtn = document.getElementById('toast-reset-btn');

  if (contactForm && toastSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById('submit-btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-slate-950 inline" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> Transmitting...
      `;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
        toastSuccess.classList.remove('hidden');
      }, 700);
    });

    if (toastResetBtn) {
      toastResetBtn.addEventListener('click', () => {
        toastSuccess.classList.add('hidden');
      });
    }
  }

  // =========================================================================
  // 8. Scroll Progress Indicator Bar
  // =========================================================================
  const scrollProgressBar = document.getElementById('scroll-progress');
  if (scrollProgressBar) {
    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgressBar.style.width = scrolled + '%';
      }
    });
  }

  // =========================================================================
  // 9. Intersection Observer for Scroll Reveal Animations
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Optional: unobserve to animate only once
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('active'));
  }

  // =========================================================================
  // 10. Dynamic Typewriter Effect in Hero Subtitle
  // =========================================================================
  const typewriterEl = document.getElementById('typewriter-text');
  if (typewriterEl) {
    const phrases = [
      "Intern @ CloudSwyft",
      "BSIT Student @ UPHSL",
      "UI/UX Designer",
      "Unity Certified Artist",
      "PWA & 3D Enthusiast"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    const type = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 1600; // Pause at end of phrase
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400; // Brief pause before typing next
      }

      setTimeout(type, typingSpeed);
    };

    setTimeout(type, 600);
  }

  // =========================================================================
  // 11. Subtle 3D Tilt Effect on Project Cards
  // =========================================================================
  const tiltCards = document.querySelectorAll('.project-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
});
