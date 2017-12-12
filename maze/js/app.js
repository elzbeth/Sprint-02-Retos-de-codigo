// var canvas = null,
//     ctx = null,
//     lastPress = null,
//     dir = 0,
//     player= null;
//     pause = true;

// var KEY_ENTER = 13,
//     KEY_LEFT = 37,
//     KEY_UP = 38,
//     KEY_RIGHT = 39,
//     KEY_DOWN = 40;


// //Previene problemas de compatibiidad de animacion entre navegadores.
// window.requestAnimationFrame = (function () {
//     return window.requestAnimationFrame ||
//         window.mozRequestAnimationFrame ||
//         window.webkitRequestAnimationFrame ||
//         function (callback) {
//             window.setTimeout(callback, 17);
//         };
// }());

// document.addEventListener('keydown', function (evt) {
//     lastPress = evt.which;
// }, false);

// //Pintar el y en el canvas
// function paint(ctx) {
// 	//Limpia el canvas
//     ctx.fillStyle = '#000';	//Indica el color de relleno.
//     ctx.fillRect(0, 0, canvas.width, canvas.height); //Las coordenadadas desde las que se rellena.

//     //Dibiuja el juagador
//     var player= function(ctx){
//     ctx.fillStyle = '#0f0';	//Indica el color de relleno.
//     ctx.fillRect(0, 0, 10, 10)}; 

// 	// Debug de la ultima tecla presionada
//     ctx.fillStyle = '#fff'

//     //Pausa el dibujo
//     if (pause) {
//         ctx.textAlign = 'center';
//         ctx.fillText('PAUSE', 150, 75);
//         ctx.textAlign = 'left'
//     }
// };



// //Acciones de juego	**Aunque las acciones se pueden poner en la funcion paint, se recomienda hacerlo separado para prevenir errores.
// function act() {

//     if (!pause) {
//         // Cambiar dirección
//         if (lastPress == KEY_UP) {
//             dir = 0;
//         }
//         if (lastPress == KEY_RIGHT) {
//             dir = 1;
//         }
//         if (lastPress == KEY_DOWN) {
//             dir = 2;
//         }
//         if (lastPress == KEY_LEFT) {
//             dir = 3;
//         }

//         // Movimiento
//         if (dir == 0) {
//             player.y -= 10;
//         }
//         if (dir == 1) {
//             player.x += 10;
//         }
//         if (dir == 2) {
//             player.y += 10;
//         }
//         if (dir == 3) {
//             player.x -= 10;
//         }

//         // Evita salir de la escena
//         if (player.x > canvas.width) {
//             player.x = 0;
//         }
//         if (player.y > canvas.height) {
//             player.y = 0;
//         }
//         if (player.x < 0) {
//             player.x = canvas.width;
//         }
//         if (player.y < 0) {
//             player.y = canvas.height;
//         }
//     }
    
//     // Pausar/Quitar pausa
//     if (lastPress == KEY_ENTER) {
//         pause = !pause;
//         lastPress = null;
//     }
// }



// //Animar el canvas
// function run() {
//     window.requestAnimationFrame(run);	//Pide al navegador para el siguiente momento en cuanto pueda realizar un cuadro de animacion
//     act();
//     paint(ctx);
// }

// //Inicia el canvas

// function init() {
//     canvas = document.getElementById('canvas');	//Obtiene el lienzo (canvas)
//     ctx = canvas.getContext('2d');	//Es necesario el contexto para indicar el tipo de herramienta. Seria el pincel.
//     run(); 
// }

// window.addEventListener('load', init, false);	//Para que en cuanto termine de cargar la página, comience a ejecutar “init”.




//     function init() {

//       var canvas = document.getElementById("canvas");
//       var ctx = canvas.getContext("2d");

//       draw(ctx);
//     }

//     function draw(ctx) {

//       // capa1/Imagen
//       ctx.save();
//       ctx.drawImage(document.getElementById("image1"), 0.0, 0.0);
//       ctx.restore();
//     }


// init();
// draw();

var canvas = document.getElementById("mazecanvas");
var context = canvas.getContext("2d");
var currRectX = 425;
var currRectY = 3;
var mazeWidth = 556;
var mazeHeight = 556;
var intervalVar;

function drawMazeAndRectangle(rectX, rectY) {
    makeWhite(0, 0, canvas.width, canvas.height);
    var mazeImg = new Image();
    mazeImg.onload = function () { // when the image is loaded, draw the image, the rectangle and the circle
        context.drawImage(mazeImg, 0, 0);
        drawRectangle(rectX, rectY, "#0000FF", false, true);
        context.beginPath();
        context.arc(542, 122, 7, 0, 2 * Math.PI, false);
        context.closePath();
        context.fillStyle = '#00FF00';
        context.fill();
    };
    mazeImg.src = "assets/images/maze.gif";
}

function drawRectangle(x, y, style) {
    makeWhite(currRectX, currRectY, 15, 15);
    currRectX = x;
    currRectY = y;
    context.beginPath();
    context.rect(x, y, 15, 15);
    context.closePath();
    context.fillStyle = style;
    context.fill();
}

drawMazeAndRectangle(425, 3); // { 425, 3 } is the position of the blue rectangle on the canvas

function makeWhite(x, y, w, h) {
    context.beginPath();
    context.rect(x, y, w, h);
    context.closePath();
    context.fillStyle = "white";
    context.fill();
}

function moveRect(e) {
    var newX;
    var newY;
    var canMove;
    e = e || window.event;
    switch (e.keyCode) {
        case 38:   // arrow up key
        case 87: // W key
            newX = currRectX;
            newY = currRectY - 3;
            break;
        case 37: // arrow left key
        case 65: // A key
            newX = currRectX - 3;
            newY = currRectY;
            break;
        case 40: // arrow down key
        case 83: // S key
            newX = currRectX;
            newY = currRectY + 3;
            break;
        case 39: // arrow right key
        case 68: // D key
            newX = currRectX + 3;
            newY = currRectY;
            break;
        default: return;
    }
    movingAllowed = canMoveTo(newX, newY);
    if (movingAllowed === 1) {      // 1 means 'the rectangle can move'
        drawRectangle(newX, newY, "#0000FF");
        currRectX = newX;
        currRectY = newY;
    }
    else if (movingAllowed === 2) { // 2 means 'the rectangle reached the end point'
        clearInterval(intervalVar); // we'll set the timer later in this article
        makeWhite(0, 0, canvas.width, canvas.height);
        context.font = "40px Arial";
        context.fillStyle = "blue";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText("Congratulations!", canvas.width / 2, canvas.height / 2);
        window.removeEventListener("keydown", moveRect, true);
    }
}

drawMazeAndRectangle();
drawRectangle();
moveRect();