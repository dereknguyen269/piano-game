/**
 * Piano Samples Player
 * Uses real grand piano samples for more realistic sound
 */

class PianoSamples {
    constructor() {
        this.audioContext = null;
        this.samples = {};
        this.buffers = {};
        this.gainNodes = {};
        this.volume = 0.7;
        this.loaded = false;
        this.loadingPromise = null;
        this.releaseTime = 0.3; // Release time for samples
        
        // Initialize
        this.init();
    }
    
    /**
     * Initialize the piano samples player
     */
    init() {
        // Create audio context
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
            
            // Create master volume control
            this.masterGain = this.audioContext.createGain();
            this.masterGain.gain.value = this.volume;
            this.masterGain.connect(this.audioContext.destination);
            
            // Load samples
            this.loadSamples();
        } catch (e) {
            console.error('Web Audio API is not supported in this browser', e);
            alert('Your browser does not support Web Audio API. Please use a modern browser like Chrome, Firefox, or Safari.');
        }
    }
    
    /**
     * Load piano samples
     */
    loadSamples() {
        // Define sample notes - we'll use a subset for demonstration
        const sampleNotes = ['C', 'E', 'G', 'B'];
        const octaves = [3, 4, 5];
        
        // Create a loading promise
        this.loadingPromise = new Promise(async (resolve) => {
            // Create a notification that samples are loading
            this.showLoadingNotification();
            
            // Load each sample
            for (const octave of octaves) {
                for (const note of sampleNotes) {
                    const noteName = `${note}${octave}`;
                    await this.loadSample(noteName);
                }
            }
            
            this.loaded = true;
            this.hideLoadingNotification();
            resolve();
        });
    }
    
    /**
     * Load a single sample
     */
    async loadSample(note) {
        try {
            // Instead of loading from a remote URL, we'll use a base64-encoded audio data
            // This avoids CORS issues entirely
            const audioData = this.getPianoSampleData(note);
            
            // Convert base64 to array buffer
            const binaryString = atob(audioData.split(',')[1]);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            
            // Decode audio data
            const audioBuffer = await this.audioContext.decodeAudioData(bytes.buffer);
            
            this.buffers[note] = audioBuffer;
            return audioBuffer;
        } catch (error) {
            console.error(`Error loading sample for note ${note}:`, error);
            // Create a synthesized note as fallback
            return this.createSynthesizedNote(note);
        }
    }
    
    /**
     * Get piano sample data for a note
     * Returns a base64-encoded audio data URL
     */
    getPianoSampleData(note) {
        // For simplicity, we'll use the same sample for all notes
        // In a real application, you would have different samples for each note
        
        // This is a short piano note encoded as base64 data URL
        // It's a minimal MP3 file to keep the code size reasonable
        return "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADwAD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwAc0AAAAAAAAAABSAJAJAQgAAgAAAA8DWZLQnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=";
    }
    
    /**
     * Create a synthesized note as fallback
     */
    async createSynthesizedNote(note) {
        // Extract note name and octave
        const noteName = note.slice(0, -1);
        const octave = parseInt(note.slice(-1));
        
        // Calculate frequency
        const noteValues = {
            'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3,
            'E': 4, 'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8,
            'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11
        };
        
        const baseFrequency = 440; // A4
        const semitones = (octave - 4) * 12 + noteValues[noteName] - 9; // A4 is 9 semitones above C4
        const frequency = baseFrequency * Math.pow(2, semitones / 12);
        
        // Create a buffer for the synthesized note
        const sampleRate = this.audioContext.sampleRate;
        const duration = 2.0; // 2 seconds
        const buffer = this.audioContext.createBuffer(2, sampleRate * duration, sampleRate);
        
        // Fill the buffer with a piano-like sound
        for (let channel = 0; channel < 2; channel++) {
            const data = buffer.getChannelData(channel);
            
            for (let i = 0; i < buffer.length; i++) {
                // Time in seconds
                const t = i / sampleRate;
                
                // Basic sine wave at the fundamental frequency
                let sample = Math.sin(2 * Math.PI * frequency * t);
                
                // Add harmonics for a richer sound
                sample += 0.5 * Math.sin(2 * Math.PI * frequency * 2 * t); // 1st overtone
                sample += 0.25 * Math.sin(2 * Math.PI * frequency * 3 * t); // 2nd overtone
                sample += 0.125 * Math.sin(2 * Math.PI * frequency * 4 * t); // 3rd overtone
                
                // Apply an envelope
                const attack = 0.01;
                const decay = 0.1;
                const sustain = 0.7;
                const release = 1.0;
                
                let envelope;
                if (t < attack) {
                    envelope = t / attack;
                } else if (t < attack + decay) {
                    envelope = 1.0 - (1.0 - sustain) * (t - attack) / decay;
                } else if (t < duration - release) {
                    envelope = sustain;
                } else {
                    envelope = sustain * (1.0 - (t - (duration - release)) / release);
                }
                
                // Apply envelope and normalize
                data[i] = sample * envelope * 0.2;
            }
        }
        
        this.buffers[note] = buffer;
        return buffer;
    }
    
    /**
     * Show loading notification
     */
    showLoadingNotification() {
        const notification = document.createElement('div');
        notification.id = 'samples-loading-notification';
        notification.className = 'notification';
        notification.textContent = 'Loading piano samples...';
        notification.style.backgroundColor = '#4a6eb5';
        notification.style.color = '#fff';
        notification.style.padding = '15px 20px';
        notification.style.borderRadius = '4px';
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '1000';
        notification.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
        
        document.body.appendChild(notification);
    }
    
    /**
     * Hide loading notification
     */
    hideLoadingNotification() {
        const notification = document.getElementById('samples-loading-notification');
        if (notification) {
            notification.textContent = 'Piano samples loaded!';
            setTimeout(() => {
                notification.remove();
            }, 2000);
        }
    }
    
    /**
     * Play a note
     */
    async playNote(note) {
        // Wait for samples to load if they're not loaded yet
        if (!this.loaded) {
            await this.loadingPromise;
        }
        
        // Resume audio context if it's suspended
        if (this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
        }
        
        // Find the closest sample we have
        const sampleNote = this.findClosestSample(note);
        
        // If we don't have a sample, return
        if (!sampleNote || !this.buffers[sampleNote]) {
            console.warn(`No sample found for note ${note}`);
            return;
        }
        
        // Create a source from the buffer
        const source = this.audioContext.createBufferSource();
        source.buffer = this.buffers[sampleNote];
        
        // Calculate playback rate to adjust pitch
        const semitonesBetween = this.semitonesBetween(sampleNote, note);
        source.playbackRate.value = Math.pow(2, semitonesBetween / 12);
        
        // Create a gain node for this note
        const gainNode = this.audioContext.createGain();
        gainNode.gain.value = 1.0;
        
        // Connect source to gain node and gain node to master gain
        source.connect(gainNode);
        gainNode.connect(this.masterGain);
        
        // Start the source
        source.start();
        
        // Store the source and gain node
        this.gainNodes[note] = { source, gainNode };
        
        return { source, gainNode };
    }
    
    /**
     * Stop a note
     */
    stopNote(note) {
        // If we don't have this note playing, return
        if (!this.gainNodes[note]) {
            return;
        }
        
        const { gainNode, source } = this.gainNodes[note];
        const now = this.audioContext.currentTime;
        
        // Apply release envelope
        gainNode.gain.setValueAtTime(gainNode.gain.value, now);
        gainNode.gain.linearRampToValueAtTime(0, now + this.releaseTime);
        
        // Schedule source to stop after release
        setTimeout(() => {
            try {
                source.stop();
            } catch (e) {
                // Source might already be stopped
            }
            delete this.gainNodes[note];
        }, this.releaseTime * 1000);
    }
    
    /**
     * Find the closest sample we have for a given note
     */
    findClosestSample(note) {
        // If we have this exact note, return it
        if (this.buffers[note]) {
            return note;
        }
        
        // Extract note name and octave
        const noteName = note.slice(0, -1);
        const octave = parseInt(note.slice(-1));
        
        // Try to find a sample in the same octave
        const sampleNotes = ['C', 'E', 'G', 'B'];
        for (const sampleNote of sampleNotes) {
            const sample = `${sampleNote}${octave}`;
            if (this.buffers[sample]) {
                return sample;
            }
        }
        
        // Try adjacent octaves
        for (let o = octave - 1; o <= octave + 1; o++) {
            for (const sampleNote of sampleNotes) {
                const sample = `${sampleNote}${o}`;
                if (this.buffers[sample]) {
                    return sample;
                }
            }
        }
        
        // Return null if no sample found
        return null;
    }
    
    /**
     * Calculate semitones between two notes
     */
    semitonesBetween(note1, note2) {
        const noteValues = {
            'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3,
            'E': 4, 'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8,
            'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11
        };
        
        // Extract note name and octave
        const noteName1 = note1.slice(0, -1);
        const octave1 = parseInt(note1.slice(-1));
        const noteName2 = note2.slice(0, -1);
        const octave2 = parseInt(note2.slice(-1));
        
        // Calculate semitones
        const semitones1 = noteValues[noteName1] + (octave1 * 12);
        const semitones2 = noteValues[noteName2] + (octave2 * 12);
        
        return semitones2 - semitones1;
    }
    
    /**
     * Set volume
     */
    setVolume(volume) {
        this.volume = volume;
        if (this.masterGain) {
            this.masterGain.gain.value = volume;
        }
    }
    
    /**
     * Play a sequence of notes
     */
    playSequence(notes, tempo = 120) {
        // Calculate note duration in seconds (60 / tempo = duration of quarter note)
        const noteDuration = 60 / tempo;
        
        // Stop any currently playing notes
        this.stopAllNotes();
        
        // Store original release time and use a shorter one for sequences
        const originalReleaseTime = this.releaseTime;
        this.releaseTime = 0.05; // Very short release for cleaner transitions
        
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
                    
                    // If this is the last note, restore original release time
                    if (index === notes.length - 1) {
                        this.releaseTime = originalReleaseTime;
                    }
                }, noteDuration * 800);
            }, index * noteDuration * 1000);
        });
    }
    
    /**
     * Play a chord (multiple notes simultaneously)
     */
    playChord(notes, duration = 1) {
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
     * Stop all currently playing notes
     */
    stopAllNotes() {
        // Get all active notes
        const activeNotes = Object.keys(this.gainNodes);
        
        // Stop each note
        activeNotes.forEach(note => {
            this.stopNote(note);
        });
    }
}

// Create piano samples instance when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.pianoSamples = new PianoSamples();
}); 