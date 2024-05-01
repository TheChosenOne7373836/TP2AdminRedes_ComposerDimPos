import { Injectable } from '@angular/core';
import { response } from 'express';
import Programa from './programa/Programa';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'http://127.0.0.1:3000/api/';
  async getProgramas(): Promise<Object[]> {
    const response = await fetch(`${this.url}/programas/all`, { 
      method: 'GET', 
      mode: 'cors'})
    if (response.status === 200) {
      return await response.json();
    }else {
      return [];
    }
  }
  async getProgramaId(id : number): Promise<Response> {
    const response = await fetch(`${this.url}/programas/get/${id}`, { 
      method: 'GET', 
      mode: 'cors'})
    if (response.status === 200) {
      return await response.json();
    }else {
      return response; 
    }
  }
  
  async getConductorId(id : number): Promise<Response> {
    const response = await fetch(`${this.url}/conductores/get/${id}`, { 
      method: 'GET', 
      mode: 'cors'})
    if (response.status === 200) {
      return await response.json();
    }else {
      return response; 
    }
  }

  async eliminarConductor(id : number){
    const response = await fetch(`${this.url}conductores/delete/${id}`, { 
      method: 'DELETE', 
      mode: 'cors'})
    if (response.status === 200) {
      return await response;
    }else {
      return [];
    }
  }

  async modificarConductor(id : number, nombre? : string, apellido? : string, fechaNacimiento? : Date){
    var conductor = await this.getConductorId(id);
    var list = Object.values(conductor);
    var nombreAux : string = (list[1]);
    var apellidoAux : string = (list[2]);
    var fechaNacimientoAux : Date = (list[3]);
    if (nombre == ""){
      console.log("Falto Nombre");
      nombre = nombreAux;
    }
    if(apellido == ""){
      console.log("Falto Apellido");
      apellido = apellidoAux;
    }
    if(fechaNacimiento == null){
      console.log("Falto Fecha de Nacimiento");
      fechaNacimiento = fechaNacimientoAux;
    }
    const jsonData = (
      {
      conductor: {
        dni: id,
        nombre: nombre,
        apellido: apellido,
        fechaNacimiento: fechaNacimiento
      }
      }
    );
    console.log(jsonData);
    const response = await fetch(`${this.url}conductores/update`, { 
      method: 'PUT', 
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
        },
      body: JSON.stringify(jsonData),
      })
    if (response.status === 200 ) {
      return await response.json();
    }else {
      return [];
    }
  }

  async traducirDia(dia : String) : Promise<number> {
    //j(1=lunes 2=martes 3=miercoles 4=jueves 5=viernes 6=sabado 7=domingo)
     switch(dia.toLowerCase()){
      case "lunes" :
        return 1;
      case "martes" :
        return 2;
      case "miercoles" :
        return 3;
      case "jueves" :
        return 4;
      case "viernes" :
        return 5;
      case "sabado" :
        return 6;
      case "domingo" :
        return 7;
      default :  
        return 0; 
    }
  }
  async traducirHora(hora : String) : Promise<number> {
    //i(1=00:00 2=02:00 3=04:00 4=06:00 5=08:00 6=10:00 7=12:00 8=14:00 9=16:00 10=18:00 11=20:00 12=22:00 13=24:00)
    switch(hora){
      case "00:00" :
        return 0;
      case "02:00" :
        return 2;
      case "04:00" :
        return 4;
      case "06:00" :
        return 6;
      case "08:00" :
        return 8;
      case "10:00" :
        return 10;
      case "12:00" :
        return 12;
      case "14:00" :
        return 14;
      case "16:00" :
        return 16;
      case "18:00" :
        return 18;
      case "20:00" :
        return 20;
      case "22:00" :
        return 22;
      case "24:00" :
        return 24;
      default :  
        return 0; 
    }
  }
  async vaciarTabla(){
    var table = await document.querySelector('.schedule') as HTMLTableElement; // Type assertion
    if(table != null){
      for (var i = 1; i < 8; i++) {
        for (var j = 0; j <= 24; j+=2) {
          var cell = await table.getElementsByClassName('content'+j+i);
          cell[0].innerHTML = "";
        }
      }
    }
  }
  async getConductores(): Promise<Object[]> {
    /*let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', `http://127.0.0.1:3000`);*/
    const response = await fetch(`${this.url}/conductores/all`, { 
      method: 'GET', 
      mode: 'cors'})
    if (response.status === 200 || response.status === 304) {
      return await response.json();
    }else {
      return [];
    }
  }
  async getProgramacion() {
    await this.vaciarTabla  ();
    var response = await this.getProgramas();
    var table = document.querySelector('.schedule') as HTMLTableElement; // Type assertion
    var list = Object.values(response)[0];
    var list2 = JSON.parse(JSON.stringify(list));

    for (var z = 0; z < list2.length; z++) {//programas
      if(list2[z].horarios != null){
        var dias = await JSON.parse(JSON.stringify(Object.values(list2[z].horarios)));
        
        for (var x = 0; x < dias.length; x++) { //horarios del programa
          var auxDia = await this.traducirDia(dias[x].dia);
          var auxHora = await this.traducirHora(dias[x].hora);
          var cell = table.getElementsByClassName('content'+auxHora+auxDia);
          cell[0].innerHTML += '<a href="/programa/'+list2[z].id+'">'+ list2[z].nombre+'</a> <br>';    
        }
      }
    }
  }
  async idNuevo() : Promise<number>{
    var response = await this.getProgramas();
    var list = Object.values(response)[0];
    var list2 = JSON.parse(JSON.stringify(list));
    var aux;
    var id = 1;
    for (var z = 0; z < list2.length; z++) {//programas
      var aux = list2[z].id;
      if(id <= aux){
        id = aux + 1;
      }
    }
  
    console.log("Id nuevo: "+id);
    return id;
  }

  async enviar(nombre : string, dia1 : string, dia2 : string, dia3 : string, dia4 : string, dia5 : string, dia6 : string, dia7 : string){
    var horarios = [];
    if(dia1 != ""){
      dia1 = dia1+":00";
      horarios.push({dia: "lunes", hora: dia1});
    }
    if(dia2 != ""){
      dia2 = dia2+":00";
      horarios.push({dia: "martes", hora: dia2});
    }
    if(dia3 != ""){
      dia3 = dia3+":00";
      horarios.push({dia: "miercoles", hora: dia3});
    }
    if(dia4 != ""){
      dia4 = dia4+":00";
      horarios.push({dia: "jueves", hora: dia4});
    }
    if(dia5 != ""){
      dia5 = dia5+":00";
      horarios.push({dia: "viernes", hora: dia5});
    }
    if(dia6 != ""){
      dia6 = dia6+":00";
      horarios.push({dia: "sabado", hora: dia6});
    }
    if(dia7 != ""){
      dia7 = dia7+":00";
      horarios.push({dia: "domingo", hora: dia7});
    }
    var idN : number = await this.idNuevo();
    const jsonData = (
      {
      programa: {
        id: idN,
        nombre: nombre,
        descripcion: "",
        horarios: horarios,
        conductores: []
      }
      }
    );
    console.log(jsonData);
    const response = await fetch(`${this.url}programas/add`, { 
      method: 'POST', 
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
        },
      body: JSON.stringify(jsonData),
      })
    if (response.status === 200 ) {
      return await response.json();
    }else {
      return [];
    }
    
  }
  async eliminarPrograma(id : number){
    const response = await fetch(`${this.url}programas/delete/${id}`, { 
      method: 'DELETE', 
      mode: 'cors'})
    if (response.status === 200) {
      return await response;
    }else {
      return [];
    }
}
  async modificarPrograma(id : number, nombre : string, descripcion: string,dia1 : string, dia2 : string, dia3 : string, dia4 : string, dia5 : string, dia6 : string, dia7 : string){
    var horarios = [];
    if(dia1 != ""){
      dia1 = dia1+":00";
      horarios.push({dia: "lunes", hora: dia1});
    }
    if(dia2 != ""){
      dia2 = dia2+":00";
      horarios.push({dia: "martes", hora: dia2});
    }
    if(dia3 != ""){
      dia3 = dia3+":00";
      horarios.push({dia: "miercoles", hora: dia3});
    }
    if(dia4 != ""){
      dia4 = dia4+":00";
      horarios.push({dia: "jueves", hora: dia4});
    }
    if(dia5 != ""){
      dia5 = dia5+":00";
      horarios.push({dia: "viernes", hora: dia5});
    }
    if(dia6 != ""){
      dia6 = dia6+":00";
      horarios.push({dia: "sabado", hora: dia6});
    }
    if(dia7 != ""){
      dia7 = dia7+":00";
      horarios.push({dia: "domingo", hora: dia7});
    }
    id = id as number;
    
    var programa = await this.getProgramaId(id);

    var list = Object.values(programa);
    var nombreAux : string = (list[1]);
    var descripcionAux : string = (list[2]);
    if (nombre == ""){
      console.log("Falto Nombre");
      nombre = nombreAux;
    }
    if(descripcion == ""){
      console.log("Falto Descripcion");
      descripcion = descripcionAux;
    }
    if(horarios.length == 0){
      console.log("Falto Horario");
      horarios=list[3]
    }
    
    const jsonData = (
      {
      programa: {
        id: id,
        nombre: nombre,
        descripcion: descripcion,
        horarios: horarios,
        conductores: []
      }
      }
    );
    console.log(jsonData);
    const response = await fetch(`${this.url}programas/update`, { 
      method: 'PUT', 
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
        },
      body: JSON.stringify(jsonData),
      })
    if (response.status === 200 ) {
      return await response.json();
    }else {
      return [];
    }
  }
  
}