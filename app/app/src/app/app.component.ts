import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';
  constructor(private apiService: ApiService) { }
  getConductores() {
    this.apiService.getConductores().then((data) => {
      console.log(data);
    });
  }
  getProgramas() {
    this.apiService.getProgramas().then((data) => {
      console.log(data);
    });
  }
  getProgramacion() {
    this.apiService.getProgramacion();
  }

}
