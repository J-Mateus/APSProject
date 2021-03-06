import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';
import { LocalStorage } from 'src/app/utils/localStorage';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  
  formLogin: FormGroup;
  localStorage = new LocalStorage();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public alertController: AlertController,
    private loginService: LoginService) { }

  ngOnInit() {

    this.formLogin = this.fb.group({
      email: ['', [Validators.required]],
      senha: ['', Validators.required]
    });

  }

  submit() {
    if(this.formLogin.valid){
      
      this.loginService.login(this.formLogin.value).subscribe(data => {

        const user: Usuario = data;
        
        this.localStorage.setUsuario(user);

        this.router.navigate(['/home']);
        this.formLogin.reset();
      },
        err => {
          err.status === 401 ? this.presentAlert("Usuário ou senha inválidos!!") : this.presentAlert(err.error.mensagem)
        }
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
}
