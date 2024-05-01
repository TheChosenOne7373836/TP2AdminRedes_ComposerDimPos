import { Component, inject } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio-conductor',
  standalone: true,
  imports: [RouterModule,
    ReactiveFormsModule,
  CommonModule],
  templateUrl: './inicio-conductor.component.html',
  styleUrl: './inicio-conductor.component.css'
})
export class InicioConductorComponent {
  title = 'app';
  id : number = 0;
  nombre: string = "";
  apellido: string = "";
  fechaNacimiento: Date = new Date();
  apiService = inject(ApiService);
  conductores : object = [];
  data : String[] = [];
  data2 : any[] = [];
  constructor(private route: ActivatedRoute) { }
  async ngOnInit() {
    this.route.params.subscribe(async params => {
      var response = await this.apiService.getConductores();
      var list = Object.values(response)[0];
      var list2 = JSON.parse(JSON.stringify(list));
      this.conductores = list2; 
      this.conseguirData(list2); 
    })
  } 
  async conseguirData(list2 : any[]){
    console.log(list2.length);
    for (let i = 0; i < list2.length; i++){
      console.log(list2[i].nombre);
      this.data[i] = " Nombre: "+ list2[i].nombre + " Apellido: " + list2[i].apellido + " Fecha de Nacimiento: " + list2[i].fechaNacimiento; 
      this.data2[i] = list2[i].dni;
      console.log(this.data2[i]);
    }
    console.log(this.data); 
  }
}

