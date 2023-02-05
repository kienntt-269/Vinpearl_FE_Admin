import { environment } from "src/environments/environment.prod";

export default {

  //account
  AUTH_LOGIN: environment.BASE_PATH_DOMAIN + '/user/login',
  AUTH_REGISTER: environment.BASE_PATH_DOMAIN + '/user/register',
  API_GET_LIST_ACCOUNT: environment.BASE_PATH_DOMAIN + '/user/123',

  // hotel
  API_ADD_HOTEL: environment.BASE_PATH_DOMAIN + '/hotel/create',
  API_UPDATE_HOTEL: environment.BASE_PATH_DOMAIN + '/hotel/update',
  API_GET_DETAIL_HOTEL: environment.BASE_PATH_DOMAIN + '/hotel/detail',
  API_GET_LIST_HOTEL: environment.BASE_PATH_DOMAIN + '/hotel/search',
  API_DELETE_HOTEL: environment.BASE_PATH_DOMAIN + '/hotel/delete',

  // room
  API_ADD_ROOM: environment.BASE_PATH_DOMAIN + '/room/create',
  API_UPDATE_ROOM: environment.BASE_PATH_DOMAIN + '/room/update',
  API_GET_DETAIL_ROOM: environment.BASE_PATH_DOMAIN + '/room/detail',
  API_GET_LIST_ROOM: environment.BASE_PATH_DOMAIN + '/room/search',
  API_DELETE_ROOM: environment.BASE_PATH_DOMAIN + '/room/delete',

  // booking
  API_ADD_BOOKING: environment.BASE_PATH_DOMAIN + '/booking/create',
  API_UPDATE_BOOKING: environment.BASE_PATH_DOMAIN + '/booking/update',
  API_GET_DETAIL_BOOKING: environment.BASE_PATH_DOMAIN + '/booking/detail',
  API_GET_LIST_BOOKING: environment.BASE_PATH_DOMAIN + '/booking/search',
  API_DELETE_BOOKING: environment.BASE_PATH_DOMAIN + '/booking/delete',
}
