import {readFile,writeFile} from 'node:fs/promises';

const repository='https://raw.githubusercontent.com/kejunzheng/penguin-model-capability-ranking/main/data';
const headers={'user-agent':'PenguinIndex/1.0 (+https://yonge6.github.io/penguin-index/)'};
const verifiedRecent={
 generated_at:'2026-09-29T00:00:00Z',
 models:[{
  id:'gpt-6-1-sol-high',name:'GPT-6.1 Sol High',organization:'OpenAI',country:'United States of America',openWeights:false,releaseDate:'2026-09-29',
  records:{aa_intelligence_index:[{date:'2026-09-29',runDate:'2026-09-29',rank:17,score:50,source:'https://artificialanalysis.ai/models/gpt-6-1-sol-high',config:'High'}]},
 }],
};

async function read(name){
 const response=await fetch(`${repository}/${name}`,{headers});
 if(!response.ok)throw new Error(`${response.status} ${name}`);
 return response.json();
}

const [benchmarkPayload,skus,evaluationRecords,snapshots]=await Promise.all([
 read('benchmarks.json'),
 read('model_skus.json'),
 read('evaluation_records.json'),
 read('leaderboard_snapshots.json'),
]);

const recordsById=new Map(evaluationRecords.map(record=>[record.record_id,record]));
const snapshotsById=new Map(snapshots.map(snapshot=>[snapshot.snapshot_id,snapshot]));
const eligibleSkus=skus.filter(sku=>sku.homepage_eligible);

const snapshotDate=record=>snapshotsById.get(record.snapshot_id)?.snapshot_at?.slice(0,10)||record.run_date||null;
const benchmarks=benchmarkPayload.benchmarks.map(benchmark=>{
 const dates=evaluationRecords.filter(record=>record.benchmark_id===benchmark.id).map(snapshotDate).filter(Boolean);
 const recentDates=verifiedRecent.models.flatMap(model=>(model.records[benchmark.id]||[]).map(record=>record.date));
 return {...benchmark,latest_date:[...dates,...recentDates].filter(Boolean).sort().at(-1)||benchmarkPayload.generated_at.slice(0,10),model_count:eligibleSkus.filter(sku=>sku.benchmark_ids.includes(benchmark.id)).length+verifiedRecent.models.filter(model=>model.records[benchmark.id]?.length).length};
});

const models=eligibleSkus.map(sku=>{
 const records={};
 for(const recordId of sku.record_ids){
  const record=recordsById.get(recordId);
  if(!record)continue;
  (records[record.benchmark_id]??=[]).push({
   date:snapshotDate(record),
   runDate:record.run_date,
   rank:record.rank,
   score:record.score,
   source:record.source_url,
   config:sku.record_configurations[recordId]||'标准/未注明',
  });
 }
 for(const entries of Object.values(records))entries.sort((a,b)=>(a.rank??Number.MAX_SAFE_INTEGER)-(b.rank??Number.MAX_SAFE_INTEGER));
 return {id:sku.sku_id,name:sku.display_name,organization:sku.organization,country:sku.organization_country,openWeights:sku.open_weights,releaseDate:sku.model_release_date,records};
});

const upstreamIds=new Set(models.map(model=>model.id));
const generatedAt=[benchmarkPayload.generated_at,verifiedRecent.generated_at].sort().at(-1);
const output={schema_version:'1.0',generated_at:generatedAt,source_repository:'https://github.com/kejunzheng/penguin-model-capability-ranking',source_page:'https://kejunzheng.github.io/penguin-model-capability-ranking/',benchmarks,models:[...models,...verifiedRecent.models.filter(model=>!upstreamIds.has(model.id))]};
const target=new URL('../public/data/benchmarks.json',import.meta.url);
let unchanged=false;
try {
  const current=JSON.parse(await readFile(target,'utf8'));
  unchanged=JSON.stringify(current)===JSON.stringify(output);
} catch {}
if(!unchanged) await writeFile(target,JSON.stringify(output));
console.log(`BENCHMARKS_${unchanged?'UNCHANGED':'UPDATED'} generated_at=${output.generated_at} benchmarks=${benchmarks.length} models=${models.length} records=${evaluationRecords.length}`);
