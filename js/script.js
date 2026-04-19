// قم بإضافة هذا السطر في <head> قبل الكود الرئيسي

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic (نفس الكود السابق)
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const submitBtn = document.getElementById('submit-btn');
    const messageInput = document.getElementById('message');
    const emailInput = document.querySelector(".email-input");
    const nameInput = document.querySelector(".name-input");
   const formInput = document.querySelector("form"); 
    // ✅ Initialize EmailJS - استبدل YOUR_PUBLIC_KEY بمفتاحك الحقيقي
    emailjs.init("TFMSBH0JY4zVDp6dr");
    
    // Check for saved theme preference
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

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    // Header scroll background
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
    
    // ✅ Handle form submission with EmailJS
    formInput.addEventListener('click' , (event)=> {
    event.preventDefault(); 
           submitBtn.addEventListener('click', async () => {
        event.preventDefault();
        
        const message = messageInput.value.trim();
        
        if (message === '') {
            messageInput.classList.add('error');
            showError(messageInput, 'الرجاء إدخال رسالتك');
        } else {
            messageInput.classList.remove('error');
            
            // Show loading state
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'جاري الإرسال...';
            submitBtn.disabled = true;
            
            try {
                // Send email using EmailJS
                // استبدل YOUR_SERVICE_ID و YOUR_TEMPLATE_ID بقيمك الحقيقية
                const templateParams = {
                    message: message,
                    user_email: `${emailInput.value}`, // يمكنك إضافة حقل إضافي لبريد المستخدم
                    to_email: "aethefifthofjuly@gmail.com",
                    timestamp: new Date().toLocaleString('ar-EG'),
                    name:nameInput.value ,
                    title:"Hello Ahmed Eissa"
                };
                
                const response = await emailjs.send('service_eooljyp', 'template_0fzf69j', templateParams);
                
                console.log('Email sent successfully!', response);
                showSuccessMessage('تم إرسال رسالتك بنجاح! ✅');
                messageInput.value = ''; // Clear input
                
            } catch (error) {
                console.error('Failed to send email:', error);
                showError(messageInput, 'فشل الإرسال. الرجاء المحاولة لاحقاً ❌');
            } finally {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        }
    });
})   // Helper functions (نفس الكود السابق)
    function showError(inputElement, errorMessage) {
        const existingError = inputElement.parentElement.querySelector('.error-message');
        if (existingError) existingError.remove();
        
        const errorSpan = document.createElement('span');
        errorSpan.className = 'error-message';
        errorSpan.style.color = '#f44336';
        errorSpan.style.fontSize = '12px';
        errorSpan.style.marginTop = '5px';
        errorSpan.style.display = 'block';
        errorSpan.textContent = errorMessage;
        
        inputElement.parentElement.appendChild(errorSpan);
        
        setTimeout(() => {
            errorSpan.remove();
            inputElement.classList.remove('error');
        }, 3000);
    }
    
    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.position = 'fixed';
        successDiv.style.bottom = '20px';
        successDiv.style.right = '20px';
        successDiv.style.backgroundColor = '#4caf50';
        successDiv.style.color = 'white';
        successDiv.style.padding = '12px 20px';
        successDiv.style.borderRadius = '8px';
        successDiv.style.zIndex = '9999';
        successDiv.style.fontSize = '14px';
        successDiv.textContent = message;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }
});