import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { noop } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { LocalStorage } from 'src/app/utils/localStorage';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {

  formCadastro: FormGroup;
  localStorage = new LocalStorage();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public alertController: AlertController,
    public toastController: ToastController,
    private loginService: LoginService) { }

  ngOnInit() {

    this.formCadastro = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required]],
      senha: ['', Validators.required]
    });

  }

  submit() {
    if(this.formCadastro.valid){
      this.loginService.cadastro(this.formCadastro.value).subscribe(data => {
        this.presentToast()
      },
        noop
      )     
    }else {
      this.presentAlert('Por favor, preencha os campos corretamente.');
    }   
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Usuário cadastrado.',
      color: "success",
      duration: 2000,
      position: 'top',
      animated: true
    });
    toast.present();

    toast.onDidDismiss().then(data => {
      
      this.formCadastro.reset();
      this.router.navigate(['/login']);
    })
    
  }

}
