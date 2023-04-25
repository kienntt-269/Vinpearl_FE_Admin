import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import APIs from "../../constants/APIs";
import constants from "../../constants/constants";
import handle from "../../functions/handle";
import axios from "axios";

@Injectable({
    providedIn: 'root',
})

export class TourService {

    constructor(
        private httpClient: HttpClient
    ) {

    }

    getListTour(data: any): Observable<any> {
        const headers = handle.requestHeaders();
        let queryParams = new HttpParams();
        queryParams = queryParams.append("page",data.page);
        queryParams = queryParams.append("size",data.size);
        queryParams = queryParams.append("sort",data.sort);
        if (data.searchName) {
            queryParams = queryParams.append("searchName",data.searchName);
        }
        if (data.siteId) {
            queryParams = queryParams.append("siteId",data.siteId);
        }
        if (data.typeOfTours) {
          for (let index = 0; index < data.typeOfTours.length; index++) {
            queryParams = queryParams.append("typeOfTours",data.typeOfTours[index]);
          }
        }
        if (data.suitableIds) {
          for (let index = 0; index < data.suitableIds.length; index++) {
            queryParams = queryParams.append("suitableIds",data.suitableIds[index]);
          }
        }
        if (data.lengthStayIds) {
          for (let index = 0; index < data.lengthStayIds.length; index++) {
            queryParams = queryParams.append("lengthStayIds",data.lengthStayIds[index]);
          }
        }
        let options = {
            headers: headers,
            params: queryParams
        };
        return this.httpClient.get(`${APIs.API_GET_LIST_TOUR}`, options);
    };

    TourDetail(id: number): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.get(`${APIs.API_GET_DETAIL_TOUR}/${id}`, options);
        // return this.httpClient.get(`${APIs.API_GET_DETAIL_ROOM}/${id}`);
    };

    addTour(formData: any) {
        const headers = handle.requestHeadersAxios();
        let options = {headers: headers};
        // return this.httpClient.post(`${APIs.API_ADD_TOUR}`, formData, {
        //     reportProgress: true,
        //     observe: 'events'
        // });
        return axios.post(`${APIs.API_ADD_TOUR}`, formData, options);
    };

    getAllSite(): Observable<any> {
        // return this.httpClient.get("https://provinces.open-api.vn/api/p/")
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.get(`${APIs.API_GET_LIST_SITE}`, options)
    }
}
