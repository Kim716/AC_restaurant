"use strict";
// --- 環境建置與DATA --- //
// 載入 express 與設定
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

// 設定 port
const port = 3000;

// --- 設計路由 --- //
// router 1 首頁
app.get("/", (req, res) => {
  const restaurants = restaurantList.results;

  res.render("index", { restaurants });
});

// router 2 個別顯示頁面
app.get("/restaurants/:id", (req, res) => {
  const restaurant = restaurantList.results.find(
    (rest) => rest.id.toString() === req.params.id
  );

  res.render("show", { restaurant });
});

// router 3 搜尋結果
app.get("/search", (req, res) => {
  const keyword = req.query.keyword.trim();

  /// 搜尋當前餐廳是否符合中名或英名或類別，符合其中一項就加入搜尋結果陣列
  const restaurants = restaurantList.results.filter((rest) => {
    const keywordLow = keyword.toLowerCase();
    return (
      rest.name.toLowerCase().includes(keywordLow) ||
      rest.name_en.toLowerCase().includes(keywordLow) ||
      rest.category.toLowerCase().includes(keywordLow)
    );
  });

  res.render("index", { restaurants, keyword });
});

// --- 監聽伺服器 --- //
app.listen(port, () => {
  console.log(`Listening on http://localhost:3000`);
});
