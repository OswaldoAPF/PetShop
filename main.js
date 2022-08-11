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
            juguetes: [],
            farmacia: []
        }
    },

    created(){
        fetch(URL)
        .then(res => res.json())
        .then(datos => {
            this.data = datos.response
            this.soloJuguetes()
            this.soloMedicamentos()
        })
        .catch(err => console.log(err))
    },

    methods: {
        soloJuguetes : function(){
            return this.juguetes = this.data.filter(elemento => elemento.tipo.includes("Juguete"))
        },
        
        soloMedicamentos : function(){
            return this.farmacia = this.data.filter(elemento => elemento.tipo.includes("Medicamento"))
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

let enviar = document.querySelector(".enviar");
enviar.addEventListener("click", function (e) {
  Swal.fire({
    position: "center",
    title: "Los datos han sido enviados",
    footer: "¡Que tengas lindo día!",
    imageUrl: "./assets/img/perroFeliz.png",
    showConfirmButton: false,
    timer: 1500,
    color: "#FF5757",
    background: "linear-gradient(35deg, #CCFFFF, #FFCCCC",
    backdrop: `
      rgba(0,0,123,0.4)
      no-repeat
    `,
  });
});

let elemento = document.querySelector(".elemento");
let ancor = document.querySelector(".elemento a");
elemento.addEventListener("click", function (e) {
  elemento.classList.toggle("animate__animated");
  elemento.classList.toggle("animate__heartBeat");
});
ancor.addEventListener("click", function (e) {
  ancor.classList.toggle("gris");
  ancor.classList.toggle("llenando");
});

  