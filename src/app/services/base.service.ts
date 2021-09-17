import { HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

export abstract class BaseService  {

    protected urlApi: string = environment.urlApi;

    protected ObterHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': '*/*'
            })
        };
    }

}