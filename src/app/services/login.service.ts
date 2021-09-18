import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Usuario } from "../models/usuario";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
  })
export class LoginService extends BaseService {


    constructor(private http: HttpClient) { super(); }

    login(cred): Observable<Usuario> {
        return  this.http.post<Usuario>(`${this.urlApi}usuarios/login`, cred, this.ObterHeaderJson())
            .pipe(
                catchError(err => {
                    throw err
                })
            )
    }

    cadastro(cred): Observable<Usuario> {
        return  this.http.post<Usuario>(`${this.urlApi}usuarios/cadastro`, cred, this.ObterHeaderJson())
            .pipe(
                catchError(err => {
                    throw err
                })
            )
    }
}