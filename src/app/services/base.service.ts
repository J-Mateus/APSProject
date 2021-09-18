import { HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Usuario } from "../models/usuario";
import { LocalStorage } from "../utils/localStorage";

export abstract class BaseService  {

    private localStorage = new LocalStorage();

    protected urlApi: string = environment.urlApi;

    protected ObterHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': '*/*'
            })
        };
    }

    protected async headerJsonToken() {

        const token: Usuario = await this.localStorage.getUsuario()
        const id: Usuario = await this.localStorage.getUsuario()


        const params = new HttpParams().append('id_usuario', id.id_usuario);

        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Authorization': `Bearer ${token.token}`
            }),
            params: params
        };
    }



}