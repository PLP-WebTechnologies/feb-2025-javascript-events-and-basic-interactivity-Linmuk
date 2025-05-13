document.addEventListener('DOMContentLoaded', function() {
    // ========== Event Handling ==========
    
    // Button click event
    const clickButton = document.getElementById('click-button');
    const clickOutput = document.getElementById('click-output');
    
    clickButton.addEventListener('click', function() {
        clickOutput.textContent = 'Button was clicked! 🎉';
        clickOutput.style.color = '#2ecc71';
        
        // Reset after 2 seconds
        setTimeout(() => {
            clickOutput.textContent = 'Button not clicked yet';
            clickOutput.style.color = '';
        }, 2000);
    });
    
    // Hover effect
    const hoverBox = document.querySelector('.hover-box');
    const hoverOutput = document.getElementById('hover-output');
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverOutput.textContent = 'Hover detected! ✨';
        hoverOutput.style.color = '#3498db';
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        hoverOutput.textContent = 'Waiting for hover...';
        hoverOutput.style.color = '';
    });
    
    // Keypress detection
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    
    keypressInput.addEventListener('keyup', function(e) {
        keypressOutput.textContent = `You pressed: ${e.key} (Key code: ${e.keyCode})`;
    });
    
    // Secret action (double click or long press)
    const secretBox = document.querySelector('.secret-box');
    const secretOutput = document.getElementById('secret-output');
    let longPressTimer;
    
    // Double click
    secretBox.addEventListener('dblclick', function() {
        secretOutput.textContent = 'You discovered the double-click secret! 🎊';
    });
    
    // Long press
    secretBox.addEventListener('mousedown', function() {
        longPressTimer = setTimeout(function() {
            secretOutput.textContent = 'You found the long press secret! 🕵️‍♂️';
        }, 1000);
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(longPressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(longPressTimer);
    });
    
    // Reset secret message after 3 seconds
    secretBox.addEventListener('click', function() {
        setTimeout(() => {
            secretOutput.textContent = '🤫';
        }, 3000);
    });
    
    // ========== Interactive Elements ==========
    
    // Color changing button
    const colorChanger = document.getElementById('color-changer');
    const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'];
    let colorIndex = 0;
    
    colorChanger.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color: ${colors[colorIndex]}`;
    });
    
    // Image gallery
    const galleryImages = document.querySelectorAll('.image-gallery img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
    }
    
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    // Auto-advance gallery every 3 seconds
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    }, 3000);
    
    // Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // ========== Form Validation ==========
    const form = document.getElementById('validation-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    const formSuccess = document.getElementById('form-success');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            nameError.style.display = 'block';
            return false;
        } else {
            nameError.style.display = 'none';
            return true;
        }
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required';
            emailError.style.display = 'block';
            return false;
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email';
            emailError.style.display = 'block';
            return false;
        } else {
            emailError.style.display = 'none';
            return true;
        }
    }
    
    function validatePassword() {
        if (passwordInput.value.length === 0) {
            passwordError.textContent = 'Password is required';
            passwordError.style.display = 'block';
            updatePasswordStrength(0);
            return false;
        } else if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            passwordError.style.display = 'block';
            updatePasswordStrength(passwordInput.value.length / 8);
            return false;
        } else {
            passwordError.style.display = 'none';
            updatePasswordStrength(1);
            return true;
        }
    }
    
    function updatePasswordStrength(strength) {
        const bar = strengthBar.querySelector('::after') || strengthBar;
        
        if (strength < 0.3) {
            strengthBar.style.setProperty('--strength-color', '#e74c3c');
            strengthText.textContent = 'Weak';
        } else if (strength < 0.7) {
            strengthBar.style.setProperty('--strength-color', '#f39c12');
            strengthText.textContent = 'Medium';
        } else {
            strengthBar.style.setProperty('--strength-color', '#2ecc71');
            strengthText.textContent = 'Strong';
        }
        
        strengthBar.style.setProperty('--strength-width', `${strength * 100}%`);
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            // In a real app, you would send the form data to a server here
            form.style.display = 'none';
            formSuccess.classList.remove('hidden');
            
            // Reset form after 3 seconds (for demo purposes)
            setTimeout(() => {
                form.style.display = 'block';
                formSuccess.classList.add('hidden');
                form.reset();
            }, 3000);
        }
    });
});