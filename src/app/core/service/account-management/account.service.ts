import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import APIs from "../../constants/APIs";
import handle from "../../functions/handle";

@Injectable({
    providedIn: 'root',
})

export class AccountService {

    constructor(
        private httpClient: HttpClient
    ) {

    }

    getListAccount(acreage: Number, name: String, phone: String, pageIndex: Number, pageSize: Number): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.get(`${APIs.API_GET_LIST_HOTEL}?acreage=${acreage}&name=${name}&phone=${phone}&pageIndex=${pageIndex}&pageSize=${pageSize}`, options);
    };

    getDetailUser(id: any): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.get(`${APIs.API_GET_DETAIL_ACCOUNT}/${id}`, options);
    };

    getListPermission(): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.get(`${APIs.API_GET_LIST_PERMISSION}`, options);
    };

    addAccount(body: any): Observable<any> {
        return this.httpClient.post(`${APIs.AUTH_REGISTER}`, body);
    };
}