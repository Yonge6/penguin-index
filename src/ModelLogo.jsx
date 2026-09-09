import {FingerprintIcon} from '@phosphor-icons/react';
import {modelBrand} from './model-brand';
export default function ModelLogo({item,lang='en',large=false}) {
  const brand=modelBrand(item);
  const label=brand ? `${brand.name} logo` : (item.provider==='stealth'||item.provider==='Stealth'?(lang==='zh'?'品牌未公开的模型':'Undisclosed model brand'):(item.provider_name||item.provider||item.name)+(lang==='zh'?' · 暂无品牌标志':' · Logo unavailable'));
  return <span className={'model-logo'+(large?' model-logo-large':'')} title={label}>
    {brand ? <img src={import.meta.env.BASE_URL+'assets/models/'+brand.file} alt={label} width="24" height="24" loading="lazy"/> : <FingerprintIcon size={24} role="img" aria-label={label}/>}
  </span>;
}
