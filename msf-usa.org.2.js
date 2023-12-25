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
  const cheatsheet = [["The center lane on this road is used for:","Making left turns from both directions."],["The trap here is:","Oncoming car is poised to turn left in front of you."],["The chevron alignment signs inform you that:","The curve ahead is rather sharp."],["This curve has increased risk because:","The guardrail blocks escape to the right."],["What did that sign indicate?","Left Turn Only"],["What did that sign indicate?","Sharp Left Turn"],["What did that sign indicate?","No Right Turn"],["What did that sign indicate?","Reverse Turns"],["What did that sign indicate?","Flagger Ahead"],["What did those signs indicate?","Winding Road & No U-turn"],["What did those signs indicate?","Narrow Bridge & Sharp Right Turn"],["What did those signs indicate?","Double Right Turn & Intersection Ahead"],["What did those signs indicate?","Tip-over Advisory Speed & Side Road Ahead"],["What did those signs indicate?","Lane Added & Divided Highway Ends"],["What is the primary trap?","Oncoming car poised to turn left."],["What is the primary trap?","Blind intersection."],["What is the primary trap?","Blind spots."],["What is the primary trap?","Oncoming car poised to turn left."],["What is the primary trap?","Oncoming cars could enter our lane."],["The four subtasks of riding include social, emotional, physical and","Mental-perceptual"],["True or False: When it comes to sharing the road with others, it is better for a rider to be cooperative in traffic than it is to be non-conforming.","True"],["True or False: Car and truck drivers tend to drive as they live.","True"],["Inattentional blindness can best be described as:","Looking toward something plainly visible yet not seeing it"],["This sign means:","Lane added"],["In this scene, the primary danger here is:","We are in blind spots"],["In this scene, the primary danger ahead is:","Turning car could come into our lane"],["In this scene, the primary danger is:","A vehicle entering your lane from around the curve"],["True or False: Most riders cannot tell the difference between low-risk behavior and high-risk behavior.","False"],["How long does it take to make a safe riding decision?","An instant"],["Which of the following is a good rider behavior?","All the above"],["True or False: A challenge for all riders to embrace is to choose good risk offset and be mindful of collision traps.","True"]].concat([["1. Learning to ride is risky because:","A mistake could lead to a fall and injury"],["2. Riding a motorcycle on the street is not for everyone because:","Some people have difficulty managing risk"],["3. A benefit of successful course completion is that, once licensed, you are assured of never crashing on the street.","False"],["4. A good next step after course completion is to:","Practice the basics on your personal motorcycle"],["5. The only physical skill needed to ride a motorcycle is balance.","False"],["6. The primary mental skills needed for riding a motorcycle are:","Information processing and decision-making"],["7. You may opt out of the course if you become uncomfortable or feel unsafe.","True"],["8. A RiderCoach may counsel out riders who become too much of a risk to themselves or others.","True"]]
);
  const timeout = async (n) => await new Promise((resolve, reject) => setTimeout(resolve, n));
  const iframes = {};
  const isQuestion = function () {
          const el = document.querySelector('p.multiple-choice_question.ng-binding') || document.querySelector('div.mc-question');
  return Boolean(el);
  }
  const play = Audio.prototype.play;
  Audio.prototype.play = function () { document.querySelector('div[autoplay]').muted = true; return play.call(this);  };
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
  const answerQuestion = async () => {
    const el = document.querySelector('p.multiple-choice_question.ng-binding') || document.querySelector('div.mc-question');
    const record = cheatsheet.find(([ q, a ]) => q === el.innerText &&  document.evaluate('//*[text()="' + a + '"]', document).iterateNext())
    if (record) {
      document.evaluate('//*[text()="' + record[1] + '"]', document).iterateNext().click();
    }
    console.log('waiting')
    await timeout(1000);
    console.log('waited, clicking submit');
    document.querySelector('a.multiple-choice_submit-button').click();
    await timeout(6000);
  };
  worker().catch((err) => {
    console.error(err);
    return worker()
  });
})();
