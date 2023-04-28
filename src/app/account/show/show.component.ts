import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-show-account',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  constructor(private service: ApiserviceService) { }

  AccountList: any = [];
  ModalTitle = "";
  ActivateAddEditDepartComp: boolean = false;
  ActivateDepositWithdrawComp: boolean = false;
  account: any;
  trans: any;

  AccountIdFilter = "";
  AccountNameFilter = "";
  AccountListWithoutFilter: any = [];

  ngOnInit(): void {
    this.refreshAccountList();
  }

  createClick() {
    this.account = {
      AccountId: "0"
    }
    this.ModalTitle = "Create Account";
    this.ActivateAddEditDepartComp = true;
    this.ActivateDepositWithdrawComp = false;
    this.refreshAccountList();
  }

  depositClick(item: any) {
    this.trans = {
      Deposit: "1",
      AccountId: item.idAccount
    }
    this.account = item;
    this.ModalTitle = "Deposit Account";
    this.ActivateDepositWithdrawComp = true;
  }

  withdrawClick(item: any) {
    this.trans = {
      Deposit: "2",
      AccountId: item.idAccount
    }
    this.account = item;
    this.ModalTitle = "WithDraw Account";
    this.ActivateDepositWithdrawComp = true;
  }

  deleteClick(item: any) {
    if (confirm('Are you sure??' + item.idAccount)) {
      this.service.deleteAccount(item.idAccount)
      .subscribe({
        next: (account) => {
          console.log('next');
          console.log(account);
          alert('Account deleted: ' + item.idAccount);
          this.refreshAccountList();
        },
        error: (e) => {
          console.log('error');
          console.log(e.error);
          alert(e.error.Message);
        },
        complete: () => console.log('done')
      })
        /*.subscribe(data => {
          alert(data.toString());
          this.refreshAccountList();
        })*/
    }
  }

  closeClick() {
    this.ActivateAddEditDepartComp = false;
    this.refreshAccountList();
  }

  refreshAccountList() {
    this.service.getAccountsByUserList().subscribe(data => {
      this.AccountList = data;
      this.AccountListWithoutFilter = data;
    });
  }

  sortResult(prop: any, asc: any) {
    this.AccountList = this.AccountListWithoutFilter.sort(function (a: any, b: any) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      }
      else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    });
  }

  FilterFn() {
    var AccountIdFilter = this.AccountIdFilter;
    var AccountNameFilter = this.AccountNameFilter;

    this.AccountList = this.AccountListWithoutFilter.filter(
      function (el: any) {
        return el.AccountId.toString().toLowerCase().includes(
          AccountIdFilter.toString().trim().toLowerCase()
        ) &&
          el.AccountName.toString().toLowerCase().includes(
            AccountNameFilter.toString().trim().toLowerCase())
      }
    );
  }
}
