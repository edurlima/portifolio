// src/app/mascote-mensagens.interface.ts

// Esta interface define a estrutura do objeto de apresentação e mascote para CADA IDIOMA.
export interface MensagemDetalhe {
    nome: string;
    titulo: string;
    mensagem: string;
    mascote: string;
}

// Esta interface define a estrutura do objeto principal que vem do endpoint Java.
// Ele é um mapa onde a chave é o idioma (ex: 'pt', 'en').
export interface MascoteMensagens {
  mensagens: { [key: string]: string; };
  idiomas: { [key: string]: MensagemDetalhe };
}