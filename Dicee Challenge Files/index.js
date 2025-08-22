window.addEventListener('load', () => {
  if (sessionStorage.getItem('hasVisited')) {
    // Page was refreshed — call your function here
    rollDice();
  } else {
    // First visit — mark as visited
    sessionStorage.setItem('hasVisited', 'true');
  }
});

function rollDice() {
    var randomNumber1 = Math.floor(Math.random() * 6 + 1);
    var randomNumber2 = Math.floor(Math.random() * 6 + 1);

    var diceImg1 = document.querySelector(".img1");
    diceImg1.setAttribute("src", "./images/dice" + randomNumber1 + ".png");

    var diceImg2 = document.querySelector(".img2");
    diceImg2.setAttribute("src", "./images/dice" + randomNumber2 + ".png");

    if (randomNumber1 > randomNumber2) {
        document.querySelector("h1").innerHTML = "🚩 Player 1 wins!";
    } else if (randomNumber1 === randomNumber2) {
        document.querySelector("h1").innerHTML = "Tie!";
    } else {
        document.querySelector("h1").innerHTML = "🚩 Player 2 wins!";
    }
}

