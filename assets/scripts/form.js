/* email validator */
const validator = (email) => {
    const valid = /\S+@\S+\.\S+/;
    return valid.test(email);
};

/* form & submission status card elements */
const form = document.forms["submit-to-sheet"];
const confirmCard = document.getElementById("confirm");
const confirmFocus = document.querySelector("#confirm p");
const confirmDetails = document.querySelector("#confirm p + p");
const contactName = document.getElementById("contact-name");
const contactEmail = document.getElementById("contact-email");
const contactMsg = document.getElementById("contact-message");
const lastName = document.getElementById("last-name");

/* show confirmation */
const confirmSubmission = () => {
    confirmCard.setAttribute("aria-hidden", "false");
    confirmCard.style.display = "block";
    confirmFocus.tabIndex = "0";
    confirmFocus.focus();
};

/* hide confirmation - reset card values to default success */
const hideSubmission = () => {
    confirmCard.setAttribute("aria-hidden", "true");
    confirmCard.style.display = "none";
    confirmFocus.tabIndex = "-1";
    confirmFocus.textContent = "Got it!";
    confirmDetails.textContent = `Thanks for reaching out. I'll be in touch with you soon.`;
};

const formFields = [];
formFields.push(form, contactName, contactEmail, contactMsg, lastName);

formFields.forEach((field) => {
    field.addEventListener("focus", hideSubmission);
});

/* error on submission - change card text for server error cases */
const errorSubmission = () => {
    confirmFocus.textContent = "Sorry, something went wrong.";
    confirmDetails.textContent = "The database could not be reached, please try again.";
};

/* form submission */
const scriptURL = "https://formbold.com/s/ob1Wd";

const storeInfo = (e) => {
    if (contactName.value === "" || contactEmail.value === "" || contactMsg.value === "") {
        return;
    } else if (!validator(contactEmail.value)) {
        return;
    } else if (lastName.value) {
        confirmSubmission();
        e.preventDefault(); // prevents additional html validation after submit
        form.reset();
    } else {
        fetch(scriptURL, {
            method: "POST",
            mode: "cors",
            body: new FormData(form),
        })
            .then((res) => {
                if (!res.ok) errorSubmission(); // handle 4xx, 5xx errors
            })
            .catch((error) => {
                console.error("Error!", error.message);
                errorSubmission();
            });
        confirmSubmission();
        e.preventDefault(); // prevent validation
        form.reset();
    }
};

const submit = document.getElementById("submit");
submit.addEventListener("click", storeInfo);
