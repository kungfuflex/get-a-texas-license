// ==UserScript==
// @name         msf-usa.org.js
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  automate motorcycle class in Texas, unfortunately does not play the iframes so those have to be manually played
// @author       You
// @match        https://elearning.msf-usa.org/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(() => {
  const timeout = async (n) => await new Promise((resolve, reject) => setTimeout(resolve, n));
  const iframes = {};
  const worker = async () => {
    while (true) {
      console.log('tick');
      const begin = ((document.querySelectorAll('button.mc-begin-button') || [])[3] || ({ click() {} }));
      if (begin) begin.click()
        const ln = (v) => ((console.log(v)), v);
      if ( document.body.innerText.match('did not pass'))(ln(Array.from(document.querySelectorAll('button.mc-begin-button.pull-right') || []).find((v) => v.innerText.trim() === 'Review')) || ({ click() {} })).click()
      if (document.body.innerText.match('completed this Knowledge Check')) (ln(Array.from(document.querySelectorAll('button.mc-begin-button.pull-right') || []).find((v) => v.innerText.trim() === 'Finish')) || ({ click() {} })).click()
        if (isQuestion()) {
          await answerQuestion();
          continue;
      }
      const el = document.querySelector('button.play.state-paused')
      if (el) el.click();
        /*
      const rounded = document.querySelector('iframe');
      if (rounded && !iframes[rounded.id]) {

          iframes[rounded.id] = true;
          await timeout(8000);
          const btn = rounded.contentWindow.document.body.querySelectorAll('button.play.rounded-box');
          console.log('got btn', btn);
          (btn || { click() {} }).click();
      }
      */
      await timeout(1000);
      const play = document.querySelector('button.glyphicon-play')
      if (play && !play.className.match('glyphicon-pause')) {
        play.click();
      }
      const forward = document.querySelector('button.glyphicon-step-forward')
      if (forward && !forward.className.match('is-disabled')) {
        forward.click();
      }


      await timeout(5000);
    }
  };
  const isQuestion = () => { return Boolean(((((document.querySelector('div.mc-content') || {}).children || [])[0] || {}).className || '').match('mc-question')); };
  const getQuestion = () => { return ((((document.querySelector('div.mc-content') || {}).children[0] || {}).innerText)); };

  const answerQuestion = async () => {
    const question = getQuestion();
    console.log(question);
    let answers = Array.from(document.querySelectorAll('label'))

    answers = answers.slice(0, answers.length / 2);
      console.log(answers)
    const answer = ((v) => v === 11 ? 0 : v)(Number(localStorage.getItem(question) || 0));
    answers[answer].click();
    console.log('waiting')
    await timeout(1000);
    console.log('waited, clicking submit');
    document.querySelector('button#submitBtn').click();
    console.log('waiting')
    await timeout(100);
    console.log('testing')
    if ((document.querySelector('div.mc-content-block') || { innerText: '' }).innerText.match('Wrong')) localStorage.setItem(question, answer + 1);
    console.log('waiting')
    await timeout(6000);
  };
  worker().catch((err) => {
    console.error(err);
    return worker()
  });
})();
