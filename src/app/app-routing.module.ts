import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './common/home/home.component';
import { LoginComponent } from './common/login/login.component';
import { ProfileComponent } from './common/profile/profile.component';
import { DuyetdetaiComponent } from './private/department/detai/duyetdetai/duyetdetai.component';
import { DepartmentGuard } from './auth/department.guard';
import { DetaidaduyetComponent } from './private/department/detai/detaidaduyet/detaidaduyet.component';
import { DetaikhongdatComponent } from './private/department/detai/detaikhongdat/detaikhongdat.component';
import { DuyethoidongComponent } from './private/department/hoidong/duyethoidong/duyethoidong.component';
import { HoidongdaduyetComponent } from './private/department/hoidong/hoidongdaduyet/hoidongdaduyet.component';
import { HoidongkhongduyetComponent } from './private/department/hoidong/hoidongkhongduyet/hoidongkhongduyet.component';
import { SoluongsinhvienhdpbComponent } from './private/department/dashboard/soluongsinhvienhdpb/soluongsinhvienhdpb.component';
import { SinhvienbaovethanhcongComponent } from './private/department/dashboard/sinhvienbaovethanhcong/sinhvienbaovethanhcong.component';
import { BieudoComponent } from './private/department/dashboard/bieudo/bieudo.component';
import { AdminGuard } from './auth/admin.guard';
import { DanhsachbomonComponent } from './private/admin/quanlybomon/danhsachbomon/danhsachbomon.component';
import { ThembomonComponent } from './private/admin/quanlybomon/thembomon/thembomon.component';
import { DanhsachgiangvienComponent } from './private/admin/quanlygiangvien/danhsachgiangvien/danhsachgiangvien.component';
import { ThemgiangvienComponent } from './private/admin/quanlygiangvien/themgiangvien/themgiangvien.component';
import { CauhinhComponent } from './private/admin/cauhinhsoluong/cauhinh/cauhinh.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'duyetdetai', component: DuyetdetaiComponent,  canActivate:[DepartmentGuard] },
  { path: 'detaidaduyet', component: DetaidaduyetComponent,  canActivate:[DepartmentGuard] },
  { path: 'detaikhongduyet', component: DetaikhongdatComponent,  canActivate:[DepartmentGuard] },
  { path: 'duyethoidong', component: DuyethoidongComponent,  canActivate:[DepartmentGuard] },
  { path: 'hoidongdaduyet', component: HoidongdaduyetComponent,  canActivate:[DepartmentGuard] },
  { path: 'hoidongkhongduyet', component: HoidongkhongduyetComponent,  canActivate:[DepartmentGuard] },
  { path: 'soluongsinhvienhdpb', component: SoluongsinhvienhdpbComponent,  canActivate:[DepartmentGuard] },
  { path: 'sinhvienbaovethanhcong', component: SinhvienbaovethanhcongComponent,  canActivate:[DepartmentGuard] },
  { path: 'bieudo', component: BieudoComponent,  canActivate:[DepartmentGuard] },
  { path: 'danhsachbomon', component: DanhsachbomonComponent },
  { path: 'themsuabomon', component: ThembomonComponent,  canActivate:[AdminGuard] },
  { path: 'danhsachgiangvien', component: DanhsachgiangvienComponent },
  { path: 'themsuagiangvien', component: ThemgiangvienComponent,  canActivate:[AdminGuard] },
  { path: 'cauhinh', component: CauhinhComponent,  canActivate:[AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
