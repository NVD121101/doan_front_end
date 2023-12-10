import { Component } from '@angular/core';
import { TokenUtils } from 'src/app/auth/token.utils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', 
  '../../../assets/vendor/bootstrap/css/bootstrap.min.css', 
  '../../../assets/vendor/bootstrap-icons/bootstrap-icons.css',
  '../../../assets/vendor/boxicons/css/boxicons.min.css',
  '../../../assets/vendor/quill/quill.snow.css',
  '../../../assets/vendor/quill/quill.bubble.css',
  '../../../assets/vendor/remixicon/remixicon.css',
  '../../../assets/vendor/simple-datatables/style.css',
]
})
export class ProfileComponent {
  isAdmin : boolean = false;
  isDepartment : boolean = false;
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
