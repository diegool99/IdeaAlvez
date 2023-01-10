class Usuario {
  //CONSTRUCTOR
  constructor(nombre, email, contrasenia) {
    this.nombre = nombre;
    this.email = email;
    this.contrasenia = contrasenia;
  }

  //GETTERS

  get getNombre() {
    return this.nombre;
  }

  get getEmail() {
    return this.email;
  }

  get getContrasenia() {
    return this.contrasenia;
  }

  //SETTERS

  /**
     * @param {String} nombreNuevo
     */
  set setCategoria(nombreNuevo){
    return this.nombre = nombreNuevo;
}

  /**
     * @param {String} emailNuevo
     */
  set setEmail(emailNuevo){
    return this.email = emailNuevo;
}

  /**
     * @param {String} contraseniaNueva
     */
  set setEmail(contraseniaNueva){
    return this.contrasenia = contraseniaNueva;
}

}
