import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KeycloakSecurityService } from './keycloak-security.service';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor{

  constructor(private kcService: KeycloakSecurityService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Request Http Interceptor ...");
    if(!this.kcService.kc.authenticated) return next.handle(req);
    let request  = req.clone({
      setHeaders:{
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+this.kcService.kc.token
      }
    })
    return next.handle(request)
  }
}
