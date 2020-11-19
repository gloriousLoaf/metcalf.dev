/* email validator */
const validator = (email) =>  {
  const valid = /\S+@\S+\.\S+/;
  return valid.test(email);
}

/* Google Sheets API */
const scriptURL = 'https://script.google.com/macros/s/AKfycbzxivBPk8mDjOYPOqm53FndxzXHx4V-EufqCgyhRZpayYwc_aQ/exec';
const form = document.forms['submit-to-google-sheet'];

/* remove helper msgs, see below */
const removeHelpers = () => {
  const tryAgain = document.querySelectorAll('.tryAgain');
  tryAgain ? tryAgain.forEach(e => e.remove()) : console.log('first try');
}

/* Modal View */
// dom elems
const modal = document.querySelector('.modalView');
const modalBtn = document.querySelector('.modalBtn');
const modalFocus = document.querySelector('.modalFocus');
// nodelist of focusable elems to obscure while in modal view
const trapList = document.querySelectorAll('.trapFocus');
const trapFocus = Array.from(trapList);
// hide or reveal modal, make other elems reachable or unreachable
const modalToggle = () => {
  modal.classList.toggle('hide');
  !trapFocus[0].hasAttribute('tabindex') ?
    trapFocus.forEach(e => e.setAttribute('tabindex', '-1'))
    : trapFocus.forEach(e => e.removeAttribute('tabindex'));
};

/* storeInfo() sends msg to Google Sheets & triggers modal */
const storeInfo = (e) => {
  e.preventDefault();
  // remove helper msgs in case of multiple clicks
  removeHelpers();
  // dom elems
  const contactName = document.getElementById('contactName').value;
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
  // if anything is blank, add a msg to contact card
  if (contactName === '' || contactEmail === '' || contactMsg === '') {
    submit.after(submitHelper);
  }
  // if validator() doesn't pass, add msgs
  else if (!validator(contactEmail)) {
    submit.after(submitHelper);
    email.append(emailHelper);
  }
  // once fields are verified, Google Sheets API
  else {
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => console.log('Success!', response))
        .catch(error => console.error('Error!', error.message))
    // trigger modal & clear form
    modalToggle();
    form.reset();
    // short timeout for API to run, the clear helpers
    setTimeout(() => {
      removeHelpers();
    }, 200);
  };
};

/* scroll polyfill: www.chirp.com.au */
window.addEventListener("DOMContentLoaded", function(e) {
  var links = document.getElementsByTagName("A");
  for(var i=0; i < links.length; i++) {
    if(!links[i].hash) continue;
    if(links[i].origin + links[i].pathname != self.location.href) continue;
    (function(anchorPoint) {
      links[i].addEventListener("click", function(e) {
        anchorPoint.scrollIntoView(true);
        e.preventDefault();
      }, false);
    })(document.getElementById(links[i].hash.replace(/#/, "")));
  }
}, false);

/* listeners */
submit.addEventListener('click', storeInfo);
modalBtn.addEventListener('click', modalToggle);