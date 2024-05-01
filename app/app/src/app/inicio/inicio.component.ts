import { Component, inject } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  title = 'app';


  apiService = inject(ApiService);
  //constructor(private apiService: ApiService) { }
  getProgramas() {
    this.apiService.getProgramas().then((data) => {
      console.log(data);
    });
  }
  
  getProgramacion() {
    this.apiService.getProgramacion();
  }
  applyForm = new FormGroup({
    programName : new FormControl(''),
    dia1 : new FormControl(''),
    dia2 : new FormControl(''),
    dia3 : new FormControl(''),
    dia4 : new FormControl(''),
    dia5 : new FormControl(''),
    dia6 : new FormControl(''),
    dia7 : new FormControl('')
  });
  async submitApplication() {
    await this.apiService.enviar(
    this.applyForm.value.programName ?? '',
    this.applyForm.value.dia1 ?? '',
    this.applyForm.value.dia2 ?? '',
    this.applyForm.value.dia3 ?? '',
    this.applyForm.value.dia4 ?? '',
    this.applyForm.value.dia5 ?? '',
    this.applyForm.value.dia6 ?? '',
    this.applyForm.value.dia7 ?? ''
    );
    this.apiService.getProgramacion();
  }
  
  ngOnInit() {
    this.getProgramacion()
  }
  
}
