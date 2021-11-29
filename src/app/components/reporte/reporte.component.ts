import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ScaleType } from '@swimlane/ngx-charts';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas'; 
 

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  spinner = false;

  view: [number, number] = [700, 400]

  valorPrimero: any = [];
  valorSecundario: any = [];
  valorTerciario: any = [];
  valorCuarto: any = [];

  constructor() { 
    this.cantidadClientes();
    this.scorePromedio();
    this.clientesNivel();
    this.topClientes();
  }

  ngOnInit(): void {
    
  }

  cantidadClientes(){

    this.valorPrimero = {
      single: [
        {
          "name": "Enero",
          "value": 23000
        },
        {
          "name": "Febrero",
          "value": 25000
        },
        {
          "name": "Marzo",
          "value": 28000
        },
        {
          "name": "Abril",
          "value": 40000
        },
      ]
    }
  }

  scorePromedio(){
    this.valorSecundario = {
      single: [
        {
          "name": "Enero",
          "value": 700
        },
        {
          "name": "Febrero",
          "value": 723
        },
        {
          "name": "Marzo",
          "value": 640
        },
        {
          "name": "Abril",
          "value": 805
        },
      ]
    }
  }

  clientesNivel(){
    this.valorTerciario = {
      single: [
        {
          "name": "Bueno",
          "value": 10000
        },
        {
          "name": "Medio",
          "value": 5000
        },
        {
          "name": "Malo",
          "value": 1000
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

  topClientes(){
    this.valorCuarto = {
      single: [
        {
          "name": "Anthony Delanoy Peralta Pérez",
          "value": 850
        },
        {
          "name": "Nizar Sanchez",
          "value": 823
        },
        {
          "name": "Jhan Carlos Escalante",
          "value": 820
        }
      ],
      cardColor: '#232837'
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
      docResult.save(`Reporte_${new Date().toISOString()}.pdf`);
      this.spinner = false;
    });

    
 }
}
