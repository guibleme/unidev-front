import { NgModule } from '@angular/core';
import {NbAlertModule, NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule, NbMenuModule} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ImportacaoComponent } from './importacao/importacao.component';
import {NgxFileDropModule} from 'ngx-file-drop';
import {FormsModule} from "@angular/forms";
import { AtuTabelaPrecosComponent } from './atu-tabela-precos/atu-tabela-precos.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    NbLayoutModule,
    NbCardModule,
    NgxFileDropModule,
    NbButtonModule,
    NbIconModule,
    NbAlertModule,
    FormsModule,
    MiscellaneousModule,
  ],
  declarations: [
    PagesComponent,
    ImportacaoComponent,
    AtuTabelaPrecosComponent,
  ],
})
export class PagesModule {
}
