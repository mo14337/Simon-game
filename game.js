
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];


var started = false;


var level = 0;

//to detect when a keyboard key has been pressed
$(document).keypress(function() {
  if (!started) {

    //h1 title"Press A Key to Start", change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//listens for button clicks by user
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);  // used to push user choosen color to userClickedPattern array

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


//generates pattern using math.random
function nextSequence() {

  //nextSequence() is triggered, reset the userClickedPattern 
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);  // used to push random choosen color to gamepattern array

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//use to play sound according to userChosenColor and randomChosencolor 
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//used to add annimation to the button when pressed
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  // remove annimation after sometimes
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function checkAnswer(currentLevel){

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    
    if (userClickedPattern.length === gamePattern.length){

      // call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");

     // play this sound if the user got wrong ans
     playSound("wrong");

     // add css class game-over
     $("body").addClass("game-over");
     setTimeout(function () {
       $("body").removeClass("game-over");
     }, 200);

     // h1 title to say "Game Over, Press Any Key to Restart" 
     $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();//call this when user gets wrong answer
   }

  }
  
  
  
  //new function called startOver().
function startOver() {

  // reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
  
