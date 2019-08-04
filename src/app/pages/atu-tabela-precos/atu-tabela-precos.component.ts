import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NbSearchService, NbToastrService, NbWindowService} from "@nebular/theme";
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
    {"id": 1, "nome": "APS - ASSISTENCIA PERSONAL A SAUDE", "tabelaPreco": [{"codigo": 1, "tipo": "HOS", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "MED", "qtdItens": 2, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "MAT", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}]},
    // {"id": 2, "nome": "Joao", "tabelaPreco": [{"codigo": 1, "tipo": "MME", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 2, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}]},
    // {"id": 5, "nome": "Henrique", "tabelaPreco": [{"codigo": 1, "tipo": "TME", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 2, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}]},
    // {"id": 6, "nome": "Marcela", "tabelaPreco": [{"codigo": 1, "tipo": "TME", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 2, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}]},
    // {"id": 1, "nome": "Teste", "tabelaPreco": [{"codigo": 5, "tipo": "TME", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 2, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}]},
    // {"id": 7, "nome": "Pedro", "tabelaPreco": [{"codigo": 1, "tipo": "TME", "qtdItens": 8, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 2, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}]},
    // {"id": 7, "nome": "Marcelina", "tabelaPreco": [{"codigo": 1, "tipo": "TME", "qtdItens": 10, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 2, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}]},
    // {"id": 7, "nome": "Marcos", "tabelaPreco": [{"codigo": 1, "tipo": "TME", "qtdItens": 9, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 2, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}]},
    // {"id": 7, "nome": "Mauricio", "tabelaPreco": [{"codigo": 1, "tipo": "TME", "qtdItens": 7, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 2, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}]},
    // {"id": 7, "nome": "Mariana", "tabelaPreco": [{"codigo": 1, "tipo": "TME", "qtdItens": 5, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 2, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}]},
    // {"id": 7, "nome": "Monalisa", "tabelaPreco": [{"codigo": 1, "tipo": "TME", "qtdItens": 12, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 2, "dateVigenciaAtual": "20/05/2019"}, {"codigo": 2, "tipo": "TME", "qtdItens": 3, "dateVigenciaAtual": "20/05/2019"}]},

    ];

  searchData = '';

  resultFornecedores = [];
  alreadySearched: any;
  selectedFornecedor: any = {};
  selectedTabela: any = null;

  negociacaoObject= {
    taxa: 0,
    date: new Date(),
  };

  @ViewChild('contentTemplate', { static: false }) contentTemplate: TemplateRef<any>;
  listaItens: any = [
    {"codigo": 40812075, "descricao": "ANGIOGRAFIA", "valorFilme": 10.75, "valorTotal": 135.75, "valorNovo": 135.75},
    {"codigo": 40812086, "descricao": "ABDOME AGUDO", "valorFilme": 109.75, "valorTotal": 325.75, "valorNovo": 325.75},
    {"codigo": 40852074, "descricao": "SEIOS DA FACE", "valorFilme": 508.38, "valorTotal": 12.75, "valorNovo": 12.75},
    {"codigo": 40811068, "descricao": "OSSOS DA FACE", "valorFilme": 790.75, "valorTotal": 42.75, "valorNovo": 42.75},
    {"codigo": 40809045, "descricao": "CLAVICULA", "valorFilme": 1100.79, "valorTotal": 351, "valorNovo": 351},
    {"codigo": 40810077, "descricao": "BRACO", "valorFilme": 856.74, "valorTotal": 51, "valorNovo": 51},
    {"codigo": 40809074, "descricao": "MAXILAR INFERIOR", "valorFilme": 985.75, "valorTotal": 35.75, "valorNovo": 35.75},
    {"codigo": 40812072, "descricao": "ANGIOGRAFIA", "valorFilme": 1892.75, "valorTotal": 35.75, "valorNovo": 35.75}
    ];


  constructor(private searchService: NbSearchService,
              private windowService: NbWindowService,
              private toastrService: NbToastrService) {
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

  calculaValorNovo() {
    this.listaItens.forEach(element => {

      element.valorNovo =
        parseFloat((element.valorTotal * ( this.negociacaoObject.taxa > 0 ? (1 + (this.negociacaoObject.taxa / 100)) : 1)).toFixed(2));
    });
  }

  closeModal() {
    this.selectedTabela = null;
    this.selectedFornecedor = null;

    this.toastrService.primary('Tabela de preço salva', 'Sucesso');
  }
}
