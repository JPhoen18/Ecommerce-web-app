import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FilterItemPipe } from './itemfilter.pipe';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

//import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageShellComponent } from './landing-page-shell/landing-page-shell.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PopitemsComponent } from './popitems/popitems.component';
import { MensfabricsComponent } from './mensfabrics/mensfabrics.component';
import { WomensfabricsComponent } from './womensfabrics/womensfabrics.component';
import { ShinythingsComponent } from './shinythings/shinythings.component';
import { PopartComponent } from './popart/popart.component';
import { PopbooksComponent } from './popbooks/popbooks.component';
import { UseraccounthubComponent } from './useraccounthub/useraccounthub.component';
import { EdituseraccountComponent } from './edituseraccount/edituseraccount.component';
import { ReviewusercartsComponent } from './reviewusercarts/reviewusercarts.component';
import { UserordersreviewComponent } from './userordersreview/userordersreview.component';
import { UseritemslikedComponent } from './useritemsliked/useritemsliked.component';
import { LoginsignupmodalComponent } from './loginsignupmodal/loginsignupmodal.component';
import { LoginComponent } from './loginsignupmodal/login/login.component';
import { SignupComponent } from './loginsignupmodal/signup/signup.component';
import { EveryorderviewComponent } from './everyorderview/everyorderview.component';
import { OpenorderreviewComponent } from './openorderreview/openorderreview.component';
import { ClosedorderreviewComponent } from './closedorderreview/closedorderreview.component';
import { MenswearpageComponent } from './menswearpage/menswearpage.component';
import { WomenswearpageComponent } from './womenswearpage/womenswearpage.component';
import { SingleproductpageComponent } from './singleproductpage/singleproductpage.component';
import { ShoppingcartpageComponent } from './shoppingcartpage/shoppingcartpage.component';
import { WarningdialogComponent } from './warningdialog/warningdialog.component';
import { SubmitorderpageComponent } from './submitorderpage/submitorderpage.component';
import { MensjewelrypageComponent } from './mensjewelrypage/mensjewelrypage.component';
import { WomensjewelrypageComponent } from './womensjewelrypage/womensjewelrypage.component';
import { ArtmainpageComponent } from './artmainpage/artmainpage.component';
import { BookpageComponent } from './bookpage/bookpage.component';
import { FurniturepageComponent } from './furniturepage/furniturepage.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageShellComponent,
    LandingPageComponent,
    PopitemsComponent,
    MensfabricsComponent,
    WomensfabricsComponent,
    ShinythingsComponent,
    PopartComponent,
    PopbooksComponent,
    UseraccounthubComponent,
    EdituseraccountComponent,
    ReviewusercartsComponent,
    UserordersreviewComponent,
    UseritemslikedComponent,
    LoginsignupmodalComponent,
    LoginComponent,
    SignupComponent,
    EveryorderviewComponent,
    FilterItemPipe,
    OpenorderreviewComponent,
    ClosedorderreviewComponent,
    MenswearpageComponent,
    WomenswearpageComponent,
    SingleproductpageComponent,
    ShoppingcartpageComponent,
    WarningdialogComponent,
    SubmitorderpageComponent,
    MensjewelrypageComponent,
    WomensjewelrypageComponent,
    ArtmainpageComponent,
    BookpageComponent,
    FurniturepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MDBBootstrapModule.forRoot(),
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  //  HttpModule
  ],
  providers: [],
  entryComponents: [LoginComponent,SignupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
