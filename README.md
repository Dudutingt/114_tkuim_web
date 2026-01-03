# 🌿 Idea Oasis (靈感綠洲) - 全端個人內容創作管理平台

**資管3C 杜駿珽 412630997**

---

##  專案簡介
在數位資訊爆炸的時代，靈感往往轉瞬即逝。「靈感綠洲」旨在提供一個純淨、高效的空間，讓創作者能隨時隨地捕捉每一閃而過的創意。本專案採用 **MERN (MongoDB, Express, React, Node.js)** 架構實作，是一個完整的全棧 (Full-stack) 管理平台，並將所有數據持久化儲存於 MongoDB Atlas 雲端資料庫。

##  系統架構與開發重點
本專案的開發核心在於確保前端 UI 與後端 Database 之間的**即時同步**與**資料完整性**：
1. **Frontend 層**: 利用 React Hooks (useState, useEffect) 管理狀態，確保使用者操作後介面能立即更新。
2. **Backend 層**: 透過 Express Middleware 處理 CORS 跨域問題與 JSON 解析。
3. **Database 層**: 透過 Mongoose 建立嚴謹的資料模式 (Schema)，防止無效數據存入。

---

##  技術選型與工具
###  前端 (Frontend)
- **React.js**: 使用 Vite 建構，透過元件化開發提升代碼可維護性。
- **Axios**: 負責處理非同步 API 請求，實作前後端資料交換。
- **Lucide React**: 整合美觀的 UI 圖示，提升使用者視覺體驗。

###  後端 (Backend)
- **Node.js & Express**: 建立高效能的 RESTful API 伺服器處理業務邏輯。
- **Mongoose**: 作為 MongoDB 的 ODM，負責定義 Data Model 並與資料庫溝通。
- **Dotenv / Cors**: 分別處理環境變數安全管理與跨域連線。

###  資料庫 (Database)
- **MongoDB Atlas**: 雲端 NoSQL 資料庫，支援高擴展性與彈性的資料存儲。

---

##  資料庫模型設計 (Data Schema)
我們定義了 `Idea` 模型，確保每一筆靈感都具備完整的結構：

| 欄位名稱 | 類型 | 必填 | 說明 |
| :--- | :--- | :--- | :--- |
| `title` | String | ✅ | 靈感的簡短標題 |
| `content` | String | ✅ | 詳細的靈感描述內容 |
| `mood` | String | 預設 | 💡 (心情標籤) |
| `createdAt` | Date | 自動 | 系統自動生成建立時間 |
| `updatedAt` | Date | 自動 | 系統自動記錄最後修改時間 |

---
## API 文件說明 (API Specification)
基礎路徑 (Base URL)：`http://localhost:5000/api/ideas`

| 功能 | HTTP 方法 | 端點 (Route) | 請求參數 (Body) | 預期回應 |
| :--- | :--- | :--- | :--- | :--- |
| **取得所有靈感** | `GET` | `/` | 無 | `200 OK` (返回物件陣列) |
| **新增靈感** | `POST` | `/` | `{ "title", "content" }` | `201 Created` (返回新物件) |
| **修改靈感** | `PUT` | `/:id` | `{ "title", "content" }` | `200 OK` (返回修改後物件) |
| **刪除靈感** | `DELETE` | `/:id` | 無 | `200 OK` (返回成功訊息) |

---

## 專題展示影片 (Demo Video)
影片內容包含：開發環境展示、完整的 CRUD 操作演示、以及 MongoDB Atlas 雲端後台資料同步驗證。

 **[點此觀看展示影片](https://youtu.be/uell60xK3AQ?si=DVHKT2aVoq2knexb)**

---

##  安裝與執行指引

### 1. 環境設定
- 進入 `backend` 資料夾。
- 建立 `.env` 檔案，並填入您的 `MONGO_URI` (包含您的資料庫帳號與密碼)。

### 2. 啟動後端伺服器 (Backend)
```bash
cd backend
npm install
npx nodemon server.js
3. 啟動前端介面 (Frontend)
Bash

cd frontend
npm install
npm run dev
 系統開發里程碑 (Git Commits)
本專案遵循良好的版本控制規範，透過多次提交 (Commits) 完整記錄開發流程：

feat: setup server and database model: 完成 Express 基本架構與 MongoDB 資料連線。

feat: implement backend crud routes: 實作四種標準 API 路由，完成後端邏輯。

chore: initialize react frontend: 透過 Vite 初始化 React 專案環境。

feat: implement frontend crud with axios: 成功對接 API，完成前端與資料庫的串接。

docs: complete project documentation: 完成最終 README 文件撰寫與 API 規格整理