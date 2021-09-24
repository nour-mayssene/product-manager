import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) {}
 id : any = localStorage.getItem("user")
 dataOrders : any 
 oneOrder: any;
 list: any;
 on : any = null 
 user : any
  ngOnInit(): void {
    this.http
    .get(`${environment.URL}/api/findUser/${this.id}`, {
      responseType: "json",
    })
    .subscribe((data) => {
      this.user = data;
    });
    this.http
    .get(`${environment.URL}/api/orders/${this.id}`, {
      responseType: "json",
    })
    .subscribe((data) => {
      this.dataOrders = data;
      console.log(this.dataOrders)
    });
  }
  moveTo(to) {
    this.router.navigateByUrl(to);
  }
  deleteOrder(id) {
    this.http
      .delete(`${environment.URL}/api/orders/${id}`, {
        responseType: "json",
      })
      .subscribe((data) => {
        alert("done");
        this.ngOnInit();
      });
  }
  fullOrder(order) {
    console.log(JSON.parse(order.order));
    this.oneOrder = order;
    this.list = JSON.parse(order.order);
    document.getElementById("newsletter").style.display = "block";
  }
}


