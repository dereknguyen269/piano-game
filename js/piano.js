/**
 * Piano Keyboard Functionality
 * Handles piano keyboard rendering, audio generation, and user interaction
 */

class Piano {
    constructor() {
        this.keyboardElement = document.getElementById('piano-keyboard');
        this.audioContext = null;
        this.oscillators = {};
        this.activeNotes = new Set();
        this.showNoteNames = true;
        this.showFingerNumbers = true;
        this.volume = 0.7;
        this.fingerNumbers = {
            'C4': '1', 'D4': '2', 'E4': '3', 'F4': '1', 'G4': '2', 'A4': '3', 'B4': '4', 'C5': '5',
            'D5': '1', 'E5': '2', 'F5': '3', 'G5': '4', 'A5': '5'
        };
        
        // Sound settings
        this.soundQuality = 'high'; // 'basic' or 'high'
        this.oscillatorType = 'triangle'; // 'sine', 'square', 'sawtooth', 'triangle'
        this.useHarmonics = true;
        this.attackTime = 0.01; // Faster attack (was 0.02)
        this.decayTime = 0.2;   // Faster decay (was 0.3)
        this.sustainLevel = 0.7;
        this.releaseTime = 0.1; // Much faster release (was 0.5)
        
        // Piano sound type
        this.pianoSoundType = 'synthesized'; // 'synthesized' or 'sampled'
        
        // Note overlap prevention
        this.monophonicMode = false; // When true, only one note can play at a time
        this.noteCutoff = true;      // When true, playing a new note cuts off the previous note's release
        this.lastPlayedNote = null;  // Track the last played note for monophonic mode
        
        // Initialize the piano
        this.init();
    }
    
    /**
     * Initialize the piano keyboard
     */
    init() {
        // Create the piano keys
        this.renderKeys();
        
        // Set up audio context
        this.setupAudio();
        
        // Add event listeners
        this.setupEventListeners();
        
        // Load settings
        this.loadSettings();
    }
    
    /**
     * Render the piano keys on the screen
     */
    renderKeys() {
        // Clear existing keys
        this.keyboardElement.innerHTML = '';
        
        // Create keys based on PIANO_KEYS data
        PIANO_KEYS.forEach(key => {
            const keyElement = document.createElement('div');
            keyElement.className = `piano-key ${key.type}-key`;
            keyElement.dataset.note = key.note;
            
            // Add note name if enabled
            if (this.showNoteNames) {
                const noteNameElement = document.createElement('div');
                noteNameElement.className = 'note-name';
                noteNameElement.textContent = key.note;
                keyElement.appendChild(noteNameElement);
            }
            
            // Add finger number if enabled and available
            if (this.showFingerNumbers && this.fingerNumbers[key.note]) {
                const fingerNumberElement = document.createElement('div');
                fingerNumberElement.className = 'finger-number';
                fingerNumberElement.textContent = this.fingerNumbers[key.note];
                keyElement.appendChild(fingerNumberElement);
            }
            
            // Add keyboard key label if available
            for (const [keyboardKey, note] of Object.entries(KEYBOARD_MAPPING)) {
                if (note === key.note) {
                    const keyboardKeyElement = document.createElement('div');
                    keyboardKeyElement.className = 'keyboard-key';
                    keyboardKeyElement.textContent = keyboardKey.toUpperCase();
                    keyboardKeyElement.style.position = 'absolute';
                    keyboardKeyElement.style.bottom = '30px';
                    keyboardKeyElement.style.left = '0';
                    keyboardKeyElement.style.right = '0';
                    keyboardKeyElement.style.textAlign = 'center';
                    keyboardKeyElement.style.fontSize = '10px';
                    keyboardKeyElement.style.color = key.type === 'black' ? '#fff' : '#666';
                    keyElement.appendChild(keyboardKeyElement);
                    break;
                }
            }
            
            this.keyboardElement.appendChild(keyElement);
        });
    }
    
    /**
     * Set up the Web Audio API
     */
    setupAudio() {
        // Create audio context
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
            
            // Create master volume control
            this.masterGain = this.audioContext.createGain();
            this.masterGain.gain.value = this.volume;
            this.masterGain.connect(this.audioContext.destination);
            
            // Create compressor for better dynamics
            this.compressor = this.audioContext.createDynamicsCompressor();
            this.compressor.threshold.value = -24;
            this.compressor.knee.value = 30;
            this.compressor.ratio.value = 12;
            this.compressor.attack.value = 0.003;
            this.compressor.release.value = 0.25;
            this.compressor.connect(this.masterGain);
            
            // Create a small reverb effect
            this.convolver = this.audioContext.createConvolver();
            this.createReverbImpulse();
            this.convolver.connect(this.compressor);
            
            // Create a dry/wet mix for reverb
            this.reverbGain = this.audioContext.createGain();
            this.reverbGain.gain.value = 0.2; // 20% wet signal
            this.convolver.connect(this.reverbGain);
            this.reverbGain.connect(this.masterGain);
            
            // Create a direct path (dry signal)
            this.directGain = this.audioContext.createGain();
            this.directGain.gain.value = 0.8; // 80% dry signal
            this.directGain.connect(this.compressor);
        } catch (e) {
            console.error('Web Audio API is not supported in this browser', e);
            alert('Your browser does not support Web Audio API. Please use a modern browser like Chrome, Firefox, or Safari.');
        }
    }
    
    /**
     * Create a simple reverb impulse response
     */
    createReverbImpulse() {
        // Create a short impulse response for a small room effect
        const sampleRate = this.audioContext.sampleRate;
        const length = sampleRate * 1.5; // 1.5 seconds
        const impulse = this.audioContext.createBuffer(2, length, sampleRate);
        const leftChannel = impulse.getChannelData(0);
        const rightChannel = impulse.getChannelData(1);
        
        // Fill the buffer with noise and create an exponential decay
        for (let i = 0; i < length; i++) {
            const decay = Math.exp(-i / (sampleRate * 0.5));
            const noise = Math.random() * 2 - 1;
            
            leftChannel[i] = noise * decay;
            rightChannel[i] = noise * decay;
        }
        
        this.convolver.buffer = impulse;
    }
    
    /**
     * Set up event listeners for user interaction
     */
    setupEventListeners() {
        // Mouse/touch events for piano keys
        this.keyboardElement.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.keyboardElement.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.keyboardElement.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        this.keyboardElement.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
        this.keyboardElement.addEventListener('touchend', this.handleTouchEnd.bind(this));
        this.keyboardElement.addEventListener('touchcancel', this.handleTouchCancel.bind(this));
        
        // Keyboard events
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
        
        // Settings events
        document.getElementById('show-note-names').addEventListener('change', this.handleSettingChange.bind(this));
        document.getElementById('show-finger-numbers').addEventListener('change', this.handleSettingChange.bind(this));
        document.getElementById('volume').addEventListener('input', this.handleVolumeChange.bind(this));
        
        // Sound quality and oscillator type settings
        const soundQualitySelect = document.getElementById('sound-quality');
        if (soundQualitySelect) {
            soundQualitySelect.addEventListener('change', this.handleSoundQualityChange.bind(this));
        }
        
        const oscillatorTypeSelect = document.getElementById('oscillator-type');
        if (oscillatorTypeSelect) {
            oscillatorTypeSelect.addEventListener('change', this.handleOscillatorTypeChange.bind(this));
        }
        
        // Monophonic mode setting
        const monophonicModeCheckbox = document.getElementById('monophonic-mode');
        if (monophonicModeCheckbox) {
            monophonicModeCheckbox.addEventListener('change', this.handleMonophonicModeChange.bind(this));
        }
    }
    
    /**
     * Load user settings from localStorage
     */
    loadSettings() {
        // Load show note names setting
        const showNoteNames = localStorage.getItem('showNoteNames');
        if (showNoteNames !== null) {
            this.showNoteNames = showNoteNames === 'true';
            document.getElementById('show-note-names').checked = this.showNoteNames;
        }
        
        // Load show finger numbers setting
        const showFingerNumbers = localStorage.getItem('showFingerNumbers');
        if (showFingerNumbers !== null) {
            this.showFingerNumbers = showFingerNumbers === 'true';
            document.getElementById('show-finger-numbers').checked = this.showFingerNumbers;
        }
        
        // Load volume setting
        const volume = localStorage.getItem('volume');
        if (volume !== null) {
            this.volume = parseFloat(volume);
            document.getElementById('volume').value = this.volume;
            if (this.masterGain) {
                this.masterGain.gain.value = this.volume;
            }
        }
        
        // Load sound quality setting
        const soundQuality = localStorage.getItem('soundQuality');
        if (soundQuality !== null) {
            this.soundQuality = soundQuality;
            const soundQualitySelect = document.getElementById('sound-quality');
            if (soundQualitySelect) {
                soundQualitySelect.value = this.soundQuality;
            }
        }
        
        // Load oscillator type setting
        const oscillatorType = localStorage.getItem('oscillatorType');
        if (oscillatorType !== null) {
            this.oscillatorType = oscillatorType;
            const oscillatorTypeSelect = document.getElementById('oscillator-type');
            if (oscillatorTypeSelect) {
                oscillatorTypeSelect.value = this.oscillatorType;
            }
        }
        
        // Load monophonic mode setting
        const monophonicMode = localStorage.getItem('monophonicMode');
        if (monophonicMode !== null) {
            this.monophonicMode = monophonicMode === 'true';
            const monophonicModeCheckbox = document.getElementById('monophonic-mode');
            if (monophonicModeCheckbox) {
                monophonicModeCheckbox.checked = this.monophonicMode;
            }
        }
        
        // Load note cutoff setting
        const noteCutoff = localStorage.getItem('noteCutoff');
        if (noteCutoff !== null) {
            this.noteCutoff = noteCutoff === 'true';
        }
        
        // Load piano sound type setting
        const pianoSoundType = localStorage.getItem('pianoSoundType');
        if (pianoSoundType) {
            this.pianoSoundType = pianoSoundType;
        }
        
        // Re-render keys with updated settings
        this.renderKeys();
    }
    
    /**
     * Handle sound quality change
     */
    handleSoundQualityChange(event) {
        this.soundQuality = event.target.value;
        localStorage.setItem('soundQuality', this.soundQuality);
    }
    
    /**
     * Handle oscillator type change
     */
    handleOscillatorTypeChange(event) {
        this.oscillatorType = event.target.value;
        localStorage.setItem('oscillatorType', this.oscillatorType);
    }
    
    /**
     * Handle monophonic mode change
     */
    handleMonophonicModeChange(event) {
        this.monophonicMode = event.target.checked;
        localStorage.setItem('monophonicMode', this.monophonicMode);
        
        // If turning on monophonic mode, stop all currently playing notes
        if (this.monophonicMode) {
            this.stopAllNotes();
        }
    }
    
    /**
     * Handle mouse down event on piano keys
     */
    handleMouseDown(event) {
        if (event.target.classList.contains('piano-key')) {
            const note = event.target.dataset.note;
            this.playNote(note);
        }
    }
    
    /**
     * Handle mouse up event on piano keys
     */
    handleMouseUp(event) {
        if (event.target.classList.contains('piano-key')) {
            const note = event.target.dataset.note;
            this.stopNote(note);
        }
    }
    
    /**
     * Handle mouse leave event on piano keys
     */
    handleMouseLeave(event) {
        // Stop all active notes when mouse leaves the piano
        this.stopAllNotes();
    }
    
    /**
     * Handle touch start event on piano keys
     */
    handleTouchStart(event) {
        event.preventDefault();
        const touches = event.changedTouches;
        
        for (let i = 0; i < touches.length; i++) {
            const touch = touches[i];
            const element = document.elementFromPoint(touch.clientX, touch.clientY);
            
            if (element && element.classList.contains('piano-key')) {
                const note = element.dataset.note;
                element.setAttribute('data-touch-id', touch.identifier);
                this.playNote(note);
            }
        }
    }
    
    /**
     * Handle touch end event on piano keys
     */
    handleTouchEnd(event) {
        const touches = event.changedTouches;
        
        for (let i = 0; i < touches.length; i++) {
            const touch = touches[i];
            const elements = document.querySelectorAll(`[data-touch-id="${touch.identifier}"]`);
            
            elements.forEach(element => {
                if (element.classList.contains('piano-key')) {
                    const note = element.dataset.note;
                    element.removeAttribute('data-touch-id');
                    this.stopNote(note);
                }
            });
        }
    }
    
    /**
     * Handle touch cancel event on piano keys
     */
    handleTouchCancel(event) {
        this.handleTouchEnd(event);
    }
    
    /**
     * Handle keyboard key down event
     */
    handleKeyDown(event) {
        // Ignore if the key is already pressed or if it's a repeated event
        if (event.repeat || !KEYBOARD_MAPPING[event.key.toLowerCase()]) {
            return;
        }
        
        const note = KEYBOARD_MAPPING[event.key.toLowerCase()];
        if (note) {
            this.playNote(note);
        }
    }
    
    /**
     * Handle keyboard key up event
     */
    handleKeyUp(event) {
        const note = KEYBOARD_MAPPING[event.key.toLowerCase()];
        if (note) {
            this.stopNote(note);
        }
    }
    
    /**
     * Handle setting change event
     */
    handleSettingChange(event) {
        const settingId = event.target.id;
        const isChecked = event.target.checked;
        
        if (settingId === 'show-note-names') {
            this.showNoteNames = isChecked;
            localStorage.setItem('showNoteNames', isChecked);
        } else if (settingId === 'show-finger-numbers') {
            this.showFingerNumbers = isChecked;
            localStorage.setItem('showFingerNumbers', isChecked);
        }
        
        // Re-render keys with updated settings
        this.renderKeys();
    }
    
    /**
     * Handle volume change event
     */
    handleVolumeChange(event) {
        this.volume = parseFloat(event.target.value);
        localStorage.setItem('volume', this.volume);
        
        if (this.masterGain) {
            this.masterGain.gain.value = this.volume;
        }
    }
    
    /**
     * Play a note
     */
    playNote(note) {
        // If the note is already playing, don't play it again
        if (this.activeNotes.has(note)) {
            return;
        }
        
        // If in monophonic mode, stop any currently playing notes
        if (this.monophonicMode && this.activeNotes.size > 0) {
            this.stopAllNotes();
        }
        
        // If using note cutoff and there are active notes, stop them with quick release
        if (this.noteCutoff && this.activeNotes.size > 0 && !this.monophonicMode) {
            this.quickReleaseAllNotes();
        }
        
        // Add to active notes
        this.activeNotes.add(note);
        
        // Update last played note for monophonic mode
        this.lastPlayedNote = note;
        
        // Highlight the key
        this.highlightKey(note, true);
        
        // Play the sound based on the selected piano sound type
        if (this.pianoSoundType === 'sampled' && window.pianoSamples) {
            // Use piano samples
            window.pianoSamples.playNote(note);
        } else {
            // Use synthesized sound
            this.playSynthesizedNote(note);
        }
    }
    
    /**
     * Play a synthesized note using oscillators
     */
    playSynthesizedNote(note) {
        // Get frequency for the note
        const frequency = NOTE_FREQUENCIES[note];
        
        if (!frequency) {
            console.warn(`No frequency found for note ${note}`);
            return;
        }
        
        // Create oscillator
        const oscillator = this.audioContext.createOscillator();
        oscillator.type = this.oscillatorType;
        oscillator.frequency.value = frequency;
        
        // Create gain node for envelope
        const gainNode = this.audioContext.createGain();
        gainNode.gain.value = 0;
        
        // Connect oscillator to gain node
        oscillator.connect(gainNode);
        
        // Add harmonics for richer sound if high quality is selected
        let harmonicOscillators = [];
        let harmonicGains = [];
        
        if (this.soundQuality === 'high' && this.useHarmonics) {
            // Add harmonics (overtones) for a richer piano sound
            const harmonics = [
                { frequency: 2, gain: 0.2 },    // 1st overtone (octave)
                { frequency: 3, gain: 0.1 },    // 2nd overtone (octave + fifth)
                { frequency: 4, gain: 0.07 },   // 3rd overtone (2 octaves)
                { frequency: 5, gain: 0.05 },   // 4th overtone
                { frequency: 6, gain: 0.02 }    // 5th overtone
            ];
            
            harmonics.forEach(harmonic => {
                const harmonicOsc = this.audioContext.createOscillator();
                harmonicOsc.type = 'sine'; // Harmonics are usually sine waves
                harmonicOsc.frequency.value = frequency * harmonic.frequency;
                
                const harmonicGain = this.audioContext.createGain();
                harmonicGain.gain.value = 0;
                
                harmonicOsc.connect(harmonicGain);
                harmonicGain.connect(this.masterGain);
                
                harmonicOsc.start();
                harmonicOscillators.push(harmonicOsc);
                harmonicGains.push(harmonicGain);
                
                // Apply envelope to harmonic
                const now = this.audioContext.currentTime;
                harmonicGain.gain.setValueAtTime(0, now);
                harmonicGain.gain.linearRampToValueAtTime(harmonic.gain * this.volume, now + this.attackTime);
                harmonicGain.gain.linearRampToValueAtTime(harmonic.gain * this.sustainLevel * this.volume, now + this.attackTime + this.decayTime);
            });
        }
        
        // Connect gain node to master gain
        gainNode.connect(this.masterGain);
        
        // Start oscillator
        oscillator.start();
        
        // Apply envelope
        const now = this.audioContext.currentTime;
        gainNode.gain.setValueAtTime(this.volume, now + this.attackTime);
        gainNode.gain.linearRampToValueAtTime(this.sustainLevel * this.volume, now + this.attackTime + this.decayTime);
        
        // Store oscillator and gain node
        this.oscillators[note] = {
            oscillator,
            gainNode,
            harmonicOscillators,
            harmonicGains
        };
    }
    
    /**
     * Stop a note
     */
    stopNote(note) {
        // Remove from active notes
        this.activeNotes.delete(note);
        
        // Remove highlight from key
        this.highlightKey(note, false);
        
        // Stop the sound based on the selected piano sound type
        if (this.pianoSoundType === 'sampled' && window.pianoSamples) {
            // Use piano samples
            window.pianoSamples.stopNote(note);
        } else {
            // Use synthesized sound
            this.stopSynthesizedNote(note);
        }
    }
    
    /**
     * Stop a synthesized note
     */
    stopSynthesizedNote(note) {
        // If the note is not playing, return
        if (!this.oscillators[note]) {
            return;
        }
        
        const { oscillator, gainNode, harmonicOscillators, harmonicGains } = this.oscillators[note];
        const now = this.audioContext.currentTime;
        
        // Apply release envelope
        gainNode.gain.setValueAtTime(gainNode.gain.value, now);
        gainNode.gain.linearRampToValueAtTime(0, now + this.releaseTime);
        
        // Apply release to harmonics
        if (harmonicGains && harmonicGains.length > 0) {
            harmonicGains.forEach(hGain => {
                hGain.gain.setValueAtTime(hGain.gain.value, now);
                hGain.gain.linearRampToValueAtTime(0, now + this.releaseTime);
            });
        }
        
        // Schedule oscillator to stop after release
        setTimeout(() => {
            try {
                oscillator.stop();
                
                // Stop harmonic oscillators
                if (harmonicOscillators && harmonicOscillators.length > 0) {
                    harmonicOscillators.forEach(hOsc => {
                        try {
                            hOsc.stop();
                        } catch (e) {
                            // Oscillator might already be stopped
                        }
                    });
                }
            } catch (e) {
                // Oscillator might already be stopped
            }
            
            // Remove from oscillators
            delete this.oscillators[note];
        }, this.releaseTime * 1000);
    }
    
    /**
     * Quick release all notes (for note cutoff)
     */
    quickReleaseAllNotes() {
        const quickReleaseTime = 0.05; // Very short release time
        const now = this.audioContext.currentTime;
        
        // Apply quick release to all oscillators
        Object.keys(this.oscillators).forEach(note => {
            const { gainNode, harmonicGains } = this.oscillators[note];
            
            // Apply quick release envelope
            gainNode.gain.setValueAtTime(gainNode.gain.value, now);
            gainNode.gain.linearRampToValueAtTime(0, now + quickReleaseTime);
            
            // Apply quick release to harmonics
            if (harmonicGains && harmonicGains.length > 0) {
                harmonicGains.forEach(hGain => {
                    hGain.gain.setValueAtTime(hGain.gain.value, now);
                    hGain.gain.linearRampToValueAtTime(0, now + quickReleaseTime);
                });
            }
        });
        
        // If using sampled piano, stop all notes there too
        if (this.pianoSoundType === 'sampled' && window.pianoSamples) {
            // Get all active notes
            const activeNotes = Array.from(this.activeNotes);
            
            // Stop each note
            activeNotes.forEach(note => {
                window.pianoSamples.stopNote(note);
            });
        }
    }
    
    /**
     * Stop all notes
     */
    stopAllNotes() {
        // Get all active notes
        const activeNotes = Array.from(this.activeNotes);
        
        // Stop each note
        activeNotes.forEach(note => {
            this.stopNote(note);
        });
    }
    
    /**
     * Highlight a key
     */
    highlightKey(note, isActive) {
        // Find the key element
        const keyElement = document.querySelector(`.piano-key[data-note="${note}"]`);
        if (keyElement) {
            if (isActive) {
                keyElement.classList.add('active');
            } else {
                keyElement.classList.remove('active');
            }
        }
    }

    /**
     * Play a chord (multiple notes simultaneously)
     */
    playChord(notes, duration = 1) {
        // If using sampled piano and it's available
        if (this.pianoSoundType === 'sampled' && window.pianoSamples) {
            window.pianoSamples.playChord(notes, duration);
            
            // Highlight keys
            notes.forEach(note => {
                this.highlightKey(note, true);
                this.activeNotes.add(note);
            });
            
            // Remove highlights after duration
            setTimeout(() => {
                notes.forEach(note => {
                    this.highlightKey(note, false);
                    this.activeNotes.delete(note);
                });
            }, duration * 1000);
            
            return;
        }
        
        // Play all notes in the chord
        notes.forEach(note => {
            this.playNote(note);
        });
        
        // Stop all notes after the specified duration
        setTimeout(() => {
            notes.forEach(note => {
                this.stopNote(note);
            });
        }, duration * 1000);
    }
    
    /**
     * Trigger a custom note event
     */
    triggerNoteEvent(eventName, note) {
        const event = new CustomEvent(eventName, {
            detail: { note }
        });
        document.dispatchEvent(event);
    }
    
    /**
     * Play a sequence of notes
     */
    playSequence(notes, tempo = 120) {
        // Calculate note duration in seconds (60 / tempo = duration of quarter note)
        const noteDuration = 60 / tempo;
        
        // Stop any currently playing notes
        this.stopAllNotes();
        
        // Force monophonic mode during sequence playback to prevent overlap
        const originalMonophonicMode = this.monophonicMode;
        this.monophonicMode = true;
        
        // Use a shorter release time for cleaner transitions
        const originalReleaseTime = this.releaseTime;
        this.releaseTime = 0.05; // Very short release for sequence playback
        
        // Play each note in sequence with proper timing
        notes.forEach((note, index) => {
            setTimeout(() => {
                // Stop any currently playing notes before playing the new one
                this.stopAllNotes();
                
                // Play the note
                this.playNote(note);
                
                // Stop the note after 80% of its duration to ensure no overlap
                setTimeout(() => {
                    this.stopNote(note);
                    
                    // If this is the last note, restore original settings
                    if (index === notes.length - 1) {
                        this.monophonicMode = originalMonophonicMode;
                        this.releaseTime = originalReleaseTime;
                    }
                }, noteDuration * 800);
            }, index * noteDuration * 1000);
        });
    }

    /**
     * Get the note frequencies
     * @returns {Object} - The note frequencies object
     */
    getNoteFrequencies() {
        return NOTE_FREQUENCIES;
    }
}

// Create piano instance when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.piano = new Piano();
}); 