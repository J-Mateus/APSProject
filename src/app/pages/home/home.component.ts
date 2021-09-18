import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Denuncia } from 'src/app/models/denuncia';
import { DenunciaService } from 'src/app/services/denuncia.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  denuncias$:Observable<Denuncia[]> = this.denunciaService.getDenuncias()

  nenhumaDenuncia$:Observable<boolean>

  constructor(private denunciaService: DenunciaService) { }

  ngOnInit() {

    this.nenhumaDenuncia$ = this.denunciaService.getDenuncias().pipe(
      map((data: []) => {
          return !data.length
        })
      )
  }

  apagarDenuncia(id) {
    console.log("DELETE", id);
  }

}
