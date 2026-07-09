佈署藏寶遊戲到 GitHub Pages，完成後提供 Pages URL。

## 專案資訊

- 專案路徑：`D:\claude code\Ch2 unit2 INIT CLAUDE.MD\claude_code_treasure_game-initial\claude_code_treasure_game-initial`
- 框架：React + Vite
- 建置指令：`npm run build`
- 輸出目錄：`build`

## 執行步驟

### 1. 確認 Git 倉庫
執行 `git status`。若顯示尚未初始化（not a git repository），執行 `git init`。

### 2. 確認 GitHub remote
執行 `git remote -v`。若沒有 `origin`，詢問使用者 GitHub repo 網址（例如 `https://github.com/使用者名稱/repo名稱.git`），使用者需自行先在 GitHub 上建立好這個 repo，再執行 `git remote add origin <網址>`。

### 3. 確認 gh-pages 套件
檢查 `package.json` 的 `devDependencies` 是否有 `gh-pages`。若沒有，執行 `npm install --save-dev gh-pages`。

### 4. 確認 vite.config.ts 的 base 路徑
GitHub Pages 的專案頁面網址格式為 `https://<使用者名稱>.github.io/<repo名稱>/`，因此 `vite.config.ts` 的 `base` 欄位必須設為 `/<repo名稱>/`（repo 名稱取自步驟 2 的 remote 網址）。若目前設定缺少或不正確，修改為正確值。

### 5. 確認 package.json 的 deploy script
若尚未包含以下 script，新增：
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

### 6. 推送原始碼到 GitHub（main 分支）
執行 `git add .`、`git commit -m "..."`、`git push -u origin main`。若本地分支不是 `main`，先確認分支名稱再推送。

### 7. 執行部署
執行 `npm run deploy`，這會先建置專案，再將 `build` 目錄的內容推送到 `gh-pages` 分支。

### 8. 回報結果
組出 GitHub Pages 網址：`https://<使用者名稱>.github.io/<repo名稱>/`，顯示給使用者。並提醒：
- 若是第一次部署，需到該 repo 的 Settings → Pages 確認來源（Source）設定為 `gh-pages` 分支
- 網頁生效可能需要等待幾分鐘

若任一步驟失敗，顯示錯誤原因與建議解法。
