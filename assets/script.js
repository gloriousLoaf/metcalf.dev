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
