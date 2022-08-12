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
let ancor = document.querySelector(".a");
elemento.addEventListener("click", function (e) {
  elemento.classList.toggle("animate__animated");
  elemento.classList.toggle("animate__heartBeat");
  elemento.classList.toggle(".a");
});
ancor.addEventListener("click", function (e) {
  
});

  