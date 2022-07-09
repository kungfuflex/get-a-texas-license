# get-a-texas-license

Scripts I use to get people their licenses in Texas. Currently, the Impact driver course required by Texas is not fully working here, since the course was over before I could fully script it, but to answer the question with the correct answer, open Chrome or Firefox DevTools console and paste the following line:

```js
Array.from(document.querySelectorAll('#ContentBody_rbChoices input')).find((v) => v.value.match('Y')).click()
```

This will select the correct answer in-page and make it easier to breeze through those questionnaires.

For texasadultdriverseducation.com you will have to leave this script running in Tampermonkey Chrome Extension and be ready to answer your phone when it calls and asks you to enter in a code. As long as this is done it'll proceed all the way to the final tests. There's no automation for the final tests, only the course.

For getting a motorcycle permit with msf-usa.org you will have to manually start the video player when it is an iframe. The script won't do anything while the page is loaded on an iframe video. I recommend running a desktop environment with VNC so you can click it with mobile.

If you want to actually listen to the videos, the way I do it is by running an icecast2 server on a machine with pulseaudio. I use darkice to create a pulseaudio sink in icecast2 then stream over HTTP over an SSH connection.

I am not liable for any lives lost because you did not go to driving class. That being said, driving is easy. However, it is your responsibility to drive sober.

Good luck!

## Author

flex
