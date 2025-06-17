/* email validator */
const validator = (email) => {
  const valid = /\S+@\S+\.\S+/;
  return valid.test(email);
};

/* form & dialog elements */
const form = document.forms["submit-to-sheet"];
const dialog = document.getElementById("confirm-dialog");
const confirmTitle = document.getElementById("confirm-title");
const confirmMessage = document.getElementById("confirm-message");
const closeDialog = document.getElementById("close-dialog");
const contactName = document.getElementById("contact-name");
const contactEmail = document.getElementById("contact-email");
const contactMsg = document.getElementById("contact-message");
const lastName = document.getElementById("last-name");
const submitButton = document.getElementById("submit");

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
const scriptURL = "https://formbold.com/s/ob1Wd";

const setLoading = (isLoading) => {
  submitButton.classList.toggle("loading", isLoading);
  submitButton.disabled = isLoading;
};

const storeInfo = async (e) => {
  e.preventDefault();
  // basic validation
  if (
    contactName.value === "" ||
    contactEmail.value === "" ||
    contactMsg.value === ""
  ) {
    return;
  }
  // email validation
  if (!validator(contactEmail.value)) {
    return;
  }
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
      mode: "cors",
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

submitButton.addEventListener("click", storeInfo);

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
