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
            auxData: [],
            juguetes: [],
            medicamentos: [],
            productoInfo: [],
            carrito: [],
            hola: []
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
}

}).mount('#container')
