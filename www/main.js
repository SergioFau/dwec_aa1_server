var modal = document.getElementById("modalAnadirCategoria");
var modalSite = document.getElementById("modalAnadirSite");

function modalAnadirCategoria() {
    modal.style.display = "block";
}
function mostrarIconos() {
    var iconos = document.getElementsByClassName("icono");
    var botonIconos = document.getElementById("botonIconos");
    for (let i = 0; i < iconos.length; i++) {
        if(iconos[i].style.visibility == "visible"){
            iconos[i].style.visibility = "hidden";
            botonIconos.innerHTML = "Mostrar Iconos";
        }else if( iconos[i].style.visibility == "" || iconos[i].style.visibility == "hidden"){
                iconos[i].style.visibility = "visible";
                botonIconos.innerHTML = "Ocultar Iconos";
            }
        
    } 
}
function modalAnadirSite() {
    modalSite.style.display = "block";
}

if (document.getElementById("cruzModalCategorias") != null) {
    document.getElementById("cruzModalCategorias").onclick = function () {
        modal.style.display = "none";
        document.getElementById("textoAnadirCategoria").value = "";
    }
}
if (document.getElementById("cruzModalSites") != null) {
    document.getElementById("cruzModalSites").onclick = function () {
        modalSite.style.display = "none";
        document.getElementById("nombreAnadirSite").value = "";
        document.getElementById("usuarioAnadirSite").value = "";
        document.getElementById("contraseñaAnadirSite").value = "";
    }
}


window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("textoAnadir").value = "";
    }
}

window.onclick = function (event) {
    if (event.target == modalSite) {
        modalSite.style.display = "none";
        document.getElementById("nombreAnadirSite").value = "";
        document.getElementById("usuarioAnadirSite").value = "";
        document.getElementById("contraseñaAnadirSite").value = "";
    }
}

function anadirCategoria() {
    var text = document.getElementById("textoAnadirCategoria").value;
    if (text != "" && text.trim().length > 5) {
        fetch("http://localhost:3000/categories", {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: text
            })
        })
        location.reload();
        return false;
    } else {
        alert("Introduce un nombre con más de 5 caracteres");
        document.getElementById("textoAnadirCategoria").style.border = "1px solid red";
    }
}

function eliminarCategoria(id) {
    if (window.confirm("¿Seguro que quieres eliminar esta categoria?")) {
        fetch("http://localhost:3000/categories/" + id, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json"
            }
        })
        location.reload();
        return false;
    }
}

function anadirSite() {
    const params = new URLSearchParams(queryString);
    let categoryId = params.get("categoryId");
    var nombre = document.getElementById("nombreAnadirSite").value;
    var usuario = document.getElementById("usuarioAnadirSite").value;
    var contraseña = document.getElementById("contraseñaAnadirSite").value;
    if ((nombre != "" || usuario != "" || contraseña != "") && (nombre.trim().length > 7 && usuario.trim().length > 7 && contraseña.trim().length > 7)) {
        fetch("http://localhost:3000/categories/" + categoryId, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: nombre,
                user: usuario,
                url: "https://trim-cork.info",
                description: "Site Creado por Fetch",
                password: contraseña,
                categoryId: categoryId

            })
        })
        location.reload();
        return false;
    } else {
        alert("Introduce los todos campos con minimo 8 caracteres")
        if(nombre.trim().length < 8) document.getElementById("nombreAnadirSite").style.border = "1px solid red";
        if(usuario.trim().length < 8) document.getElementById("usuarioAnadirSite").style.border = "1px solid red";
        if(contraseña.trim().length < 8) document.getElementById("contraseñaAnadirSite").style.border = "1px solid red";


    }
}

function eliminarSite(id) {
    if (window.confirm("¿Seguro que quieres eliminar este site?")) {
        fetch("http://localhost:3000/sites/" + id, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json"
            }
        })
        location.reload();
        return false;
    }
}

function generarContraseña() {
    let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let passwordLength = 8;
    let password = "";
    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    document.getElementById("contraseñaAnadirSite").value = password;
}
