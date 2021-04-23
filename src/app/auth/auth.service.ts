import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthData} from "./auth-data.model";
import {Router} from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;          //visszaadja a tokent
  }

  getIsAuth() {
    return this.isAuthenticated;    //ha be vagyunk lepve igazat ha nem hamisat ad vissza
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();    //observablekent adja vissza az authStatusListenert
  }                                                   //azert fontos hogy a komponensekben ha mar nem hasznaljuk a servicet leiratkozhassunk

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string; expiresIn: number }>(      //visszakapjuk a tokent es azt hogy mennyi ido utan jar le
        "http://localhost:3000/admin/user/login",
        authData                                        //elkuldjuk az email, jelszo parost
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {    //a visszakapott token ha letezik
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);                                                   //a visszakapott lejarati idore beallitjuk
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();                                                                   //a mostani idohoz kepest a lejarati datumot beallitjuk
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);          //convert to millisec (*1000)
          this.saveAuthData(token, expirationDate);                                                 //elmentjuk a tokent es a lejarati idot
          this.router.navigate(["/admin/bookings"]);                                        //atugrunk az adatokat megjelenito oldalra
        }
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  autoAuthUser() {      //arra valo, hogy ha mar egyszer bejelentkezett valaki es nem jart meg le a lejarati ideje nem kell ujra belepnie
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {                                                              //ha meg nem jart le az ideje
      this.token = authInformation.token;
      this.isAuthenticated = true;                                                    //be lesz jelentkezve
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);    //kijelentkezunk es mindent torlunk, nullra, falsera allitunk
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/admin/login"]); //valamint a bejelentkezo oldalra navigalunk
  }

  private setAuthTimer(duration: number) {        //timert beallitja
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {           //a local storage-ba elmenti a tokent es a lejarati datumot
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData() {                     //a local storage-bol torli a tokent es a lejarati datumot
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData() {       //a local storage-bol kinyeri a tokent es a lejarati datumot ha leteznek es visszater veluk
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {    //ha nem letezik csak siman visszater
      return;
    }
    return {    //ha leteznek
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }
}
