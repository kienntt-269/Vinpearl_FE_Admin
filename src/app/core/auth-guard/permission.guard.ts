import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const permission = route.data['permission']; // Lấy quyền từ route
    // Kiểm tra xem người dùng có quyền truy cập vào trang hay không
    if (this.authService['hasPermission'](permission)) {
      return true;
    } else {
      // Nếu không có quyền, chuyển hướng đến trang lỗi hoặc trang khác
      this.router.navigate(['/pages/500']);
      return false;
    }
  }
}
