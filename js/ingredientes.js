class Ingredientes {
  constructor(gameBoxNode) {
    this.node = document.createElement("img");

    //Alternar entre dos ingredientes
    const ingredientes = ["./images/hongo.png", "./images/hierbas.webp"];
    const alternarIngredientes = Math.floor(Math.random() * ingredientes.length);

    this.node.src = ingredientes[alternarIngredientes];

    //Crear posición aleatoria dentro del gamebox
    this.x = Math.random() * 800; // para hacer que su posición inicial sea aleatoria ANCHO
    this.y = Math.random() * 500; //Lo mismo, se hace en las dos porque pueden aparecer en cualquier parte del ancho y alto de la pantalla ALTO
    this.w = 70; //tamaño de los ingredientes
    this.h = 60;

    // Tiempo aleatorio de aparición (desaparece después de cierto tiempo)
    //this.tiempoDesaparicion = Math.floor(Math.random() * 5000) + 2000; // Entre 2 y 7 segundos

    // definimos el tamaño inicial de nuestros ingredientes en el gamebox
    
    this.node.style.position = "absolute";
    this.node.style.width = this.w + "px";
    this.node.style.height = this.h + "px";

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
