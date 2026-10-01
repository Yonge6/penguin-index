// Ranks and growth use recorded model observations; missing observations stay null.
export function usageProfile(trends,id){
 const mi=trends.models.findIndex(m=>m.id===id);
 const byWeek=trends.weeks.map(()=>new Map());
 for(const [wi,index,value] of trends.points)if(byWeek[wi]&&Number.isFinite(value)&&value>=0)byWeek[wi].set(index,value);
 const history=trends.weeks.map(([date,status,total],wi)=>{
  const value=byWeek[wi].get(mi)??null;
  const rank=value==null?null:1+[...byWeek[wi].values()].filter(v=>v>value).length;
  return {date,full:status==='f',value,rank,share:value!=null&&total>0?value/total*100:null};
 });
 const complete=history.filter(w=>w.full),latest=complete.at(-1)??null,previous=complete.at(-2)??null;
 const observed=complete.filter(w=>w.value!=null),first=observed[0]??null;
 let streak=0;for(let i=complete.length-1;i>=0&&complete[i].value!=null;i--)streak++;
 const growth=latest?.value!=null&&previous?.value>0?(latest.value-previous.value)/previous.value:null;
 const rankChange=latest?.rank!=null&&previous?.rank!=null?previous.rank-latest.rank:null;
 const peak=observed.reduce((best,w)=>!best||w.value>best.value?w:best,null);
 return {history,latest,previous,observed,first,streak,growth,rankChange,peak,total:observed.reduce((s,w)=>s+w.value,0),firstTop3:observed.find(w=>w.rank<=3)??null};
}
