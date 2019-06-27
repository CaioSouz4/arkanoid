var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var velocidadeJogador = 15;

var ballRadius = 8;
var xBola =  canvas.width/2;
var yBola = canvas.height-30;

var dx = 2;
var dy = -2;


// --------- player setup------//
var playerHeight = 15;
var playerWidht = 75;
var posX = (canvas.width-playerWidht)/2;



//------tijolo setup----//
var brickRowCount = 6;
var brickColumnCount = 4;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 1;
var brickOffsetTop = 30;
var brickOffsetLeft = 10;


var score = 0;
var lives = 3;

// ------------ construindo tijolos ------------//
var bricks = [];
var bricksCinza = [];
var second = [];

for(var i=0; i < 1; i++) {
    second[i] = [];
    for(var j=0; j<brickRowCount; j++) {
        second[i][j] = { x: 0, y: 0, status: 1 };
    }
}


for(var i=0; i < 1; i++) {
    bricksCinza[i] = [];
    for(var j=0; j<brickRowCount; j++) {
        bricksCinza[i][j] = { x: 0, y: 0, status: 1 };
    }
}

for(var i=0; i < brickColumnCount; i++) {
    bricks[i] = [];
    for(var j=0; j<brickRowCount; j++) {
        bricks[i][j] = { x: 0, y: 0, status: 1 };
    }
}

//--------------- evento pressionar teclas  ----------//
document.addEventListener("keydown", joystick);

function joystick(e) {
    if(e.keyCode == 65) {
        if(posX > 0){
			posX -= velocidadeJogador;
		}
    }
                
    if(e.keyCode == 68){
		if(posX < (canvas.width - playerWidht)){
			posX += velocidadeJogador;
		}
    }	
}

//----------------------------- colisão bola/tijolo --------------------------------//
function collisionDetection() {
    
    for(var i=1; i<brickColumnCount; i++) {
        for(var j=0; j<brickRowCount; j++) {
            var b = bricks[i][j];
            if(b.status == 1) {
                if(xBola > b.x && xBola < b.x+brickWidth && yBola > b.y && yBola < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    //score++;
                    /* if(score == brickRowCount*brickColumnCount) {
                        alert("Voce venceu");
                        document.location.reload();
                    } */
                }
            }
        }
    }

    for(var i=0; i<1; i++) {
        for(var j=0; j<brickRowCount; j++) {
            var b = bricksCinza[i][j];            
            if(b.status == 1) {
                if(xBola > b.x && xBola < b.x+brickWidth && yBola > b.y && yBola < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    /* score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("Voce venceu");
                        document.location.reload();
                    } */
                }
            }
        }
    }
    
}
function renderBola() {
    ctx.beginPath();
    ctx.arc(xBola, yBola, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}
function renderPlayer() {
    ctx.beginPath();
    ctx.rect(posX, canvas.height-playerHeight, playerWidht, playerHeight);
    ctx.fillStyle = "purple";
    ctx.fill();
    ctx.closePath();
}

//---------------- desenha a matriz de tijolos ------------------------//
function renderTijolos() {
    for(var i=1; i<(brickColumnCount); i++) {
        for(var j=0; j<brickRowCount; j++) {
            if(bricks[i][j].status == 1) {

                // ---------ajustando posições dos tijolos--------------------//
                var brickX = (j*(brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (i*(brickHeight + brickPadding)) + brickOffsetTop;

                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;
                              
                ctx.beginPath();               
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
    for(var i=0; i<1; i++) {
        for(var j=0; j<brickRowCount; j++) {
            if(bricksCinza[i][j].status == 1) {
                
                var brickX = (j*(brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (i*(brickHeight + brickPadding)) + brickOffsetTop;

                bricksCinza[i][j].x = brickX;
                bricksCinza[i][j].y = brickY;
                              
                ctx.beginPath();               
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#777f8c";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
    
}
/* function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);   
} */
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Vidas: "+lives, canvas.width-65, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderTijolos();
    renderBola();
    renderPlayer();
    //drawScore();
    drawLives();
    collisionDetection();

    //-------------------tratando colisão com paredes e com player -------------------------//
    if(xBola + dx > canvas.width-ballRadius || xBola + dx < ballRadius) {
        dx = -dx;
    }
    if(yBola + dy < ballRadius) {
        dy = -dy;
    }
    else if(yBola + dy > canvas.height-ballRadius) {
        if(xBola > posX && xBola < posX + playerWidht) {
            dy = -dy;
        }
        else {
            lives--;
            if(lives == 0) {
                alert("Voce perdeu");
                document.location.reload();
            }
            else {
                xBola = canvas.width/2;
                yBola = canvas.height-30;
                dx = 3;
                dy = -3;
                posX = (canvas.width-playerWidht)/2;
            }
        }
    }
    
    xBola += dx;
    yBola += dy;
    requestAnimationFrame(draw);

}
draw();



