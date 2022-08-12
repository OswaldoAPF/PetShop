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

            carrito: [],
            totalCarrito: 0,
            
        }
    },

    created(){
        fetch(URL)
        .then(res => res.json())
        .then(datos => {
            this.data = [...datos.response]
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
        agregarCarrito: function (item){
            
            let bool = this.carrito.some( e => e._id === item._id)
            console.log(bool)
            if(bool){
                this.carrito.forEach( e => {
                    if(e._id === item._id ){
                     e.cantidad++
                     e.stock--
                     e.total += e.precio
                    }
                })
            }else{
                 let aux = {...item}
                 aux.cantidad = 1
                 aux.stock--
                 aux.total = aux.precio
                 this.carrito.push(aux)
                }
                this.data.forEach( e => {
                    if(e._id === item._id ){
                        e.stock--
                    }
            })
        },

        vaciarCarrito: function(){

            this.carrito = []
            
        },
        
    },
    computed: {
        imprimirTotal: function(){
            if(this.carrito.length > 0){
                let total = 0
                this.carrito.forEach(a=>{
                    total += a.total 
                })
                this.totalCarrito = total
            }else{
                this.totalCarrito = 0
            }
        }
        
    }
}).mount('#container')

/*
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

*/

