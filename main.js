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
            productos: [],
            farmacia: [],
            boton_mas_info:[],
            carrito:[],
            btn_añadir_al_carrito:[]

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
        
        agregarCarrito: function (id){       
               let producto= this.juguetes.filter((juguete,i)=>juguete._id===id?this.juguetes[i].stock=this.juguetes[i].stock-this.juguetes[i].max:null)    
                console.log(producto)      
            }
    },
        
    computed: {
        
    }

}).mount('#container')






