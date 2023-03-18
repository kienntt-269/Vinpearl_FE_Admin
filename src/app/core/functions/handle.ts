import { HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import constants from "../constants/constants";
import { CoreModule } from "../core.module";

function requestHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': localStorage.getItem(constants.TOKEN) as string || "",
    });
}

function requestHeadersFormData() {
  return {
    "Content-Type": "multipart/form-data",
    'Accept': 'application/json',
    'Authorization': localStorage.getItem(constants.TOKEN) as string || "",
  };
}

function logout() {
  const route = CoreModule.injector.get<Router>(Router)
  let login = {
    username: "username",
    password: "password",
    remember: "false",
  }
  if(localStorage.getItem(constants.REMEMBER_ME) == "true") {
    login.username = localStorage.getItem(constants.EMAIL_REMEMBER)!,
    login.password = localStorage.getItem(constants.PASSWORD_REMEMBER)!,
    login.remember = localStorage.getItem(constants.REMEMBER_ME)!
  }
  localStorage.clear();
  localStorage.setItem(constants.LANG, 'vi');
  if(login.remember == "true") {
    localStorage.setItem(constants.EMAIL_REMEMBER, login.username);
    localStorage.setItem(constants.PASSWORD_REMEMBER, login.password);
    localStorage.setItem(constants.REMEMBER_ME, login.remember);
  }
  route.navigate(['auth/login'])
}

export default {
    requestHeaders: requestHeaders,
    requestHeadersFormData: requestHeadersFormData,
    logout: logout,
}