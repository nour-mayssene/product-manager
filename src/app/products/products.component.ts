import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import Swal from "sweetalert2";
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) {}
  listOfItemse: any = JSON.parse(localStorage.getItem("basket")) || [];
  numberOfitems: any = this.listOfItemse.length || 0;
  total: number = 0;
  products: any;
 id : any = localStorage.getItem("user")

  tod : any 
  user : any
  ngOnInit(): void {
    if(localStorage.getItem("auth") !== "user"){
      this.router.navigateByUrl("signin")
    }
    this.http
    .get(`${environment.URL}/api/findUser/${this.id}`, {
      responseType: "json",
    })
    .subscribe((data) => {
      this.user = data;
      console.log(this.user);
      
    });
    for (let item of this.listOfItemse) {
      this.total = this.total + item.price;
    }
    this.http
      .get(`${environment.URL}/api/products`, {
        responseType: "json",
      })
      .subscribe((data) => {
        this.products = data;
        console.log(data);
      });
  }
  todate(e){
   this.tod = e 
   document.getElementById('date').style.display='block'
  }
  dis(){
    this.router.navigateByUrl("/")

    localStorage.setItem("auth", "");

  }
  addTobasket( start , end) {
    this.tod.start = start 
    this.tod.end = end 
    this.total = this.total + this.tod.price;
    var basket = JSON.parse(localStorage.getItem("basket")) || [];
    basket.push(this.tod);
    localStorage.setItem("basket", JSON.stringify(basket));
    this.listOfItemse = JSON.parse(localStorage.getItem("basket"));
    Swal.fire("Good job!", "Item added!", "success");
    this.numberOfitems = this.listOfItemse.length || 0;
   document.getElementById('date').style.display='none'
  }
  confirmOrder() {
    var order = {
      username: localStorage.getItem("user"),
      email: this.user["username"],
      address: "",
      number: "",
      status:"Waiting for confirmation",
      order: localStorage.getItem("basket"),
      total: this.total,
    };

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Confirm?",
        text: "do you want to confirm your order?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.http
            .post(`${environment.URL}/api/orders`, order)
            .subscribe((data) => {
              localStorage.setItem("basket", JSON.stringify([]));
              this.listOfItemse = [];
              this.total = 0;
              document.getElementById("add").style.display = "none";
            });
          swalWithBootstrapButtons.fire(
            "we submitted your order and you will recieve a confirmation",
            "",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  }

  cancelOrder() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem("basket", JSON.stringify([]));
        this.listOfItemse = [];
        document.getElementById("add").style.display = "none";
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        this.numberOfitems = this.listOfItemse.length || 0;
      }
    });
  }
  moveTo(to) {
    this.router.navigateByUrl(to);
  }
}
