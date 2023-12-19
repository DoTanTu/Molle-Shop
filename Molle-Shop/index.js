const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const { log } = require("console");
const bodyParser = require("body-parser");
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let userGmail = "";

mongoose
  .connect("mongodb://127.0.0.1:27017/molleshop", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB connected");
});

const ProducSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  shortdescription: String
});
const UserSchema = new mongoose.Schema({
  gmail: String,
  pass: String,
  name: String,
  role: String,
  gender: String,
  nationality: String,
  phone: String
});

const UserModel = mongoose.model("users", UserSchema);
const ProductModel = mongoose.model("products", ProducSchema);

async function insertData(collectionName, data) {
  const database = mongoose.connection.db;
  const collection = database.collection(collectionName);

  try {
    const result = await collection.insertOne(data);
    console.log("Dữ liệu đã được thêm vào MongoDB Compass:", result.insertedId);
  } catch (error) {
    console.error("Lỗi thêm dữ liệu:", error);
  }
}

async function updateData(collectionName, id, dataUpdate) {
  const database = mongoose.connection.db;
  const collection = database.collection(collectionName);

  try {
    const result = await collection.updateMany(id, dataUpdate);
    console.log("Số bản ghi đã được cập nhật:", result.modifiedCount);
  } catch (error) {
    console.error("Lỗi cập nhật dữ liệu:", error);
  }
}

async function deleteData(collectionName, id) {
  const database = mongoose.connection.db;
  const collection = database.collection(collectionName);

  try {
    const result = await collection.deleteMany(id);
    console.log("Số bản ghi đã bị xóa:", result.deletedCount);
  } catch (error) {
    console.error("Lỗi xóa dữ liệu:", error);
  }
}

app.delete(`/delete-product/:id`, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const filter = { id: id };
    deleteData("products", filter);
  } catch (error) {}
});
app.put(`/update-product/:id`, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const filter = { id: id };
    const data = req.body;
    const dataUpdate = { $set: data };

    console.log(dataUpdate);
    updateData("products", filter, dataUpdate);
  } catch (error) {}
});
app.get(`/getProductbyId/:id`, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await ProductModel.findOne({ id });
    res.json(product);
  }
  catch (e){
    console.log(e);
  }
   
});

app.post(`/add-product`, async (req, res) => {
  try {
    const products = await ProductModel.find();
    let len = products.length - 1;
    const id = products[len].id + 1;

    const data = req.body;
    data.id = id;

    insertData("products", data);
  } catch (error) {}
});

app.get("/getAllProducts", async (req, res) => {
  const products = await ProductModel.find();
  res.json(products);
});
app.get("/getAllUsers", async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

app.get("/detail/:id", async (req, res) => {
  try {
    const products = await ProductModel.find();
    const productss = await ProductModel.find().limit(10);
    const productId = req.params.id;
    const product = products.find((element) => element.id == productId);

    res.render("product_page", { product, productss });
  } catch (error) {}
});

app.get("/register", (req, res) => {
  res.render("registration");
});

app.post("/register", async (req, res) => {
  const { firstname, lastname, phone, gender, gmail, adress, pass, Confirm } =
    req.body;
  try {
    const data = {
      gmail: gmail,
      pass: pass,
      name: firstname + " " + lastname,
      role: "user",
      gender: gender,
      nationality: adress,
      phone: phone
    };
    if (gmail.trim() === "" || pass != Confirm) {
      return res
        .status(401)
        .send(
          "Do not leave the Gmail and password fields empty, and make sure the password and confirm password fields match"
        );
    } else {
      const user = await UserModel.findOne({ gmail });
      if (user) {
        return res
          .status(401)
          .send("Gmail was regitered please use a new gmail");
      }
      insertData("users", data);
      res.redirect("/login");
    }
  } catch (error) {
    return res.status(401).send("Do not leave " + error);
  }
});

app.get(`/profile`, async (req, res) => {
  const gmail = userGmail;
  try {
    const username = await UserModel.findOne({ gmail });
    if (!username) {
      return res.status(404).send("User not found");
    }
    res.render("my_profile", { username });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

app.get("/login", (req, res) => {
  userGmail = "";
  res.render("login", {});
});

app.post("/login", async (req, res) => {
  const { gmail, pass } = req.body;
  try {
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await UserModel.findOne({ gmail });
    if (!user) {
      return res.status(401).send("Invalid username or password");
    }
    if (user.pass != pass) {
      return res.status(401).send("Invalid username or password");
    }
    userGmail = user.gmail;
    res.redirect("/home");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

app.get("/home", async (req, res) => {
  try {
    const gmail = userGmail;
    const products = await ProductModel.find();
    const user = await UserModel.findOne({ gmail });

    res.render("shop", { products, user });
  } catch (error) {}
});
app.listen(8080, () => {
  console.log("Server successfully with port : http://localhost:8080/login");
});
