import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Denuncia } from 'src/app/models/denuncia';
import { CepMaskPipe } from 'src/app/pipes/cep-mask.pipe';
import { TelMaskPipe } from 'src/app/pipes/tel-mask.pipe';
import { DenunciaService } from 'src/app/services/denuncia.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
export class EditarComponent implements OnInit {

  formEdit: FormGroup;

  denuncia: Denuncia;
  

  constructor(
    private telPipe: TelMaskPipe,
    private fb: FormBuilder,
    private cepPipe: CepMaskPipe,
    public alertController: AlertController,
    public toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute,
    private denunciaService: DenunciaService) { 

      this.denuncia = this.route.snapshot.data['denuncia'];

    }

  ngOnInit() {

    this.formEdit = this.fb.group({
      nome: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      descricao: ['', [Validators.required]]
    });

    this.preencherForm();
  }


  preencherForm() {

    this.formEdit.patchValue({
      nome: this.denuncia.nome,
      telefone: this.denuncia.telefone,
      logradouro: this.denuncia.logradouro,
      cep: this.denuncia.cep,
      bairro: this.denuncia.bairro,
      cidade: this.denuncia.cidade,
      uf: this.denuncia.uf,
      descricao: this.denuncia.descricao
    });
  }

  formSubmit() {
    if(this.formEdit.valid){

      this.denunciaService.putDenuncia(this.denuncia.id_denuncias, this.formEdit.value).subscribe(data => {
        console.log("DATA", data);
        
        this.presentToast();
      })

    }else {
      this.presentAlert();
    }
  }

  updateWithTelMask(event) {
    this.formEdit.controls.tel.setValue(this.telPipe.transform(event.currentTarget.value));
  }

  updateWithCepMask(event) {
    this.formEdit.controls.cep.setValue(this.cepPipe.transform(event.currentTarget.value));
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      message: 'Por favor, preencha todos os campos corretamente.',
      buttons: ['OK']
    });

    await alert.present();
    
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Denúncia editada.',
      color: "success",
      duration: 3000,
      position: 'top',
      animated: true
    });
    toast.present();

    toast.onDidDismiss().then(data => {
      
      this.formEdit.reset();
      this.router.navigate(["/home"])
    })
    
  }

}
