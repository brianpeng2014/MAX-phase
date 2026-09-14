import fs from 'node:fs/promises';
import {Workbook,SpreadsheetFile} from '@oai/artifact-tool';
const out='D:/research/outputs/ris_20260914';
const raw=await fs.readFile('C:/Users/KIWI/Downloads/ScienceDirect_citations_1789374456484.ris','utf8');
const records=[];let cur={},tag='';
for(const line of raw.split(/\r?\n/)){const m=line.match(/^([A-Z0-9]{2})  - ?(.*)$/);if(m){tag=m[1];if(tag==='ER'){records.push(cur);cur={};}else (cur[tag]??=[]).push(m[2]);}else if(line.trim()&&tag&&cur[tag])cur[tag][cur[tag].length-1]+=' '+line.trim();}
const get=(r,k)=>(r[k]||[]).join('; ');
const groups=[
 ['相生成與製程',[18,54,17,30,28,9,63,31,100,7,3,6,11,20,43,48,52,56,2,22,38,99,89]],
 ['熱性質與孔隙',[36,29,60,14,73,90,77,46,65,96,98,16,34,35,57]],
 ['粉體餵料與成形',[13,92,79,5,19]],
 ['微結構與機械',[94,59,78,95,69,33,1,24,25,49,61,64,67,75,83,85,86,87,39]],
 ['延伸與低相關',[4,8,10,12,15,21,23,26,27,32,37,40,41,42,44,45,47,50,51,53,55,58,62,66,68,70,71,72,74,76,80,81,82,84,88,91,93,97]]
];
// Physical-property chapter is a background entry, not an exclusion.
const first=[18,54,17,30,36,13,92,79,94,59,28,9,63,31,78,29,60,95,69,100];
const p2=[42,14,73,7,3,6,11,20,43,48,52,56,2,5,33,1,24,49,65,90];
const custom={18:['比較兩套前驅系統的中間相、矽逸散與定量 XRD。','相生成；XRD；熱分析','反應路徑可支援 UHS 假設，但非 UHS 實驗。'],54:['非平衡反應燒結與相形成，是檢視快速升溫代價的重要對照。','反應動力學；XRD；硬度','摘要提及慢升溫有利純相；需與超快速製程假設交叉檢驗。'],17:['短持溫熱壓、配方與相純度，貼近快速合成和緻密化問題。','快速熱壓；XRD；密度','15 分鐘有壓熱壓不可等同秒級 UHS。'],36:['摘要明列四點彎曲與閃光法熱傳量測，最接近熱／力學驗證。','四點彎曲；熱傳導；FAST；密度','管件與圓片製程及試片方向需分開核對。'],13:['直接涵蓋 Ti3SiC2 粉末、黏結劑、臨界固含量、脫脂與孔隙。','餵料；射出成形；脫脂；孔隙','多孔件研究，不能直接套用緻密件的性能目標。'],92:['直接研究 MAX phase 餵料流變與擠出列印，支援黏結劑配方。','流變；餵料；擠出成形','須區分 Ti3SiC2 與 Cr2AlC 各自結果。'],79:['以 Ti 粒徑比較相純度，對 PSD 與前驅粉體選擇有直接用途。','粒徑；相纯度；XRD','粒徑影響取決於配方與熱歷程，不能假定越細越好。'],94:['摘要明列 XRD 和 EBSD 取向分析，適合規劃晶粒／取向量測。','EBSD；織構；晶粒；潛變','高溫壓縮潛變不是室溫拉伸或四點彎曲。'],59:['單相與 SiC 複材對照，摘要明列 Rietveld 定量。','XRD；Rietveld；硬度','將單相基準與 SiC 強化結果分開抽取。'],30:['同時比較 SPS 條件、相含量、HV、孔隙與熱膨脹。','XRD；HV；孔隙；熱膨脹','SPS 的壓力與溫度量測不能直接轉用 UHS。'],29:['有序孔隙 Ti3SiC2 的熱傳表現，可建立孔隙與熱性質討論。','取向孔隙；熱傳導','冰模板孔隙具方向性，需核對量測方向。'],42:['作為材料物理／機械性質的背景入口，追查引用的原始研究。','基礎性質；壓痕；晶粒','書籍章節；正文數值應回查原始研究。'],78:['提供緻密化動力學、晶粒成長與彎曲性質的電流燒結對照。','緻密化；晶粒；彎曲','侷限脈衝電流燒結不等於 UHS。'],95:['含未摻雜 Ti3SiC2 基準，支援硬度與高溫彎曲比較。','HV；彎曲；高溫力學','Zr 摻雜與未摻雜結果分開，不混作本材料基準。']};
const all=records.map((r,i)=>{const id=i+1,t=get(r,'T1')||get(r,'TI'),ab=get(r,'AB'),g=groups.find(x=>x[1].includes(id))?.[0]||'延伸與低相關';const p=first.includes(id)?'P1 優先精讀':p2.includes(id)?'P2 重點補充':g==='延伸與低相關'?'P4 延後閱讀':'P3 方法延伸';const defaults={相生成與製程:['比較前驅配方、反應路徑或替代製程，支援相純度窗口規劃。','合成；相組成','核對粉末配方、氣氛、溫度及持溫；替代製程非 UHS。'],熱性質與孔隙:['支援熱性質、熱穩定性或孔隙效應的章節比較。','熱性質；孔隙','核對基體材料與量測方法；複材數值不能視為純 Ti3SiC2。'],粉體餵料與成形:['補充前驅粉體或成形流程與最終組織的關聯。','粉體；成形','核對黏結劑、固含量與脫脂條件是否適用。'],微結構與機械:['比較晶粒、二次相或複材設計對機械行為的影響。','微結構；機械性質','確認主相、強化相和試驗模式；不同模式強度不可直接互換。'],延伸與低相關:['主題偏向塗層、摩擦、接合或其他應用，核心回顧完成後按需讀取。','延伸應用','Ti3SiC2 可能只是添加相或接合層，對塊材 UHS 的直接支持有限。']};const c=custom[id]||defaults[g];return {r,id,t,ab,g,p,c,order:first.includes(id)?first.indexOf(id):p2.includes(id)?100+p2.indexOf(id):200+groups.find(x=>x[0]===g)[1].indexOf(id)+(g==='延伸與低相關'?200:0)};}).sort((a,b)=>a.order-b.order||a.id-b.id);
const wb=Workbook.create();let tn=0;
function table(name,heads,rows,widths){const s=wb.worksheets.add(name);s.showGridLines=false;s.tabColor=name==='總排序'?'#156B71':'#526D82';s.getRangeByIndexes(0,0,rows.length+1,heads.length).values=[heads,...rows];const used=s.getUsedRange();used.format.font={name:'Arial',size:11};used.format.wrapText=true;used.format.verticalAlignment='top';used.format.rowHeight=88;for(let i=0;i<heads.length;i++)s.getRangeByIndexes(0,i,rows.length+1,1).format.columnWidth=widths[i]||24;s.getRangeByIndexes(0,0,1,heads.length).format={fill:'#173B52',font:{name:'Arial',size:11,bold:true,color:'#FFFFFF'},rowHeight:32,verticalAlignment:'center'};s.tables.add(`A1:${col(heads.length)}${rows.length+1}`,true,`Literature${++tn}`);s.freezePanes.freezeRows(1);return s;}
function col(n){let s='';while(n){n--;s=String.fromCharCode(65+n%26)+s;n=Math.floor(n/26);}return s;}
const intro=table('閱讀指南',['項目','說明'],[
['研究主題','Ti3SiC2 MAX phase／UHS 快速合成、熱性質與緻密化'],['來源','ScienceDirect_citations_1789374456484.ris；保留全部 100 筆原始書目。'],['判讀範圍','依据 RIS 題名、摘要及關鍵字作初篩；未取得 PDF，未驗證頁碼或實驗數值。'],['排序方法','P1 直接支援主要實驗；P2 補充反應或材料證據；P3 複材／替代方法；P4 應用較遠。組內按研究用途安排，不以年份或引用數決定品質。'],['閱讀順序','先相生成和快速製程，再熱傳／四點彎曲、餵料、粒徑與 EBSD。總排序為本次固定排序，修改內容後不會自動重排。'],['分頁使用','總排序含全部文獻；5 個主題頁按主要用途互斥歸類，原始 RIS 頁保留完整英文摘要。'],['UHS 缺口','本批題名未見 UHS 直接研究。SPS／FAST／快速熱壓是對照製程，不能當成 UHS 實證。'],['量測缺口','對 CT、AccuPyc、GeoPyc、DSC 和熔融指數的覆蓋需全文確認；摘要未提及不代表未使用。'],['日期提醒','RIS 如列出晚於 2026-09-14 的卷期日期，保留原文並標記待核對；不判定為錯誤或尚未上線。'],['使用界線','本檔是候選閱讀排序，並非入庫或全文納入決定；正式文獻狀態仍由 manifest.csv 維護。']],[24,115]);intro.getUsedRange().format.rowHeight=55;
const heads=['排序','原始ID','優先級','主要主題','英文題名','年份','閱讀用途','實驗對應','比較限制','下一步'];
const data=all.map((x,i)=>[i+1,`SD${String(x.id).padStart(3,'0')}`,x.p,x.g,x.t,Number(get(x.r,'PY'))||null,...x.c,'下載全文並核對方法、圖表與頁碼']);
table('總排序',heads,data,[8,12,18,22,68,9,53,35,55,32]);
for(const [name] of groups)table(name,heads,data.filter(r=>r[3]===name),[8,12,18,22,68,9,53,35,55,32]);
const sourceRows=records.map((r,i)=>[ `SD${String(i+1).padStart(3,'0')}`,get(r,'T1')||get(r,'TI'),get(r,'AU'),get(r,'PY'),get(r,'DA'),get(r,'TY'),get(r,'JO')||get(r,'T2'),get(r,'DO'),get(r,'UR'),get(r,'KW'),get(r,'AB'),get(r,'DA').replaceAll('/','').slice(0,8)>'20260914'?'卷期日期晚於整理日，待核對':'', 'RIS 摘要初篩；未讀全文']);
table('原始RIS',['原始ID','英文題名','作者','出版年原文','日期原文','RIS類型','期刊或書名','DOI','原文連結','關鍵字','英文摘要全文','日期備註','證據階段'],sourceRows,[12,68,50,12,18,10,42,55,65,55,120,35,32]);
// Long abstracts remain fully visible in Excel at practical column width.
const src=wb.worksheets.getItem('原始RIS');for(let i=0;i<sourceRows.length;i++)src.getRange(`A${i+2}:M${i+2}`).format.rowHeight=Math.min(409,Math.max(100,Math.ceil(sourceRows[i][10].length/120)*15));
wb.recalculate();
console.log(JSON.stringify({records:records.length,abstracts:records.filter(r=>get(r,'AB')).length,uniqueDOI:new Set(records.map(r=>get(r,'DO'))).size,counts:groups.map(([g])=>[g,all.filter(x=>x.g===g).length]),top:all.slice(0,10).map(x=>[x.id,x.t])}));
console.log((await wb.inspect({kind:'region',sheetId:'總排序',range:'A1:D5',maxChars:1500})).ndjson);
await (await SpreadsheetFile.exportXlsx(wb)).save(`${out}/Ti3SiC2_文獻閱讀排序.xlsx`);
for(const s of wb.worksheets.items){const blob=await wb.render({sheetName:s.name,range:s.name==='閱讀指南'?'A1:B6':'A1:F4',scale:1,format:'png'});await fs.writeFile(`${out}/${s.name}.png`,new Uint8Array(await blob.arrayBuffer()));}
