import { Component, OnInit } from '@angular/core';
import {NbSearchService} from "@nebular/theme";
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";

@Component({
  selector: 'ngx-atu-tabela-precos',
  templateUrl: './atu-tabela-precos.component.html',
  styleUrls: ['./atu-tabela-precos.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
  ],
})
export class AtuTabelaPrecosComponent implements OnInit {

  fornecedores = [{"id": 1, "nome": "Teste", "tabelaPreco": [{"codigo": 1, "tipo": "", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "", "qtdItens": 2, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}]},
    {"id": 2, "nome": "Joao", "tabelaPreco": [{"codigo": 1, "tipo": "", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "", "qtdItens": 2, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}]},
    {"id": 5, "nome": "Henrique", "tabelaPreco": [{"codigo": 1, "tipo": "", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "", "qtdItens": 2, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}]},
    {"id": 6, "nome": "Marcela", "tabelaPreco": [{"codigo": 1, "tipo": "", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "", "qtdItens": 2, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}]}, {"id": 1, "nome": "Teste", "tabelaPreco": [{"codigo": 5, "tipo": "", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "", "qtdItens": 2, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}]}, {"id": 7, "nome": "Pedro", "tabelaPreco": [{"codigo": 1, "tipo": "", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "", "qtdItens": 2, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}]}];

  constructor(private searchService: NbSearchService) { }

  ngOnInit() {
  }

}
