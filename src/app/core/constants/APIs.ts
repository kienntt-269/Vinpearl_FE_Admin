import { environment } from "src/environments/environment.prod";

export default {

  //dashboard
  API_DASHBOARD_GET_BOOKING_TICKET_BY_MONTH: environment.BASE_PATH_DOMAIN + '/booking-ticket',
  API_DASHBOARD_GET_BOOKING_ROOM_BY_MONTH: environment.BASE_PATH_DOMAIN + '/booking-room',
  API_DASHBOARD_GET_BOOKING_TOUR_BY_MONTH: environment.BASE_PATH_DOMAIN + '/booking-tour',

  //account
  AUTH_LOGIN: environment.BASE_PATH_DOMAIN + '/user/login',
  AUTH_REGISTER: environment.BASE_PATH_DOMAIN + '/user/register',
  API_GET_LIST_ACCOUNT: environment.BASE_PATH_DOMAIN + '/user/123',

  // site
  API_ADD_SITE: environment.BASE_PATH_DOMAIN + '/site/create',
  API_UPDATE_SITE: environment.BASE_PATH_DOMAIN + '/site/update',
  API_GET_DETAIL_SITE: environment.BASE_PATH_DOMAIN + '/site/detail',
  API_GET_LIST_SITE: environment.BASE_PATH_DOMAIN + '/site/findAll',
  API_DELETE_SITE: environment.BASE_PATH_DOMAIN + '/site/delete',

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
