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

        let queryParams = new HttpParams();
        queryParams = queryParams.append("page",data.page);
        queryParams = queryParams.append("size",data.size);
        queryParams = queryParams.append("sort",data.sort);
        if (data.status) {
            queryParams = queryParams.append("status",parseInt(data.status));
        }
        if (data.startDate) {
            queryParams = queryParams.append("startDate",data.startDate);
        }
        if (data.endDate) {
            queryParams = queryParams.append("endDate",data.endDate);
        }
        let options = {
            headers: headers,
            params: queryParams,
        };
        return this.httpClient.get(`${APIs.API_GET_LIST_BOOKING_ROOM}`, options);
    };

    getListBookingTour(data: any): Observable<any> {
        const headers = handle.requestHeaders();

        let queryParams = new HttpParams();
        queryParams = queryParams.append("page",data.page);
        queryParams = queryParams.append("size",data.size);
        queryParams = queryParams.append("sort",data.sort);
        if (data.status) {
            queryParams = queryParams.append("status",parseInt(data.status));
        }
        if (data.startDate) {
            queryParams = queryParams.append("startDate",data.startDate);
        }
        if (data.endDate) {
            queryParams = queryParams.append("endDate",data.endDate);
        }
        let options = {
            headers: headers,
            params: queryParams,
            withCredentials: true,
        };
        return this.httpClient.get(`${APIs.API_GET_LIST_BOOKING_TOUR}`, options);
    };

    getTop5Customer() : Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.get(`${APIs.API_TOP_5_CUSTOMER_MONEY}`, options);
    };

    exportFile(data: any) : Observable<Blob> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.post(`${APIs.API_EXPORT_BOOKING_ROOM}`, data, {
            responseType: 'blob'
          });
    }

    exportFileTour(data: any) : Observable<Blob> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.post(`${APIs.API_EXPORT_BOOKING_TOUR}`, data, {
            responseType: 'blob'
          });
    }

    getListTotal() : Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.get(`${APIs.API_DASHBOARD_GET_BOOKING_TOTAL}`, options);
    }
}
