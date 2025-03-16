/**
 * Piano Learning Game
 * Main application file
 */
console.log('app.js loaded');

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    // Initialize language system first
    initializeLanguage();
    
    // Initialize animations
    const animations = new Animations();
    animations.init();
    
    // Initialize piano
    const piano = new Piano();
    piano.init();
    
    // Initialize lesson manager
    const lessonManager = new LessonManager();
    lessonManager.init();
    
    // Initialize practice manager
    const practiceManager = new PracticeManager();
    practiceManager.init();
    
    // Initialize settings manager
    const settingsManager = new SettingsManager();
    settingsManager.init();
    
    // Initialize UI and navigation
    initNavigation();
    
    // Check browser compatibility
    checkBrowserCompatibility();
    
    // Set up MIDI support if available
    setupMIDI();
    
    // Add CSS class for styling based on device type
    addDeviceClass();
    
    // Update copyright year
    updateCopyrightYear();
});

/**
 * Initialize language system
 */
function initializeLanguage() {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    
    // Set the language
    if (typeof setLanguage === 'function') {
        setLanguage(savedLanguage);
    }
}

/**
 * Check browser compatibility
 */
function checkBrowserCompatibility() {
    // Check for Web Audio API support
    if (!window.AudioContext && !window.webkitAudioContext) {
        showCompatibilityWarning('Web Audio API is not supported in this browser. Please use a modern browser like Chrome, Firefox, or Safari.');
    }
    
    // Check for localStorage support
    if (!window.localStorage) {
        showCompatibilityWarning('Local Storage is not supported in this browser. Progress saving will not work.');
    }
}

/**
 * Show compatibility warning
 */
function showCompatibilityWarning(message) {
    // Get translated strings if available
    const warningTitle = typeof getTranslation === 'function' ? 
        getTranslation('compatibility_warning') : 'Browser Compatibility Issue';
    const dismissText = typeof getTranslation === 'function' ? 
        getTranslation('dismiss') : 'Dismiss';
    
    const warningElement = document.createElement('div');
    warningElement.className = 'compatibility-warning';
    warningElement.innerHTML = `
        <div class="warning-content">
            <h3>${warningTitle}</h3>
            <p>${message}</p>
            <button id="dismiss-warning">${dismissText}</button>
        </div>
    `;
    
    document.body.appendChild(warningElement);
    
    // Add dismiss button functionality
    document.getElementById('dismiss-warning').addEventListener('click', () => {
        warningElement.remove();
    });
}

/**
 * Set up MIDI support if available
 */
function setupMIDI() {
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess()
            .then(onMIDISuccess, onMIDIFailure);
    }
}

/**
 * Handle successful MIDI access
 */
function onMIDISuccess(midiAccess) {
    // Get MIDI inputs
    const inputs = midiAccess.inputs.values();
    
    // Listen to all MIDI inputs
    for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
        input.value.onmidimessage = onMIDIMessage;
    }
    
    // Update MIDI radio button
    const midiRadio = document.getElementById('input-midi');
    if (midiRadio) {
        midiRadio.disabled = false;
    }
}

/**
 * Handle MIDI access failure
 */
function onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
    
    // Disable MIDI radio button
    const midiRadio = document.getElementById('input-midi');
    if (midiRadio) {
        midiRadio.disabled = true;
    }
}

/**
 * Handle MIDI message
 */
function onMIDIMessage(message) {
    // MIDI message data
    const command = message.data[0];
    const note = message.data[1];
    const velocity = message.data[2];
    
    // Note on message (144) with velocity > 0
    if (command === 144 && velocity > 0) {
        // Convert MIDI note number to note name
        const noteName = midiNoteToNoteName(note);
        
        // Play the note if it exists on our piano
        if (window.piano && noteName) {
            window.piano.playNote(noteName);
        }
    }
    // Note off message (128) or note on with velocity 0
    else if (command === 128 || (command === 144 && velocity === 0)) {
        // Convert MIDI note number to note name
        const noteName = midiNoteToNoteName(note);
        
        // Stop the note if it exists on our piano
        if (window.piano && noteName) {
            window.piano.stopNote(noteName);
        }
    }
}

/**
 * Convert MIDI note number to note name
 */
function midiNoteToNoteName(midiNote) {
    // MIDI note 60 is middle C (C4)
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const octave = Math.floor(midiNote / 12) - 1;
    const noteName = noteNames[midiNote % 12];
    
    return `${noteName}${octave}`;
}

/**
 * Add CSS class based on device type
 */
function addDeviceClass() {
    // Check if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Add class to body
    if (isMobile) {
        document.body.classList.add('mobile-device');
    } else {
        document.body.classList.add('desktop-device');
    }
}

/**
 * Update copyright year
 */
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('footer p');
    
    if (copyrightElement) {
        copyrightElement.textContent = `© ${currentYear} Piano Learning Game`;
    }
}

/**
 * Initialize navigation
 */
function initNavigation() {
    // If UI is already initialized, we don't need to do anything
    if (window.ui) return;
    
    // Otherwise, create a simple navigation handler
    const navButtons = document.querySelectorAll('.nav-btn');
    const screens = document.querySelectorAll('.screen');
    
    navButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Update active button
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show corresponding screen
            const screenId = button.id.replace('-btn', '-screen');
            console.log('Showing screen:', screenId);
            screens.forEach(screen => screen.classList.remove('active'));
            const targetScreen = document.getElementById(screenId);
            if (targetScreen) {
                targetScreen.classList.add('active');
                console.log('Screen activated:', screenId);
            } else {
                console.error('Target screen not found:', screenId);
            }
        });
    });
}

/**
 * Practice Manager
 * Handles practice mode functionality
 */
class PracticeManager {
    constructor() {
        // Initialize properties
        this.currentMode = null;
    }
    
    /**
     * Initialize the practice manager
     */
    init() {
        // Set up event listeners for practice options
        const freePlayOption = document.getElementById('free-play');
        const scalesOption = document.getElementById('scales-practice');
        const chordOption = document.getElementById('chord-practice');
        
        if (freePlayOption) {
            freePlayOption.addEventListener('click', () => this.startFreePlay());
        }
        
        if (scalesOption) {
            scalesOption.addEventListener('click', () => this.startScalesPractice());
        }
        
        if (chordOption) {
            chordOption.addEventListener('click', () => this.startChordPractice());
        }
    }
    
    /**
     * Start free play mode
     */
    startFreePlay() {
        this.currentMode = 'free-play';
        
        // Show lesson player screen
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById('lesson-player-screen').classList.add('active');
        
        // Update title and instructions
        document.getElementById('lesson-title').textContent = getTranslation('practice_free_play');
        document.getElementById('lesson-instructions').innerHTML = `
            <h3>${getTranslation('practice_free_play')}</h3>
            <p>${getTranslation('practice_free_play_desc')}</p>
        `;
        
        // Update controls
        document.getElementById('play-demo-btn').style.display = 'none';
        document.getElementById('restart-lesson-btn').style.display = 'none';
        document.getElementById('next-lesson-btn').style.display = 'none';
        document.getElementById('back-to-lessons-btn').textContent = '← ' + getTranslation('nav_practice');
        
        // Update back button to return to practice screen
        const backButton = document.getElementById('back-to-lessons-btn');
        backButton.onclick = () => {
            // Show practice screen
            document.querySelectorAll('.screen').forEach(screen => {
                screen.classList.remove('active');
            });
            document.getElementById('practice-screen').classList.add('active');
            
            // Clear current mode
            this.currentMode = null;
        };
    }
    
    /**
     * Start scales practice mode
     */
    startScalesPractice() {
        // Placeholder for scales practice
        this.startFreePlay(); // For now, just use free play
    }
    
    /**
     * Start chord practice mode
     */
    startChordPractice() {
        // Placeholder for chord practice
        this.startFreePlay(); // For now, just use free play
    }
}

/**
 * Settings Manager
 * Handles application settings
 */
class SettingsManager {
    constructor() {
        // DOM elements
        this.volumeSlider = document.getElementById('volume');
        this.pianoSoundTypeSelect = document.getElementById('piano-sound-type');
        this.soundQualitySelect = document.getElementById('sound-quality');
        this.oscillatorTypeSelect = document.getElementById('oscillator-type');
        this.monophonicModeCheckbox = document.getElementById('monophonic-mode');
        this.noteCutoffCheckbox = document.getElementById('note-cutoff');
        this.showNoteNamesCheckbox = document.getElementById('show-note-names');
        this.showFingerNumbersCheckbox = document.getElementById('show-finger-numbers');
        this.languageSelector = document.getElementById('language-selector');
        this.themeToggle = document.getElementById('theme-toggle-setting');
        this.resetProgressBtn = document.getElementById('reset-progress-btn');
        this.resetAllBtn = document.getElementById('reset-all-btn');
    }
    
    /**
     * Initialize the settings manager
     */
    init() {
        // Load settings from localStorage
        this.loadSettings();
        
        // Set up event listeners
        this.setupEventListeners();
    }
    
    /**
     * Load settings from localStorage
     */
    loadSettings() {
        // Volume
        if (this.volumeSlider) {
            const savedVolume = localStorage.getItem('volume');
            if (savedVolume !== null) {
                this.volumeSlider.value = savedVolume;
                if (window.piano) {
                    window.piano.setVolume(parseFloat(savedVolume));
                }
            }
        }
        
        // Piano sound type
        if (this.pianoSoundTypeSelect) {
            const savedSoundType = localStorage.getItem('pianoSoundType');
            if (savedSoundType) {
                this.pianoSoundTypeSelect.value = savedSoundType;
            }
        }
        
        // Sound quality
        if (this.soundQualitySelect) {
            const savedQuality = localStorage.getItem('soundQuality');
            if (savedQuality) {
                this.soundQualitySelect.value = savedQuality;
            }
        }
        
        // Oscillator type
        if (this.oscillatorTypeSelect) {
            const savedType = localStorage.getItem('oscillatorType');
            if (savedType) {
                this.oscillatorTypeSelect.value = savedType;
            }
        }
        
        // Monophonic mode
        if (this.monophonicModeCheckbox) {
            const savedMode = localStorage.getItem('monophonicMode');
            if (savedMode !== null) {
                this.monophonicModeCheckbox.checked = savedMode === 'true';
                if (window.piano) {
                    window.piano.monophonicMode = savedMode === 'true';
                }
            }
        }
        
        // Note cutoff
        if (this.noteCutoffCheckbox) {
            const savedCutoff = localStorage.getItem('noteCutoff');
            if (savedCutoff !== null) {
                this.noteCutoffCheckbox.checked = savedCutoff === 'true';
                if (window.piano) {
                    window.piano.noteCutoff = savedCutoff === 'true';
                }
            }
        }
        
        // Show note names
        if (this.showNoteNamesCheckbox) {
            const savedShowNotes = localStorage.getItem('showNoteNames');
            if (savedShowNotes !== null) {
                this.showNoteNamesCheckbox.checked = savedShowNotes === 'true';
                this.toggleNoteNames(savedShowNotes === 'true');
            }
        }
        
        // Show finger numbers
        if (this.showFingerNumbersCheckbox) {
            const savedShowFingers = localStorage.getItem('showFingerNumbers');
            if (savedShowFingers !== null) {
                this.showFingerNumbersCheckbox.checked = savedShowFingers === 'true';
                this.toggleFingerNumbers(savedShowFingers === 'true');
            }
        }
        
        // Theme
        if (this.themeToggle) {
            const savedTheme = localStorage.getItem('darkTheme');
            if (savedTheme !== null) {
                this.themeToggle.checked = savedTheme === 'true';
            }
        }
    }
    
    /**
     * Set up event listeners for settings
     */
    setupEventListeners() {
        // Volume slider
        if (this.volumeSlider) {
            this.volumeSlider.addEventListener('input', () => {
                const volume = parseFloat(this.volumeSlider.value);
                localStorage.setItem('volume', volume);
                if (window.piano) {
                    window.piano.setVolume(volume);
                }
            });
        }
        
        // Piano sound type
        if (this.pianoSoundTypeSelect) {
            this.pianoSoundTypeSelect.addEventListener('change', () => {
                const soundType = this.pianoSoundTypeSelect.value;
                localStorage.setItem('pianoSoundType', soundType);
                
                // Toggle synthesizer settings visibility
                const synthSettings = document.querySelectorAll('.synthesizer-settings');
                synthSettings.forEach(setting => {
                    setting.style.display = soundType === 'synthesized' ? 'flex' : 'none';
                });
                
                // Notify user
                if (window.ui && window.ui.showNotification) {
                    window.ui.showNotification(getTranslation('settings_saved'));
                }
            });
        }
        
        // Reset progress button
        if (this.resetProgressBtn) {
            this.resetProgressBtn.addEventListener('click', () => {
                if (confirm(getTranslation('confirm_reset_progress'))) {
                    // Clear progress data
                    localStorage.removeItem('userProgress');
                    
                    // Reload the page to reset all progress
                    window.location.reload();
                }
            });
        }
        
        // Reset all button
        if (this.resetAllBtn) {
            this.resetAllBtn.addEventListener('click', () => {
                if (confirm(getTranslation('confirm_reset_all'))) {
                    // Clear all localStorage data
                    localStorage.clear();
                    
                    // Reload the page to reset everything
                    window.location.reload();
                }
            });
        }
    }
    
    /**
     * Toggle note names display
     */
    toggleNoteNames(show) {
        const noteNames = document.querySelectorAll('.note-name');
        noteNames.forEach(name => {
            name.style.display = show ? 'block' : 'none';
        });
    }
    
    /**
     * Toggle finger numbers display
     */
    toggleFingerNumbers(show) {
        const fingerNumbers = document.querySelectorAll('.finger-number');
        fingerNumbers.forEach(number => {
            number.style.display = show ? 'block' : 'none';
        });
    }
} 