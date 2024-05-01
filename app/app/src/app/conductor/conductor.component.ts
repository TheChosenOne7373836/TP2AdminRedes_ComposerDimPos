import { Component, inject } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-conductor',
  standalone: true,
  imports: [RouterModule,
    ReactiveFormsModule],
  templateUrl: './conductor.component.html',
  styleUrl: './conductor.component.css'
})
export class ConductorComponent {
  title = 'app';
  id : number = 0;
  nombre: string = "";
  apellido: string = "";
  fechaNacimiento: Date = new Date();

  apiService = inject(ApiService);
  constructor(private route: ActivatedRoute) { }

  async ngOnInit() {
      this.route.params.subscribe(async params => {
      this.id = params['id'];      
      var conductor = await this.getConductorId(this.id);

      var list = Object.values(conductor);
      this.nombre = (list[1]);
      this.apellido = (list[2]);
      this.fechaNacimiento = (list[3]);
      console.log(list);
      })}
  
  
      async getConductorId(id : number) : Promise<Response> {
        const conductor =  this.apiService.getConductorId(id);
        return conductor;
      }
      async eliminar(){
        this.id = Number(this.id);
        this.apiService.eliminarConductor(this.id);
      }
      updateForm = new FormGroup({
        nombre : new FormControl(''),
        apellido : new FormControl(''),
        edad : new FormControl(''),

      });
      async modificar(){
        console.log("aaaaaaaaa");
        this.id = Number(this.id);

        const x: number = Number(this.updateForm.value.edad);

        const currentDateInMillis: number = Date.now();

        const millisecondsInXYears: number = x * 365 * 24 * 60 * 60 * 1000; 

        const newDateInMillis: number = currentDateInMillis - millisecondsInXYears;

      
        const newDate: Date = new Date(newDateInMillis);

        console.log(newDate);
        await this.apiService.modificarConductor(this.id, 
          this.updateForm.value.nombre ?? this.nombre, 
          this.updateForm.value.apellido ?? this.apellido, 
          newDate ?? Date.now()
        );
        }

  }
