/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

CODE CHALLENGE 3:

1) A player loses his entire score when he rolls two 6's in a row. After that, it's the next player's turn.
(HINT: always save the previous dice roll in a separate var )

2) Add an input field to the html where players can set the winning score, so that they can change the predefined score of 100.
(You can read that value with the .value property in Javascript. Google it)

3) Add another dice to the game, so that there are two dice now. The player loses his current score when either one hits 1.
(You will need css to position the second dice
review the code for the first 1.)


inside of budgety we have been using them add event listeners under functions.

chromeOS package manager.
*/
//we are using an array to store our two player scores so we can have 1 var to keep track of.

//global scope vars
var scores, roundScore, activePlayer,gamePlaying, newScore,count;

  init();
    
///////////////////////////////////   issues   /////////////////////////////////////
/*
once a player wins you can continue to click the roll dice button and the current score gets added
this also then breaks the active player


we will use a state variable to tell us the condition of a system
is our game playing or not playing
created a global var called gamePlaying
enabled it under function init()
under win condition confirmed disable this state var.
*/

/*
allows us to select elements like css. select the element and make it our random num.
we are using '#current-' + activePlayer which we defined above.
This allows us to toggle between the two players and be dynamic.
innerhtml needs to be a string.
document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'

*/

/*
make rolling the dice a function.
*/


//split the actual roll into a separate function;
function diceRoll(){
  if(gamePlaying){
  var die = Math.floor(Math.random()*6) +1;
  return die;
  }
}

//the actual rolling of the die that gets called.
function roll(){
  var results = [];
  
  let i = 0;
    while (i < 2){
      var rollDie = diceRoll();
      results.push(rollDie);
      console.log(results);
      i++;
  }
  return results;
}

function checkResults(){//review the results of the row.
  var diceDOM;
  var game = roll();
  for(let i = 0; i < game.length; i++){
    if(game[i]===6){
      count ++;
      console.log(count);
      if(count === 2){
       //remove the score for rolling two sixes.
        alert('you rolled two sixes!');
          roundScore = 0;
          nextPlayer();
        }
      }
    
    else if(game[i] ===1){
      nextPlayer();
    }
    else {//getting the results to display correctly inside css and on the webpage.
      
          diceDOM =  document.querySelector('.dice');
          diceDOM.style.display = 'block';
          diceDOM.src='dice-' + game[i] + '.png';
          console.log(diceDOM);
         roundScore += game[i];
       
   
      }
      
    }
  
  
}


function submit(){//end user can update score with input.
   newScore = document.getElementById('updateWinscore').value;
  if(gamePlaying){
    if(newScore < 0){
      alert('please input a number greater than 0!');
    }
    else {
      return newScore;
    }
  }
}
/*
Still have issues where you can continue to roll the dice after winning
new game button doesn't work yet.
*/
function holdScore(){
//first we need to capture the id in the dom
   
  //only allow the values to be held if the game is active.
    if(gamePlaying){
      if(newScore !== ''){
       //need to get the global score captured
    scores[activePlayer] += roundScore;
    
    //update the ui textContent is how we are updating the dom with new info.
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
  
    //check if player won the game. right now the score of 0 is allowing someone to win
    
    if(scores[activePlayer] >= 100 || scores[activePlayer] >= newScore ){
      
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      //dom manipulating the entire player panel with a css class add
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      //remove the active class css change. Using the variable trick to switch
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else { //otherwise it's the other player's turn.
      nextPlayer();
      
          }
        }
      }
    }

function nextPlayer(){
  //created a function because we were going to be using this code repeatedly.
   activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    count = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    document.querySelector('.dice').style.display = 'none';
    console.log('switched players!');
}


  //start a new game.
    document.querySelector('.btn-new').addEventListener('click', init );
    
    
//created an init function to allow us to run this code without breaking dry.
function init(){
  scores = [0,0];
  roundScore = 0;
//0 will be the 1st player 1  = 2nd player b/c our scores are stored in an arr.
  activePlayer = 0;
  gamePlaying = true;
  newScore = 100;
  count = 0;
  console.log('game started!');
  
     //hides the dice image when first starting the game. uses css style
  document.querySelector('.dice').style.display = 'none';

//set all the values to be 0 at the start of the game.
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  
  //instead of trying to guess which one will be the winner just reset both.
  document.getElementById('name-0').textContent = 'PLAYER 1 ';
  document.getElementById('name-1').textContent = 'PLAYER 2 ';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  
  //active class needs to be re-added to the first player to make it work on new game.
  document.querySelector('.player-0-panel').classList.add('active');
}

