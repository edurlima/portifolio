// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { AppComponent } from './app.component'; // <-- ADICIONE ESTE IMPORT
import { ProjetosComponent } from './projetos/projetos.component';
import { JogosComponent } from './jogos/jogos.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: AppComponent },
    { path: 'projetos', component: ProjetosComponent }, 
    { path: 'jogos', component: JogosComponent }
];