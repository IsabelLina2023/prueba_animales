import {Animal} from "./animal.js"
let audioPlayer = document.getElementById('#player')

export class Serpiente extends Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido);
    }
    //Metodo:
    sisear() {
        audioPlayer.src = `./${this._sonido}`;
        audioPlayer.play();
    }

}