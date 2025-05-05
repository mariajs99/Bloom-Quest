class Recolector {
    constructor () {
        //Propiedades y características

        this.node = document.createElement ("img");
        this.node.src = "./images/personaje.png";


        this.x = 80;
        this.y = 60;
        this.w = 70;
        this.h = 75;
        this.speed = 20;

        //Con esto definimos el tamaño inicial de nuestro personaje en la gamebox
        this.node.style.width = `${this.w}px`;
        this.node.style.height = `${this.h}px`;

        //Definir posiciones iniciales
        this.node.style.position = "absolute";  //Para poder posicionar el personaje de forma exacta

        this.node.style.left = `${this.x}px`;
        this.node.style.top = `${this.y}px`;

        //this.speed = 10;

        gameBoxNode.append (this.node) //Para coger el nodo de la imagen e insertarlo en el juego cuando estemos en el game box

    }

    //Métodos y acciones
        //todo Nodos de movimiento con las teclas asdw
         mover (direction) {
            if(direction === "w") {
                this.y = Math.max(0, this.y - this.speed);
            }
            if(direction === "s") {
                this.y = Math.min(400-this.h, this.y + this.speed);
            }
            if(direction === "a") {
                this.x = Math.max (0, this.x - this.speed);
            }
            if(direction === "d") {
                this.x = Math.min (600 - this.w, this.x + this.speed);
            }
        
            this.node.style.top = this.y + "px";
            this.node.style.left = this.x + "px";
        }
}