import {FingerprintIcon} from '@phosphor-icons/react';
import {modelBrand} from './model-brand';
export default function ModelLogo({item,lang='en',large=false}) {
  const brand=modelBrand(item);
  const label=brand ? `${brand.name} logo` : (lang==='zh'?'品牌未公开的模型':'Undisclosed model brand');
  return <span className={'model-logo'+(large?' model-logo-large':'')} title={label}>
    {brand ? <img src={import.meta.env.BASE_URL+'assets/models/'+brand.file} alt={label} width="24" height="24" loading="lazy"/> : <FingerprintIcon size={24} role="img" aria-label={label}/>}
  </span>;
}
