var clientes=JSON.parse(localStorage.getItem('clientes'))||[];
var seleccionado=null;

function registrarCliente(){
    var nombre=document.getElementById('nombre').value;
    var apellido=document.getElementById('apellido').value;
    var nroID=document.getElementById('nroID').value;
    var tipoID=document.getElementById('tipoID').value;
    var telefono=document.getElementById('telefono').value;
    var correo=document.getElementById('correo').value;
    

    if(nombre==''||apellido==''||nroID==''||tipoID==''||telefono==''||correo==''){
        Swal.fire({   title: "Falan datos!",   text: "Por favor llene todos los campos del formulario!",   icon: "warning"});
        return;
    }
var cliente={
    nombre:nombre,
    apellido:apellido,
    nroID:nroID,
    tipoID:tipoID,
    telefono:telefono,
    correo:correo,
}
if(seleccionado!=null){
    clientes[seleccionado]=cliente;
    
}else{
    clientes.push(cliente);
}

localStorage.setItem('clientes',JSON.stringify(clientes));
window.location.href='clientes.html';
}

function cargarDatos(){
    var cadena='';
    for(let i=0;i<clientes.length;i++){
        cadena+=`<tr>
                    <td>${i+1}</td>
                    <td>${clientes[i].nombre}</td>
                    <td>${clientes[i].apellido}</td>
                    <td>${clientes[i].nroID}</td>
                    <td>${clientes[i].tipoID}</td>
                    <td>${clientes[i].telefono}</td>
                    <td>${clientes[i].correo}</td>
                    <td>
                        <div class="acciones">
                            <button onclick="editarCliente(${i})" class="btn btn-edit m5">
                                <i class="fa fa-edit"></i>
                            </button>
                            <button onclick="eliminarCliente(${i})" class="btn btn-delete m5">
                                <i class="fa fa-times"></i>
                            </button>
                        </div>
                    </td>
                </tr>`;
    }
    if(clientes.length==0){
        cadena+=`<tr>
        <td colspan="7" align="center">
        <br>
        <br>
        No hay clientes registrados!
        <br>
        <br>
        <a href="clientesForm.html" class="btn btn-nuevo">
        <i class="fa fa-plus"></i>
        Nuevo
        </a>
        <br>
        <br>
        </td>
        </tr>`
    }
    document.getElementById('listaClientes').innerHTML=cadena;
}

function eliminarCliente(posicion){
    Swal.fire({
        title: "Esta seguro?",
        text: "Elcliente se eliminará!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, quiero eliminar!",
    }).then((result) => {
        if (result.isConfirmed) {            
            clientes.splice(posicion, 1);
            localStorage.setItem('clientes', JSON.stringify(clientes));
            cargarDatos();
 
            Swal.fire({
                title: "Eliminado!",
                text: "El cliente ha sido eliminado.",
                icon: "success",
            });
        }
    });
}
function editarCliente(posicion){
    localStorage.setItem('cliente_seleccionado',posicion);
    window.location.href='clientesForm.html'
}
function setearDatos(){
    seleccionado=localStorage.getItem('cliente_seleccionado');
    if(seleccionado != null && seleccionado>=0 && seleccionado != undefined){
        var elCliente=clientes[seleccionado];
        
        document.getElementById('nombre').value = elCliente.nombre;
        document.getElementById('apellido').value = elCliente.apellido;
        document.getElementById('nroID').value = elCliente.nroID;
        document.getElementById('tipoID').value = elCliente.tipoID;
        document.getElementById('telefono').value = elCliente.telefono;
        document.getElementById('correo').value = elCliente.correo;
    }
}
function buscarCliente(){
    var buscador = document.getElementById('buscar').value;
    var nuevoArray=[];
    if(buscador.trim()==''||buscador.trim()==null){
        nuevoArray=JSON.parse(localStorage.getItem('clientes'))||[];
    } else{
        for(let i=0; i<clientes.length;i++){
            var texto=clientes[i].nombre.toLowerCase();
            if(texto.search(buscador.toLowerCase())>=0){
                nuevoArray.push(clientes[i]);
            }
        }
    }
    clientes=nuevoArray;
    cargarDatos();
}