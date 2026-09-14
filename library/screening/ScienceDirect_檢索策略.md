# ScienceDirect 文獻檢索與篩選策略

## 一、證據分層

- A 直接證據：Ti3SiC2 且使用 UHS／超快速高溫燒結。
- B 材料證據：Ti3SiC2 的反應路徑、SPS／FAST、相純度、微結構及性質。
- C 製程轉移證據：其他陶瓷／碳化物的 UHS 原理、溫度量測、緻密化與缺陷。
- D 方法證據：XRD、EBSD、密度、CT、力學與餵料流變的量測／判讀方法。

正文優先使用 A、B；C、D 僅用於機理、方法和研究設計，不代替 Ti3SiC2 的直接證據。

## 二、第一輪檢索式

ScienceDirect 的布林運算子使用大寫，固定詞組加雙引號。每條分開搜尋，不合併成單一超長檢索式。

1. `"Ti3SiC2" AND ("ultrafast high-temperature sintering" OR "ultra-fast high-temperature sintering" OR UHS)`
2. `"Ti3SiC2" AND (synthesis OR formation OR "phase evolution" OR "reaction mechanism")`
3. `"Ti3SiC2" AND ("spark plasma sintering" OR "field assisted sintering" OR "pulse discharge sintering" OR "reactive sintering")`
4. `"Ti3SiC2" AND ("phase purity" OR "phase fraction" OR "Rietveld refinement" OR XRD)`
5. `"Ti3SiC2" AND (EBSD OR texture OR "preferred orientation" OR microstructure OR "grain size")`
6. `"Ti3SiC2" AND ("thermal conductivity" OR "thermal diffusivity" OR "specific heat" OR "thermal expansion" OR "thermal shock")`
7. `"Ti3SiC2" AND (hardness OR "Vickers hardness" OR tensile OR flexural OR "four-point bending")`
8. `"Ti3SiC2" AND (density OR porosity OR "skeletal density" OR "envelope density" OR tomography)`
9. `"Ti3SiC2" AND ("laser diffraction" OR "particle size distribution" OR milling OR powder)`
10. `("ultrafast high-temperature sintering" OR "ultra-fast high-temperature sintering") AND (ceramic OR carbide OR densification)`

## 三、餵料與 CT 的擴展檢索

若 Ti3SiC2 直接結果過少，移除材料名，改找可轉移的方法文獻：

1. `("powder injection molding" OR "ceramic injection molding") AND (feedstock OR rheology OR "powder loading")`
2. `(feedstock OR binder) AND (DSC OR "melt flow index" OR viscosity OR "shear thinning") AND ceramic`
3. `("X-ray computed tomography" OR "micro-CT") AND (ceramic OR "powder metallurgy") AND (porosity OR pore)`

## 四、篩選條件

### 納入

- 同儕審查期刊論文或高品質綜述。
- 可取得完整製程條件或表徵條件。
- 能回答相生成、緻密化、微結構、孔隙、機械或熱性質中的至少一項。
- 對方法文獻而言，量測原理與本研究試樣／尺度可轉移。

### 排除

- 僅提及 MAX phase 或 Ti3SiC2，沒有可抽取結果。
- 只有模擬而無法支援本研究問題（理論章節另行標記）。
- 缺少材料組成、製程或測試條件，導致結果不可比較。
- 重複版本、會議摘要、新聞稿或無法回查全文頁碼的二手主張。

## 五、三階段流程

1. 題名篩選：保留可能相關者，寧可多留。
2. 摘要篩選：標記 A–D 證據層及排除理由。
3. 全文篩選：確認關鍵條件、數值、圖表和頁碼後，才列為正文證據。

建議第一輪匯出 150–300 筆書目，摘要納入 80–150 篇，全文核心集約 40–80 篇；這是工作量目標，不是硬性品質門檻。

## 六、資料抽取欄位

每篇至少記錄：原料組成與粒徑、混料／黏結劑、燒結方法、溫度、升溫速率、持溫、氣氛、壓力、試樣尺寸、XRD 定量方式、密度種類、孔隙、晶粒／取向、硬度條件、力學試片與速率、熱性質量測法、關鍵結果、限制及證據頁碼。

## 七、下載與檔案規則

- 先匯出 RIS／BibTeX 和摘要，再下載通過題名篩選的 PDF，避免先囤積大量無關全文。
- PDF 保留出版者原檔名，放入 `library/pdf/`；狀態只更新 `library/manifest.csv`。
- 不用爬蟲繞過 ScienceDirect 限制。大量程式化文字探勘應改用 Elsevier 官方 API。
- 出版者 PDF 不公開分享；Git 倉庫只保留書目、筆記與篩選紀錄。
