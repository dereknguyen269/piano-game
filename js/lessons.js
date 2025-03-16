/**
 * Lessons Functionality
 * Handles lesson loading, progression, and user interaction with lessons
 */

class LessonManager {
    constructor() {
        this.currentLevel = 'beginner';
        this.currentLesson = null;
        this.userProgress = {};
        
        // DOM elements
        this.lessonsContainer = document.getElementById('lessons-container');
        this.lessonTitle = document.getElementById('lesson-title');
        this.lessonInstructions = document.getElementById('lesson-instructions');
        this.sheetMusicContainer = document.getElementById('sheet-music-container');
        this.playDemoBtn = document.getElementById('play-demo-btn');
        this.restartLessonBtn = document.getElementById('restart-lesson-btn');
        this.nextLessonBtn = document.getElementById('next-lesson-btn');
        this.backToLessonsBtn = document.getElementById('back-to-lessons-btn');
        
        // Initialize
        this.init();
    }
    
    /**
     * Initialize the lesson manager
     */
    init() {
        // Load user progress from localStorage
        this.loadProgress();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Render lessons for the current level
        this.renderLessons();
    }
    
    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Level selector buttons
        document.querySelectorAll('.level-btn').forEach(button => {
            button.addEventListener('click', this.handleLevelChange.bind(this));
        });
        
        // Lesson navigation buttons
        this.backToLessonsBtn.addEventListener('click', this.backToLessons.bind(this));
        this.playDemoBtn.addEventListener('click', this.playLessonDemo.bind(this));
        this.restartLessonBtn.addEventListener('click', this.restartLesson.bind(this));
        this.nextLessonBtn.addEventListener('click', this.goToNextLesson.bind(this));
        
        // Start learning button
        document.getElementById('start-learning-btn').addEventListener('click', this.startLearning.bind(this));
        
        // Continue button
        document.getElementById('continue-btn').addEventListener('click', this.continueProgress.bind(this));
        
        // Note played event
        document.addEventListener('notePlayed', this.handleNotePlayed.bind(this));
    }
    
    /**
     * Load user progress from localStorage
     */
    loadProgress() {
        const savedProgress = localStorage.getItem('userProgress');
        if (savedProgress) {
            this.userProgress = JSON.parse(savedProgress);
        } else {
            // Initialize empty progress for each level and lesson
            this.userProgress = {};
            
            Object.keys(LESSONS).forEach(level => {
                this.userProgress[level] = {};
                
                LESSONS[level].forEach(lesson => {
                    this.userProgress[level][lesson.id] = {
                        started: false,
                        completed: false,
                        score: 0,
                        lastPlayed: null
                    };
                });
            });
            
            // Save initial progress
            this.saveProgress();
        }
        
        // Update progress stats on home screen
        this.updateProgressStats();
    }
    
    /**
     * Save user progress to localStorage
     */
    saveProgress() {
        localStorage.setItem('userProgress', JSON.stringify(this.userProgress));
        
        // Update progress stats on home screen
        this.updateProgressStats();
    }
    
    /**
     * Update progress statistics on the home screen
     */
    updateProgressStats() {
        const progressStats = document.getElementById('progress-stats');
        if (!progressStats) return;
        
        // Calculate progress statistics
        let totalLessons = 0;
        let completedLessons = 0;
        let startedLessons = 0;
        
        Object.keys(this.userProgress).forEach(level => {
            Object.keys(this.userProgress[level]).forEach(lessonId => {
                const lessonProgress = this.userProgress[level][lessonId];
                totalLessons++;
                
                if (lessonProgress.completed) {
                    completedLessons++;
                } else if (lessonProgress.started) {
                    startedLessons++;
                }
            });
        });
        
        // Calculate completion percentage
        const completionPercentage = Math.round((completedLessons / totalLessons) * 100);
        
        // Find the last played lesson
        let lastPlayedLesson = null;
        let lastPlayedTime = 0;
        
        Object.keys(this.userProgress).forEach(level => {
            Object.keys(this.userProgress[level]).forEach(lessonId => {
                const lessonProgress = this.userProgress[level][lessonId];
                if (lessonProgress.lastPlayed && new Date(lessonProgress.lastPlayed).getTime() > lastPlayedTime) {
                    lastPlayedTime = new Date(lessonProgress.lastPlayed).getTime();
                    
                    // Find the lesson details
                    const lessonDetails = LESSONS[level].find(lesson => lesson.id === lessonId);
                    if (lessonDetails) {
                        lastPlayedLesson = {
                            id: lessonId,
                            title: lessonDetails.title,
                            level: level
                        };
                    }
                }
            });
        });
        
        // Create progress stats HTML
        let statsHTML = `
            <div class="progress-stat">
                <span class="stat-label">Completion:</span>
                <span class="stat-value">${completionPercentage}%</span>
                <div class="progress-bar">
                    <div class="progress-bar-fill" style="width: ${completionPercentage}%"></div>
                </div>
            </div>
            <div class="progress-stat">
                <span class="stat-label">Lessons Completed:</span>
                <span class="stat-value">${completedLessons} of ${totalLessons}</span>
            </div>
            <div class="progress-stat">
                <span class="stat-label">Lessons In Progress:</span>
                <span class="stat-value">${startedLessons}</span>
            </div>
        `;
        
        // Add last played lesson if available
        if (lastPlayedLesson) {
            statsHTML += `
                <div class="progress-stat">
                    <span class="stat-label">Last Played:</span>
                    <span class="stat-value">${lastPlayedLesson.title}</span>
                </div>
            `;
            
            // Update continue button to go to last played lesson
            const continueBtn = document.getElementById('continue-btn');
            if (continueBtn) {
                continueBtn.dataset.lessonId = lastPlayedLesson.id;
                continueBtn.dataset.level = lastPlayedLesson.level;
                continueBtn.style.display = 'block';
            }
        } else {
            // Hide continue button if no lessons have been played
            const continueBtn = document.getElementById('continue-btn');
            if (continueBtn) {
                continueBtn.style.display = 'none';
            }
        }
        
        // Update the progress stats container
        progressStats.innerHTML = statsHTML;
    }
    
    /**
     * Render lessons for the current level
     */
    renderLessons() {
        // Clear lessons container
        this.lessonsContainer.innerHTML = '';
        
        // Get lessons for the current level
        const levelLessons = LESSONS[this.currentLevel] || [];
        
        // Create lesson cards
        for (const lesson of levelLessons) {
            const lessonCard = document.createElement('div');
            lessonCard.className = 'lesson-card';
            lessonCard.dataset.id = lesson.id;
            
            // Get translated title and description
            const translatedTitle = getTranslatedLessonContent(lesson.id, 'title') || lesson.title;
            const translatedDescription = getTranslatedLessonContent(lesson.id, 'description') || lesson.description;
            
            // Calculate progress percentage
            const progress = this.getUserProgressForLesson(lesson.id);
            const progressPercent = progress ? Math.round(progress.completion * 100) : 0;
            
            lessonCard.innerHTML = `
                <div class="lesson-card-header">
                    <h3>${translatedTitle}</h3>
                    <span class="lesson-category">${lesson.category}</span>
                    <span class="lesson-duration">${lesson.duration} min</span>
                </div>
                <p class="lesson-description">${translatedDescription}</p>
                <div class="lesson-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progressPercent}%"></div>
                    </div>
                    <span class="progress-text">${progressPercent}% ${getTranslation('complete')}</span>
                </div>
            `;
            
            // Add click event to open lesson
            lessonCard.addEventListener('click', () => {
                this.openLesson(lesson.id);
            });
            
            // Add lesson card to container
            this.lessonsContainer.appendChild(lessonCard);
        }
    }
    
    /**
     * Handle level change
     */
    handleLevelChange(event) {
        // Get selected level
        const level = event.target.dataset.level;
        
        // Update active level button
        document.querySelectorAll('.level-btn').forEach(button => {
            button.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Update current level
        this.currentLevel = level;
        
        // Render lessons for the new level
        this.renderLessons();
    }
    
    /**
     * Open a lesson
     */
    openLesson(lessonId) {
        const lesson = this.findLessonById(lessonId);
        if (!lesson) return;
        
        // Get translated content
        const translatedTitle = getTranslatedLessonContent(lessonId, 'title') || lesson.title;
        const translatedInstructions = getTranslatedLessonContent(lessonId, 'instructions') || lesson.content.instructions;
        
        // Create lesson player modal
        const modal = document.createElement('div');
        modal.className = 'modal lesson-player-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${translatedTitle}</h2>
                    <button class="close-button">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="lesson-instructions">
                        ${translatedInstructions}
                    </div>
                    <div class="lesson-interactive">
                        <div class="piano-container">
                            <div class="piano-keyboard" id="lesson-piano"></div>
                        </div>
                        <div class="lesson-controls">
                            <button class="primary-btn" id="complete-lesson">${getTranslation('mark_complete')}</button>
                            <button class="secondary-btn" id="restart-lesson">${getTranslation('restart')}</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners to the modal
        const closeButton = modal.querySelector('.close-button');
        closeButton.addEventListener('click', () => {
            modal.remove();
        });
        
        const completeButton = modal.querySelector('#complete-lesson');
        completeButton.addEventListener('click', () => {
            this.markLessonComplete(lessonId);
        });
        
        const restartButton = modal.querySelector('#restart-lesson');
        restartButton.addEventListener('click', () => {
            this.restartLesson();
        });
        
        // Add the modal to the body
        document.body.appendChild(modal);
        
        // Update current lesson
        this.currentLesson = lesson;
        
        // Update lesson progress
        if (!this.userProgress[this.currentLevel][lessonId].started) {
            this.userProgress[this.currentLevel][lessonId].started = true;
        }
        this.userProgress[this.currentLevel][lessonId].lastPlayed = new Date().toISOString();
        this.saveProgress();
        
        // Update lesson player screen
        this.lessonTitle.textContent = translatedTitle;
        this.lessonInstructions.innerHTML = translatedInstructions;
        
        // Clear sheet music container
        this.sheetMusicContainer.innerHTML = '';
        
        // Show lesson player screen
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById('lesson-player-screen').classList.add('active');
        
        // Highlight keys for the lesson if available
        if (lesson.content.notes && Array.isArray(lesson.content.notes)) {
            // For simple note arrays (single hand)
            lesson.content.notes.forEach(note => {
                const keyElement = document.querySelector(`.piano-key[data-note="${note}"]`);
                if (keyElement) {
                    keyElement.classList.add('highlight');
                }
            });
        } else if (lesson.content.notes && typeof lesson.content.notes === 'object') {
            // For more complex note structures (two hands, chords, etc.)
            
            // Special handling for Improvisation Basics lesson
            if (lesson.id === 'a3' && lesson.content.notes.scale) {
                // Highlight the C major scale keys
                lesson.content.notes.scale.forEach(note => {
                    const keyElement = document.querySelector(`.piano-key[data-note="${note}"]`);
                    if (keyElement) {
                        keyElement.classList.add('highlight');
                    }
                });
            } else {
                // Default handling for other lessons
                Object.values(lesson.content.notes).flat().forEach(note => {
                    if (Array.isArray(note)) {
                        // Handle chord arrays
                        note.forEach(chordNote => {
                            const keyElement = document.querySelector(`.piano-key[data-note="${chordNote}"]`);
                            if (keyElement) {
                                keyElement.classList.add('highlight');
                            }
                        });
                    } else {
                        // Handle single notes
                        const keyElement = document.querySelector(`.piano-key[data-note="${note}"]`);
                        if (keyElement) {
                            keyElement.classList.add('highlight');
                        }
                    }
                });
            }
        }
    }
    
    /**
     * Go back to lessons screen
     */
    backToLessons() {
        // Remove key highlights
        document.querySelectorAll('.piano-key.highlight').forEach(key => {
            key.classList.remove('highlight');
        });
        
        // Show lessons screen
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById('lessons-screen').classList.add('active');
        
        // Clear current lesson
        this.currentLesson = null;
    }
    
    /**
     * Play lesson demo
     */
    playLessonDemo() {
        if (!this.currentLesson || !window.piano) return;
        
        // Disable the play demo button while playing
        if (this.playDemoBtn) {
            this.playDemoBtn.disabled = true;
            this.playDemoBtn.textContent = 'Playing...';
        }
        
        // Get notes to play
        let notesToPlay = [];
        
        if (this.currentLesson.content.notes) {
            if (Array.isArray(this.currentLesson.content.notes)) {
                // Simple note array
                notesToPlay = this.currentLesson.content.notes;
            } else if (typeof this.currentLesson.content.notes === 'object') {
                // Complex note structure
                if (this.currentLesson.content.notes.right) {
                    // Two-hand exercise - play right hand for demo
                    notesToPlay = this.currentLesson.content.notes.right;
                } else if (this.currentLesson.content.notes.chords) {
                    // Chord exercise - play each chord
                    this.playChordSequence(this.currentLesson.content.notes.chords);
                    return;
                } else if (this.currentLesson.id === 'a1') {
                    // Special handling for Complex Rhythms lesson
                    this.playRhythmicPatterns();
                    return;
                } else if (this.currentLesson.id === 'a3') {
                    // Special handling for Improvisation Basics lesson
                    this.playImprovisationDemo();
                    return;
                } else {
                    // Other structures - try to find a playable sequence
                    const firstNoteArray = Object.values(this.currentLesson.content.notes)[0];
                    if (Array.isArray(firstNoteArray)) {
                        notesToPlay = firstNoteArray;
                    }
                }
            }
        }
        
        // Play the notes
        if (notesToPlay.length > 0) {
            // Check if we should use piano samples
            const pianoSoundType = localStorage.getItem('pianoSoundType') || 'synthesized';
            
            if (pianoSoundType === 'sampled' && window.pianoSamples && window.pianoSamples.loaded) {
                // Use piano samples for better sound quality
                window.pianoSamples.playSequence(notesToPlay, 120); // 120 BPM
                
                // Highlight keys as they play
                this.highlightKeysForSequence(notesToPlay, 120);
            } else {
                // Use the regular piano
                window.piano.playSequence(notesToPlay, 120); // 120 BPM
            }
            
            // Re-enable the play demo button after the sequence finishes
            const sequenceDuration = (notesToPlay.length * (60 / 120)) * 1000; // Duration in ms
            setTimeout(() => {
                if (this.playDemoBtn) {
                    this.playDemoBtn.disabled = false;
                    this.playDemoBtn.textContent = 'Play Demo';
                }
            }, sequenceDuration + 500); // Add a small buffer
        }
    }
    
    /**
     * Play rhythmic patterns for the Complex Rhythms lesson
     */
    playRhythmicPatterns() {
        if (!this.currentLesson || !this.currentLesson.content.notes) return;
        
        const rhythmPatterns = this.currentLesson.content.notes;
        const pianoSoundType = localStorage.getItem('pianoSoundType') || 'synthesized';
        const useSamples = pianoSoundType === 'sampled' && window.pianoSamples && window.pianoSamples.loaded;
        
        // Calculate total duration for all patterns
        let totalDuration = 0;
        
        // Play dotted rhythm pattern
        if (rhythmPatterns.dotted && rhythmPatterns.dotted.length > 0) {
            const dottedNotes = rhythmPatterns.dotted;
            
            // Play with a dotted rhythm feel (longer first note, shorter second note)
            if (useSamples) {
                this.playDottedRhythmWithSamples(dottedNotes);
            } else {
                this.playDottedRhythm(dottedNotes);
            }
            
            totalDuration += (dottedNotes.length * 0.75) * 1000; // Approximate duration
        }
        
        // Play triplet pattern after a delay
        if (rhythmPatterns.triplets && rhythmPatterns.triplets.length > 0) {
            setTimeout(() => {
                const tripletNotes = rhythmPatterns.triplets;
                
                // Play with a triplet feel (three notes in the time of two)
                if (useSamples) {
                    this.playTripletRhythmWithSamples(tripletNotes);
                } else {
                    this.playTripletRhythm(tripletNotes);
                }
            }, totalDuration + 1000); // Add a 1-second pause between patterns
            
            totalDuration += (rhythmPatterns.triplets.length * 0.5) * 1000 + 1000;
        }
        
        // Play syncopation pattern after a delay
        if (rhythmPatterns.syncopation && rhythmPatterns.syncopation.length > 0) {
            setTimeout(() => {
                const syncopationNotes = rhythmPatterns.syncopation;
                
                // Play with a syncopated feel (emphasis on off-beats)
                if (useSamples) {
                    this.playSyncopatedRhythmWithSamples(syncopationNotes);
                } else {
                    this.playSyncopatedRhythm(syncopationNotes);
                }
            }, totalDuration + 1000); // Add a 1-second pause between patterns
            
            totalDuration += (rhythmPatterns.syncopation.length * 0.6) * 1000 + 1000;
        }
        
        // Re-enable the play demo button after all patterns finish
        setTimeout(() => {
            if (this.playDemoBtn) {
                this.playDemoBtn.disabled = false;
                this.playDemoBtn.textContent = 'Play Demo';
            }
        }, totalDuration + 1000); // Add a buffer
    }
    
    /**
     * Play a dotted rhythm pattern using the piano
     */
    playDottedRhythm(notes) {
        if (!notes || !notes.length || !window.piano) return;
        
        // Force monophonic mode during playback
        const originalMonophonicMode = window.piano.monophonicMode;
        window.piano.monophonicMode = true;
        
        // Play each note with a dotted rhythm feel
        notes.forEach((note, index) => {
            const isEven = index % 2 === 0;
            const noteDuration = isEven ? 0.75 : 0.25; // Longer for even indices, shorter for odd
            
            setTimeout(() => {
                // Stop any currently playing notes
                window.piano.stopAllNotes();
                
                // Play the note
                window.piano.playNote(note);
                
                // Stop the note after its duration
                setTimeout(() => {
                    window.piano.stopNote(note);
                    
                    // Restore original settings after the last note
                    if (index === notes.length - 1) {
                        window.piano.monophonicMode = originalMonophonicMode;
                    }
                }, noteDuration * 800); // 80% of duration to ensure no overlap
            }, index * 0.5 * 1000); // 0.5 seconds per eighth note equivalent
        });
    }
    
    /**
     * Play a dotted rhythm pattern using piano samples
     */
    playDottedRhythmWithSamples(notes) {
        if (!notes || !notes.length || !window.pianoSamples) return;
        
        // Play each note with a dotted rhythm feel
        notes.forEach((note, index) => {
            const isEven = index % 2 === 0;
            const noteDuration = isEven ? 0.75 : 0.25; // Longer for even indices, shorter for odd
            
            setTimeout(() => {
                // Stop any currently playing notes
                window.pianoSamples.stopAllNotes();
                
                // Play the note
                window.pianoSamples.playNote(note);
                
                // Highlight the key
                window.piano.highlightKey(note, true);
                
                // Stop the note and remove highlight after its duration
                setTimeout(() => {
                    window.pianoSamples.stopNote(note);
                    window.piano.highlightKey(note, false);
                }, noteDuration * 800); // 80% of duration to ensure no overlap
            }, index * 0.5 * 1000); // 0.5 seconds per eighth note equivalent
        });
    }
    
    /**
     * Play a triplet rhythm pattern using the piano
     */
    playTripletRhythm(notes) {
        if (!notes || !notes.length || !window.piano) return;
        
        // Force monophonic mode during playback
        const originalMonophonicMode = window.piano.monophonicMode;
        window.piano.monophonicMode = true;
        
        // Play each note with a triplet feel
        notes.forEach((note, index) => {
            // Group notes in sets of 3 for triplets
            const tripletIndex = index % 3;
            const groupIndex = Math.floor(index / 3);
            
            // Calculate timing based on triplet position
            const timing = (groupIndex * 0.5) + (tripletIndex * (0.5 / 3));
            
            setTimeout(() => {
                // Stop any currently playing notes
                window.piano.stopAllNotes();
                
                // Play the note
                window.piano.playNote(note);
                
                // Stop the note after a short duration
                setTimeout(() => {
                    window.piano.stopNote(note);
                    
                    // Restore original settings after the last note
                    if (index === notes.length - 1) {
                        window.piano.monophonicMode = originalMonophonicMode;
                    }
                }, (0.5 / 3) * 800); // 80% of triplet duration to ensure no overlap
            }, timing * 1000);
        });
    }
    
    /**
     * Play a triplet rhythm pattern using piano samples
     */
    playTripletRhythmWithSamples(notes) {
        if (!notes || !notes.length || !window.pianoSamples) return;
        
        // Play each note with a triplet feel
        notes.forEach((note, index) => {
            // Group notes in sets of 3 for triplets
            const tripletIndex = index % 3;
            const groupIndex = Math.floor(index / 3);
            
            // Calculate timing based on triplet position
            const timing = (groupIndex * 0.5) + (tripletIndex * (0.5 / 3));
            
            setTimeout(() => {
                // Stop any currently playing notes
                window.pianoSamples.stopAllNotes();
                
                // Play the note
                window.pianoSamples.playNote(note);
                
                // Highlight the key
                window.piano.highlightKey(note, true);
                
                // Stop the note and remove highlight after a short duration
                setTimeout(() => {
                    window.pianoSamples.stopNote(note);
                    window.piano.highlightKey(note, false);
                }, (0.5 / 3) * 800); // 80% of triplet duration to ensure no overlap
            }, timing * 1000);
        });
    }
    
    /**
     * Play a syncopated rhythm pattern using the piano
     */
    playSyncopatedRhythm(notes) {
        if (!notes || !notes.length || !window.piano) return;
        
        // Force monophonic mode during playback
        const originalMonophonicMode = window.piano.monophonicMode;
        window.piano.monophonicMode = true;
        
        // Play each note with a syncopated feel
        notes.forEach((note, index) => {
            // Syncopation pattern: emphasize off-beats
            const isOffBeat = index % 2 === 1;
            const timing = index * 0.3; // Base timing
            
            // Add a slight delay to off-beats to create syncopation
            const adjustedTiming = timing + (isOffBeat ? 0.05 : 0);
            
            setTimeout(() => {
                // Stop any currently playing notes
                window.piano.stopAllNotes();
                
                // Play the note with emphasis on off-beats
                window.piano.playNote(note);
                
                // Stop the note after its duration
                setTimeout(() => {
                    window.piano.stopNote(note);
                    
                    // Restore original settings after the last note
                    if (index === notes.length - 1) {
                        window.piano.monophonicMode = originalMonophonicMode;
                    }
                }, 0.25 * 1000); // Short duration for syncopated feel
            }, adjustedTiming * 1000);
        });
    }
    
    /**
     * Play a syncopated rhythm pattern using piano samples
     */
    playSyncopatedRhythmWithSamples(notes) {
        if (!notes || !notes.length || !window.pianoSamples) return;
        
        // Play each note with a syncopated feel
        notes.forEach((note, index) => {
            // Syncopation pattern: emphasize off-beats
            const isOffBeat = index % 2 === 1;
            const timing = index * 0.3; // Base timing
            
            // Add a slight delay to off-beats to create syncopation
            const adjustedTiming = timing + (isOffBeat ? 0.05 : 0);
            
            setTimeout(() => {
                // Stop any currently playing notes
                window.pianoSamples.stopAllNotes();
                
                // Play the note with emphasis on off-beats
                window.pianoSamples.playNote(note);
                
                // Highlight the key
                window.piano.highlightKey(note, true);
                
                // Stop the note and remove highlight after its duration
                setTimeout(() => {
                    window.pianoSamples.stopNote(note);
                    window.piano.highlightKey(note, false);
                }, 0.25 * 1000); // Short duration for syncopated feel
            }, adjustedTiming * 1000);
        });
    }
    
    /**
     * Highlight keys for a sequence without playing sound
     */
    highlightKeysForSequence(notes, tempo = 120) {
        // Calculate note duration in seconds
        const noteDuration = 60 / tempo;
        
        // Highlight each note in sequence with proper timing
        notes.forEach((note, index) => {
            setTimeout(() => {
                // Highlight the key
                if (window.piano) {
                    window.piano.highlightKey(note, true);
                }
                
                // Remove highlight after 90% of note duration
                setTimeout(() => {
                    if (window.piano) {
                        window.piano.highlightKey(note, false);
                    }
                }, noteDuration * 900);
            }, index * noteDuration * 1000);
        });
    }
    
    /**
     * Play a sequence of chords
     */
    playChordSequence(chords) {
        if (!chords || !window.piano) return;
        
        // Disable the play demo button while playing
        if (this.playDemoBtn) {
            this.playDemoBtn.disabled = true;
            this.playDemoBtn.textContent = 'Playing...';
        }
        
        // Check if we should use piano samples
        const pianoSoundType = localStorage.getItem('pianoSoundType') || 'synthesized';
        const useSamples = pianoSoundType === 'sampled' && window.pianoSamples && window.pianoSamples.loaded;
        
        // Calculate total duration
        const chordDuration = 1.5; // seconds per chord
        const totalDuration = chords.length * chordDuration * 1000;
        
        // Ensure all notes are stopped before starting
        if (useSamples) {
            window.pianoSamples.stopAllNotes && window.pianoSamples.stopAllNotes();
        } else {
            window.piano.stopAllNotes();
        }
        
        // Play each chord in sequence
        chords.forEach((chord, index) => {
            setTimeout(() => {
                // Stop any currently playing notes before playing the next chord
                if (useSamples) {
                    window.pianoSamples.stopAllNotes && window.pianoSamples.stopAllNotes();
                } else {
                    window.piano.stopAllNotes();
                }
                
                if (useSamples) {
                    // Use piano samples
                    window.pianoSamples.playChord(chord, 1.0);
                    
                    // Highlight keys
                    chord.forEach(note => {
                        window.piano.highlightKey(note, true);
                    });
                    
                    // Remove highlights
                    setTimeout(() => {
                        chord.forEach(note => {
                            window.piano.highlightKey(note, false);
                        });
                    }, 1000);
                } else {
                    // Use regular piano
                    window.piano.playChord(chord, 1.0);
                }
            }, index * chordDuration * 1000);
        });
        
        // Re-enable the play demo button after the sequence finishes
        setTimeout(() => {
            if (this.playDemoBtn) {
                this.playDemoBtn.disabled = false;
                this.playDemoBtn.textContent = 'Play Demo';
            }
        }, totalDuration + 500); // Add a small buffer
    }
    
    /**
     * Restart the current lesson
     */
    restartLesson() {
        if (!this.currentLesson) return;
        
        // Re-open the current lesson
        this.openLesson(this.currentLesson.id);
    }
    
    /**
     * Go to the next lesson
     */
    goToNextLesson() {
        if (!this.currentLesson) return;
        
        // Mark current lesson as completed
        this.userProgress[this.currentLevel][this.currentLesson.id].completed = true;
        this.saveProgress();
        
        // Find the index of the current lesson
        const currentIndex = LESSONS[this.currentLevel].findIndex(lesson => lesson.id === this.currentLesson.id);
        
        // Check if there's a next lesson in the current level
        if (currentIndex < LESSONS[this.currentLevel].length - 1) {
            // Open the next lesson
            const nextLesson = LESSONS[this.currentLevel][currentIndex + 1];
            this.openLesson(nextLesson.id);
        } else {
            // Check if there's a next level
            const levels = Object.keys(LESSONS);
            const currentLevelIndex = levels.indexOf(this.currentLevel);
            
            if (currentLevelIndex < levels.length - 1) {
                // Go to the first lesson of the next level
                const nextLevel = levels[currentLevelIndex + 1];
                this.currentLevel = nextLevel;
                
                // Update level buttons
                document.querySelectorAll('.level-btn').forEach(button => {
                    button.classList.remove('active');
                    if (button.dataset.level === nextLevel) {
                        button.classList.add('active');
                    }
                });
                
                // Open the first lesson of the next level
                if (LESSONS[nextLevel] && LESSONS[nextLevel].length > 0) {
                    this.openLesson(LESSONS[nextLevel][0].id);
                } else {
                    // Go back to lessons screen if no lessons in next level
                    this.backToLessons();
                }
            } else {
                // Go back to lessons screen if no next level
                this.backToLessons();
            }
        }
    }
    
    /**
     * Start learning from the beginning
     */
    startLearning() {
        // Go to lessons screen
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById('lessons-screen').classList.add('active');
        
        // Set level to beginner
        this.currentLevel = 'beginner';
        
        // Update level buttons
        document.querySelectorAll('.level-btn').forEach(button => {
            button.classList.remove('active');
            if (button.dataset.level === 'beginner') {
                button.classList.add('active');
            }
        });
        
        // Render beginner lessons
        this.renderLessons();
        
        // Open the first lesson if available
        if (LESSONS.beginner && LESSONS.beginner.length > 0) {
            this.openLesson(LESSONS.beginner[0].id);
        }
    }
    
    /**
     * Continue from last played lesson
     */
    continueProgress() {
        const continueBtn = document.getElementById('continue-btn');
        if (!continueBtn) return;
        
        const lessonId = continueBtn.dataset.lessonId;
        const level = continueBtn.dataset.level;
        
        if (lessonId && level) {
            // Set current level
            this.currentLevel = level;
            
            // Update level buttons
            document.querySelectorAll('.level-btn').forEach(button => {
                button.classList.remove('active');
                if (button.dataset.level === level) {
                    button.classList.add('active');
                }
            });
            
            // Go to lessons screen
            document.querySelectorAll('.screen').forEach(screen => {
                screen.classList.remove('active');
            });
            document.getElementById('lessons-screen').classList.add('active');
            
            // Render lessons for the level
            this.renderLessons();
            
            // Open the lesson
            this.openLesson(lessonId);
        }
    }
    
    /**
     * Handle note played event
     */
    handleNotePlayed(event) {
        if (!this.currentLesson) return;
        
        const note = event.detail.note;
        
        // Check if the note is part of the current lesson
        let isCorrectNote = false;
        
        if (this.currentLesson.content.notes) {
            if (Array.isArray(this.currentLesson.content.notes)) {
                // Simple note array
                isCorrectNote = this.currentLesson.content.notes.includes(note);
            } else if (typeof this.currentLesson.content.notes === 'object') {
                // Complex note structure - check all note arrays
                isCorrectNote = Object.values(this.currentLesson.content.notes).some(noteArray => {
                    if (Array.isArray(noteArray)) {
                        return noteArray.includes(note);
                    } else if (Array.isArray(noteArray[0])) {
                        // Handle arrays of arrays (e.g., chords)
                        return noteArray.some(subArray => Array.isArray(subArray) && subArray.includes(note));
                    }
                    return false;
                });
            }
        }
        
        // Provide visual feedback
        const keyElement = document.querySelector(`.piano-key[data-note="${note}"]`);
        if (keyElement) {
            if (isCorrectNote) {
                keyElement.classList.add('correct');
                setTimeout(() => {
                    keyElement.classList.remove('correct');
                }, 500);
            } else {
                keyElement.classList.add('incorrect');
                setTimeout(() => {
                    keyElement.classList.remove('incorrect');
                }, 500);
            }
        }
    }
    
    /**
     * Play an improvisation demo for the Improvisation Basics lesson
     */
    playImprovisationDemo() {
        if (!this.currentLesson || !this.currentLesson.content.notes) return;
        
        const improvisationData = this.currentLesson.content.notes;
        const pianoSoundType = localStorage.getItem('pianoSoundType') || 'synthesized';
        const useSamples = pianoSoundType === 'sampled' && window.pianoSamples && window.pianoSamples.loaded;
        
        // Calculate total duration
        let totalDuration = 0;
        
        // First, play the C major scale ascending and descending
        if (improvisationData.scale && improvisationData.scale.length > 0) {
            const scaleNotes = [...improvisationData.scale, ...improvisationData.scale.slice(0, -1).reverse()];
            
            if (useSamples) {
                window.pianoSamples.playSequence(scaleNotes, 120); // 120 BPM
            } else {
                window.piano.playSequence(scaleNotes, 120); // 120 BPM
            }
            
            totalDuration += (scaleNotes.length * (60 / 120)) * 1000;
        }
        
        // Then, play the chord progression
        if (improvisationData.chordProgression && improvisationData.chordProgression.length > 0) {
            setTimeout(() => {
                this.playImprovisationChords(improvisationData.chordProgression, useSamples);
            }, totalDuration + 1000); // Add a 1-second pause
            
            totalDuration += (improvisationData.chordProgression.length * 1.5) * 1000 + 1000;
        }
        
        // Finally, play an example improvisation melody
        if (improvisationData.melody && improvisationData.melody.length > 0) {
            setTimeout(() => {
                if (useSamples) {
                    window.pianoSamples.playSequence(improvisationData.melody, 100); // Slightly slower for melody
                } else {
                    window.piano.playSequence(improvisationData.melody, 100);
                }
            }, totalDuration + 1000); // Add a 1-second pause
            
            totalDuration += (improvisationData.melody.length * (60 / 100)) * 1000 + 1000;
        }
        
        // Re-enable the play demo button after all parts finish
        setTimeout(() => {
            if (this.playDemoBtn) {
                this.playDemoBtn.disabled = false;
                this.playDemoBtn.textContent = 'Play Demo';
            }
        }, totalDuration + 1000); // Add a buffer
    }
    
    /**
     * Play chord progression for improvisation demo
     */
    playImprovisationChords(chords, useSamples) {
        if (!chords || !chords.length) return;
        
        // Duration for each chord in seconds
        const chordDuration = 1.5;
        
        // Play each chord in sequence
        chords.forEach((chord, index) => {
            setTimeout(() => {
                // Stop any currently playing notes before playing the next chord
                if (useSamples && window.pianoSamples) {
                    window.pianoSamples.stopAllNotes();
                } else if (window.piano) {
                    window.piano.stopAllNotes();
                }
                
                // Play the chord
                if (useSamples && window.pianoSamples) {
                    window.pianoSamples.playChord(chord, 1.2);
                    
                    // Highlight keys
                    chord.forEach(note => {
                        if (window.piano) {
                            window.piano.highlightKey(note, true);
                        }
                    });
                    
                    // Remove highlights
                    setTimeout(() => {
                        chord.forEach(note => {
                            if (window.piano) {
                                window.piano.highlightKey(note, false);
                            }
                        });
                    }, 1000);
                } else if (window.piano) {
                    window.piano.playChord(chord, 1.2);
                }
            }, index * chordDuration * 1000);
        });
    }
    
    /**
     * Get user progress for a specific lesson
     * @param {string} lessonId - The lesson ID
     * @returns {Object|null} - The progress object or null if no progress
     */
    getUserProgressForLesson(lessonId) {
        return this.userProgress[lessonId] || null;
    }
    
    /**
     * Find a lesson by its ID
     * @param {string} lessonId - The lesson ID to find
     * @returns {Object|null} - The lesson object or null if not found
     */
    findLessonById(lessonId) {
        // Check all levels for the lesson
        for (const level in LESSONS) {
            const foundLesson = LESSONS[level].find(lesson => lesson.id === lessonId);
            if (foundLesson) return foundLesson;
        }
        return null;
    }
}

// Create lesson manager instance when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.lessonManager = new LessonManager();
}); 