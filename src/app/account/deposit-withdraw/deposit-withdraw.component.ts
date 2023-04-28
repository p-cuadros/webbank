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
  Deposit = "";
  AccountId = "";
  Amount = "";

  ngOnInit(): void {
    this.Deposit = this.trans.Deposit;
    this.AccountId = this.trans.AccountId;
    this.Amount = this.trans.Amount;
  }

  withdrawAccount() {
    var trx = {
      idAccount: this.AccountId,
      amount: this.Amount
    };
    this.service.withdrawAccount(trx)
    .subscribe({
      next: (op) => {
        console.log(op);
        alert('Withdraw: ' + trx.amount);
      },
      error: (e) => {
        console.log('error');
        console.log(e.error);
        alert(e.error.Message);
      },
      complete: () => console.log('done')
    })
    // .subscribe(res => {
    //   alert(res.toString());
    // });
  }

  depositAccount() {
    var trx = {
      idAccount: this.AccountId,
      amount: this.Amount
    };
    this.service.depositAccount(trx)
    .subscribe({
      next: (op) => {
        console.log('op:'+op);
        alert('Deposit: ' + trx.amount);
      },
      error: (e) => {
        console.log('error:' + e.error);
        alert(e.error.Message);
      },
      complete: () => console.log('done')
    })

    // .subscribe(res => {
    //   alert(res.toString());
    // });
  }
}
