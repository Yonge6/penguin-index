import ModelLogo from './ModelLogo';
import {stackRows} from './usage-data';
import {chartColors} from './usage-palette';

const short=n=>new Intl.NumberFormat('en',{notation:'compact',maximumFractionDigits:1}).format(n);
export default function MobileUsageBars({data,lang,title}){
 const {top,others}=stackRows(data);
 const rows=[...top,{id:'__others',name:lang==='zh'?'其他模型':'Others',total:others[0]}];
 const max=Math.max(...rows.map(r=>r.total),1);
 return <section className="mobile-usage-bars" aria-label={title}>
  <h3>{title}</h3><p className="mobile-bars-period">{data.from} — {data.to}</p>
  <ol>{rows.map((r,i)=><li key={r.id}>
   <div className="mobile-bar-name"><span className="mobile-bar-rank">{String(i+1).padStart(2,'0')}</span>{r.id!=='__others'&&<ModelLogo item={r} lang={lang}/>}<strong>{r.name}{r.id.includes(':free')?' · Free':''}</strong></div>
   <div className="mobile-bar-value"><b>{short(r.total)}</b><span>{data.platformTotal?(r.total/data.platformTotal*100).toFixed(1):'0'}%</span></div>
   <div className="mobile-bar-track" aria-hidden="true"><div style={{width:(r.total/max*100)+'%',background:r.id==='__others'?'#b8c9df':chartColors[i%chartColors.length]}}/></div>
  </li>)}</ol>
  <p className="mobile-bars-source">OpenRouter · {lang==='zh'?'单位：Token':'Unit: tokens'}</p>
 </section>;
}
