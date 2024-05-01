import { Component, inject } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Programa from './Programa';

@Component({
  selector: 'app-programa',
  standalone: true,
  imports: [RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './programa.component.html',
  styleUrl: './programa.component.css'
})



export class ProgramaComponent {
  title = 'app';
  id : number = 0;
  nombre: string = "";
  descripcion: string = "";

  
  apiService = inject(ApiService);
  constructor(private route: ActivatedRoute) { }



  async ngOnInit() {
      this.route.params.subscribe(async params => {
      this.id = params['id'];      
      var programa = await this.getProgramaId(this.id);

      var list = Object.values(programa);
      this.nombre = (list[1]);
      this.descripcion = (list[2]);

      })};

  async getProgramaId(id : number) : Promise<Response> {
    const programa =  this.apiService.getProgramaId(id);
    return programa;
  }
  async eliminar(){
    this.apiService.eliminarPrograma(this.id);
  }
  updateForm = new FormGroup({
    programName : new FormControl(''),
    descripcion : new FormControl(''),
    dia1 : new FormControl(''),
    dia2 : new FormControl(''),
    dia3 : new FormControl(''),
    dia4 : new FormControl(''),
    dia5 : new FormControl(''),
    dia6 : new FormControl(''),
    dia7 : new FormControl('')
  });
  async modificar(){
    console.log("modif")    
    this.id = Number(this.id);
    await this.apiService.modificarPrograma(
      this.id ,
      this.updateForm.value.programName ?? '',
      this.updateForm.value.descripcion ?? '',
      this.updateForm.value.dia1 ?? '',
      this.updateForm.value.dia2 ?? '',
      this.updateForm.value.dia3 ?? '',
      this.updateForm.value.dia4 ?? '',
      this.updateForm.value.dia5 ?? '',
      this.updateForm.value.dia6 ?? '',
      this.updateForm.value.dia7 ?? ''
      );
  }
  
}
