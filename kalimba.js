/*
Kalimba
Author: Obadiah Metivier
Author URI: http://middleearmedia.com/
Description: Virtual Instrument based on Kalimba.
Version: 1.0
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
 var context = new webkitAudioContext();
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
       source.connect(context.destination);
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
 
// Don't forget to make the tines change color when clicked 
$(function(){
 
  $(".tine").mouseover(function () {
     $(this).effect( "highlight",{color:"#6ACC28"}, 120 );
 
  });
 
});

$(document).keypress(function(e){
  if(e.charCode == 103){
    // Do your thing
  }
})