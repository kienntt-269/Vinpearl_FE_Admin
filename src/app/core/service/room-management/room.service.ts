import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import APIs from "../../constants/APIs";
import constants from "../../constants/constants";
import handle from "../../functions/handle";

@Injectable({
    providedIn: 'root',
})

export class RoomService {

    constructor(
        private httpClient: HttpClient
    ) {

    }

    getListRoomType(pageSize: Number, pageIndex: Number, sort: any, name: String, totalRoom: any, phone: any): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        const hotelId = localStorage.getItem(constants.HOTEL_ID) || 1;
        // return this.httpClient.get(`${APIs.BOOKING_DETAIL}/${id}`, options);
        return this.httpClient.get(`${APIs.API_GET_LIST_ROOM_TYPE}?hotelId=${hotelId}&page=${pageIndex}&size=${pageSize}&sort=${sort}`, options);
    };

    roomTypeDetail(id: number): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.get(`${APIs.API_GET_LIST_ROOM_TYPE}/${id}`, options);
        // return this.httpClient.get(`${APIs.API_GET_DETAIL_ROOM}/${id}`);
    };

    addRoomType(formData: any): Observable<any> {
        const headers = handle.requestHeadersFormData();
        let options = {headers: headers};
        return this.httpClient.post(`${APIs.API_GET_LIST_ROOM_TYPE}`, formData, {
            reportProgress: true,
            observe: 'events'
          });
        // return this.httpClient.get(`${APIs.API_GET_DETAIL_ROOM}/${id}`);
    };
}