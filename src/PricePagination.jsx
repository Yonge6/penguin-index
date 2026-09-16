export default function PricePagination({pagination,lang,onChange,position}){
 const {page,pages,start,end,total}=pagination,zh=lang==='zh';
 if(!total)return null;
 return <nav className="price-pagination" aria-label={zh?`价格榜分页（${position==='top'?'上方':'下方'}）`:`Price pagination (${position})`}>
  <span className="pagination-range" aria-live="polite">{start+1}–{end} / {total} · {zh?'每页 20 条':'20 per page'}</span>
  <div className="pagination-buttons"><button disabled={page===1} onClick={()=>onChange(page-1)}>{zh?'上一页':'Previous'}</button>
  <select aria-label={zh?'页码':'Page number'} value={page} onChange={e=>onChange(Number(e.target.value))}>{Array.from({length:pages},(_,i)=><option key={i+1} value={i+1}>{i+1} / {pages}</option>)}</select>
  <button disabled={page===pages} onClick={()=>onChange(page+1)}>{zh?'下一页':'Next'}</button></div>
 </nav>;
}
