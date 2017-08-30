

function articulo(id, guarderia, articulo, unidad, cantidad, descripcion) {
    this.id =id;
    this.Guarderia = guarderia;
    this.Articulo = articulo;
    this.Unidad = unidad;
    this.Cantidad = cantidad;
    this.Descripcion = descripcion;
}

function agregarInventario() {
    var database = firebase.database();
    var b = document.getElementById("Articulo").value;
    var c = document.getElementById("Unidad").value;
    var d = document.getElementById("Cantidad").value;
    var e = document.getElementById("Decripcion").value;
    var id = firebase.database().ref().child(localStorage.Guarderia).push().key;
    var nuevoArticulo = new articulo(id, localStorage.Guarderia, b, c, d, e);
    database.ref(localStorage.Guarderia +'/'+id).set(nuevoArticulo);
    location.reload();

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
    var iData = '<tr> <td>'+childData.Articulo+'</td>';

    iData = iData + '<td>'+ childData.Descripcion+'</td>';
    iData = iData + '<td>'+ childData.Unidad+'</td>';
    iData = iData + '<td>'+ childData.Cantidad+'</td>';
    iData = iData + '<td><button class="btn btn-xs azul" id="'+childData.id+'"data-title="Edit" data-toggle="modal" data-target="#edit" onclick ="pointToData(this.id)" ><i class="fa fa-pencil" aria-hidden="true"></i></button>'
    iData = iData + '<button class="btn btn-xs rojo" id="'+childData.id+'"data-title="Delete" data-toggle="modal" data-target="#delete" onclick="pointToData(this.id)"><i class="fa fa-times" aria-hidden="true"></i></button></p></td></tr>';
    $('#tablaInventario').append(iData);
}

pointToData = function(a) {
    localStorage.id = a;
    console.log(localStorage.id);
}

var ponerFila = function(childData) {
    var iData = '<tr> <td>'+childData.Articulo+'</td>';

    iData = iData + '<td>'+ childData.Decripcion+'</td>';
    iData = iData + '<td>'+ childData.Unidad+'</td>';
    iData = iData + '<td>'+ childData.Cantidad+'</td>';
    iData = iData + '<td><p<button class="btn btn-xs azul" id="'+childData.id+'" data-title="Edit" data-toggle="modal" data-target="#edit" onclick="pointToData(this.id)"><i class="fa fa-pencil" aria-hidden="true"></i></button></p></td>'
    iData = iData + '<td><p data-placement="top" data-toggle="tooltip" title="Eliminar"><button class="btn btn-xs rojo id="'+childData.id+'" data-title="Delete" data-toggle="modal" data-target="#delete" onclick="pointToData(this.id)" ><i class="fa fa-times" aria-hidden="true"></i></button></p></td></tr>';
    $('#tabla').append(iData);
}

function buscarProducto() {
    var busqueda = document.getElementById("srch-term").value;

    var query = firebase.database().ref(localStorage.Guarderia).orderByKey();
    query.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var info =childSnapshot.val();

                if (busqueda == info.Articulo || busqueda === info.Unidad || busqueda === info.Cantidad ){
                    console.log("si Entro Aca")
                    ponerFila(info);

                }
            })
        })
}

function actualizar() {
        var valor = document.getElementById("actualizar").value;
        firebase.database().ref(localStorage.Guarderia+'/'+localStorage.id).update({Cantidad: valor});
        location.reload();


}


function borrarDelSistema() {
    firebase.database().ref(localStorage.Guarderia+'/'+localStorage.id).remove();
    location.reload();
}

$(document).ready(informacion());
$(document).ready(function () {
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();
    });

    function hamburger_cross() {

      if (isClosed == true) {
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }

  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });
});
