/* Halfway through rewrite without jQuery, but will need
    custom modal to really finish. Take on bootstrap next? */

/* smooth-scoll polyfills by Chris Ferdinandi https://vanillajstoolkit.com/ */
// scroller function
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

// storeInfo() validates info then calls Fetch API to Google Sheets & triggers modal
const storeInfo = (e) => {
  e.preventDefault();
  // remove <small>&<span> msgs, in case of multiple clicks, see below
  // THIS DOES NOT QUITE WORK YET...
  const tryAgain = document.querySelectorAll('.try-again');
  tryAgain ? tryAgain.forEach(e => e.remove()) : console.log('first try');
  // capture dom elems
  const contactName = document.getElementById('contact-name').value;
  const contactEmail = document.getElementById('contact-email').value;
  const contactMsg = document.getElementById('contact-message').value;
  const submit = document.getElementById('submit');
  const email = document.getElementById('email-help');
  // helper msgs: `<small class="try-again">(message here)</small>`
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
  //// LEFT OFF HERE! Functioning great, but still needs jQuery ////
  // once fields are verified
  else {
    // Google Sheets API
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => console.log('Success!', response))
        .catch(error => console.error('Error!', error.message))
    // this attr triggers Modal
    $(`#submit`).attr(`data-target`, `#thanks-modal`)
    // clear forms after submission
    $(`form`)[0].reset();
    // short timeout to let all these scripts work
    setTimeout(() => {
        // remove trigger attr in case of multiple clicks
        $(`#submit`).removeAttr(`data-target`);
        // remove msgs
        $(`.try-again`).remove();
    }, 200)
  }
};

$(`#submit`).on(`click`, storeInfo);