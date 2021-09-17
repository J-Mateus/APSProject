import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  
  formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public alertController: AlertController,
    private loginService: LoginService) { }

  ngOnInit() {

    this.formLogin = this.fb.group({
      email: ['usuarioTeste@email.com', [Validators.required]],
      senha: ['1234567', Validators.required]
    });

  }

  submit() {
    if(this.formLogin.valid){
      
      this.loginService.login(this.formLogin.value).subscribe(data => {
        console.log(data);
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
