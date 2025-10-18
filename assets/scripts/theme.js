/* Theme Switcher */
const box = document.querySelector(".box");
const themeBtn = document.getElementById("theme-btn");

// Track if this is the initial load (for dark-first behavior)
let isInitialLoad = true;

// Apply theme based on system preference and user override
function applyTheme() {
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const userPreference = localStorage.getItem("theme");

  if (userPreference === "light") {
    // User explicitly wants light theme
    if (systemPrefersDark) {
      box.classList.add("invert"); // System dark + invert = light theme
    } else {
      box.classList.remove("invert"); // System light + no invert = light theme
    }
  } else if (userPreference === "dark") {
    // User explicitly wants dark theme
    if (systemPrefersDark) {
      box.classList.remove("invert"); // System dark + no invert = dark theme
    } else {
      box.classList.add("invert"); // System light + invert = dark theme
    }
  } else {
    // No user preference
    if (isInitialLoad) {
      // Dark-first on initial load
      if (systemPrefersDark) {
        box.classList.remove("invert"); // System dark + no invert = dark theme
      } else {
        box.classList.add("invert"); // System light + invert = dark theme
      }
    } else {
      // Follow system changes after initial load
      if (systemPrefersDark) {
        box.classList.remove("invert"); // System dark + no invert = dark theme
      } else {
        box.classList.remove("invert"); // System light + no invert = light theme
      }
    }
  }
}

// Initialize on page load
applyTheme();
isInitialLoad = false; // Mark initial load as complete

// Listen for system theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    // Always reapply theme when system changes
    applyTheme();
  });

// Theme button click handler
themeBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const currentPreference = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  // Determine what the current theme actually is
  let currentlyLight;
  if (currentPreference === "light") {
    currentlyLight = true;
  } else if (currentPreference === "dark") {
    currentlyLight = false;
  } else {
    // No preference, check current state
    if (systemPrefersDark) {
      currentlyLight = false; // System dark + no invert = dark
    } else {
      currentlyLight = box.classList.contains("invert"); // Check if we're in dark-first mode
    }
  }

  // Toggle to opposite
  if (currentlyLight) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }

  // Reapply theme
  applyTheme();
});
