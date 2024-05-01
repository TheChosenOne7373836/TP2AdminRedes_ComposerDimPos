/**
 * Express router paths go here.
 */


export default {
  Base: '/api',
  Users: {
    Base: '/users',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Conductores: {
    Base: '/conductores',
    Get: '/all',
    GetOne: '/get/:dni',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:dni',
  },
  Programas : { 
    Base: '/programas',
    Get: '/all',
    GetOne: '/get/:id',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
} as const;


/*
-----------------------------------------------Conductores----------------

http://127.0.0.1:3000/api/conductores/all

http://127.0.0.1:3000/api/conductores/add
{
  "conductor" : {
      "dni" : 1687, 
      "nombre": "a", 
      "apellido" : "b", 
      "fechaNacimiento" :"2024-04-04T18:08:06.297Z"
  }
}

http://127.0.0.1:3000/api/conductores/update
{
  "conductor" : {
      "dni" : 1687, 
      "nombre": "A", 
      "apellido" : "b", 
      "fechaNacimiento" :"2024-04-04T18:08:06.297Z"
  }
}

http://127.0.0.1:3000/api/conductores/get/1687

http://127.0.0.1:3000/api/conductores/delete/1687
[http://127.0.0.1:3000/api/conductores/get/1687]


-----------------------------------------------Programas----------------


http://127.0.0.1:3000/api/programas/all

http://127.0.0.1:3000/api/programas/get/1

http://127.0.0.1:3000/api/programas/add
{
  "programa" :{
  "id": 100,
  "nombre": "Pruscino-Show",
  "descripcion": "Nada",
  "horarios": [
    {
      "dia": "Jueves",
      "hora": "14:00"
    }
  ],
  "conductores": []
}
}

http://127.0.0.1:3000/api/programas/update
{
  "programa" :{
  "id": 100,
  "nombre": "Pruscino-Show",
  "descripcion": "Nadax2",
  "horarios": [
    {
      "dia": "Jueves",
      "hora": "12:00"
    }
  ],
  "conductores": []
}
}

http://127.0.0.1:3000/api/programas/get/100

http://127.0.0.1:3000/api/programas/delete/100
[http://127.0.0.1:3000/api/programas/get/100]
*/