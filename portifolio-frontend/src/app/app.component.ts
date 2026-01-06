// src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router'; // <<< IMPORTE ESTES
import { ApiService } from './api.service';
import { MascoteMensagens, MensagemDetalhe } from './mascote-mensagens.interface';
import { CommonModule } from '@angular/common';
import { MascotDialogComponent } from './mascot-dialog/mascot-dialog.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, // <<< Adicionado para a tag <router-outlet>
    RouterLink,   // <<< Adicionado para a diretiva [routerLink]
    CommonModule,
    MascotDialogComponent 
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  title = 'portifolio-frontend';
  
  dadosIdioma: MensagemDetalhe | null = null; 
  mapaIdiomas: { [key: string]: MensagemDetalhe } = {}; 

  mensagemErro: string = '';
  
  constructor(private apiService: ApiService) {} 
  
  ngOnInit(): void {
    this.carregarDadosGlobais();
  }

  carregarDadosGlobais(): void {
    this.apiService.getMascoteMensagens().subscribe({
      next: (data: MascoteMensagens) => {
        this.mapaIdiomas = data.idiomas; 
        this.setIdioma('pt');
      },
      error: (err) => {
        this.mensagemErro = 'Erro ao buscar dados globais do backend: ' + err.message;
        console.error('Erro de API:', err);
      }
    });
  }

  setIdioma(idioma: string): void {
    if (this.mapaIdiomas[idioma]) {
      this.dadosIdioma = this.mapaIdiomas[idioma];
    } else if (this.mapaIdiomas['pt']) {
       this.dadosIdioma = this.mapaIdiomas['pt'];
    }
  }

  handleIdiomaChange(idioma: string): void {
    this.setIdioma(idioma);
  }
}