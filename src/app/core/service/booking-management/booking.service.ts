import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import APIs from "../../constants/APIs";
import handle from "../../functions/handle";

@Injectable({
    providedIn: 'root',
})

export class BookingService {

    constructor(
        private httpClient: HttpClient
    ) {

    }

    login(username: any, password: any): Observable<any> {
        // const headers = handle.requestHeaders();
        // let options = {headers: headers};
        // return this.httpClient.post(`${APIs.AUTH_LOGIN}`, {
        //     username: username,
        //     password: password
        // }, options);
        return this.httpClient.post(`${APIs.AUTH_LOGIN}`, {
            username: username,
            password: password
        });
    };

    bookingDetail(id: number): Observable<any> {
        // const headers = handle.requestHeaders();
        // let options = {headers: headers};
        // return this.httpClient.get(`${APIs.BOOKING_DETAIL}/${id}`, options);
        return this.httpClient.get(`${APIs.API_GET_DETAIL_BOOKING}/${id}`);
    };
}