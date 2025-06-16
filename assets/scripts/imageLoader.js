// Handle image loading states
const initImageLoader = () => {
  const images = document.querySelectorAll(".loading");

  images.forEach((img) => {
    const skeleton = img.previousElementSibling;

    if (img.complete) {
      img.classList.add("loaded");
      if (skeleton && skeleton.classList.contains("skeleton")) {
        skeleton.classList.add("hidden");
      }
    } else {
      img.addEventListener("load", () => {
        img.classList.add("loaded");
        if (skeleton && skeleton.classList.contains("skeleton")) {
          skeleton.classList.add("hidden");
        }
      });

      img.addEventListener("error", () => {
        // If image fails to load, remove the skeleton
        if (skeleton && skeleton.classList.contains("skeleton")) {
          skeleton.remove();
        }
      });
    }
  });
};

document.addEventListener("DOMContentLoaded", initImageLoader);
