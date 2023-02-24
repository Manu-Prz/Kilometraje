window.onload = function() {
    let anhadir = document.getElementById("anhadir");
    let listar = document.getElementById("listar");

    window.matchMedia( '(min-width: 768px)' ).addEventListener('change', menuHandler);

    anhadir.addEventListener("click", () => {cargar(anhadir, "../anhadir/anhadir.php")});
    listar.addEventListener("click", () => {cargar(listar, "../listar/listar.php")});

}

function menuHandler(e) {

    if (!e.matches && document.getElementById("formularioRegistro")) {
        $("#formularioRegistro")[0].classList.add("w-100");
        $("#formularioRegistro")[0].classList.remove("w-50");
        
    } else if(document.getElementById("formularioRegistro")) {
        $("#formularioRegistro")[0].classList.add("w-50");
        $("#formularioRegistro")[0].classList.remove("w-100");
        
    }
    
}

window.onsubmit = function() {
    event.preventDefault();
    if (document.getElementById("formularioRegistro")) {

        let validacion = validarFormularioRegistro(event.target);
        if (validacion != false) {
            solicitud("../../Controller/registrarKm.php", validacion).then(response => {
                $("#formularioRegistro")[0].reset();
                alert(response["mensaje"]);
                
            })
            
        } else {
            alert("Se ha producido algún error\nCompruebe los datos introducidos")
        }
    }

    if (document.getElementById("formularioListado")) {
        let parametros = new FormData();

        parametros.append("listar", "true");
        parametros.append("todos", "true");

        solicitud("../../Controller/listarRegistros.php", parametros).then(response => {
            
            if ($("#tabla")) {
                $("#tabla").remove();
            }

            let tabla = document.createElement("table");
            let thead = document.createElement("thead");
            let tbody = document.createElement("tbody");

            tabla.setAttribute("class", "table-responsive table-striped w-100 text-center");
            tabla.setAttribute("id", "tabla");
            
            let tr = document.createElement("tr");

            let publicTh = ["Fecha", "Destino", "Km", "Tipo", "Concepto", "Importe"];
            let indice = 0;

            for (let llave of Object.keys(response[0])) {
                let th = document.createElement("th");
                th.setAttribute("scope", "col");
                th.setAttribute("id", llave);

                th.innerText = publicTh[indice];
                indice++;
                tr.append(th);
            }

            thead.append(tr);
            tabla.append(thead);

            for (let elemento of response) {
                let tr = document.createElement("tr");
                
                for (let [key, value] of Object.entries(elemento)) {
                    let td = document.createElement("td");
                    td.setAttribute("id", key);
                    td.innerText = value;
                    tr.append(td);
                }

                tbody.append(tr);
                
            }

            tabla.append(tbody);
            document.getElementById("marco").append(tabla);

            document.querySelectorAll("th").forEach((elemento) => {
                elemento.addEventListener("click", () => {ordenar(elemento.id)});
            })
        })
            
    }

}
    
function validarFormularioRegistro(formulario) {
    let fecha = formulario.fecha.value;
    let destino = formulario.destino.value.trim();
    let numKm = formulario.numKm.value.trim();
    let trayecto = formulario.trayecto.value.trim();
    let concepto = formulario.concepto.value.trim();
    let datos = new FormData();
    let flag = false;

    if (!/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/.test(fecha)) {
        flag = true;
    } else {
        datos.append("fecha", fecha);
    }

    if (destino == "") {
        flag = true;
    } else {
        datos.append("destino", destino)
    }

    if (numKm < 0 || numKm == "") {
        flag = true;
    } else {
        datos.append("numKm", numKm)
    }

    if (trayecto == "") {
        flag = true;
    } else {
        datos.append("trayecto", trayecto)
    }

    if (concepto == "") {
        flag = true;
    } else {
        datos.append("concepto", concepto);
    }

    if (flag == true) {
        return false
    } else {
        datos.append("registrarKm", "true");
        return datos;
    }
}

function cargar(elemento, objetivo) {

    let botones = document.querySelectorAll("div.botonera button");
    for (let boton of botones) {
        if (boton != elemento) {
            
            boton.classList.remove("btn-primary");
            boton.classList.add("btn-outline-primary");
        } else {
            elemento.classList.add("btn-primary");
            elemento.classList.remove("btn-outline-primary");

        }

    }
    document.getElementById("cuerpo").innerHTML = "";
    $("#cuerpo").load(objetivo);

}

function ordenar(id) {
    let tracks = document.querySelectorAll("tbody > tr");
    let tracksArray = Array.prototype.slice.call(tracks);
  
    tracksArray.sort((a,b) => {
        let aCat = a.querySelector(`#${id}`).innerText;
        let bCat = b.querySelector(`#${id}`).innerText;

        if (!isNaN(aCat)) {
            return aCat - bCat;
        } else {
            if (aCat > bCat) return 1;
            if (aCat < bCat) return -1;
            return 0;
        }
    })

    pintarTabla(tracksArray);
}

function pintarTabla(arr) {
    let tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    arr.forEach(elemento => {
        tbody.append(elemento);
    })
}

async function solicitud(destino, datos) {
    try {
        const response = await fetch(destino, {
            method: "POST",
            body: datos
        });
        const data = await response.json();
        return data;
    } catch (error) {
        alert("Error: " + error);
    }
}