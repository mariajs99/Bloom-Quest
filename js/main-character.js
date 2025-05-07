class Recolector {
  constructor() {
    //Propiedades y características

    this.node = document.createElement("img");
    this.node.src = "./images/personaje.png";

    this.x = 80;
    this.y = 60;
    this.w = 100;
    this.h = 105;
    this.speed = 20;

    //Con esto definimos el tamaño inicial de nuestro personaje en la gamebox
    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;

    //Definir posiciones iniciales
    this.node.style.position = "absolute"; //Para poder posicionar el personaje de forma exacta

    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;

    //this.speed = 10;

    gameBoxNode.append(this.node); //Para coger el nodo de la imagen e insertarlo en el juego cuando estemos en el game box
  }

  //Métodos y acciones
  //todo Nodos de movimiento con las teclas asdw
  moverRecolector(direction) {
    //Permite mover al personaje en la dirección presionada (WASD) sin salirse de la gameBox.
    // Movimiento vertical
    if (direction === "w") {
      this.y -= this.speed;
    } else if (direction === "s") {
      this.y += this.speed;
    }

    // Movimiento horizontal
    if (direction === "a") {
      this.x -= this.speed;
    } else if (direction === "d") {
      this.x += this.speed;
    }

    // Limitar para que no se salga del gameBox
    this.x = Math.max(0, Math.min(this.x, 800 - this.w));
    this.y = Math.max(0, Math.min(this.y, 550 - this.h));

    this.node.style.top = this.y + "px";
    this.node.style.left = this.x + "px";
  }
}

class Vidas {
  constructor() {
    this.vidas = 3;
  }
}
