// ==UserScript==
// @name         texasadultdriverseducation
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  automates most of the 6hr course for 18+ drivers, some human intervention still needed
// @author       You
// @match        https://www.texasadultdriverseducation.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=texasadultdriverseducation.com
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';
    const timeout = async (n) => await new Promise((resolve) => setTimeout(resolve, n));
    const waitForSelector = async (selector) => {
      while (true) {
        const el = document.querySelector(selector);
        if (el) return el;
        else await timeout(500);
      }
    };
    const possibleQuestionWrappers = ['.curriculum_question_wrapper', '.curriculum_question_right_inline_wrapper', '.curriculum_question_left_inline_wrapper'];
    const worker = async () => {
      const el = document.querySelector('#nextChapterTop a');
      if (el) { el.click(); return }
      const dialogWrapper = document.querySelector('.dialog_wrapper a');
      if (dialogWrapper) dialogWrapper.click();
      const answerClassName = possibleQuestionWrappers.find((v) => document.querySelector(v));
      const curriculumQuestionWrapper = answerClassName && document.querySelector(answerClassName + ' font');
      if (curriculumQuestionWrapper) {
        const answers = document.querySelectorAll(answerClassName + ' table tbody tr td span table tbody td a');
        const answer = Number(window.localStorage.getItem(curriculumQuestionWrapper.innerText) || 0);
        const selected = answers[answer];
        selected.click();
        await timeout(50);
        selected.click();
        await timeout(2000);
        const result = await waitForSelector(answerClassName + ' tbody table font');
        if (result.innerText.match(/wrong/i)) {
          window.localStorage.setItem(curriculumQuestionWrapper.innerText, answer + 1);
          const el = document.querySelector(curriculumQuestionWrapper + ' tbody a');
          if (el) el.click();
        } else {
          const nextPageTopCorrect = document.querySelector('#nextPageTop a');
          if (nextPageTopCorrect) nextPageTopCorrect.click();
        }
      } else {
        const overlayTimer = document.querySelector('#overlayTimer');
        if (!overlayTimer || !overlayTimer.innerText.trim()) {
          const responseInfo = document.querySelector('#responseInfo a');
          if (responseInfo) {
            responseInfo.click();
            return;
          }
          const nextPageTop = document.querySelector('#nextPageTop a');
          if (nextPageTop) nextPageTop.click();
        }
      }
    }
    await timeout(3000);
    console.log('starting');
    while (true) {
      try {
        console.log('tick');
        await worker();
      } catch (e) {
        window.location.reload();
      }
      await timeout(5000);
    }
})().catch(console.error);
