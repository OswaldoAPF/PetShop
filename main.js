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

