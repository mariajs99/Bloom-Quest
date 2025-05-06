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

let bichosArr = [];

let vidas = 3;


//!Funciones globales del juego

function startGame() {
  startScreenNode.style.display = "none"; // Ocultar la pantalla inicial
  gameScreenNode.style.display = "flex"; //  Mostrar la pantalla de juego

  recolectorObj = new Recolector(gameBoxNode); //3. Añadimos el recolector al juego

  console.log(recolectorObj);

  setInterval(() => {
    //4. Iniciamos el intervalo principal del juego
    //gameLoop()


    // Aquí irá tu lógica del juego
    console.log("Game loop funcionando");
  }, Math.round(1000 / 60)); //El juego va a 60 fps

  //5. Iniciamos otros intervalos del juego
  gestionarBichos(); //crear bichos en el juego
}

function gestionarBichos() {
  setInterval(() => {
    // Crear nuevos bichos cada cierto tiempo
    if (Math.random() < 0.01) {
      // probabilidad de aparición, de forma aleatoria
      const nuevoBicho = new Bichos(gameBoxNode);
      bichosArr.push(nuevoBicho);
    }

   
    bichosArr.forEach((bicho, i) => { //Los mueve
      bicho.movimientoBichos();

      if (bicho.bichoEstaFuera()) { //Los elimina si salen
        bicho.desapareceBicho();
        bichosArr.splice(i, 1);
      }
      //Colisión con el personaje
      if (colision(recolectorObj, bicho)) {  //Detecta colisiones
        console.log("Colisionando");
        bicho.desapareceBicho();
        bichosArr.splice(i, 1);
        
        //Aqi meto lo de quitar vidas
        vidas--;
        console.log("Vidas restantes:", vidas);

        if (vidas <= 0) {
            gameOver();
          };
      };
    });
  }, 20);
};

//Detecta si dos elementos colisionan, basándose en sus posiciones y tamaños.
function colision(recolectorObj, bichosObj) {
    return (
        recolectorObj.x < bichosObj.x + bichosObj.w &&
        recolectorObj.x + recolectorObj.w > bichosObj.x &&
        recolectorObj.y < bichosObj.y + bichosObj.h &&
        recolectorObj.y + recolectorObj.h > bichosObj.y
      );
};

function gameOver() {
    gameScreenNode.style.display = "none";
    gameOverScreenNode.style.display = "flex";
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
