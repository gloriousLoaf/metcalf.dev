/* Theme Switcher */
const box = document.querySelector('.box');
const themeBtn = document.getElementById('theme-btn');
const ghLogo = document.getElementById('gh-logo');

const lightMode = () => {
  box.classList.remove('invert');
  ghLogo.src = './assets/images/gh-dark.png';
  localStorage.setItem('dark theme', 'off');
};

const darkMode = () => {
  box.classList.add('invert');
  ghLogo.src = './assets/images/gh-light.png';
  localStorage.setItem('dark theme', 'on');
};

let themeToken = localStorage.getItem('dark theme');
const preferDark = () => {
  darkMode();
};

themeToken === 'on' && preferDark();

themeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  box.classList.contains('invert') ? lightMode() : darkMode();
});
