var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function(){
    var userChosenColour =$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
  
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      }
      else{
        $("body").addClass("game-over");
        playSound("wrong")
        $("h1").text("Game over!Press any key to restart");
        setTimeout(function(){
            $("body").removeClass("game-over");

        },200);
        startOver();
      }
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    let randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber]

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}


function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();

}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function (){
        $("#"+currentColor).removeClass("pressed");
    },100)
}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;

}






