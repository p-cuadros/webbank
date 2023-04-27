import { Component, OnInit, Input } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'deposit-withdraw-account',
  templateUrl: './deposit-withdraw.component.html',
  styleUrls: ['./deposit-withdraw.component.css']
})
export class DepositWithdrawComponent implements OnInit {

  constructor(private service: ApiserviceService) { }

  @Input() trans: any;
  AccountId = "";
  Amount = "";

  ngOnInit(): void {
    this.AccountId = this.trans.AccountId;
    this.Amount = this.trans.Amount;
  }

  withdrawAccount() {
    var trx = {
      idAccount: this.AccountId,
      amount: this.Amount
    };
    this.service.withdrawAccount(trx).subscribe(res => {
      alert(res.toString());
    });
  }

  depositAccount() {
    var trx = {
      idAccount: this.AccountId,
      amount: this.Amount
    };
    this.service.depositAccount(trx).subscribe(res => {
      alert(res.toString());
    });
  }
}
