import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import {NbToastrService, NbWindowService} from "@nebular/theme";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HttpServiceService} from "../../services/http-service.service";

const endpoint = 'http://192.168.1.38:3001';
const httpformData = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'mimetype': 'application/xml' }),
};

@Component({
  selector: 'ngx-importacao',
  templateUrl: './importacao.component.html',
  styleUrls: [`./importacao.component.scss`],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
  ],
})
export class ImportacaoComponent implements OnInit {

  files: NgxFileDropEntry[] = [];

  // TODO static must be false as of Angular 9.0.0
  @ViewChild('popoverDivergencias', { static: false }) popoverDivergencias: TemplateRef<any>;


  results = [];

  totalAdvertencias = 3;
  totalLinhas = 5;
  totalCorretas = this.totalLinhas - this.totalAdvertencias ;
  percentResult = this.totalAdvertencias / this.totalLinhas;
  statusPercent: any;

  listaDivergencias: any =  [
    {"codProcedimento": "408259", dataExecucao: "08/05/2019", "valorTotal": 189.59, "status": 3, descStatus: "Valor unitário maior que a tabela de preço"},
    {"codProcedimento": "408456", dataExecucao: "07/05/2019", "valorTotal": 250.59, "status": 4, descStatus: "Código não autorizado para o prestador"},
    {"codProcedimento": "408259", dataExecucao: "10/05/2019", "valorTotal": 178.59, "status": 4, descStatus: "Código não autorizado para o prestador"}
      ];

  states = [
    {
      id: 0,
      name: 'Início',
    },
    {
      id: 1,
      name: 'Realizando upload',
    },
    {
      id: 2,
      name: 'Analizando',
    },
    {
      id: 3,
      name: 'Confirmação',
    },
    {
      id: 4,
      name: 'Processo finalizado',
    },
  ];

  viewState = 0;

  constructor(private toastrService: NbToastrService,
              private httpService: HttpServiceService,
              private http: HttpClient,
              private windowService: NbWindowService) { }


  ngOnInit() {
    this.checkPercent();
  }

  checkState() {
    return this.states[this.viewState];
  }

  checkStateBool(state: number) {
  return (this.viewState === state);
  }

  checkPercent() {
    if (this.percentResult === 0) {
      this.statusPercent = 'primary';
      return true;
    }else if (this.percentResult >= 0.2) {
      this.statusPercent = 'danger';
      return false;
    }else {
      this.statusPercent = 'warning';
      return true;
    }
  }

  public dropped(files: NgxFileDropEntry[]) {
    let localFiles = files;
    console.log(localFiles);
    for (const droppedFile of localFiles) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {

        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        console.log(fileEntry);
        fileEntry.file((file: File) => {

          // console.log(droppedFile.relativePath, file);

          if (file.type === 'text/xml') {
            this.files.push(droppedFile);

          }else {
            this.toastrService.danger('Apenas arquivos do tipo .XML são aceitos',
              'Ocorreu um erro',  { preventDuplicates: true });
          }
        });
      }
    }
    this.viewState = 1;

  }

  public sendToAnalysis() {
    this.viewState = 2;
    const localFiles = this.files;

    for (const droppedFile of localFiles) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {

        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          console.log(droppedFile.relativePath, file);
          if (file.type === 'text/xml') {
            // this.files.push(droppedFile);

            let objeto = new FormData();
            objeto.append('fileName', file, droppedFile.relativePath);

            const url = endpoint + '/xml';

            this.http
              .post(url, objeto, httpformData)
              .subscribe((val) => {
                console.log(val);
              });

          }
        });
      }
    }
    this.results = this.files;
  }

  public fileOver(event) {
    // console.log(event);
  }

  public fileLeave(event) {
    // console.log(event);
  }

  removeItem(item: number) {
    this.files.splice(item, 1);
  }

  removeAll() {
    this.files = [];
    this.viewState = 0;
  }

  openWindow(item) {
    this.windowService.open(
      this.popoverDivergencias,
      { title: 'Divergências encontradas' },
    );
  }
}

