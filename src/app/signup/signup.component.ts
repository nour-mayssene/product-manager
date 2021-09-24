import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {}
  signUp(data) {
    this.http
      .post(`${environment.URL}/api/signup`, data, {
        responseType: "json",
      })
      .subscribe((data) => {
        this.router.navigateByUrl("/signin");
      });
  }
  signin() {
    this.router.navigateByUrl("/signin");
  }
}
