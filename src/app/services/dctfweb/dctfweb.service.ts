import { environment } from './../../../environments/environment'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { PaginatorDcftCompetencias } from 'src/app/interfaces/dctfweb/DctfCompetencias'
import { Paginator } from 'primeng/paginator'
import { Observable } from 'rxjs'
import { SessionService } from '../global/session.service'

@Injectable({
  providedIn: 'root'
})
export class DctfWeb {
  session: any
  constructor (private http: HttpClient, private sessionService: SessionService) {
    this.session = this.sessionService.session
    console.log('sesao sendo utilizada')
    console.log(this.sessionService.session)
  }

  getAllDctfCompetencias () { return this.http.get<PaginatorDcftCompetencias>(environment.apiUrl + 'dctfweb') }

  getDctfCompetenciasFindBy (objSend: any) {
    return this.http.get<PaginatorDcftCompetencias>(environment.apiUrl + 'dctfweb', { params: objSend, headers: { userid: this.session.id_usuario } })
  }

  getPageLink (pageurl: string, objSend = {}):Observable<Paginator> {
    const url = pageurl
    return this.http.get<any>(url, { params: objSend, headers: { userid: this.session.id_usuario } })
  }

  searchCompetencias (stringSearch: string):Observable<Paginator> {
    return this.http.post<any>(environment.apiUrl + 'dctfweb/search', { stringSearch: stringSearch }, { headers: { userid: this.session.id_usuario } })
  }

  updateStatusCompetencias (objSend: any):Observable<Paginator> {
    return this.http.post<any>(environment.apiUrl + 'dctfweb/updatestatuscompetencia', objSend, { headers: { userid: this.session.id_usuario } })
  }

  createEmpresa (objSend: any):Observable<Paginator> {
    return this.http.post<any>(environment.apiUrl + 'dctfweb/createempresadctf', objSend, { headers: { userid: this.session.id_usuario } })
  }

  updateEmpresaDctf (objSend: any):Observable<Paginator> {
    return this.http.post<any>(environment.apiUrl + 'dctfweb/updateempresadctf', objSend, { headers: { userid: this.session.id_usuario } })
  }

  getEmpresasModal (objSend: any):Observable<Paginator> {
    return this.http.post<any>(environment.apiUrl + 'dctfweb/empresasmodal', objSend, { headers: { userid: this.session.id_usuario } })
  }

  getAllDctfCompetenciasReport () {
    return this.http.get<PaginatorDcftCompetencias>(environment.apiUrl + 'dctfweb??page=' + '1000', { headers: { userid: this.session.id_usuario } })
  }

  gerarCompetencia (objSend: any):Observable<Paginator> {
    return this.http.post<any>(environment.apiUrl + 'dctfweb/gerarcompetencia', objSend, { headers: { userid: this.session.id_usuario } })
  }

  getCompetencia ():Observable<Paginator> {
    return this.http.get<any>(environment.apiUrl + 'dctfweb/getcompetencias')
  }

  getListaEmpresasDctf (objSend: any, searchString = ''):Observable<Paginator> {
    // eslint-disable-next-line dot-notation
    objSend['searchstring'] = searchString
    return this.http.get<any>(environment.apiUrl + 'dctfweb/listaempresasdctf', { params: objSend, headers: { userid: this.session.id_usuario } })
  }

  getUsuariosAtivosBySetor (objSend: any):Observable<Paginator> {
    return this.http.get<any>(environment.apiUrl + 'dctfweb/listaempresasdctf', { params: objSend, headers: { userid: this.session.id_usuario } })
  }

  deleteEmpresaDctf (objSend: any) {
    return this.http.delete<any>(environment.apiUrl + 'dctfweb/deleteempresadctf', { params: objSend, headers: { userid: this.session.id_usuario } })
  }

  getEmailEmpresa (objSend: any) {
    return this.http.get<any>(environment.apiUrl + 'dctfweb/getemailsempresa', { params: objSend, headers: { userid: this.session.id_usuario } })
  }

  saveEmailEmpresa (objSend: any) {
    return this.http.post<any>(environment.apiUrl + 'dctfweb/saveemailsempresa', objSend, { headers: { userid: this.session.id_usuario } })
  }

  updateEmailEmpresa (objSend: any) {
    return this.http.post<any>(environment.apiUrl + 'dctfweb/updateemailsempresa', objSend, { headers: { userid: this.session.id_usuario } })
  }

  deleteEmailEmpresa (objSend: any) {
    return this.http.post<any>(environment.apiUrl + 'dctfweb/deleteemailempresa', objSend, { headers: { userid: this.session.id_usuario } })
  }
}
