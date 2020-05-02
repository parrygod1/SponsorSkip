// ==UserScript==
// @name Sponsor Skip
// @namespace MeddleMonkey Scripts
// @grant none
// ==/UserScript==


if ((window.location.href.indexOf("youtube") > -1)) {
  window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
  recognition = new window.SpeechRecognition();

  if (window.location.href.indexOf(".com/watch?v=") <= -1)
    console.log("not watching");

  window.addEventListener('yt-page-data-updated', function () {
    if (window.location.href.indexOf(".com/watch?v=") > -1) {
      console.log("Changed to watch");
      execute();
    } else if (recognition != null) {
      recognition.stop();
    }
  });

  function execute() {

    const blacklist = [
      "our sponsor",
      "sponsors",
      "the sponsor of this video",
      "this video was made possible by",
      "this video is sponsored by",
      "this video was sponsored by",
      "for sponsoring this video",
      "come in multiple colors",
      "cheap reliable",
      "subscription",
      "free to download on your first",
      "download it for free",
      "use the promo code",
      "use the code",
      "use code",
      "for a discount",
      "first order",
      "% of",
      "autofills and stores",
      "merch",
      "they offer",
      "it costs",
      "is help people achieve",
      "check out their",
      "use on the go",
      "premium",
      "come at half the price",
      "click the link in the description",
      "sponsor me",
      "the perfect package",
      "free shipping on your",
      "join over",
      "is a free to play",
      "is free to play",
      "from our link",
      "value for it's price",
      "no extra charge",
      "reliable VPN",
      "get better deals",

      "brilliant",
      "simply sofas",
      "simpli safe",
      "dash lane",
      "dashlane",
      "Ash Lane",
      "skill share",
      "skillshare",
      "raycon",
      "nord VPN",
      "recon.com",
      "buyrecon.com",
      "Ray Connor's",
      "wear icons",
      "e25 earbuds",
      "shadow legends",
      "PIA"];


    var video = document.querySelector("video");


    /*document.getElementById("top-level-buttons").innerHTML += "<div id='sponsorskip-info'></div>";
    const infoBox = document.getElementById("sponsorskip-info");
    infoBox.innerText = 'Listening...';*/

    let startTime = 0;
    let currentTime = 0;

    setInterval(resetVoiceRecog, 1000);
    function resetVoiceRecog() {
      currentTime = Date.now();
      if (Math.floor((currentTime - startTime) / 1000) >= 10) {
        console.log("RESET");
        recognition.stop();
      }
    }

    function run() {


      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.onresult = function (event) {
        console.log(event.results[0][0].transcript);
        if (blacklist.some(element => event.results[0][0].transcript.includes(element))) {
          video.currentTime = video.getCurrentTime() + 5;
          recognition.stop();
          //infoBox.innerText = "Found at " + Math.floor(Date.now()/1000);
          console.log("FOUND BLACKLIST WORD");
        }

      }

      recognition.onend = function (event) {
        //Fired when the speech recognition service has disconnected.
        if (window.location.href.indexOf(".com/watch?v=") > -1) {
          recognition.start();
          clearInterval(resetVoiceRecog);
        }
        console.log('SpeechRecognition.onend');
      }

      recognition.onnomatch = function (event) {
        //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
        //console.log('SpeechRecognition.onnomatch');
      }

      recognition.onstart = function (event) {
        //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
        startTime = Date.now();
        console.log('SpeechRecognition.onstart');
      }

      recognition.start();
    }
    run();

  }

}




