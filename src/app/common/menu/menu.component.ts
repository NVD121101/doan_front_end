import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TokenUtils } from 'src/app/auth/token.utils';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css', 
  '../../../assets/vendor/bootstrap/css/bootstrap.min.css', 
  '../../../assets/vendor/bootstrap-icons/bootstrap-icons.css',
  '../../../assets/vendor/boxicons/css/boxicons.min.css',
  '../../../assets/vendor/quill/quill.snow.css',
  '../../../assets/vendor/quill/quill.bubble.css',
  '../../../assets/vendor/remixicon/remixicon.css',
  '../../../assets/vendor/simple-datatables/style.css',
]
})
export class MenuComponent {
  isAdmin : boolean = false;
  isDepartment : boolean = false;
  isSubject : boolean = false;
  isTeacher : boolean = false;
  isCollapsed1 = true;
  isCollapsed2 = true;
  isCollapsed3 = true;
  isCollapsed4 = true;
  isCollapsed5 = true;
  isActive = '';
  constructor(private router: Router) {
    // Nghe sự kiện NavigationEnd
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Kiểm tra route hiện tại
        const currentRoute = this.router.url;
        // Nếu đang ở route khác "/duyetdetai", thì thêm class collapsed
        if(currentRoute === '/duyetdetai') {
          this.isCollapsed1 = currentRoute !== '/duyetdetai';
          this.isActive = 'duyetdetai'
        }
        if(currentRoute === '/detaidaduyet') {
          this.isCollapsed1 = currentRoute !== '/detaidaduyet';
          this.isActive = 'detaidaduyet'
        }
        if(currentRoute === '/detaikhongduyet') {
          this.isCollapsed1 = currentRoute !== '/detaikhongduyet';
          this.isActive = 'detaikhongduyet'
        }
        if(currentRoute === '/duyethoidong') {
          this.isCollapsed2 = currentRoute !== '/duyethoidong';
          this.isActive = 'duyethoidong'
        }
        if(currentRoute === '/hoidongdaduyet') {
          this.isCollapsed2 = currentRoute !== '/hoidongdaduyet';
          this.isActive = 'hoidongdaduyet'
        }
        if(currentRoute === '/hoidongkhongduyet') {
          this.isCollapsed2 = currentRoute !== '/hoidongkhongduyet';
          this.isActive = 'hoidongkhongduyet'
        }
        if(currentRoute === '/soluongsinhvienhdpb') {
          this.isCollapsed3 = currentRoute !== '/soluongsinhvienhdpb';
          this.isActive = 'soluongsinhvienhdpb'
        }
        if(currentRoute === '/sinhvienbaovethanhcong') {
          this.isCollapsed3 = currentRoute !== '/sinhvienbaovethanhcong';
          this.isActive = 'sinhvienbaovethanhcong'
        }
        if(currentRoute === '/bieudo') {
          this.isCollapsed3 = currentRoute !== '/bieudo';
          this.isActive = 'bieudo'
        }
        if(currentRoute === '/danhsachbomon') {
          this.isCollapsed4 = currentRoute !== '/danhsachbomon';
          this.isActive = 'danhsachbomon'
        }
        if(currentRoute === '/themsuabomon') {
          this.isCollapsed4 = currentRoute !== '/themsuabomon';
          this.isActive = 'themsuabomon'
        }
        if(currentRoute === '/danhsachgiangvien') {
          this.isCollapsed5 = currentRoute !== '/danhsachgiangvien';
          this.isActive = 'danhsachgiangvien'
        }
        if(currentRoute === '/themsuagiangvien') {
          this.isCollapsed5 = currentRoute !== '/themsuagiangvien';
          this.isActive = 'themsuagiangvien'
        }
        if(currentRoute === '/cauhinh') {
          this.isCollapsed5 = currentRoute !== '/cauhinh';
          this.isActive = 'cauhinh'
        }
      }
    });
  }

  toggleCollapse1() {
    this.isCollapsed1 = !this.isCollapsed1;
  }
  toggleCollapse2() {
    this.isCollapsed2 = !this.isCollapsed2;
  }
  toggleCollapse3() {
    this.isCollapsed3 = !this.isCollapsed3;
  }
  toggleCollapse4() {
    this.isCollapsed4 = !this.isCollapsed4;
  }
  toggleCollapse5() {
    this.isCollapsed5 = !this.isCollapsed5;
  }

  ngOnInit(): void {
    const token = sessionStorage.getItem('access_token');
    if(token) {
      const data = TokenUtils.parseJwt(token);
      if(data.user.roleName === 'admin') {
        this.isAdmin = true;
      } else if(data.user.roleName === 'department') {
        this.isDepartment = true;
      }
    }
  }
}
