
const URL =  "https://apipetshop.herokuapp.com/api/articulos"

const { createApp } = Vue
createApp({

    data(){
        return{
            data: [],
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
            let datastorage = JSON.parse(localStorage.getItem("enData"))
            if (datastorage) {  
            this.data = datastorage
            }
            this.soloJuguetes()
            this.soloMedicamentos()
            this.infoProd(this.data)
            
        })
        .catch(err => console.log(err))
        
       let carritoStorage = JSON.parse(localStorage.getItem("enCarrito"))
       if (carritoStorage) {
        this.carrito = carritoStorage
       }
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
            localStorage.setItem("enCarrito",JSON.stringify(this.carrito)) //IMPORTANTE 1
            localStorage.setItem("enData",JSON.stringify(this.data)) //IMPORTANTE 1
        },

        vaciarCarritoOnly: function(item){
            
            if(this.carrito.length > 0){

                this.carrito.forEach( e => {
                    if(e._id === item._id ){
                     e.cantidad--
                     e.stock++
                     e.total -= e.precio
                    }
                })

                this.data.forEach(e => {
                    if(e._id === item._id ){
                        e.stock++
                        e.total = e.precio
                       }
                })

            }
            localStorage.setItem("enCarrito",JSON.stringify(this.carrito))
            localStorage.setItem("enData",JSON.stringify(this.data))
        },

        comprar: function(){
            
            if(this.carrito.length === 0){
                alert("no hay productos en el carrito, mamahuevo")
            }else{
                alert( "gracias porsu compra" )
            } 
            this.carrito = []
            
            localStorage.setItem("enCarrito",JSON.stringify(this.carrito))
            localStorage.setItem("enData",JSON.stringify(this.data))
        }
        
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

