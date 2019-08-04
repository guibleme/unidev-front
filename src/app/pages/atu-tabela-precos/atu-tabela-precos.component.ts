import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NbSearchService, NbWindowService} from "@nebular/theme";
import {
  fadeInOnEnterAnimation,
  fadeOutDownOnLeaveAnimation,
  fadeOutOnLeaveAnimation,
  fadeOutUpAnimation, fadeOutUpOnLeaveAnimation
} from "angular-animations";

@Component({
  selector: 'ngx-atu-tabela-precos',
  templateUrl: './atu-tabela-precos.component.html',
  styleUrls: ['./atu-tabela-precos.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
    fadeOutDownOnLeaveAnimation(),
    fadeOutUpOnLeaveAnimation(),
  ],
})
export class AtuTabelaPrecosComponent implements OnInit {

  fornecedores = [
    {"id": 1, "nome": "Teste", "tabelaPreco": [{"codigo": 1, "tipo": "MME", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 2, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}]},
    {"id": 2, "nome": "Joao", "tabelaPreco": [{"codigo": 1, "tipo": "MME", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 2, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}]},
    {"id": 5, "nome": "Henrique", "tabelaPreco": [{"codigo": 1, "tipo": "TME", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 2, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}]},
    {"id": 6, "nome": "Marcela", "tabelaPreco": [{"codigo": 1, "tipo": "TME", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 2, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}]}, {"id": 1, "nome": "Teste", "tabelaPreco": [{"codigo": 5, "tipo": "TME", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 2, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}]}, {"id": 7, "nome": "Pedro", "tabelaPreco": [{"codigo": 1, "tipo": "TME", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 2, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}]}];

  searchData = '';

  resultFornecedores = [];
  alreadySearched: any;
  selectedFornecedor: any = {};
  selectedTabela: any = null;

  negociacaoObject: any;

  @ViewChild('contentTemplate', { static: false }) contentTemplate: TemplateRef<any>;


  constructor(private searchService: NbSearchService,
              private windowService: NbWindowService) {
    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.searchData = data.term;
        this.resultFornecedores = this.searchFornecedor(this.searchData);
      });
  }

  ngOnInit() {

  }

  searchFornecedor(searchData) {
    const localResult = this.fornecedores.filter(value => value.nome.includes(searchData.toString()));
    console.log(localResult);
    this.alreadySearched = true;
    return localResult;
  }


  openFonecedorWindow(fornecedor: any) {

    this.selectedFornecedor = fornecedor;

    this.windowService.open(
      this.contentTemplate,
      { title: `Detalhes do fornecedor ${this.selectedFornecedor.nome}` },
    );

  }
}
