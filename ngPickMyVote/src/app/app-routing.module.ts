import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './home/home.component'
import { LoginComponent } from './login/login.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { RegistrationComponent } from './registration/registration.component';
import { EdituserComponent} from './edituser/edituser.component';
import { OrganizationComponent } from './organization/organization.component';
import { ElectionsComponent } from './elections/elections.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'userprofile/:id',component:UserprofileComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'login',component:LoginComponent},
  {path:'edituser/:id',component:EdituserComponent},
  {path:'organization',component:OrganizationComponent},
  {path:'elections',component:ElectionsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
