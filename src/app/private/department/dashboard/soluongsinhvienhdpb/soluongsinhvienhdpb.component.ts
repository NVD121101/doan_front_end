import { Component } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MasterDetailService } from 'src/app/service/master-detail.service';
import { MasterService } from 'src/app/service/master.service';
import { SubjectService } from 'src/app/service/subject.service';
import { TeacherService } from 'src/app/service/teacher.service';

@Component({
  selector: 'app-soluongsinhvienhdpb',
  templateUrl: './soluongsinhvienhdpb.component.html',
  styleUrls: [
    './soluongsinhvienhdpb.component.css',
    '../../../../../assets/vendor/bootstrap/css/bootstrap.min.css',
    '../../../../../assets/vendor/bootstrap-icons/bootstrap-icons.css',
    '../../../../../assets/vendor/boxicons/css/boxicons.min.css',
    '../../../../../assets/vendor/quill/quill.snow.css',
    '../../../../../assets/vendor/quill/quill.bubble.css',
    '../../../../../assets/vendor/remixicon/remixicon.css',
    '../../../../../assets/vendor/simple-datatables/style.css',
  ],
})
export class SoluongsinhvienhdpbComponent {
  listSubjects: any;
  listTeachers: any;
  isshowDropdown = false;
  nameSubject = '';
  idSubject!: number;
  teacherName = '';
  offset = 0;
  limit = 5;
  totalPage = 1;
  totalRecords = 0;
  nameMaster = '';
  pageCurr!: number;
  isPaging = true;
  isLeft!: boolean;
  isRight!: boolean;
  isShowData: boolean = false;
  valueInputSearch = '';
  teacher!: any;
  teacherNamePopup = '';
  listMasterDetailHd: any;
  listMasterDetailPb: any;
  listMaster: any;
  idMaster!: number;
  isshowDropdownMaster = false;
  constructor(
    private subjectService: SubjectService,
    private teacherService: TeacherService,
    private masterDetailService: MasterDetailService,
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
        this.teacherService
          .getAllTeacher(
            this.teacherName,
            this.offset,
            this.limit,
            this.idSubject
          )
          .pipe(
            //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
            catchError((error) => throwError(error.error))
          )
          .subscribe((response) => {
            this.listTeachers = response.teachers;
            this.totalRecords = response.totalRecords;
            this.totalPage = Math.ceil(this.totalRecords / this.limit);
            this.pageCurr = 1;
            if (this.totalRecords <= this.limit) {
              this.isPaging = false;
            }
            if (this.pageCurr == 1) {
              this.isLeft = true;
            } else {
              this.isLeft = false;
            }

            if (this.pageCurr == this.totalPage) {
              this.isRight = true;
            } else {
              this.isRight = false;
            }
          });
        this.masterService
          .getMasterBySubject(this.idSubject)
          .pipe(
            //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
            catchError((error) => throwError(error.error))
          )
          .subscribe((response) => {
            this.listMaster = response.masterDtos;
            this.nameMaster = this.listMaster[0].masterName;
            this.idMaster = this.listMaster[0].masterId;
          });
      });
  }
  handleDropdownMasterClick(id: number, name: string) {
    this.idMaster = id;
    this.nameMaster = name;
    this.isshowDropdownMaster = false;
  }

  showDropdownMaster() {
    this.isshowDropdownMaster = !this.isshowDropdownMaster;
  }
  showDropdown() {
    this.isshowDropdown = !this.isshowDropdown;
  }

  handleDropdownClick(id: number, name: string) {
    this.offset = 0;
    this.teacherName = '';
    this.pageCurr = 1;
    this.idSubject = id;
    this.nameSubject = name;
    this.isshowDropdown = false;
    this.teacherService
      .getAllTeacher(this.teacherName, this.offset, this.limit, this.idSubject)
      .pipe(
        //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
        catchError((error) => throwError(error.error))
      )
      .subscribe((response) => {
        this.listTeachers = response.teachers;
        this.totalRecords = response.totalRecords;
        this.totalPage = Math.ceil(this.totalRecords / this.limit);
        if (this.totalRecords <= this.limit) {
          this.isPaging = false;
        } else {
          this.isPaging = true;
        }

        if (this.pageCurr == 1) {
          this.isLeft = true;
        } else {
          this.isLeft = false;
        }

        if (this.pageCurr == this.totalPage) {
          this.isRight = true;
        } else {
          this.isRight = false;
        }
      });
    this.masterService
      .getMasterBySubject(this.idSubject)
      .pipe(
        //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
        catchError((error) => throwError(error.error))
      )
      .subscribe((response) => {
        this.listMaster = response.masterDtos;
        console.log(this.listMaster);

        if (this.listMaster.length > 0) {
          this.nameMaster = this.listMaster[0].masterName;
          this.idMaster = this.listMaster[0].masterId;
        } else {
          this.nameMaster = '';
          this.idMaster = 0;
        }
      });
  }
  pagesArray(): number[] {
    return Array(this.totalPage)
      .fill(0)
      .map((x, i) => i + 1);
  }

  goToPage(page: number) {
    this.pageCurr = page;
    this.offset = (page - 1) * this.limit;
    this.teacherService
      .getAllTeacher(this.teacherName, this.offset, this.limit, this.idSubject)
      .pipe(
        //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
        catchError((error) => throwError(error.error))
      )
      .subscribe((response) => {
        this.listTeachers = response.teachers;
        this.totalRecords = response.totalRecords;
        this.totalPage = Math.ceil(this.totalRecords / this.limit);
        if (this.totalRecords <= this.limit) {
          this.isPaging = false;
        } else {
          this.isPaging = true;
        }

        if (this.pageCurr == 1) {
          this.isLeft = true;
        } else {
          this.isLeft = false;
        }

        if (this.pageCurr == this.totalPage) {
          this.isRight = true;
        } else {
          this.isRight = false;
        }
      });
  }

  handleSearch() {
    this.teacherName = this.valueInputSearch;
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
        this.teacherService
          .getAllTeacher(
            this.teacherName,
            this.offset,
            this.limit,
            this.idSubject
          )
          .pipe(
            //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
            catchError((error) => throwError(error.error))
          )
          .subscribe((response) => {
            this.listTeachers = response.teachers;
            this.totalRecords = response.totalRecords;
            this.totalPage = Math.ceil(this.totalRecords / this.limit);
            this.pageCurr = 1;
            if (this.totalRecords <= this.limit) {
              this.isPaging = false;
            } else {
              this.isPaging = true;
            }
            if (this.pageCurr == 1) {
              this.isLeft = true;
            } else {
              this.isLeft = false;
            }

            if (this.pageCurr == this.totalPage) {
              this.isRight = true;
            } else {
              this.isRight = false;
            }
          });
      });
    this.valueInputSearch = '';
  }

  handleShowData(teacherId: any) {
    this.teacherService
      .getTeacherById(teacherId)
      .pipe(catchError((error) => throwError(error.error)))
      .subscribe((response) => {
        this.teacher = response.teacher;
        this.teacherNamePopup = this.teacher.teacherName;
      });

    this.masterDetailService
      .getMasterDetailByGvhd(teacherId, this.idMaster)
      .pipe(catchError((error) => throwError(error)))
      .subscribe((response) => {
        this.listMasterDetailHd = response.masterDetails;
      });

    this.masterDetailService
      .getMasterDetailByGvpb(teacherId, this.idMaster)
      .pipe(catchError((error) => throwError(error)))
      .subscribe((response) => {
        this.listMasterDetailPb = response.masterDetails;
      });

    this.isShowData = true;
  }

  handleHidenData() {
    this.isShowData = false;
  }
}
