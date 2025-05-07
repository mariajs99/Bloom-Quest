//! Elementos del DOM

//*Pantallas
const startScreenNode = document.querySelector("#start-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#gameover-screen");

//*Botones

const startButtonNode = document.querySelector("#start-button");

const restartButtonNode = document.querySelector("#restart-button");
const startScreenButtonNode = document.querySelector("#start-screen-button");

//*Game-box

const gameBoxNode = document.querySelector("#game-box");

//*Score

const scoreNode = document.querySelector("#score");
const finalScoreNode = document.querySelector("#total-score");

//*Vidas

const imgVida1Node = document.querySelector("#vida1");
const imgVida2Node = document.querySelector("#vida2");
const imgVida3Node = document.querySelector("#vida3");

//!Variables globales del juego

let recolectorObj = null; // Esto es para poder agregar el obj del recolector aqui, pero que en todo mi código yo pueda acceder a esta variable facilmente.

// let tuberiaObj = null;
let bichosArr = [];

let ingredientesArr = [];

let vidas = 3;

let score = 0;

let gameIntervalId = null;

gameBoxNode.innerHTML = "";

//!Funciones globales del juego

//*FUNCIÓN PRINCIPAL DEL JUEGO

function startGame() {
  startScreenNode.style.display = "none"; // Ocultar la pantalla inicial

  gameScreenNode.style.display = "flex"; //  Mostrar la pantalla de juego

  // Añadimos el recolector al juego, y en el caso de reiniciar juego,
  // que no se quede el recolector del anterior intento
  if (!recolectorObj) {
    recolectorObj = new Recolector(gameBoxNode);
  }

  // Bucle principal del juego - gameLoop() (60fps)

  gameIntervalId = setInterval(() => {
    // GameIntervalId contiene toda la lógica del juego, que es todo lo que hay en gameLoop()
    console.log("Game loop funcionando");

    gameLoop();
  }, Math.round(1000 / 60)); //El juego va a 60 fps
}

function gameLoop() {
  // Crear bichos aleatorios
  if (Math.random() < 0.007) {
    const nuevoBicho = new Bichos(gameBoxNode);
    bichosArr.push(nuevoBicho);
  }

  // Mover bichos y gestionar colisiones
  bichosArr.forEach((bicho, i) => {
    //Los mueve
    bicho.movimientoBichos();

    if (bicho.bichoEstaFuera()) {
      //Los elimina si salen
      bicho.desapareceBicho();
      bichosArr.splice(i, 1);
    }
    //Colisión con el personaje
    if (colision(recolectorObj, bicho)) {
      //Detecta colisiones
      bicho.desapareceBicho();
      bichosArr.splice(i, 1);

      //Contador de vidas restantes
      perderVida();
      console.log("Vidas restantes:", vidas);
    }
  });

  // Crear ingredientes aleatoriamente
  if (Math.random() < 0.015) {
    const nuevoIngrediente = new Ingredientes(gameBoxNode);
    ingredientesArr.push(nuevoIngrediente);
  }

  //Gestionar las colisiones con los ingredientes
  ingredientesArr.forEach((ingrediente, i) => {
    if (colision(recolectorObj, ingrediente)) {
      //TODO console.log("¡Colisión con ingrediente!");
      ingrediente.desapareceIngrediente();
      ingredientesArr.splice(i, 1);

      // Aquí puedo colocar lo de sumar puntos
      score += 10;
      scoreNode.textContent = score;
    }
  });
}

//Detecta si los elementos colisionan, basándose en sus posiciones y tamaños.
function colision(recolectorObj, elementosQueColisionan) {
  //Funciona tanto para la colisión con los bichos y con los ingredientes (y con el bonus)
  return (
    recolectorObj.x < elementosQueColisionan.x + elementosQueColisionan.w &&
    recolectorObj.x + recolectorObj.w > elementosQueColisionan.x &&
    recolectorObj.y < elementosQueColisionan.y + elementosQueColisionan.h &&
    recolectorObj.y + recolectorObj.h > elementosQueColisionan.y
  );
}

function gameOver() {
  clearInterval(gameIntervalId);

  gameScreenNode.style.display = "none";
  gameOverScreenNode.style.display = "flex";

  finalScoreNode.textContent = score;
}

function perderVida() {
  if (vidas <= 0) return;

  vidas--;

  if (vidas === 2) {
    imgVida3Node.style.visibility = "hidden";
  } else if (vidas === 1) {
    imgVida2Node.style.visibility = "hidden";
    imgVida3Node.style.visibility = "hidden";
  } else if (vidas === 0) {
    gameOver();
  }
}

function limpiarJuego() {
  //Mostrar de nuevo el sistema de vidas
  vidas = 3;
  imgVida1Node.style.visibility = "visible";
  imgVida2Node.style.visibility = "visible";
  imgVida3Node.style.visibility = "visible";

  //Mostrar de nuevo el score a 0
  score = 0;
  scoreNode.innerText = score;

  //Vaciar bichos e ingredientes del array y del DOM

  bichosArr.forEach((bicho) => bicho.desapareceBicho());
  bichosArr = [];

  ingredientesArr.forEach((ingrediente) => ingrediente.desapareceIngrediente());
  ingredientesArr = [];
}

function reiniciarJuego() {
  //Restaurar todos los valores del juego
  limpiarJuego();

  //Empezar el bucle del juego de nuevo
  startGame();
}

//!Event Listeners

startButtonNode.addEventListener("click", () => {
  startGame();
});

restartButtonNode.addEventListener("click", () => {
  gameOverScreenNode.style.display = "none";
  gameBoxNode.style.display = "flex";

  reiniciarJuego();
});

startScreenButtonNode.addEventListener("click", () => {
  gameOverScreenNode.style.display = "none";
  startScreenNode.style.display = "flex";

  limpiarJuego();
});

document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  if (["w", "a", "s", "d"].includes(key) && recolectorObj) {
    recolectorObj.moverRecolector(key);
  }
});

//! PLANIFICACIÓN JS
/*
- ////Fondo
- ////Personaje (x, y, h, w, speed, nodo)
- ////Bichos (x, y, h, w, speed, nodo)
- ////Ingredientes (x, y, h, w, speed, nodo)
- Bonus (x, y, h, w, speed, nodo)

- ////Colisión entre personaje y bichos
- ////Colisión entre personaje e ingredientes
- Colisión entre personaje y bonus

- ////Movimiento del personaje
- ////Bichos que aparecen(spawn)
- ////Bichos que desaparecen(despawn)

- ////Ingredientes que aparecen(spawn)
- ////Ingredientes que desaparecen(despawn)

- Fruta bonus que aparecen(spawn)
- Fruta bonus que desaparecen(despawn)

- ////Game-over
- Reiniciar
- ////Score 


Bonus:

- Hacer que el personaje se vuelva inmune al coger la fruta Bonus
- Hacer que el personaje corra más rápido al coger la fruta Bonus



*/
