import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import APIs from "../constants/APIs";
import constants from "../constants/constants";
import { PERMISSION } from "src/app/shared/data/permission/permission";
import handle from "../functions/handle";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  [x: string]: any;
  isAuthenticated() {
    throw new Error("Method not implemented.");
  }
  constructor(
    private http: HttpClient
  ) {}

  isLoggedIn = false;
  redirectUrl!: string;

  login(email: any, password: any): Observable<any> {
    // return this.http.post(`${APIs.AUTH_LOGIN}`, {
      this.isLoggedIn = true;
      return this.http.post(`${APIs.AUTH_LOGIN}`, {
        email: email,
        password: password,
      });
  };

  logout(): void {
    this.isLoggedIn = false;
  }

  register(body: any): Observable<any> {
    return this.http.post(`${APIs.AUTH_REGISTER}`, body);
  };

  getListAccount(data: any): Observable<any> {
    let queryParams = new HttpParams();
    if (data.name) {
      queryParams = queryParams.append("name",data.name);
    }
    if (data.siteId) {
      queryParams = queryParams.append("siteId",data.siteId);
    }
    if (data.phone) {
      queryParams = queryParams.append("phone",data.phone);
    }
    if (data.page || data.page == 0) {
      queryParams = queryParams.append("page",data.page);
    }
    if (data.size) {
      queryParams = queryParams.append("size",data.size);
    }
    if (data.sort) {
      queryParams = queryParams.append("sort",data.sort);
    }
    const headers = handle.requestHeaders();
    let options = {
      headers: headers,
      params: queryParams,
    };
    return this.http.get(`${APIs.API_GET_LIST_ACCOUNT}`, options);
  };

  getListCustomer(data: any): Observable<any> {
    let queryParams = new HttpParams();
    if (data.name) {
      queryParams = queryParams.append("name",data.name);
    }
    if (data.phone) {
      queryParams = queryParams.append("phone",data.phone);
    }
    if (data.page || data.page == 0) {
      queryParams = queryParams.append("page",data.page);
    }
    if (data.size) {
      queryParams = queryParams.append("size",data.size);
    }
    if (data.sort) {
      queryParams = queryParams.append("sort",data.sort);
    }
    const headers = handle.requestHeaders();
    let options = {
      headers: headers,
      params: queryParams,
    };
    return this.http.get(`${APIs.API_GET_LIST_CUSTOMER}`, options);
  };

  hasPermission(resourceCode: string): boolean {
    if (!resourceCode) {
      return false;
    }
    let codes: string | any[];
    if (localStorage.getItem(constants.ROLE_ID) == '1') {
      codes = PERMISSION.ROLE_TOUR_HOTEL;
    } else if (localStorage.getItem(constants.ROLE_ID) == '2') {
      codes = PERMISSION.ROLE_CUSTOMER_CARE;
    } else if (localStorage.getItem(constants.ROLE_ID) == '3') {
      codes = PERMISSION.ROLE_ADMIN;
    }
    // let role = atob(JSON.parse(localStorage.getItem(constants.FUNCTIONS) as string))

    // if(role){
    //   let roles = role.split(",")
    //   return roles.indexOf(resourceCode) > -1;
    // }else{
    //   return false;
    // }
    return true;
  }
}
