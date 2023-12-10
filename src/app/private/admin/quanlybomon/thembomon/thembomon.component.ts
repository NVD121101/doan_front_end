import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SubjectService } from 'src/app/service/subject.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-thembomon',
  templateUrl: './thembomon.component.html',
  styleUrls: [
    './thembomon.component.css',
    '../../../../../assets/vendor/bootstrap/css/bootstrap.min.css',
    '../../../../../assets/vendor/bootstrap-icons/bootstrap-icons.css',
    '../../../../../assets/vendor/boxicons/css/boxicons.min.css',
    '../../../../../assets/vendor/quill/quill.snow.css',
    '../../../../../assets/vendor/quill/quill.bubble.css',
    '../../../../../assets/vendor/remixicon/remixicon.css',
    '../../../../../assets/vendor/simple-datatables/style.css',
  ],
})
export class ThembomonComponent {
  subjectId!: number;
  subject: any;
  message: string = '';
  public addsubjectFrom = new FormGroup({
    subjectName: new FormControl('', Validators.required),
    departmentId: new FormControl('1'),
    userId: new FormControl(''),
  });
  public adduserForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    name: new FormControl('subject'),
  });
  public editsubjectFrom = new FormGroup({
    subjectName: new FormControl('', Validators.required),
    subjectId: new FormControl(history.state.subjectId),
  });

  public edituserForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    roleName: new FormControl('subject'),
  });

  ngOnInit(): void {
    if (history.state.subjectId && history.state.subjectId !== null) {
      this.subjectId = history.state.subjectId;
      this.subjectService
        .getSubjectById(this.subjectId)
        .pipe(
          //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
          catchError((error) => throwError(error.error))
        )
        .subscribe((response) => {
          this.userService
            .getUserById(response.subject.user.userId)
            .pipe(
              //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
              catchError((error) => throwError(error.error))
            )
            .subscribe((response) => {
              this.edituserForm.patchValue({
                username: response.user.username,
              });
            });
          this.editsubjectFrom.patchValue({
            subjectName: response.subject.subjectName,
          });
        });
    }
  }
  constructor(
    private subjectService: SubjectService,
    private userService: UserService,
    private router: Router
  ) {}

  addEditSubject() {
    if (!history.state.subjectId) {
      if (
        this.addsubjectFrom.value.subjectName == '' ||
        this.adduserForm.value.username == '' ||
        this.adduserForm.value.password == ''
      ) {
        this.message = 'Nhập đầy đủ thông tin!';
      } else {
        this.userService
          .addUser(this.adduserForm.value)
          .pipe(
            //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
            catchError((error) => throwError(error.error))
          )
          .subscribe((response) => {
            this.addsubjectFrom.value.userId = response.userId;
            this.subjectService
              .addtSubject(this.addsubjectFrom.value)
              .pipe(
                //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
                catchError((error) => throwError(error.error))
              )
              .subscribe(() => {
                this.router.navigate(['/home']);
              });
          });
      }
    } else {
      if (
        this.editsubjectFrom.value.subjectName == '' ||
        this.edituserForm.value.username == '' ||
        this.edituserForm.value.password == '' ||
        this.edituserForm.value.password == ''
      ) {
        this.message = 'Nhập đầy đủ thông tin.';
      } else {
        this.userService
          .editUser(this.edituserForm.value)
          .pipe(
            //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
            catchError(async (error) => this.message = error.message)
          )
          .subscribe((response) => {
            if (response.code == 200) {
              this.subjectService
                .editSubject(this.editsubjectFrom.value)
                .pipe(
                  //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
                  catchError((error) => throwError(error.error))
                )
                .subscribe(() => {
                  this.router.navigate(['/home']);
                });
            } 
          });
      }
    }
  }
}
