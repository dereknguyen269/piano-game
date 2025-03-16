/**
 * Piano Learning Game Data
 * Contains all lesson data, note mappings, and game configurations
 */

// Piano note frequencies (A4 = 440Hz)
const NOTE_FREQUENCIES = {
    'C2': 65.41, 'C#2': 69.30, 'D2': 73.42, 'D#2': 77.78, 'E2': 82.41, 'F2': 87.31, 'F#2': 92.50, 'G2': 98.00, 'G#2': 103.83, 'A2': 110.00, 'A#2': 116.54, 'B2': 123.47,
    'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'D#3': 155.56, 'E3': 164.81, 'F3': 174.61, 'F#3': 185.00, 'G3': 196.00, 'G#3': 207.65, 'A3': 220.00, 'A#3': 233.08, 'B3': 246.94,
    'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
    'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'B5': 987.77,
    'C6': 1046.50
};

// Keyboard mapping for piano keys
const KEYBOARD_MAPPING = {
    'z': 'C4', 's': 'C#4', 'x': 'D4', 'd': 'D#4', 'c': 'E4', 'v': 'F4', 'g': 'F#4', 'b': 'G4', 'h': 'G#4', 'n': 'A4', 'j': 'A#4', 'm': 'B4',
    'q': 'C5', '2': 'C#5', 'w': 'D5', '3': 'D#5', 'e': 'E5', 'r': 'F5', '5': 'F#5', 't': 'G5', '6': 'G#5', 'y': 'A5', '7': 'A#5', 'u': 'B5',
    'i': 'C6'
};

// Piano key layout
const PIANO_KEYS = [
    { note: 'C4', type: 'white' },
    { note: 'C#4', type: 'black' },
    { note: 'D4', type: 'white' },
    { note: 'D#4', type: 'black' },
    { note: 'E4', type: 'white' },
    { note: 'F4', type: 'white' },
    { note: 'F#4', type: 'black' },
    { note: 'G4', type: 'white' },
    { note: 'G#4', type: 'black' },
    { note: 'A4', type: 'white' },
    { note: 'A#4', type: 'black' },
    { note: 'B4', type: 'white' },
    { note: 'C5', type: 'white' },
    { note: 'C#5', type: 'black' },
    { note: 'D5', type: 'white' },
    { note: 'D#5', type: 'black' },
    { note: 'E5', type: 'white' },
    { note: 'F5', type: 'white' },
    { note: 'F#5', type: 'black' },
    { note: 'G5', type: 'white' },
    { note: 'G#5', type: 'black' },
    { note: 'A5', type: 'white' },
    { note: 'A#5', type: 'black' },
    { note: 'B5', type: 'white' },
    { note: 'C6', type: 'white' }
];

// Lesson data
const LESSONS = {
    beginner: [
        {
            id: 'b1',
            title: 'Introduction to the Piano',
            description: 'Learn about the piano keyboard layout and basic finger positioning.',
            category: 'note-identification',
            duration: 5,
            content: {
                instructions: `
                    <h3>Welcome to your first piano lesson!</h3>
                    <p>In this lesson, you'll learn about the piano keyboard layout and how to position your fingers.</p>
                    <p>The white keys are named after the first seven letters of the alphabet: A, B, C, D, E, F, and G. After G, the pattern repeats.</p>
                    <p>The black keys are named with sharps (#) or flats (♭). For example, the black key between C and D can be called C# or D♭.</p>
                    <p>Let's start by finding Middle C (C4) on the keyboard. It's the C note near the middle of the piano.</p>
                    <p>Try pressing the C4 key on the piano below. On your computer keyboard, press the 'z' key.</p>
                `,
                notes: ['C4'],
                keyboardKeys: ['z']
            }
        },
        {
            id: 'b2',
            title: 'Playing Your First Notes',
            description: 'Learn to play the C major scale with your right hand.',
            category: 'finger-positioning',
            duration: 10,
            content: {
                instructions: `
                    <h3>Playing Your First Scale</h3>
                    <p>Today we'll learn the C major scale, which consists of the white keys from C to the next C.</p>
                    <p>For the right hand, we'll use this finger numbering:</p>
                    <ul>
                        <li>Thumb: 1</li>
                        <li>Index finger: 2</li>
                        <li>Middle finger: 3</li>
                        <li>Ring finger: 4</li>
                        <li>Pinky: 5</li>
                    </ul>
                    <p>Play the C major scale using these fingers:</p>
                    <p>C (1), D (2), E (3), F (1), G (2), A (3), B (4), C (5)</p>
                    <p>Notice how we pass the thumb under after the third finger to continue the scale smoothly.</p>
                    <p>Try playing the scale ascending (going up) and then descending (going down).</p>
                `,
                notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'],
                keyboardKeys: ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'q']
            }
        },
        {
            id: 'b3',
            title: 'Basic Rhythm',
            description: 'Learn about note durations and simple rhythmic patterns.',
            category: 'rhythm',
            duration: 15,
            content: {
                instructions: `
                    <h3>Understanding Rhythm</h3>
                    <p>Rhythm is the pattern of sounds and silences in music. It's what gives music its sense of time.</p>
                    <p>In this lesson, we'll learn about different note durations:</p>
                    <ul>
                        <li>Whole note: 4 beats</li>
                        <li>Half note: 2 beats</li>
                        <li>Quarter note: 1 beat</li>
                        <li>Eighth note: 1/2 beat</li>
                    </ul>
                    <p>Let's practice a simple rhythm using quarter notes. Play each note for one beat:</p>
                    <p>C - E - G - C - G - E - C</p>
                    <p>Try to keep a steady tempo (speed) as you play.</p>
                `,
                notes: ['C4', 'E4', 'G4', 'C5', 'G4', 'E4', 'C4'],
                keyboardKeys: ['z', 'c', 'b', 'q', 'b', 'c', 'z']
            }
        },
        {
            id: 'b4',
            title: 'Simple Melodies',
            description: 'Play your first simple tunes with one hand.',
            category: 'melody',
            duration: 20,
            content: {
                instructions: `
                    <h3>Playing "Mary Had a Little Lamb"</h3>
                    <p>Now that you've learned some basic notes and rhythm, let's put them together to play a simple melody.</p>
                    <p>"Mary Had a Little Lamb" uses just three notes: E, D, and C.</p>
                    <p>Here's the sequence:</p>
                    <p>E - D - C - D - E - E - E (pause) D - D - D (pause) E - G - G (pause) E - D - C - D - E - E - E - E - D - D - E - D - C</p>
                    <p>Try playing this melody slowly at first, then gradually increase your speed as you become more comfortable.</p>
                `,
                notes: ['E4', 'D4', 'C4', 'D4', 'E4', 'E4', 'E4', 'D4', 'D4', 'D4', 'E4', 'G4', 'G4', 'E4', 'D4', 'C4', 'D4', 'E4', 'E4', 'E4', 'E4', 'D4', 'D4', 'E4', 'D4', 'C4'],
                keyboardKeys: ['c', 'x', 'z', 'x', 'c', 'c', 'c', 'x', 'x', 'x', 'c', 'b', 'b', 'c', 'x', 'z', 'x', 'c', 'c', 'c', 'c', 'x', 'x', 'c', 'x', 'z']
            }
        }
    ],
    intermediate: [
        {
            id: 'i1',
            title: 'Two-Hand Coordination',
            description: 'Learn to play with both hands simultaneously.',
            category: 'finger-positioning',
            duration: 15,
            content: {
                instructions: `
                    <h3>Playing with Both Hands</h3>
                    <p>Now we'll start using both hands together. This can be challenging at first, but with practice, it will become natural.</p>
                    <p>Let's start with a simple exercise where the left hand plays a steady pattern while the right hand plays a melody.</p>
                    <p>Left hand: Play C3 and G3 alternating (C-G-C-G...)</p>
                    <p>Right hand: Play the C major scale (C-D-E-F-G-A-B-C)</p>
                    <p>Try playing the left hand pattern a few times alone, then the right hand alone, and finally put them together.</p>
                `,
                notes: {
                    right: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'],
                    left: ['C3', 'G3', 'C3', 'G3', 'C3', 'G3', 'C3', 'G3']
                }
            }
        },
        {
            id: 'i2',
            title: 'Introduction to Chords',
            description: 'Learn basic triads and how to play them.',
            category: 'chords',
            duration: 20,
            content: {
                instructions: `
                    <h3>Understanding Chords</h3>
                    <p>A chord is a group of three or more notes played together. The most basic chord is a triad, which consists of three notes.</p>
                    <p>Today we'll learn the C major, F major, and G major chords, which are the primary chords in the key of C.</p>
                    <p>C major: C-E-G</p>
                    <p>F major: F-A-C</p>
                    <p>G major: G-B-D</p>
                    <p>Practice playing each chord, making sure all notes sound together. Then try switching between them smoothly.</p>
                `,
                notes: {
                    chords: [
                        ['C4', 'E4', 'G4'], // C major
                        ['F4', 'A4', 'C5'], // F major
                        ['G4', 'B4', 'D5']  // G major
                    ]
                }
            }
        },
        {
            id: 'i3',
            title: 'Basic Scales and Arpeggios',
            description: 'Learn major scales and arpeggios in common keys.',
            category: 'scales',
            duration: 25,
            content: {
                instructions: `
                    <h3>Scales and Arpeggios</h3>
                    <p>Scales and arpeggios are fundamental exercises for developing finger technique.</p>
                    <p>We've already learned the C major scale. Now let's learn the G major scale, which has one sharp (F#).</p>
                    <p>G major scale: G-A-B-C-D-E-F#-G</p>
                    <p>An arpeggio is when you play the notes of a chord one after another instead of simultaneously.</p>
                    <p>C major arpeggio: C-E-G-C-G-E-C</p>
                    <p>Practice these patterns with proper fingering to develop your technique.</p>
                `,
                notes: {
                    gScale: ['G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F#5', 'G5'],
                    cArpeggio: ['C4', 'E4', 'G4', 'C5', 'G4', 'E4', 'C4']
                }
            }
        }
    ],
    advanced: [
        {
            id: 'a1',
            title: 'Complex Rhythms',
            description: 'Learn to play dotted rhythms, triplets, and syncopation.',
            category: 'rhythm',
            duration: 30,
            content: {
                instructions: `
                    <h3>Advanced Rhythmic Patterns</h3>
                    <p>In this lesson, we'll explore more complex rhythmic patterns that add interest and sophistication to your playing.</p>
                    <p>Dotted rhythms: A dot after a note increases its duration by half. For example, a dotted quarter note equals a quarter note plus an eighth note (1.5 beats).</p>
                    <p>Triplets: Three notes played in the time of two. This creates a flowing, waltz-like feel.</p>
                    <p>Syncopation: Placing emphasis on normally weak beats, creating a sense of rhythmic tension.</p>
                    <p>Let's practice these patterns with simple melodies.</p>
                `,
                notes: {
                    // Dotted rhythm example (dotted quarter + eighth pattern)
                    dotted: ['C4', 'E4', 'G4', 'C5', 'G4', 'E4', 'C4'],
                    // Triplet example
                    triplets: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4'],
                    // Syncopation example
                    syncopation: ['C4', 'E4', 'D4', 'F4', 'E4', 'G4', 'F4', 'A4', 'G4']
                }
            }
        },
        {
            id: 'a3',
            title: 'Improvisation Basics',
            description: 'Learn to create your own music using scales and chord progressions.',
            category: 'improvisation',
            duration: 40,
            content: {
                instructions: `
                    <h3>Introduction to Improvisation</h3>
                    <p>Improvisation is the art of creating music spontaneously. It allows you to express yourself freely at the piano.</p>
                    <p>We'll start with a simple approach using the C major scale over basic chord progressions.</p>
                    <p>Try improvising a melody with your right hand using only the notes of the C major scale (C-D-E-F-G-A-B) while your left hand plays a simple chord progression (C-F-G-C).</p>
                    <p>Remember, there are no wrong notes in improvisation—only opportunities to create something unique!</p>
                `,
                notes: {
                    // C major scale for right hand improvisation
                    scale: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'],
                    // Basic chord progression for left hand
                    chordProgression: [
                        ['C3', 'E3', 'G3'], // C major
                        ['F3', 'A3', 'C4'], // F major
                        ['G3', 'B3', 'D4'], // G major
                        ['C3', 'E3', 'G3']  // C major
                    ],
                    // Example improvisation melody
                    melody: ['E4', 'G4', 'C5', 'B4', 'G4', 'A4', 'F4', 'D4', 'E4', 'C4', 'E4', 'G4']
                }
            }
        }
    ]
}; 