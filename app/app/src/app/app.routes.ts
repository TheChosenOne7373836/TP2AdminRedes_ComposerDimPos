import { Routes } from '@angular/router';
import { ConductorComponent } from './conductor/conductor.component';
import { ProgramaComponent } from './programa/programa.component';
import { InicioComponent } from './inicio/inicio.component';
import { InicioConductorComponent } from './inicio-conductor/inicio-conductor.component';

export const routes: Routes = [
   // {path:"conductor", component: ConductorComponent},
    {path:"conductor/:id", component: ConductorComponent},
    {path:"programa/:id", component: ProgramaComponent},
    {path:"inicio", component: InicioComponent},
    {path:"", component: InicioComponent},
    {path:"inicio-conductor", component: InicioConductorComponent},
    {path:"**", redirectTo: "home" }
];
