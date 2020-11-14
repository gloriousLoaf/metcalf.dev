/* Halfway through rewrite without jQuery, but will need
    custom modal to really finish. Take on bootstrap next? */

/* smooth-scoll polyfills by Chris Ferdinandi https://vanillajstoolkit.com/ */
// scroller function
let scroll = new SmoothScroll('a[href*="#"]', {
    speed: 400
});

/* Contact Form - Verification of Info, Google Sheets API */
// listener on Contact card Submit calls storeInfo()
$(`#submit-btn`).on(`click`, storeInfo);

// email validator
function validator(email) {
    const valid = /\S+@\S+\.\S+/;
    return valid.test(email);
}

// vars for Google Sheets API
const scriptURL = 'https://script.google.com/macros/s/AKfycbzxivBPk8mDjOYPOqm53FndxzXHx4V-EufqCgyhRZpayYwc_aQ/exec';
const form = document.forms['submit-to-google-sheet'];

// storeInfo() validates info then calls Fetch API to Google Sheets & triggers modal
function storeInfo() {
    event.preventDefault();
    // remove <small>&<span> msgs, in case of multiple clicks, see below
    $(`.try-again`).remove();
    // capture values in vars
    let $contactName = $(`#contact-name`).val();
    let $contactEmail = $(`#contact-email`).val();
    let $contactMsg = $(`#contact-message`).val();
    // if anything is blank, add a msg to contact card
    if ($contactName === `` || $contactEmail === `` || $contactMsg === ``) {
        $(`#submit-btn`).after(`<small class="try-again">Please complete all fields.</small>`);
    }
    // if validator() doesn't pass, add msg
    else if (!validator($contactEmail)) {
        $(`#submit-btn`).after(`<small class="try-again">Please complete all fields.</small>`);
        $(`#email-help`).append(`<span class="try-again">Is this right?</span>`);
    }
    // once fields are verified
    else {
        // Google Sheets API
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => console.log('Success!', response))
            .catch(error => console.error('Error!', error.message))
        // this attr triggers Modal
        $(`#submit-btn`).attr(`data-target`, `#thanks-modal`)
        // clear forms after submission
        $(`form`)[0].reset();
        // short timeout to let all these scripts work
        setTimeout(() => {
            // remove trigger attr in case of multiple clicks
            $(`#submit-btn`).removeAttr(`data-target`);
            // remove msgs
            $(`.try-again`).remove();
        }, 200)
    }
};