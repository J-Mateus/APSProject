import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

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

  public isLogin: boolean;

  constructor(private router: Router) {
    this.loginPage().subscribe(data => {
      this.isLogin = data;
    })
  }


  ngOnInit(): void {  }

  loginPage(): Observable<any> {
    return this.router.events.pipe(
        filter(e => e instanceof NavigationEnd),
        map((route: NavigationEnd) => {         
          return route.url === '/login' || route.urlAfterRedirects === '/login' ? false : true;  
        })
    );
  };

  exit() {
    this.router.navigate(['/login'])
  }



}
