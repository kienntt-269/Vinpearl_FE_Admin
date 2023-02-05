import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import APIs from "../constants/APIs";

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  isAuthenticated() {
    throw new Error("Method not implemented.");
  }
  constructor(
    public httpClient: HttpClient,
  ) {}

  login(body: any): Observable<any> {
    return this.httpClient.post(`${APIs.AUTH_LOGIN}`, {
        username: body.username,
        password: body.password
    });
  };

  register(body: any): Observable<any> {
    return this.httpClient.post(`${APIs.AUTH_REGISTER}`, body);
  };
}
