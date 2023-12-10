import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AppConstants } from 'src/app/app-constans';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public message: string = '';
  public isMessage: boolean = false;
  public loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(
    private router: Router,
    public http: HttpClient,
  ) { }

  isValid = true;

  ngOnInit(): void {
    sessionStorage.removeItem("access_token");
    if (this.router.url === '/logout') {
      this.router.navigate(['']);
    }
  };
  
  login(): void {
    if( this.loginForm.value.password == '' || this.loginForm.value.username == '') {
      this.isMessage = true
      this.message = 'Nhập username và password'
    }
    if (this.loginForm.value.username && this.loginForm.value.password) {
      this.http.post(AppConstants.BASE_URL_API + "/user/login", JSON.stringify(this.loginForm.value)).subscribe(
        {
          next: (body: any) => {
            if (body && body?.accessToken && body?.tokenType) {
              sessionStorage.setItem("access_token", body?.accessToken);
              sessionStorage.setItem("token_type", body?.tokenType);
              this.router.navigate(['/home']).then(() => {
                window.location.reload();
              })
            } else {  
              this.isMessage = true
              this.message = 'Sai username hoặc password'
            }
          },
          error: (error) => {
            this.message = error.message
          }
        }
      );
    } else {
      this.isValid = false;
    }
  }


}
