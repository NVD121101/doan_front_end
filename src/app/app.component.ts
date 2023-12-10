import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  [x: string]: any;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!sessionStorage.getItem("access_token")) {
      this.router.navigate(['login'])
    }
  }
}
