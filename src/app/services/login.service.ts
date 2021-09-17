import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
  })
export class LoginService extends BaseService {


    constructor(private http: HttpClient) { super(); }

    login(cred): Observable<any> {
        return  this.http.post(`${this.urlApi}usuarios/login`, cred, this.ObterHeaderJson())
            .pipe(
                catchError(err => {
                    throw err
                })
            )
    }
}