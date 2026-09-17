export default function PageHeading({eyebrow,title,description,usage=false}){
 return <section className={'page-heading'+(usage?' usage-hero':'')}><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></section>;
}
