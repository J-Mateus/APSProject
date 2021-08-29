import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Denunciar', url: '/denunciar', icon: 'alert' },
    { title: 'Sobre', url: '/sobre', icon: 'information' }
  ]; 

  public exitBtn = { title: 'Sair', url: '/login', icon: 'exit' }

  constructor() {}
}
