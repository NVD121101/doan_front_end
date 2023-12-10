import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SubjectService } from 'src/app/service/subject.service';
import { TeacherService } from 'src/app/service/teacher.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-themgiangvien',
  templateUrl: './themgiangvien.component.html',
  styleUrls: [
    './themgiangvien.component.css',
    '../../../../../assets/vendor/bootstrap/css/bootstrap.min.css',
    '../../../../../assets/vendor/bootstrap-icons/bootstrap-icons.css',
    '../../../../../assets/vendor/boxicons/css/boxicons.min.css',
    '../../../../../assets/vendor/quill/quill.snow.css',
    '../../../../../assets/vendor/quill/quill.bubble.css',
    '../../../../../assets/vendor/remixicon/remixicon.css',
    '../../../../../assets/vendor/simple-datatables/style.css',
  ],
})
export class ThemgiangvienComponent {
  listSubjects: any;
  listTeachers: any;
  teacherId!: number;
  subject: any;
  message: string = '';
  public addTeacherFrom = new FormGroup({
    teacherName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(''),
    subjectId: new FormControl(''),
    userId: new FormControl(''),
    researchDirection: new FormControl(''),
    sex: new FormControl(''),
    image: new FormControl(''),
  });
  public adduserForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    name: new FormControl('teacher'),
  });
  public editTeacherFrom = new FormGroup({
    teacherId: new FormControl(history.state.teacherId),
    teacherName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(''),
    subjectId: new FormControl(''),
    researchDirection: new FormControl(''),
    sex: new FormControl(''),
    image: new FormControl(''),
  });

  public edituserForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    roleName: new FormControl('teacher'),
  });

  constructor(
    private subjectService: SubjectService,
    private userService: UserService,
    private router: Router,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.subjectService
      .getSubject()
      .pipe(
        //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
        catchError((error) => throwError(error.error))
      )
      .subscribe((response) => {
        this.listSubjects = response.subjects;
      });

    if (history.state.teacherId && history.state.teacherId !== null) {
      this.teacherId = history.state.teacherId;
      this.teacherService
        .getTeacherById(this.teacherId)
        .pipe(
          //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
          catchError((error) => throwError(error.error))
        )
        .subscribe((response) => {
          this.editTeacherFrom.patchValue({
            teacherName: response.teacher.teacherName,
            teacherId: response.teacher.teacherId,
            email: response.teacher.email,
            phone: response.teacher.phone,
            researchDirection: response.teacher.researchDirection,
            subjectId: response.teacher.subjectId,
            sex: response.teacher.sex,
          });

          this.userService
            .getUserById(response.teacher.userId)
            .pipe(
              //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
              catchError((error) => throwError(error.error))
            )
            .subscribe((response) => {
              this.edituserForm.patchValue({
                username: response.user.username,
              });
            });
        });
    }
  }

  addEditTeacher() {
    if (!history.state.teacherId) {
      if (
        this.addTeacherFrom.value.teacherName == '' ||
        this.addTeacherFrom.value.email == '' ||
        this.addTeacherFrom.value.phone == '' ||
        this.addTeacherFrom.value.sex == '' ||
        this.addTeacherFrom.value.researchDirection == '' ||
        this.adduserForm.value.username == '' ||
        this.adduserForm.value.password == ''
      ) {
        this.message = 'Nhập đầy đủ thông tin!';
      } else {
        this.message = ''
        this.userService
          .addUser(this.adduserForm.value)
          .pipe(
            //Xử lý lỗi thì lữu dữ liệu lên sessionStorage
            catchError((error) => throwError(error.error))
          )
          .subscribe((response) => {
            this.addTeacherFrom.value.userId = response.userId;
            this.teacherService
              .addTeacher(this.addTeacherFrom.value)
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
        this.editTeacherFrom.value.teacherName == '' ||
        this.editTeacherFrom.value.email == '' ||
        this.editTeacherFrom.value.phone == '' ||
        this.editTeacherFrom.value.sex == '' ||
        this.editTeacherFrom.value.researchDirection == '' ||
        this.edituserForm.value.username == '' ||
        this.edituserForm.value.password == ''
      ) {
        this.message = 'Nhập đầy đủ thông tin.';
      } else {
        this.message = ''
        console.log(this.editTeacherFrom.value);
        console.log(this.edituserForm.value);
        
        this.userService
          .editUser(this.edituserForm.value)
          .pipe(
            catchError(async (error) => (this.message = error.message))
          )
          .subscribe((response) => {
            if (response.code == 200) {
              this.teacherService
                .editTeacher(this.editTeacherFrom.value)
                .pipe(
                  catchError(async (error) => (this.message = error.message))
                )
                .subscribe(() => {
                  if (response.code == 200) {
                    this.router.navigate(['/home']);
                  }
                });
            }
          });
      }
    }
  }
}
