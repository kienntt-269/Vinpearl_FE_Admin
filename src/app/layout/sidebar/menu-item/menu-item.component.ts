import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MENU_EN } from 'src/app/shared/data/menu/menu-en';
import { MENU_VI } from 'src/app/shared/data/menu/menu-vi';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input() status: any;
  @Input() item: any;

  menus: any;
  menuSelect: any;
  isToggleMenu: Boolean = false;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.menus = localStorage.getItem('lang') == 'vi' ? MENU_VI : MENU_EN;
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
