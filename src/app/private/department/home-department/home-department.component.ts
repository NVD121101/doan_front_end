import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { MasterDetailService } from 'src/app/service/master-detail.service';
import { SubjectService } from 'src/app/service/subject.service';
import { TeacherService } from 'src/app/service/teacher.service';

@Component({
  selector: 'app-home-department',
  templateUrl: './home-department.component.html',
  styleUrls: ['./home-department.component.css', 
  '../../../../assets/vendor/bootstrap/css/bootstrap.min.css', 
  '../../../../assets/vendor/bootstrap-icons/bootstrap-icons.css',
  '../../../../assets/vendor/boxicons/css/boxicons.min.css',
  '../../../../assets/vendor/quill/quill.snow.css',
  '../../../../assets/vendor/quill/quill.bubble.css',
  '../../../../assets/vendor/remixicon/remixicon.css',
  '../../../../assets/vendor/simple-datatables/style.css',
]
})
export class HomeDepartmentComponent {
  constructor(private router: Router, private subjectService: SubjectService,  private teacherService: TeacherService, private masterDetailService: MasterDetailService) {}
  totalSubjects: number = 0;
  offset:any = '0';
  limit:any = '5';
  subjectId:any = '';
  listTeacher!: any[];
  message!: String;
  searchName: String = '';
  searchNameNew: String = '';
  totalTeachers: number= 0;
  totalMasterDetail: number= 0;
  totalMasterDetailSuccess: number = 0;
  totalMasterDetailNoSuccess: number = 0;
  ngOnInit() {
    this.subjectService
      .getSubject()
      .pipe(
        //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
        catchError((error) => throwError(error.error))
      )
      .subscribe((response) => {
        this.totalSubjects = response.totalSubject
    });

    this.masterDetailService
      .getAllMasterDetail()
      .pipe(
        //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
        catchError((error) => {
          console.log(error);
          return throwError(error.error);
        })
      )
      .subscribe((response) => {
        this.totalMasterDetail = response.totalRecords
    });
    
    this.masterDetailService
      .getMasterDetailSuccess()
      .pipe(
        //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
        catchError((error) => throwError(error.error))
      )
      .subscribe((response) => {
        this.totalMasterDetailSuccess = response.totalRecords
    });
    this.masterDetailService
      .getMasterDetailNoSuccess()
      .pipe(
        //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
        catchError((error) => throwError(error.error))
      )
      .subscribe((response) => {
        this.totalMasterDetailNoSuccess = response.totalRecords
    });

    this.teacherService
      .getAllTeacher(this.searchNameNew, this.offset, this.limit, this.subjectId)
      .pipe(
        catchError((error) => {
          this.message = error.message
           return throwError(error.error)
        })
      )
      .subscribe((response) => {
        this.totalTeachers = response.totalRecords;
    });
  }
}
