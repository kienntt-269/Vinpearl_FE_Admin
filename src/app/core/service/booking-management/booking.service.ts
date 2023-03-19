import { HttpClient, HttpParams } from "@angular/common/http";
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

    getListBookingRoom(data: any): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        let queryParams = new HttpParams();
        queryParams = queryParams.append("page",data.page);
        queryParams = queryParams.append("size",data.size);
        queryParams = queryParams.append("sort",data.sort);
        queryParams = queryParams.append("customerId",data.customerId);
        queryParams = queryParams.append("code",data.code);
        queryParams = queryParams.append("status",data.status);
        queryParams = queryParams.append("startTime",data.startTime);
        queryParams = queryParams.append("endTime",data.endTime);
        return this.httpClient.get(`${APIs.API_GET_LIST_BOOKING_ROOM}`, {params: queryParams});
    };

    getListBookingTour(data: any): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        let queryParams = new HttpParams();
        queryParams = queryParams.append("page",data.page);
        queryParams = queryParams.append("size",data.size);
        queryParams = queryParams.append("sort",data.sort);
        queryParams = queryParams.append("customerId",data.customerId);
        queryParams = queryParams.append("code",data.code);
        queryParams = queryParams.append("status",data.status);
        queryParams = queryParams.append("startTime",data.startTime);
        queryParams = queryParams.append("endTime",data.endTime);
        return this.httpClient.get(`${APIs.API_GET_LIST_TOUR}`, {params: queryParams});
    };
}