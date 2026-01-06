// src/app/api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apresentacao } from './apresentacao.interface';
import { MascoteMensagens } from './mascote-mensagens.interface';
import { Jogo } from './jogos/jogos..interface';
import { Projeto } from './projetos/projetos.interface';
import { Contato } from './contato.interface'; // NOVO: Interface para o formulário de contato

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private apiUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) { }
  
  // 1. Método para buscar dados da Home
  getApresentacaoData(): Observable<Apresentacao> {
    const endpoint = '/apresentacao/sobre-mim';
    return this.http.get<Apresentacao>(this.apiUrl + endpoint); 
  }

  // 2. Método para buscar mensagens da Mascote (Idiomas)
  getMascoteMensagens(): Observable<MascoteMensagens> {
    const endpoint = '/mascote/mensagens';
    return this.http.get<MascoteMensagens>(this.apiUrl + endpoint); 
  }

  // 3. Método para buscar a lista de Jogos
  getListaJogos(): Observable<Jogo[]> {
    const endpoint = '/dados/jogos';
    return this.http.get<Jogo[]>(this.apiUrl + endpoint); 
  }

  // 4. Método para buscar a lista de Projetos
  getListaProjetos(): Observable<Projeto[]> {
    const endpoint = '/dados/projetos';
    return this.http.get<Projeto[]>(this.apiUrl + endpoint); 
  }
  
  // 5. Método POST para enviar dados de Contato
  postContato(dados: Contato): Observable<string> {
    const endpoint = '/contato/enviar';
    // O responseType: 'text' é necessário porque o backend Java retorna uma string simples.
    return this.http.post(this.apiUrl + endpoint, dados, { responseType: 'text' }); 
  }
}