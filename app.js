let flame = document.getElementById('flame');
let song = document.getElementById('song');
const playBtn = document.getElementById('playBtn');
let blown = false;

// Microphone detection
navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then(stream => {
    const audioContext = new AudioContext();
    const mic = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    mic.connect(analyser);
    analyser.fftSize = 256;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    function detectBlow() {
      analyser.getByteFrequencyData(dataArray);
      let volume = dataArray.reduce((a, b) => a + b) / dataArray.length;

      if (volume > 50 && !blown) {
        blown = true;
        flame.style.display = 'none';
        launchConfetti();
        song.play().catch(e => console.error("Music failed:", e));
      }

      requestAnimationFrame(detectBlow);
    }

    detectBlow();
  })
  .catch(err => {
    alert('Mic access denied. This feature needs microphone access.');
  });

// Confetti animation
function launchConfetti() {
  const duration = 3 * 1000;
  const end = Date.now() + duration;

  const colors = ['#ff4081', '#ffeb3b', '#8bc34a', '#00bcd4'];

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// Button opens popup
playBtn.addEventListener('click', () => {
  Swal.fire({
    title: "🎉 Sretan veliki 20. girlyy! 🎉",
    text: "Želim da ti se ispune sve želje! Sad si dovoljno stara da znaš bolje… i dovoljno mlada da svejedno napraviš glupost.😜 Love you! 💖",
    imageUrl: 'cake.png', // zamijeni s linkom ili putanjom do tvoje slike
    imageWidth: 200,
    confirmButtonText: "Close",
    confirmButtonColor: '#3180aa'
  });
});