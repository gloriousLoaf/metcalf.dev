/* email validator */
const validator = (email) => {
  const valid = /\S+@\S+\.\S+/;
  return valid.test(email);
};

/* show confirmation */
const confirmCard = document.getElementById('confirm');
const confirmFocus = document.querySelector('#confirm p');

const confirmSubmission = () => {
  confirmCard.setAttribute('aria-hidden', 'false');
  confirmCard.style.display = 'block';
  confirmFocus.tabIndex = '0';
  confirmFocus.focus();
};

/* hide confirmation */
const contactName = document.getElementById('contact-name');
const contactEmail = document.getElementById('contact-email');
const contactMsg = document.getElementById('contact-message');
const lastName = document.getElementById('last-name');

const hideSubmission = () => {
  confirmCard.setAttribute('aria-hidden', 'true');
  confirmCard.style.display = 'none';
  confirmFocus.tabIndex = '-1';
};

const formFields = [];
formFields.push(contactName, contactEmail, contactMsg, lastName);

formFields.forEach((field) => {
  field.addEventListener('focus', hideSubmission);
});

/* Google Sheets API */
const scriptURL =
  'https://script.google.com/macros/s/AKfycbzTAGlHnrDCOfTo_uVvXPDldwTjIWI2PDJ0Bu6bw8f5-4lCrb6u42fP/exec';
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
    fetch(scriptURL, { method: 'POST', mode: 'cors', body: new FormData(form) })
      .then((response) => console.log('Success!', response))
      .catch((error) => console.error('Error!', error.message));
    confirmSubmission();
    e.preventDefault(); // prevents additional html validation after submit
    form.reset();
  }
};

const submit = document.getElementById('submit');
submit.addEventListener('click', storeInfo);
