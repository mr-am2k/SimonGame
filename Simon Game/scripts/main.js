//Variables
let br = 0;
let level = 0;
//Arrays
let gamePattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
//Functions
function nextSequence (){
    userClickedPattern = [];
    let randomNumber = Math.floor((Math.random()*4));
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
    $("#level-title").html("Level " + level);
}
function playSound (name){
    let audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}
function animatePess (currentColour){
    $("." + currentColour).addClass("pressed");
    setTimeout(function () {      
        $("." + currentColour).removeClass("pressed");         
}, 100);
}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);      
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {      
            $("body").removeClass("game-over");         
        }, 200);
        $("#level-title").html("Game Over, Press Any Key to Restart ");
        startOver();
    }
}
function startOver(){
    level = 0;
    br = 0;
    gamePattern = [];
    userClickedPattern = [];
}
//EventListners
$(".btn").click(function(){
    let userChosenColour = $(this).attr('id'); 
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePess(userChosenColour);
    checkAnswer(userClickedPattern.length - 1)
});
$(document).keypress(function(){
    if(br === 0 ){
        nextSequence();    
    }
    br++;
})

