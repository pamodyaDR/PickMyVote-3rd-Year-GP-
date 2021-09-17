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
import { CreateElectionComponent } from './create-election/create-election.component';

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
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import { ChartsModule } from 'ng2-charts';
import { ResultService } from './services/result.service';
import { ResultComponent } from './result/result.component';
import { PaymentchartComponent } from './paymentchart/paymentchart.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AdminViewelectionsComponent } from './admin-viewelections/admin-viewelections.component';
import { AdminVieworganizationsComponent } from './admin-vieworganizations/admin-vieworganizations.component';
import { Votepage1Component } from './votepage1/votepage1.component';
import { Votepage2Component } from './votepage2/votepage2.component';
import { Votepage3Component } from './votepage3/votepage3.component';
import { Votepage4Component } from './votepage4/votepage4.component';
import { Votepage5Component } from './votepage5/votepage5.component';
import { VoteService } from './vote.service';
import { RegistrationverifyComponent } from './registrationverify/registrationverify.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { DatePipe } from '@angular/common';
import { NewPasswordValidatorDirective } from './adminprofile/new-password-validator.directive';
import { EncrDecrServiceService } from './services/encr-decr-service.service';
import {MatExpansionModule} from '@angular/material/expansion'


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
    CustomFieldValidatorDirective,
    CreateElectionComponent,
    ResultComponent,
    PaymentchartComponent,
    AdminhomeComponent,
    AdminViewelectionsComponent,
    AdminVieworganizationsComponent,
    Votepage1Component,
    Votepage2Component,
    Votepage3Component,
    Votepage4Component,
    Votepage5Component,
    RegistrationverifyComponent,
    AdminprofileComponent,
    NewPasswordValidatorDirective
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
    MatTableModule,
    MatStepperModule,
    MatSelectModule,
    ChartsModule,
    MatButtonToggleModule,
    MatExpansionModule
  ],
  providers: [RegistrationService,ResultService,VoteService,DatePipe,EncrDecrServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
