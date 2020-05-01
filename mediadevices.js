function handleError(error) {
    console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}
audioInputSelect = document.getElementById('audioinput');
audioOutputSelect = document.getElementById('audiooutput');

stream = null;

function gotStream(stream) {
    window.stream = stream; // make stream available to console
    // Refresh button list in case labels have become available
    return navigator.mediaDevices.enumerateDevices();
}

function gotDevices(deviceInfo) {
    console.log(deviceInfo);
    
    var option = document.createElement('option');
    option.value = deviceInfo.id;
    if (deviceInfo.kind === 'audioinput') {
        option.text = deviceInfo.label || 'Microphone ' + (audioInputSelect.length + 1);
        audioInputSelect.appendChild(option);
    } else if (deviceInfo.kind === 'audiooutput') {
        option.text = deviceInfo.label || 'Speaker ' + (audioOutputSelect.length + 1);
        audioOutputSelect.appendChild(option);
    }
    
}

function refreshDeviceList() { 
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(stream => { 
        streamVar = stream; 
    }).catch(handleError);
}

(async () => {   
    await navigator.mediaDevices.getUserMedia({audio: true, video: true});   
    let devices = await navigator.mediaDevices.enumerateDevices();   
    console.log(devices); 
  })();

//refreshDeviceList();