// src/app/mascot-dialog/mascot-dialog.component.ts

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MascoteMensagens } from '../mascote-mensagens.interface';
import { CommonModule } from '@angular/common'; // Adicione este import
import { FormsModule } from '@angular/forms'; // Adicione este import (se for usar o ngModel)

@Component({
  selector: 'app-mascot-dialog',
  templateUrl: './mascot-dialog.component.html',
  styleUrls: ['./mascot-dialog.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] // Inclua no imports
})
export class MascotDialogComponent implements OnInit {

  idiomaAtual: string = 'pt';
  mensagem: string = 'Carregando...'; 
  mensagensDicionario: { [key: string]: string } = {}; 

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.carregarMensagens();
  }

  carregarMensagens(): void {
    this.apiService.getMascoteMensagens().subscribe({
      next: (data: MascoteMensagens) => {
        // LINHA CRÍTICA: Extração do mapa de idiomas
        this.mensagensDicionario = data.mensagens; 
        this.definirMensagem(); // Define a mensagem inicial ('pt')
      },
      error: (err) => {
        this.mensagem = 'Erro ao carregar mensagens do backend.';
        console.error('Erro ao carregar mensagens da mascote:', err);
      }
    });
  }

  mudarIdioma(novoIdioma: string): void {
    this.idiomaAtual = novoIdioma;
    this.definirMensagem();
  }

  definirMensagem(): void {
    // Tenta usar o idioma atual, se não existir, volta para português
    if (this.mensagensDicionario[this.idiomaAtual]) {
      this.mensagem = this.mensagensDicionario[this.idiomaAtual];
    } else if (this.mensagensDicionario['pt']) {
      // Fallback para português
      this.mensagem = this.mensagensDicionario['pt'];
    }
    else {
      // Último recurso
      this.mensagem = 'Dicionário de idiomas não carregado.'; 
    }
  }
}