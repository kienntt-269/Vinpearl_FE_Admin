import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import APIs from "../../constants/APIs";
import constants from "../../constants/constants";
import handle from "../../functions/handle";
import axios from "axios";

@Injectable({
    providedIn: 'root',
})

export class HotelService {

    constructor(
        private httpClient: HttpClient
    ) {

    }

    getListHotel(pageSize: Number, pageIndex: Number, sort: any, name: String, totalRoom: any, phone: any): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        // return this.httpClient.get(`${APIs.BOOKING_DETAIL}/${id}`, options);
        // return this.httpClient.get(`${APIs.API_GET_LIST_HOTEL}?siteId=${siteId}&page=${pageIndex}&size=${pageSize}&sort=${sort}&name=${name}&totalRoom=${totalRoom}&phone=${phone}`, options);
        return this.httpClient.get(`${APIs.API_GET_LIST_HOTEL}?page=${pageIndex}&size=${pageSize}&sort=${sort}`, options);
    };

    hotelDetail(id: number): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.get(`${APIs.API_GET_DETAIL_HOTEL}/${id}`, options);
        // return this.httpClient.get(`${APIs.API_GET_DETAIL_ROOM}/${id}`);
    };

    addHotel(formData: any) {
        // const headers = handle.requestHeadersFormData();
        // let options = {headers: headers};
        // return this.httpClient.post(`${APIs.API_ADD_HOTEL}`, formData, {
        //     reportProgress: true,
        //     observe: 'events'
        //   });
        return axios.post(`${APIs.API_ADD_TOUR}`, formData);
    };

    getAllSite(): Observable<any> {
        // return this.httpClient.get("https://provinces.open-api.vn/api/p/")
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.get(`${APIs.API_GET_LIST_SITE}`, options)
    }
}