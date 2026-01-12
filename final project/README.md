# Idea Oasis (靈感綠洲) - 全端個人內容管理系統 (Full-Stack CMS)

**資管3C 杜駿珽 412630997**

---

##  專案背景與目標
在數位創作時代，靈感往往轉瞬即逝。「靈感綠洲」旨在提供一個高效、直觀的介面，讓創作者能即時捕捉、紀錄並管理生活中的創意。本專案透過 **MERN (MongoDB, Express, React, Node.js)** 架構，實踐了現代網頁開發的核心技術，並達成資料的即時處理與雲端持久化儲存。

##  系統架構說明 (System Architecture)
本系統分為三個主要層級，確保資料流 (Data Flow) 的穩定性：
1. **Frontend (展示層)**: 使用 React 元件化開發，透過 Axios 發送異步請求，管理使用者介面狀態。
2. **Backend (邏輯層)**: 基於 Node.js 與 Express 建立 RESTful API，處理業務邏輯並擔任資料橋樑。
3. **Database (資料層)**: 使用 MongoDB Atlas 雲端資料庫，透過 Mongoose 定義資料模型 (Schema)，實現 NoSQL 結構化儲存。

---

##  技術選型詳解
### 前端 (Frontend)
- **React.js & Vite**: 提供極速的開發體驗與高效的虛擬 DOM 渲染。
- **Axios**: 負責處理與後端 API 的通訊，並包含請求錯誤處理機制。
- **Lucide React**: 整合美觀的 UI 圖示，提升操作直覺性。

### 後端 (Backend) & 資料庫
- **Node.js & Express**: 建立高效能的伺服器環境。
- **Mongoose ODM**: 負責將 JavaScript 物件轉換為資料庫能理解的指令。
- **MongoDB Atlas**: 雲端分散式資料庫，確保數據具備高可用性與安全性。
- **Cors & Dotenv**: 解決跨域連線安全性與保護資料庫金鑰。

---

##  資料庫模型設計 (Data Schema)
我們在 `backend/models/Idea.js` 中定義了嚴謹的資料模型，確保存入資料庫的每一筆數據皆符合規範：

| 欄位名稱 | 資料類型 | 必填 | 說明 |
| :--- | :--- | :--- | :--- |
| `title` | String | ✅ | 靈感的標題，用於列表快速瀏覽 |
| `content` | String | ✅ | 詳細的靈感描述內容 |
| `mood` | String | 預設 | 心情圖示標籤 (預設值：💡) |
| `createdAt` | Date | 自動 | 系統生成，紀錄靈感誕生時間 |
| `updatedAt` | Date | 自動 | 自動更新最後一次編輯的時間 |

---

##  API 文件完整度說明 (API Specification)
**Base URL:** `http://localhost:5000/api/ideas`

| 功能 | HTTP 方法 | 端點 (Route) | 參數 (Body) | 預期回應 (Status) |
| :--- | :--- | :--- | :--- | :--- |
| **讀取所有靈感** | `GET` | `/` | 無 | `200 OK` (返回陣列) |
| **新增靈感** | `POST` | `/` | `{ "title", "content" }` | `201 Created` (返回新物件) |
| **修改靈感** | `PUT` | `/:id` | `{ "title", "content" }` | `200 OK` (返回更新後物件) |
| **刪除靈感** | `DELETE` | `/:id` | 無 | `200 OK` (成功訊息) |

---

##  專題展示影片 (Demo Video)
本影片完整演示了系統的環境配置、CRUD 核心功能、以及雲端資料庫同步過程。

👉 **[觀看展示影片連結](https://youtu.be/uell60xK3AQ?si=DVHKT2aVoq2knexb)**

---

## 安裝與啟動指引

### 1. 後端設定 (Backend)
- 進入 `backend` 目錄執行 `npm install`。
- 於 `.env` 檔案中設定您的 `MONGO_URI`。
- 執行 `npx nodemon server.js`。

### 2. 前端設定 (Frontend)
- 進入 `frontend` 目錄執行 `npm install`。
- 執行 `npm run dev` 並點擊輸出之網址。

---

## 系統開發紀錄 (Git Commits)
本專案嚴格遵循版本控制規範，透過以下里程碑完整紀錄開發歷程：
- `feat: setup server and database model` (建立後端基礎與連線)
- `feat: implement backend crud routes` (實作完整 API 功能)
- `chore: initialize react frontend` (初始化 React 專案環境)
- `feat: implement frontend crud with axios` (前後端介面串接)
- `docs: complete project documentation` (完成 README 與 API 文件)