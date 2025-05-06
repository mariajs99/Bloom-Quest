class Bichos {
  constructor(gameBoxNode) {
    this.node = document.createElement("img");

    const distintosBichos = ["./images/avispa.png", "./images/spider.png"];
    const alternarBichos = Math.floor(Math.random() * distintosBichos.length);
    this.node.src = distintosBichos[alternarBichos];

    this.x = 800;
    this.y = Math.random() * 500; //para hacer que su posición inicial sea aleatoria, pero solo porque vienen de la derecha
    this.w = 80; //tamaño de los bichos
    this.h = 80;
    this.speed = 2;

    //Con esto definimos el tamaño inicial de nuestros bichos en la gamebox
    this.node.style.position = "absolute";
    this.node.style.width = "60px";
    this.node.style.height = "60px";

    this.node.style.left = this.x + "px";
    this.node.style.top = this.y + "px";

    //Para coger el nodo de la imagen e insertarlo en el juego cuando estemos en el game box
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
