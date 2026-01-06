// src/app/contato/contato.component.ts

import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Contato } from '../contato.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {

  dadosContato: Contato = { nome: '', email: '', mensagem: '' };
  statusMensagem: string = '';
  enviando: boolean = false;

  constructor(private apiService: ApiService) { }

  enviarMensagem(): void {
    this.enviando = true;
    this.statusMensagem = '';

    if (!this.dadosContato.nome || !this.dadosContato.email || !this.dadosContato.mensagem) {
      this.statusMensagem = '❌ Por favor, preencha todos os campos obrigatórios.';
      this.enviando = false;
      return;
    }

    this.apiService.postContato(this.dadosContato).subscribe({
      next: (response: string) => {
        this.statusMensagem = '✅ Mensagem enviada! Resposta do servidor: ' + response;
        this.dadosContato = { nome: '', email: '', mensagem: '' };
        this.enviando = false;
        console.log(response);
      },
      error: (err: any) => {
        this.statusMensagem = '❌ Erro ao enviar. Verifique o console e o servidor Java.';
        this.enviando = false;
        console.error('Erro de envio:', err);
      }
    });
  }
}

export type { Contato };
