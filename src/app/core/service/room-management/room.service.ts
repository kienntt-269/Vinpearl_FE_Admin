import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import axios from "axios";
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

    getListHotel(): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.get(`${APIs.API_FINDALL_HOTEL}`, options);
    };

    //room

    getListRoom(data: any): Observable<any> {
        const headers = handle.requestHeaders();
        let queryParams = new HttpParams();
        if (data.name) {
          queryParams = queryParams.append("name",data.name);
        }
        if (data.roomType) {
          queryParams = queryParams.append("roomType",data.roomType);
        }
        if (data.status) {
          queryParams = queryParams.append("status",data.status);
        }
        if (data.startTime) {
          queryParams = queryParams.append("startTime",data.startTime);
        }
        if (data.endTime) {
          queryParams = queryParams.append("endTime",data.endTime);
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
        return this.httpClient.get(`${APIs.API_GET_LIST_ROOM}`, options);
    };

    roomDetail(id: number): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.get(`${APIs.API_GET_DETAIL_ROOM}/${id}`, options);
        // return this.httpClient.get(`${APIs.API_GET_DETAIL_ROOM}/${id}`);
    };

    addRoom(formData: any): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.post(`${APIs.API_ADD_ROOM}`, formData, options);
        // return this.httpClient.get(`${APIs.API_GET_DETAIL_ROOM}/${id}`);
    };

    updateRoom(id: any, formData: any): Observable<any> {
      const headers = handle.requestHeaders();
      let options = {headers: headers};
      return this.httpClient.put(`${APIs.API_UPDATE_ROOM}/${id}`, formData, options);
    };

    //room type

    getListRoomType(data: any): Observable<any> {
      const headers = handle.requestHeaders();
      let queryParams = new HttpParams();
      if (data.hotelName) {
        queryParams = queryParams.append("hotelName",data.hotelName);
      }
      if (data.numberPerson) {
        queryParams = queryParams.append("numberPerson",data.numberPerson);
      }
      if (data.startTime) {
        queryParams = queryParams.append("startTime",data.startTime);
      }
      if (data.endTime) {
        queryParams = queryParams.append("endTime",data.endTime);
      }
      if (data.name) {
        queryParams = queryParams.append("name",data.name);
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
        return this.httpClient.get(`${APIs.API_SEARCH_LIST_TYPE_OF_ROOM}`, options);
    };

    getListRoomTypeByHotelId(hotelId: any): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.get(`${APIs.API_SEARCH_LIST_TYPE_OF_ROOM_BY_HOTEL_ID}/${hotelId}`, options);
    };

    roomTypeDetail(id: number): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.get(`${APIs.API_GET_DETAIL_ROOM_TYPE}/${id}`, options);
        // return this.httpClient.get(`${APIs.API_GET_DETAIL_ROOM}/${id}`);
    };

    // addRoomType(formData: any): Observable<any> {
    //     const headers = handle.requestHeadersFormData();
    //     let options = {headers: headers};
    //     return this.httpClient.post(`${APIs.API_ADD_ROOM_TYPE}`, formData, {
    //         reportProgress: true,
    //         observe: 'events'
    //       });
    //     // return this.httpClient.get(`${APIs.API_GET_DETAIL_ROOM}/${id}`);
    // };

    addRoomType(formData: any) {
      const headers = handle.requestHeadersAxios();
      let options = {headers: headers};
        return axios.post(`${APIs.API_ADD_ROOM_TYPE}`, formData, options);
        // return this.httpClient.get(`${APIs.API_GET_DETAIL_ROOM}/${id}`);
    };

    search(data: any): Observable<any> {
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
        return this.httpClient.get(`${APIs.API_SEARCH_LIST_SERVICE}`, options);
    };

    serviceDetail(id: number): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.get(`${APIs.API_GET_DETAIL_SERVICE}/${id}`, options);

    };

    saveService(data: any): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.post(`${APIs.API_SAVE_SERVICE}`, data, options);
    };

    getListService(): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.get(`${APIs.API_GET_LIST_SERVICE}`, options);
    };

    addService(data: any): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.post(`${APIs.API_ADD_SERVICE}`, data, options);
    };

    getListDescription(): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.get(`${APIs.API_GET_LIST_DESCRIPTION}`, options);
    };

    addDescription(data: any): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.post(`${APIs.API_ADD_DESCRIPTION}`, data, options);
    };

    getListContent(): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.get(`${APIs.API_GET_LIST_CONTENT}`, options);
    };

    addContent(data: any): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.post(`${APIs.API_ADD_CONTENT}`, data, options);
    };

    getListTypeOfRoom(): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.get(`${APIs.API_GET_LIST_TYPE_OF_ROOM}`, options);
    };
}
