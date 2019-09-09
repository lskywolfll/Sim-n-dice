// Establecemos una restriccion a la hora de desarrollar, lo cual nos obligara a desarrollar de una mejor forma inicial pero tener en mente que los nombre de las funciones y entre otras cosas no obligara nada por que somos nosotros el creador.
'use strict'

// Obtener todos los elementos de la pagina usando el DOM(Documen Object Model) y usando el metodo respectivo para obtener lo que queremos en este ejemplo solo el id
const btnEmpezar = document.getElementById('btnEmpezar');
const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');

// Existe tambien otra propiedad del DOM en el cual podemos usar otra funcionalidad para seleccionar elementos tanto un solo valor(el primero que salga en el html con el id o clase) y todos los elementos que contenga algun nombre en concretro con su respectivo dato
// Se declaran el tipo de dato como en css usando el (#) = id (.) = clase, de seguro seme olvida alguno pero lo que he usado mas e aprendido solo son estos 2 por ahora...
const btnEmpezarNew = document.querySelector('#btnEmpezar');
const celesteNew = document.querySelector('#celeste');
const violetaNew = document.querySelector('#violeta');
const naranjaNew = document.querySelector('#naranja');
const verdeNew = document.querySelector('#verde');
// Y aqui viene el que selecciona o toma todos los que tengan este atributo en la pagina, id o clase o name o etiqueta o etiqueta modificada con datos y etc
const id = document.querySelectorAll('#id');
const clase = document.querySelectorAll('.class');
// Todas las etiqueta p en DOM(html)
const p = document.querySelectorAll('p');
// etiqueta.clase = div.color osea hacemos referencia a la etiqueta div con la clase color :o
const etiquetaModified = document.querySelectorAll('div.className');


const ULTIMO_NIVEL = 10;

class Juego{
    constructor(){
        // Se llaman todos los metodos que se indiquen y por si tenemos propiedades o mejor dicho caracteristicas de este entonces se establecierian esas caracteristicas(variables o datos o cajita con algun dato o lo que sea mientras guarde algo e referencia a ella)
        this.inicializar();
        this.generarSecuencia();
        // SetTimeout(orden,tiempo)
        // La peculiaridad de este es que solo se ejecutara una unica vez al contrario del setInterval, este se ejecutara a medio segundo(1seg = 1000)
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
        // Si contiene el DOM(html osea nuestra pagina) algo con el atributo hide y manipular en base exista o no
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
        // 
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
        // Iterar hasta el nivel respectivido definido que es hasta donde llegara el juego, la cantidad de veces que se iluminaran los colores
        for(let i = 0; i < this.nivel; i++){
            const color = this.numeroAColor(this.secuencia[i]);
            setTimeout( () => this.iluminarColor(color), i * 1000);
        }
    }

    iluminarColor(color){
        // Agregaremos una lista de clases con el atributo light, para que brille o se vea mas iluminado conjunto a un tiempo establecido para que se apage su iluminacion del color
        this.colores[color].classList.add('light');
        setTimeout( () => this.apagarColor(color), 350);
    }

    apagarColor(color){
        // Elimina el atributo de light o iluminado o luz
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
        // Se elimnan los eventos de clickeo del usuario y se agrega la funcion respectiva con ello
        this.colores.celeste.removeEventListener('click', this.elegirColor);
        this.colores.verde.removeEventListener('click', this.elegirColor);
        this.colores.violeta.removeEventListener('click', this.elegirColor);
        this.colores.naranja.removeEventListener('click', this.elegirColor);
    }

    elegirColor(event){
        // Apuntamos al dataset que se creo en la pagina(DOM) ya que al verlo por consola nos aparecia ese atributo podemos entonces usar esa propiedad y usarla a nuestro gusto, sacado con los eventos click de lo que habia en esa ubicacion por ende se manipula muy bien claro esta a lo que nosotros tengamos pensado que hacer el por que
        const nombreColor = event.target.dataset.color;
        const numeroColor = this.colorANumero(nombreColor);
        this.iluminarColor(nombreColor);
        if(numeroColor === this.secuencia[this.subLevel]){
            // los subniveles son los que llevaran la cuenta de cuantas veces se parpadeara un color sea el mismo que el de la secuencia sacada, en simples palabras es el contador que llevara cuantos colores debo iluminar
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
        // Importando la libreria de SweetAlert 2 podemos usar todas las plantillas ya creadas para implementarlas modificando soo los mensajes o en su defecto modificar estas a nuestro gusto
        Swal.fire(
            'You are winner!',
            'Buen Trabajo eres de los mejores :)',
            'success'
            // Estamos usando promesas(callbacks) por ello usamos el then
            // Usamos el then cuando todos los datos esten listos y no devuelva nada vacio, despues con ello hacemos la ejecucion respectiva que queremos que pase en esta ocasion es que gane el juego y empieze de nuevo :o
        ).then( () => this.inicializar());
    }

    perdioElJuego(){
        Swal.fire(
            'Game Over!',
            'Has perdido :(',
            'error'
            // Perdio entonces queremos que elimine todo despues que salga la ventana de alerta
        ).then( () => this.deleteEventsClick());
    }
}

function empezarJuego(){
//    var juego = new Juego();
//    console.log(juego);
   window.juego = new Juego();
}