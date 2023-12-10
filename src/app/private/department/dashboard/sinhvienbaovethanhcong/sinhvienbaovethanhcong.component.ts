import { Component } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MasterDetailService } from 'src/app/service/master-detail.service';
import { MasterService } from 'src/app/service/master.service';
import { SubjectService } from 'src/app/service/subject.service';
@Component({
  selector: 'app-sinhvienbaovethanhcong',
  templateUrl: './sinhvienbaovethanhcong.component.html',
  styleUrls: [
    './sinhvienbaovethanhcong.component.css',
    '../../../../../assets/vendor/bootstrap/css/bootstrap.min.css',
    '../../../../../assets/vendor/bootstrap-icons/bootstrap-icons.css',
    '../../../../../assets/vendor/boxicons/css/boxicons.min.css',
    '../../../../../assets/vendor/quill/quill.snow.css',
    '../../../../../assets/vendor/quill/quill.bubble.css',
    '../../../../../assets/vendor/remixicon/remixicon.css',
    '../../../../../assets/vendor/simple-datatables/style.css',
  ],
})
export class SinhvienbaovethanhcongComponent {
  listSubjects: any;
  isshowDropdown = false;
  isshowDropdownMaster = false;
  nameSubject = '';
  nameMaster = '';
  listMaster: any;
  idSubject!: number;
  idMaster!: number;
  listMasterDetailSucces: any;
  listMasterDetailNoSucces: any;
  constructor(
    private subjectService: SubjectService,
    private masterService: MasterService,
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
            this.masterDetailService
              .getMasterDetailSuccessByMaster(this.idMaster)
              .pipe(
                //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
                catchError((error) => throwError(error.error))
              )
              .subscribe((response) => {
                this.listMasterDetailSucces = response.masterDetails;
              });

            this.masterDetailService
              .getMasterDetailNoSuccessByMaster(this.idMaster)
              .pipe(
                //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
                catchError((error) => throwError(error.error))
              )
              .subscribe((response) => {
                this.listMasterDetailNoSucces = response.masterDetails;
              });
          });
      });
  }

  showDropdown() {
    this.isshowDropdown = !this.isshowDropdown;
  }

  showDropdownMaster() {
    this.isshowDropdownMaster = !this.isshowDropdownMaster;
  }

  handleDropdownSubjectClick(id: number, name: string) {
    this.isshowDropdown = false;
    this.idSubject = id;
    this.nameSubject = name;
    // this.masterService
    //   .getMasterBySubject(this.idSubject)
    //   .pipe(
    //     //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
    //     catchError((error) => throwError(error.error))
    //   )
    //   .subscribe((response) => {
    //     this.listMaster = response.masterDtos;
    //     this.nameMaster = this.listMaster[0].masterName;
    //     this.idMaster = this.listMaster[0].masterId;
    //     this.masterDetailService
    //       .getMasterDetailSuccessByMaster(this.idMaster)
    //       .pipe(
    //         //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
    //         catchError((error) => throwError(error.error))
    //       )
    //       .subscribe((response) => {
    //         this.listMasterDetailSucces = response.masterDetails;
    //       });

    //     this.masterDetailService
    //       .getMasterDetailNoSuccessByMaster(this.idMaster)
    //       .pipe(
    //         //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
    //         catchError((error) => throwError(error.error))
    //       )
    //       .subscribe((response) => {
    //         this.listMasterDetailNoSucces = response.masterDetails;
    //       });
    //   });
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
          this.masterDetailService
          .getMasterDetailSuccessByMaster(this.idMaster)
          .pipe(
            //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
            catchError((error) => throwError(error.error))
          )
          .subscribe((response) => {
            this.listMasterDetailSucces = response.masterDetails;
          });

        this.masterDetailService
          .getMasterDetailNoSuccessByMaster(this.idMaster)
          .pipe(
            //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
            catchError((error) => throwError(error.error))
          )
          .subscribe((response) => {
            this.listMasterDetailNoSucces = response.masterDetails;
          });
        } else {
          this.nameMaster = '';
          this.idMaster = 0;
          this.listMasterDetailSucces = []
          this.listMasterDetailNoSucces = []
        }
        
      });
  }
  handleDropdownMasterClick(id: number, name: string) {
    this.idMaster = id;
    this.nameMaster = name;
    this.isshowDropdownMaster = false;
    this.masterDetailService
      .getMasterDetailSuccessByMaster(this.idMaster)
      .pipe(
        //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
        catchError((error) => throwError(error.error))
      )
      .subscribe((response) => {
        this.listMasterDetailSucces = response.masterDetails;
      });

    this.masterDetailService
      .getMasterDetailNoSuccessByMaster(this.idMaster)
      .pipe(
        //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
        catchError((error) => throwError(error.error))
      )
      .subscribe((response) => {
        this.listMasterDetailNoSucces = response.masterDetails;
      });
  }
}
