/* let burger = document.querySelector(".burger");


burger.addEventListener("click", () => {
    burger.classList.toggle("active");
})


burger.addEventListener("click", () => {
    burger.classList.toggle("active");
}) */

const URL =  "https://apipetshop.herokuapp.com/api/articulos"

const { createApp } = Vue
createApp({

    data(){
        return{
            data: [],
            juguetes: [],
            medicamentos: [],
            productos: [],
            farmacia: [],
            productoInfo: []
        }
    },

    created(){
        fetch(URL)
        .then(res => res.json())
        .then(datos => {
            this.data = datos.response
            this.soloJuguetes()
            this.soloMedicamentos()

            this.productos = this.data.map(prod => {
                prod.max = 1
                return prod
            })
            
            this.infoProd(this.data)
            //this.agregarCarrito()
             
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

/*        agregarCarrito: function(e){
            
            console.log(e.target);
        }  */
    },

    watch: {

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

