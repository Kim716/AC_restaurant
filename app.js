"use strict";

const express = require("express");
const app = express();

// 設定樣版引擎
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// 載入靜態檔案
app.use(express.static("public"));

// 載入餐廳資料
const restaurantList = require("./restaurant.json");

const port = 3000;

app.get("/", (req, res) => {
  const restaurants = restaurantList.results;

  res.render("index", { restaurants });
});

app.get("/restaurants/:id", (req, res) => {
  res.render("show");
});

app.listen(port, () => {
  console.log(`i'm listening`);
});
