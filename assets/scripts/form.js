/* email validator */
const validator = (email) => {
    const valid = /\S+@\S+\.\S+/;
    return valid.test(email);
};

/* form & submission status card elements */
const confirmCard = document.getElementById('confirm');
const confirmFocus = document.querySelector('#confirm p');
const confirmDetails = document.querySelector('#confirm p + p');
const contactName = document.getElementById('contact-name');
const contactEmail = document.getElementById('contact-email');
const contactMsg = document.getElementById('contact-message');
const lastName = document.getElementById('last-name');

/* show confirmation */
const confirmSubmission = () => {
    confirmCard.setAttribute('aria-hidden', 'false');
    confirmCard.style.display = 'block';
    confirmFocus.tabIndex = '0';
    confirmFocus.focus();
};

/* hide confirmation - reset card values to default success */
const hideSubmission = () => {
    confirmCard.setAttribute('aria-hidden', 'true');
    confirmCard.style.display = 'none';
    confirmFocus.tabIndex = '-1';
    confirmFocus.textContent = 'Got it!';
    confirmDetails.textContent = `Thanks for reaching out. I'll be in touch with you soon.`;
};

const formFields = [];
formFields.push(contactName, contactEmail, contactMsg, lastName);

formFields.forEach((field) => {
    field.addEventListener('focus', hideSubmission);
});

/* error on submission - change card text for API error cases */
const errorSubmission = () => {
    confirmFocus.textContent = 'Sorry, something went wrong.';
    confirmDetails.textContent =
        'The database could not be reached, please try again.';
};

/* Google Sheets API */
const scriptURL =
    'https://script.google.com/macros/s/1abEv5XyVIzYIMvB-o4p2lJ8QY8fEpNbMr-N94gsEsv_W7PH6peDoVtYi/exec';
const form = document.forms['submit-to-sheet'];

const storeInfo = (e) => {
    if (
        contactName.value === '' ||
        contactEmail.value === '' ||
        contactMsg.value === ''
    ) {
        return;
    } else if (!validator(contactEmail.value)) {
        return;
    } else if (lastName.value) {
        confirmSubmission();
        form.reset();
    } else {
        fetch(scriptURL, {
            method: 'POST',
            mode: 'cors',
            body: new FormData(form),
        }).catch((error) => {
            console.error('Error!', error.message);
            errorSubmission();
        });
        confirmSubmission();
        e.preventDefault(); // prevents additional html validation after submit
        form.reset();
    }
};

const submit = document.getElementById('submit');
submit.addEventListener('click', storeInfo);
