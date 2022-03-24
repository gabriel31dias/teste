import { DctfWeb } from './../../services/dctfweb/dctfweb.service'
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core'
import { CompetenciasDcft } from 'src/app/interfaces/dctfweb/DctfCompetencias';
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.css']
})
export class TableComponentComponent implements OnInit {
  @Input() last: number;
  @Input() currentlast: number;
  @Input() totaldata: number; // -> usado para paginar, recebe o valor total de registros
  @Input() data = [];
  @Input() idsetor:any;
  cities: any
  selectedCityCode: string
  displayModal: boolean = false;
  displayModalCreateEmpresa: boolean = false ;
  modalcreate: any;
  searchValue: string
  competenciaModal: any ;
  competenciaModalStatusCompetencia: any ;
  modalstatusCompetencia: boolean = false ;

  @Output() loadnextpage = new EventEmitter<{last: any, table: any}>(); // -> usado emitir evento de next page, para trazer mais dados
  @Output() loadbackpage = new EventEmitter<{last: any, table: any}>(); // -> usado para emitir event de back page, para voltar algums registros
  @Output() searchdata = new EventEmitter<{value: any}>(); // -> usado para emitir event de pesquisa de dados

  @ViewChild('competencia') inputCompetencia: any;
  @ViewChild('empresa') inputEmpresa: any;
  @ViewChild('status') inputStatus: any;
  @ViewChild('prioridade') inputPrioridade: any;
  @ViewChild('faturamento') inputFatramento: any;
  @ViewChild('comentario') inputComentario: any;

  constructor (private dctfWebService: DctfWeb) {
    this.totaldata = 0
    this.currentlast = 0
    this.last = 0
    this.totaldata = 0
    this.selectedCityCode = ''
    this.searchValue = ''
    this.competenciaModal = {
      id_empresa_competencia: 1
    }
    this.competenciaModalStatusCompetencia = {
      id_empresa_competencia: 1
    }
  }

  ngAfterViewInit () {

  }

  ngOnInit (): void {
    this.cities = [
      { name: '11/2021', value: '59' },
      { name: '10/2021', value: '56' },
      { name: '7/2021', value: '53' },
      { name: '7/2021', value: '52' },
      { name: '7/2021', value: '52' },
      { name: '7/2021', value: '51' },
      { name: '7/2021', value: '50' }
    ]

    this.modalcreate = [{
      competencia: '',
      empresa: '',
      status: '',
      prioridade: '',
      faturamento: '',
      comentario: ''
    }]
  }

  searchData () {
    this.searchdata.emit({ value: this.searchValue })
  }

  openModalNewEmpresaDctf (competencia: CompetenciasDcft) {
    this.competenciaModal = competencia
    this.displayModalCreateEmpresa = true
  }

  openModalStatusCompetencia (competencia: CompetenciasDcft) {
    this.competenciaModalStatusCompetencia = competencia
    this.modalstatusCompetencia = true
  }

  salvarDctf () {
    const objSend = {
      competencia: this.inputCompetencia.nativeElement.value,
      empresa: this.inputEmpresa.nativeElement.value,
      status: this.inputStatus.nativeElement.value,
      prioridade: this.inputPrioridade.nativeElement.value,
      faturamento: this.inputFatramento.nativeElement.value,
      comentario: this.inputComentario.nativeElement.value
    }

    this.dctfWebService.createEmpresa(objSend).subscribe(
      (result: any) => {
      })
  }

  go () {
    console.log(this.inputCompetencia.nativeElement.value)
    console.log(this.inputEmpresa.nativeElement.value)
    console.log(this.inputStatus.nativeElement.value)
  }

  exportDataToXlsx () {
    /* pass here the table id */
    // const element = document.getElementById('excel-table')
    this.dctfWebService.getAllDctfCompetencias().subscribe(
      (competencias: any) => {
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(competencias.data)

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

        /* save to file */
        XLSX.writeFile(wb, 'dwawda.xlsx')
      })
  }

  loadPage (event:any, table:any) {
    if (event.first > this.currentlast) {
      this.loadnextpage.emit({ last: event.first, table: table })
    }
    if (event.first < this.currentlast) {
      this.loadbackpage.emit({ last: event.first, table: table })
    }
  }

  modalCreate () {
  }
}
