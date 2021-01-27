/* Typography */
const typing = document.getElementById('typing');
let view = '';
view = window.location.pathname.slice(1) || ' ';
// create different arrays for each view
let typeVals = [];
switch (view) {
  case ' ':
  case 'index.html':
    typeVals.push('metcalf.dev', 'javascript', 'css', 'html', 'metcalf.dev');
    break;
  case 'portfolio.html':
    typeVals.push('mongodb', 'express', 'react', 'node', 'metcalf.dev');
    break;
  case 'contact.html':
    typeVals.push('whatup?');
    break;
}
/**
 * iterator, current word, message in dom,
 * mode for switch, delay & timeout
 */
let idx = -1;
let word = '';
let message = typing.innerHTML;
let mode = true;
let delay = 500;
let timeout;
/* helpers for typer: updateText in dom, writer & deleter */
const updateText = (txt) => {
  typing.innerHTML = txt;
};
/**
 * slice off letters & make new substring, update dom;
 * if reached end of last word, clearTimeout;
 * if done typing word, go to delete / false case;
 * else random delay to make it less robotic
 */
const writer = () => {
  message += word.slice(0, 1);
  word = word.substr(1);
  updateText(message);
  if (!word.length && idx === typeVals.length - 1) {
    window.clearTimeout(timeout);
    return;
  }
  if (!word.length) {
    mode = false;
    delay = 1000;
  } else {
    delay = 30 + Math.round(Math.random() * 50);
  }
};
/**
 * slice off in reverse, update dom;
 * if message is fully deleted, delay & switch;
 * else random delay
 */
const deleter = () => {
  message = message.slice(0, -1);
  updateText(message);
  if (!message.length) {
    mode = true;
    delay = 750;
  } else {
    delay = 30 + Math.round(Math.random() * 100);
  }
};

/* type it out, delete it */
const typer = () => {
  // if empty, increment idx, grab new word, clear dom & go
  if (!message) {
    idx++;
    word = typeVals[idx];
    message = '';
    mode = true;
  }
  switch (mode) {
    case true:
      writer();
      break;
    case false:
      deleter();
      break;
  }
  timeout = window.setTimeout(typer, delay);
};
timeout = window.setTimeout(typer, delay);

/* Contact Form */
/* email validator */
const validator = (email) => {
  const valid = /\S+@\S+\.\S+/;
  return valid.test(email);
};
/* Google Sheets API */
const scriptURL =
  'https://script.google.com/macros/s/AKfycbzTAGlHnrDCOfTo_uVvXPDldwTjIWI2PDJ0Bu6bw8f5-4lCrb6u42fP/exec';

const form = document.forms['submit-to-google-sheet'];
/* to cleanup helpers */
const removeHelpers = () => {
  const tryAgain = document.querySelectorAll('.tryAgain');
  tryAgain ? tryAgain.forEach((e) => e.remove()) : console.log('first try');
};
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
/* storeInfo() sends msg to Google Sheets & triggers modal */
const storeInfo = (e) => {
  e.preventDefault();
  // pre-cleanup helpers
  removeHelpers();
  const contactName = document.getElementById('contactName').value;
  const lastName = document.getElementById('lastName').value;
  const contactEmail = document.getElementById('contactEmail').value;
  const contactMsg = document.getElementById('contactMessage').value;
  const submit = document.getElementById('submit');
  const email = document.getElementById('emailHelp');
  // helper msgs: '<small class="tryAgain">(message here)</small>'
  const submitHelper = document.createElement('small');
  submitHelper.textContent = 'Please complete all fields.';
  submitHelper.classList = 'tryAgain';
  const emailHelper = document.createElement('small');
  emailHelper.textContent = 'Is this right?';
  emailHelper.classList = 'tryAgain xs';
  // validate, apply/remove helpers, check for lastName hit API
  if (contactName === '' || contactEmail === '' || contactMsg === '') {
    submit.after(submitHelper);
  } else if (!validator(contactEmail)) {
    submit.after(submitHelper);
    email.append(emailHelper);
  } else if (lastName) {
    modalToggle();
    form.reset();
    setTimeout(() => {
      removeHelpers();
    }, 200);
  } else {
    fetch(scriptURL, { method: 'POST', mode: 'cors', body: new FormData(form) })
      .then((response) => console.log('Success!', response))
      .catch((error) => console.error('Error!', error.message));
    // trigger modal, clear form, clean up helpers
    modalToggle();
    form.reset();
    setTimeout(() => {
      removeHelpers();
    }, 200);
  }
};
/* listeners */
submit.addEventListener('click', storeInfo);
modalBtn.addEventListener('click', modalToggle);
