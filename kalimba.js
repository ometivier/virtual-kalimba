/*
 * Kalimba
 * Author: Obadiah Metivier
 * Author URI: http://middleearmedia.com/
 * Description: Virtual Instrument based on Kalimba.
 * Version: 1.6
 */

// Create variables for B minor Pentatonic Kalimba and assign audio files to them  
// Bank B Alternating
var b_tine1 = new audioAlternatingKey("a_tine1","assets/sounds/kalimba/a_kalimba_b3.wav");
var b_tine2 = new audioAlternatingKey("a_tine2","assets/sounds/kalimba/b_kalimba_c4.wav");
var b_tine3 = new audioAlternatingKey("a_tine3","assets/sounds/kalimba/c_kalimba_d4.wav");
var b_tine4 = new audioAlternatingKey("a_tine4","assets/sounds/kalimba/d_kalimba_e4.wav");
var b_tine5 = new audioAlternatingKey("a_tine5","assets/sounds/kalimba/e_kalimba_fsharp4.wav");
var b_tine6 = new audioAlternatingKey("a_tine6","assets/sounds/kalimba/f_kalimba_g4.wav");
var b_tine7 = new audioAlternatingKey("a_tine7","assets/sounds/kalimba/g_kalimba_a4.wav");
var b_tine8 = new audioAlternatingKey("a_tine8","assets/sounds/kalimba/h_kalimba_b4.wav");
var b_tine9 = new audioAlternatingKey("a_tine9","assets/sounds/kalimba/i_kalimba_c5.wav");
var b_tine10 = new audioAlternatingKey("a_tine10","assets/sounds/kalimba/j_kalimba_d5.wav");
var b_tine11 = new audioAlternatingKey("a_tine11","assets/sounds/kalimba/k_kalimba_e5.wav");
var b_tine12 = new audioAlternatingKey("a_tine12","assets/sounds/kalimba/l_kalimba_fsharp5.wav");
var b_tine13 = new audioAlternatingKey("a_tine13","assets/sounds/kalimba/m_kalimba_g5.wav");
var b_tine14 = new audioAlternatingKey("a_tine14","assets/sounds/kalimba/n_kalimba_a5.wav");
var b_tine15 = new audioAlternatingKey("a_tine15","assets/sounds/kalimba/o_kalimba_b5.wav");
var b_tine16 = new audioAlternatingKey("a_tine16","assets/sounds/kalimba/p_kalimba_c6.wav");

var context; // Create Smart Audio Container
if (typeof AudioContext !== "undefined") {
    context = new AudioContext();
} else if (typeof webkitAudioContext !== "undefined") {
    context = new webkitAudioContext();
} else {
    throw new Error('AudioContext not supported. :(');
}

 function audioAlternatingKey(domNode,fileDirectory) {
    this.domNode = domNode;
    this.fileDirectory = fileDirectory;
    var playAudioFile = playAudioFile;
    var incomingBuffer;
    var savedBuffer;
    var xhr;
       playAudioFile = function () {
       var source = context.createBufferSource();
       source.buffer = savedBuffer;
       source.connect(sourceGainNode);
       source.start(0); // Play sound immediately. Renamed source.start from source.noteOn
       };
    var xhr = new XMLHttpRequest();
    xhr.open('get',fileDirectory, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
    context.decodeAudioData(xhr.response,
       function(incomingBuffer) {
       savedBuffer = incomingBuffer; // Save the buffer, we'll reuse it
	   // Once the file is loaded, listen for click on div
	   // Use playAudioFile since it no longer requires a buffer to be passed to it
       var note = document.getElementById(domNode);
       note.addEventListener("mouseover", playAudioFile , false);
         }
      );
   };
 xhr.send();
 };

    sourceGainNode = context.createGain(); // Create source gain control. Renamed createGain from createGainNode
    lowPassFilter = context.createBiquadFilter(); // Create low pass filter
    highPassFilter = context.createBiquadFilter(); // Create high pass filter
	compressorPost = context.createDynamicsCompressor(); // Create post filter compressor
    masterGainNode = context.createGain(); // Create master gain control. Renamed createGain from createGainNode
	pannerNode = context.createPanner(); // Create panner
	
	
 
// sourceGainNode settings
sourceGainNode.connect(lowPassFilter);
sourceGainNode.connect(highPassFilter);
 	
// lowPassFilter settings
lowPassFilter.type = "lowpass"; // (Low-pass) Value renamed "lowpass" from 0
lowPassFilter.frequency.value = 110; // Cut off frequencies above 110 Hz
document.getElementById('filter-1').addEventListener('change', function() {
    lowPassFilter.frequency.value = this.value;
});
lowPassFilter.Q.value = 5; // This is actually resonance in dB
document.getElementById('quality-1').addEventListener('change', function() {
    lowPassFilter.Q.value = this.value;
});
lowPassFilter.connect(compressorPost);

// highPassFilter settings
highPassFilter.type = "highpass"; // (High-pass) Value renamed "highpass" from 1
highPassFilter.frequency.value = 880; // Cut off frequencies below 880 Hz
document.getElementById('filter-2').addEventListener('change', function() {
    highPassFilter.frequency.value = this.value;
});
highPassFilter.Q.value = 5; // This is actually resonance in dB
document.getElementById('quality-2').addEventListener('change', function() {
    highPassFilter.Q.value = this.value;
});
highPassFilter.connect(compressorPost);

// compressorPost settings
compressorPost.connect(masterGainNode);

// masterGainNode settings
masterGainNode.gain.value = 0.5; // Initial volume is 50%
document.getElementById('volume-1').addEventListener('change', function() {
    masterGainNode.gain.value = this.value;
});
masterGainNode.connect(pannerNode);

// pannerNode settings
function pan(range) {
  var xDeg = parseInt(range.value);
  var zDeg = xDeg + 90;
  if (zDeg > 90) {
    zDeg = 180 - zDeg;
  }
  var x = Math.sin(xDeg * (Math.PI / 180));
  var z = Math.sin(zDeg * (Math.PI / 180));
  pannerNode.setPosition(x, 0, z);
}
pannerNode.connect(context.destination);

// Make the tines change color when clicked 
$(function(){
 
  $(".tine").mouseover(function () {
     $(this).effect( "highlight",{color:"#6ACC28"}, 120 );
 
  });
});

// Bank A Ascending
var a_tine1 = new audioAscendingKey("b_tine1","assets/sounds/kalimba/a_kalimba_b3.wav");
var a_tine2 = new audioAscendingKey("b_tine2","assets/sounds/kalimba/b_kalimba_c4.wav");
var a_tine3 = new audioAscendingKey("b_tine3","assets/sounds/kalimba/c_kalimba_d4.wav");
var a_tine4 = new audioAscendingKey("b_tine4","assets/sounds/kalimba/d_kalimba_e4.wav");
var a_tine5 = new audioAscendingKey("b_tine5","assets/sounds/kalimba/e_kalimba_fsharp4.wav");
var a_tine6 = new audioAscendingKey("b_tine6","assets/sounds/kalimba/f_kalimba_g4.wav");
var a_tine7 = new audioAscendingKey("b_tine7","assets/sounds/kalimba/g_kalimba_a4.wav");
var a_tine8 = new audioAscendingKey("b_tine8","assets/sounds/kalimba/h_kalimba_b4.wav");
var a_tine9 = new audioAscendingKey("b_tine9","assets/sounds/kalimba/i_kalimba_c5.wav");
var a_tine10 = new audioAscendingKey("b_tine10","assets/sounds/kalimba/j_kalimba_d5.wav");
var a_tine11 = new audioAscendingKey("b_tine11","assets/sounds/kalimba/k_kalimba_e5.wav");
var a_tine12 = new audioAscendingKey("b_tine12","assets/sounds/kalimba/l_kalimba_fsharp5.wav");
var a_tine13 = new audioAscendingKey("b_tine13","assets/sounds/kalimba/m_kalimba_g5.wav");
var a_tine14 = new audioAscendingKey("b_tine14","assets/sounds/kalimba/n_kalimba_a5.wav");
var a_tine15 = new audioAscendingKey("b_tine15","assets/sounds/kalimba/o_kalimba_b5.wav");
var a_tine16 = new audioAscendingKey("b_tine16","assets/sounds/kalimba/p_kalimba_c6.wav"); 

 function audioAscendingKey(domNode,fileDirectory) {
    this.domNode = domNode;
    this.fileDirectory = fileDirectory;
    var playAudioFile = playAudioFile;
    var incomingBuffer;
    var savedBuffer;
    var xhr;
       playAudioFile = function () {
       var source = context.createBufferSource();
       source.buffer = savedBuffer;
       source.connect(sourceGainNode);
       source.start(0); // Play sound immediately. Renamed from source.noteOn
       };
    var xhr = new XMLHttpRequest();
    xhr.open('get',fileDirectory, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
    context.decodeAudioData(xhr.response,
       function(incomingBuffer) {
       savedBuffer = incomingBuffer; // Save the buffer, we'll reuse it
       var note = document.getElementById(domNode);
       note.addEventListener("mouseover", playAudioFile , false);
         }
      );
   };
 xhr.send();
 };

// Bank C Descending
var a_tine1 = new audioDescendingKey("c_tine1","assets/sounds/kalimba/a_kalimba_b3.wav");
var a_tine2 = new audioDescendingKey("c_tine2","assets/sounds/kalimba/b_kalimba_c4.wav");
var a_tine3 = new audioDescendingKey("c_tine3","assets/sounds/kalimba/c_kalimba_d4.wav");
var a_tine4 = new audioDescendingKey("c_tine4","assets/sounds/kalimba/d_kalimba_e4.wav");
var a_tine5 = new audioDescendingKey("c_tine5","assets/sounds/kalimba/e_kalimba_fsharp4.wav");
var a_tine6 = new audioDescendingKey("c_tine6","assets/sounds/kalimba/f_kalimba_g4.wav");
var a_tine7 = new audioDescendingKey("c_tine7","assets/sounds/kalimba/g_kalimba_a4.wav");
var a_tine8 = new audioDescendingKey("c_tine8","assets/sounds/kalimba/h_kalimba_b4.wav");
var a_tine9 = new audioDescendingKey("c_tine9","assets/sounds/kalimba/i_kalimba_c5.wav");
var a_tine10 = new audioDescendingKey("c_tine10","assets/sounds/kalimba/j_kalimba_d5.wav");
var a_tine11 = new audioDescendingKey("c_tine11","assets/sounds/kalimba/k_kalimba_e5.wav");
var a_tine12 = new audioDescendingKey("c_tine12","assets/sounds/kalimba/l_kalimba_fsharp5.wav");
var a_tine13 = new audioDescendingKey("c_tine13","assets/sounds/kalimba/m_kalimba_g5.wav");
var a_tine14 = new audioDescendingKey("c_tine14","assets/sounds/kalimba/n_kalimba_a5.wav");
var a_tine15 = new audioDescendingKey("c_tine15","assets/sounds/kalimba/o_kalimba_b5.wav");
var a_tine16 = new audioDescendingKey("c_tine16","assets/sounds/kalimba/p_kalimba_c6.wav"); 

 function audioDescendingKey(domNode,fileDirectory) {
    this.domNode = domNode;
    this.fileDirectory = fileDirectory;
    var playAudioFile = playAudioFile;
    var incomingBuffer;
    var savedBuffer;
    var xhr;
       playAudioFile = function () {
       var source = context.createBufferSource();
       source.buffer = savedBuffer;
       source.connect(sourceGainNode);
       source.start(0); // Play sound immediately. Renamed from source.noteOn
       };
    var xhr = new XMLHttpRequest();
    xhr.open('get',fileDirectory, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
    context.decodeAudioData(xhr.response,
       function(incomingBuffer) {
       savedBuffer = incomingBuffer; // Save the buffer, we'll reuse it
       var note = document.getElementById(domNode);
       note.addEventListener("mouseover", playAudioFile , false);
         }
      );
   };
 xhr.send();
 };

// Shortcut Keys for Volume are 1, 2, 3
function volumeLow() {
	masterGainNode.gain.value = 0.2;
}
function volumeDefault() {
	masterGainNode.gain.value = 0.5;
}
function volumeHigh() {
	masterGainNode.gain.value = 0.8;
}

// Shortcut Keys for Pan are 4, 5, 6
function panLeft() {
	pannerNode.setPosition(-1, 0, 0);
}
function panDefault() {
	pannerNode.setPosition(0, 0, 0);
}
function panRight() {
	pannerNode.setPosition(1, 0, 0);
}

// Shortcut Keys for Lowpass Freq are Q, W, E
function lowPassFreqLow() {
	lowPassFilter.frequency.value = 10;
}
function lowPassFreqDefault() {
	lowPassFilter.frequency.value = 110;
}
function lowPassFreqHigh() {
	lowPassFilter.frequency.value = 210;
}

// Shortcut Keys for Lowpass Res are R, T, Y
function lowPassResLow() {
	lowPassFilter.Q.value = 2;
}
function lowPassResDefault() {
	lowPassFilter.Q.value = 5;
}
function lowPassResHigh() {
	lowPassFilter.Q.value = 8;
}

// Shortcut Keys for Highpass Freq are A, S, D
function highPassFreqLow() {
	highPassFilter.frequency.value = 110;
}
function highPassFreqDefault() {
	highPassFilter.frequency.value = 880;
}
function highPassFreqHigh() {
	highPassFilter.frequency.value = 1600;
}

// Shortcut Keys for Highpass Res are F, G, H
function highPassResLow() {
	highPassFilter.Q.value = 2;
}
function highPassResDefault() {
	highPassFilter.Q.value = 5;
}
function highPassResHigh() {
	highPassFilter.Q.value = 8;
}

// Keyboard Events
$(document).on("keydown", function(e) {
  console.log(e);
  switch (e.keyCode) {
    case 49: // 1
      volumeLow();
      break;
    case 50: // 2
      volumeDefault();
      break;
    case 51: // 3
      volumeHigh();
      break;
    case 52: // 4
      panLeft();
      break;
    case 53: // 5
      panDefault();
      break;
    case 54: // 6
      panRight();
      break;	  
    case 81: // Q
      lowPassFreqLow();
      break;
    case 87: // W
      lowPassFreqDefault();
      break;
    case 69: // E
      lowPassFreqHigh();
      break;
    case 82: // R
      lowPassResLow();
      break;
    case 84: // T
      lowPassResDefault();
      break;
    case 89: // Y
      lowPassResHigh();
      break;
    case 65: // A
      highPassFreqLow();
      break;
    case 83: // S
      highPassFreqDefault();
      break;
    case 68: // D
      highPassFreqHigh();
      break;
    case 70: // F
      highPassResLow();
      break;
    case 71: // G
      highPassResDefault();
      break;
    case 72: // H
      highPassResHigh();
      break;	  
  }

})

// Hide, Show & Toggle  

 $(document).ready(function() {
   // Hide Content of Options Menu on page load
   $('div#controls').hide(); // Hide Controls
   $('div#shortcuts').hide(); // Hide Shortcuts
   $('div#tips').hide(); // Hide Tips
   
   // Create toggle buttons for Options Menu
   $('#toggleControls').click(function(){
     $('div#shortcuts').hide(); // Hide Shortcuts when Controls are shown
     $('div#tips').hide(); // Hide Tips when Controls are shown
	 $('div#controls').toggle(); // Toggle Controls
   });
   $('#toggleShortcuts').click(function(){
     $('div#controls').hide(); // Hide Controls when Shortcuts are shown
     $('div#tips').hide(); // Hide Tips when Shortcuts are shown
     $('div#shortcuts').toggle(); // Toggle Shortcuts
   });
   $('#toggleTips').click(function(){
     $('div#shortcuts').hide(); // Hide Shortcuts when Tips are shown   
     $('div#controls').hide(); // Hide Controls when Tips are shown   
     $('div#tips').toggle(); // Toggle Tips
   });
   
   // Hide Content of Arrangement Menu on page load
   $('div#ascending').hide(); // Hide Ascending
   $('div#descending').hide(); // Hide Descending
   
   // Create toggle buttons for Arrangement Menu
   $('#toggleAscending').click(function(){
     $('div#alternating').hide(); // Hide Alternating when Ascending is shown
     $('div#descending').hide(); // Hide Descending when Ascending is shown
	 $('div#ascending').toggle(); // Toggle Ascending
   });
   $('#toggleAlternating').click(function(){
     $('div#ascending').hide(); // Hide Ascending when Alternating is shown
     $('div#descending').hide(); // Hide Descending when Alternating is shown
     $('div#alternating').toggle(); // Toggle Alternating
   });
   $('#toggleDescending').click(function(){
     $('div#ascending').hide(); // Hide Ascending when Descending is shown   
     $('div#alternating').hide(); // Hide Alternating when Descending is shown   
     $('div#descending').toggle(); // Toggle Descending
   });   
 });