import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CepMaskPipe } from 'src/app/pipes/cep-mask.pipe';
import { TelMaskPipe } from 'src/app/pipes/tel-mask.pipe';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-denunciar',
  templateUrl: './denunciar.component.html',
  styleUrls: ['./denunciar.component.scss'],
})
export class DenunciarComponent implements OnInit {

  formDenuncia: FormGroup

  constructor(
    private telPipe: TelMaskPipe,
    private fb: FormBuilder,
    private cepPipe: CepMaskPipe,
    public alertController: AlertController,
    public toastController: ToastController
    ) { }

  ngOnInit() {

    this.formDenuncia = this.fb.group({
      nome: ['', [Validators.required]],
      tel: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      descricao: ['', [Validators.required]]
    });

  }

  updateWithTelMask(event) {
    this.formDenuncia.controls.tel.setValue(this.telPipe.transform(event.currentTarget.value));
  }

  updateWithCepMask(event) {
    this.formDenuncia.controls.cep.setValue(this.cepPipe.transform(event.currentTarget.value));
  }

  formSubmit() {
    if(this.formDenuncia.valid){

      console.log(this.formDenuncia.value);

      this.presentToast();

      this.formDenuncia.reset();
    }else {
      this.presentAlert();
    }
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
      message: 'Denúncia cadastrada.',
      color: "success",
      duration: 3000,
      position: 'top',
      animated: true
    });
    toast.present();
  }
}
