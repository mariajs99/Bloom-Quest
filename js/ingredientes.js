class Ingredientes {
  constructor(gameBoxNode) {
    this.node = document.createElement("img");

    //Alternar entre dos ingredientes
    const ingredientes = [
      "./images/planta6.png",
      "./images/planta8.png",
      "./images/planta7.png",
      "./images/planta3.png",
      "./images/planta5.png",
    ];
    const alternarIngredientes = Math.floor(
      Math.random() * ingredientes.length
    );

    this.node.src = ingredientes[alternarIngredientes];

    //Crear posición aleatoria dentro del gamebox
    this.x = Math.random() * 800; // posición inicial aleatoria con respecto al ANCHO del gamebox
    this.y = Math.random() * 500; // posición inicial aleatoria con respecto a la ALTURA del gamebox
    this.w = 60; //tamaño de los ingredientes
    this.h = 60;

    // definimos el tamaño inicial de nuestros ingredientes en el gamebox
    this.node.style.width = this.w + "px";
    this.node.style.height = this.h + "px";

    //Definir posiciones iniciales en el gamebox
    this.node.style.position = "absolute";

    this.node.style.left = this.x + "px";
    this.node.style.top = this.y + "px";

    //Para coger el nodo de la imagen e insertarlo en el juego cuando estemos en el game box
    gameBoxNode.append(this.node);

    setTimeout(() => {
      this.desapareceIngrediente();

      const index = ingredientesArr.indexOf(this);
      if (index !== -1) ingredientesArr.splice(index, 1);
      //evito que colisione con elementos invisibles
      // y mantengo el array de ingredientes limpio
    }, 5000);
  }

  desapareceIngrediente() {
    this.node.remove();
  }
}
