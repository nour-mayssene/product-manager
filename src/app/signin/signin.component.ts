import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"],
})
export class SigninComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {}

  test(data) {
    this.http
      .post(`${environment.URL}/api/login`, data, {
        responseType: "json",
      })
      .subscribe((data) => {
        if (data["msg"]) {
          alert("wrong password");
        } else {
          localStorage.setItem("user", data["_id"]);
          localStorage.setItem("auth", "user");


          this.router.navigateByUrl("/products");
        }
      });
  }
  test1() {
    this.router.navigateByUrl("/signup");
  }
}
