import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { UserprofileComponent } from './userprofile/userprofile.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EdituserComponent } from './edituser/edituser.component';
import { UsertoolbarComponent } from './usertoolbar/usertoolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { UserTableComponent } from './user-table/user-table.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import { ElectionsComponent } from './elections/elections.component';
import { ElectiontableComponent } from './electiontable/electiontable.component';
import { OrganizationComponent } from './organization/organization.component';
import { OrganizationtableComponent } from './organizationtable/organizationtable.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ElectionshomeComponent } from './electionshome/electionshome.component';
import { RegistrationService } from './registration.service';
import { CustomFieldValidatorDirective } from './registration/custom-field-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    UserprofileComponent,
    HomeComponent,
    NavbarComponent,
    EdituserComponent,
    UsertoolbarComponent,
    SidenavComponent,
    UserTableComponent,
    NewsfeedComponent,
    ElectionsComponent,
    ElectiontableComponent,
    OrganizationComponent,
    OrganizationtableComponent,
    AboutUsComponent,
    ElectionshomeComponent,
    CustomFieldValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatGridListModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule
  ],
  providers: [RegistrationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
