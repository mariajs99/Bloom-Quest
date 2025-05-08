class Bichos {
  constructor(gameBoxNode) {
    this.node = document.createElement("img");

    const distintosBichos = [
      "./images/avispa2.png",
      "./images/spider.png",
      "./images/mantis.png",
      "./images/escorpion.png",
    ];
    const alternarBichos = Math.floor(Math.random() * distintosBichos.length);
    this.node.src = distintosBichos[alternarBichos];

    this.x = 800;
    this.y = Math.random() * 500; // posición inicial aleatoria con respecto a la ALTURA del gamebox
    this.w = 60; //tamaño de los bichos
    this.h = 60;
    this.speed = velocidadBichos;

    //Definir posiciones iniciales en el gamebox
    this.node.style.position = "absolute";
    this.node.style.width = this.w + "px";
    this.node.style.height = this.h + "px";

    //Con esto definimos el tamaño inicial de nuestros bichos en la gamebox
    this.node.style.left = this.x + "px";
    this.node.style.top = this.y + "px";

    //Coger el nodo de la imagen e insertarlo en el juego cuando estemos en el game box
    gameBoxNode.append(this.node);
  }

  movimientoBichos() {
    this.x -= this.speed;
    this.node.style.left = this.x + "px";
  }

  bichoEstaFuera() {
    return this.x + this.node.offsetWidth < 0;
  }

  desapareceBicho() {
    this.node.remove();
  }
}
