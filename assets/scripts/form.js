/* form & dialog elements */
const form = document.forms["submit-to-sheet"];
const dialog = document.getElementById("confirm-dialog");
const confirmTitle = document.getElementById("confirm-title");
const confirmMessage = document.getElementById("confirm-message");
const closeDialog = document.getElementById("close-dialog");
const lastName = document.getElementById("last-name");
const submitButton = document.getElementById("submit");

/* dialog copy for a successful submission, restored before each send */
const successTitle = confirmTitle.textContent;
const successMessage = confirmMessage.textContent;

/* show confirmation */
const confirmSubmission = () => {
  dialog.removeAttribute("aria-hidden");
  dialog.showModal();
  // Prevent the close button from getting focus
  closeDialog.blur();
};

/* hide confirmation */
const hideSubmission = () => {
  dialog.setAttribute("aria-hidden", "true");
  dialog.close();
};

/* error on submission - change dialog text for server error cases */
const errorSubmission = () => {
  confirmTitle.textContent = "Sorry, something went wrong.";
  confirmMessage.textContent =
    "The database could not be reached, please try again.";
};

/* form submission */
// Cloudflare Pages Function, see functions/api/contact.js
const scriptURL = "/api/contact";

const setLoading = (isLoading) => {
  submitButton.classList.toggle("loading", isLoading);
  submitButton.disabled = isLoading;
};

// the submit event only fires once the browser's own validation passes
// (required fields, and the email pattern in contact.html)
const storeInfo = async (e) => {
  e.preventDefault();
  confirmTitle.textContent = successTitle;
  confirmMessage.textContent = successMessage;
  // nah
  if (lastName.value) {
    confirmSubmission();
    form.reset();
    return;
  }

  try {
    setLoading(true);
    const response = await fetch(scriptURL, {
      method: "POST",
      body: new FormData(form),
    });
    // handle 4xx, 5xx errors
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // only show success dialog after successful submission
    confirmSubmission();
    form.reset();
  } catch (error) {
    console.error("Error!", error.message);
    errorSubmission();
    confirmSubmission();
  } finally {
    setLoading(false);
  }
};

form.addEventListener("submit", storeInfo);

// close dialog when clicking the close button
closeDialog.addEventListener("click", () => {
  dialog.close();
});

// close dialog when clicking outside
dialog.addEventListener("click", (e) => {
  const dialogDimensions = dialog.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.close();
  }
});
