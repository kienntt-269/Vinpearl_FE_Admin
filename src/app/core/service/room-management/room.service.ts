import { HttpClient } from "@angular/common/http";
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

    getListRoom(size: Number, pageIndex: Number, sort: any, name: String, totalRoom: any, phone: any): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.get(`${APIs.API_GET_LIST_ROOM}?&page=${pageIndex}&size=${size}&sort=${sort}`, options);
    };

    roomDetail(id: number): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.get(`${APIs.API_GET_DETAIL_ROOM}/${id}`, options);
        // return this.httpClient.get(`${APIs.API_GET_DETAIL_ROOM}/${id}`);
    };

    addRoom(formData: any): Observable<any> {
        const headers = handle.requestHeadersFormData();
        let options = {headers: headers};
        return this.httpClient.post(`${APIs.API_ADD_ROOM}`, formData, options);
        // return this.httpClient.get(`${APIs.API_GET_DETAIL_ROOM}/${id}`);
    };

    //room type

    getListRoomType(size: Number, pageIndex: Number, sort: any, hotelId: any, acreage: any, phone: any): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.get(`${APIs.API_SEARCH_LIST_TYPE_OF_ROOM}?hotelId=${hotelId}&acreage=${acreage}&phone=${phone}&page=${pageIndex}&size=${size}&sort=${sort}`, options);
    };

    roomTypeDetail(id: number): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        return this.httpClient.get(`${APIs.API_SEARCH_LIST_TYPE_OF_ROOM}/${id}`, options);
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
        const headers = handle.requestHeadersFormData();
        let options = {headers: headers};
        return axios.post(`${APIs.API_ADD_ROOM_TYPE}`, formData);
        // return this.httpClient.get(`${APIs.API_GET_DETAIL_ROOM}/${id}`);
    };

    search(size: Number, page: Number, sort: any): Observable<any> {
        const headers = handle.requestHeaders();
        let options = {headers: headers};
        const hotelId = localStorage.getItem(constants.HOTEL_ID) || 1;
        // return this.httpClient.get(`${APIs.BOOKING_DETAIL}/${id}`, options);
        return this.httpClient.get(`${APIs.API_SEARCH_LIST_SERVICE}?page=${page}&size=${size}&sort=${sort}`, options);
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