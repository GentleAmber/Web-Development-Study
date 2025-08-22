function nextSequence() {
    var randomNum = Math.floor(Math.random() * 4);
    generatedSequence.push(randomNum);

    // 0: green, 1: red, 2: yellow, 3: blue
    switch (randomNum) {
        case 0:
            buttonPushed("#green");
            var greenAudio = new Audio("./sounds/green.mp3");
            greenAudio.play();
            break;
        case 1:
            buttonPushed("#red");
            var greenAudio = new Audio("./sounds/red.mp3");
            greenAudio.play();
            break;
        case 2:
            buttonPushed("#yellow");
            var greenAudio = new Audio("./sounds/yellow.mp3");
            greenAudio.play();
            break;
        case 3:
            buttonPushed("#blue");
            var greenAudio = new Audio("./sounds/blue.mp3");
            greenAudio.play();
            break;
    }
}

function buttonPushed(cssSelector) {
    $(cssSelector).addClass("pressed");
    setTimeout(function (){
        $(cssSelector).removeClass("pressed"); 
    }, 150);

    switch($(cssSelector).attr("id")) {
        case "green":
            var greenAudio = new Audio("./sounds/green.mp3");
            greenAudio.play();
            break;
        case "red":
            var greenAudio = new Audio("./sounds/red.mp3");
            greenAudio.play();
            break;
        case "yellow":
            var greenAudio = new Audio("./sounds/yellow.mp3");
            greenAudio.play();
            break;
        case "blue":
            var greenAudio = new Audio("./sounds/blue.mp3");
            greenAudio.play();
            break;
    }
}

function titleUpdate(level) {
    $("h1").html("Level " + level);
}

function logUserInput(num) {
    userSequence.push(num);
}

// function checkAnswer() {
//     if (userSequence.length != generatedSequence.length) {
//         return false;
//     } else {
//         for (var i = 0; i < userSequence.length; i++) {
//             if (generatedSequence[i] != userSequence[i]) {
//                 return false;
//             }
//         }
//     }

//     return true;
// }

function gameOver() {
    $("h1").text("Game over! Click any button to restart!");
    var gameOverAudio = new Audio("./sounds/wrong.mp3");
    gameOverAudio.play();

    generatedSequence = [];
    userSequence = [];
    level = 1;
}

var gameOn = false;
var generatedSequence = new Array();
var level = 1;
var userSequence = [];

$(".btn").click(function() {
    
    buttonPushed(this);
    

    if (gameOn === false) {
        if (generatedSequence.length != 0) {
            gameOver();
        } else { 
            // First time entering the game. Initialising
            gameOn = true;
            setTimeout(function (){
                nextSequence();
            }, 300);
            
            setTimeout(function (){
                titleUpdate(level++);
            }, 50);
        }
    } else {
        // Log user's input
        switch($(this).attr("id")) {
            // 0: green, 1: red, 2: yellow, 3: blue
            case "green":
                userSequence.push(0);
                break;
            case "red":
                userSequence.push(1);
                break;
            case "yellow":
                userSequence.push(2);
                break;
            case "blue":
                userSequence.push(3);
                break;
        }

        if (userSequence.length < generatedSequence.length) {
            for (var i = 0; i < userSequence.length; i++) {
                if (userSequence[i] != generatedSequence[i]) {
                    gameOn = false;
                    gameOver();
                }
            }
        } else {
            // User input is all right. Show the next button and clear user sequence.
            setTimeout(function (){
                nextSequence();
            }, 300);
            
            setTimeout(function (){
                titleUpdate(level++);
            }, 50);
            
            userSequence = [];
        }
    }

    // if (generatedSequence.length != 0 && gameOn === false) {
    //     alert("Game over!");
    // }

    // if (gameOn === true && waitingUserInput === false) {
    //     titleUpdate(level++);
    //     setTimeout(function (){
    //         nextSequence(generatedSequence);
    //         waitingUserInput = true;
    //     }, 300);
    // }

    // if (gameOn === true && waitingUserInput === true) {
    //     switch($(this).attr("id")) {
    //         case "green":
    //             userSequence.push(num);
    //     }
    // }
});

