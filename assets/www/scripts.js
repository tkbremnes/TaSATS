var canvas;
var ctx;
var gradient;
var dy;
var dyfloat;
var noOfBubbles = 50;
var bubbles = new Array(noOfBubbles);
var timer;
var timerTimer;
var kcal;
var dist;
var forbrenning;
var distanse;

var seconds;
var minutes;

var height;
var width;

var foamHeight;

var emptyFlag;

var countDownClock;

var timerRefreshId;
var refreshIntervalId;

function hw(){
	alert("hello world");
}

function clear(){
	ctx.clearRect(0,0,width,height);
}

function init(){
	canvas = document.querySelector('canvas');
	height = $(window).height();
	width = $(window).width();
	canvas.height = height;
	canvas.width = width;
	$('#container').height(height);
	ctx = canvas.getContext('2d');
	ctx.fillStyle = '#000000';
	ctx.fillRect(0,0,width,height);
	
	kcal = 0;
	forbrenning = $('#kcal');
	dist = 0;
	distanse = $('#km');
	
	// Countdown timer
	timer = $('#timerSeconds');
	countDownClock = 3;
	startCountDown();
}

function initBeer(){
	
	foamHeight = Math.round(height/10);
	gradient = ctx.createLinearGradient(0, 0, 0, height-foamHeight);
	gradient.addColorStop(0, '#111106');
	gradient.addColorStop(1, '#000');
	
	dy=0;
	dyfloat = 0;
	
	timerTimer = 0;
	seconds = 0;
	minutes = 0;
	
	initRetroBubbles();
	
	distanse.css('color', 'white');
	forbrenning.css('color', 'white');
	
	refreshIntervalId = setInterval(draw, 40);
	startTimer(100);
	
	emptyFlag = true;
	
	
	// Initiate the emptying of the glass
	$('#container').click(function(){
//		$('#container').unbind();
//		emptyFlag = true;
//		$('#container').click(function(){
//			init();
//		});
		pause();
	});
}

function draw(){
	clear();
	//ØL
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 30+dy, width, height);
	
	//SKUM
	ctx.fillStyle = '#DDDDBA';
	ctx.fillRect(0, dy, width, foamHeight);
	
	//BUBBLES!
	
	for(var i=0; i<noOfBubbles; i++){
		if(i==0 || bubbles[i][2]){
			animateRetroBubble(i);
		}
		else if(Math.round(Math.random()*1000) == 3){
			bubbles[i][2] = true;
		}
	}
	
	
	if(emptyFlag){
		dyfloat += 0.1;
		dy = Math.round(dyfloat);
		// Checks if the beverage is empty
		if(dy>=height){
			clearInterval(refreshIntervalId);
			document.location.href = "resultater.html";
		}
	}	
}


function initRetroBubbles(){
	//TODO:
	prepopulateBubbles();
	
	var seed;
	for(var i=0; i<noOfBubbles; i++){
		bubbles[i] = new Array();
		var newSeed = Math.random()*width;
		if(seed != newSeed){
			seed = newSeed;
		}
		bubbles[i][0] = seed;
		bubbles[i][1] = 0;
		bubbles[i][2] = false;
	}
}

function prepopulateBubbles(){
	// NOT IMPLEMENTED
}

function animateRetroBubble(i){
	ctx.fillStyle = '#F0F0D8';
	ctx.fillRect(bubbles[i][0], height-bubbles[i][1], 8, 8);
	
	if(bubbles[i][1]>height-foamHeight-dy){
		bubbles[i][0]=Math.random()*width;
		bubbles[i][1]=0;
		bubbles[i][2]=false;
	}
	else{
		bubbles[i][1]+=1;	
	}
	ctx.save();
}

function updateTimer(){
	var sec = parseInt(timer.text());
	timer.text(sec+1);
}

function emptyGlass(){
	emptyFlag = true;
}

function reset()
{
	init();
}



function startTimer(ms){
	kcal += 0.2;
	dist += 0.5;
	
	if(timerTimer==10){
		timerTimer=0;
		seconds++;
	}
	if(seconds==60){
		seconds=0;
		minutes++;
	}
	forbrenning.text(Math.round(kcal) + ' kcal');
	distanse.text('0,' + Math.round(dist) + ' km');
	
	timer.text(addZero(minutes) + ':' + addZero(seconds) + ':' + timerTimer);
	timerTimer+=1;
	timerRefreshId = setTimeout('startTimer('+ms+')', ms);
}
function addZero(num)
{
	(String(num).length < 2) ? num = String("0" + num) :  num = String(num);
	return num;		
}


function startCountDown(){
	if(countDownClock==0){
		timer.text('GO!');
		setTimeout('initBeer()',1000);
	}
	else{
		timer.text(countDownClock);
		countDownClock--;
		setTimeout('startCountDown()', 1000);
		
	}
}

function pause(){
	clearInterval(timerRefreshId);
	clearInterval(refreshIntervalId);
	
	ctx.globalAlpha = 0.8;
	ctx.fillStyle = '#F0F0F0';
	ctx.fillRect(0,0,width,height);
	
	drawPauseSign();
	
	$('#pauseDialog').css('visibility', 'visible');
	
	$('#container').unbind();
}

function drawPauseSign(){
	var distanceFromTop = 55;
	ctx.globalAlpha = 1.0;
	ctx.fillStyle = '#FFFFFF';
	ctx.strokestyle = '#000000';
	ctx.lineWidth = 4;
	ctx.fillRect((width/2)-25, distanceFromTop, 20, 130);
	ctx.fillRect((width/2)+15, distanceFromTop, 20, 130);
	ctx.strokeRect((width/2)-25, distanceFromTop, 20, 130);
	ctx.strokeRect((width/2)+15, distanceFromTop, 20, 130);
}