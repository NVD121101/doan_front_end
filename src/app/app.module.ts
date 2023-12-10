import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HearderComponent } from './common/hearder/hearder.component';
import { FooterComponent } from './common/footer/footer.component';
import { ContentComponent } from './common/content/content.component';
import { HomeComponent } from './common/home/home.component';
import { MenuComponent } from './common/menu/menu.component';
import { ProfileComponent } from './common/profile/profile.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { LoginComponent } from './common/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeAdminComponent } from './private/admin/home-admin/home-admin.component';
import { HomeDepartmentComponent } from './private/department/home-department/home-department.component';
import { DuyetdetaiComponent } from './private/department/detai/duyetdetai/duyetdetai.component';
import { DetaidaduyetComponent } from './private/department/detai/detaidaduyet/detaidaduyet.component';
import { DetaikhongdatComponent } from './private/department/detai/detaikhongdat/detaikhongdat.component';
import { DuyethoidongComponent } from './private/department/hoidong/duyethoidong/duyethoidong.component';
import { HoidongdaduyetComponent } from './private/department/hoidong/hoidongdaduyet/hoidongdaduyet.component';
import { HoidongkhongduyetComponent } from './private/department/hoidong/hoidongkhongduyet/hoidongkhongduyet.component';
import { SoluongsinhvienhdpbComponent } from './private/department/dashboard/soluongsinhvienhdpb/soluongsinhvienhdpb.component';
import { SinhvienbaovethanhcongComponent } from './private/department/dashboard/sinhvienbaovethanhcong/sinhvienbaovethanhcong.component';
import { BieudoComponent } from './private/department/dashboard/bieudo/bieudo.component';
import { DanhsachbomonComponent } from './private/admin/quanlybomon/danhsachbomon/danhsachbomon.component';
import { ThembomonComponent } from './private/admin/quanlybomon/thembomon/thembomon.component';
import { DanhsachgiangvienComponent } from './private/admin/quanlygiangvien/danhsachgiangvien/danhsachgiangvien.component';
import { ThemgiangvienComponent } from './private/admin/quanlygiangvien/themgiangvien/themgiangvien.component';
import { CauhinhComponent } from './private/admin/cauhinhsoluong/cauhinh/cauhinh.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HearderComponent,
    FooterComponent,
    ContentComponent,
    HomeComponent,
    MenuComponent,
    ProfileComponent,
    HomeAdminComponent,
    HomeDepartmentComponent,
    DuyetdetaiComponent,
    DetaidaduyetComponent,
    DetaikhongdatComponent,
    DuyethoidongComponent,
    HoidongdaduyetComponent,
    HoidongkhongduyetComponent,
    SoluongsinhvienhdpbComponent,
    SinhvienbaovethanhcongComponent,
    BieudoComponent,
    DanhsachbomonComponent,
    ThembomonComponent,
    DanhsachgiangvienComponent,
    ThemgiangvienComponent,
    CauhinhComponent,
  ],
  providers: [
    TokenInterceptor
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
