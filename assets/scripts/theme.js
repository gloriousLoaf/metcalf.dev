/* Theme Switcher */
// Dark first: the inline script in each <head> sets data-theme before paint,
// from the saved choice or "dark". The Theme button saves an explicit choice;
// without one, system preference changes are honored as they happen.
const root = document.documentElement;
const themeBtn = document.getElementById("theme-btn");

const savedTheme = () => {
  try {
    return localStorage.getItem("theme");
  } catch {
    return null;
  }
};

themeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const theme = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {}
});

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!savedTheme()) {
      root.dataset.theme = e.matches ? "dark" : "light";
    }
  });
