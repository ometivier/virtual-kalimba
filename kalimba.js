/*
Kalimba
Author: Obadiah Metivier
Author URI: http://middleearmedia.com/
Description: Virtual Instrument based on Kalimba.
Version: 1.2
*/

// Create variables and assign audio files to them  
// B Min Pentatonic Kalimba
// Bank A Left to Right
 var a_tine1 = new audioApiKey("a_tine1","assets/sounds/kalimba/a_kalimba_b3.wav");
 var a_tine2 = new audioApiKey("a_tine2","assets/sounds/kalimba/b_kalimba_c4.wav");
 var a_tine3 = new audioApiKey("a_tine3","assets/sounds/kalimba/c_kalimba_d4.wav");
 var a_tine4 = new audioApiKey("a_tine4","assets/sounds/kalimba/d_kalimba_e4.wav");
 var a_tine5 = new audioApiKey("a_tine5","assets/sounds/kalimba/e_kalimba_fsharp4.wav");
 var a_tine6 = new audioApiKey("a_tine6","assets/sounds/kalimba/f_kalimba_g4.wav");
 var a_tine7 = new audioApiKey("a_tine7","assets/sounds/kalimba/g_kalimba_a4.wav");
 var a_tine8 = new audioApiKey("a_tine8","assets/sounds/kalimba/h_kalimba_b4.wav");
 var a_tine9 = new audioApiKey("a_tine9","assets/sounds/kalimba/i_kalimba_c5.wav");
 var a_tine10 = new audioApiKey("a_tine10","assets/sounds/kalimba/j_kalimba_d5.wav");
 var a_tine11 = new audioApiKey("a_tine11","assets/sounds/kalimba/k_kalimba_e5.wav");
 var a_tine12 = new audioApiKey("a_tine12","assets/sounds/kalimba/l_kalimba_fsharp5.wav");
 var a_tine13 = new audioApiKey("a_tine13","assets/sounds/kalimba/m_kalimba_g5.wav");
 var a_tine14 = new audioApiKey("a_tine14","assets/sounds/kalimba/n_kalimba_a5.wav");
 var a_tine15 = new audioApiKey("a_tine15","assets/sounds/kalimba/o_kalimba_b5.wav");
 var a_tine16 = new audioApiKey("a_tine16","assets/sounds/kalimba/p_kalimba_c6.wav"); 
 
// Create Audio Container
 var context = new webkitAudioContext();
	 compressor = context.createDynamicsCompressor(); // Create compressor to sweeten overall mix
     masterGainNode = context.createGainNode(); // Create master gain control
	 
 function audioApiKey(domNode,fileDirectory) {
    this.domNode = domNode;
    this.fileDirectory = fileDirectory;
    var bufferFunctionName = bufferFunctionName;
    var incomingBuffer;
    var savedBuffer;
    var xhr;
       bufferFunctionName = function () {
       var source = context.createBufferSource();
       source.buffer = savedBuffer;
       source.connect(compressor);
       source.noteOn(0); // Play sound immediately
       };
    var xhr = new XMLHttpRequest();
    xhr.open('get',fileDirectory, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
    context.decodeAudioData(xhr.response,
       function(incomingBuffer) {
       savedBuffer = incomingBuffer;
       var note = document.getElementById(domNode);
       note.addEventListener("mouseover", bufferFunctionName , false);
         }
      );
   };
 xhr.send();
 };
 	
// compressor settings
compressor.connect(masterGainNode);
	
// master gain control settings
masterGainNode.gain.value = 0.3;
masterGainNode.connect(context.destination);

	
 
// Don't forget to make the tines change color when clicked 
$(function(){
 
  $(".tine").mouseover(function () {
     $(this).effect( "highlight",{color:"#6ACC28"}, 120 );
 
  });
});







// Called when all audio assets are finished loading
function finishLoading() {
    kitCount++;
    if (kitCount < kitNames.length) return;

    if (isLoaded) return;

    // Setup initial drumkit
    currentKit = kits[0];

    makeKitsList();

}

// Initialize drum kits
var numKits = kitNames.length;
kits = new Array(numKits);
for (var i  = 0; i < numKits; i++) {
    kits[i] = new Kit(kitNames[i]);
}



// Create variables for routing
 var context;
 var convolver;
 var compressor;
 var masterGainNode; 

var sampleRate = 44100.0;
var nyquist = sampleRate * 0.5;

var startTime;
var lastDrawTime = -1;

var isLoaded = false;

var kits;

var kNumInstruments = 16;

var currentKit = 0;
var kickCutoff = 22050.0;
var snareCutoff = 22050.0;
var hihatCutoff = 22050.0;
var reverbMix = 0.25;

var kitCount = 0;

var kitElement = 0;  // for list hilighting

var kitNames = [
  "alternating",
  "ascending",
  "descending"
];

function Kit(name) {
    this.name = name;

    this.pathName = function() {
        var pathName = "assets/sounds/kalimba/" + this.name + "/";
        return pathName;
    };

    var pathName = this.pathName();

    var tine1Path = pathName + "a_kalimba_b3.wav";
    var tine2Path = pathName + "b_kalimba_c4.wav";
    var tine3Path = pathName + "c_kalimba_d4.wav";
    var tine4Path = pathName + "d_kalimba_e4.wav";
    var tine5Path = pathName + "e_kalimba_fsharp4.wav";
    var tine6Path = pathName + "f_kalimba_g4.wav";
    var tine7Path = pathName + "g_kalimba_a4.wav";
    var tine8Path = pathName + "h_kalimba_b4.wav";
    var tine9Path = pathName + "i_kalimba_c5.wav";
    var tine10Path = pathName + "j_kalimba_d5.wav";
    var tine11Path = pathName + "k_kalimba_e5.wav";
    var tine12Path = pathName + "l_kalimba_fsharp5.wav";
    var tine13Path = pathName + "m_kalimba_g5.wav";
    var tine14Path = pathName + "n_kalimba_a5.wav";
    var tine15Path = pathName + "o_kalimba_b5.wav";
    var tine16Path = pathName + "p_kalimba_c6.wav";

    this.tine1Buffer = 0;
    this.tine2Buffer = 0;
    this.tine3Buffer = 0;
    this.tine4Buffer = 0;
    this.tine5Buffer = 0;
    this.tine6Buffer = 0;
    this.tine7Buffer = 0;
    this.tine8Buffer = 0;
    this.tine9Buffer = 0;
    this.tine10Buffer = 0;
    this.tine11Buffer = 0;
    this.tine12Buffer = 0;
    this.tine13Buffer = 0;
    this.tine14Buffer = 0;
    this.tine15Buffer = 0;
    this.tine16Buffer = 0;	

    this.instrumentCount = kNumInstruments;
    this.instrumentLoadCount = 0;

    this.loadSample(0, tine1Path, false);  // we're not panning the sounds
    this.loadSample(1, tine2Path, false);
    this.loadSample(2, tine3Path, false);
    this.loadSample(3, tine4Path, false);
    this.loadSample(4, tine5Path, false);
    this.loadSample(5, tine6Path, false);
    this.loadSample(6, tine7Path, false);
    this.loadSample(7, tine8Path, false);
    this.loadSample(8, tine9Path, false);
    this.loadSample(9, tine10Path, false);
    this.loadSample(10, tine11Path, false);
    this.loadSample(11, tine12Path, false);
    this.loadSample(12, tine13Path, false);
    this.loadSample(13, tine14Path, false);
    this.loadSample(14, tine15Path, false);
    this.loadSample(15, tine16Path, false);
}

Kit.prototype.loadSample = function(sampleID, url, mixToMono) {
    // Load asynchronously

    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    var kit = this;

    request.onload = function() {
        var buffer = context.createBuffer(request.response, mixToMono);
        switch (sampleID) {
            case 0: kit.tine1Buffer = buffer; break;
            case 1: kit.tine2Buffer = buffer; break;
            case 2: kit.tine3Buffer = buffer; break;
            case 3: kit.tine4Buffer = buffer; break;
            case 4: kit.tine5Buffer = buffer; break;
            case 5: kit.tine6Buffer = buffer; break;
            case 6: kit.tine7Buffer = buffer; break;
            case 7: kit.tine8Buffer = buffer; break;
            case 8: kit.tine9Buffer = buffer; break;
            case 9: kit.tine10Buffer = buffer; break;
            case 10: kit.tine11Buffer = buffer; break;
            case 11: kit.tine12Buffer = buffer; break;
            case 12: kit.tine13Buffer = buffer; break;
            case 13: kit.tine14Buffer = buffer; break;
            case 14: kit.tine15Buffer = buffer; break;
            case 15: kit.tine16Buffer = buffer; break;
        }

        kit.instrumentLoadCount++;
        if (kit.instrumentLoadCount == kit.instrumentCount) finishLoading();
    }

    request.send();
}


function playNote(buffer) {
    // Create the note
    var voice = context.createBufferSource();
    voice.buffer = buffer;
	// Connect to compressor
    voice.connect(compressor);
    voice.noteOn(0); // Play sound immediately

}
function activateTine(id) {
  var tine = $('#'+id);
  tine.addClass("active");
  var t = setTimeout(function() {
    tine.removeClass("active");
  },120);

}




function playB3() {
  playNote(alternating.tine1Buffer);
  activateTine('a_tine1');
}

function playC4() {
  playNote(currentKit.tine2Buffer);
  activateTine('a_tine2');
}

$(document).on("keydown", function(e) {
  console.log(e);
  switch (e.keyCode) {
    case 65: // A
      playB3();
      break;
    case 83: // S
      playC4();
      break;
    case 68: // D
      playA();
      break;
    case 70: // F
      playB();
      break;
    case 71: // G
      playD();
      break;
    case 72: // H
      playE2();
      break;
    case 74: // J
      playE2();
      break;
    case 75: // K
      playE2();
      break;
    case 76: // L
      playE2();
      break;
    case 186: // ;
      playE2();
      break;
    case 222: // '
      playE2();
      break;	  
  }

}) 