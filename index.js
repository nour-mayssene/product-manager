const express = require("express");
const path = require("path");
var cors = require("cors");
const app = express();
var bodyParser = require("body-parser");
const multer = require("multer");
const Order = require("./database/order.js");
const Product = require("./database/product.js");
const Type = require("./database/type.js");

const Users = require("./database/users.js");

app.use(cors());

const upload = multer({ dest: "uploads" });
const cloudinary = require("cloudinary").v2;
const Orders = require("./database/order.js");
cloudinary.config({
  cloud_name: "ok",
  api_key: "967934588341829",
  api_secret: "5tGQ-PeH3P4psCWHmTkZfzbsEsc",
});
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// Serve only the static files form the dist directory
app.use(express.static("./dist/greenplay"));

// app.get("/*", (req, res) =>
//   res.sendFile("index.html", { root: "dist/greenplay" })
// );
app.post("/upload", upload.any(0), (req, res) => {
  let image = req.files[0].path;
  console.log("REQ========> ", req.files[0].path);

  try {
    cloudinary.uploader.upload(image, (error, result) => {
      error && res.send({ status: false, msg: error });
      res.send({ status: true, msg: result });
    });
  } catch (err) {
    res.send({ status: false, msg: err });
  }
});

app.post("/api/signup", (req, res) => {
  const newM = new Users(req.body);
  newM.save((err, result) => {
    res.send({ body: "ok" });
  });
});
app.post("/api/login", (req, res) => {
  Users.find(
    { username: req.body.username, password: req.body.password },
    function (error, result) {
      if (error) console.log("this is error ====>", error);
      if (result.length) {
        res.send(result[0]);
      } else {
        res.send({ msg: "wrong password" });
      }
    }
  );
});

app.get("/api/findUser/:id", (req, res) => {
  Users.findOne({ _id: req.params.id }, (error, result) => {
    if (error) console.log("this is error ====>", error);
    res.send(result);
  });
});

// pre products //
app.get("/api/type", (req, res) => {
  Type.find({}, function (error, result) {
    if (error) console.log("this is error ====>", error);
    res.send(result);
  });
});
app.post("/api/type", (req, res) => {
  const newM = new Type(req.body);
  console.log(req.body);
  newM.save((err, result) => {
    res.send({ body: "ok" });
  });
});
app.put("/api/type/:id", (req, res) => {
  Type.updateOne({ _id: req.params.id }, req.body, function (error, result) {
    if (error) console.log("this is error ====>", error);
    res.send({ result: "done" });
  });
});
app.delete("/api/type/:id", (req, res) => {
  Type.deleteOne({ _id: req.params.id }, function (error, result) {
    if (error) console.log("this is error ====>", error);
    res.send(result);
  });
});
// Crud Products //
app.get("/api/products", (req, res) => {
  Product.find({}, function (error, result) {
    if (error) console.log("this is error ====>", error);
    res.send(result);
  });
});
app.post("/api/products", (req, res) => {
  const newM = new Product(req.body);
  newM.save((err, result) => {
    res.send({ body: "ok" });
  });
});
app.put("/api/products/:id", (req, res) => {
  Product.updateOne({ _id: req.params.id }, req.body, function (error, result) {
    if (error) console.log("this is error ====>", error);
    res.send({ result: "done" });
  });
});
app.delete("/api/products/:id", (req, res) => {
  Product.deleteOne({ _id: req.params.id }, function (error, result) {
    if (error) console.log("this is error ====>", error);
    res.send(result);
  });
});
// end products crud //

// Crud orders //
app.get("/api/orders", (req, res) => {
  Order.find({}, function (error, result) {
    if (error) console.log("this is error ====>", error);
    res.send(result);
  });
});

app.get("/api/orders/:id", (req, res) => {
  Order.find({ username: req.params.id }, function (error, result) {
    if (error) console.log("this is error ====>", error);
    res.send(result);
  });
});

app.post("/api/orders", (req, res) => {
  const newM = new Order(req.body);
  newM.save((err, result) => {
    res.send({ body: "ok" });
  });
});
app.put("/api/orders/:id", (req, res) => {
  Order.updateOne({ _id: req.params.id }, req.body, function (error, result) {
    if (error) console.log("this is error ====>", error);
    res.send({ result: "done" });
  });
});

app.put("/api/answer/:id", (req, res) => {
  Order.updateOne(
    { _id: req.params.id },
    { status: req.body.answer },
    function (error, result) {
      if (error) console.log("this is error ====>", error);
      res.send({ result: "done" });
    }
  );
});
app.delete("/api/orders/:id", (req, res) => {
  Order.deleteOne({ _id: req.params.id }, function (error, result) {
    if (error) console.log("this is error ====>", error);
    res.send(result);
  });
});
var hash = function (pw) {
  var hash = 0;
  if (this.length == 0) {
    return hash;
  }
  for (var i = 0; i < pw.length; i++) {
    var char = pw.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

app.post("/admin/login", (req, res) => {
  if (hash(req.body.password) === -969161597 && req.body.admin === "admin") {
    res.send(true);
  } else {
    res.send(false);
  }
});
// end orders crud //
app.listen(process.env.PORT || 3000, () => {
  console.log("server is running on http://localhost:3000");
});
