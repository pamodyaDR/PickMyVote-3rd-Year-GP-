import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './home/home.component'
import { LoginComponent } from './login/login.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { RegistrationComponent } from './registration/registration.component';
import { EdituserComponent} from './edituser/edituser.component';
import { OrganizationComponent } from './organization/organization.component';
import { ElectionsComponent } from './elections/elections.component';
import { ElectionshomeComponent} from './electionshome/electionshome.component';
import { AboutUsComponent} from './about-us/about-us.component';

import { Votepage1Component} from './votepage1/votepage1.component';
import { Votepage2Component} from './votepage2/votepage2.component';
import { Votepage3Component} from './votepage3/votepage3.component';
import { Votepage4Component} from './votepage4/votepage4.component';
import { Votepage5Component} from './votepage5/votepage5.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'userprofile/:id',component:UserprofileComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'login',component:LoginComponent},
  {path:'edituser/:id',component:EdituserComponent},
  {path:'organization',component:OrganizationComponent},
  {path:'elections',component:ElectionsComponent},
  {path:'electionshome',component:ElectionshomeComponent},
  {path:'about-us',component:AboutUsComponent},

  {path:'votepage1',component:Votepage1Component},
  {path:'votepage2',component:Votepage2Component},
  {path:'votepage3',component:Votepage3Component},
  {path:'votepage4',component:Votepage4Component},
  {path:'votepage5',component:Votepage5Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
