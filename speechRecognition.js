if (window.location.href.indexOf("youtube.com/watch?v=") > -1) {

    const blacklist = "dashlane";  
    
    var video = document.querySelector("video");
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      
    function run(){
      const recognition = new window.SpeechRecognition();
        
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onresult = function (event) {
          console.log(event.results[0][0].transcript);
          if(event.results[0][0].transcript.includes(blacklist)){
            video.currentTime = video.getCurrentTime() + 5;
            recognition.stop();
          }
    
      }
      
      recognition.onsoundstart = e => {
        console.log("audio capture started");
        
      }
    
      recognition.onsoundend = e => {
        console.log("audio capture ended");
      }
      
      recognition.onend = function(event) {
          //Fired when the speech recognition service has disconnected.
          run();
          console.log('SpeechRecognition.onend');
      }
      
      recognition.onnomatch = function(event) {
          //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
          console.log('SpeechRecognition.onnomatch');
      }
      
      recognition.onsoundstart = function(event) {
          //Fired when any sound — recognisable speech or not — has been detected.
          console.log('SpeechRecognition.onsoundstart');
      }
      
      recognition.onsoundend = function(event) {
          //Fired when any sound — recognisable speech or not — has stopped being detected.
          console.log('SpeechRecognition.onsoundend');
      }
      
      recognition.onspeechstart = function (event) {
          //Fired when sound that is recognised by the speech recognition service as speech has been detected.
          console.log('SpeechRecognition.onspeechstart');
      }
      recognition.onstart = function(event) {
          //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
          console.log('SpeechRecognition.onstart');
      }
    
      recognition.start();
    }
    run();
}
    