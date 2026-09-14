import fs from 'node:fs/promises';
import {Workbook,SpreadsheetFile} from '@oai/artifact-tool';
const out='D:/research/outputs/ris_batch2_20260914';
const files=['ScienceDirect_citations_1789375468814.ris','ScienceDirect_citations_1789375501226.ris'];
const get=(r,k)=>(r[k]||[]).join('; ');let raw=[];
for(let b=0;b<files.length;b++){let r={},tag='',n=0;for(const l of (await fs.readFile('C:/Users/KIWI/Downloads/'+files[b],'utf8')).split(/\r?\n/)){const m=l.match(/^([A-Z0-9]{2})  - ?(.*)$/);if(m){tag=m[1];if(tag==='ER'){n++;raw.push({r,id:`${b?'B':'A'}${String(n).padStart(3,'0')}`,file:files[b]});r={};}else(r[tag]??=[]).push(m[2]);}else if(l.trim()&&r[tag])r[tag][r[tag].length-1]+=' '+l.trim();}}
const key=x=>get(x.r,'DO').toLowerCase().replace(/^https?:\/\/(dx\.)?doi.org\//,'').trim()||((get(x.r,'T1')||get(x.r,'TI')).toLowerCase().replace(/[^a-z0-9]/g,'')+'|'+get(x.r,'PY')+'|'+get(x.r,'JO')+'|'+get(x.r,'VL')+'|'+get(x.r,'SP'));
const seen=new Map(),unique=[],duplicates=[];for(const x of raw){if(seen.has(key(x))){duplicates.push([x.id,seen.get(key(x)).id,x.file,get(x.r,'T1'),get(x.r,'DO')]);}else{seen.set(key(x),x);unique.push(x);}}
const first=['B025','B030','B042','B092','B011','A006','A037','A032','A076','B100','B013','B006','B069','B053','A065','B068','A029','B048','B033','B071'];
const second=['A001','A003','A011','A016','A019','A035','A045','A046','A048','A052','A068','A080','A087','B003','B014','B024','B026','B032','B034','B036','B038','B056','B059','B065','B072','B074','B078','B086','B087','A005','A071'];
const core=new Set([...first,...second]);
const spec={
B065:['相生成與燒結','半熔融製程合成層狀 Ti3SiC2，補充液相反應路徑。','合成；液相；微結構','半熔融條件及熱歷程需全文核對，非 UHS。'],
B078:['熱性質與孔隙','提供高溫太陽能吸收用途的熱性能研究線索。','高溫性能；太陽能吸收','吸收率不等於熱傳導率；不同材料分開比較。'],
A005:['背景與方法','MAX 相材料科學與薄膜製程綜述，可建立結構與術語背景。','MAX 相背景；結構','薄膜製程與塊材合成不同，需追查相關原始研究。'],
B025:['熱性質與孔隙','直接比較孔隙與晶粒對熱傳導、熱膨脹及滲透的影響。','熱傳導；熱膨脹；孔徑','分開抽取 Ti2AlC 與 Ti3SiC2；孔隙材料不等同緻密件。'],
B030:['相生成與燒結','比較 SPS 氣氛、石墨接觸與粉體粒徑對緻密化和分解的影響。','PSD 對應粒徑；XRD；緻密化','商用粉末路徑與元素原位合成不同；SPS 非 UHS。'],
B042:['相生成與燒結','DSC／TG 配合 XRD 追蹤 TiC/Si 反應與氣體逸散。','DSC；TG；XRD','慢升溫反應溫度不可直接當作 UHS 設定值。'],
B092:['相生成與燒結','以配方、相圖及反應物質量保留控制 TiC 雜相。','XRD；相純度；氣氛','需核對坩堝封蓋與保矽条件；未證明 UHS 適用性。'],
B011:['相生成與燒結','SPS 添加 Al 促進反應，摘要含密度與維氏硬度條件。','XRD；密度；HV','摘要的 fully dense 與相對密度數值需全文核對。'],
A006:['相生成與燒結','無壓反應燒結添加 Al 的相形成與緻密化對照。','相純度；密度','添加物及去氧機制需按原料條件核對。'],
A037:['相生成與燒結','比較 Al 輔助 SPS／熱壓合成，提供配方選擇依據。','相純度；SPS；熱壓','有壓製程非 UHS；Al 可能改變最終組成。'],
A032:['相生成與燒結','探討 Si 含量與溫度時間交互影響下的相生成。','XRD；配方；持溫','最佳 Si 配比隨熱歷程改變。'],
A076:['相生成與燒結','熱壓低產率及後續無壓加熱形成 MAX 相，提供失敗條件對照。','XRD；阿基米德密度；膨脹儀','氧化層與壓力的影響需核對，勿只摘錄成功條件。'],
B100:['微結構與機械','商用粉末 SPS 路徑的相演化、取向關係與壓痕變形。','XRD；DSC；HV；TEM','摘要未明列 EBSD；取向關係不能視為 EBSD 實測。'],
B013:['熱性質與孔隙','造孔劑含量與粒徑對孔隙、純度與應力應變的影響。','孔隙；粒徑；機械行為','造孔劑形成孔隙不同於 UHS 殘餘缺陷；CT 待全文確認。'],
B006:['熱性質與孔隙','元素粉末反應合成的開孔率、孔徑及成孔機制。','開孔率；孔徑；反應合成','確認孔隙量測方法；不可直接當作 AccuPyc／GeoPyc 結果。'],
B069:['熱性質與孔隙','Al/Si 比與 Ti 粒徑控制相組成、孔隙及彎曲行為。','粒徑；孔隙；彎曲','Al 固溶及 Ti3AlC2 相轉變需分開記錄。'],
B053:['粉體與成形','冷凍鑄造的黏度、固含量和凍結條件連結到層狀孔隙。','黏度；固含量；孔隙','漿料流變不等於高分子熔融餵料或熔融指數。'],
A065:['相生成與燒結','Ni 輔助無壓燒結的動力學、晶粒及機械性質。','密度；HV；彎曲','Ni 改變液相及組成；與無添加試樣分開比較。'],
B068:['相生成與燒結','金屬添加物促進單相塊材熱壓合成的對照。','相純度；熱壓；晶粒','Ti3AlC2 與 Ti3SiC2 分開抽取。'],
A029:['微結構與機械','La2O3 添加抑制分解並細化組織，連結彎曲與韌性。','微結構；彎曲；分解','添加物強化結果不能套用未摻雜材料。'],
B048:['相生成與燒結','比較球磨、碳含量、壓坯厚度及熱歷程對純度的影響。','XRD；粒徑；試樣厚度','表面與整體純度不同，需分開記錄。'],
B033:['微結構與機械','定向孔隙與固含量對壓縮及破壞模式的影響。','孔隙方向；壓縮；組織','壓縮不能代替拉伸或四點彎曲。'],
B071:['背景與方法','彙整氣氛、孔隙與孔徑對 MAX 分解動力學的影響。','分解；氣氛；孔隙','書籍章節，追查原始研究；非 UHS 直接證據。']};
const defaults={
'相生成與燒結':['補充前驅粉末、合成反應及製程對相組成的影響。','相生成；燒結','核對配方、氣氛、壓力與持溫；替代燒結方式不是 UHS。'],
'熱性質與孔隙':['補充孔隙、熱性質或熱穩定性的研究背景。','孔隙；熱行為','熱穩定／氧化與熱傳導不同；需核對量測指標及材料相組成。'],
'微結構與機械':['補充組織或複材設計對機械性能的影響。','微結構；機械行為','複材主相、試片方向及試驗模式需匹配後才可比較。'],
'粉體與成形':['提供成形流程及粉體／漿料條件的補充。','粉體；成形','需確認與金屬粉末／高分子黏結劑餵料的適用差異。'],
'背景與方法':['作為材料原理及方法背景，追查相關原始研究。','材料背景','可能跨材料或屬書籍／綜述，不能代替本材料實測證據。'],
'延伸閱讀':['偏向表面、摩擦、接合、輻照或其他应用，按章節需要選讀。','延伸應用','塗層、接合層或添加相不等同 UHS 塊材。'],
'排除與待核對':['不作本次核心實驗證據。','不適用','保留原始記錄及排除理由。']};
for(const x of unique){x.t=get(x.r,'T1')||get(x.r,'TI');x.ab=get(x.r,'AB');const t=x.t.normalize('NFKC').toLowerCase();let g='延伸閱讀';if(/^(abstracts|bibliography|list of contents)|retracted:|summary report of calphad/.test(t)){g='排除與待核對';x.exclude=/retracted/.test(t)?'RIS 題名標示撤稿；不列入核心證據':'摘要彙編／目錄／書目／會議摘要報告，非單篇研究';}else if(spec[x.id])g=spec[x.id][0];else if(/thin.film|coating|tribo|erosion|irradiat|joining|bonding|welding|brazing|mxene|maxene|electrochem|anodiz|nanofluid|corrosion|ablation/.test(t))g='延伸閱讀';else if(/review|overview|self-propagating high-temperature synthesis$/.test(t))g='背景與方法';else if(/porous|pore|thermophysical|oxidation|thermal stability|phase stability/.test(t))g='熱性質與孔隙';else if(/mold|mould|paper-derived|impeller/.test(t))g='粉體與成形';else if(/mechanical|tough|strength|damage|fracture/.test(t))g='微結構與機械';else if(/synthesis|sinter|reaction|formation|fabrication|preparation/.test(t))g='相生成與燒結';x.g=g;x.c=spec[x.id]?.slice(1)||defaults[g];x.p=g==='排除與待核對'?'X 排除':first.includes(x.id)?'P1 優先精讀':second.includes(x.id)?'P2 重點補充':g==='延伸閱讀'?'P4 延後閱讀':'P3 方法延伸';x.order=first.includes(x.id)?first.indexOf(x.id):second.includes(x.id)?100+second.indexOf(x.id):x.p.startsWith('P3')?300:x.p.startsWith('P4')?400:500;}
const all=unique.sort((a,b)=>a.order-b.order||a.id.localeCompare(b.id));
const wb=Workbook.create();let tableid=0;function col(n){let c='';while(n){n--;c=String.fromCharCode(65+n%26)+c;n=Math.floor(n/26);}return c;}
function sheet(name,headers,rows,widths){const s=wb.worksheets.add(name);s.showGridLines=false;s.tabColor='#247780';s.getRangeByIndexes(0,0,rows.length+1,headers.length).values=[headers,...rows];const u=s.getUsedRange();u.format.font={name:'Arial',size:11};u.format.wrapText=true;u.format.verticalAlignment='top';u.format.rowHeight=80;for(let i=0;i<headers.length;i++)s.getRangeByIndexes(0,i,rows.length+1,1).format.columnWidth=widths[i]||25;s.getRangeByIndexes(0,0,1,headers.length).format={fill:'#173B52',font:{name:'Arial',size:11,bold:true,color:'#FFFFFF'},rowHeight:32};s.tables.add(`A1:${col(headers.length)}${rows.length+1}`,true,'Lit'+(++tableid));s.freezePanes.freezeRows(1);return s;}
const counts={};for(const x of all)counts[x.g]=(counts[x.g]||0)+1;
sheet('閱讀指南',['項目','說明'],[['範圍','僅合併本次兩份 RIS；未合併前一批 100 篇。'],['筆數',`原始 ${raw.length} 筆；去重後 ${all.length} 筆；重複 ${duplicates.length} 筆。`],['來源A',files[0]],['來源B',files[1]],['整理依据','題名、RIS 摘要和關鍵字初篩；未讀 PDF，未核對實驗數值與頁碼。'],['排序','P1：直接支援主要實驗；P2：重要材料／機理補充；P3：替代方法；P4：較遠應用；X：排除。組內依研究用途排序。'],['閱讀起點','先 B025 熱物性、B030 氣氛與粒徑、B042 DSC 反應，再看純度控制及孔隙。'],['原始資料','來源 ID 用於跨頁追溯；完整摘要、DOI、來源檔與 RIS 類型保留在原始RIS。'],['排序維護','本檔為固定排序快照；各主題頁按主要用途互斥歸類。正式入庫狀態仍以 manifest.csv 為準。'],['量測缺口','未在題名見到直接 UHS 研究。CT、AccuPyc、GeoPyc、EBSD、熔融指數與四點彎曲是否使用，需全文核對。'],['日期與缺摘要','缺摘要項目降為題名初篩；晚於 2026-09-14 的卷期日期保留並標記，非自動排除。'],...Object.entries(counts).map(([a,b])=>[a,`${b} 篇`])],[24,110]);
const heads=['排序','來源ID','優先級','主要主題','英文題名','年份','閱讀用途','實驗對應','比較限制','判讀依據','下一步','DOI'];
const rows=all.map((x,i)=>[i+1,x.id,x.p,x.g,x.t,Number(get(x.r,'PY'))||null,...x.c,x.ab?'題名＋摘要初篩':'僅題名；缺摘要',x.exclude||'取得全文，核對製程與量測方法',get(x.r,'DO')]);
const widths=[8,12,18,22,70,9,53,35,53,25,42,55];sheet('總排序',heads,rows,widths);
for(const name of ['相生成與燒結','熱性質與孔隙','微結構與機械','粉體與成形','背景與方法','延伸閱讀','排除與待核對'])sheet(name,heads,rows.filter(r=>r[3]===name),widths);
const sr=raw.map(x=>[x.id,x.file,get(x.r,'T1')||get(x.r,'TI'),get(x.r,'AU'),get(x.r,'PY'),get(x.r,'DA'),get(x.r,'TY'),get(x.r,'JO')||get(x.r,'T2'),get(x.r,'DO'),get(x.r,'UR'),get(x.r,'KW'),get(x.r,'AB'),!get(x.r,'AB')?'缺摘要':get(x.r,'DA').replaceAll('/','').slice(0,8)>'20260914'?'卷期日期晚於整理日，待核對':'']);
const ss=sheet('原始RIS',['來源ID','來源檔','英文題名','作者','年份原文','日期原文','RIS類型','期刊或書名','DOI','原文連結','關鍵字','英文摘要全文','資料註記'],sr,[12,55,70,48,12,18,10,42,55,65,50,120,35]);for(let i=0;i<sr.length;i++)ss.getRange(`A${i+2}:M${i+2}`).format.rowHeight=Math.min(409,Math.max(90,Math.ceil(sr[i][11].length/110)*15));
if(duplicates.length)sheet('重複記錄',['重複ID','保留ID','來源檔','英文題名','DOI'],duplicates,[15,15,55,75,55]);
if(new Set(all.map(x=>x.id)).size!==all.length||Object.values(counts).reduce((a,b)=>a+b,0)!==all.length)throw Error('Record reconciliation failed');
wb.recalculate();await(await SpreadsheetFile.exportXlsx(wb)).save('D:/research/library/Ti3SiC2_文獻排序_第二批.xlsx');
console.log(JSON.stringify({raw:raw.length,unique:all.length,duplicates:duplicates.length,abstracts:raw.filter(x=>get(x.r,'AB')).length,counts,priority:first.length}));
for(const s of wb.worksheets.items){const p=await wb.render({sheetName:s.name,range:s.name==='閱讀指南'?'A1:B5':'A1:F3',scale:1,format:'png'});await fs.writeFile(`${out}/${s.name}.png`,new Uint8Array(await p.arrayBuffer()));}
console.log((await wb.inspect({kind:'region',sheetId:'總排序',range:'A1:D4',maxChars:1000})).ndjson);
