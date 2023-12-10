import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { MasterDetailService } from 'src/app/service/master-detail.service';
import { MasterService } from 'src/app/service/master.service';
import { SubjectService } from 'src/app/service/subject.service';
import { TeacherService } from 'src/app/service/teacher.service';

@Component({
  selector: 'app-duyetdetai',
  templateUrl: './duyetdetai.component.html',
  styleUrls: [
    './duyetdetai.component.css',
    '../../../../../assets/vendor/bootstrap/css/bootstrap.min.css',
    '../../../../../assets/vendor/bootstrap-icons/bootstrap-icons.css',
    '../../../../../assets/vendor/boxicons/css/boxicons.min.css',
    '../../../../../assets/vendor/quill/quill.snow.css',
    '../../../../../assets/vendor/quill/quill.bubble.css',
    '../../../../../assets/vendor/remixicon/remixicon.css',
    '../../../../../assets/vendor/simple-datatables/style.css',
  ],
})
export class DuyetdetaiComponent {
  listSubjects: any;
  listMasters: any;
  isshowDropdown = false;
  nameSubject = '';
  idSubject!: number;
  masterDetails: any;
  isshowDropdownMaster = false;
  schoolYear: string = '';
  listSchoolYear: any;

  constructor(
    private subjectService: SubjectService,
    private masterService: MasterService
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
        this.nameSubject = this.listSubjects[0]?.subjectName;
        this.idSubject = this.listSubjects[0]?.subjectId;
        this.masterService
          .getMasterBySubjectAndStatus(this.idSubject, '', this.schoolYear)
          .pipe(
            //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
            catchError((error) => throwError(error.error))
          )
          .subscribe((response) => {
            this.listMasters = response.masterDtos;
          });
        this.masterService
          .findAllByUniqueSchoolYear(this.idSubject)
          .pipe(
            //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
            catchError((error) => throwError(error.error))
          )
          .subscribe((response) => {
            // schoolYear =
            this.listSchoolYear = response;
            this.schoolYear = this.listSchoolYear[0].schoolYear;
          });
      });
  }

  showDropdown() {
    this.isshowDropdown = !this.isshowDropdown;
  }
  showDropdownMaster() {
    this.isshowDropdownMaster = !this.isshowDropdownMaster;
  }
  handleDropdownClick(id: number, name: string) {
    this.idSubject = id;
    this.nameSubject = name;
    this.isshowDropdown = false;
    this.masterService
      .getMasterBySubjectAndStatus(this.idSubject, '', this.schoolYear)
      .pipe(
        //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
        catchError((error) => throwError(error.error))
      )
      .subscribe((response) => {
        this.listMasters = response.masterDtos;
      });
      this.masterService
      .findAllByUniqueSchoolYear(this.idSubject)
      .pipe(
        //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
        catchError((error) => throwError(error.error))
      )
      .subscribe((response) => {
        console.log(response);
        this.listSchoolYear = response;
        if(response.length > 0) {
          this.schoolYear = this.listSchoolYear[0].schoolYear;
        } else {
          this.schoolYear = ''
        }

      });
  }

  duyetDetai(masterId: any) {
    const data = {
      masterId: masterId,
      statusDepartment: '1',
    };
    this.masterService
      .editMasterByDepartment(data)
      .pipe(catchError((error) => throwError(error.error)))
      .subscribe((response) => {
        this.masterService
          .getMasterBySubjectAndStatus(this.idSubject, '', this.schoolYear)
          .pipe(
            //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
            catchError((error) => throwError(error.error))
          )
          .subscribe((response) => {
            this.listMasters = response.masterDtos;
          });
      });
  }
  khongDuyetDetai(masterId: any) {
    const data = {
      masterId: masterId,
      statusDepartment: '0',
    };
    this.masterService
      .editMasterByDepartment(data)
      .pipe(catchError((error) => throwError(error.error)))
      .subscribe((response) => {
        this.masterService
          .getMasterBySubjectAndStatus(this.idSubject, '', this.schoolYear)
          .pipe(
            //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
            catchError((error) => throwError(error.error))
          )
          .subscribe((response) => {
            this.listMasters = response.masterDtos;
          });
      });
  }

  handleDropdownClickSchoolYear(schoolYear: string) {
    this.schoolYear = schoolYear;
    this.isshowDropdownMaster = false;
  }
}
