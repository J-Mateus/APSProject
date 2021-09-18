import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Denuncia } from "../models/denuncia";
import { DenunciaService } from "./denuncia.service";

@Injectable({
    providedIn: "root"
})
export class DenunciaResolve implements Resolve<Denuncia> {

    constructor(private denunciaService: DenunciaService){ }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Denuncia | Observable<Denuncia> | Promise<Denuncia> {

        return this.denunciaService.getByIdDenuncia(route.params['id']);
    }
    
}