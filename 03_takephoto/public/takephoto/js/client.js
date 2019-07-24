'use strict'

//filter
var filtersSelect = document.querySelector('select#filter');

//picture
var snapshot = document.querySelector('button#snapshot');
var picture = document.querySelector('canvas#picture');
picture.width = 640;
picture.height = 480;

var videoplay = document.querySelector('video#player');

function gotMediaStream(stream){
    var videoTrack = stream.getVideoTracks()[0];

    window.stream = stream;
    videoplay.srcObject = stream;
}

function handleError(err){
    console.log('getUserMedia error:', err);
}

function start() {

    if(!navigator.mediaDevices ||
       !navigator.mediaDevices.getUserMedia){

        console.log('getUserMedia is not supported!');
        return;

    }else{

        //var deviceId = videoSource.value; 
        var constraints = {
            video : {
                width: 640,	
                height: 480,
                frameRate:15,
                facingMode: 'enviroment'
		//,
                //deviceId : deviceId ? {exact:deviceId} : undefined 
            }, 
            audio : false 
        }

        navigator.mediaDevices.getUserMedia(constraints)
            .then(gotMediaStream)
            .catch(handleError);
    }
}

filtersSelect.onchange = function(){
    videoplay.className = filtersSelect.value;
}

snapshot.onclick = function() {
    picture.className = filtersSelect.value;
    picture.getContext('2d').drawImage(videoplay, 0, 0, picture.width, picture.height);
}


start();
