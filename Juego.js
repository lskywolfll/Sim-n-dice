'use strict'

const btnEmpezar = document.getElementById('btnEmpezar');
const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');

const ULTIMO_NIVEL = 10;

class Juego{
    constructor(){
        this.inicializar();
        this.generarSecuencia();
        setTimeout(this.nextLevel(),500);
    }

    inicializar(){
        // Establecer el this bien y no el this referenciando al elemento en si dentro, saliendose del objeto en si usando el bind(this)
        this.inicializar = this.inicializar.bind(this);
        this.elegirColor = this.elegirColor.bind(this);
        this.nextLevel = this.nextLevel.bind(this);

        // Toggle es un interruptor de prendido o apagado
        this.toggleBtnEmpezar()
        this.nivel = 1;
        this.colores = {
            // Es igual a hacer celeste: celeste, si tendran el mismo nombre podemos dejarle el nombre de la variable y javascrip hara todo el trabajo de agregar el mismo nombre de la propiedad del valor
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    toggleBtnEmpezar(){
        if(btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide');
        }else{
            btnEmpezar.classList.add('hide');
        }
    }

    generarSecuencia(){
        // Math.random no brinda un valor de 0 a 1 por defecto, en decimal y al multiplicarlo por 4 nosotros estamos indicando que nos provea con un valor de 0 hasta 3.9 aprox jamas 4 en si a noser que rendondeemos.

        // Map para crear nuestros filtro no sirve si no tenemos valores en nuestro arreglo de datos o mejor dicho nuestra cajita de secuencias

        // El metodo flor elimina los decimal si sale 3.5 nos dara 3
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(numero => Math.floor(Math.random() * 4));
    }

    nextLevel(){
        this.subLevel = 0
        this.iluminarSecuencia();
        this.addEventsClick();
    }

    numeroAColor(numero){
        switch (numero) {
            // El break jamas podra ejecutarse si vamos a retornar un valor
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }

    colorANumero(color){
        switch (color) {
            // El break jamas podra ejecutarse si vamos a retornar un valor
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }
    }

    iluminarSecuencia(){
        for(let i = 0; i < this.nivel; i++){
            const color = this.numeroAColor(this.secuencia[i]);
            setTimeout( () => this.iluminarColor(color), i * 1000);
        }
    }

    iluminarColor(color){
        this.colores[color].classList.add('light');
        setTimeout( () => this.apagarColor(color), 350);
    }

    apagarColor(color){
        this.colores[color].classList.remove('light');
    }

    addEventsClick(){
        // this reconoce como propiamente el color en si, al usar el metodo bind(this o self) para que this sea distinto y este no sea otro distinto al this que nos referimos todo el tiempo
        // Tambien se puede hacer al inicializar todos los eventos y ahorrarnos todo ello
        this.colores.celeste.addEventListener('click', this.elegirColor);
        this.colores.verde.addEventListener('click', this.elegirColor);
        this.colores.violeta.addEventListener('click', this.elegirColor);
        this.colores.naranja.addEventListener('click', this.elegirColor);
    }

    deleteEventsClick(){
        this.colores.celeste.removeEventListener('click', this.elegirColor);
        this.colores.verde.removeEventListener('click', this.elegirColor);
        this.colores.violeta.removeEventListener('click', this.elegirColor);
        this.colores.naranja.removeEventListener('click', this.elegirColor);
    }

    elegirColor(event){
        const nombreColor = event.target.dataset.color;
        const numeroColor = this.colorANumero(nombreColor);
        this.iluminarColor(nombreColor);
        if(numeroColor === this.secuencia[this.subLevel]){
            this.subLevel++;
            if(this.subLevel === this.nivel){
                this.nivel++;
                this.deleteEventsClick();
                if(this.nivel === (ULTIMO_NIVEL + 1)){
                    this.ganoElJuego();
                    console.log('gano');
                }else{
                    setTimeout(this.nextLevel, 1500);
                }
            }
        }else{
            this.perdioElJuego();
            console.log('Perdiste')
        }
    }

    ganoElJuego(){
        Swal.fire(
            'You are winner!',
            'Buen Trabajo eres de los mejores :)',
            'success'
        ).then( () => this.inicializar());
    }

    perdioElJuego(){
        Swal.fire(
            'Game Over!',
            'Has perdido :(',
            'error'
        ).then( () => this.deleteEventsClick());
    }
}

function empezarJuego(){
//    var juego = new Juego();
//    console.log(juego);
   window.juego = new Juego();
}