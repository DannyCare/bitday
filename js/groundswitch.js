var timeBetweenBackgrounds = 7200000; // in milliseconds - change this to 7200000 for 2 hour between every image

var d = new Date();
var hour = d.getHours();
var minutes = d.getMinutes();
var gdNumber = getPicture(hour);

$(document).ready(function() {

  // Determine starting background images:

  if (gdNumber < 11) {
    var gdNumberNext = gdNumber + 1;
  }
  if (gdNumber == 11) {
    var gdNumberNext = 0;
  }

  $('#groundOne').addClass('land-' + gdNumber);
  $('#groundTwo').addClass('land-' + gdNumberNext);

  // Get time overshoot (i.e. how far (in percentage) are we in a certain time-block):
  // Every block is 2 hours, so 1 hour into a block would be 50% (0.50)
  // Every minute would be 1/120th of a block (minutes / 60 * 0.50)

  var timeovershoot= 0;

  // Add 50% to the current block if we're in the second hour of a block (see hour definition on the bottom and adjust this if necessary):

  if (hour == 0 || hour == 22 || hour== 20 || hour == 18 || hour == 16 || hour == 14 || hour == 12 || hour == 10 || hour == 8 || hour == 6 || hour == 4 || hour == 2){
    timeovershoot= timeovershoot + 0.5;
  }

  // Calculate minute overshoot and add this to the time overshoot:

  minuteovershoot= (minutes/60)*0.5;
  timeovershoot= timeovershoot + minuteovershoot;

  // Calculate time remaining till this block ends (to determine how long to continue fading for):

  percentageOfBlockDone= timeovershoot;
  percentageOfBlockRemaining= 1-percentageOfBlockDone;
  secondsInBlockRemaining= timeBetweenBackgrounds * percentageOfBlockRemaining;

  console.log('CURRENT TIME IS: ' + hour + ':' + minutes + '. STARTING BACKGROUNDS ARE: land-' + gdNumber + ' (opacity ' + percentageOfBlockRemaining.toFixed(2) + ', fading OUT); land-' + gdNumberNext + ' (opacity ' + percentageOfBlockDone.toFixed(2) + ', fading IN).')

  // Set opacity values adjusted to percentage of current block that has elapsed:
  // We're fading div ONE out, so this will have an opacity of the percentage still remaining in this block,
  // and we're fading div TWO in, so this will have an opacity of percentage done in this block.

  $('#groundOne').css('opacity',percentageOfBlockRemaining);
  $('#groundTwo').css('opacity',percentageOfBlockDone);

  // Adjust fade timers and start fading:

  $('#groundOne').fadeTo(secondsInBlockRemaining, 0);
  $('#groundTwo').fadeTo(secondsInBlockRemaining, 1, function(){

    // Once we're done finishing fading the time block that we started in, continue like normal:

    window.setInterval(setBackground, timeBetweenBackgrounds);

  });

});

var activeBackground = gdNumber;
var activeDiv = 1;

function setBackground() {

  if (activeDiv == 1) {

    if (activeBackground < 11) {
      var nextBackground = activeBackground + 1;
    }
    if (activeBackground == 11) {
      var nextBackground = 0;
    }
    console.log('Current background = ' + activeBackground + '. Next background = ' + nextBackground + '. Fading out container One. Fading in container Two.');
    $('#groundTwo').attr('class', 'bg').addClass('land-' + nextBackground).fadeIn(timeBetweenBackgrounds);
    $('#groundOne').fadeOut((timeBetweenBackgrounds - 500), function() {
      activeBackground = nextBackground;
      activeDiv = 2;
    });

  }
  if (activeDiv == 2) {

    if (activeBackground < 11) {
      var nextBackground = activeBackground + 1;
    }
    if (activeBackground == 11) {
      var nextBackground = 0;
    }
    console.log('Current background = ' + activeBackground + '. Next background = ' + nextBackground + '. Fading out container Two. Fading in container One.');
    $('#groundOne').attr('class', 'land').addClass('land-' + nextBackground).fadeIn(timeBetweenBackgrounds);
    $('#groundTwo').fadeOut((timeBetweenBackgrounds - 500), function() {
      activeBackground = nextBackground;
      activeDiv = 1;
    });

  }

}


//Determines the picture to use based on the hour
function getPicture(hour) {
  if (hour >= 23 || hour <= 1)
    return 11;
  else if (hour >= 21)
    return 10;
  else if (hour >= 19)
    return 9;
  else if (hour >= 17)
    return 8;
  else if (hour >= 15)
    return 7;
  else if (hour >= 13)
    return 6;
  else if (hour >= 11)
    return 5;
  else if (hour >= 9)
    return 4;
  else if (hour >= 7)
    return 3;
  else if (hour >= 5)
    return 2;
  else if (hour >= 3)
    return 1;
  else
    return 0;
};
