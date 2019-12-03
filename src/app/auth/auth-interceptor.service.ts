import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../core/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return next.handle(req);
  }
}
