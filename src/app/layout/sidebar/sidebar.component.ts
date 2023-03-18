import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import constants from 'src/app/core/constants/constants';
import { MENU_EN } from 'src/app/shared/data/menu/menu-en';
import { MENU_VI } from 'src/app/shared/data/menu/menu-vi';
import { PERMISSION } from 'src/app/shared/data/permission/permission';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() status: any;

  menus: any;
  menuSelect: any;
  isToggleMenu: Boolean = false;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.menus = localStorage.getItem('lang') == 'vi' ? MENU_VI : MENU_EN;
    this.menus = this.getChild(this.menus);
  }

  getChild(child: any) {
    let arrayRole: any[] = []
    let codes: string | any[];
    if (localStorage.getItem(constants.ROLE_ID) == '2') {
      codes = PERMISSION.ROLE_TOUR_HOTEL;
    } else if (localStorage.getItem(constants.ROLE_ID) == '3') {
      codes = PERMISSION.ROLE_CUSTOMER_CARE;
    } else {
      codes = PERMISSION.ROLE_ADMIN;
    }
    // let codes = ['WEB_LIVE_VIEW', 'WEB_PLAYBACK', 'WEB_CAMERA_MAP', 'WEB_SEARCH_ALL', 'WEB_DETECT_FACE', 'WEB_MANAGE_DETECT_FACE', 'WEB_TRACE_FACE', 'WEB_ALARM_EVENT' , 'WEB_EVENT' , 'WEB_ALARM', 'WEB_MANAGE_ACCOUNT']
    child.forEach((item: any) => {
      if (codes.indexOf(item.code) > -1 || item.code == "ALL") {
        if (item.children.length) {
          item.children = this.getChild(item.children)
        }
        arrayRole.push(item)
      }
    })
    return arrayRole
  }

  onItemSelected(item: any) {
    this.menuSelect = item;
    if (!item.children || !item.children.length) {
      this.router.navigate([item.path]);
    }

    if (item.children && item.children.length > 0) {
      this.isToggleMenu = !this.isToggleMenu;
    }
  }

  checkActive(router: any) {
    return router && this.router.url.includes(router);
  }
}
