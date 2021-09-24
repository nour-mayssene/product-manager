import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HomeComponent } from "./home/home.component";
import { AdminComponent } from "./admin/admin.component";
import { HttpClientModule } from "@angular/common/http";
import { SugnUpComponent } from './sugn-up/sugn-up.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ProductsComponent } from './products/products.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    SugnUpComponent,
    SignupComponent,
    SigninComponent,
    ProductsComponent,
    UserOrdersComponent,
    AdminLoginComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
