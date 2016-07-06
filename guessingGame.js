//guessingGame.js
(function() {
    
    var confirmAudio, successAudio;

    $(document).ready(function() {

        confirmAudio = new Audio('/confirm.wav');
        successAudio = new Audio('/success.wav');

        //Generate a an object which holds all of the important game values
        //Parameters are (min_num, max_num, guesses_allowed)
        var game = generateGame(1, 100, 5);

        //handle submit button clicked
        $('#submit').on('click', function(event){
            event.preventDefault();
            handleSubmission(game);
        });

        //Prevent 'submit' default action
        $('.guessingGameForm').submit(function(event) {
           event.preventDefault();

        });

        //handle enter button pressed
        $('.guessingGameForm').on('keyup', function(event){

            if(event.which == 13){
                event.preventDefault();
                handleSubmission(game);
            }

        });


        //handle restart button pressed
        $('#restartGame').on('click', function(){
            location.reload();
        });

        //handle hint button pressed - shows the guess history at the moment  
        $('.hint').on('click', function(event){
           event.preventDefault();
            $(this).toggleClass('reveal');
            $('.historyContainer').toggle();
            //play a confirm sound
            confirmAudio.play();
        });


    });

    //Generates an integer between min and max, inclusive
    var generateRandomNumber = function(min, max){
        return Math.floor(Math.random()*(max-min+1))+min;
    }

    var generateGame = function(min, max, limit){

        return {
            target: generateRandomNumber(min, max),
            guessLimit: limit,
            userGuesses: []
        }
    }

    //this function modifies the game state and also updates the DOM, providing clues to the user
    var handleSubmission = function(game) {

        var feedbackStr = '';
        var feedbackAudio = confirmAudio;

        if(game.guessLimit > 0){

            game.guessLimit--;
            var userGuess = +$('.guessInput').val(); 

            if(userGuess === game.target){
                feedbackStr = 'You got it!'
                feedbackAudio = successAudio;
            }

            else if(game.userGuesses.includes(userGuess)){
                feedbackStr = 'You\'ve already tried ' + userGuess + '!';
            }

            else if(userGuess > game.target)
                feedbackStr = 'Nope!  You\'re too <span id="high">HIGH!</span>  You have ' + game.guessLimit + ' guesses left.';
            else
                feedbackStr = 'Nope!  You\'re too <span id="low">low!</span>  You have ' + game.guessLimit + ' guesses left.';

            game.userGuesses.push(userGuess);
        }

        else {
           feedbackStr = 'Sorry!  You\'re out of guesses!  Hit restart to try again!'; 
        }

        //update history container
        $('.historyContainer').text('');
        $('.historyContainer').append('<img src = "./fullstack-guessing-game/ColorScale_50percent.jpg"><br>Previous attempts: ');
        $('.historyContainer').append(getHintString(game));

        //update clue container
        $('.clueContainer').text('');
        $('.clueContainer').append(feedbackStr);

        //'bounce' effect so user knows they submitted something
        $('.clueContainer').animate({marginTop:'-=3px'}, 100).animate({marginTop:'+=3px'}, 100);

        //play a confirm sound
        feedbackAudio.play();

    }

    //Generates some fancy HTML to show hints via the guess history
    //The text color of each guess is generated according to how far away it is
    var getHintString = function(game){

        var hintString = '';
        for (var i=0; i<game.userGuesses.length; i++){
            var guessColor = generateColor(game.userGuesses[i], game.target);
            hintString += '<span style=\"color: ' + guessColor + '\">';
            hintString += game.userGuesses[i] + " ";
            hintString += '</span>';
        }

        return hintString;

    }

    //generates a color on the 'heat scale'
    var generateColor = function(guess, target){

        var difference = Math.abs(guess-target);
        var r, g, b;

        if(difference < 10){
            r = 200;
            b = 0;
            //green varied
            g = difference/10.0 * 200;
        } else if (difference < 20) {
            g = 200;
            b = 0;
            //red varied
            r = (difference-10)/10.0 * 200;
        } else if(difference < 30){
            g = 200;
            r = 0;
            //blue varied
            b = (difference-20)/10.0 * 200;
        } else {
            b = 200;
            r = 0;
            //green varied
            g = (difference-30)/10.0 * 200;
        }

        return 'rgb(' + r + ',' + g + ',' + b + ')';
    };

})()