let burger = document.querySelector(".burger");

burger.addEventListener("click", () => {
    burger.classList.toggle("active");
}) 

const URL =  "https://apipetshop.herokuapp.com/api/articulos"

const { createApp } = Vue
createApp({
    data(){
        return{
            data: [],
            auxData: [],
            juguetes: [],
            medicamentos: [],
            productoInfo: [],

        }
    },
    
    created(){
        fetch(URL)
        .then(res => res.json())
        .then(datos => {
            this.data = datos.response
            console.log(this.data);
            this.soloJuguetes()
            this.soloMedicamentos()

            this.infoProd(this.data)             
        })
        .catch(err => console.log(err))
    },
    
    methods: {
        soloJuguetes : function(){
            return this.juguetes = this.data.filter(elemento => elemento.tipo.includes("Juguete"))
        },
        
        soloMedicamentos : function(){
            return this.medicamentos = this.data.filter(elemento => elemento.tipo.includes("Medicamento"))
        },
        infoProd: function(arr) {
            this.URLsearch = window.location.search
            this.id = this.URLsearch.slice(4)
            return this.productoInfo = arr.filter(prod => prod._id == this.id)
        },
        agregarCarrito: function (id){
            this.hola = this.juguetes.filter((juguete,i)=> juguete._id===id ? 
            this.juguetes[i].stock = this.juguetes[i].stock - 1 : 
            null)
            
            let condicion = this.carrito.some(juguete => juguete._id === id)
            console.log(condicion);
             
            if(condicion){

                let aux = this.carrito.map(juguete => {

                     if(juguete._id === id){
                         let copia = {...juguete}
                         copia.cantidad ++
                         //copia.stock -= 1
                         console.log(copia);
                         return copia

                     }else{
                         return juguete
                     }
                 })
                 this.carrito = aux
                 
             }else{ //god
                 let aux = this.hola.find(juguete => juguete._id === id)
                     //aux.stock -=1
                     aux.cantidad = 1
                     this.carrito.push(aux)
             }
        }
      },
    computed: {

        
    }

}).mount('#container')


let next = document.querySelector(".next"); // Boton Siguiente
let prev = document.querySelector(".prev"); // Boton Atras
let progressIcon = document.querySelector("#progressbar li"); // Barra de Progreso
let fieldset = document.querySelector(".fieldset");
let fieldsetDos = document.querySelector(".fieldsetDos"); // Cartas del Form
let nombre = document.querySelector(".nombreRequerido");
let apellido = document.querySelector(".apellidoRequerido");
let alert = document.querySelector(".alert");
let email = document.querySelector(".mailRequerido");
let otro = document.querySelector(".otro");
let campoOtro = document.querySelector(".campoOtro");
next.addEventListener("click", function (e) {
  if (email.value && nombre.value && apellido.value) {
    fieldsetDos.classList.toggle("siguiente");
    fieldset.classList.toggle("siguiente");
  } else {
    alert.innerHTML = "";
    alert.innerHTML = `<p> *Complete los campos requeridos por favor </p>`;
  }
});

prev.addEventListener("click", function (e) {
  alert.innerHTML = "";
  fieldsetDos.classList.toggle("siguiente");
  fieldset.classList.toggle("siguiente");
});

otro.addEventListener("click", function (e) {
  if (otro.checked) {
    campoOtro.innerHTML = `<input type="text" name="otro" placeholder="¿Cuál?"></input>`;
  }
});

Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Your work has been saved',
  showConfirmButton: false,
  timer: 1500
})
