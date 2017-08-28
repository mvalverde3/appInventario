

function articulo(guarderia, articulo, unidad, cantidad) {
    this.Guarderia = guarderia;
    this.Articulo = articulo;
    this.Unidad = unidad;
    this.Cantidad = cantidad
}

function agregarInventario() {
    var database = firebase.database();
    var a = document.getElementById("Guarderia").value;
    var b = document.getElementById("Articulo").value;
    var c = document.getElementById("Unidad").value;
    var d = document.getElementById("Cantidad").value
    var nuevoArticulo = new articulo(localStorage.Guarderia, b, c, d);
    setRow(nuevoArticulo);
    return firebase.database().ref(localStorage.Guarderia +'/'+b).set(nuevoArticulo);
    console.log(nuevoArticulo);
}

informacion = function() {
    document.getElementById("titulo").innerHTML = "Sistema de Inventario de " + localStorage.Guarderia;
    var query = firebase.database().ref(localStorage.Guarderia).orderByKey();
    query.once("value")
        .then(function(snapshot) {
            var iData = '';
            snapshot.forEach(function(childSnapshot){
                var key = childSnapshot.key;
                var childData = childSnapshot.val();
                setRow(childData);

            })
        })
}

var setRow = function(childData) {
    var iData = '<tr>';
    iData = iData + '<td>'+ childData.Guarderia +'</td>';
    iData = iData + '<td>'+ childData.Articulo+'</td>';
    iData = iData + '<td>'+ childData.Unidad+'</td>';
    iData = iData + '<td>'+ childData.Cantidad+'</td>';
    iData = iData + '</tr>';
    $('#tablaInventario').append(iData);
}


$(document).ready(informacion());
