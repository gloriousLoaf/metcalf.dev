/* Typography */
const typing = document.getElementById('typing');
let view = '';
view = window.location.pathname.slice(1) || ' ';
// create different arrays for each view
let typeVals = [];
switch (view) {
  case ' ':
  case 'index.html':
    typeVals.push('metcalf.dev', 'javascript', 'css', 'html', 'metcalf.dev');
    break;
  case 'portfolio.html':
    typeVals.push('mongodb', 'express', 'react', 'node', 'metcalf.dev');
    break;
  case 'contact.html':
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
/* helpers for typer: updateText in dom, writer & deleter */
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
const text = document.getElementsByTagName('body')[0];
const nav = Array.from(document.querySelectorAll('.navLink'));
const body = Array.from(document.querySelectorAll('.bodyLink'));
const cards = Array.from(document.getElementsByClassName('card'));

/* unset white text & navLinks, light background */
const lightMode = () => {
  localStorage.setItem('dark theme', null);
  themeToken = localStorage.getItem('dark theme');
  console.log('called light, set token to false');
  logo.classList.remove('hide');
  logoDark.classList.add('hide');
  sun.classList.remove('hide');
  moon.classList.add('hide');
  text.style.color = '';
  nav.forEach((link) => {
    link.classList.remove('navLinkDark');
  });
  body.forEach((link) => {
    link.classList.remove('bodyLinkDark');
  });
  cards.forEach((card) => {
    card.classList.remove('dark');
  });
  html.classList.remove('dark');
};
/* white text & navLinks, black background, dark cards */
const darkMode = () => {
  localStorage.setItem('dark theme', 'enabled');
  themeToken = localStorage.getItem('dark theme');
  console.log('called dark, set token to null');
  logo.classList.add('hide');
  logoDark.classList.remove('hide');
  sun.classList.add('hide');
  moon.classList.remove('hide');
  text.style.color = '#fff';
  nav.forEach((link) => {
    link.classList.add('navLinkDark');
  });
  body.forEach((link) => {
    link.classList.add('bodyLinkDark');
  });
  cards.forEach((card) => {
    card.classList.add('dark');
  });
  html.classList.add('dark');
};

/* Store user preference */
let themeToken = localStorage.getItem('dark theme');
const preferDark = () => {
  lightDark.checked = true;
  darkMode();
};

themeToken === 'enabled' && preferDark();

lightDark.addEventListener('click', () => {
  themeToken = localStorage.getItem('dark theme');
  themeToken !== 'enabled' || themeToken === null ? darkMode() : lightMode();
});
