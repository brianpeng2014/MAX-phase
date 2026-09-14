# UHS 製備 MAX phase

國立臺灣科技大學機械工程系材料組碩士論文工作區。研究超快速高溫燒結法（UHS）製備 MAX phase 材料的可行性，並檢測其熱性質與緻密化行為。本頁同時是找檔入口與未來架構藍圖；研究安排以[碩論架構規劃書](docs/research/碩論架構規劃書.md)為準。

部分連結與目錄是預先保留的規劃入口，目前可能尚未建立或沒有內部資料。後續增添資料夾、工具與協作流程時，以本頁架構為主要參考並持續迭代。

## 常用入口

| 目的 | 入口 |
|---|---|
| 了解研究題目、現有分析方法與待補資料 | [研究側寫](研究側寫.md) |
| 查看研究目標、實驗安排與論文章節 | [碩論架構規劃書](docs/research/碩論架構規劃書.md) |
| 執行 ScienceDirect 檢索與文獻篩選 | [ScienceDirect 檢索策略](library/screening/ScienceDirect_檢索策略.md) |
| 管理文獻狀態、全文與閱讀筆記 | [文獻庫說明](library/README.md)、[文獻狀態表](library/manifest.csv)、[在庫文獻與筆記](library/在庫文獻與筆記.xlsx)、[文獻總表](library/文獻總表.xlsx) |
| 尋找儀器原始檔、分析結果與圖表 | [研究數據索引](data/README.md) |
| 確認試樣代號與製程資料 | [試樣身分與 Crosswalk](docs/research/試樣身分與Crosswalk.md)、[製程確認與量測安排](docs/research/製程確認與量測安排.md) |
| 找分析程式、計算結果與圖 | [分析慣例](data/analysis/README.md)、[分析腳本](data/analysis/)、[結果](data/results/)、[圖檔](data/figures/) |
| 撰寫論文或整理引用 | [寫作準則](寫作準則.md)、[台科大論文格式](docs/reference/10_台科大論文格式_live.md)、[論文目錄](thesis/)、[BibTeX 書目](thesis/refs.bib) |
| 查詢量測命名、換算與研究決策 | [決策紀錄](decisions/README.md) |
| 換電腦、同步或設定環境 | [同步說明](docs/reference/sync/README.md) |
| 了解代理協作規則 | [AGENTS.md](AGENTS.md) |

## 根目錄資料結構

```text
research/
├─ README.md                    專案與檔案入口
├─ AGENTS.md                    代理協作與研究規則
├─ 研究側寫.md                  研究背景、分析方法與待補資訊
├─ 寫作準則.md                  論文寫作與證據使用原則
├─ docs/
│  ├─ research/                 研究規劃、試樣與實驗設計
│  │  └─ 碩論架構規劃書.md      研究規劃唯一正文
│  └─ reference/                格式規範、參考範例、Zotero 與同步文件
├─ library/
│  ├─ manifest.csv              文獻狀態唯一來源
│  ├─ 在庫文獻與筆記.xlsx        日常文獻檢視（規劃）
│  ├─ 文獻總表.xlsx              含候選文獻的整體檢視（規劃）
│  ├─ pdf/、html/               文獻原文
│  ├─ notes/                    完成的閱讀筆記
│  ├─ text/                     逐頁文字快取與本機檢索索引
│  ├─ screening/                檢索式、篩選與閱讀排序紀錄
│  └─ eval/                     檢索測試題
├─ data/
│  ├─ raw/                      儀器與代測原始資料，不修改
│  ├─ reports/                  週報、合作文件與報告
│  ├─ analysis/                 數據分析與繪圖腳本
│  ├─ results/                  可由腳本重建的分析輸出
│  └─ figures/
│     └─ assets/                正式圖檔與繪圖素材
├─ thesis/
│  └─ refs.bib                  論文引用資料庫，正式章節按需建立
├─ out/                         Word、PDF 等交付成品（規劃）
├─ decisions/                   命名、換算及重要研究決策
├─ scripts/                     穩定的日常研究腳本
├─ tools/
│  └─ sync/                     輔助與同步工具預留位置
├─ vendor/                      外部方法論、模板與授權資訊
├─ agent_md/                    Claude／Codex 共用與各自規則來源
├─ .claude/、.agents/           專案技能與設定（規劃）
├─ .codex/                      Codex 專案設定與 hooks（規劃）
└─ _legacy/                     舊資料唯讀留存區
```

## 存檔原則

- 已知題名或 DOI 時先查文獻檢視表，再依 `library/manifest.csv` 的路徑開啟原文與筆記。Excel 是可重建的檢視介面，狀態維護在來源 CSV。
- 文獻 PDF 保留出版者原檔名並放入 `library/pdf/`；不公開分享。書目狀態集中維護於 `library/manifest.csv`。
- 儀器輸出先原樣放入 `data/raw/`。不得覆寫原始檔；分析腳本、結果與圖分別放入對應目錄。
- 研究方向與實驗安排只更新 `docs/research/碩論架構規劃書.md`。量測名稱、換算來源及重要取捨另記於 `decisions/`。
- 正式論文章節放入 `thesis/`，交付用 Word／PDF 預計統一放入根目錄 `out/`。
- `_legacy/` 僅供人工查閱，不主動讀取或改寫。

## 架構維護原則

每個新增檔案或資料／文件變更的工作批次，以新分支及新的 GitHub PR 交付至 `main`；同批次修正更新原 PR，合併由使用者決定。

文獻排序成品位於 [第一批 Excel](library/Ti3SiC2_文獻閱讀排序.xlsx) 與 [第二批 Excel](library/Ti3SiC2_文獻排序_第二批.xlsx)。未來新增文獻及文獻整理成果一律存入 `library/` 對應位置，不放入 `output/`、`outputs/` 或 `out/`。既有生成腳本與本機預覽暫留原位置，腳本的 Excel 輸出目的地已改為 `library/`。

- 本頁描述目前結構與預計發展方向；連結暫時無法使用不代表應從架構中移除。
- 未來新增目錄、文獻檢視表、試樣 Crosswalk、RAG、分析腳本、Word 輸出、同步、hooks 或代理技能時，優先沿用本頁的責任分層。
- 尚未實作的工具不得假裝已可執行；實作完成後再補使用方式、輸入、輸出與維護責任。
- 若研究流程改變，先更新本頁的入口與資料夾地圖，再同步相關子目錄說明。
