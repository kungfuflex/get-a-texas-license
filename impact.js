// ==UserScript==
// // @name     impact.js
// // @version  1
// // @grant    none
// // ==/UserScript==

(async () => {
  const timeout = async (n) =>
    await new Promise((resolve) => setTimeout(resolve, n));
  while (true) {
    try {
      const lnkPlay = document.querySelector("#lnkPlay");
      if (lnkPlay) lnkPlay.click();
      const el = document.querySelector("#ContentBody_btnNext");
      if (el) {
        if (el.disabled) return;
        el.click();
      }
      if (document.querySelector("#ContentBody_rbChoices")) {
        Array.from(document.querySelectorAll("#ContentBody_rbChoices input"))
          .find((v) => v.value.match("Y"))
          .click();
        document.querySelector("#ContentBody_btnSubmit").click();
        await timeout(1000);
        document.querySelector("#ContentBody_btnContinue").click();
      }
    } catch (e) {
      console.error(e);
    }
    await timeout(1000);
  }
})().catch(console.error);
