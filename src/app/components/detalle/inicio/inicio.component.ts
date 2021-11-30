import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  clienteInfo: any;
  clienteFormat: any;
  edad!: string;
  constructor(private clienteService: ClienteService) { 
    this.clienteInfo = {
      Status: "",
      Nationality: "",
      WorkDetails: [
          {
              CompanyName: "",
              ProfessionName: "",
              JobTitle: "",
          }
      ],
      Documents: [
          {
              DocumentValue: "",
          }
      ],
      Contacts: [
          {
              PhoneCountryCode: "",
              PhoneNumber: "",
              EmailAddress: "",
          }
      ],
      Address: [
          {
              Department: "",
              StreetName: "",
              BuildingNumber: "",
              PostCode: "",
              TownName: "",
              CountrySubDivision: "",
              Country: "",
              
          }
      ]
    }
    this.clienteFormat = {
      estado: "",
      sexo: "",
      estadoCivil: "",
      tipo: "",
      nombre: ""
    }
  }

  ngOnInit(): void {
    this.getPerfil();
  }

  getPerfil(){
    this.clienteInfo = this.clienteService.getClientePerfil();
    this.setDatos();
  }

  setDatos(){
    const estado = () => {
      if(this.clienteInfo.Status == "Enabled")
        return "Activo";
      else if(this.clienteInfo.Status == "Deleted")
        return "Eliminado";
      else if(this.clienteInfo.Status == "Disabled")
        return "Deshabilitado";
      else
        return "En evaluación";
    }
    const sexo = () => {
      if(this.clienteInfo.Gender == "F")
        return "Mujer";
      else if(this.clienteInfo.Gender == "M")
        return "Hombre";
      else
        return "Otro";
    }
    const estadoCivil = () => {
      let letra = this.clienteInfo.Gender == "F" ? "a" : "o";
      if(this.clienteInfo.MaritalStatus == "Single")
        return "Solter" + letra;
      else if(this.clienteInfo.MaritalStatus == "Married")
        return "Casad" + letra;
      else if(this.clienteInfo.MaritalStatus == "Widowed")
        return "Viud" + letra;
      else if(this.clienteInfo.MaritalStatus == "Partner")
        return "Unión libre";
      else if(this.clienteInfo.MaritalStatus == "Divorced")
        return "Divorciad" + letra;
      else
        return "Otro";
    }
    const nombreCompleto = () => {
      let nombre = this.clienteService.detalle.profile.FirstName + " ";
      let segundoNombre = this.clienteService.detalle.profile.MiddleName == null ?  null 
      : this.clienteService.detalle.profile.MiddleName + " ";
      let apellidos = this.clienteService.detalle.profile.LastName;
    
      return nombre + segundoNombre + apellidos;
    }
    this.clienteFormat = {
      estado: estado(),
      sexo: sexo(),
      estadoCivil: estadoCivil(),
      tipo: this.clienteInfo.LegalEntityType == "Person" ? "Personal" : "De negocios",
      nombre: nombreCompleto()
    }

    let fecha1 = moment(this.clienteInfo.DateOfBirth);
    let fecha2 = moment(new Date());

    this.edad = fecha2.diff(fecha1, 'years').toString();
  }
}
