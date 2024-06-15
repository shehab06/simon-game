let buttonColours = ["red","blue","green","yellow"]
let gamePattern = [];
let userClickedPattern= [];
let level = 0;
let started = false

  
$(document).keypress(function(event){
 if (!started){
  nextSequence();
  
  $("h1").text("Level "+ level);
started= true;
}
});
  
$(".btn").click(function(){
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
 });

 function checkAnswer(currentLevel){
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
  
      
      setTimeout(function () {
        nextSequence();
      }, 1000);
  
  }
  }
  else{
    console.log("wrong");
    let audio1= new Audio("sounds/wrong.mp3");
    audio1.play();
    $("body").addClass("game-over");
    setTimeout(function(){
$("body").removeClass("game-over"); },200)
$("h1").text("Game Over, Press Any Key to Restart");
startOver();
  }
  }

function nextSequence(){
  userClickedPattern = [];
  level++;
let randomNumber = Math.floor((Math.random()*4));
randomChosenColour= buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
$("#"+ randomChosenColour).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
$("h1").text("Level "+level);

}

function playSound(name){
  let audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColour){
$("#"+currentColour).addClass("pressed");
setTimeout(function(){
  $("#"+currentColour).removeClass("pressed");
},100);

}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}