import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  loginPage(): Observable<any> {
    return this.router.events.pipe(
        filter(e => e instanceof NavigationEnd),
        map((route: NavigationEnd) => {         
          return route.url === '/login' || route.urlAfterRedirects === '/login' ? false : true;  
        })
    );
  };
}
