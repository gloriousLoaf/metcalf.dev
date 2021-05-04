/* Theme Switcher */
const box = document.querySelector('.box');
const themeBtn = document.getElementById('theme-btn');

const lightMode = () => {
  box.classList.remove('invert');
  localStorage.setItem('dark theme', 'off');
};

const darkMode = () => {
  box.classList.add('invert');
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
