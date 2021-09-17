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
      email: ['usuario', [Validators.required]],
      senha: ['123456', Validators.required]
    });

  }

  submit() {
    if(this.formLogin.valid){
      
      this.loginService.login(this.formLogin.value).subscribe(data => {
        console.log(data);
        
      })


      this.router.navigate(['/home']);
      this.formLogin.reset();
    }else {
      this.presentAlert();
    }   
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      message: 'Usuário ou senha inválidos',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
