import { Component } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { CoucilService } from 'src/app/service/coucil.service';
import { MasterDetailService } from 'src/app/service/master-detail.service';
import { SubjectService } from 'src/app/service/subject.service';
@Component({
  selector: 'app-hoidongdaduyet',
  templateUrl: './hoidongdaduyet.component.html',
  styleUrls: ['./hoidongdaduyet.component.css',
  '../../../../../assets/vendor/bootstrap/css/bootstrap.min.css',
  '../../../../../assets/vendor/bootstrap-icons/bootstrap-icons.css',
  '../../../../../assets/vendor/boxicons/css/boxicons.min.css',
  '../../../../../assets/vendor/quill/quill.snow.css',
  '../../../../../assets/vendor/quill/quill.bubble.css',
  '../../../../../assets/vendor/remixicon/remixicon.css',
  '../../../../../assets/vendor/simple-datatables/style.css',
],
})
export class HoidongdaduyetComponent {
  listSubjects: any;
  listCoucils: any;
  isshowDropdown = false;
  nameSubject = '';
  idSubject!: number;
  isShowData: boolean = false;
  listMasterDetails: any;
  schoolYear: string = '';
  listSchoolYear: any;
  isshowDropdownMaster = false;
  constructor(
    private subjectService: SubjectService,
    private coucilService: CoucilService,
    private masterDetailService: MasterDetailService
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
        this.coucilService
          .getCoucilByStatus(this.idSubject, '1', this.schoolYear)
          .pipe(
            //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
            catchError((error) => throwError(error.error))
          )
          .subscribe((response) => {
            this.listCoucils = response.coucilDTOS;
          });
          this.coucilService
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
  handleDropdownClickSchoolYear(schoolYear: string) {
    this.schoolYear = schoolYear;
    this.isshowDropdownMaster = false;
  }
  handleDropdownClick(id: number, name: string) {
    this.idSubject = id;
    this.nameSubject = name;
    this.isshowDropdown = false;
    this.coucilService
      .getCoucilByStatus(this.idSubject, '1', this.schoolYear)
      .pipe(
        //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
        catchError((error) => throwError(error.error))
      )
      .subscribe((response) => {
        this.listCoucils = response.coucilDTOS;
      });
      this.coucilService
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
  
  handleShowData(coucilId: any) {
    this.masterDetailService
      .getAllMasterDetailByCoucil(coucilId)
      .pipe(catchError((error) => throwError(error.error)))
      .subscribe((response) => {
        console.log(response);
        this.listMasterDetails = response.masterDetails
      });
    this.isShowData = true;
  }
  handleHidenData() {
    this.isShowData = false;
  }
  showDropdownMaster() {
    this.isshowDropdownMaster = !this.isshowDropdownMaster;
  }
}
