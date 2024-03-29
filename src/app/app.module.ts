
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ListempresasdctfComponent } from './pages/private/listempresasdctf/listempresasdctf.component';
import { NgModule, ErrorHandler } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { TableModule } from 'primeng/table'
import { CgInputTextModule } from './components/cg-input-text/cg-input-text.module'
import { ProgressBarModule } from 'primeng/progressbar'
import {FileUploadModule} from 'primeng/fileupload';

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { DashboardComponent } from './pages/private/dashboard/dashboard.component'
import { PageNotFoundComponent } from './pages/public/page-not-found/page-not-found.component'
import { GlobalErrorHandler } from './guards/global-error-handler'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { DropdownModule } from 'primeng/dropdown'
import { DialogModule } from 'primeng/dialog'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { TableComponentComponent } from './components/table-component/table-component.component'
import { ModaisEmpresaComponent } from './components/modais-empresas/modais-empresa.component'
import { ModaisListagemEmpresasComponent } from './components/modais-listagem-empresas/modais-listagem-empresas.component'
import { ToastModule } from 'primeng/toast'
import { RippleModule } from 'primeng/ripple'
import { CheckboxModule } from 'primeng/checkbox'
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToggleButtonModule } from 'primeng/togglebutton'
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MessagesModule } from 'primeng/messages'
import { MessageModule } from 'primeng/message'
import { FiltrosListagemEmpresasComponent } from './components/filtros-listagem-empresas/modais-empresas/filtros-listagem-empresas.component'
import { FiltrosTelaPrincipalComponent } from './components/filtros-tela-principal/filtros-listagem-empresas/modais-empresas/filtros-tela-principal.component'
import { SidebarModule } from 'primeng/sidebar'
import { AccordionModule } from 'primeng/accordion'
import { TooltipModule } from 'primeng/tooltip'
import { MultiSelectModule } from 'primeng/multiselect'

const cgModules = [
  CgInputTextModule
]

const primeModules = [
  ProgressSpinnerModule,
  SidebarModule,
  CheckboxModule,
  NgxSpinnerModule,
  ToggleButtonModule,
  ProgressBarModule,
  AccordionModule,
  TableModule,
  ButtonModule,
  FileUploadModule,
  InputTextModule,
  DropdownModule,
  DialogModule,
  ToastModule,
  ToastModule,
  RippleModule,
  MessagesModule,
  MessageModule,
  TooltipModule,
  MultiSelectModule
]
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PageNotFoundComponent,
    ListempresasdctfComponent,
    TableComponentComponent,
    ModaisEmpresaComponent,
    ModaisListagemEmpresasComponent,
    FiltrosListagemEmpresasComponent,
    FiltrosTelaPrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ...cgModules,
    ...primeModules
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
