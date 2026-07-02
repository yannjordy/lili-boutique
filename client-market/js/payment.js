function formatPrice(p, d = 'FCFA') {
  return `${Number(p).toLocaleString('fr-FR')} ${d}`;
}
function genererNumeroCommande(c = 0) {
  const d = new Date();
  return `CMD-${String(d.getFullYear()).slice(-2)}${String(d.getMonth()+1).padStart(2,'0')}-${String(c+1).padStart(4,'0')}`;
}
function genererLienUSSD(op, num, montant) {
  let n = String(num).replace(/[\s\-().]/g,'');
  if (n.startsWith('+237')) n = n.slice(4);
  if (n.startsWith('00237')) n = n.slice(5);
  if (n.startsWith('+')) n = n.slice(1);
  const m = Math.round(Number(montant));
  if (op === 'mtn') return `tel:*126*${n}*${m}%23`;
  if (op === 'orange') return `tel:%23150*${n}*${m}%23`;
  return null;
}
