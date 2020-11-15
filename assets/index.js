/* smooth-scoll polyfills by Chris Ferdinandi https://vanillajstoolkit.com/ */
let scroll = new SmoothScroll('a[href*="#"]', { speed: 400 });

/* Contact Form - Verification of Info, Google Sheets API */
// email validator
const validator = (email) =>  {
  const valid = /\S+@\S+\.\S+/;
  return valid.test(email);
}

// vars for Google Sheets API
const scriptURL = 'https://script.google.com/macros/s/AKfycbzxivBPk8mDjOYPOqm53FndxzXHx4V-EufqCgyhRZpayYwc_aQ/exec';
const form = document.forms['submit-to-google-sheet'];

// remove helper msgs, see below
const removeHelpers = () => {
  const tryAgain = document.querySelectorAll('.try-again');
  tryAgain ? tryAgain.forEach(e => e.remove()) : console.log('first try');
}

// storeInfo() validates info then calls Fetch API to Google Sheets & triggers modal
const storeInfo = (e) => {
  e.preventDefault();
  // remove helper msgs in case of multiple clicks
  removeHelpers();
  // dom elems
  const contactName = document.getElementById('contact-name').value;
  const contactEmail = document.getElementById('contact-email').value;
  const contactMsg = document.getElementById('contact-message').value;
  const submit = document.getElementById('submit');
  const email = document.getElementById('email-help');
  // helper msgs: '<small class="try-again">(message here)</small>'
  const submitHelper = document.createElement('small');
  submitHelper.textContent = 'Please complete all fields.';
  submitHelper.classList = 'try-again';
  const emailHelper = document.createElement('small');
  emailHelper.textContent = 'Is this right?';
  emailHelper.classList = 'try-again xs';
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
    submit.setAttribute('data-target', '#thanks-modal');
    form.reset();
    // short timeout for API to run, clear modal & msgs
    setTimeout(() => {
        submit.removeAttribute('data-target');
        removeHelpers();
    }, 200)
  }
};

// listener
submit.addEventListener('click', storeInfo);