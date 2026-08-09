// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-plugin-api'

// Alternatively you can use CommonJS syntax:
// require('./commands')
// eslint-disable-next-line no-unused-vars
Cypress.on('uncaught:exception', (err, runnable) => {
  // unknown error with message
  // and don't want to fail the test so we return false
  if (err.message.includes('ResizeObserver loop completed with undelivered notifications.')) {
    return false
  }
  // we still want to ensure there are no other unexpected
  // errors, so we let them fail the test
})


// Hide fetch/XHR requests
const app = window.top;
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML =
    '.command-name-request, .command-name-xhr { display: none }';
  style.setAttribute('data-hide-command-log-request', '');

  app.document.head.appendChild(style);
}