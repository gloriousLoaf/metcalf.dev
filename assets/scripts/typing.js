/* Typing Effect */
const typing = document.getElementById("typing");
const view = window.location.pathname?.slice(1) || " ";
let typeVal = "";

switch (view) {
  case " ":
  case "index.html":
    typeVal = "metcalf.dev";
    break;
  case "works.html":
    typeVal = "metcalf.dev";
    break;
  case "contact.html":
    typeVal = "whatup?";
    break;
}

// Check if user prefers reduced motion
if (
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  // Just display the text immediately without animation
  typing.innerHTML = typeVal;
} else {
  // Run the typing animation
  let currentIndex = 0;

  const updateText = (txt) => {
    typing.innerHTML = txt;
  };

  const typeText = () => {
    if (currentIndex < typeVal.length) {
      updateText(typeVal.slice(0, currentIndex + 1));
      currentIndex++;

      // Add stuttering effect with occasional longer pauses
      let delay;
      const random = Math.random();

      if (random < 0.1) {
        // 10% chance of a longer pause (150-300ms) - like a hesitation
        delay = 150 + Math.round(Math.random() * 150);
      } else if (random < 0.2) {
        // 10% chance of a medium pause (80-150ms) - like a brief pause
        delay = 80 + Math.round(Math.random() * 70);
      } else {
        // 80% chance of normal typing speed (40-100ms)
        delay = 40 + Math.round(Math.random() * 60);
      }

      setTimeout(typeText, delay);
    }
  };

  // Start typing effect with initial delay
  setTimeout(typeText, 500);
}
