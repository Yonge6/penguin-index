// Curated series/provider marks; model versions intentionally share a family mark.
const brands = {
  anthropic: ['claude-color.svg', 'Claude'],
  'arcee-ai': ['arcee-color.svg', 'Arcee'],
  baichuan: ['baichuan-color.svg', 'Baichuan'],
  deepseek: ['deepseek-color.svg', 'DeepSeek'],
  doubao: ['doubao-color.svg', 'Doubao'],
  ernie: ['wenxin-color.svg', 'ERNIE'],
  google: ['gemini-color.svg', 'Gemini'],
  hunyuan: ['hunyuan-color.svg', 'Hunyuan'],
  meta: ['meta-color.svg', 'Meta'],
  minimax: ['minimax-color.svg', 'MiniMax'],
  moonshot: ['kimi-color.svg', 'Kimi'],
  moonshotai: ['kimi-color.svg', 'Kimi'],
  nvidia: ['nvidia-color.svg', 'NVIDIA'],
  openai: ['openai.svg', 'OpenAI'],
  openrouter: ['openrouter.svg', 'OpenRouter'],
  qwen: ['qwen-color.svg', 'Qwen'],
  step: ['stepfun-color.svg', 'StepFun'],
  stepfun: ['stepfun-color.svg', 'StepFun'],
  tencent: ['hunyuan-color.svg', 'Hunyuan'],
  tngtech: ['deepseek-color.svg', 'DeepSeek family / TNG derivative'],
  'x-ai': ['grok.svg', 'Grok'],
  xiaomi: ['xiaomimimo.svg', 'MiMo'],
  yi: ['yi-color.svg', 'Yi'],
  'z-ai': ['zai.svg', 'Z.ai / GLM'],
  zhipu: ['zai.svg', 'Z.ai / GLM'],
};
export function modelBrand(model) {
  const key=(model.author || model.id?.split('/')[0] || model.provider || '').toLowerCase();
  const entry=brands[key];
  return entry ? {file:entry[0],name:entry[1]} : null;
}
