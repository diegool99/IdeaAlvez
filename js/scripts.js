let tareas = [];

let usuariosDisponibles = [];

let usuarioLogeado = localStorage.getItem('user');

let seccionTareas = document.getElementById('SeccionTareas');
let seccionLogin = document.getElementById('SeccionLogin');

if(usuarioLogeado != null){
    seccionTareas.style.display = '';
    seccionLogin.style.display = 'none';
}else{
    seccionTareas.style.display = 'none';
    seccionLogin.style.display = '';
}



const cargarUsuarios = () =>{
    let usuario1 = new Usuario('Diego Alvez','aa@aa.com','1234');
    let usuario2 = new Usuario('Fernando Vazquez','bb@bb.com','5678');

    usuariosDisponibles.push(usuario1);
    usuariosDisponibles.push(usuario2);
}

const obtenerTareaNueva = () =>{
    //OBTENGO DEL HTML LOS DATOS INGRESADOS DE LA NUEVA TAREA

    let iCategoria = document.getElementById('inputCategoria').value;
    let iResponsable = document.getElementById('inputResponsable').value;
    let iTarea = document.getElementById('inputTarea').value;
    let iDescripcion = document.getElementById('inputDescripcion').value;

    return new Tarea(iCategoria,iResponsable,iTarea,iDescripcion);
}

const generarHtmlTarea = (tarea) =>{

    let restaFecha = calcularFecha(new Date(Date.now()),tarea.fecha);
    let unidadFecha = "";
    let valorFecha = 0;

    if(restaFecha.dias == 0 && restaFecha.horas == 0){
        //No alcanza a un dia
        unidadFecha = "Minutos";
        valorFecha = restaFecha.minutos;
    }else if (restaFecha.dias == 0 && restaFecha.horas > 0){
        unidadFecha = "Horas";
        valorFecha = restaFecha.horas;
    }else{
        unidadFecha = "Dias";
        valorFecha = restaFecha.dias;
    }

    let nuevatarea = `
                        <div class="card-body">
                            <h5 class="card-title">${tarea.tarea}</h5>
                            <p class="card-text">${tarea.descripcion}</p>
                            <p class="card-text">Responsable: ${tarea.responsable}</p>
                            <a href="#" class="btn btn-primary">${tarea.tipoTarea}</a>
                        </div>
                        <div class="card-footer text-muted">
                        Creado hace ${valorFecha} ${unidadFecha}
                        </div>`;

    //ELEMENTO CONTENEDOR DE LA TAREA
    let retorno = document.createElement('div');
    retorno.setAttribute('class','card text-center');
    retorno.setAttribute('id',`borrar-${tarea.id}`);

    //GENERO EL BOTON PARA BORRARLO
    let btn = document.createElement('button');
    btn.setAttribute('class','btn-close');
    btn.setAttribute('id',`${tarea.id}`);

    //HEADER 
    let header = document.createElement('div');
    header.setAttribute('class','card-header');
    header.innerHTML = `<h3>${tarea.categoria}</h3>`;
    header.appendChild(btn);
    retorno.appendChild(header);

    retorno.innerHTML += nuevatarea;

    return retorno;
}

const calcularFecha = (fecha1, fecha2) => {
    let resta = fecha1.getTime() - fecha2.getTime();

    

    let restaDias = Math.round(resta/ (1000*60*60*24));

    let restaHoras = Math.round(resta/ (1000*60*60));

    let restaMin = Math.round(resta/ (1000*60));

    let retorno = {
        "dias": restaDias,
        "horas": restaHoras,
        "minutos": restaMin
    }

    return retorno;
}


const encolarTarea = (event) => {

    //GENERO LA TAREA NUEVA
    let nueva = obtenerTareaNueva();

    //PUSHEO AL ARRAY DE TAREAS
    tareas.push(nueva);

    //GENERO MI TAREA PARA AGREGAR AL HTML
    let htmlTarea = generarHtmlTarea(nueva);

    //OBTENGO LA LISTA DE TAREAS EN COLA Y AGREGO LA NUEVA TAREA
    let htmlTareasEnCola = document.getElementById('tareasEnCola');

    htmlTareasEnCola.appendChild(htmlTarea);


    let btn = document.getElementById(`${nueva.id}`);
    btn.addEventListener('click',borrarTarea);

}

const borrarTarea = (event) =>{
    //BORRO DE LA LISTA
    let tareaBorrar = event.currentTarget.id;
    tareas = tareas.filter(tarea => tarea.id != tareaBorrar);

    //BORRO DEL HTML
    let elementoBorrar = document.getElementById(`borrar-${tareaBorrar}`);
    

    let contenedor = document.getElementById('tareasEnCola');
    contenedor.removeChild(elementoBorrar);

}

let btnAgregarTarea = document.getElementById('iCrearTarea');
btnAgregarTarea.addEventListener('click',encolarTarea);

cargarUsuarios();

const login = (event) =>{
    let email = document.getElementById('InputEmail1').value;
    let pass = document.getElementById('InputPassword1').value;

    let toastLogin = document.getElementById('toastLogin');
    let textoToast = document.getElementById('avisoLogin');

    

    if(verificarUsuario(email,pass)){
        //USUARIO LOGEADO CON EXITO
        textoToast.innerHTML = 'Inicio de sesion exitoso';
        seccionTareas.style.display  = '';
        seccionLogin.style.display  = 'none';

        let usuarioLogeado = {
            user: email,
            pass: pass
        }

        localStorage.setItem("user",JSON.stringify(usuarioLogeado));
    }else{
        //USUARIO Y CONTRASENIA EQUIVOCADAS
        textoToast.innerHTML = 'El usuario o la contraseña estan mal';
    }

    const toast = new bootstrap.Toast(toastLogin);
    toast.show()
}


const verificarUsuario = (email,pass) => {
    return usuariosDisponibles.find(u => u.email == email && u.contrasenia == pass);
}

let btnIniciarSesion = document.getElementById('btnLogin');
btnIniciarSesion.addEventListener('click',login);