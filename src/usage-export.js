import {stackRows} from './usage-data';
import {modelBrand} from './model-brand';
import {chartColors} from './usage-palette';

const base=import.meta.env.BASE_URL;
const font='Inter, "PingFang SC", "Microsoft YaHei", sans-serif';
const short=n=>new Intl.NumberFormat('en',{notation:'compact',maximumFractionDigits:1}).format(n);
function loadImage(src){return new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>reject(new Error('Image could not be loaded'));img.src=src;});}
function rect(ctx,x,y,w,h,r,fill){ctx.fillStyle=fill;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}
function text(ctx,value,x,y,size,color='#14283f',weight=400){ctx.font=`${weight} ${size}px ${font}`;ctx.fillStyle=color;ctx.fillText(value,x,y);}
function fit(ctx,value,width,size){ctx.font=`600 ${size}px ${font}`;while(ctx.measureText(value).width>width&&size>16){size--;ctx.font=`600 ${size}px ${font}`;}return size;}
function wrap(ctx,value,x,y,width,size,color){let line='';for(const ch of value){ctx.font=`400 ${size}px ${font}`;if(ctx.measureText(line+ch).width>width){text(ctx,line,x,y,size,color);line='';y+=size*1.5;}line+=ch;}if(line)text(ctx,line,x,y,size,color);return y+size*1.5;}

// Render from the selected data window at a fixed resolution, independent of phone viewport.
export async function createUsagePoster({data,mode,theme,selected,singleWeek,lang,title}){
 await document.fonts.ready;
 const zh=lang==='zh',horizontal=singleWeek&&mode==='total',dark=theme==='dark';
 const {top,others}=stackRows(data);
 const rows=[...top,{id:'__others',name:zh?'其他模型':'Others',total:others[0]}];
 const [publisher,penguin,wave,...logos]=await Promise.all([
  loadImage(base+'assets/tencent-technology.png'),loadImage(base+'assets/penguin-logo-supplied.png'),
  loadImage(base+'assets/blue-wave.webp'),
  ...top.map(r=>{const brand=modelBrand(r);return brand?loadImage(base+'assets/models/'+brand.file).catch(()=>null):Promise.resolve(null);})
 ]);
 const chartHeight=horizontal?rows.length*78+88:700;
 const width=1080,height=480+chartHeight+190,canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
 const ctx=canvas.getContext('2d');
 ctx.fillStyle='#f1f6fc';ctx.fillRect(0,0,width,height);
 ctx.fillStyle='#fff';ctx.fillRect(0,0,width,112);
 const ph=44,pw=publisher.width/publisher.height*ph;ctx.drawImage(publisher,48,34,pw,ph);
 ctx.strokeStyle='#cad9eb';ctx.beginPath();ctx.moveTo(48+pw+26,34);ctx.lineTo(48+pw+26,78);ctx.stroke();
 ctx.drawImage(penguin,48+pw+52,30,penguin.width/penguin.height*52,52);
 // Approved wave artwork, with a soft left overlay for readable type.
 ctx.drawImage(wave,0,112,width,328);
 const wash=ctx.createLinearGradient(0,0,width,0);wash.addColorStop(0,'rgba(239,248,255,.97)');wash.addColorStop(1,'rgba(239,248,255,.12)');ctx.fillStyle=wash;ctx.fillRect(0,112,width,328);
 text(ctx,'02 / MODEL USAGE',48,158,18,'#547ba9',500);
 text(ctx,title,48,225,fit(ctx,title,984,48),'#10273f',700);
 text(ctx,`${data.from} — ${data.to}`,48,270,22,'#4e6e90');
 text(ctx,mode==='total'?(zh?'OpenRouter 平台调用量':'OpenRouter platform usage'):(zh?'所选模型累计调用量':'Selected models · total tokens'),48,320,20,'#4e6e90');
 text(ctx,short(mode==='total'?data.platformTotal:selected.reduce((s,r)=>s+r.total,0)),48,393,64,'#10273f',700);
 if(mode==='total'&&data.growth!=null){const positive=data.growth>=0;text(ctx,(positive?'+':'')+(data.growth*100).toFixed(0)+'%',400,367,30,positive?'#008c73':'#bc4a63',600);text(ctx,singleWeek?(zh?'较上一完整周':'vs previous full week'):(zh?'首末完整周变化':'First vs last full week'),400,400,16,'#4e6e90');}
 const surface=dark?'#16202d':'#fff',ink=dark?'#f1f6fc':'#14283f',muted=dark?'#a5b6cb':'#627f9f';
 rect(ctx,32,464,1016,chartHeight,22,surface);
 if(horizontal){
  text(ctx,zh?'模型排名与份额':'Model ranking & share',64,506,22,ink,600);
  const max=Math.max(...rows.map(r=>r.total),1);
  rows.forEach((r,i)=>{const y=548+i*78,name=r.name+(r.id.includes(':free')?' · Free':'');
   text(ctx,String(i+1).padStart(2,'0'),64,y+13,20,muted);
   if(logos[i]){rect(ctx,108,y-13,36,36,7,'#fff');ctx.drawImage(logos[i],112,y-9,28,28);}
   text(ctx,name,158,y+13,fit(ctx,name,560,23),ink,600);
   ctx.textAlign='right';text(ctx,short(r.total),891,y+13,24,ink,600);text(ctx,(data.platformTotal?r.total/data.platformTotal*100:0).toFixed(1)+'%',1016,y+13,20,muted);ctx.textAlign='left';
   rect(ctx,158,y+29,858,9,4,dark?'#2c3b4e':'#edf3fa');rect(ctx,158,y+29,858*r.total/max,9,4,r.id==='__others'?'#b8c9df':chartColors[i%chartColors.length]);
  });
 }else{
  const element=document.createElement('div');element.style.cssText='position:fixed;left:-10000px;top:0;width:984px;height:636px';document.body.append(element);let chart;
  try{const {createUsageChart}=await import('./chart');chart=createUsageChart(element,data,{mode,theme,selected,singleWeek:false,lang,exportMode:true});const bitmap=await loadImage(chart.getDataURL({type:'png',pixelRatio:2}));ctx.drawImage(bitmap,48,480,984,636);}finally{chart?.dispose();element.remove();}
 }
 let footer=480+chartHeight+30;
 text(ctx,zh?'数据来源：OpenRouter':'Source: OpenRouter',48,footer,20,'#45668a',500);
 text(ctx,(zh?'数据更新：':'Data updated: ')+data.updated.slice(0,10),48,footer+34,20,'#45668a');
 const note=zh?'统计 OpenRouter 平台 Token 用量，不代表整个 AI 市场。'+(data.weeks.some(w=>w[1]==='i')?'包含尚未结束的当周数据。':''):'OpenRouter token usage only; not the entire AI market.'+(data.weeks.some(w=>w[1]==='i')?' Includes the incomplete current week.':'');
 wrap(ctx,note,48,footer+73,984,18,'#627f9f');
 text(ctx,'AI 趋势榜  /  AI TREND RANKINGS',48,height-30,16,'#627f9f',500);
 const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('Image export failed')),'image/png'));
 return {url:canvas.toDataURL('image/png'),blob};
}
