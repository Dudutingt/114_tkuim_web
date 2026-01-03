# 🌿 Idea Oasis (靈感綠洲) - 個人內容創作管理平台

## 📌 專案簡介
這是一個為內容創作者設計的全棧 (Full-stack) 管理平台。使用者可以即時捕捉、紀錄並管理生活中的靈感與創意草稿。本專案完整實作了資料的 **CRUD (新增、讀取、更新、刪除)** 操作，並將數據持久化儲存於雲端資料庫。

## 🛠️ 技術選型
### 前端 (Frontend)
- **React.js**: 使用 Vite 建構。
- **Axios**: 處理非同步 API 請求。
- **CSS**: 內建樣式與響應式設計。

### 後端 (Backend)
- **Node.js & Express**: 建立 RESTful API 伺服器。
- **Mongoose**: 與 MongoDB 進行 ODM (Object Data Modeling) 溝通。
- **Dotenv**: 管理資料庫金鑰等環境變數。
- **Cors**: 解決前後端跨域連線問題。

### 資料庫 (Database)
- **MongoDB Atlas**: 使用雲端 NoSQL 資料庫儲存靈感文檔。

---

## 🚀 系統功能與 CRUD 展示
- **新增 (Create)**: 使用者可透過表單輸入標題與靈感內容。
- **讀取 (Read)**: 系統自動從 MongoDB 抓取所有靈感並以卡片形式展示。
- **更新 (Update)**: 點擊「編輯」可修改既有靈感內容，並即時更新至資料庫。
- **刪除 (Delete)**: 點擊「刪除」可將資料從雲端與介面中移除。

---

## 📄 API 規格說明
**Base URL:** `http://localhost:5000/api/ideas`

| 功能 | 方法 | 端點 (Route) | 參數 (Body) | 回應碼 |
| :--- | :--- | :--- | :--- | :--- |
| 新增靈感 | `POST` | `/` | `{ "title", "content" }` | `201` |
| 取得全部 | `GET` | `/` | 無 | `200` |
| 更新靈感 | `PUT` | `/:id` | `{ "title", "content" }` | `200` |
| 刪除靈感 | `DELETE` | `/:id` | 無 | `200` |

---

## ⚙️ 安裝與執行指引

### 1. 複製專案
```bash
git clone <你的GitHub儲存庫網址>
cd 114_tkuim_web

2. 設定後端 (Backend)
進入 backend 資料夾：cd backend

安裝套件：npm install

在 backend 目錄下建立 .env 檔案並加入連線字串：

程式碼片段

MONGO_URI=mongodb+srv://<username>:<password>@cluster0...
PORT=5000
啟動伺服器：npx nodemon server.js

3. 設定前端 (Frontend)
開啟新終端機並進入 frontend 資料夾：cd frontend

安裝套件：npm install

啟動開發伺服器：npm run dev

開啟瀏覽器訪問：http://localhost:5173