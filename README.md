# SPA 部落格
 以 React 開發的 SPA Blog，註冊用戶可以檢視、新增、編輯及刪除文章。
 
 [DEMO](https://bryan9411.github.io/react-redux-blog/#/)
 
 [JSON Server API](https://lidemy-blog-api.herokuapp.com)
 
## 技術

* 使用 Redux + Redux Toolkit 管理組件狀態
* 使用 React Router 規劃前端路由
* Token 機制建立登入登出系統
* 串接 JSON Server API
* 具有會員及分類系統，且提供新增、編輯、刪除文章功能
* 提供標題關鍵字搜索
## 功能描述
* 註冊/登入功能，密碼統一預設「Lidemy」，方便 Demo
* 顯示所有文章列表
* 點擊顯示單頁文章內容（標題、發文時間以及文章內容）
* 分類系統，根據不同分類，顯示不同主題文章
* 發佈文章功能：登入狀態下，顯示發布文章的頁面按鈕，輸入標題及內容即可新增文章
* 文章管理頁面，登入狀態下，顯示文章管理按紐，可編輯及刪除文章
