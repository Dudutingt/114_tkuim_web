<h1>Week11</h1>
<h1>CRUD</h1>    
CRUD 其實就是後端最基本的四種資料處理方式，分別是新增、查詢、更新和刪除。大部分網站只要有表單、有資料庫，基本上都一定會用到這四個功能。我這次的作業是做一個報名系統，所以就剛好把 CRUD 全部用上。
新增（Create） 的部分，就是使用者在表單輸入姓名、email、電話後，後端把資料存到 MongoDB。因為 email 不可能重複報名，所以我有在資料庫幫 email 設唯一索引。這樣如果有人用同一個信箱重複送出，系統就會跳出清楚的錯誤提醒，而不是直接炸掉。
查詢（Read） 則是提供一個 API 讓前端能抓到全部報名名單。我也加了分頁功能，這樣資料很多的時候比較不會卡住，可以用 page 跟 limit 去控制一次拿多少筆。
更新（Update） 的功能是在使用者資料有變更時使用，比如要更新電話或調整報名狀態。後端會根據 id 找資料，只改需要更新的欄位。
最後是 刪除（Delete），主要用來移除不需要的紀錄，像是測試資料或填錯的資料可以直接刪掉。
整體來說，CRUD 就是讓一個系統能把資料完整管理起來，實作起來雖然基本，但也是後端最重要的基礎。

<h1>1. 啟動指令</h1>
   
1.1 啟動 MongoDB（Docker）
   docker compose up -d
   
1.2 查看容器是否正常
docker ps

1.3 連線 MongoDB（mongosh）
mongosh "mongodb://root:example@localhost:27017"


或使用 MongoDB Compass → 連線字串：

mongodb://root:example@localhost:27017

1.4 安裝後端套件
npm install

1.5 啟動後端 API
npm run dev

<h1>2. 環境需求</h1>
項目	說明
Node.js	建議 v18+
Docker Desktop	用於建立 MongoDB
MongoDB	使用 Docker 運行
Postman / VSCode REST Client	用於 API 測試
前端（任意環境）	Week07/09 表單即可
2.1 .env 設定（必要）

在專案根目錄建立 .env：

MONGO_URI=mongodb://root:example@localhost:27017
MONGO_DB=eventdb
PORT=3001


欄位說明：

欄位	用途
MONGO_URI	連線至 MongoDB 的完整 URI
MONGO_DB	你所使用的資料庫名稱
PORT	API 運行的 port

<h1>3. 測試方式</h1>


 3.1 REST Client（VSCode）範例

建立 api.http：

### 建立報名（POST）
POST http://localhost:3001/api/signup
Content-Type: application/json

{
  "name": "新同學",
  "email": "new@example.com",
  "phone": "0911222333"
}

### 取得清單（含分頁）
GET http://localhost:3001/api/signup?page=1&limit=10

### 更新
PATCH http://localhost:3001/api/signup/69327547e84d89176c85ea70
Content-Type: application/json

{
  "phone": "0911000111"
}

### 刪除
DELETE http://localhost:3001/api/signup/69327547e84d89176c85ea70

 3.2 Postman Collection（必交）

匯入以下 JSON （你可貼到 Postman → Import → Raw）：

{
  "info": {
    "name": "Event Signup API",
    "_postman_id": "12345",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Create Signup",
      "request": {
        "method": "POST",
        "header": [{ "key": "Content-Type", "value": "application/json" }],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"小明\",\n  \"email\": \"test@example.com\",\n  \"phone\": \"0911111111\"\n}"
        },
        "url": { "raw": "http://localhost:3001/api/signup" }
      }
    },
    {
      "name": "Get List",
      "request": { "method": "GET", "url": "http://localhost:3001/api/signup?page=1&limit=10" }
    },
    {
      "name": "Update",
      "request": {
        "method": "PATCH",
        "header": [{ "key": "Content-Type", "value": "application/json" }],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"phone\": \"0911000222\"\n}"
        },
        "url": "http://localhost:3001/api/signup/:id"
      }
    },
    {
      "name": "Delete",
      "request": {
        "method": "DELETE",
        "url": "http://localhost:3001/api/signup/:id"
      }
    }
  ]
}

3.3 Mongo Shell 指令（必交）
use eventdb

#查看所有 participants
db.participants.find().pretty()

建立 email 唯一索引
db.participants.createIndex({ email: 1 }, { unique: true })

測試重複 email
db.participants.insertOne({
  name: "測試",
  email: "duplicate@example.com",
  phone: "0911222333"
})


API 會回傳：

{
  "error": true,
  "message": "此 Email 已被使用，請使用其他 Email 報名。"
}

<h1>4. 常見問題（FAQ）</h1>
1. 出現 Authentication failed？

原因：你輸入的 Mongo 使用者／密碼錯誤。
解法：

docker exec -it <mongo-container> bash
cat /etc/mongod.conf


或確認 .env：

MONGO_URI=mongodb://root:example@localhost:27017

2. POST 報錯：email 重複？

傳了這種：

{ 
  "name": "小明",
  "email": " duplicate@example.com ", 
  "電話": "0911111111"
}


錯誤：

email 前後多空格
phone key 用「電話」不是「phone」

正確：

{
  "name": "小明",
  "email": "duplicate@example.com",
  "phone": "0911111111"
}

3. API 連不上 Mongo？

驗證：

docker ps


應看到：

mongo-container   Up (healthy)

4. 分頁如何運作？

GET /api/signup?page=2&limit=10

後端會計算：

skip = (page - 1) * limit
limit = limit
