//! Elementos del DOM

//*Pantallas
const startScreenNode = document.querySelector("#start-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#gameover-screen");

//*Botones

const startButtonNode = document.querySelector("#start-button");

const restartButtonNode = document.querySelector("#restart-button");
const startScreenButtonNode = document.querySelector("#start-screen-button");

const musicButtonNode = document.querySelector("#musica-boton");

//*Game-box

const gameBoxNode = document.querySelector("#game-box");

//*Score

const scoreNode = document.querySelector("#score");
const finalScoreNode = document.querySelector("#total-score");

//*Niveles de dificultad

const levelNode = document.querySelector("#level");

//*Vidas

const imgVida1Node = document.querySelector("#vida1");
const imgVida2Node = document.querySelector("#vida2");
const imgVida3Node = document.querySelector("#vida3");

//*Música

const musicaFondoNode = new Audio("./audio/fire-emblem.mp3");
musicaFondoNode.loop = true; // La música se repite
musicaFondoNode.volume = 0.1; // Ajusta volumen si hace falta

const sonidoColisionBichos = new Audio("./audio/colisionBichos2.mp3");
const sonidoColisionBonus = new Audio("./audio/colisionBonus.mp3");
const sonidoColisionIngredientes = new Audio(
  "./audio/colisionIngredientes.mp3"
);
sonidoColisionIngredientes.volume = 0.07;
const sonidoBoton = new Audio("./audio/botonRestart.mp3");

//!Variables globales del juego

let recolectorObj = null;

let bichosArr = [];

let ingredientesArr = [];

let bonusArr = [];

let vidas = 3;

let score = 0;

let gameIntervalId = null;

let musicaActivada = true;

let esInmune = false;

// Velocidad base del recolector, corresponde con la definida en su clase
let velocidadOriginal = 5;

//Controlar el personaje de manera fluida
const presionarTeclas = {
  w: false,
  a: false,
  s: false,
  d: false,
};

//Definir niveles de dificultad
let nivel = 1;
let dificultadIntervalId = null;
let velocidadBichos = 2;
let velocidadRecolector = 4;

//!Funciones globales del juego

//*FUNCIÓN PRINCIPAL DEL JUEGO

function startGame() {
  startScreenNode.style.display = "none"; // Ocultar la pantalla inicial
  gameScreenNode.style.display = "block"; //  Mostrar la pantalla de juego

  // Añadimos el recolector al juego, y en el caso de reiniciar juego,
  // que no se quede el recolector del anterior intento
  if (!recolectorObj) {
    recolectorObj = new Recolector(gameBoxNode);
  }

  musicaFondoNode.play();

  // GameIntervalId contiene toda la lógica del juego
  gameIntervalId = setInterval(() => {
    gameLoop();
  }, Math.round(1000 / 60)); //El juego va a 60 fps

  //Aumenta dificultad cada minuto
  dificultadIntervalId = setInterval(() => {
    aumentarDificultad();
  }, 30000);

  //actualizarNivelVisual();
}

function gameLoop() {
  //Mover recolector

  if (recolectorObj) {
    for (const key in presionarTeclas) {
      if (presionarTeclas[key]) {
        recolectorObj.moverRecolector(key);
      }
    }
  }

  // Crear bichos aleatorios

  if (Math.random() < 0.013) {
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
      if (!esInmune) {
        sonidoColisionBichos.play();
      }
      bicho.desapareceBicho();
      bichosArr.splice(i, 1);

      //Condicional para hacer inmune al personaje al colisionar con los bichos por el bonus
      if (!esInmune) {
        perderVida();
      }
    }
  });

  // Crear ingredientes aleatorios
  if (Math.random() < 0.018) {
    const nuevoIngrediente = new Ingredientes(gameBoxNode);
    ingredientesArr.push(nuevoIngrediente);
  }

  //Gestionar las colisiones con los ingredientes
  ingredientesArr.forEach((ingrediente, i) => {
    if (colision(recolectorObj, ingrediente)) {
      sonidoColisionIngredientes.play();
      ingrediente.desapareceIngrediente();
      ingredientesArr.splice(i, 1);

      // Aquí puedo colocar lo de sumar puntos
      score += 10;
      scoreNode.textContent = score;
    }
  });

  //Crear frutas bonus aleatorias
  if (Math.random() < 0.001) {
    const nuevoBonus = new FrutaBonus(gameBoxNode);
    bonusArr.push(nuevoBonus);
  }

  //Gestionar las colisiones con las frutas bonus
  bonusArr.forEach((eachBonus, i) => {
    if (colision(recolectorObj, eachBonus)) {
      if (!esInmune) {
        sonidoColisionBonus.play();
      }
      eachBonus.desapareceFrutaBonus();
      bonusArr.splice(i, 1);

      score += 30;
      scoreNode.textContent = score;

      //activa la inmunidad y el aumento de velocidad del bonus
      activarBonus();
    }
  });
}

function colision(recolectorObj, elementosQueColisionan) {
  //Funciona tanto para la colisión con los bichos y con los ingredientes (y con el bonus)
  return (
    recolectorObj.x < elementosQueColisionan.x + elementosQueColisionan.w &&
    recolectorObj.x + recolectorObj.w > elementosQueColisionan.x &&
    recolectorObj.y < elementosQueColisionan.y + elementosQueColisionan.h &&
    recolectorObj.y + recolectorObj.h > elementosQueColisionan.y
  );
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

function activarBonus() {
  if (esInmune) return; //Para no volver a activar el efecto si ya está activo

  esInmune = true;

  recolectorObj.speed += 10; //Aumentamos velocidad
  recolectorObj.node.style.filter = "brightness(1.5) saturate(2)"; // Efecto visual para saber que está en modo inmune

  setTimeout(() => {
    esInmune = false;
    recolectorObj.speed = velocidadOriginal; //Para que vuelva a su velocidad base
    recolectorObj.node.style.filter = "none";
  }, 5000); //Dura 5 segundos el bonus activo
}

function aumentarDificultad() {
  nivel++;
  actualizarNivelVisual();
  velocidadBichos += 0.45;
  velocidadRecolector += 0.25;
  console.log("aumentando velocidad");
  /*
  bichosArr.forEach ((eachBicho) => {
    eachBicho.speed += velocidad; //Aumentan su velocidad
  });
*/
}

function actualizarNivelVisual() {
  if (levelNode) {
    levelNode.textContent = nivel;
  }
}

function gameOver() {
  clearInterval(gameIntervalId);

  gameScreenNode.style.display = "none";
  gameOverScreenNode.style.display = "flex";

  finalScoreNode.textContent = score;

  musicaFondoNode.pause();
  musicaFondoNode.currentTime = 0; // Reinicia la canción
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

  // Resetear bichos
  bichosArr.forEach((bicho) => bicho.desapareceBicho());
  bichosArr = [];

  // Resetear ingredientes
  ingredientesArr.forEach((ingrediente) => ingrediente.desapareceIngrediente());
  ingredientesArr = [];

  // Resetear bonus
  bonusArr.forEach((bonus) => bonus.desapareceFrutaBonus());
  bonusArr = [];

  // Resetear dificultad
  nivel = 1;
  velocidadBichos = 2;
  velocidadRecolector = 4;
  clearInterval(dificultadIntervalId);
  actualizarNivelVisual();
}

function reiniciarJuego() {
  //Restaurar todos los valores del juego
  limpiarJuego();

  //Empezar el bucle del juego de nuevo
  startGame();
}

//!Event Listeners

startButtonNode.addEventListener("click", () => {
  sonidoBoton.play();
  startGame();
});

restartButtonNode.addEventListener("click", () => {
  sonidoBoton.play();

  gameOverScreenNode.style.display = "none";
  gameBoxNode.style.display = "flex";

  reiniciarJuego();
});

startScreenButtonNode.addEventListener("click", () => {
  sonidoBoton.play();

  gameOverScreenNode.style.display = "none";
  startScreenNode.style.display = "flex";

  limpiarJuego();
});

document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  if (key in presionarTeclas) {
    presionarTeclas[key] = true;
    e.preventDefault();
  }
});

document.addEventListener("keyup", (e) => {
  const key = e.key.toLowerCase();
  if (key in presionarTeclas) {
    presionarTeclas[key] = false;
    e.preventDefault();
  }
});

/*
document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  if (["w", "a", "s", "d"].includes(key) && recolectorObj) {
    recolectorObj.moverRecolector(key);
  }
});
*/

musicButtonNode.addEventListener("click", () => {
  if (musicaActivada) {
    musicaFondoNode.pause();
    musicButtonNode.textContent = "🔇";
  } else {
    musicaFondoNode.play();
    musicButtonNode.textContent = "🔊";
  }
  musicaActivada = !musicaActivada; //cambiar estado del booleano
});

//! PLANIFICACIÓN JS

/*
- ////Fondo
- ////Personaje (x, y, h, w, speed, nodo)
- ////Bichos (x, y, h, w, speed, nodo)
- ////Ingredientes (x, y, h, w, speed, nodo)
- ////Bonus (x, y, h, w, speed, nodo)

- ////Colisión entre personaje y bichos
- ////Colisión entre personaje e ingredientes
- ////Colisión entre personaje y bonus

- ////Movimiento del personaje
- ////Bichos que aparecen(spawn)
- ////Bichos que desaparecen(despawn)

- ////Ingredientes que aparecen(spawn)
- ////Ingredientes que desaparecen(despawn)

- ////Fruta bonus que aparecen(spawn)
- ////Fruta bonus que desaparecen(despawn)

- ////Game-over
- ////Reiniciar
- ////Score 


////Bonus:

- ////Hacer que el personaje se vuelva inmune al coger la fruta Bonus
- ////Hacer que el personaje corra más rápido al coger la fruta Bonus

////Nuevo bonus

- ////Hacer movimiento de las teclas más suave, sin parones al saltar de tecla.
- ////Hacer sistema de niveles en el qe vaya aumentando la dificultad del juego (mayor velocidad el bichos y personaje)


*/
