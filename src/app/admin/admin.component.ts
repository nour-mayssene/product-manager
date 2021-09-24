import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import Swal from "sweetalert2";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}
  products: any;
  preproducts: any;
  crud: any = false;
  orders: any = false;
  dataOrders: any;
  oneOrder: any;
  list: any;
  ad: any = false;
  see: any = false;
  hold: any;
  modify: any = false;
  type: any = false;
  ngOnInit(): void {
    if (localStorage.getItem("auth") !== "admin") {
      this.router.navigateByUrl("/admin/login");
    }
    this.http
      .get(`${environment.URL}/api/products`, {
        responseType: "json",
      })
      .subscribe((data) => {
        this.products = data;
      });
    this.http
      .get(`${environment.URL}/api/type`, {
        responseType: "json",
      })
      .subscribe((data) => {
        console.log(data);
        this.preproducts = data;
      });
    this.http
      .get(`${environment.URL}/api/orders`, {
        responseType: "json",
      })
      .subscribe((data) => {
        this.dataOrders = data;
        console.log(this.dataOrders);
      });
  }
  openUpdateForm(e) {
    this.hold = e;
    console.log(this.hold);

    document.getElementById("date").style.display = "block";
  }

  toggle(option) {
    if (option) {
      this.crud = true;
      this.orders = false;
      this.type = false;

      this.modify = this.modify ? false : true;
    } else {
      this.orders = true;
      this.crud = false;
      this.type = false;
    }
  }
  typee() {
    this.orders = false;
    this.crud = false;
    this.type = true;
  }
  dis() {
    this.router.navigateByUrl("/admin/login");
    localStorage.setItem("auth", "");
  }
  toggleAddForm() {
    this.ad = this.ad ? false : true;
    this.see = false;
  }

  toggleSeeForm() {
    this.see = this.see ? false : true;
    this.ad = false;
  }

  add(product) {
    this.http
      .post(`${environment.URL}/api/products`, product, {
        responseType: "json",
      })
      .subscribe((data) => {
        alert("done");
        this.ngOnInit();
        this.crud = true;
      });
  }
  update(name, desription, image, id) {
    var product = { name, desription, image, price: 0, number: 0 };
    this.http
      .put(`${environment.URL}/api/products/${id}`, product, {
        responseType: "json",
      })
      .subscribe((data) => {
        alert("done");
        this.ngOnInit();
        this.crud = true;
        document.getElementById("date").style.display = "none";
      });
  }
  delete(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .delete(`${environment.URL}/api/products/${id}`, {
            responseType: "json",
          })
          .subscribe((data) => {
            this.ngOnInit();
            this.crud = true;
          });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }
  addtype() {
    Swal.fire({
      input: "text",
      inputLabel: "name of new type",
      inputPlaceholder: "enter a type",
    }).then((name) => {
      console.log(name.value);

      this.http
        .post(
          `${environment.URL}/api/type`,
          { name: name.value },
          {
            responseType: "json",
          }
        )
        .subscribe((data) => {
          Swal.fire(`Done ${name.value}`);
          this.ngOnInit();
        });
    });
  }
  updatetype(id) {
    Swal.fire({
      input: "text",
      inputLabel: "name of new type",
      inputPlaceholder: "enter a type",
    }).then((name) => {
      console.log(name.value);

      this.http
        .put(
          `${environment.URL}/api/type/${id}`,
          { name: name.value },
          {
            responseType: "json",
          }
        )
        .subscribe((data) => {
          Swal.fire(`Done ${name.value}`);
          this.ngOnInit();
        });
    });
  }
  deletetype(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .delete(`${environment.URL}/api/type/${id}`, {
            responseType: "json",
          })
          .subscribe((data) => {
            this.ngOnInit();
            this.crud = true;
          });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }
  deleteOrder(id) {
    this.http
      .delete(`${environment.URL}/api/orders/${id}`, {
        responseType: "json",
      })
      .subscribe((data) => {
        alert("done");
        this.ngOnInit();
        this.orders = true;
      });
  }
  fullOrder(order) {
    console.log(JSON.parse(order.order));
    this.oneOrder = order;
    this.list = JSON.parse(order.order);
    document.getElementById("newsletter").style.display = "block";
  }

  answer(a, id) {
    this.http
      .put(
        `${environment.URL}/api/answer/${id}`,
        { answer: a },
        {
          responseType: "json",
        }
      )
      .subscribe((data) => {
        alert("done");
        this.ngOnInit();
        this.orders = true;
      });
  }
}
