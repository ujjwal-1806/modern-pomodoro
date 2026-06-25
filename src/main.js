import './style.css'
const MODES = {
  focus: 25 * 60,
  break: 5 * 60,
};

let currentMode = 'focus';
let timeLeft = MODES[currentMode];
let timerInterval = null;
let endTime = null;

const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const modeButtons = document.querySelectorAll('.mode-btn');

function updateDisplay(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const displayString = `${minutes.toString().padStart(2, '0')}:${remainderSeconds.toString().padStart(2, '0')}`;
  
  timeDisplay.textContent = displayString;
  document.title = `${displayString} - ${currentMode === 'focus' ? 'Focus' : 'Break'}`;
}

function startTimer() {
  if (timerInterval) return;
  
  startBtn.classList.add('hidden');
  pauseBtn.classList.remove('hidden');

  endTime = Date.now() + timeLeft * 1000;

  timerInterval = setInterval(() => {
    const secondsLeft = Math.round((endTime - Date.now()) / 1000);

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      timeLeft = 0;
      updateDisplay(0);
      handleTimerComplete();
      return;
    }

    timeLeft = secondsLeft;
    updateDisplay(timeLeft);
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  
  pauseBtn.classList.add('hidden');
  startBtn.classList.remove('hidden');
}

function resetTimer() {
  pauseTimer();
  timeLeft = MODES[currentMode];
  updateDisplay(timeLeft);
}

function handleTimerComplete() {
  pauseTimer();
  alert(`${currentMode === 'focus' ? 'Focus session' : 'Break'} complete!`);
}

function switchMode(mode) {
  if (currentMode === mode) return;
  
  currentMode = mode;
  
  modeButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });

  resetTimer();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

modeButtons.forEach(btn => {
  btn.addEventListener('click', () => switchMode(btn.dataset.mode));
});

updateDisplay(timeLeft);
