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




//!Variables globales del juego

let recolectorObj = null; // Esto es para poder agregar el obj del recolector aqui, pero que en todo mi código yo pueda acceder a esta variable facilmente.




//!Funciones globales del juego

function startGame() {
  startScreenNode.style.display = "none"; //1. Ocultar la pantalla inicial

  gameScreenNode.style.display = "flex"; //2. Mostrar la pantalla de juego

  recolectorObj = new Recolector(gameBoxNode); //3. Añadimos los elementos iniciales del juego

  console.log(recolectorObj);

  setInterval(() => {
    //4. Iniciamos el intervalo principal del juego
    //gameLoop()

    // Aquí irá tu lógica del juego
    console.log("Game loop funcionando");
  }, Math.round(1000/60)); //El juego va a 60 fps

  //5. Iniciamos otros intervalos del juego
}

//!Event Listeners

startButtonNode.addEventListener("click", () => {
  startGame();
});

gameBoxNode.addEventListener("click", () => {
  recolectorObj;
});

document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  if (["w", "a", "s", "d"].includes(key) && recolectorObj) {
    recolectorObj.mover(key);
  }
});

//! PLANIFICACIÓN JS
/*
- ////Fondo
- ////Personaje (x, y, h, w, speed, nodo)
- Bichos (x, y, h, w, speed, nodo)
- Ingredientes (x, y, h, w, speed, nodo)
- Bonus (x, y, h, w, speed, nodo)

- Colisión entre personaje y bichos
- Colisión entre personaje e ingredientes
- Colisión entre personaje y bonus

- Automatic movement()
- Bichos que aparecen(spawn)
- Bichos que desaparecen(despawn)

- Ingredientes que aparecen(spawn)
- Ingredientes que desaparecen(despawn)

- Fruta bonus que aparecen(spawn)
- Fruta bonus que desaparecen(despawn)

- Game-over
- Reiniciar
- Score


Bonus:

- Hacer que el personaje se vuelva inmune al coger la fruta Bonus
- Hacer que el personaje corra más rápido al coger la fruta Bonus



*/
