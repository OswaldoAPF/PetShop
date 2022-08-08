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
            farmacia: [],
            boton_mas_info:[]
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
        offCanvasBoton:function(){

        }
    }
}).mount('#container')


    /* <div class="offcanvas offcanvas-top position-absolute" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
               <div class="offcanvas-header">
                 <h5 class="offcanvas-title" id="offcanvasTopLabel">{{juguete.nombre}}</h5>
                 <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
               </div>
               <div class="offcanvas-body">
                <p>{{juguete.descripcion}}</p>
               </div>
             </div> */
