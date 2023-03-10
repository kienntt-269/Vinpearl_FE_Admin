import { environment } from "src/environments/environment.prod";

export default {

  //dashboard
  API_DASHBOARD_GET_BOOKING_TICKET_BY_MONTH: environment.BASE_PATH_DOMAIN + '/booking-ticket',
  API_DASHBOARD_GET_BOOKING_ROOM_BY_MONTH: environment.BASE_PATH_DOMAIN + '/booking-room',
  API_DASHBOARD_GET_BOOKING_TOUR_BY_MONTH: environment.BASE_PATH_DOMAIN + '/booking-tour',

  //account
  AUTH_LOGIN: environment.BASE_PATH_DOMAIN + '/user/login',
  AUTH_REGISTER: environment.BASE_PATH_DOMAIN + '/user/register',
  API_GET_LIST_ACCOUNT: environment.BASE_PATH_DOMAIN + '/user/search',
  API_GET_DETAIL_ACCOUNT: environment.BASE_PATH_DOMAIN + '/user/detail',
  API_GET_LIST_PERMISSION: environment.BASE_PATH_DOMAIN + '/user/permission/findAll',

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
  API_FINDALL_HOTEL: environment.BASE_PATH_DOMAIN + '/hotel/findAll',

  // hotel
  API_ADD_TOUR: environment.BASE_PATH_DOMAIN + '/tour/create',
  API_UPDATE_TOUR: environment.BASE_PATH_DOMAIN + '/tour/update',
  API_GET_DETAIL_TOUR: environment.BASE_PATH_DOMAIN + '/tour/detail',
  API_GET_LIST_TOUR: environment.BASE_PATH_DOMAIN + '/tour/search',
  API_DELETE_TOUR: environment.BASE_PATH_DOMAIN + '/tour/delete',

  // room type
  API_ADD_ROOM_TYPE: environment.BASE_PATH_DOMAIN + '/room/room-type/create',
  API_UPDATE_ROOM_TYPE: environment.BASE_PATH_DOMAIN + '/room/room-type/update',
  API_GET_DETAIL_ROOM_TYPE: environment.BASE_PATH_DOMAIN + '/room/room-type/detail',
  API_SEARCH_LIST_TYPE_OF_ROOM: environment.BASE_PATH_DOMAIN + '/room/room-type/search',
  API_DELETE_ROOM_TYPE: environment.BASE_PATH_DOMAIN + '/room/room-type/delete',
  API_GET_LIST_TYPE_OF_ROOM: environment.BASE_PATH_DOMAIN + '/room/room-type/findAll',

  // room
  API_ADD_ROOM: environment.BASE_PATH_DOMAIN + '/room/create',
  API_UPDATE_ROOM: environment.BASE_PATH_DOMAIN + '/room/update',
  API_GET_DETAIL_ROOM: environment.BASE_PATH_DOMAIN + '/room/detail',
  API_GET_LIST_ROOM: environment.BASE_PATH_DOMAIN + '/room/search',
  API_DELETE_ROOM: environment.BASE_PATH_DOMAIN + '/room/delete',

  // service
  API_ADD_SERVICE: environment.BASE_PATH_DOMAIN + '/service/create',
  API_UPDATE_SERVICE: environment.BASE_PATH_DOMAIN + '/service/update',
  API_GET_DETAIL_SERVICE: environment.BASE_PATH_DOMAIN + '/service/detail',
  API_SEARCH_LIST_SERVICE: environment.BASE_PATH_DOMAIN + '/service/search',
  API_DELETE_SERVICE: environment.BASE_PATH_DOMAIN + '/service/delete',
  API_GET_LIST_SERVICE: environment.BASE_PATH_DOMAIN + '/service/findAll',

  // description
  API_ADD_DESCRIPTION: environment.BASE_PATH_DOMAIN + '/service/description/create',
  API_GET_LIST_DESCRIPTION: environment.BASE_PATH_DOMAIN + '/service/description/findAll',

  // content
  API_ADD_CONTENT: environment.BASE_PATH_DOMAIN + '/service/content/create',
  API_GET_LIST_CONTENT: environment.BASE_PATH_DOMAIN + '/service/content/findAll',

  // l??u c??? 3 service, description v?? content
  API_SAVE_SERVICE: environment.BASE_PATH_DOMAIN + '/service/save',

  // booking
  API_ADD_BOOKING: environment.BASE_PATH_DOMAIN + '/booking/create',
  API_UPDATE_BOOKING: environment.BASE_PATH_DOMAIN + '/booking/update',
  API_GET_DETAIL_BOOKING: environment.BASE_PATH_DOMAIN + '/booking/detail',
  API_GET_LIST_BOOKING: environment.BASE_PATH_DOMAIN + '/booking/search',
  API_DELETE_BOOKING: environment.BASE_PATH_DOMAIN + '/booking/delete',
}
