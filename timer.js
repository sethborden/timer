var timerInterval;
var alertInterval;
var timeText = document.querySelector('.time');
var fillText = document.querySelector('.fill-block');
var alarmDone = new Audio('missile.mp3.mp3');

function prettyTime(time) {
  var hours = ~~(time / 60 / 60);
  var minutes = ~~(time / 60) - hours * 60;
  var seconds = time % 60;
  var pHur = hours == 0 ? "" : hour + ":";
  var pMin = String(minutes).length == 2 ? minutes : '0' + minutes;
  var pSec = String(seconds).length == 2 ? seconds : '0' + seconds;
  return pHur + pMin + ":" + pSec;
}

function stopTimer() {
  clearInterval(timerInterval);
  document.querySelector('.mask').style.opacity = 0;
  document.querySelector('.static-inset').style.opacity = 0;
  alarmDone.play();
  alertInterval = setInterval(function() {
      var currentBackground = fillText.style.background;
      if (currentBackground == 'rgb(255, 255, 255)') {
        fillText.style.background = 'red';
      } else {
        fillText.style.background = '#fff';
      }
  }, 500);
}

function startTimer(newTime) {
    timerRunning = true;
    clearInterval(timerInterval);
    var a = document.querySelectorAll('.anim-duration');
    var timeText = document.querySelector('.time');
    document.querySelector('.static-inset').style.opacity = 1;
    for (var i = 0, l = a.length; i < l; i++) {
        var newone = a[i].cloneNode(true);
        newone.style.webkitAnimationDuration = newTime + 's';
        newone.style.webkitAnimationPlayState = 'running';
        a[i].parentNode.replaceChild(newone, a[i]);
    }

    //take care of the time string
    timeText.innerText = prettyTime(newTime);
    newTime = newTime - 1;
    timerInterval = setInterval(function(){
        if (newTime < 1) stopTimer();
        timeText.innerText = prettyTime(newTime);
        newTime = newTime - 1;
    }, 1000);
}

//Event Listeners
timeText.addEventListener('dblclick', function(e) {
    var newTimeEntry = prompt("Enter new time in seconds.");
    startTimer(newTimeEntry);
});

timeText.addEventListener('click', function() {
    if (!alarmDone.paused) {
        alarmDone.pause();
        clearInterval(alertInterval);
        fillText.style.background = "#fff";
    } else {
        //
    }
});

//Some crap to make doubletaps work on a touch screen

console.log(window.location.hash.substr(1));
var initTime = parseInt(window.location.hash.substr(1));
if (initTime > 0) {
    startTimer(initTime);
} else {
    startTimer(1200);
}

