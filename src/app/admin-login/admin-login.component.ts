import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  
  }


  login(admin : any){
    this.http
    .post(`${environment.URL}/admin/login`, admin, {
      responseType: "json",
    })
    .subscribe((data) => {
      if(data){
        localStorage.setItem("auth", "admin");

    this.router.navigateByUrl("/admin")

      } else {
        alert("password is wrong")
      }
    });
  }

}
