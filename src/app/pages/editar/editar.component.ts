import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Denuncia } from 'src/app/models/denuncia';
import { CepMaskPipe } from 'src/app/pipes/cep-mask.pipe';
import { TelMaskPipe } from 'src/app/pipes/tel-mask.pipe';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
export class EditarComponent implements OnInit {

  formEdit: FormGroup;

  card: Denuncia = 
    {
      id: 1,
      nome: "Pessoa",
      tel: "(11) 3485-8842",
      logradouro: "Av. dos Autonomistas",
      cep: "32548-884",
      bairro: "Centro",
      cidade: "Osasco",
      uf: "SP",
      descricao: "Lixo acumulado na calçada próximo ao Habibs."
    }
  

  constructor(
    private telPipe: TelMaskPipe,
    private fb: FormBuilder,
    private cepPipe: CepMaskPipe,
    public alertController: AlertController,
    public toastController: ToastController,
    private router: Router) { }

  ngOnInit() {

    this.formEdit = this.fb.group({
      nome: ['', [Validators.required]],
      tel: ['', [Validators.required]],
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
      nome: this.card.nome,
      tel: this.card.tel,
      logradouro: this.card.logradouro,
      cep: this.card.cep,
      bairro: this.card.bairro,
      cidade: this.card.cidade,
      uf: this.card.uf,
      descricao: this.card.descricao
    });
  }

  formSubmit() {
    if(this.formEdit.valid){
      this.presentToast();
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
