import test from 'node:test';
import assert from 'node:assert/strict';
import {usageProfile} from '../src/usage-profile.js';
const trends={models:[{id:'a'},{id:'b'}],weeks:[['2026-01-05','f',100],['2026-01-12','f',200],['2026-01-19','i',300]],points:[[0,0,20],[0,1,40],[1,0,60],[1,1,30],[2,0,200]]};
test('profile excludes partial week and uses platform denominator',()=>{const p=usageProfile(trends,'a');assert.equal(p.total,80);assert.equal(p.growth,2);assert.equal(p.latest.rank,1);assert.equal(p.rankChange,1);assert.equal(p.latest.share,30);assert.equal(p.streak,2);assert.equal(p.history[2].value,200);});
test('missing observation is not zero or a growth estimate',()=>{const copy=structuredClone(trends);copy.points=copy.points.filter(([w,m])=>!(w===1&&m===0));const p=usageProfile(copy,'a');assert.equal(p.latest.value,null);assert.equal(p.growth,null);assert.equal(p.rankChange,null);assert.equal(p.streak,0);assert.equal(p.total,20);});
