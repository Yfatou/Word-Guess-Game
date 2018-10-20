//Javascript file

//Variables declaration
var numberOfRemainingGuesses = 10; //the user have 10 guesses to find the word
var currentWord  = ""; //this stores the selected random word until user wins or losses
var wrongGuessWord = ""; //this stores the letter concatenation everytime it's the wrong letter guess.
var rightGuessWord = [];//to store the list of letters corectly guessed by the player until we reach the whole word
var inputKeypressed = ""; // this stores the key pressed letter

//Array of words that will be used for the game
var randomWords = ["bonjour", "merci", "bienvenue", "aurevoir", "bonsoir", "baguette", "croissant", "macaron", "paris"];

//wordGame object has the property values and methods to play this word guessing game.
var wordGame = {
    wins: 0,  //at the beginning of the game, wins and losses are intialized at 0
    losses: 0, 
    initializeUnderline: function() {//create the word to guess with underlines for each letter
        for (var i=0; i < currentWord.length; i++){
           rightGuessWord[i] = "_"; //the number to guess with underlines representing the letters
        }
    },

   checkForWins: function() {
        var strConvertType = "";//convert the array with the guessed word into a string
                                //to compare it
        for (var i = 0; i < currentWord.length; i++) {
            strConvertType += rightGuessWord[i];
        }
        if (strConvertType === currentWord) {//if the word guessed is te one choosed randomly at the beginning
            alert("Congratulations, you've won!");//the player won
            this.wins++;                           //the win counter is incremented
            this.resetGame();                      //the game reset
        }
    },

    checkForLosses: function() { //if there is no more numberOfRemainingGuesses left, the player lost and the game is reset
        if (numberOfRemainingGuesses == 0){
            alert("You've lost!");
            this.losses++;
            this.resetGame();
        }
    },

    checkComputerGuessWordwithKeypressedLetter: function() { //compare the key pressed letter with the letters in the word to find
        var isFound = false; 
        for (var i = 0; i < currentWord.length; i++) {
            if (currentWord[i].indexOf(wordGame.inputKeypressed) >= 0){//check if the letter pressed by the player exists in the currentWord
                rightGuessWord[i] = wordGame.inputKeypressed;
                isFound = true;
            }
        }
            //If the letter is not in the word to guess, it is added to the wrongGuessWord list and displayed
            if (isFound == false && wrongGuessWord.indexOf(wordGame.inputKeypressed) === -1) {
                wrongGuessWord += " " + wordGame.inputKeypressed;
                numberOfRemainingGuesses--; //decrement the numberOfRemainingGuesses
        }
    },

    allLetter: function(inputtxt) {//check if the input character is a letter
        var letters = /^[A-Za-z]+$/;
        if (inputtxt.match(letters)) {
            return true;
        }
        else {
            return false;
        }
    },

    resetGame: function() {//reset the global variable to their initial value
        numberOfRemainingGuesses = 10;
        currentWord  = "";
        wrongGuessWord = "";
        rightGuessWord = [];
        inputKeypressed = "";
        currentWord = (randomWords[Math.floor(Math.random() * randomWords.length)]).toLowerCase();
        this.initializeUnderline();
        this.display();
    },
   
    display: function() {
        //if it is the right letter guess, the rightGuessWord will display in current-word div
        document.getElementById("current-word").textContent = rightGuessWord.join(" ");

        //the number of remaining guesses will decrement if it is the wrong letter key pressed.
        // and will display in the guesses-remaining div
        document.getElementById("remaining-guesses").textContent = numberOfRemainingGuesses;

        //the wrong letter guess will be displayed in the guessed-letters div.
        document.getElementById("guessed-letters").textContent = wrongGuessWord;

        //everytime if a letter is pressed, it checks for wins and displays the total wins in the showWins div
        this.checkForWins();
        document.getElementById("showWins").textContent = this.wins;

        //everytime if a letter is pressed, it checks for losses and displays the total wins in the showLosses div
        this.checkForLosses();
        document.getElementById("showLosses").textContent = this.losses;
    },

    playGame: function() {//Play function
        this.checkComputerGuessWordwithKeypressedLetter();
        this.display();
    }
};


function initialize_Game() {//initialisation of the game
    currentWord = (randomWords[Math.floor(Math.random() * randomWords.length)]).toLowerCase(); 
    console.log(currentWord);
    wordGame.initializeUnderline();
}


document.onkeyup = function(event) {
    var letter = event.key.toLowerCase();     
    if (wordGame.allLetter(letter)){//If the entry is a letter
        wordGame.inputKeypressed = letter;//it is stocked in the keypressed variable
        wordGame.playGame();//we call the play game function
    } else {//the player type an entry that is not a letter
        alert("Invalid Entry, a letter only!!");
    }
}


