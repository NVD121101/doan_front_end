import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { catchError, forkJoin, throwError } from 'rxjs';
import { MasterDetailService } from 'src/app/service/master-detail.service';
import { MasterService } from 'src/app/service/master.service';
import { SubjectService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-bieudo',
  templateUrl: './bieudo.component.html',
  styleUrls: [
    './bieudo.component.css',
    '../../../../../assets/vendor/bootstrap/css/bootstrap.min.css',
    '../../../../../assets/vendor/bootstrap-icons/bootstrap-icons.css',
    '../../../../../assets/vendor/boxicons/css/boxicons.min.css',
    '../../../../../assets/vendor/quill/quill.snow.css',
    '../../../../../assets/vendor/quill/quill.bubble.css',
    '../../../../../assets/vendor/remixicon/remixicon.css',
    '../../../../../assets/vendor/simple-datatables/style.css',
  ],
})
export class BieudoComponent {
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
  xValues!: any[];
  yValues!: any[];
  barColors!: any[];
  totalMasterDetaiSucces!: number;
  totalMasterDetaiNoSucces!: number;

  constructor(
    private subjectService: SubjectService,
    private masterService: MasterService,
    private masterDetailService: MasterDetailService
  ) {
    Chart.register(...registerables);
  }
  ngOnInit(): void {
    this.subjectService
      .getSubject()
      .pipe(catchError((error) => throwError(error.error)))
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
                this.totalMasterDetaiSucces = response.totalRecords;
                this.listMasterDetailSucces = response.masterDetails;
                this.masterDetailService
                  .getMasterDetailNoSuccessByMaster(this.idMaster)
                  .pipe(
                    //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
                    catchError((error) => throwError(error.error))
                  )
                  .subscribe((response) => {
                    this.destroyChart()
                    this.totalMasterDetaiNoSucces = response.totalRecords;
                    this.listMasterDetailNoSucces = response.masterDetails;
                    // Tạo dữ liệu biểu đồ
                    this.xValues = [
                      'Sinh viên bảo vệ không qua',
                      'Sinh viên bảo vệ thành công',
                    ];
                    this.yValues = [
                      this.totalMasterDetaiNoSucces,
                      this.totalMasterDetaiSucces,
                    ];
                    this.barColors = ['#b91d47', '#00aba9'];

                    // Vẽ biểu đồ
                    new Chart('myChart', {
                      type: 'pie',
                      data: {
                        labels: this.xValues,
                        datasets: [
                          {
                            backgroundColor: this.barColors,
                            data: this.yValues,
                          },
                        ],
                      },
                    });
                  });
              });
          });
      });
  }

  destroyChart() {
    const existingChart = Chart.getChart('myChart');
    if (existingChart) {
      existingChart.destroy();
    }
  }
  showDropdownMaster() {
    this.isshowDropdownMaster = !this.isshowDropdownMaster;
  }
  showDropdown() {
    this.isshowDropdown = !this.isshowDropdown;
  }

  handleDropdownSubjectClick(id: number, name: string) {
    this.isshowDropdown = false;
    this.idSubject = id;
    this.nameSubject = name;
    this.masterService
      .getMasterBySubject(this.idSubject)
      .pipe(
        //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
        catchError((error) => throwError(error.error))
      )
      .subscribe((response) => {
        this.listMaster = response.masterDtos;
        if(this.listMaster.length > 0) {
          this.nameMaster = this.listMaster[0].masterName;
          this.idMaster = this.listMaster[0].masterId;
          this.masterDetailService
            .getMasterDetailSuccessByMaster(this.idMaster)
            .pipe(
              //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
              catchError((error) => throwError(error.error))
            )
            .subscribe((response) => {
              this.totalMasterDetaiSucces = response.totalRecords;
              this.listMasterDetailSucces = response.masterDetails;
              this.masterDetailService
                .getMasterDetailNoSuccessByMaster(this.idMaster)
                .pipe(
                  //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
                  catchError((error) => throwError(error.error))
                )
                .subscribe((response) => {
                  this.destroyChart()
                  this.totalMasterDetaiNoSucces = response.totalRecords;
                  this.listMasterDetailNoSucces = response.masterDetails;
                  // Tạo dữ liệu biểu đồ
                  this.xValues = [
                    'Sinh viên bảo vệ không qua',
                    'Sinh viên bảo vệ thành công',
                  ];
                  this.yValues = [
                    this.totalMasterDetaiNoSucces,
                    this.totalMasterDetaiSucces,
                  ];
                  this.barColors = ['#b91d47', '#00aba9'];
  
                  // Vẽ biểu đồ
                  new Chart('myChart', {
                    type: 'pie',
                    data: {
                      labels: this.xValues,
                      datasets: [
                        {
                          backgroundColor: this.barColors,
                          data: this.yValues,
                        },
                      ],
                    },
                  });
                });
            });
        } else {
          this.nameMaster = '';
          this.idMaster = 0;
          this.destroyChart()
        }
      });
        
  }

  handleDropdownMasterClick(id: number, name: string) {
    this.idMaster = id;
    this.nameMaster = name;
    this.isshowDropdownMaster = false;
    this.masterService
      .getMasterBySubject(this.idSubject)
      .pipe(
        //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
        catchError((error) => throwError(error.error))
      )
      .subscribe((response) => {
        this.listMaster = response.masterDtos;
        this.nameMaster = name
        this.idMaster = id
        this.masterDetailService
          .getMasterDetailSuccessByMaster(this.idMaster)
          .pipe(
            //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
            catchError((error) => throwError(error.error))
          )
          .subscribe((response) => {
            this.destroyChart()
            this.totalMasterDetaiSucces = response.totalRecords;
            this.listMasterDetailSucces = response.masterDetails;
            this.masterDetailService
              .getMasterDetailNoSuccessByMaster(this.idMaster)
              .pipe(
                //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
                catchError((error) => throwError(error.error))
              )
              .subscribe((response) => {
                this.totalMasterDetaiNoSucces = response.totalRecords;
                this.listMasterDetailNoSucces = response.masterDetails;
                // Tạo dữ liệu biểu đồ
                this.xValues = [
                  'Sinh viên bảo vệ không qua',
                  'Sinh viên bảo vệ thành công',
                ];
                this.yValues = [
                  this.totalMasterDetaiNoSucces,
                  this.totalMasterDetaiSucces,
                ];
                this.barColors = ['#b91d47', '#00aba9'];

                // Vẽ biểu đồ
                new Chart('myChart', {
                  type: 'pie',
                  data: {
                    labels: this.xValues,
                    datasets: [
                      {
                        backgroundColor: this.barColors,
                        data: this.yValues,
                      },
                    ],
                  },
                });
              });
          });
      });
  }

}
