window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
if (window.location.href.indexOf("text2speech") > -1) {

    function run() {
        const recognition = new window.SpeechRecognition();

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.onresult = function (event) {
            // do stuff with `event.results[0][0].transcript`
            console.log(event.results[0][0].transcript);
        }

        recognition.onsoundstart = e => {
            console.log("audio capture started");
        }

        recognition.onsoundend = e => {
            console.log("audio capture ended");
        }

        recognition.onend = function (event) {
            //Fired when the speech recognition service has disconnected.
            run();
            console.log('SpeechRecognition.onend');
        }

        recognition.onnomatch = function (event) {
            //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
            console.log('SpeechRecognition.onnomatch');
        }

        recognition.onsoundstart = function (event) {
            //Fired when any sound — recognisable speech or not — has been detected.
            console.log('SpeechRecognition.onsoundstart');
        }

        recognition.onsoundend = function (event) {
            //Fired when any sound — recognisable speech or not — has stopped being detected.
            console.log('SpeechRecognition.onsoundend');
        }

        recognition.onspeechstart = function (event) {
            //Fired when sound that is recognised by the speech recognition service as speech has been detected.
            console.log('SpeechRecognition.onspeechstart');
        }
        recognition.onstart = function (event) {
            //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
            console.log('SpeechRecognition.onstart');
        }

        recognition.start();
    }
    run();
}

