/* Modal View */
const modal = document.querySelector('.modalView');
const modalBtn = document.querySelector('.modalBtn');
const modalFocus = document.querySelector('.modalFocus');
// nodelist of focusable elems to obscure while in modal view
const trapList = document.querySelectorAll('.trapFocus');
const trapFocus = Array.from(trapList);
// hide/reveal modal, make other elems reachable/unreachable
const modalToggle = () => {
  modal.classList.toggle('hide');
  !trapFocus[0].hasAttribute('tabindex')
    ? trapFocus.forEach((e) => e.setAttribute('tabindex', '-1'))
    : trapFocus.forEach((e) => e.removeAttribute('tabindex'));
  modalFocus.focus();
};
/* email validator */
const validator = (email) => {
  const valid = /\S+@\S+\.\S+/;
  return valid.test(email);
};
/* Google Sheets API */
const scriptURL =
  'https://script.google.com/macros/s/AKfycbzTAGlHnrDCOfTo_uVvXPDldwTjIWI2PDJ0Bu6bw8f5-4lCrb6u42fP/exec';
const form = document.forms['submitToSheet'];
/* send msg to Google Sheets & triggers modal */
const storeInfo = (e) => {
  const contactName = document.getElementById('contactName').value;
  const lastName = document.getElementById('lastName').value;
  const contactEmail = document.getElementById('contactEmail').value;
  const contactMsg = document.getElementById('contactMessage').value;
  // validate, apply/remove helpers, check for lastName hit API
  if (contactName === '' || contactEmail === '' || contactMsg === '') {
    return;
  } else if (!validator(contactEmail)) {
    return;
  } else if (lastName) {
    modalToggle();
    form.reset();
  } else {
    fetch(scriptURL, { method: 'POST', mode: 'cors', body: new FormData(form) })
      .then((response) => console.log('Success!', response))
      .catch((error) => console.error('Error!', error.message));
    modalToggle();
    e.preventDefault(); // prevents additional html validation after submit
    form.reset();
  }
};
/* listeners */
const submit = document.getElementById('submit');
submit.addEventListener('click', storeInfo);
modalBtn.addEventListener('click', modalToggle);
