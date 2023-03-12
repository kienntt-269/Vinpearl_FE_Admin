import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import APIs from "../../constants/APIs";
import constants from "../../constants/constants";
import handle from "../../functions/handle";

@Injectable({
    providedIn: 'root',
})

export class TourService {

    constructor(
        private httpClient: HttpClient
    ) {

    }

    getListTour(pageSize: Number, pageIndex: Number, sort: any, name: String, totalRoom: any, phone: any): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        const siteId = localStorage.getItem(constants.SITE_ID) || 1;
        // return this.httpClient.get(`${APIs.BOOKING_DETAIL}/${id}`, options);
        // return this.httpClient.get(`${APIs.API_GET_LIST_Tour}?siteId=${siteId}&page=${pageIndex}&size=${pageSize}&sort=${sort}&name=${name}&totalRoom=${totalRoom}&phone=${phone}`, options);
        return this.httpClient.get(`${APIs.API_GET_LIST_TOUR}?siteId=${siteId}&page=${pageIndex}&size=${pageSize}&sort=${sort}`, options);
    };

    TourDetail(id: number): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.get(`${APIs.API_GET_DETAIL_TOUR}/${id}`, options);
        // return this.httpClient.get(`${APIs.API_GET_DETAIL_ROOM}/${id}`);
    };

    addTour(formData: any): Observable<any> {
        const headers = handle.requestHeadersFormData();
        let options = {headers: headers};
        return this.httpClient.post(`${APIs.API_ADD_TOUR}`, formData, {
            reportProgress: true,
            observe: 'events'
        });
    };

    getAllSite(): Observable<any> {
        // return this.httpClient.get("https://provinces.open-api.vn/api/p/")
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.get(`${APIs.API_GET_LIST_SITE}`, options)
    }
}