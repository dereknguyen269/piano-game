class Tutorial {
    constructor() {
        this.currentStep = 0;
        this.overlay = document.querySelector('.tutorial-overlay');
        this.highlight = document.querySelector('.tutorial-highlight');
        this.tooltip = document.querySelector('.tutorial-tooltip');
        this.progressContainer = document.querySelector('.tutorial-progress');
        this.nextButton = document.querySelector('.tutorial-btn.next');
        this.skipButton = document.querySelector('.tutorial-btn.skip');
        
        this.tutorialSteps = [
            {
                element: '.nav-btn',
                titleKey: 'tutorial_step1_title',
                contentKey: 'tutorial_step1_content',
                position: 'bottom'
            },
            {
                element: '#start-learning-btn',
                titleKey: 'tutorial_step2_title',
                contentKey: 'tutorial_step2_content',
                position: 'top'
            },
            {
                element: '#piano-keyboard',
                titleKey: 'tutorial_step3_title',
                contentKey: 'tutorial_step3_content',
                position: 'top'
            },
            {
                element: '#settings-btn',
                titleKey: 'tutorial_step4_title',
                contentKey: 'tutorial_step4_content',
                position: 'bottom'
            },
            {
                element: '.theme-toggle',
                titleKey: 'tutorial_step5_title',
                contentKey: 'tutorial_step5_content',
                position: 'left'
            }
        ];

        this.init();
    }

    init() {
        // Create progress dots
        this.createProgressDots();

        // Add event listeners
        this.nextButton.addEventListener('click', () => this.nextStep());
        this.skipButton.addEventListener('click', () => this.endTutorial());
        
        // Update button text with translations
        this.updateButtonText();

        // Check if this is the first visit
        if (!localStorage.getItem('tutorialCompleted')) {
            this.startTutorial();
        }
    }
    
    updateButtonText() {
        // Update button text with translations
        this.nextButton.textContent = getTranslation('tutorial_next');
        this.skipButton.textContent = getTranslation('tutorial_skip');
    }

    createProgressDots() {
        this.progressContainer.innerHTML = '';
        for (let i = 0; i < this.tutorialSteps.length; i++) {
            const dot = document.createElement('div');
            dot.className = 'tutorial-dot';
            if (i === this.currentStep) dot.classList.add('active');
            this.progressContainer.appendChild(dot);
        }
    }

    updateProgressDots() {
        const dots = this.progressContainer.querySelectorAll('.tutorial-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentStep);
        });
    }

    positionTooltip(element, position) {
        const elementRect = element.getBoundingClientRect();
        const tooltipRect = this.tooltip.getBoundingClientRect();
        
        // Reset classes
        this.tooltip.className = 'tutorial-tooltip';
        
        let top, left;
        switch (position) {
            case 'top':
                top = elementRect.top - tooltipRect.height - 20;
                left = elementRect.left + (elementRect.width - tooltipRect.width) / 2;
                this.tooltip.classList.add('bottom');
                break;
            case 'bottom':
                top = elementRect.bottom + 20;
                left = elementRect.left + (elementRect.width - tooltipRect.width) / 2;
                this.tooltip.classList.add('top');
                break;
            case 'left':
                top = elementRect.top + (elementRect.height - tooltipRect.height) / 2;
                left = elementRect.left - tooltipRect.width - 20;
                this.tooltip.classList.add('right');
                break;
            case 'right':
                top = elementRect.top + (elementRect.height - tooltipRect.height) / 2;
                left = elementRect.right + 20;
                this.tooltip.classList.add('left');
                break;
        }

        // Ensure tooltip stays within viewport
        const viewport = {
            left: 10,
            right: window.innerWidth - 10,
            top: 10,
            bottom: window.innerHeight - 10
        };

        left = Math.max(viewport.left, Math.min(left, viewport.right - tooltipRect.width));
        top = Math.max(viewport.top, Math.min(top, viewport.bottom - tooltipRect.height));

        this.tooltip.style.top = `${top}px`;
        this.tooltip.style.left = `${left}px`;
    }

    highlightElement(element) {
        const rect = element.getBoundingClientRect();
        this.highlight.style.top = `${rect.top - 5}px`;
        this.highlight.style.left = `${rect.left - 5}px`;
        this.highlight.style.width = `${rect.width + 10}px`;
        this.highlight.style.height = `${rect.height + 10}px`;
    }

    showStep(step) {
        const element = document.querySelector(step.element);
        if (!element) return;

        this.highlightElement(element);
        this.tooltip.querySelector('h3').textContent = getTranslation(step.titleKey);
        this.tooltip.querySelector('p').textContent = getTranslation(step.contentKey);
        this.positionTooltip(element, step.position);
        
        // Update button text for last step
        if (this.currentStep === this.tutorialSteps.length - 1) {
            this.nextButton.textContent = getTranslation('tutorial_finish');
        } else {
            this.nextButton.textContent = getTranslation('tutorial_next');
        }

        this.updateProgressDots();
    }

    startTutorial() {
        this.currentStep = 0;
        this.overlay.classList.add('active');
        // Make sure title is correct
        const tutorialTitle = document.querySelector('.tutorial-modal-title');
        if (tutorialTitle) {
            tutorialTitle.textContent = getTranslation('tutorial_title');
        }
        this.showStep(this.tutorialSteps[0]);
    }

    nextStep() {
        if (this.currentStep < this.tutorialSteps.length - 1) {
            this.currentStep++;
            this.showStep(this.tutorialSteps[this.currentStep]);
        } else {
            this.endTutorial();
        }
    }

    endTutorial() {
        this.overlay.classList.remove('active');
        localStorage.setItem('tutorialCompleted', 'true');
    }

    // Public method to manually start the tutorial
    static startTutorial() {
        const tutorial = new Tutorial();
        tutorial.startTutorial();
    }
}

// Initialize tutorial when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Tutorial();
}); 