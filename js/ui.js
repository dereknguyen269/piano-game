/**
 * UI Functionality
 * Handles general UI interactions and navigation
 */

class UI {
    constructor() {
        // Navigation buttons
        this.navButtons = document.querySelectorAll('.nav-btn');
        this.screens = document.querySelectorAll('.screen');
        
        // Practice options
        this.practiceOptions = document.querySelectorAll('.practice-option');
        
        // Settings
        this.resetProgressBtn = document.getElementById('reset-progress-btn');
        this.resetAllBtn = document.getElementById('reset-all-btn');
        this.pianoSoundTypeSelect = document.getElementById('piano-sound-type');
        this.soundQualitySelect = document.getElementById('sound-quality');
        this.oscillatorTypeSelect = document.getElementById('oscillator-type');
        this.monophonicModeCheckbox = document.getElementById('monophonic-mode');
        this.noteCutoffCheckbox = document.getElementById('note-cutoff');
        this.synthesizerSettings = document.querySelectorAll('.synthesizer-settings');
        this.languageSelector = document.getElementById('language-selector');
        
        // Initialize
        this.init();
    }
    
    /**
     * Initialize UI
     */
    init() {
        // Set up event listeners
        this.setupEventListeners();
        
        // Load settings
        this.loadSettings();
    }
    
    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Navigation buttons
        this.navButtons.forEach(button => {
            button.addEventListener('click', this.handleNavigation.bind(this));
        });
        
        // Practice options
        this.practiceOptions.forEach(option => {
            option.addEventListener('click', this.handlePracticeOption.bind(this));
        });
        
        // Reset progress button
        if (this.resetProgressBtn) {
            this.resetProgressBtn.addEventListener('click', this.handleResetProgress.bind(this));
        }
        
        // Reset all settings button
        if (this.resetAllBtn) {
            this.resetAllBtn.addEventListener('click', this.handleResetAll.bind(this));
        }
        
        // Piano sound type select
        if (this.pianoSoundTypeSelect) {
            this.pianoSoundTypeSelect.addEventListener('change', this.handlePianoSoundTypeChange.bind(this));
            
            // Set initial value from localStorage
            const savedSoundType = localStorage.getItem('pianoSoundType');
            if (savedSoundType) {
                this.pianoSoundTypeSelect.value = savedSoundType;
                this.toggleSynthesizerSettings(savedSoundType === 'synthesized');
            }
        }
        
        // Sound quality select
        if (this.soundQualitySelect) {
            this.soundQualitySelect.addEventListener('change', this.handleSoundQualityChange.bind(this));
            
            // Set initial value from localStorage
            const savedQuality = localStorage.getItem('soundQuality');
            if (savedQuality) {
                this.soundQualitySelect.value = savedQuality;
            }
        }
        
        // Oscillator type select
        if (this.oscillatorTypeSelect) {
            this.oscillatorTypeSelect.addEventListener('change', this.handleOscillatorTypeChange.bind(this));
            
            // Set initial value from localStorage
            const savedType = localStorage.getItem('oscillatorType');
            if (savedType) {
                this.oscillatorTypeSelect.value = savedType;
            }
        }
        
        // Monophonic mode checkbox
        if (this.monophonicModeCheckbox) {
            this.monophonicModeCheckbox.addEventListener('change', this.handleMonophonicModeChange.bind(this));
            
            // Set initial value from localStorage
            const savedMode = localStorage.getItem('monophonicMode');
            if (savedMode) {
                this.monophonicModeCheckbox.checked = savedMode === 'true';
            }
        }
        
        // Note cutoff checkbox
        if (this.noteCutoffCheckbox) {
            this.noteCutoffCheckbox.addEventListener('change', this.handleNoteCutoffChange.bind(this));
            
            // Set initial value from localStorage
            const savedCutoff = localStorage.getItem('noteCutoff');
            if (savedCutoff) {
                this.noteCutoffCheckbox.checked = savedCutoff === 'true';
            }
        }
        
        // Language selector
        if (this.languageSelector) {
            this.languageSelector.addEventListener('change', this.handleLanguageChange.bind(this));
            
            // Set initial value from localStorage
            const savedLanguage = localStorage.getItem('language');
            if (savedLanguage) {
                this.languageSelector.value = savedLanguage;
            }
        }
        
        // Restart tutorial button
        document.getElementById('restart-tutorial-btn').addEventListener('click', () => {
            Tutorial.startTutorial();
        });
    }
    
    /**
     * Handle navigation button clicks
     */
    handleNavigation(event) {
        const buttonId = event.target.id;
        
        // Update active button
        this.navButtons.forEach(button => {
            button.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Show corresponding screen
        const screenId = buttonId.replace('-btn', '-screen');
        this.screens.forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }
    
    /**
     * Handle practice option clicks
     */
    handlePracticeOption(event) {
        const optionId = event.currentTarget.id;
        
        // Handle different practice options
        switch (optionId) {
            case 'free-play':
                this.startFreePlay();
                break;
            case 'scales-practice':
                this.startScalesPractice();
                break;
            case 'chord-practice':
                this.startChordPractice();
                break;
        }
    }
    
    /**
     * Start free play mode
     */
    startFreePlay() {
        // Show lesson player screen with free play mode
        this.screens.forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById('lesson-player-screen').classList.add('active');
        
        // Update lesson title and instructions
        document.getElementById('lesson-title').textContent = getTranslation('free_play_title');
        document.getElementById('lesson-instructions').innerHTML = `
            <h3>${getTranslation('free_play_title')}</h3>
            <p>${getTranslation('free_play_instructions')}</p>
            <p>${getTranslation('keyboard_mapping')}</p>
            <ul>
                <li>${getTranslation('keyboard_mapping_lower')}</li>
                <li>${getTranslation('keyboard_mapping_upper')}</li>
                <li>${getTranslation('keyboard_mapping_black')}</li>
            </ul>
        `;
        
        // Clear sheet music container
        document.getElementById('sheet-music-container').innerHTML = '';
        
        // Update lesson controls
        document.getElementById('play-demo-btn').style.display = 'none';
        document.getElementById('restart-lesson-btn').style.display = 'none';
        document.getElementById('next-lesson-btn').style.display = 'none';
        document.getElementById('back-to-lessons-btn').textContent = '← ' + getTranslation('back_to_practice');
        
        // Update back button to return to practice screen
        const backButton = document.getElementById('back-to-lessons-btn');
        const originalClickHandler = backButton.onclick;
        
        backButton.onclick = () => {
            // Show practice screen
            this.screens.forEach(screen => {
                screen.classList.remove('active');
            });
            document.getElementById('practice-screen').classList.add('active');
            
            // Reset back button
            document.getElementById('back-to-lessons-btn').textContent = '← ' + getTranslation('back_to_lessons');
            backButton.onclick = originalClickHandler;
            
            // Reset lesson controls
            document.getElementById('play-demo-btn').style.display = 'block';
            document.getElementById('restart-lesson-btn').style.display = 'block';
            document.getElementById('next-lesson-btn').style.display = 'block';
        };
    }
    
    /**
     * Start scales practice mode
     */
    startScalesPractice() {
        // Show lesson player screen with scales practice mode
        this.screens.forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById('lesson-player-screen').classList.add('active');
        
        // Update lesson title and instructions
        document.getElementById('lesson-title').textContent = 'Scales Practice';
        document.getElementById('lesson-instructions').innerHTML = `
            <h3>Scales Practice</h3>
            <p>Practice common scales to improve your technique and familiarity with different keys.</p>
            <p>Select a scale to practice:</p>
            <div class="scale-selector">
                <button class="scale-btn active" data-scale="c-major">C Major</button>
                <button class="scale-btn" data-scale="g-major">G Major</button>
                <button class="scale-btn" data-scale="f-major">F Major</button>
                <button class="scale-btn" data-scale="a-minor">A Minor</button>
            </div>
            <p>Current scale: <span id="current-scale-name">C Major</span></p>
            <p>Notes: <span id="current-scale-notes">C - D - E - F - G - A - B - C</span></p>
        `;
        
        // Clear sheet music container
        document.getElementById('sheet-music-container').innerHTML = '';
        
        // Update lesson controls
        document.getElementById('play-demo-btn').style.display = 'block';
        document.getElementById('play-demo-btn').textContent = 'Play Scale';
        document.getElementById('restart-lesson-btn').style.display = 'none';
        document.getElementById('next-lesson-btn').style.display = 'none';
        document.getElementById('back-to-lessons-btn').textContent = '← Back to Practice';
        
        // Set up scale selector buttons
        const scaleButtons = document.querySelectorAll('.scale-btn');
        scaleButtons.forEach(button => {
            button.addEventListener('click', this.handleScaleSelection.bind(this));
        });
        
        // Highlight C major scale keys by default
        const cMajorScale = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
        cMajorScale.forEach(note => {
            const keyElement = document.querySelector(`.piano-key[data-note="${note}"]`);
            if (keyElement) {
                keyElement.classList.add('highlight');
            }
        });
        
        // Update play demo button to play the selected scale
        const playDemoBtn = document.getElementById('play-demo-btn');
        playDemoBtn.onclick = () => {
            const activeScaleBtn = document.querySelector('.scale-btn.active');
            if (activeScaleBtn) {
                const scaleType = activeScaleBtn.dataset.scale;
                this.playScale(scaleType);
            }
        };
        
        // Update back button to return to practice screen
        const backButton = document.getElementById('back-to-lessons-btn');
        const originalClickHandler = backButton.onclick;
        
        backButton.onclick = () => {
            // Show practice screen
            this.screens.forEach(screen => {
                screen.classList.remove('active');
            });
            document.getElementById('practice-screen').classList.add('active');
            
            // Reset back button
            document.getElementById('back-to-lessons-btn').textContent = '← Back to Lessons';
            backButton.onclick = originalClickHandler;
            
            // Reset lesson controls
            document.getElementById('play-demo-btn').style.display = 'block';
            document.getElementById('play-demo-btn').textContent = 'Play Demo';
            document.getElementById('restart-lesson-btn').style.display = 'block';
            document.getElementById('next-lesson-btn').style.display = 'block';
            
            // Remove key highlights
            document.querySelectorAll('.piano-key.highlight').forEach(key => {
                key.classList.remove('highlight');
            });
        };
    }
    
    /**
     * Handle scale selection
     */
    handleScaleSelection(event) {
        // Update active scale button
        document.querySelectorAll('.scale-btn').forEach(button => {
            button.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Get selected scale
        const scaleType = event.target.dataset.scale;
        
        // Remove existing key highlights
        document.querySelectorAll('.piano-key.highlight').forEach(key => {
            key.classList.remove('highlight');
        });
        
        // Update scale information and highlight keys
        let scaleName = '';
        let scaleNotes = [];
        let scaleNoteNames = '';
        
        switch (scaleType) {
            case 'c-major':
                scaleName = 'C Major';
                scaleNotes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
                scaleNoteNames = 'C - D - E - F - G - A - B - C';
                break;
            case 'g-major':
                scaleName = 'G Major';
                scaleNotes = ['G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F#5', 'G5'];
                scaleNoteNames = 'G - A - B - C - D - E - F# - G';
                break;
            case 'f-major':
                scaleName = 'F Major';
                scaleNotes = ['F4', 'G4', 'A4', 'A#4', 'C5', 'D5', 'E5', 'F5'];
                scaleNoteNames = 'F - G - A - Bb - C - D - E - F';
                break;
            case 'a-minor':
                scaleName = 'A Minor';
                scaleNotes = ['A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5'];
                scaleNoteNames = 'A - B - C - D - E - F - G - A';
                break;
        }
        
        // Update scale information
        document.getElementById('current-scale-name').textContent = scaleName;
        document.getElementById('current-scale-notes').textContent = scaleNoteNames;
        
        // Highlight scale keys
        scaleNotes.forEach(note => {
            const keyElement = document.querySelector(`.piano-key[data-note="${note}"]`);
            if (keyElement) {
                keyElement.classList.add('highlight');
            }
        });
    }
    
    /**
     * Play a scale
     */
    playScale(scaleType) {
        if (!window.piano) return;
        
        let scaleNotes = [];
        
        switch (scaleType) {
            case 'c-major':
                scaleNotes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4'];
                break;
            case 'g-major':
                scaleNotes = ['G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F#5', 'G5', 'F#5', 'E5', 'D5', 'C5', 'B4', 'A4', 'G4'];
                break;
            case 'f-major':
                scaleNotes = ['F4', 'G4', 'A4', 'A#4', 'C5', 'D5', 'E5', 'F5', 'E5', 'D5', 'C5', 'A#4', 'A4', 'G4', 'F4'];
                break;
            case 'a-minor':
                scaleNotes = ['A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'G5', 'F5', 'E5', 'D5', 'C5', 'B4', 'A4'];
                break;
        }
        
        // Play the scale
        window.piano.playSequence(scaleNotes, 120); // 120 BPM
    }
    
    /**
     * Start chord practice mode
     */
    startChordPractice() {
        // Show lesson player screen with chord practice mode
        this.screens.forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById('lesson-player-screen').classList.add('active');
        
        // Update lesson title and instructions
        document.getElementById('lesson-title').textContent = 'Chord Practice';
        document.getElementById('lesson-instructions').innerHTML = `
            <h3>Chord Practice</h3>
            <p>Practice common chords to improve your harmony skills.</p>
            <p>Select a chord to practice:</p>
            <div class="chord-selector">
                <button class="chord-btn active" data-chord="c-major">C Major</button>
                <button class="chord-btn" data-chord="f-major">F Major</button>
                <button class="chord-btn" data-chord="g-major">G Major</button>
                <button class="chord-btn" data-chord="a-minor">A Minor</button>
                <button class="chord-btn" data-chord="e-minor">E Minor</button>
                <button class="chord-btn" data-chord="d-minor">D Minor</button>
            </div>
            <p>Current chord: <span id="current-chord-name">C Major</span></p>
            <p>Notes: <span id="current-chord-notes">C - E - G</span></p>
        `;
        
        // Clear sheet music container
        document.getElementById('sheet-music-container').innerHTML = '';
        
        // Update lesson controls
        document.getElementById('play-demo-btn').style.display = 'block';
        document.getElementById('play-demo-btn').textContent = 'Play Chord';
        document.getElementById('restart-lesson-btn').style.display = 'none';
        document.getElementById('next-lesson-btn').style.display = 'none';
        document.getElementById('back-to-lessons-btn').textContent = '← Back to Practice';
        
        // Set up chord selector buttons
        const chordButtons = document.querySelectorAll('.chord-btn');
        chordButtons.forEach(button => {
            button.addEventListener('click', this.handleChordSelection.bind(this));
        });
        
        // Highlight C major chord keys by default
        const cMajorChord = ['C4', 'E4', 'G4'];
        cMajorChord.forEach(note => {
            const keyElement = document.querySelector(`.piano-key[data-note="${note}"]`);
            if (keyElement) {
                keyElement.classList.add('highlight');
            }
        });
        
        // Update play demo button to play the selected chord
        const playDemoBtn = document.getElementById('play-demo-btn');
        playDemoBtn.onclick = () => {
            const activeChordBtn = document.querySelector('.chord-btn.active');
            if (activeChordBtn) {
                const chordType = activeChordBtn.dataset.chord;
                this.playChord(chordType);
            }
        };
        
        // Update back button to return to practice screen
        const backButton = document.getElementById('back-to-lessons-btn');
        const originalClickHandler = backButton.onclick;
        
        backButton.onclick = () => {
            // Show practice screen
            this.screens.forEach(screen => {
                screen.classList.remove('active');
            });
            document.getElementById('practice-screen').classList.add('active');
            
            // Reset back button
            document.getElementById('back-to-lessons-btn').textContent = '← Back to Lessons';
            backButton.onclick = originalClickHandler;
            
            // Reset lesson controls
            document.getElementById('play-demo-btn').style.display = 'block';
            document.getElementById('play-demo-btn').textContent = 'Play Demo';
            document.getElementById('restart-lesson-btn').style.display = 'block';
            document.getElementById('next-lesson-btn').style.display = 'block';
            
            // Remove key highlights
            document.querySelectorAll('.piano-key.highlight').forEach(key => {
                key.classList.remove('highlight');
            });
        };
    }
    
    /**
     * Handle chord selection
     */
    handleChordSelection(event) {
        // Update active chord button
        document.querySelectorAll('.chord-btn').forEach(button => {
            button.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Get selected chord
        const chordType = event.target.dataset.chord;
        
        // Remove existing key highlights
        document.querySelectorAll('.piano-key.highlight').forEach(key => {
            key.classList.remove('highlight');
        });
        
        // Update chord information and highlight keys
        let chordName = '';
        let chordNotes = [];
        let chordNoteNames = '';
        
        switch (chordType) {
            case 'c-major':
                chordName = 'C Major';
                chordNotes = ['C4', 'E4', 'G4'];
                chordNoteNames = 'C - E - G';
                break;
            case 'f-major':
                chordName = 'F Major';
                chordNotes = ['F4', 'A4', 'C5'];
                chordNoteNames = 'F - A - C';
                break;
            case 'g-major':
                chordName = 'G Major';
                chordNotes = ['G4', 'B4', 'D5'];
                chordNoteNames = 'G - B - D';
                break;
            case 'a-minor':
                chordName = 'A Minor';
                chordNotes = ['A4', 'C5', 'E5'];
                chordNoteNames = 'A - C - E';
                break;
            case 'e-minor':
                chordName = 'E Minor';
                chordNotes = ['E4', 'G4', 'B4'];
                chordNoteNames = 'E - G - B';
                break;
            case 'd-minor':
                chordName = 'D Minor';
                chordNotes = ['D4', 'F4', 'A4'];
                chordNoteNames = 'D - F - A';
                break;
        }
        
        // Update chord information
        document.getElementById('current-chord-name').textContent = chordName;
        document.getElementById('current-chord-notes').textContent = chordNoteNames;
        
        // Highlight chord keys
        chordNotes.forEach(note => {
            const keyElement = document.querySelector(`.piano-key[data-note="${note}"]`);
            if (keyElement) {
                keyElement.classList.add('highlight');
            }
        });
    }
    
    /**
     * Play a chord
     */
    playChord(chordType) {
        if (!window.piano) return;
        
        let chordNotes = [];
        
        switch (chordType) {
            case 'c-major':
                chordNotes = ['C4', 'E4', 'G4'];
                break;
            case 'f-major':
                chordNotes = ['F4', 'A4', 'C5'];
                break;
            case 'g-major':
                chordNotes = ['G4', 'B4', 'D5'];
                break;
            case 'a-minor':
                chordNotes = ['A4', 'C5', 'E5'];
                break;
            case 'e-minor':
                chordNotes = ['E4', 'G4', 'B4'];
                break;
            case 'd-minor':
                chordNotes = ['D4', 'F4', 'A4'];
                break;
        }
        
        // Play the chord
        window.piano.playChord(chordNotes, 2); // 2 seconds duration
    }
    
    /**
     * Handle sound quality change
     */
    handleSoundQualityChange(event) {
        const quality = event.target.value;
        localStorage.setItem('soundQuality', quality);
        
        // Update piano instance if it exists
        if (window.piano) {
            window.piano.soundQuality = quality;
        }
        
        // Show notification
        this.showNotification(`Sound quality set to ${quality}`);
    }
    
    /**
     * Handle oscillator type change
     */
    handleOscillatorTypeChange(event) {
        const type = event.target.value;
        localStorage.setItem('oscillatorType', type);
        
        // Update piano instance if it exists
        if (window.piano) {
            window.piano.oscillatorType = type;
        }
        
        // Show notification
        this.showNotification(`Piano tone set to ${type}`);
    }
    
    /**
     * Handle monophonic mode change
     */
    handleMonophonicModeChange(event) {
        const isMonophonic = event.target.checked;
        localStorage.setItem('monophonicMode', isMonophonic);
        
        // Update piano instance if it exists
        if (window.piano) {
            window.piano.monophonicMode = isMonophonic;
            
            // If turning on monophonic mode, stop all currently playing notes
            if (isMonophonic) {
                window.piano.stopAllNotes();
            }
        }
        
        // Show notification
        this.showNotification(`Monophonic mode ${isMonophonic ? 'enabled' : 'disabled'}`);
    }
    
    /**
     * Handle piano sound type change
     */
    handlePianoSoundTypeChange(event) {
        const soundType = event.target.value;
        localStorage.setItem('pianoSoundType', soundType);
        
        // Toggle synthesizer settings visibility
        this.toggleSynthesizerSettings(soundType === 'synthesized');
        
        // Show notification
        this.showNotification(`Piano sound changed to ${soundType === 'synthesized' ? 'synthesized' : 'sampled piano'}`);
        
        // Stop any currently playing notes
        if (window.piano) {
            window.piano.stopAllNotes();
        }
        
        // Update piano instance if it exists
        if (window.piano) {
            window.piano.pianoSoundType = soundType;
        }
    }
    
    /**
     * Toggle synthesizer settings visibility
     */
    toggleSynthesizerSettings(show) {
        this.synthesizerSettings.forEach(setting => {
            setting.style.display = show ? 'flex' : 'none';
        });
    }
    
    /**
     * Handle note cutoff change
     */
    handleNoteCutoffChange(event) {
        const noteCutoff = event.target.checked;
        localStorage.setItem('noteCutoff', noteCutoff);
        
        // Update piano instance
        if (window.piano) {
            window.piano.noteCutoff = noteCutoff;
        }
        
        // Show notification
        this.showNotification(`Note cutoff ${noteCutoff ? 'enabled' : 'disabled'}`);
    }
    
    /**
     * Show notification
     */
    showNotification(message, duration = 3000, type = 'success') {
        // Clear any existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Make notification dismissible with click
        notification.addEventListener('click', () => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Remove after duration
        if (duration > 0) {
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, duration);
        }
    }
    
    /**
     * Create a modal dialog
     */
    createModal(title, content, buttons) {
        // Create modal element
        const modal = document.createElement('div');
        modal.className = 'modal';
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        // Create modal header
        const modalHeader = document.createElement('div');
        modalHeader.className = 'modal-header';
        modalHeader.innerHTML = `<h3>${title}</h3>`;
        
        // Create close button
        const closeButton = document.createElement('button');
        closeButton.className = 'close-button';
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', () => modal.remove());
        modalHeader.appendChild(closeButton);
        
        // Create modal body
        const modalBody = document.createElement('div');
        modalBody.className = 'modal-body';
        modalBody.innerHTML = content;
        
        // Create modal buttons
        const modalButtons = document.createElement('div');
        modalButtons.className = 'modal-buttons';
        
        buttons.forEach(button => {
            const btn = document.createElement('button');
            btn.className = button.class || 'secondary-btn';
            btn.textContent = button.text;
            btn.addEventListener('click', () => {
                if (button.action) {
                    button.action();
                }
                if (button.closeModal !== false) {
                    modal.remove();
                }
            });
            modalButtons.appendChild(btn);
        });
        
        // Assemble modal
        modalBody.appendChild(modalButtons);
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modal.appendChild(modalContent);
        
        // Allow closing by clicking outside modal content
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.remove();
            }
        });
        
        return modal;
    }

    /**
     * Handle reset progress button click
     */
    handleResetProgress() {
        const modal = this.createModal(
            getTranslation('modal_reset_progress_title'),
            `<p>${getTranslation('modal_reset_progress_message')}</p>`,
            [
                {
                    text: getTranslation('modal_cancel'),
                    class: 'secondary-btn'
                },
                {
                    text: getTranslation('modal_reset_progress_confirm'),
                    class: 'danger-btn',
                    action: () => {
                        // Clear progress data from localStorage
                        localStorage.removeItem('userProgress');
                        
                        // Show notification
                        this.showNotification(getTranslation('progress_reset_success'), 3000, 'success');
                        
                        // Reload the page
                        window.location.reload();
                    }
                }
            ]
        );
        
        // Add to body
        document.body.appendChild(modal);
    }
    
    /**
     * Handle reset all settings button click
     */
    handleResetAll() {
        const modal = this.createModal(
            getTranslation('modal_reset_all_title'),
            `<p>${getTranslation('modal_reset_all_message')}</p>`,
            [
                {
                    text: getTranslation('modal_cancel'),
                    class: 'secondary-btn'
                },
                {
                    text: getTranslation('modal_reset_all_confirm'),
                    class: 'danger-btn',
                    action: () => {
                        // Clear all data from localStorage
                        localStorage.clear();
                        
                        // Show notification
                        this.showNotification(getTranslation('all_reset_success'), 3000, 'warning');
                        
                        // Reload the page
                        window.location.reload();
                    }
                }
            ]
        );
        
        // Add to body
        document.body.appendChild(modal);
    }
    
    /**
     * Handle language change
     */
    handleLanguageChange(event) {
        const language = event.target.value;
        
        // Set the language
        if (typeof setLanguage === 'function') {
            setLanguage(language);
            
            // Show notification
            this.showNotification(getTranslation('settings_saved'));
        }
    }
    
    /**
     * Load settings
     */
    loadSettings() {
        // Load language setting
        const savedLanguage = localStorage.getItem('language') || 'en';
        if (this.languageSelector) {
            this.languageSelector.value = savedLanguage;
        }
        
        // Other settings loading...
    }
}

// Create UI instance when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.ui = new UI();
}); 