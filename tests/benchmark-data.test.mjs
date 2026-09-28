import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {benchmarkCutoff,chooseBenchmarkRecord,filterBenchmarkModels,resolveBenchmarkModel} from '../src/benchmark-data.js';

test('benchmark snapshot presets calculate stable UTC cutoffs',()=>{
 assert.equal(benchmarkCutoff('2026-09-21','latest'),'2026-09-21');
 assert.equal(benchmarkCutoff('2026-09-21','week'),'2026-09-14');
 assert.equal(benchmarkCutoff('2026-09-21','month'),'2026-08-22');
 assert.equal(benchmarkCutoff('2026-09-21','quarter'),'2026-06-23');
 assert.equal(benchmarkCutoff('2026-09-21','custom','2026-08-01'),'2026-08-01');
});

test('record selection respects cutoff and prefers standard configuration',()=>{
 const records=[
  {date:'2026-09-21',rank:2,config:'工具增强'},
  {date:'2026-09-21',rank:5,config:'标准/未注明'},
  {date:'2026-07-10',rank:1,config:'标准/未注明'}
 ];
 assert.equal(chooseBenchmarkRecord(records,'2026-09-21').rank,5);
 assert.equal(chooseBenchmarkRecord(records,'2026-08-01').rank,1);
 assert.equal(chooseBenchmarkRecord(records,'2026-09-21','2026-09-15').rank,5);
 assert.equal(chooseBenchmarkRecord(records,'2026-09-20','2026-09-15'),null);
 assert.equal(chooseBenchmarkRecord(records,'2026-01-01'),null);
});

test('bundled benchmark data has 24 benchmarks and ranked models',()=>{
 const data=JSON.parse(fs.readFileSync('public/data/benchmarks.json','utf8'));
 assert.equal(data.benchmarks.length,24);
 assert.ok(data.benchmarks.every(item=>/^\d{4}-\d{2}-\d{2}$/.test(item.latest_date)),'every benchmark exposes its source snapshot date');
 assert.ok(data.models.length>=300);
 const ids=data.benchmarks.map(item=>item.id);
 const resolved=data.models.map(model=>resolveBenchmarkModel(model,ids,'2026-09-21'));
 assert.ok(filterBenchmarkModels(resolved,{type:'all',region:'all',coverage:'all'}).length>200);
 assert.ok(resolved.some(model=>model.region==='china'));
 assert.ok(resolved.some(model=>model.type==='open'));
});
