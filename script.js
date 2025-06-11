// script.js

document.addEventListener("DOMContentLoaded", function () {
  const herovideo = document.querySelector(".video");
  const welcome = document.querySelector(".welcome");
  const blackout = document.getElementById("blackout-overlay");
  const slope = document.getElementById("slope-effect");
  const seedSwirl = document.getElementById("seed-swirl");
  const swirlWords = document.querySelectorAll('.swirl-words span');
  const joltPara = document.getElementById("jolt-paragraph");
  const redFlash = document.getElementById("red-flash");

  let slopeShown = false;
  let swirlActive = false;
  let pulsing = false;
  let pulseTimeouts = [];
  let joltActive = false;
  let shakePulseInterval = null;
  let flashInterval = null;

  // Welcome overlay: Hide and play video
  welcome.addEventListener("click", function () {
    welcome.classList.remove("visible");
    setTimeout(() => welcome.style.display = "none", 400);
    herovideo.play();
  });

  herovideo.addEventListener("timeupdate", function () {
    const t = herovideo.currentTime;

    // Blackout overlay
    if (t >= 13 && t < 16) {
      blackout.classList.add("visible");
    } else {
      blackout.classList.remove("visible");
    }

    // Slope effect (falling text)
    if (slope) {
      if (t >= 59 && t <= 61) {
        if (!slopeShown) {
          slope.classList.add("fall");
          slopeShown = true;
        }
      } else if (slopeShown) {
        slope.classList.remove("fall");
        slopeShown = false;
      }
    }

    // Seed swirl (add/remove class)
    if (seedSwirl) {
      if (t >= 19 && t < 33) {
        if (!swirlActive) {
          seedSwirl.classList.add("swirling");
          swirlActive = true;
        }
      } else if (swirlActive) {
        seedSwirl.classList.remove("swirling");
        swirlActive = false;
      }
    }

    // Word pulsing effect for seeds line
    if (swirlWords.length > 0) {
      if (t >= 19 && t < 33) {
        if (!pulsing) {
          pulsing = true;
          let total = swirlWords.length;
          function pulseLoop(loopNum) {
            swirlWords.forEach((word, i) => {
              pulseTimeouts[i] = setTimeout(() => {
                word.classList.add('pulse');
                setTimeout(() => word.classList.remove('pulse'), 800);
              }, i * 800 + loopNum * total * 800);
            });
            if (herovideo.currentTime >= 19 && herovideo.currentTime < 33) {
              pulseTimeouts[total] = setTimeout(() => pulseLoop(loopNum + 1), total * 800);
            }
          }
          pulseLoop(0);
        }
      } else if (pulsing) {
        pulseTimeouts.forEach(tid => clearTimeout(tid));
        swirlWords.forEach(word => word.classList.remove('pulse'));
        pulsing = false;
        pulseTimeouts = [];
      }
    }

    // Jolt and red flash effect (1:32–1:52)
    if (joltPara && redFlash) {
      if (t >= 92 && t < 112) {
        if (!joltActive) {
          joltPara.classList.add('jolt');
          startPulseShake();
          startRedFlashing();
          joltActive = true;
        }
      } else if (joltActive) {
        joltPara.classList.remove('jolt', 'shake');
        stopPulseShake();
        stopRedFlashing();
        joltActive = false;
      }
    }
  });

  // --- Pulse Shake for Jolt Paragraph ---
  function startPulseShake() {
    shakePulseInterval = setInterval(() => {
      joltPara.classList.add('shake');
      setTimeout(() => joltPara.classList.remove('shake'), 330);
    }, 500);
  }
  function stopPulseShake() {
    clearInterval(shakePulseInterval);
    joltPara.classList.remove('shake');
  }

  // --- RED FLASH PULSING LOGIC --- //
  function startRedFlashing() {
    const flashOnDuration = 100;   // RED ON for 200ms (adjust as needed)
    const flashOffDuration = 900;  // RED OFF for 900ms (adjust as needed)
    function doFlash() {
      redFlash.classList.add('active');
      flashInterval = setTimeout(() => {
        redFlash.classList.remove('active');
        flashInterval = setTimeout(doFlash, flashOffDuration);
      }, flashOnDuration);
    }
    doFlash();
  }
  function stopRedFlashing() {
    clearTimeout(flashInterval);
    redFlash.classList.remove('active');
  }
const endingBlackout = document.getElementById("ending-blackout");
const starfield = document.getElementById("starfield");
let endingActive = false;
let starsMade = false;

herovideo.addEventListener("timeupdate", function () {
  // 8:14 is 494 seconds
  if (herovideo.currentTime >= 494) {
    if (!endingActive) {
      endingBlackout.classList.add("active");
      if (!starsMade) {
        makeStars();
        starsMade = true;
      }
      endingActive = true;
    }
  } else {
    if (endingActive) {
      endingBlackout.classList.remove("active");
      endingActive = false;
    }
  }
});

function makeStars() {
  const numStars = 45;
  for (let i = 0; i < numStars; i++) {
    let star = document.createElement('div');
    star.classList.add('star');
    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";
    star.style.animationDuration = (0.9 + Math.random() * 1.2) + 's';
    star.style.animationDelay = (Math.random() * 1.5) + 's';
    starfield.appendChild(star);
  }
}
herovideo.addEventListener("timeupdate", function () {
  // 8:14 is 494 seconds, 8:18 is 498 seconds
  if (herovideo.currentTime >= 494 && herovideo.currentTime < 498) {
    if (!endingActive) {
      endingBlackout.classList.add("active");
      if (!starsMade) {
        makeStars();
        starsMade = true;
      }
      endingActive = true;
    }
  } else {
    if (endingActive) {
      endingBlackout.classList.remove("active");
      endingActive = false;
    }
  }
});
// --- Black and White Lightning Effect (5:39–5:44) ---
const lightningOverlay = document.getElementById("lightning-overlay");
let lightningActive = false;
let lightningInterval = null;

herovideo.addEventListener("timeupdate", function () {
  const t = herovideo.currentTime;

  if (t >= 339 && t < 344) {
    if (!lightningActive) {
      document.documentElement.classList.add('bw-effect'); // <-- key line!
      lightningOverlay.style.display = 'block';
      startLightning();
      lightningActive = true;
    }
  } else {
    if (lightningActive) {
      document.documentElement.classList.remove('bw-effect'); // <-- key line!
      lightningOverlay.style.display = 'none';
      stopLightning();
      lightningActive = false;
    }
  }
});

function startLightning() {
  lightningOverlay.classList.remove('flash');
  lightningInterval = setInterval(() => {
    // Randomly flash 1-2 times per second
    if (Math.random() > 0.55) {
      lightningOverlay.classList.add('flash');
      setTimeout(() => {
        lightningOverlay.classList.remove('flash');
      }, 70 + Math.random() * 70); // quick flash
    }
  }, 300);
}
function stopLightning() {
  clearInterval(lightningInterval);
  lightningOverlay.classList.remove('flash');
}
const swayPara = document.getElementById("sway-paragraph");
const cloudsContainer = document.getElementById("clouds-container");
let swayActive = false;
let cloudsStarted = false;
let cloudTimeouts = [];

function makeCloud(type, delay) {
  setTimeout(() => {
    const cloud = document.createElement('div');
    cloud.className = 'cloud ' + type;
    cloud.style.top = (10 + Math.random() * 40) + "px";
    cloud.style.animationDuration = (38 + Math.random()*18) + 's';
    cloudsContainer.appendChild(cloud);
    setTimeout(() => {cloud.remove();}, 48000);
  }, delay);
}

function startClouds() {
  if (cloudsStarted) return;
  cloudsStarted = true;
  cloudTimeouts = [];
  const cloudTypes = ['small', 'medium', 'big'];
  for (let i = 0; i < 7; i++) {
    let t = cloudTypes[Math.floor(Math.random() * cloudTypes.length)];
    let d = Math.random()*14000;
    cloudTimeouts.push(setTimeout(() => makeCloud(t, 0), d));
  }
}
function stopClouds() {
  cloudTimeouts.forEach(t => clearTimeout(t));
  cloudTimeouts = [];
  cloudsContainer.innerHTML = '';
  cloudsStarted = false;
}

herovideo.addEventListener("timeupdate", function () {
  const t = herovideo.currentTime;
  // 1:13 (73s) to 1:31 (91s)
  if (t >= 73 && t < 91) {
    if (!swayActive) {
      swayPara.classList.add('sway');
      startClouds();
      swayActive = true;
    }
  } else {
    if (swayActive) {
      swayPara.classList.remove('sway');
      stopClouds();
      swayActive = false;
    }
  }
});

});
