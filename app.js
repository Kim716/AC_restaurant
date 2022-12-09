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
  const restaurant = restaurantList.results.find(
    (rest) => rest.id.toString() === req.params.id
  );

  res.render("show", { restaurant });
});

app.get("/search", (req, res) => {
  const keyword = req.query.keyword;

  // 搜尋中文名字符合者
  const restaurants = restaurantList.results.filter((rest) =>
    rest.name.toLowerCase().includes(keyword.toLowerCase())
  );

  // 找出英文名字也符合的陣列
  // 當前的英文名字，跟前面找到的陣列沒有重複，就丟到陣列裡
  restaurantList.results
    .filter((rest) =>
      rest.name_en.toLowerCase().includes(keyword.toLowerCase())
    )
    .forEach((restEn) => {
      for (const restCh of restaurants) {
        if (restEn.id === restCh.id) return;
      }
      restaurants.push(restEn);
    });

  // 類別符合
  restaurantList.results
    .filter((rest) => rest.category.includes(keyword))
    .forEach((restCa) => {
      for (const restCh of restaurants) {
        if (restCa.id === restCh.id) return;
      }
      restaurants.push(restCa);
    });

  res.render("index", { restaurants, keyword });
});

app.listen(port, () => {
  console.log(`i'm listening`);
});
