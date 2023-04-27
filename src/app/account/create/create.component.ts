import { Component, OnInit, Input } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private service: ApiserviceService) { }

  @Input() acc: any;
  AccountId = "";
  UserId = "";
  InitialAmount = "";

  ngOnInit(): void {
    this.AccountId = this.acc.AccountId;
    this.UserId = "1";//this.acc.UserId;
    this.InitialAmount = "0";//this.acc.InitialAmount;
  }

  createAccount() {
    var account = {
      //AccountId: this.AccountId,
      IdUser: this.UserId,
      InitialAmount: this.InitialAmount
    };
    this.service.createAccount(account)
      .subscribe({
      next: (account) => {
        console.log('next');
        console.log(account);
        alert('Account created: ' + account.idAccount);
      },
      error: (e) => {
        console.log('error');
        console.log(e.error);
        alert(e.error.Message);
      },
      complete: () => console.log('done')
    });
  }

  // updateAccount() {
  //   var dept = {
  //     AccountId: this.AccountId,
  //     AccountName: this.AccountName
  //   };
  //   this.service.updateAccount(dept).subscribe(res => {
  //     alert(res.toString());
  //   });
  // }
}


// Cemex - Migración de aplicativos de Net Framework a Net 6
// - Migración de proyectos de pruebas unitarias e de integraciòn tipo MsTest utilando Fake clases y Mocks

// Caja Tacna - Migración de aplicación de Banca por Internet
// - Creación de pruebas de API con Postman y Newman
// - Creación de pruebas de interfaz utilizando .Net (NUnit) y selenium web driver
// - Creación de pruebas BDD (cucumber) utilizando NUnit y LivingDoc para los reportes de ejecución de pruebas locales y con Azure DevOps.
// - Creación de reportes de cobertura de pruebas con .Net Coverlet para generar informaciòn de cobertura para el analisis de còdigo estatico con SonarQube
