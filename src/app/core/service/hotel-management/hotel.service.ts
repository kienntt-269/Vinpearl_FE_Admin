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

export class HotelService {

    constructor(
        private httpClient: HttpClient
    ) {

    }

    getListHotel(data: any): Observable<any> {
      const headers = handle.requestHeaders();
      let queryParams = new HttpParams();
      if (data.name) {
        queryParams = queryParams.append("name",data.name);
      }
      if (data.description) {
        queryParams = queryParams.append("description",data.description);
      }
      if (data.price) {
        queryParams = queryParams.append("price",data.price);
      }
      if (data.page || data.page == 0) {
        queryParams = queryParams.append("page",data.page);
      }
      if (data.size) {
        queryParams = queryParams.append("size",data.size);
      }
      if (data.sort) {
        queryParams = queryParams.append("sort",data.sort);
      }
      let options = {
        headers: headers,
        params: queryParams,
      };
        return this.httpClient.get(`${APIs.API_GET_LIST_HOTEL}`, options);
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
        return axios.post(`${APIs.API_ADD_HOTEL}`, formData);
    };

    getAllSite(): Observable<any> {
        // return this.httpClient.get("https://provinces.open-api.vn/api/p/")
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.get(`${APIs.API_GET_LIST_SITE}`, options)
    }
}
