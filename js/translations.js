/**
 * Piano Learning Game Translations
 * Contains all text translations for multiple languages
 */

const TRANSLATIONS = {
    // English translations (default)
    en: {
        // Navigation
        nav_home: "Home",
        nav_lessons: "Lessons",
        nav_practice: "Practice",
        nav_settings: "Settings",
        
        // Home screen
        welcome_title: "Welcome to Piano Learning Game",
        welcome_subtitle: "Learn to play piano at your own pace with interactive lessons and exercises.",
        progress_title: "Your Progress",
        start_learning: "Start Learning",
        continue_learning: "Continue Where You Left Off",
        
        // Lessons screen
        lessons_title: "Piano Lessons",
        
        // Practice screen
        practice_title: "Practice Mode",
        practice_free_play: "Free Play",
        practice_free_play_desc: "Play freely on the piano with visual guidance",
        practice_scales: "Scales",
        practice_scales_desc: "Practice common scales and finger patterns",
        practice_chords: "Chords",
        practice_chords_desc: "Learn and practice different chord types",
        
        // Lesson player
        back_to_lessons: "← Back to Lessons",
        play_demo: "Play Demo",
        restart: "Restart",
        next_lesson: "Next Lesson",
        mark_complete: "Mark Complete",
        
        // Common
        loading: "Loading...",
        ready: "Ready to start!",
        complete: "Complete!",
        score: "Score",
        time: "Time",
        seconds: "seconds",
        lesson_completed: "Lesson Completed!",
        
        // Challenges screen
        challenges_title: "Challenges",
        challenge_start: "Start Challenge",
        
        // Settings screen
        settings_title: "Settings",
        settings_sound: "Sound",
        settings_volume: "Volume",
        settings_piano_sound_type: "Piano Sound Type",
        settings_synthesized: "Synthesized Piano",
        settings_sampled: "Sampled Piano (Local)",
        settings_sound_type_desc: "Choose between synthesized or sampled piano sounds",
        settings_synth_quality: "Synthesizer Quality",
        settings_basic: "Basic",
        settings_high: "High (with harmonics)",
        settings_synth_tone: "Synthesizer Tone",
        settings_soft: "Soft (Sine)",
        settings_medium: "Medium (Triangle)",
        settings_bright: "Bright (Square)",
        settings_sharp: "Sharp (Sawtooth)",
        settings_monophonic: "Monophonic Mode (one note at a time)",
        settings_monophonic_desc: "Prevents notes from overlapping",
        settings_note_cutoff: "Note Cutoff",
        settings_note_cutoff_desc: "Stops previous notes when playing sequences",
        settings_display: "Display",
        settings_show_notes: "Show Note Names",
        settings_show_fingers: "Show Finger Numbers",
        settings_language: "Language",
        settings_language_desc: "Change the application language",
        settings_input: "Input Method",
        settings_keyboard: "Computer Keyboard",
        settings_midi: "MIDI Keyboard",
        settings_data: "Data Management",
        settings_reset_progress: "Reset Progress",
        settings_reset_all: "Reset All Settings",
        
        // Lesson player
        back_to_lessons: "← Back to Lessons",
        play_demo: "Play Demo",
        restart: "Restart",
        next_lesson: "Next Lesson",
        
        // Challenges
        back_to_challenges: "← Back to Challenges",
        restart_challenge: "Restart Challenge",
        
        // Common
        loading: "Loading...",
        ready: "Ready to start!",
        complete: "Challenge Complete!",
        score: "Score",
        time: "Time",
        seconds: "seconds",
        try_again: "Try Again",
        
        // Notifications
        settings_saved: "Settings saved successfully",
        progress_reset: "Progress has been reset",
        all_reset: "All settings have been reset",
        
        // Compatibility warning
        compatibility_warning: "Browser Compatibility Issue",
        dismiss: "Dismiss",
        
        // Lesson content translations
        lesson_content: {
            // Beginner lessons
            b1: {
                title: 'Introduction to the Piano',
                description: 'Learn about the piano keyboard layout and basic finger positioning.',
                instructions: `
                    <h3>Welcome to your first piano lesson!</h3>
                    <p>In this lesson, you'll learn about the piano keyboard layout and how to position your fingers.</p>
                    <p>The white keys are named after the first seven letters of the alphabet: A, B, C, D, E, F, and G. After G, the pattern repeats.</p>
                    <p>The black keys are named with sharps (#) or flats (♭). For example, the black key between C and D can be called C# or D♭.</p>
                    <p>Let's start by finding Middle C (C4) on the keyboard. It's the C note near the middle of the piano.</p>
                    <p>Try pressing the C4 key on the piano below. On your computer keyboard, press the 'z' key.</p>
                `
            },
            b2: {
                title: 'Playing Your First Notes',
                description: 'Learn to play the C major scale with your right hand.',
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
                `
            },
            b3: {
                title: 'Basic Rhythm',
                description: 'Learn about note durations and simple rhythmic patterns.',
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
                `
            },
            b4: {
                title: 'Simple Melodies',
                description: 'Play your first simple tunes with one hand.',
                instructions: `
                    <h3>Playing "Mary Had a Little Lamb"</h3>
                    <p>Now that you've learned some basic notes and rhythm, let's put them together to play a simple melody.</p>
                    <p>"Mary Had a Little Lamb" uses just three notes: E, D, and C.</p>
                    <p>Here's the sequence:</p>
                    <p>E - D - C - D - E - E - E (pause) D - D - D (pause) E - G - G (pause) E - D - C - D - E - E - E - E - D - D - E - D - C</p>
                    <p>Try playing this melody slowly at first, then gradually increase your speed as you become more comfortable.</p>
                `
            },
            // Intermediate lessons
            i1: {
                title: 'Two-Hand Coordination',
                description: 'Learn to play with both hands simultaneously.',
                instructions: `
                    <h3>Playing with Both Hands</h3>
                    <p>Now we'll start using both hands together. This can be challenging at first, but with practice, it will become natural.</p>
                    <p>Let's start with a simple exercise where the left hand plays a steady pattern while the right hand plays a melody.</p>
                    <p>Left hand: Play C3 and G3 alternating (C-G-C-G...)</p>
                    <p>Right hand: Play the C major scale (C-D-E-F-G-A-B-C)</p>
                    <p>Try playing the left hand pattern a few times alone, then the right hand alone, and finally put them together.</p>
                `
            },
            i2: {
                title: 'Introduction to Chords',
                description: 'Learn basic triads and how to play them.',
                instructions: `
                    <h3>Understanding Chords</h3>
                    <p>A chord is a group of three or more notes played together. The most basic chord is a triad, which consists of three notes.</p>
                    <p>Today we'll learn the C major, F major, and G major chords, which are the primary chords in the key of C.</p>
                    <p>C major: C-E-G</p>
                    <p>F major: F-A-C</p>
                    <p>G major: G-B-D</p>
                    <p>Practice playing each chord, making sure all notes sound together. Then try switching between them smoothly.</p>
                `
            },
            i3: {
                title: 'Basic Scales and Arpeggios',
                description: 'Learn major scales and arpeggios in common keys.',
                instructions: `
                    <h3>Scales and Arpeggios</h3>
                    <p>Scales and arpeggios are fundamental exercises for developing finger technique.</p>
                    <p>We've already learned the C major scale. Now let's learn the G major scale, which has one sharp (F#).</p>
                    <p>G major scale: G-A-B-C-D-E-F#-G</p>
                    <p>An arpeggio is when you play the notes of a chord one after another instead of simultaneously.</p>
                    <p>C major arpeggio: C-E-G-C-G-E-C</p>
                    <p>Practice these patterns with proper fingering to develop your technique.</p>
                `
            },
            // Advanced lessons
            a1: {
                title: 'Complex Rhythms',
                description: 'Learn to play dotted rhythms, triplets, and syncopation.',
                instructions: `
                    <h3>Advanced Rhythmic Patterns</h3>
                    <p>In this lesson, we'll explore more complex rhythmic patterns that add interest and sophistication to your playing.</p>
                    <p>Dotted rhythms: A dot after a note increases its duration by half. For example, a dotted quarter note equals a quarter note plus an eighth note (1.5 beats).</p>
                    <p>Triplets: Three notes played in the time of two. This creates a flowing, waltz-like feel.</p>
                    <p>Syncopation: Placing emphasis on normally weak beats, creating a sense of rhythmic tension.</p>
                    <p>Let's practice these patterns with simple melodies.</p>
                `
            }
        }
    },
    
    // Vietnamese translations
    vi: {
        // Navigation
        nav_home: "Trang chủ",
        nav_lessons: "Bài học",
        nav_practice: "Luyện tập",
        nav_settings: "Cài đặt",
        
        // Home screen
        welcome_title: "Chào mừng đến với Trò chơi Học Piano",
        welcome_subtitle: "Học chơi piano theo tốc độ của riêng bạn với các bài học và bài tập tương tác.",
        progress_title: "Tiến độ của bạn",
        start_learning: "Bắt đầu học",
        continue_learning: "Tiếp tục từ nơi bạn đã dừng",
        
        // Levels
        level_beginner: "Người mới",
        level_intermediate: "Trung cấp",
        level_advanced: "Nâng cao",
        
        // Lessons screen
        lessons_title: "Bài học Piano",
        
        // Practice screen
        practice_title: "Chế độ luyện tập",
        practice_free_play: "Chơi tự do",
        practice_free_play_desc: "Chơi tự do trên piano với hướng dẫn trực quan",
        practice_scales: "Âm giai",
        practice_scales_desc: "Luyện tập các âm giai phổ biến và mẫu ngón tay",
        practice_chords: "Hợp âm",
        practice_chords_desc: "Học và luyện tập các loại hợp âm khác nhau",
        
        // Challenges screen
        challenges_title: "Thử thách",
        challenge_start: "Bắt đầu thử thách",
        
        // Settings screen
        settings_title: "Cài đặt",
        settings_sound: "Âm thanh",
        settings_volume: "Âm lượng",
        settings_piano_sound_type: "Loại âm thanh Piano",
        settings_synthesized: "Piano tổng hợp",
        settings_sampled: "Piano mẫu (Cục bộ)",
        settings_sound_type_desc: "Chọn giữa âm thanh piano tổng hợp hoặc mẫu",
        settings_synth_quality: "Chất lượng tổng hợp",
        settings_basic: "Cơ bản",
        settings_high: "Cao (với hòa âm)",
        settings_synth_tone: "Âm sắc tổng hợp",
        settings_soft: "Mềm (Sine)",
        settings_medium: "Trung bình (Triangle)",
        settings_bright: "Sáng (Square)",
        settings_sharp: "Sắc (Sawtooth)",
        settings_monophonic: "Chế độ đơn âm (một nốt tại một thời điểm)",
        settings_monophonic_desc: "Ngăn các nốt chồng lên nhau",
        settings_note_cutoff: "Cắt nốt",
        settings_note_cutoff_desc: "Dừng các nốt trước đó khi chơi chuỗi",
        settings_display: "Hiển thị",
        settings_show_notes: "Hiển thị tên nốt",
        settings_show_fingers: "Hiển thị số ngón tay",
        settings_language: "Ngôn ngữ",
        settings_language_desc: "Thay đổi ngôn ngữ ứng dụng",
        settings_input: "Phương thức nhập",
        settings_keyboard: "Bàn phím máy tính",
        settings_midi: "Bàn phím MIDI",
        settings_data: "Quản lý dữ liệu",
        settings_reset_progress: "Đặt lại tiến độ",
        settings_reset_all: "Đặt lại tất cả cài đặt",
        
        // Lesson player
        back_to_lessons: "← Quay lại bài học",
        play_demo: "Phát thử",
        restart: "Bắt đầu lại",
        next_lesson: "Bài học tiếp theo",
        mark_complete: "Đánh dấu hoàn thành",
        
        // Challenges
        back_to_challenges: "← Quay lại thử thách",
        restart_challenge: "Bắt đầu lại thử thách",
        
        // Common
        loading: "Đang tải...",
        ready: "Sẵn sàng bắt đầu!",
        complete: "Hoàn thành thử thách!",
        score: "Điểm",
        time: "Thời gian",
        seconds: "giây",
        try_again: "Thử lại",
        lesson_completed: "Đã hoàn thành bài học!",
        
        // Notifications
        settings_saved: "Đã lưu cài đặt thành công",
        progress_reset: "Tiến độ đã được đặt lại",
        all_reset: "Tất cả cài đặt đã được đặt lại",
        
        // Compatibility warning
        compatibility_warning: "Vấn đề tương thích trình duyệt",
        dismiss: "Bỏ qua",
        
        // Lesson content translations
        lesson_content: {
            // Beginner lessons
            b1: {
                title: 'Giới thiệu về Đàn Piano',
                description: 'Tìm hiểu về bố cục bàn phím đàn piano và vị trí ngón tay cơ bản.',
                instructions: `
                    <h3>Chào mừng đến với bài học piano đầu tiên của bạn!</h3>
                    <p>Trong bài học này, bạn sẽ tìm hiểu về bố cục bàn phím đàn piano và cách đặt ngón tay.</p>
                    <p>Các phím trắng được đặt tên theo bảy chữ cái đầu tiên của bảng chữ cái: A, B, C, D, E, F và G. Sau G, mẫu lặp lại.</p>
                    <p>Các phím đen được đặt tên với dấu thăng (#) hoặc dấu giáng (♭). Ví dụ, phím đen giữa C và D có thể được gọi là C# hoặc D♭.</p>
                    <p>Hãy bắt đầu bằng cách tìm Đô giữa (C4) trên bàn phím. Đó là nốt C gần giữa đàn piano.</p>
                    <p>Hãy thử nhấn phím C4 trên đàn piano bên dưới. Trên bàn phím máy tính của bạn, nhấn phím 'z'.</p>
                `
            },
            b2: {
                title: 'Chơi Những Nốt Đầu Tiên',
                description: 'Học chơi âm giai C trưởng bằng tay phải.',
                instructions: `
                    <h3>Chơi Âm Giai Đầu Tiên</h3>
                    <p>Hôm nay chúng ta sẽ học âm giai C trưởng, bao gồm các phím trắng từ C đến C tiếp theo.</p>
                    <p>Đối với tay phải, chúng ta sẽ sử dụng cách đánh số ngón tay này:</p>
                    <ul>
                        <li>Ngón cái: 1</li>
                        <li>Ngón trỏ: 2</li>
                        <li>Ngón giữa: 3</li>
                        <li>Ngón áp út: 4</li>
                        <li>Ngón út: 5</li>
                    </ul>
                    <p>Chơi âm giai C trưởng sử dụng các ngón tay này:</p>
                    <p>C (1), D (2), E (3), F (1), G (2), A (3), B (4), C (5)</p>
                    <p>Lưu ý cách chúng ta đưa ngón cái xuống dưới sau ngón thứ ba để tiếp tục âm giai một cách mượt mà.</p>
                    <p>Hãy thử chơi âm giai đi lên (tăng dần) và sau đó đi xuống (giảm dần).</p>
                `
            },
            b3: {
                title: 'Nhịp Điệu Cơ Bản',
                description: 'Tìm hiểu về thời lượng nốt nhạc và các mẫu nhịp điệu đơn giản.',
                instructions: `
                    <h3>Hiểu về Nhịp Điệu</h3>
                    <p>Nhịp điệu là mẫu của âm thanh và sự im lặng trong âm nhạc. Đó là điều mang lại cho âm nhạc cảm giác về thời gian.</p>
                    <p>Trong bài học này, chúng ta sẽ tìm hiểu về các thời lượng nốt nhạc khác nhau:</p>
                    <ul>
                        <li>Nốt tròn: 4 phách</li>
                        <li>Nốt trắng: 2 phách</li>
                        <li>Nốt đen: 1 phách</li>
                        <li>Nốt móc đơn: 1/2 phách</li>
                    </ul>
                    <p>Hãy thực hành một nhịp điệu đơn giản sử dụng các nốt đen. Chơi mỗi nốt trong một phách:</p>
                    <p>C - E - G - C - G - E - C</p>
                    <p>Cố gắng giữ nhịp độ (tốc độ) đều đặn khi bạn chơi.</p>
                `
            },
            b4: {
                title: 'Giai Điệu Đơn Giản',
                description: 'Chơi những bản nhạc đơn giản đầu tiên bằng một tay.',
                instructions: `
                    <h3>Chơi "Mary Had a Little Lamb"</h3>
                    <p>Bây giờ bạn đã học một số nốt cơ bản và nhịp điệu, hãy kết hợp chúng lại để chơi một giai điệu đơn giản.</p>
                    <p>"Mary Had a Little Lamb" chỉ sử dụng ba nốt: E, D và C.</p>
                    <p>Đây là trình tự:</p>
                    <p>E - D - C - D - E - E - E (tạm dừng) D - D - D (tạm dừng) E - G - G (tạm dừng) E - D - C - D - E - E - E - E - D - D - E - D - C</p>
                    <p>Hãy thử chơi giai điệu này chậm lúc đầu, sau đó dần dần tăng tốc độ khi bạn cảm thấy thoải mái hơn.</p>
                `
            },
            // Intermediate lessons
            i1: {
                title: 'Phối Hợp Hai Tay',
                description: 'Học cách chơi đồng thời bằng cả hai tay.',
                instructions: `
                    <h3>Chơi Bằng Cả Hai Tay</h3>
                    <p>Bây giờ chúng ta sẽ bắt đầu sử dụng cả hai tay cùng lúc. Điều này có thể khó khăn lúc đầu, nhưng với sự luyện tập, nó sẽ trở nên tự nhiên.</p>
                    <p>Hãy bắt đầu với một bài tập đơn giản trong đó tay trái chơi một mẫu đều đặn trong khi tay phải chơi một giai điệu.</p>
                    <p>Tay trái: Chơi C3 và G3 luân phiên (C-G-C-G...)</p>
                    <p>Tay phải: Chơi âm giai C trưởng (C-D-E-F-G-A-B-C)</p>
                    <p>Hãy thử chơi mẫu tay trái vài lần một mình, sau đó tay phải một mình, và cuối cùng kết hợp chúng lại với nhau.</p>
                `
            },
            i2: {
                title: 'Giới Thiệu về Hợp Âm',
                description: 'Học các hợp âm ba cơ bản và cách chơi chúng.',
                instructions: `
                    <h3>Hiểu về Hợp Âm</h3>
                    <p>Hợp âm là một nhóm ba hoặc nhiều nốt được chơi cùng nhau. Hợp âm cơ bản nhất là hợp âm ba, bao gồm ba nốt.</p>
                    <p>Hôm nay chúng ta sẽ học các hợp âm C trưởng, F trưởng và G trưởng, là các hợp âm chính trong giọng C.</p>
                    <p>C trưởng: C-E-G</p>
                    <p>F trưởng: F-A-C</p>
                    <p>G trưởng: G-B-D</p>
                    <p>Thực hành chơi từng hợp âm, đảm bảo tất cả các nốt phát ra cùng lúc. Sau đó thử chuyển đổi giữa chúng một cách mượt mà.</p>
                `
            },
            i3: {
                title: 'Âm Giai và Hợp Âm Rải Cơ Bản',
                description: 'Học các âm giai trưởng và hợp âm rải ở các giọng phổ biến.',
                instructions: `
                    <h3>Âm Giai và Hợp Âm Rải</h3>
                    <p>Âm giai và hợp âm rải là các bài tập cơ bản để phát triển kỹ thuật ngón tay.</p>
                    <p>Chúng ta đã học âm giai C trưởng. Bây giờ hãy học âm giai G trưởng, có một dấu thăng (F#).</p>
                    <p>Âm giai G trưởng: G-A-B-C-D-E-F#-G</p>
                    <p>Hợp âm rải là khi bạn chơi các nốt của một hợp âm lần lượt thay vì đồng thời.</p>
                    <p>Hợp âm rải C trưởng: C-E-G-C-G-E-C</p>
                    <p>Thực hành các mẫu này với cách đặt ngón tay đúng để phát triển kỹ thuật của bạn.</p>
                `
            },
            // Advanced lessons
            a1: {
                title: 'Nhịp Điệu Phức Tạp',
                description: 'Học cách chơi nhịp điệu có dấu chấm, bộ ba và nhịp lệch.',
                instructions: `
                    <h3>Mẫu Nhịp Điệu Nâng Cao</h3>
                    <p>Trong bài học này, chúng ta sẽ khám phá các mẫu nhịp điệu phức tạp hơn, tạo thêm sự thú vị và tinh tế cho việc chơi của bạn.</p>
                    <p>Nhịp điệu có dấu chấm: Một dấu chấm sau một nốt làm tăng thời lượng của nó lên một nửa. Ví dụ, một nốt đen có dấu chấm bằng một nốt đen cộng với một nốt móc đơn (1,5 phách).</p>
                    <p>Bộ ba: Ba nốt được chơi trong thời gian của hai nốt. Điều này tạo ra cảm giác trôi chảy, giống như điệu valse.</p>
                    <p>Nhịp lệch: Đặt nhấn mạnh vào các phách thường yếu, tạo ra cảm giác căng thẳng về nhịp điệu.</p>
                    <p>Hãy thực hành các mẫu này với các giai điệu đơn giản.</p>
                `
            }
        }
    }
};

// Current language (default to English)
let currentLanguage = localStorage.getItem('language') || 'en';

/**
 * Get a translated string
 * @param {string} key - The translation key
 * @returns {string} - The translated string
 */
function getTranslation(key) {
    // Get the translations for the current language
    const translations = TRANSLATIONS[currentLanguage];
    
    // Return the translation or the key if not found
    return translations[key] || TRANSLATIONS.en[key] || key;
}

/**
 * Set the application language
 * @param {string} language - The language code ('en' or 'vi')
 */
function setLanguage(language) {
    // Save the language preference
    currentLanguage = language;
    localStorage.setItem('language', language);
    
    // Update all translatable elements
    updateUILanguage();
}

/**
 * Update all UI elements with the current language
 */
function updateUILanguage() {
    // Update navigation buttons
    document.getElementById('home-btn').textContent = getTranslation('nav_home');
    document.getElementById('lessons-btn').textContent = getTranslation('nav_lessons');
    document.getElementById('practice-btn').textContent = getTranslation('nav_practice');
    document.getElementById('settings-btn').textContent = getTranslation('nav_settings');
    
    // Update home screen
    document.querySelector('.welcome-container h2').textContent = getTranslation('welcome_title');
    document.querySelector('.welcome-container > p').textContent = getTranslation('welcome_subtitle');
    document.querySelector('.progress-summary h3').textContent = getTranslation('progress_title');
    document.getElementById('start-learning-btn').textContent = getTranslation('start_learning');
    document.getElementById('continue-btn').textContent = getTranslation('continue_learning');
    
    // Update level buttons
    document.querySelectorAll('.level-btn').forEach(btn => {
        const level = btn.dataset.level;
        btn.textContent = getTranslation(level);
    });
    
    // Update screen titles
    document.querySelector('#lessons-screen > h2').textContent = getTranslation('lessons_title');
    document.querySelector('#practice-screen > h2').textContent = getTranslation('practice_title');
    document.querySelector('#settings-screen > h2').textContent = getTranslation('settings_title');
    
    // Update practice options
    document.querySelector('#free-play h3').textContent = getTranslation('practice_free_play');
    document.querySelector('#free-play p').textContent = getTranslation('practice_free_play_desc');
    document.querySelector('#scales-practice h3').textContent = getTranslation('practice_scales');
    document.querySelector('#scales-practice p').textContent = getTranslation('practice_scales_desc');
    document.querySelector('#chord-practice h3').textContent = getTranslation('practice_chords');
    document.querySelector('#chord-practice p').textContent = getTranslation('practice_chords_desc');
    
    // Update settings groups
    document.querySelectorAll('.setting-group h3').forEach((heading, index) => {
        if (index === 0) heading.textContent = getTranslation('settings_sound');
        else if (index === 1) heading.textContent = getTranslation('settings_display');
        else if (index === 2) heading.textContent = getTranslation('settings_input');
        else if (index === 3) heading.textContent = getTranslation('settings_data');
    });
    
    // Update settings labels
    document.querySelector('label[for="volume"]').textContent = getTranslation('settings_volume');
    document.querySelector('label[for="piano-sound-type"]').textContent = getTranslation('settings_piano_sound_type');
    document.querySelector('label[for="sound-quality"]').textContent = getTranslation('settings_synth_quality');
    document.querySelector('label[for="oscillator-type"]').textContent = getTranslation('settings_synth_tone');
    document.querySelector('label[for="monophonic-mode"]').textContent = getTranslation('settings_monophonic');
    document.querySelector('label[for="note-cutoff"]').textContent = getTranslation('settings_note_cutoff');
    document.querySelector('label[for="show-note-names"]').textContent = getTranslation('settings_show_notes');
    document.querySelector('label[for="show-finger-numbers"]').textContent = getTranslation('settings_show_fingers');
    document.querySelector('label[for="language-selector"]').textContent = getTranslation('settings_language');
    document.querySelector('label[for="input-keyboard"]').textContent = getTranslation('settings_keyboard');
    document.querySelector('label[for="input-midi"]').textContent = getTranslation('settings_midi');
    
    // Update setting descriptions
    document.querySelectorAll('.setting-description').forEach((desc, index) => {
        if (index === 0) desc.textContent = getTranslation('settings_sound_type_desc');
        else if (index === 1) desc.textContent = getTranslation('settings_monophonic_desc');
        else if (index === 2) desc.textContent = getTranslation('settings_note_cutoff_desc');
        else if (index === 3) desc.textContent = getTranslation('settings_language_desc');
    });
    
    // Update select options
    document.querySelectorAll('#piano-sound-type option').forEach((option, index) => {
        if (index === 0) option.textContent = getTranslation('settings_synthesized');
        else if (index === 1) option.textContent = getTranslation('settings_sampled');
    });
    
    document.querySelectorAll('#sound-quality option').forEach((option, index) => {
        if (index === 0) option.textContent = getTranslation('settings_basic');
        else if (index === 1) option.textContent = getTranslation('settings_high');
    });
    
    document.querySelectorAll('#oscillator-type option').forEach((option, index) => {
        if (index === 0) option.textContent = getTranslation('settings_soft');
        else if (index === 1) option.textContent = getTranslation('settings_medium');
        else if (index === 2) option.textContent = getTranslation('settings_bright');
        else if (index === 3) option.textContent = getTranslation('settings_sharp');
    });
    
    // Update buttons
    document.getElementById('reset-progress-btn').textContent = getTranslation('settings_reset_progress');
    document.getElementById('reset-all-btn').textContent = getTranslation('settings_reset_all');
    
    // Update lesson player controls
    document.getElementById('play-demo-btn').textContent = getTranslation('play_demo');
    document.getElementById('restart-lesson-btn').textContent = getTranslation('restart');
    document.getElementById('next-lesson-btn').textContent = getTranslation('next_lesson');
    document.getElementById('back-to-lessons-btn').textContent = getTranslation('back_to_lessons');
    
    // Update settings
    updateSettingsTranslations();
}

/**
 * Get a translated lesson content
 * @param {string} lessonId - The lesson ID
 * @param {string} field - The field to translate (title, description, instructions)
 * @returns {string} - The translated content
 */
function getTranslatedLessonContent(lessonId, field) {
    // Get the translations for the current language
    const translations = TRANSLATIONS[currentLanguage];
    
    // Check if we have translations for this lesson
    if (translations.lesson_content && translations.lesson_content[lessonId] && translations.lesson_content[lessonId][field]) {
        return translations.lesson_content[lessonId][field];
    }
    
    // Fallback to English
    if (TRANSLATIONS.en.lesson_content && TRANSLATIONS.en.lesson_content[lessonId] && TRANSLATIONS.en.lesson_content[lessonId][field]) {
        return TRANSLATIONS.en.lesson_content[lessonId][field];
    }
    
    // If no translation is found, return null
    return null;
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set the language selector to the current language
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.value = currentLanguage;
        
        // Add event listener for language change
        languageSelector.addEventListener('change', (e) => {
            setLanguage(e.target.value);
            
            // Show notification
            if (window.ui && window.ui.showNotification) {
                window.ui.showNotification(getTranslation('settings_saved'));
            }
        });
    }
    
    // Update UI with current language
    updateUILanguage();
}); 