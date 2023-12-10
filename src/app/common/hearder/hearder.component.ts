import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TokenUtils } from 'src/app/auth/token.utils';

@Component({
  selector: 'app-hearder',
  templateUrl: './hearder.component.html',
  styleUrls: ['./hearder.component.css', 
  '../../../assets/vendor/bootstrap/css/bootstrap.min.css', 
  '../../../assets/vendor/bootstrap-icons/bootstrap-icons.css',
  '../../../assets/vendor/boxicons/css/boxicons.min.css',
  '../../../assets/vendor/quill/quill.snow.css',
  '../../../assets/vendor/quill/quill.bubble.css',
  '../../../assets/vendor/remixicon/remixicon.css',
  '../../../assets/vendor/simple-datatables/style.css',
]
})
export class HearderComponent {
  isProfileVisible = false
  elRef: any;
  isAdmin : boolean = false;
  isDepartment : boolean = false;
  textAdmin: String = '';
  constructor(
    private router: Router,
  ) { }
  public toggleProfileVisibility() {
    this.isProfileVisible = !this.isProfileVisible;
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent) {
    if (this.isProfileVisible) {
      const dropdown = this.elRef.nativeElement.querySelector('.dropdown-menu');
      if (dropdown && !dropdown.contains(event.target as Node)) {
        this.isProfileVisible = false;
      }
    }
  }

  public logout() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem("token_type");
    this.router.navigate(['/login']);
    return false;
  }

  ngOnInit(): void {
    const token = sessionStorage.getItem('access_token');
    if(token) {
      const data = TokenUtils.parseJwt(token);
      if(data.user.roleName === 'admin') {
        this.textAdmin = 'Admin'
        this.isAdmin = true;
      } else if(data.user.roleName === 'department') {
        this.textAdmin = 'Khoa CNTT'
        this.isDepartment = true;
      }
    }
  }
}
