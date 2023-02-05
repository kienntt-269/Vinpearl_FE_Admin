import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import APIs from "../../constants/APIs";
import handle from "../../functions/handle";

@Injectable({
    providedIn: 'root',
})

export class HotelService {

    constructor(
        private httpClient: HttpClient
    ) {

    }

    getListHotel(area: Number, name: String, phone: String, pageIndex: Number, pageSize: Number): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        // return this.httpClient.get(`${APIs.BOOKING_DETAIL}/${id}`, options);
        return this.httpClient.get(`${APIs.API_GET_LIST_HOTEL}?area=${area}&name=${name}&phone=${phone}&pageIndex=${pageIndex}&pageSize=${pageSize}`, options);
    };

    hotelDetail(id: number): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.get(`${APIs.API_GET_DETAIL_HOTEL}/${id}`, options);
        // return this.httpClient.get(`${APIs.API_GET_DETAIL_ROOM}/${id}`);
    };
}