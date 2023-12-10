import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { TokenUtils } from 'src/app/auth/token.utils';
import { SubjectService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-danhsachbomon',
  templateUrl: './danhsachbomon.component.html',
  styleUrls: ['./danhsachbomon.component.css',
  '../../../../../assets/vendor/bootstrap/css/bootstrap.min.css',
  '../../../../../assets/vendor/bootstrap-icons/bootstrap-icons.css',
  '../../../../../assets/vendor/boxicons/css/boxicons.min.css',
  '../../../../../assets/vendor/quill/quill.snow.css',
  '../../../../../assets/vendor/quill/quill.bubble.css',
  '../../../../../assets/vendor/remixicon/remixicon.css',
  '../../../../../assets/vendor/simple-datatables/style.css',
],
})
export class DanhsachbomonComponent {
  listSubjects: any;
  isAdmin : boolean = false;
  isDepartment : boolean = false;
  constructor(
    private subjectService: SubjectService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.subjectService
      .getSubject()
      .pipe(
        //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
        catchError((error) => throwError(error.error))
      )
      .subscribe((response) => {
        this.listSubjects = response.subjects;
        
      });
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

  handleEditSubject(subjectId: number) {
    this.router.navigate(['/themsuabomon'], {state: {subjectId: subjectId}})    
  }
}
