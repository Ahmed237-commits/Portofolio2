document.addEventListener('DOMContentLoaded', () => {
    // ─── EmailJS Init ───────────────────────────────────────────────
    emailjs.init("TFMSBH0JY4zVDp6dr");

    // ─── Theme Toggle ───────────────────────────────────────────────
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
// Add The Buttons Of The Cards
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {

    const info = card.querySelector('.project-info');

    info.addEventListener('click', () => {

        // اسم المشروع
        const projectName = card.querySelector('h3').textContent.trim();

        // متغير الرابط
        let githubLink = "";

        // الشروط
        if (projectName === "Healthy-Life") {

            githubLink = "https://github.com/Ahmed237-commits/My-Project";

        } else if (projectName === "Code Mastery Zone") {

            githubLink = "https://github.com/Ahmed237-commits/code-mastery-zone";

        } else if (projectName === "E-Commerce") {

            githubLink = "https://github.com/Ahmed237-commits/e-commerce";

        }

        // SweetAlert
        Swal.fire({
            title: projectName,
            text: "Do you want to go to GitHub to see this project?",
            icon: "question",

            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            reverseButtons: true,

            confirmButtonText: `
                <i class="fa-brands fa-github"></i> Open GitHub
            `,

            cancelButtonText: `
                <i class="fa-solid fa-xmark"></i> Cancel
            `,

            confirmButtonColor: "#171515",
            cancelButtonColor: "#ef4444"

        }).then((result) => {

            if (result.isConfirmed && githubLink !== "") {

                window.open(githubLink, "_blank");

            }

        });

    });

});
const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
updateToggleIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleIcon(newTheme);
    });

    function updateToggleIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'light') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // ─── Mobile Menu ────────────────────────────────────────────────
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    // ─── Header on Scroll ───────────────────────────────────────────
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ─── Scroll Animations ──────────────────────────────────────────
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // ─── Skill Bars Animation ───────────────────────────────────────
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                    const target = bar.getAttribute('data-width');
                    setTimeout(() => { bar.style.width = target; }, 200);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-category').forEach(el => skillObserver.observe(el));

    // ─── Typing Effect in Hero ──────────────────────────────────────
    const titleEl = document.querySelector('.hero .title');
    if (titleEl) {
        const words = ['Full-Stack Developer', 'Backend Engineer', 'Frontend Craftsman', 'Problem Solver'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                titleEl.textContent = currentWord.substring(0, charIndex--);
            } else {
                titleEl.textContent = currentWord.substring(0, charIndex++);
            }

            if (!isDeleting && charIndex === currentWord.length + 1) {
                isDeleting = true;
                setTimeout(type, 1800);
                return;
            }
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
            setTimeout(type, isDeleting ? 60 : 100);
        }
        type();
    }

    // ─── Contact Form with EmailJS ──────────────────────────────────
    const submitBtn = document.getElementById('submit-btn');
    const messageInput = document.getElementById('message');
    const emailInput = document.querySelector('.email-input');
    const nameInput = document.querySelector('.name-input');
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        // Use submit event on the form — this is the correct approach
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            // Basic validation
            let hasError = false;

            if (name === '') {
                showError(nameInput, 'الرجاء إدخال اسمك');
                hasError = true;
            }
            if (email === '') {
                showError(emailInput, 'الرجاء إدخال بريدك الإلكتروني');
                hasError = true;
            }
            if (message === '') {
                showError(messageInput, 'الرجاء إدخال رسالتك');
                hasError = true;
            }

            if (hasError) return;

            // Loading state
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'جاري الإرسال...';
            submitBtn.disabled = true;

            try {
                const templateParams = {
                    name: name,
                    user_email: email,
                    to_email: 'aethefifthofjuly@gmail.com',
                    message: message,
                    timestamp: new Date().toLocaleString('ar-EG'),
                    title: 'Hello Ahmed Eissa'
                };

                const response = await emailjs.send('service_eooljyp', 'template_0fzf69j', templateParams);
                console.log('Email sent!', response);

                showSuccessMessage('تم إرسال رسالتك بنجاح! ✅');
                contactForm.reset();

            } catch (error) {
                console.error('EmailJS error:', error);
                showError(messageInput, 'فشل الإرسال. الرجاء المحاولة لاحقاً ❌');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // ─── Helpers ────────────────────────────────────────────────────
    function showError(inputEl, msg) {
        const existing = inputEl.parentElement.querySelector('.error-message');
        if (existing) existing.remove();

        const span = document.createElement('span');
        span.className = 'error-message';
        span.style.cssText = 'color:#f44336;font-size:12px;margin-top:5px;display:block;';
        span.textContent = msg;
        inputEl.parentElement.appendChild(span);
        inputEl.classList.add('error');

        setTimeout(() => {
            span.remove();
            inputEl.classList.remove('error');
        }, 3000);
    }

    function showSuccessMessage(msg) {
        const div = document.createElement('div');
        div.style.cssText = `
            position:fixed; bottom:20px; right:20px;
            background:#10b981; color:#fff;
            padding:14px 22px; border-radius:10px;
            z-index:9999; font-size:14px;
            box-shadow: 0 4px 20px rgba(16,185,129,0.4);
            animation: slideIn 0.3s ease;
        `;
        div.textContent = msg;
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 3500);
    }

});