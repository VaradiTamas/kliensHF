import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Injectable } from "@angular/core";
import {ErrorComponent} from "./error.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {    //az errorok "elkapasara" valo, felugro ablakban megjeleniti az error uzenetet

  constructor(private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "An unknown error occurred!";        //alapbol ez a szoveg
        if (error.error.message) {
          errorMessage = error.error.message;                   //de ha kapunk specifikus error uzenetet akkor arra atallitjuk
        }
        this.dialog.open(ErrorComponent, {data: {message: errorMessage}});  //majd egy felugro ablakban megjelenitjuk az uzenetet
        // this.errorService.throwError(errorMessage);
        return throwError(error);
      })
    );
  }
}
