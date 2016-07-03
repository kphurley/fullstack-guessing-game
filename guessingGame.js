//guessingGame.js

$(document).ready(function() {
   
    //Generate a number - change the parameters for different ranges
    var target = generateRandomNumber(1, 100);
    var guessLimit = 8;
    
    //handle submit button clicked
    $('#submit').on('click', function(event){
        event.preventDefault();
        guessLimit = handleSubmission(guessLimit, target);
    });
    
    //Prevent 'submit' default action
    $('.guessingGameForm').submit(function(event) {
       event.preventDefault();
    });
    
    //handle enter button pressed
    $(document).on('keyup', function(event){
        
        if(event.which == 13){
            event.preventDefault();
            guessLimit = handleSubmission(guessLimit, target);
        }
           
    });
    
    //handle restart button pressed
    $('#restartGame').on('click', function(){
        location.reload();
    });
    
    //handle hint button pressed
    $('#hint').on('click', function(event){
       event.preventDefault();
        
    });
    
});

//Generates an integer between min and max, inclusive
var generateRandomNumber = function(min, max){
    return Math.floor(Math.random()*(max-min+1))+min;
}

var handleSubmission = function(guessLimit, target) {
    
    var newLimit = guessLimit;
    
    if(guessLimit > 0){
        
        newLimit--;
        var userGuess = +$('.guessInput').val(); 
        var feedbackStr = '';
        
        if(userGuess === target){
            feedbackStr = 'You got it!'
        }
        else if(userGuess > target)
            feedbackStr = 'Nope!  You\'re too <span id="high">HIGH!</span>  You have ' + newLimit + ' guesses left.';
        else
            feedbackStr = 'Nope!  You\'re too <span id="low">low!</span>  You have ' + newLimit + ' guesses left.';
    }
    
    else {
       feedbackStr = 'Sorry!  You\'re out of guesses!  Hit restart to try again!'; 
    }
    
    $('.clueContainer').text('');
    $('.clueContainer').append(feedbackStr);
    $('.clueContainer').animate({marginTop:'-=3px'}, 100).animate({marginTop:'+=3px'}, 100);
    
    return newLimit;
    
}

