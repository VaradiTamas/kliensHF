import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {     //minden kimeno http keres header reszebe beleirja a tokent
  constructor(private authService: AuthService) {}            //hogy a szerver tudja azonositani be vagyunk-e jelentkzve vagy sem

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)    //headers.authorization-ban lesz a tokenunk
    });
    return next.handle(authRequest);
  }
}
