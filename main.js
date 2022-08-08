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
            medicamentos: [],
            productos: []
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

/*          carrito: function(){
            return this.medicamentos.forEach(element => element.stock === element.stock - element.max)
        }  */
    },

    computed: {
        
    }

}).mount('#container')

