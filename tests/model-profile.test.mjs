import test from 'node:test';
import assert from 'node:assert/strict';
import {findMatchingPriceModel,findMatchingUsageModel} from '../src/model-profile.js';

const usage={id:'tencent/hy4-preview-20260827',name:'Hy4 preview',author:'tencent',provider:'tencent'};
const prices=[
 {slug:'tencent/hy4-preview:batch',name:'Hy4 preview',provider:'tencent',provider_name:'Tencent',source:'openrouter'},
 {slug:'tencent/hy4-preview',name:'Hy4 preview',provider:'tencent',provider_name:'Tencent',source:'openrouter'},
];

test('usage profile matches the non-batch price record',()=>{
 assert.equal(findMatchingPriceModel(usage,prices)?.slug,'tencent/hy4-preview');
});

test('price profile matches the usage record by normalized name and provider',()=>{
 assert.equal(findMatchingUsageModel(prices[1],[usage])?.id,usage.id);
});

test('unmatched models remain empty instead of receiving a nearby record',()=>{
 assert.equal(findMatchingPriceModel({id:'other/model',name:'Other Model',provider:'Other'},prices),null);
});
