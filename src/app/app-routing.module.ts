import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingPageShellComponent} from './landing-page-shell/landing-page-shell.component';
import {UseraccounthubComponent} from './useraccounthub/useraccounthub.component';
import {EdituseraccountComponent} from './edituseraccount/edituseraccount.component';
import {UseritemslikedComponent} from './useritemsliked/useritemsliked.component';
import {UserordersreviewComponent} from './userordersreview/userordersreview.component';
import {ReviewusercartsComponent} from './reviewusercarts/reviewusercarts.component';
import {LoginComponent} from './loginsignupmodal/login/login.component';
import {SignupComponent} from './loginsignupmodal/signup/signup.component';
import {EveryorderviewComponent} from './everyorderview/everyorderview.component';
import {OpenorderreviewComponent} from './openorderreview/openorderreview.component';
import {ClosedorderreviewComponent} from './closedorderreview/closedorderreview.component';
import {MenswearpageComponent} from './menswearpage/menswearpage.component';
import {WomenswearpageComponent} from './womenswearpage/womenswearpage.component';
import {SingleproductpageComponent} from './singleproductpage/singleproductpage.component';
import {ShoppingcartpageComponent} from './shoppingcartpage/shoppingcartpage.component';
import {SubmitorderpageComponent} from './submitorderpage/submitorderpage.component';
import {MensjewelrypageComponent} from './mensjewelrypage/mensjewelrypage.component';
import {WomensjewelrypageComponent} from './womensjewelrypage/womensjewelrypage.component';
import {ArtmainpageComponent} from './artmainpage/artmainpage.component';
import {BookpageComponent} from './bookpage/bookpage.component';
import {FurniturepageComponent} from './furniturepage/furniturepage.component';
import {AuthGuard} from './auth/auth.guard';

//singleproductpage  toCartPage
const routes: Routes = [


  {
    path: '/', component: LandingPageShellComponent

  },

  {
    path: 'singleproductpage', component:SingleproductpageComponent
  },

  {
    path: 'menswearmain', component: MenswearpageComponent
//    children: [
  //    { path: 'singleproductpage', component:SingleproductpageComponent}
  //  ]FurniturepageComponent
  },
  {
    path: 'artmainpage', component: ArtmainpageComponent
  },
  {
    path: 'furnituremainpage', component: FurniturepageComponent
  },
  {
    path: 'mensjewelrypage', component: MensjewelrypageComponent
  },
  {
    path: 'bookpage', component: BookpageComponent
  },
  {
    path: 'womensjewelrypage', component: WomensjewelrypageComponent
  },

  {
     path: 'womenswearmain', component: WomenswearpageComponent
  },
  {
    path: 'toCartPage', component: ShoppingcartpageComponent

  },
  {
    path: 'orderSubmitPage', component: SubmitorderpageComponent
  },

//suggestion - perhaps duplicat the code
  {
    path: 'signin', component:LoginComponent

  },


  {
    path: 'signup', component:SignupComponent
  },

  {
    path: 'useraccount', component: UseraccounthubComponent, canActivate:[AuthGuard],
    children: [
    {path: 'accountedit', component: EdituseraccountComponent},
    {path: 'likeditems', component: UseritemslikedComponent},
    {path: 'orderreview', component: UserordersreviewComponent,
    children: [
      {path: 'everyorder', component: EveryorderviewComponent,
       children: [
         {path: 'openorder', component: OpenorderreviewComponent},
         {path: 'closedorder', component: ClosedorderreviewComponent} //5/7/22 --
       ]},
      {path: 'openorder', component: OpenorderreviewComponent,
      children: [
        {path: 'everyorder', component: EveryorderviewComponent},
        {path: 'closedorder', component: ClosedorderreviewComponent} //5/7/22 --
      ]},
      {path: 'closedorder', component: ClosedorderreviewComponent,
      children: [
        {path: 'everyorder', component: EveryorderviewComponent},
        {path: 'openorder', component: OpenorderreviewComponent} //5/7/22 --
      ]}
            ]
      },
    {path: 'cartreview', component: ReviewusercartsComponent}
  ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
