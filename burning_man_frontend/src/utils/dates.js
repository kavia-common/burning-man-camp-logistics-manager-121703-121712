export function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function todayISO() {
  const d = new Date();
  d.setHours(0,0,0,0);
  return d.toISOString();
}
