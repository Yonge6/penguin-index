import {writeFile} from 'node:fs/promises';

const api='https://api.skillhub.cn';
const headers={'user-agent':'PenguinIndex/1.0 (+https://yonge6.github.io/penguin-index/)'};
async function json(path){const response=await fetch(api+path,{headers});if(!response.ok)throw new Error(`${response.status} ${path}`);return response.json()}
const compact=skill=>({
 id:`${skill.namespace?.handle||skill.ownerName||'skillhub'}/${skill.slug}`,
 slug:skill.slug,
 handle:skill.namespace?.handle||null,
 name:skill.name,
 description:String(skill.description_zh||skill.description||'').replace(/\s+/g,' ').trim().slice(0,420),
 category:skill.category||'uncategorized',
 downloads:Number(skill.downloads)||0,
 stars:Number(skill.stars)||0,
 source:skill.source||'SkillHub',
 verified:Boolean(skill.verified),
 updated_at:skill.updated_at||null,
 url:`https://skillhub.cn/skills/${skill.namespace?.handle||skill.ownerName||'skillhub'}/${skill.slug}`,
});

const trendingPayload=await json('/api/v1/showcase/trending');
const trending=(trendingPayload.skills||[]).slice(0,100).map(compact);
const downloads=[];
for(let page=1;page<=10;page++){
 const payload=await json(`/api/skills?page=${page}&pageSize=100&sortBy=downloads`);
 const rows=payload.data?.skills||[];
 downloads.push(...rows.map(compact));
 if(rows.length<100)break;
}
const output={schema_version:1,generated_at:new Date().toISOString(),source_url:'https://skillhub.cn/skills',rules:{trending_limit:100,downloads_limit:1000},trending,downloads:downloads.slice(0,1000)};
await writeFile(new URL('../public/data/skillhub.json',import.meta.url),JSON.stringify(output,null,2)+'\n');
console.log(`SKILLHUB_UPDATED trending=${output.trending.length} downloads=${output.downloads.length} generated_at=${output.generated_at}`);
