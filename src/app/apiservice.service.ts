import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  readonly apiUrl = process.env['URL'] || 'http://localhost:5164/api/';
  constructor(private http: HttpClient) { }

  getAccountsByUserList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'accounts/ByUser/1');
  }

  getAccountById(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'accounts/ById/1');
  }

  createAccount(account: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'accounts/create', account, httpOptions);
      /*.pipe(
        catchError((err) => {
          //console.log('error caught in service')
          //console.error(err);
          //Handle the error here
          return err.error.message;
          //alert(err.error.message);
          //return throwError(err);    //Rethrow it back to component
            let errorMsg: string;
            if (err.error instanceof ErrorEvent) {
                errorMsg = `Error: ${err.error.message}`;
            } else {
                errorMsg = this.getServerErrorMessage(err);
            }

            return errorMsg;
        })
      );*/
  }

  depositAccount(trx: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.apiUrl + 'accounts/deposit/', trx, httpOptions);
  }

  withdrawAccount(trx: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.apiUrl + 'accounts/withdraw/', trx, httpOptions);
  }

  deleteAccount(accountId: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.apiUrl + 'accounts/delete/' + accountId, httpOptions);
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
        case 404: {
            return `Not Found: ${error.message}`;
        }
        case 403: {
            return `Access Denied: ${error.message}`;
        }
        case 500: {
            return `Internal Server Error: ${error.message}`;
        }
        default: {
            return `Unknown Server Error: ${error.message}`;
        }

    }
}
}
