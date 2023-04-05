import { HttpHeaders } from "@angular/common/http";
import constants from "../constants/constants";

function requestHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // 'Authorization': localStorage.getItem(constants.TOKEN) as string,
      'Authorization': "eyJhbGciOiJSUzI1NiJ9.eyJlbWFpbCI6IkphbmUgRG9lIiwicGFzc3dvcmQiOiJqYW5lQGV4YW1wbGUuY29tIiwiZnVsbE5hbWUiOiJqYW5lQGV4YW1wbGUuY29tIiwic3ViIjoiamFuZSIsImp0aSI6ImU3YThhNWQ1LWNlNDUtNDE0Mi1hODhlLTJiNDM4NTQyY2E2MCIsImlhdCI6MTY3MjcyNjA4MCwiZXhwIjoxNjc1MzE4MDgwfQ.c4AOlhO-K9qnW_MX0kmnoIg7CX1byGJBXCg-8tB3KsBu_xazVAKVxCPD-SBZfsWFUCcgBABNo8DyYVlRz_0sGV9BGUkVDaih0n5GMOkRkONvdXcwEvinFJd1AdEzDHEMdfbnQNM3MhcPhDjvq5wtHIFJnia6KXdIHVNNesTWQONGEiQxSuRI7TT-92qN7xVRzWlZxuA_2smOXZwB-6u1HM_hGw4d7wJhNkm_hsECBc-QuT2KaVViYsradkSjiiW-FGz94ThNEvIUJ62xmiUC6vzlocb5b2bTWvxZSpdZO44qsDFADuDVkXGIu1MwWxE5RDYDWrAaBQo_raR58u-Xlw"
    });
}

function requestHeadersFormData() {
  return new HttpHeaders({
    "Content-Type": "multipart/form-data",
    'Accept': 'application/json',
    // 'Authorization': localStorage.getItem(constants.TOKEN) as string,
    'Authorization': "eyJhbGciOiJSUzI1NiJ9.eyJlbWFpbCI6IkphbmUgRG9lIiwicGFzc3dvcmQiOiJqYW5lQGV4YW1wbGUuY29tIiwiZnVsbE5hbWUiOiJqYW5lQGV4YW1wbGUuY29tIiwic3ViIjoiamFuZSIsImp0aSI6ImU3YThhNWQ1LWNlNDUtNDE0Mi1hODhlLTJiNDM4NTQyY2E2MCIsImlhdCI6MTY3MjcyNjA4MCwiZXhwIjoxNjc1MzE4MDgwfQ.c4AOlhO-K9qnW_MX0kmnoIg7CX1byGJBXCg-8tB3KsBu_xazVAKVxCPD-SBZfsWFUCcgBABNo8DyYVlRz_0sGV9BGUkVDaih0n5GMOkRkONvdXcwEvinFJd1AdEzDHEMdfbnQNM3MhcPhDjvq5wtHIFJnia6KXdIHVNNesTWQONGEiQxSuRI7TT-92qN7xVRzWlZxuA_2smOXZwB-6u1HM_hGw4d7wJhNkm_hsECBc-QuT2KaVViYsradkSjiiW-FGz94ThNEvIUJ62xmiUC6vzlocb5b2bTWvxZSpdZO44qsDFADuDVkXGIu1MwWxE5RDYDWrAaBQo_raR58u-Xlw"
  });
}

function logout() {
  localStorage.clear();
}

export default {
    requestHeaders: requestHeaders,
    requestHeadersFormData: requestHeadersFormData,
    logout: logout,
}