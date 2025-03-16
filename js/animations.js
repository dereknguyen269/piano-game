/**
 * Animations Module
 * Adds modern animations and visual enhancements to the piano app
 */

class Animations {
    constructor() {
        // Theme state
        this.darkTheme = localStorage.getItem('darkTheme') === 'true';
        
        // Initialize
        this.init();
    }
    
    /**
     * Initialize animations
     */
    init() {
        // Apply initial animations
        this.applyInitialAnimations();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize theme
        this.initTheme();
    }
    
    /**
     * Initialize theme
     */
    initTheme() {
        // Apply saved theme
        if (this.darkTheme) {
            document.documentElement.classList.add('dark-theme');
        } else {
            document.documentElement.classList.remove('dark-theme');
        }
        
        // Set up theme toggle in corner
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
        
        // Set up theme toggle in settings
        const themeToggleSetting = document.getElementById('theme-toggle-setting');
        if (themeToggleSetting) {
            // Set initial state
            themeToggleSetting.checked = this.darkTheme;
            
            // Add event listener
            themeToggleSetting.addEventListener('change', () => {
                // Only toggle if the state is different
                if (themeToggleSetting.checked !== this.darkTheme) {
                    this.toggleTheme();
                }
            });
        }
    }
    
    /**
     * Toggle between light and dark theme
     */
    toggleTheme() {
        this.darkTheme = !this.darkTheme;
        
        // Save preference
        localStorage.setItem('darkTheme', this.darkTheme);
        
        // Apply theme
        if (this.darkTheme) {
            document.documentElement.classList.add('dark-theme');
        } else {
            document.documentElement.classList.remove('dark-theme');
        }
        
        // Update settings toggle if it exists
        const themeToggleSetting = document.getElementById('theme-toggle-setting');
        if (themeToggleSetting) {
            themeToggleSetting.checked = this.darkTheme;
        }
        
        // Show notification
        const message = this.darkTheme ? 'Dark theme enabled' : 'Light theme enabled';
        this.showNotification(message);
    }
    
    /**
     * Show notification
     */
    showNotification(message, duration = 3000) {
        // Clear any existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Set timeout to remove notification
        setTimeout(() => {
            notification.addEventListener('animationend', () => {
                notification.remove();
            });
        }, duration);
    }
    
    /**
     * Apply initial animations to elements
     */
    applyInitialAnimations() {
        // Add staggered animation classes to lesson cards
        document.querySelectorAll('.lesson-card').forEach((card, index) => {
            card.classList.add('staggered-item');
        });
        
        // Add staggered animation to practice options
        document.querySelectorAll('.practice-option').forEach((option, index) => {
            option.classList.add('staggered-item');
        });
        
        // Add staggered animation to challenge cards
        document.querySelectorAll('.challenge-card').forEach((card, index) => {
            card.classList.add('staggered-item');
        });
        
        // Add staggered animation to setting groups
        document.querySelectorAll('.setting-group').forEach((item, index) => {
            item.classList.add('staggered-item');
        });
        
        // Add fade-in animation to welcome container
        const welcomeContainer = document.querySelector('.welcome-container');
        if (welcomeContainer) {
            welcomeContainer.classList.add('fade-in');
        }
        
        // Add pulse animation to call-to-action buttons
        document.querySelectorAll('.btn-primary').forEach(button => {
            button.classList.add('pulse');
        });
    }
    
    /**
     * Set up event listeners for animations
     */
    setupEventListeners() {
        // Add hover effects to navigation buttons
        document.querySelectorAll('.nav-btn').forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.classList.add('pulse');
            });
            
            button.addEventListener('mouseleave', () => {
                button.classList.remove('pulse');
            });
        });
        
        // Add hover effects to lesson cards
        document.querySelectorAll('.lesson-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.01)';
                card.style.boxShadow = 'var(--box-shadow-hover)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        });
        
        // Add hover effects to practice options
        document.querySelectorAll('.practice-option').forEach(option => {
            option.addEventListener('mouseenter', () => {
                option.style.transform = 'translateY(-5px)';
                option.style.boxShadow = 'var(--box-shadow-hover)';
            });
            
            option.addEventListener('mouseleave', () => {
                option.style.transform = '';
                option.style.boxShadow = '';
            });
        });
        
        // Add hover effects to buttons
        document.querySelectorAll('.btn').forEach(button => {
            if (!button.classList.contains('nav-btn')) { // Skip nav buttons as they're handled above
                button.addEventListener('mouseenter', () => {
                    button.style.transform = 'translateY(-3px)';
                    button.style.boxShadow = '0 6px 15px rgba(67, 97, 238, 0.4)';
                });
                
                button.addEventListener('mouseleave', () => {
                    button.style.transform = '';
                    button.style.boxShadow = '';
                });
            }
        });
        
        // Add screen transition effects
        document.querySelectorAll('.nav-btn').forEach(button => {
            button.addEventListener('click', () => {
                this.handleScreenTransition(button);
            });
        });
        
        // Add piano key animation enhancements
        this.enhancePianoKeyAnimations();
    }
    
    /**
     * Handle screen transitions
     */
    handleScreenTransition(button) {
        const targetScreenId = button.id.replace('-btn', '-screen');
        const targetScreen = document.getElementById(targetScreenId);
        
        if (!targetScreen) return;
        
        // Reset staggered animations
        this.resetStaggeredAnimations();
        
        // Add fade-in class to target screen
        targetScreen.classList.add('fade-in');
    }
    
    /**
     * Reset staggered animations
     */
    resetStaggeredAnimations() {
        // Remove and re-add staggered-item class to reset animations
        document.querySelectorAll('.staggered-item').forEach(item => {
            item.classList.remove('staggered-item');
            // Force reflow
            void item.offsetWidth;
            item.classList.add('staggered-item');
        });
    }
    
    /**
     * Enhance piano key animations
     */
    enhancePianoKeyAnimations() {
        // Add enhanced animations for piano keys
        document.querySelectorAll('.piano-key').forEach(key => {
            // Add active state animation
            key.addEventListener('mousedown', () => {
                this.animatePianoKeyPress(key);
            });
            
            key.addEventListener('mouseup', () => {
                this.animatePianoKeyRelease(key);
            });
            
            key.addEventListener('mouseleave', () => {
                if (key.classList.contains('active')) {
                    this.animatePianoKeyRelease(key);
                }
            });
        });
        
        // Listen for keyboard events to animate corresponding piano keys
        document.addEventListener('keydown', (event) => {
            if (event.repeat) return; // Ignore key repeat events
            
            const keyMapping = this.getPianoKeyMapping();
            const note = keyMapping[event.key.toLowerCase()];
            
            if (note) {
                const pianoKey = document.querySelector(`.piano-key[data-note="${note}"]`);
                if (pianoKey) {
                    this.animatePianoKeyPress(pianoKey);
                }
            }
        });
        
        document.addEventListener('keyup', (event) => {
            const keyMapping = this.getPianoKeyMapping();
            const note = keyMapping[event.key.toLowerCase()];
            
            if (note) {
                const pianoKey = document.querySelector(`.piano-key[data-note="${note}"]`);
                if (pianoKey) {
                    this.animatePianoKeyRelease(pianoKey);
                }
            }
        });
    }
    
    /**
     * Animate piano key press
     */
    animatePianoKeyPress(key) {
        // Add active class
        key.classList.add('active');
        
        // Add 3D press effect
        if (key.classList.contains('white-key')) {
            key.style.transform = 'translateY(4px)';
            key.style.boxShadow = '0 1px 1px rgba(0, 0, 0, 0.3)';
        } else {
            key.style.transform = 'translateY(3px)';
            key.style.boxShadow = '0 1px 1px rgba(0, 0, 0, 0.5)';
        }
    }
    
    /**
     * Animate piano key release
     */
    animatePianoKeyRelease(key) {
        // Remove active class
        key.classList.remove('active');
        
        // Reset transform and box-shadow
        key.style.transform = '';
        key.style.boxShadow = '';
    }
    
    /**
     * Get piano key mapping
     */
    getPianoKeyMapping() {
        return {
            'a': 'C4',
            'w': 'C#4',
            's': 'D4',
            'e': 'D#4',
            'd': 'E4',
            'f': 'F4',
            't': 'F#4',
            'g': 'G4',
            'y': 'G#4',
            'h': 'A4',
            'u': 'A#4',
            'j': 'B4',
            'k': 'C5',
            'o': 'C#5',
            'l': 'D5',
            'p': 'D#5',
            ';': 'E5',
            '\'': 'F5',
            ']': 'F#5',
            '\\': 'G5',
            'z': 'C3',
            'x': 'D3',
            'c': 'E3',
            'v': 'F3',
            'b': 'G3',
            'n': 'A3',
            'm': 'B3',
        };
    }
    
    /**
     * Show loading spinner
     */
    showLoading(container) {
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        
        // Clear container and add spinner
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        
        if (container) {
            container.innerHTML = '';
            container.appendChild(spinner);
        }
        
        return spinner;
    }
    
    /**
     * Hide loading spinner
     */
    hideLoading(spinner) {
        if (spinner && spinner.parentNode) {
            spinner.parentNode.removeChild(spinner);
        }
    }
    
    /**
     * Show progress animation
     */
    showProgressAnimation(container) {
        const progress = document.createElement('div');
        progress.className = 'progress-animation';
        
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        
        if (container) {
            container.style.position = 'relative';
            container.appendChild(progress);
        }
        
        return progress;
    }
}

// Create animations instance when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.animations = new Animations();
}); 