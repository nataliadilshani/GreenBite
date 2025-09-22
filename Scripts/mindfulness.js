// ===== Guided Breathing =====
let breathingInterval;
document.getElementById('start-breathing').addEventListener('click', () => {
    const circle = document.querySelector('.breathing-circle');
    const text = document.querySelector('.breathing-text');
    let phase = 'inhale';
    clearInterval(breathingInterval);
    breathingInterval = setInterval(() => {
        if (phase === 'inhale') {
            circle.style.transform = 'scale(1.5)';
            circle.style.backgroundColor = '#4aaf7f';
            text.textContent = 'Exhale...';
            phase = 'exhale';
        } else {
            circle.style.transform = 'scale(1)';
            circle.style.backgroundColor = '#1e6d48';
            text.textContent = 'Inhale...';
            phase = 'inhale';
        }
    }, 4000);
});

// ===== Timer Tool (Pomodoro / Meditation) =====
let timerInterval;
document.getElementById('start-timer').addEventListener('click', () => {
    clearInterval(timerInterval);
    let minutes = parseInt(document.getElementById('timer-minutes').value) || 0;
    if (minutes <= 0) return; // Prevent 0 or negative input
    let timeLeft = minutes * 60;
    const display = document.getElementById('timer-display');
    timerInterval = setInterval(() => {
        let m = Math.floor(timeLeft / 60);
        let s = timeLeft % 60;
        display.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            display.textContent = "Session Complete!";
            incrementSession();
        }
        timeLeft--;
    }, 1000);
});

// ===== Ambient Sounds =====
let audio = null;

function playSound(id) {
    if (audio && !audio.paused) audio.pause();
    audio = document.getElementById(id);
    audio.loop = true;
    audio.play();
}

// Stop sound button
const stopSoundBtn = document.getElementById('stop-sound');
if (stopSoundBtn) {
    stopSoundBtn.addEventListener('click', () => {
        if (audio) audio.pause();
    });
}

// ===== Session Tracker =====
function incrementSession() {
    let count = parseInt(localStorage.getItem('sessions') || '0');
    count++;
    localStorage.setItem('sessions', count);
    const sessionDisplay = document.getElementById('session-count');
    if (sessionDisplay) sessionDisplay.textContent = count;
}

// Initialize session count on page load
document.addEventListener('DOMContentLoaded', () => {
    const sessionDisplay = document.getElementById('session-count');
    if (sessionDisplay) sessionDisplay.textContent = localStorage.getItem('sessions') || '0';
});

// ===== Modals =====
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "block";
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "none";
}

// ===== Nature Video Autoplay =====
document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.video-section video');
    if (video) {
        video.play().catch(err => console.log('Autoplay blocked', err));
    }
});
