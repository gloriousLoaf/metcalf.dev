/* Typography */
const typing = document.getElementById('typing');
let view = '';
view = window.location.pathname.slice(1) || ' ';
// create different arrays for each view
let typeVals = [];
switch (view) {
  case ' ':
  case 'index2.html':
    typeVals.push('metcalf.dev', 'javascript', 'css', 'html', 'metcalf.dev');
    break;
  case 'portfolio2.html':
    typeVals.push('mongodb', 'express', 'react', 'node', 'metcalf.dev');
    break;
  case 'contact2.html':
    typeVals.push('whatup?');
    break;
}
/**
 * iterator, current word, message in dom,
 * mode for switch, delay & timeout
 */
let idx = -1;
let word = '';
let message = typing.innerHTML;
let mode = true;
let delay = 500;
let timeout;
/* updateText in dom, writer & deleter */
const updateText = (txt) => {
  typing.innerHTML = txt;
};
/**
 * slice off letters & make new substring, update dom;
 * if reached end of last word, clearTimeout;
 * if done typing word, go to delete / false case;
 * else random delay to make it less robotic
 */
const writer = () => {
  message += word.slice(0, 1);
  word = word.substr(1);
  updateText(message);
  if (!word.length && idx === typeVals.length - 1) {
    window.clearTimeout(timeout);
    return;
  }
  if (!word.length) {
    mode = false;
    delay = 1000;
  } else {
    delay = 30 + Math.round(Math.random() * 50);
  }
};
/**
 * slice off in reverse, update dom;
 * if message is fully deleted, delay & switch;
 * else random delay
 */
const deleter = () => {
  message = message.slice(0, -1);
  updateText(message);
  if (!message.length) {
    mode = true;
    delay = 750;
  } else {
    delay = 30 + Math.round(Math.random() * 100);
  }
};

/* type it out, delete it */
const typer = () => {
  // if empty, increment idx, grab new word, clear dom & go
  if (!message) {
    idx++;
    word = typeVals[idx];
    message = '';
    mode = true;
  }
  switch (mode) {
    case true:
      writer();
      break;
    case false:
      deleter();
      break;
  }
  timeout = window.setTimeout(typer, delay);
};
timeout = window.setTimeout(typer, delay);

/* Light & Dark Mode */
const sun = document.getElementById('sun');
const moon = document.getElementById('moon');
const lightDark = document.getElementById('lightDarkMode');
const logo = document.getElementById('logo');
const logoDark = document.getElementById('logoDark');
const html = document.querySelector('html');

/* unset white text & navLinks, light background */
const lightMode = () => {
  localStorage.setItem('dark theme', 'off');
  themeToken = localStorage.getItem('dark theme');
  logo.classList.remove('hide');
  logoDark.classList.add('hide');
  sun.classList.remove('hide');
  moon.classList.add('hide');
  html.classList.remove('dark');
};
/* white text & navLinks, black background, dark cards */
const darkMode = () => {
  localStorage.setItem('dark theme', 'on');
  themeToken = localStorage.getItem('dark theme');
  logo.classList.add('hide');
  logoDark.classList.remove('hide');
  sun.classList.add('hide');
  moon.classList.remove('hide');
  html.classList.add('dark');
};

/* Store user preference */
let themeToken = localStorage.getItem('dark theme');
const preferDark = () => {
  lightDark.checked = true;
  darkMode();
};
themeToken === 'on' && preferDark();

/* check token and toggle dark or light mode, blur toggler */
lightDark.addEventListener('click', () => {
  themeToken = localStorage.getItem('dark theme');
  themeToken !== 'on' || themeToken === 'off' ? darkMode() : lightMode();
  lightDark.blur();
});

/* Hide / reveal helper for keyboard focus on focusin & blur. */
const focusHelper = document.querySelector('.typography small');
lightDark.addEventListener('focusin', () => {
  focusHelper.classList.contains('hide')
    ? focusHelper.classList.remove('hide')
    : focusHelper.classList.add('hide');
});
lightDark.addEventListener('blur', () => {
  !focusHelper.classList.contains('hide')
    ? focusHelper.classList.add('hide')
    : focusHelper.classList.remove('hide');
});
