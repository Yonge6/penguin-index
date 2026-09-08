const day=86400000;
export const weekEnd=date=>new Date(Date.parse(date+'T00:00:00Z')+6*day).toISOString().slice(0,10);
export function usageWindow(trends,preset='3m',custom={}) {
 const weeks=trends.weeks;const last=weeks.length-1;const lastFull=weeks.findLastIndex(w=>w[1]==='f');
 let end=preset==='1w'?lastFull:last;let start=Math.max(0,end-({ '1w':1,'1m':4,'3m':13,'6m':26,'1y':52 }[preset]||13)+1);
 if(preset==='custom'){
  if(!custom.from||!custom.to||custom.from>custom.to)return {invalid:true,weeks:[],rows:[],platformTotal:0};
  const indices=weeks.map((w,i)=>w[0]<=custom.to&&weekEnd(w[0])>=custom.from?i:-1).filter(i=>i>=0);
  if(!indices.length)return {invalid:false,weeks:[],rows:[],platformTotal:0};
  start=indices[0];end=indices.at(-1);
 }
 if(end<0)return {invalid:false,weeks:[],rows:[],platformTotal:0};
 const selected=weeks.slice(start,end+1);const points=new Map();
 for(const [wi,mi,value] of trends.points)if(wi>=start&&wi<=end){if(!points.has(mi))points.set(mi,new Map());points.get(mi).set(wi,value)}
 const rows=trends.models.map((model,mi)=>{const values=selected.map((_,i)=>points.get(mi)?.get(start+i)??null);return {...model,mi,values,observed:values.some(v=>v!=null),total:values.reduce((a,b)=>a+(b??0),0)}}).sort((a,b)=>b.total-a.total||a.id.localeCompare(b.id));
 const platformTotal=selected.reduce((sum,w)=>sum+w[2],0);const full=selected.filter(w=>w[1]==='f');
 const a=preset==='1w'?weeks[lastFull-1]?.[2]:full[0]?.[2],b=full.at(-1)?.[2];
 const growth=a>0&&b!=null&&(preset==='1w'||full.length>1)?(b-a)/a:null;
 const snapshotDay=trends.updated_at.slice(0,10);
 return {start,end,weeks:selected,rows,platformTotal,growth,from:selected[0][0],to:weekEnd(selected.at(-1)[0])<snapshotDay?weekEnd(selected.at(-1)[0]):snapshotDay,updated:trends.updated_at,invalid:false};
}
export function stackRows(data,limit=10){
 const top=data.rows.filter(r=>r.observed!==false).slice(0,limit);
 const others=data.weeks.map((w,i)=>Math.max(0,w[2]-top.reduce((sum,r)=>sum+(r.values[i]??0),0)));
 return {top,others};
}
