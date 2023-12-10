import { Component } from '@angular/core';
import { TokenUtils } from 'src/app/auth/token.utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
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
