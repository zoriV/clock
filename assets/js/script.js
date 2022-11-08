//© Viroz

// const tickSound = new Audio(required("../sound/pablo.mp3"));

let clockFont;
let titleFont;
let timer = 0;
function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent(document.querySelector("main"));
  clockFont = loadFont("assets/fonts/digital-7.ttf");
  titleFont = loadFont("assets/fonts/Roboto-Light.ttf");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

const nextEnglishLesson = () => {
  const now = new Date();
  //wt 13:55 - 14:40
  //sr 13:05 - 13:50
  let nextLesson = { isCurrentlyHappening: false, timeRemaining: new Date() };

  if (now.getDay == 2 && now.getHours() <= 13) {
    // if (now.getHours() == 13 && now.getMinutes() < 5)
    nextLesson.timeRemaining = new Date(now.setDate(now.getDate() + ((7 - now.getDay() + 2) % 7 || 7))); //wtorek
    nextLesson.timeRemaining.setHours(13, 55, 0);
  } else {
    nextLesson.timeRemaining = new Date(now.setDate(now.getDate() + ((7 - now.getDay() + 3) % 7 || 7))); // sroda
    nextLesson.timeRemaining.setHours(13, 5, 0);
  }

  if (now.getDay() == 2 && ((now.getHours() == 13 && now.getMinutes() >= 55) || (now.getHours() == 14 && now.getMinutes() >= 40))) {
    nextLesson.isCurrentlyHappening = true;
    nextLesson.timeRemaining = new Date();
    nextLesson.timeRemaining.setHours(14, 40, 0);
  } else if (now.getDay() == 3 && now.getHours() == 13 && now.getMinutes() >= 5 && now.getMinutes() <= 50) {
    nextLesson.isCurrentlyHappening = true;
    nextLesson.timeRemaining = new Date();
    nextLesson.timeRemaining.setHours(13, 50, 0);
  }

  return nextLesson;
};

const getTimer = () => {
  const nel = nextEnglishLesson();
  const date = nel.timeRemaining;
  const now = new Date();
  const difference = date.getTime() - now.getTime();
  const d = Math.floor(difference / (1000 * 60 * 60 * 24));
  const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((difference % (1000 * 60)) / 1000);

  return { d, h, m, s, isHappening: nel.isCurrentlyHappening };
};

let lesson = getTimer();

function draw() {
  background(0);
  fill("#ff0a0a");
  textFont(titleFont);
  textAlign(CENTER, TOP);
  textSize(width / 32.56);
  text("Czas do angielskiego:", width / 2, height / 2 - width / 4.25 + 20);
  clock(lesson);
  if (millis() >= 1000 + timer) {
    lesson = getTimer();
    timer = millis();
    // tickSound.play();
  }
}

function clock({ d, h, m, s }) {
  fill("#ff0000");
  textFont(clockFont);
  textAlign(CENTER, CENTER);
  textSize(width / 5.25);
  let secs = s <= 9 ? `0${s}` : s,
    mins = m <= 9 ? `0${m}` : m;
  text(`${d} ${h}:${mins}:${secs}`, width / 2, height / 2);
}

let interval = setInterval(() => {
  window.scrollTo(0, 0);
}, 10);
setTimeout(() => {
  clearInterval(interval);
}, 1000);
