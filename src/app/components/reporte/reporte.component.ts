import { Component, HostListener, OnInit } from '@angular/core';
import { ScaleType } from '@swimlane/ngx-charts';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas'; 
import { ReporteService } from 'src/app/services/reporte.service';
 

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  reporte: any;
  spinner = false;

  view: [number, number] = [700, 400]

  valorPrimero: any = [];
  valorSecundario: any = [];
  valorTerciario: any = [];
  valorCuarto: any = [];

  constructor(private reporteService: ReporteService) { 
    
  }

  ngOnInit(): void {
    if(sessionStorage['reporte'] == " "){
      this.getReporte();
    }
    else{
      this.reporte = JSON.parse(sessionStorage.getItem('reporte') || '{}');
      sessionStorage.removeItem('reporte');
    }

    this.cantidadClientes();
    this.scorePromedio();
    this.clientesNivel();
  }

  getReporte(){
    this.reporte = this.reporteService.setReporte();
  }

  cantidadClientes(){

    let single = [];
    for(let i=0; i< this.reporte.meses.length; i++)
      single.push({
        name: this.reporte.meses[i],
        value: this.reporte.cantidadClientes[i]
      })

    this.valorPrimero = {single: single};
  }

  scorePromedio(){

    let single = [];
    for(let i=0; i< this.reporte.meses.length; i++)
      single.push({
        name: this.reporte.meses[i],
        value: this.reporte.scoresPromedio[i]
      })
      
    this.valorSecundario = {single: single};
  }

  clientesNivel(){
    this.valorTerciario = {
      single: [
        {
          "name": "Buenos",
          "value": this.reporte.nivelActual.buenos
        },
        {
          "name": "Regulares",
          "value": this.reporte.nivelActual.regulares
        },
        {
          "name": "Malos",
          "value": this.reporte.nivelActual.malos
        }
      ],
      color: {
        name: 'own',
        selectable: false,
        group: ScaleType.Ordinal,  
        domain: ['#5AA454', '#C7B42C', '#A10A28']
      }
    }
  }

  downloadPDF() {
    this.spinner = true;

    const DATA = document.getElementById('cuerpo') as HTMLCanvasElement;
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {
    
      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 150;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`Reporte_${new Date().toLocaleString()}.pdf`);
      this.spinner = false;
    });   
 }

 @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any){

    sessionStorage.setItem('reporte', JSON.stringify(this.reporte));
  }
}
