const urls={projects:'https://kejunzheng.github.io/penguin-ranking-preview/',usage:'https://openrouter.ai/rankings',global:'https://openrouter.ai/api/v1/models',china:'https://h5.news.qq.com/qqfile/openrouterllm/model-trends.html'};
export function dataDate(value,lang){return value?new Intl.DateTimeFormat(lang==='zh'?'zh-CN':'en-US',{year:'numeric',month:'short',day:'numeric',timeZone:'Asia/Shanghai'}).format(new Date(value)):'—'}
export function SourceSummary({kind,scope,channel,updated,lang}){
 const zh=lang==='zh';
 const source=kind==='projects'?'GitHub REST API':kind==='usage'?'OpenRouter rankings':scope==='global'?'OpenRouter Models API':zh?'厂商价格公开资料（原站收录）':'Published provider prices (source dataset)';
 const coverage=kind==='projects'?(zh?({product:'开源产品',skill:'AI 技能与 Agent 工具',dsh:'DSH 生态开源项目'}[channel]||'开源项目'):({product:'open-source products',skill:'AI skills and agent tools',dsh:'DSH ecosystem projects'}[channel]||'open-source projects')):kind==='usage'?(zh?'平台路由的模型 Token 用量':'model tokens routed through OpenRouter'):scope==='global'?(zh?'该平台提供的全球模型（含中国厂商）':'models on the platform, including Chinese providers'):(zh?'已收录中国模型的输入／输出 Token 价格':'listed Chinese models’ input / output token prices');
 return <p className="source-summary">{zh?'数据来自':'Source: '}<a href={urls[kind==='projects'?'projects':kind==='usage'?'usage':scope]} target="_blank" rel="noreferrer">{source}</a><span> · {zh?'包含':'Includes: '}{coverage}</span><span> · {zh?'数据更新：':'Data updated: '}{dataDate(updated,lang)}</span></p>;
}
export default function DataNotes({kind,lang,updated,rate,compact=false}){
 const zh=lang==='zh';
 return <details className={'data-notes'+(compact?' compact':'')} open={!compact}>
  <summary>{zh?'数据来源与统计口径':'Sources & methodology'}</summary>
  <div className="data-notes-body">
   {kind==='projects'?<>
    <p>{zh?'从公开的 GitHub 项目中筛出用途明确、可以正常访问、具有实际使用价值并通过内容安全检查的项目，再统计其新增 Star。新增 Star 越多，排名越靠前；如果新增数量相同，就比较项目当前的 Star 总数，再按 GitHub 的项目编号确定先后，最终展示前 10 名。':'Public GitHub projects are selected for a clear purpose, accessibility, practical value and content safety. Projects are ranked by new stars, then total stars, then GitHub repository ID, with the top 10 shown.'}</p>
    <p>{zh?'日／周／月榜分别使用 24／168／720 小时前的基线，仅展示新增 Star 为正的项目；基线不足时显示积累中。排名不接受付费加权或人工调位，热度不代表能力、质量或安全性。':'Daily, weekly and monthly growth uses 24 / 168 / 720-hour baselines. Only positive growth is included; missing baselines remain pending. No paid weighting or manual placement. Popularity does not establish quality, capability or safety.'}</p>
    <a href={urls.projects} target="_blank" rel="noreferrer">{zh?'GitHub REST API · 原站榜单数据':'GitHub REST API · source ranking dataset'} ↗</a>
   </>:kind==='usage'?<>
    <p>{zh?'数据来源为 OpenRouter 公开 rankings 页面。统计各模型经过 OpenRouter 平台路由的 Token 总量，包含输入和输出 Token；仅反映 OpenRouter 平台数据，不包含模型厂商直连 API、企业私有部署、本地部署等场景。':'Data comes from OpenRouter’s public rankings. Counts include input and output tokens routed through OpenRouter, excluding direct provider APIs, private enterprise deployments and local deployments.'}</p>
    <p>{zh?'本页按数据文件提供的自然周展示；“1周”视图展示上个完整周，较长周期可能包含尚未结束的当周。首页汇总最近四个完整周。数据更新日期为当前文件的更新时间，不是实时数据。':'The page uses calendar weeks supplied by the dataset. The one-week view shows the last complete week; longer ranges may include the incomplete current week. Home totals cover four complete weeks. The update date describes the current dataset, not live data.'}</p>
    <p>{zh?'免责声明：图表仅供内容创作和行业观察参考，不代表全球大模型市场全部份额或权威排名。':'Disclaimer: Charts are for content creation and industry observation only. They do not represent the full global AI market or an authoritative model ranking.'}</p>
    <a href={urls.usage} target="_blank" rel="noreferrer">OpenRouter rankings ↗</a>
   </>:<>
    <p>{zh?'所有输入价、输出价统一按每百万 tokens 展示。中国大模型榜保留数据包收录的厂商人民币价；全球大模型榜保留 OpenRouter 公布的美元价。两类来源和数据更新日期分别展示。':'Input and output prices are shown per million tokens. Chinese-model rankings retain provider CNY rates recorded in the dataset; global rankings retain OpenRouter USD rates. Sources and update dates are shown separately.'}</p>
    <p>{zh?`切换币种时使用数据包的价格与参考汇率${rate?`（1 USD = ¥${rate}）`:''}。换算价仅供参考，实际收费以对应平台或厂商说明为准。`:`Currency switching uses dataset prices and its reference exchange rate${rate?` (1 USD = ¥${rate})`:''}. Converted prices are estimates; verify actual billing with the platform or provider.`}</p>
    <p>{zh?'表中比较输入／输出 Token 单价，不另计缓存、Batch、Fast/Priority、区域、图片、音频、搜索或工具调用的附加计费；若来源单列特定计费模式，保留模型名称中的标注。星号表示存在阶梯价，展示标准价或最低档。短横线表示厂商未公布或该计费项不适用。':'The table compares input / output token rates without separately calculating cache, Batch, Fast/Priority, regional, image, audio, search or tool-call billing adjustments. Source-listed variants retain their name labels. An asterisk denotes tiered pricing at the standard or lowest listed tier. A dash means unavailable or not applicable.'}</p>
   </>}
   <p className="data-notes-updated">{zh?'数据更新：':'Data updated: '}{dataDate(updated,lang)}</p>
  </div>
 </details>;
}
