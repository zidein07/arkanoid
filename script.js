var canvas,ctx,w,h,game=true;
var ball,plat,blocks,rowHeight,row,col;
var score = 0;
var time = true;
var par = false;
BALL = function(x,y){
	this.x = x;
	this.y = y;
	this.radius = 20;
	this.color = "red";
	this.sx = 3;
	this.sy = -4;
	this.srcImg = new Image();
	this.srcImg.src = 'ball.png';
}

PLAT = function (x,y) {
	this.x = x;
	this.y = y;
	this.w = w/12;
	this.sW = w/12;
	this.h = 10;
	this.color = "black";
}

BLOCKS = function(w,h,cols,rows){
	this.w = w;
	this.h = h;
	this.cols = cols;
	this.rows = rows;
	this.padding = 2;
	this.obj;
	this.bounes;
}

PRIZ = function(x,y){
	this.w = 128;
	this.h = 128;
	this.img = new Image();
	this.img.src = 'bonus.png';
	this.sy = 4;
	this.x = x;
	this.y = y;
}

	
window.onload = init;

	document.addEventListener("mousemove",function(e){
		plat.x = e.offsetX-plat.w/2;
	});

function init(){
	canvas = document.getElementById("canvas");
	ctx	   = canvas.getContext("2d");

	canvas.height = document.body.scrollHeight;
	canvas.width  = document.body.clientWidth;
	w      = canvas.width;
	h      = canvas.height;
	ball = new BALL(w/2,h/2);
	plat = new PLAT(w/2,h-20);
	plat.x -= plat.w/2;
	blocks = new BLOCKS((w/25)-2,h/20,25,6);
	priz = new PRIZ(row,col);
	blocks.obj = [];
	blocks.bounes = [];
	for(i=0;i<blocks.rows+1;i++){
		blocks.obj[i]=[];
		blocks.bounes[i] = [];
		for(j=0;j<blocks.cols+1;j++){
			blocks.obj[i][j] = 1;
			blocks.bounes[i][j] = 1;
		}
	}
	beginGame();
}


function beginGame(){
	if(game){
		ctx.clearRect(0,0,w,h);
		//<<<<<<<BAll
		ball.x +=ball.sx;
		ball.y +=ball.sy;
		if(ball.x+ball.radius<25 || ball.x+ball.radius>=w){
			ball.sx=-ball.sx;
		}
		if(ball.y+ball.radius < 20){
			ball.sy = -ball.sy;
		}
			if(ball.y+ball.radius+ball.sy>=h-plat.h-15 && ball.y+ball.radius+ball.sy<=h){
				if(ball.x+ball.radius+ball.sx>plat.x && ball.x+ball.radius+ball.sx<plat.w+plat.x){
					ball.sy = -ball.sy;
					
				}
				else{
					game = false;
				}
			}
	
			rowHeight = blocks.h + blocks.padding;
			var row = Math.floor(ball.y/(rowHeight));
			var col = Math.floor(ball.x/(blocks.w+blocks.padding));
			if(ball.y < blocks.rows * rowHeight && row > 0 && col > 0 && blocks.obj[row][col] == 1) {
				ball.sy = -ball.sy;
				blocks.obj[row][col] = 0;
				score++;
			}

		
		ctx.drawImage(ball.srcImg,ball.x,ball.y,ball.radius,ball.radius);
					// ctx.beginPath();
					// ctx.arc(ball.x,ball.y,ball.radius,0,2*Math.PI,true);
					// ctx.closePath();
					// ctx.fill();
		//ball>>>>>>>

		//<<<<<<<<<PLAT
		ctx.fillStyle = plat.color;
		ctx.beginPath();
		ctx.fillRect(plat.x,plat.y,plat.w,plat.h);
		ctx.closePath();
		ctx.fill();
		//plat>>>>>>>>>>>>

		//<<<<<<<<<<<<<BLOCKSS
		ctx.fillStyle = "rgba(255,0,0,.6)";
		ctx.strokeStyle = "black";
		for(var i = 0; i<blocks.rows;i++){
		for(var j = 0; j<blocks.cols;j++){
			if(blocks.obj[i][j]==1){
				ctx.beginPath();
				ctx.fillRect(j*(blocks.w+blocks.padding),i*(blocks.h+blocks.padding),blocks.w,blocks.h);
				ctx.strokeRect(j*(blocks.w+blocks.padding),i*(blocks.h+blocks.padding),blocks.w,blocks.h);
				ctx.closePath();
				}
			}
			if(par){
				ctx.drawImage(priz.img,priz.x,priz.y,priz.w,priz.h);
			}
		}
		ctx.fillStyle = "white";
		ctx.font = "60px Arial";
		ctx.beginPath();
		ctx.fillText("Score:"+score,20,h/2);
		ctx.fillText("By: Teplyakov",w-500,h-30);
		ctx.closePath();
		ctx.fill();

		//BLOCKs>>>>>>>>>>
		window.webkitRequestAnimationFrame(beginGame);
	}
	else{

	}
}