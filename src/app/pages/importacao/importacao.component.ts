import { Component, OnInit } from '@angular/core';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import {NbToastrService} from "@nebular/theme";
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

  results = [];

  totalAdvertencias = 13000;
  totalLinhas = 100000;
  totalCorretas = 87000;
  percentResult = this.totalAdvertencias / this.totalLinhas;
  statusPercent: any;

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
              private http: HttpClient) { }


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
    if (this.percentResult >= 0.2) {
      this.statusPercent = 'danger';
      return false;
    }else {
      this.statusPercent = 'primary';
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
}

