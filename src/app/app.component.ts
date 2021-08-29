import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit  {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Denunciar', url: '/denunciar', icon: 'alert' },
    { title: 'Sobre', url: '/sobre', icon: 'information' }
  ]; 

  public exitBtn = { title: 'Sair', url: '/login', icon: 'exit' }

  constructor(
    private router: Router,
    private authService: AuthService,
    private menuCtrl: MenuController) { }

  ngOnInit(): void { 
    this.authService.loginPage().subscribe(data => {      
        this.menuCtrl.enable(data, 'main-menu');
    })
  }

  exit() {
    this.router.navigate(['/login'])
  }



}
