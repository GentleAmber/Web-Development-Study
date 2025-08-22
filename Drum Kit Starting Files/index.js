var buttonNodeList = document.querySelectorAll("button");
var buttonNum = buttonNodeList.length;

for (var i = 0; i < buttonNum; i++) {
    buttonNodeList[i].addEventListener("click", function() {
        playSoundBasedOnValue(this.innerHTML);
        buttonAnimation(this.innerHTML);
    });
}

document.addEventListener("keydown", function(event) {
    playSoundBasedOnValue(event.key);
    buttonAnimation(event.key);
});

function playSoundBasedOnValue(value) {
    switch (value) {
        case "w":
            var audio = new Audio("./sounds/tom-1.mp3");
            audio.play();
            break;
        case "a":
            var audio = new Audio("./sounds/tom-2.mp3");
            audio.play();
            break;
        case "s":
            var audio = new Audio("./sounds/tom-3.mp3");
            audio.play();
            break;
        case "d":
            var audio = new Audio("./sounds/tom-4.mp3");
            audio.play();
            break;
        case "j":
            var audio = new Audio("./sounds/crash.mp3");
            audio.play();
            break;
        case "k":
            var audio = new Audio("./sounds/kick-bass.mp3");
            audio.play();
            break;
        case "l":
            var audio = new Audio("./sounds/snare.mp3");
            audio.play();
            break;
    }
}

function buttonAnimation(keyValue) {
    document.querySelector("." + keyValue).classList.add("pressed");
    setTimeout(function(){
        document.querySelector("." + keyValue).classList.remove("pressed");
    }, 100);
}
