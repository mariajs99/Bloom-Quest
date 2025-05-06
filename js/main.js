//! Elementos del DOM

//*Pantallas
const startScreenNode = document.querySelector("#start-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#gameover-screen");

//*Botones

const startButtonNode = document.querySelector("#start-button");
const restartButtonNode = document.querySelector("#restart-button");

//*Game-box

const gameBoxNode = document.querySelector("#game-box");

//*Score

const scoreNode = document.querySelector("#score");
const finalScoreNode = document.querySelector("#total-score");

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

  recolectorObj = new Recolector(gameBoxNode); //3. Añadimos el recolector al juego

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

      //TODO console.log("Colisionando");

      bicho.desapareceBicho();
      bichosArr.splice(i, 1);

      //Contador de vidas restantes
      vidas--;
      
      console.log("Vidas restantes:", vidas);

      if (vidas <= 0) {
        gameOver();
      }
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

//!Event Listeners

startButtonNode.addEventListener("click", () => {
  startGame();
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
