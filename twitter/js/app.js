 alert('linked');

//VARIABLES
var newTweet = document.getElementById('nt-input');
var tweeting = document.getElementById('nt-submit');
var charCounting = document.getElementById('charCounter');
var tweetTime = document.getElementById('tweet-date');
var tweetText = document.getElementById('ttext');
var tweeter = document.getElementById('author');
var tweeterAccount = document.getElementById('aaccount');
var andCounting=0;

//FUNCIONES

function gettingText(){


}

function  validatingTweet(){

	
}

function  settingTime(){
    var time = new Date();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var meridian = '';
    if (minutes < 10) {
        minutes = (String(0) + String(minutes));
    }
    if (hours >= 13) {
        hours = hours - 12;
        meridian = 'PM';
    } else {
        meridian = 'AM';
    }
    return hours + ':' + minutes + ' ' + meridian;
	
}

function creatingNewElement(){

tweeter tweeterAccount tweetText tweetTime
	
}

function publishing(){


}

//EVENTOS

   