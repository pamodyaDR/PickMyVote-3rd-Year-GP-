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
import { OrgelectionsComponent} from './orgelections/orgelections.component';
import { CreateElectionComponent } from './create-election/create-election.component';
import { ResultComponent } from './result/result.component';
import { UserresultComponent } from './userresult/userresult.component';
import { OrgelecresultComponent } from './orgelecresult/orgelecresult.component';
import { PaymentchartComponent } from './paymentchart/paymentchart.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AdminViewelectionsComponent } from './admin-viewelections/admin-viewelections.component'; 
import { AdminVieworganizationsComponent } from './admin-vieworganizations/admin-vieworganizations.component'

import { Votepage1Component} from './votepage1/votepage1.component';
import { Votepage2Component} from './votepage2/votepage2.component';
import { Votepage3Component} from './votepage3/votepage3.component';
import { Votepage4Component} from './votepage4/votepage4.component';
import { Votepage5Component} from './votepage5/votepage5.component';
import { RegistrationverifyComponent } from './registrationverify/registrationverify.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'userprofile/:id',component:UserprofileComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'login',component:LoginComponent},
  {path:'edituser/:id',component:EdituserComponent},
  {path:'organization/:id',component:OrganizationComponent},
  {path:'elections/:id',component:ElectionsComponent},
  {path:'electionshome',component:ElectionshomeComponent},
  {path:'about-us',component:AboutUsComponent},
  {path:'createElection/:id',component:CreateElectionComponent},
  {path:'orgelections/:id',component: OrgelectionsComponent},
  {path:'result/:elecid',component:ResultComponent},
  {path:'userresult/:elecid',component:UserresultComponent},
  {path:'orgelecresult/:elecid',component:OrgelecresultComponent},
  {path:'paymentchart' , component:PaymentchartComponent},
  {path:'admin' , component:AdminhomeComponent},
  {path:'admin/viewElections', component:AdminViewelectionsComponent},
  {path:'admin/viewOrganizations', component:AdminVieworganizationsComponent},
  {path:'votepage1',component:Votepage1Component},
  {path:'votepage2/:id',component:Votepage2Component},
  {path:'votepage3',component:Votepage3Component},
  {path:'votepage4',component:Votepage4Component},
  {path:'votepage5',component:Votepage5Component},
  {path:'verify',component:RegistrationverifyComponent},
  {path:'admin/profile',component:AdminprofileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
