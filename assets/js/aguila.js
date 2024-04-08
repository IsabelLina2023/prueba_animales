import {Animal} from "./animal.js"
let audioPlayer = document.getElementById('#player')

export class Aguila extends Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido);
    }
    //Metodo:
    chillar() {
        audioPlayer.src = `./${this._sonido}`;
        audioPlayer.play();
    }
}