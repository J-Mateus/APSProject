import { Component, OnInit } from '@angular/core';
import { Denuncia } from 'src/app/models/denuncia';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  cards: Denuncia[] = [
    {
      id: 1,
      nome: "Pessoa",
      tel: "(11) 3485-8842",
      logradouro: "Av. dos Autonomistas",
      cep: "32548-884",
      bairro: "Centro",
      cidade: "Osasco",
      uf: "SP",
      descricao: "Lixo acumulado na calçada próximo ao Habibs."
    }
  ]

  constructor() { }

  ngOnInit() {}

  apagarDenuncia(id) {
    console.log("DELETE", id);
  }

}
