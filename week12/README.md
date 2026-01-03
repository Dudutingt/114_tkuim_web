# Week12 
412630997杜駿珽

這個專案主要是在做 使用者登入、身分驗證，以及不同角色的權限控制。
系統分成 一般學員（student） 跟 管理員（admin） 兩種帳號，不同身分可以做的事情不一樣。

## 一、帳號與角色說明

系統中至少有兩種角色：

admin（管理員）

可以查看所有人的資料

可以刪除任何資料

student（一般學員）

只能看到自己建立的資料

只能刪除自己的資料

## 二、登入與驗證機制
Auth 相關 API

POST /auth/signup

用來註冊帳號

POST /auth/login

用來登入

登入成功後，後端會回傳一組 JWT token

前端在登入成功後會：

把 token 存在 localStorage

之後呼叫 /api/* 的時候，會在 Header 加上：

Authorization: Bearer <token>


這樣後端才知道是誰在操作。

## 三、受保護 API（/api/signup）

這些 API 一定要先登入才能用。

1. GET /api/signup

需要登入

student：

只能查自己的資料

admin：

可以看到所有使用者的資料

2. POST /api/signup

需要登入

新增資料時：

系統會自動把 ownerId 記成目前登入的使用者

使用者不用自己填

3. DELETE /api/signup/:id

需要登入

只有以下兩種情況可以刪資料：

自己建立的資料

管理員（admin）

# 四、前端功能說明

前端頁面有做以下功能：

可以登入系統

顯示目前登入的是誰（email、角色）

顯示資料列表

可以新增資料

可以刪除資料

可以登出（清除 token）

# 五、專案啟動方式
1.啟動 MongoDB（使用 Docker）
docker compose up -d

2.啟動後端 Server
cd server
npm install
npm run dev


後端預設跑在：

http://localhost:3002

3.開啟前端頁面

使用 VS Code 的 Live Server

或直接打開 index.html

前端預設網址：

http://127.0.0.1:5500

# 六、測試方式

Postman 測試：

先呼叫 /auth/login

拿到 token

在 Header 加上：

Authorization: Bearer <token>


再測試 /api/signup 的 GET / POST / DELETE

# 七、測試帳號
身分	Email	密碼
管理員	admin@test.com
	123456
學生	student1@test.com
	123456

