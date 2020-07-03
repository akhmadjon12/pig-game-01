/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, newRules, firstPlayer, secondPlayer;
init();

var lastDice;

document.querySelector(".btn-roll").addEventListener('click', function() {

  if(gamePlaying){
    // 1. Random Number.
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    // 2. Display the result
    var diceDOM = document.querySelector('.dice')
    diceDOM.style.display = 'block';
    diceDOM.src = "dice-" + dice + ".png";
    ////////////////////////////
    var diceDOM2 = document.querySelector('.dice2')
    diceDOM2.style.display = 'block';
    diceDOM2.src = "dice-" + dice2 + ".png";
  // 3. Update the round score IF the rolled number was NOT a 1;
 if(dice !== 1 && dice2 !== 1){
    //Add score
    roundScore += dice + dice2;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
    // Next Player
    nextPlayer();
}

    lastDice = dice;

  }
});

document.querySelector('.btn-hold').addEventListener('click', function(){

    if(gamePlaying){
  //  1. Add Current Score to GLOBAL score;
    scores[activePlayer] += roundScore;
  // update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

  // Check if player won the game
    if (scores[activePlayer] >= newRules) {
      document.querySelector('#name-' + activePlayer).textContent = "Winner!";
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.dice2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    }else {
      nextPlayer();

    }
}
});

function nextPlayer(){
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');


  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init);


function init(){
  //////////////////
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  ////////////////////////////////
  firstPlayer = prompt("First Player 1: Please write your name: ");
  secondPlayer = prompt("Second Player 2: Please write your name: ");

  newRules = prompt("The winner is who reach first to (number, ex: 100, 150):");
  if(firstPlayer == "" || secondPlayer == "" || newRules == ""){
    gamePlaying = false;
    alert("You should write First Player's name, Second Player's name and The winning score. \nSomething went wrong. Try to start a new game.");
  }
  console.log(firstPlayer, secondPlayer, newRules);
////////////////////////////
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';

  document.getElementById('name-0').textContent = firstPlayer;
  document.getElementById('name-1').textContent = secondPlayer;

  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
///////////////////

}
