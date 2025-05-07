class FrutaBonus {
    constructor(gameBoxNode) {
        this.node = document.createElement("img");
        this.node.src = "./images/fruta.png";
    
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
    }
    
    desapareceFrutaBonus() {
        this.node.remove();
    }
}