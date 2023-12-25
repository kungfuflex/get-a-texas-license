// ==UserScript==
// @name         msf-usa.org-nextslide.js
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  automate motorcycle class in Texas, unfortunately does not play the iframes so those have to be manually played
// @author       You
// @match        https://elearning.msf-usa.org/*
// @match        https://player.vimeo.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
(function () {
  "use strict";
  let _parser = null;
  const setParser = (parser) => { _parser = parser; };
  const getParser = () => { return _parser; };
  (async () => {
    while (true) {
      try {
        document.querySelector("button.glyphicon-step-forward").click();
      } catch (e) {}
      await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    }
  })().catch((err) => console.error(err));
  (async () => {
    while (true) {
      try {
        document.querySelector("button.mc-begin-button").click();
      } catch (e) {}
      await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    }
  })().catch((err) => console.error(err));
  (async () => {
    while (true) {
      try {
        document.querySelector('video').setAttribute('muted', true);
        document.querySelector('[aria-label="Play"][data-play-button]').click();
      } catch (e) {}
      await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    }
  })().catch((err) => console.error(err));
  const httpOpen = window.XMLHttpRequest.prototype.open;
  window.XMLHttpRequest.prototype.open = function (...args) {
    console.log(this);
    console.log(args);
    const [ method, uri ] = args;
    if (uri.match(/xml$/)) {
      this.addEventListener('readystatechange', () => {
        if (this.readyState === 4) {
          const answerXml = this.responseText;
          const xmlParser = window.parser = new DOMParser();
          setParser(xmlParser.parseFromString(answerXml, 'text/xml').documentElement);
        }
      });
    }
    return httpOpen.apply(this, args);
  };
  (async () => {
    while (true) {
      try {
        const match = (document.querySelector('.mc-question').innerText.match(/\d+/g).map(Number) || [])[0] - 1;
        const correct = Number(getParser().querySelectorAll('item')[match].getAttribute('correct')) - 1
        document.querySelectorAll('label.mc-item')[correct].click()
      } catch (e) {
      }
      await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    }
  })().catch((err) => console.error(err));

  // Your code here...
})();

