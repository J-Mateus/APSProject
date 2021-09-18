import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { Denuncia } from "../models/denuncia";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
  })
export class DenunciaService extends BaseService { 

    constructor(private http: HttpClient) { super() }

    getDenuncias():Observable<Denuncia[]> {

        return from(this.headerJsonToken())
        .pipe(
			mergeMap(options => {
				return this.http.get<Denuncia[]>(`${this.urlApi}denuncias/`, options)
			 }),
             map((denuncias: any) => {                
                 return denuncias.data
             })
        );
    }

    deleteDenuncia(id):Observable<any> {

    return from(this.headerJsonToken())
        .pipe(
			mergeMap(options => {
				return this.http.delete<any>(`${this.urlApi}denuncias/${id}`, options)
			 })
        );
    }

    postDenuncia(denuncia):Observable<any> {
        return from(this.headerJsonToken())
        .pipe(
			mergeMap(options => {
				return this.http.post<any>(`${this.urlApi}denuncias/`, denuncia, options)
			 })
        );
    }

}