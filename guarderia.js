

function agregarGuarderia() {
    var guarderia = document.getElementById("nombreGuarderia").value;
    var database = firebase.database();
    console.log("si paso eso");
    //return firebase.database().ref(guarderia).set({});
    return firebase.database().ref('Guarderias/'+ guarderia).set({Guarderia: guarderia});

}

informacion = function() {
    console.log("entro");

    var query = firebase.database().ref("Guarderias").orderByKey();
    query.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function(childSnapshot){
                    var childData = childSnapshot.val();
                    crearLink(childData.Guarderia);

        })
    })
}

var crearLink = function(a) {
    var data = '<br><button type="button" id = "'+a+'" class="btn btn-cons azulClaro" onclick="irseInventario(this.id)" >' + a + '</button> <br>';
    $('#linkInventario').append(data);
}

var irseInventario = function(a) {

    localStorage.Guarderia = a;
    location.href = 'inventario.html';

}

$(document).ready(informacion());
