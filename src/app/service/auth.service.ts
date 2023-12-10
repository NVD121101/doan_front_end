import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenUtils } from '../auth/token.utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Thêm các biến và logic xác thực ở đây
  token: any;
  data: any;
  constructor(private router: Router) {
  this.token = sessionStorage.getItem('access_token');
  this.data = TokenUtils.parseJwt(this.token);
  }
  // Kiểm tra xem người dùng đã đăng nhập hay chưa
  isAuthenticated(): boolean {
    // Kiểm tra logic xác thực, ví dụ: kiểm tra token, kiểm tra thông tin người dùng, v.v.
    return !!localStorage.getItem('access_token');
  }

  // Kiểm tra xem người dùng có vai trò admin hay không
  isAdmin(): boolean {
    // Kiểm tra logic vai trò của người dùng
    // Ví dụ: kiểm tra role trong thông tin người dùng hoặc token
    if(this.data.user.roleName === 'admin') {
      return true;
    } else {
      this.router.navigate(['unauthorized']);
      return false;
    }
  }

  // Kiểm tra xem người dùng có vai trò người dùng thông thường hay không
  isDepartment(): boolean {
    if(this.data.user.roleName === 'department') {
      return true;
    } else {
      this.router.navigate(['unauthorized']);
      return false;
    }
  }

  isTeacher(): boolean {
    if(this.data.user.roleName === 'teacher') {
      return true;
    } else {
      this.router.navigate(['unauthorized']);
      return false;
    }
  }

  isSubject(): boolean {
    if(this.data.user.roleName === 'subject') {
      return true;
    } else {
      this.router.navigate(['unauthorized']);
      return false;
    }
  }



  // Thêm các phương thức khác cần thiết cho việc xác thực và phân quyền
}
