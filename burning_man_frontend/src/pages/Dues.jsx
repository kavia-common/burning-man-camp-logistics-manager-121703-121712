import React, { useEffect, useMemo, useState } from 'react';
import Card from '../components/Card';
import { Input } from '../components/FormControls';
import { getDuesSummary } from '../services/api';

/**
 * PUBLIC_INTERFACE
 * Dues
 * Manage camp dues, view status, request low income discount, and link to Venmo.
 */
function Dues() {
  const [summary, setSummary] = useState(null);
  const venmoUser = process.env.REACT_APP_VENMO_USERNAME || 'venmo';

  useEffect(() => {
    getDuesSummary().then((r) => r.ok && setSummary(r.data));
  }, []);

  const remaining = useMemo(() => {
    if (!summary) return 0;
    return Math.max(0, summary.dueAmount - summary.paid);
  }, [summary]);

  return (
    <div className="card-grid">
      <Card title="Your Status" actions={<a className="btn" href={`https://venmo.com/u/${venmoUser}`} target="_blank" rel="noreferrer">Pay with Venmo</a>}>
        {summary ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
            <Stat label="Season" value={summary.season} />
            <Stat label="Due Amount" value={'$' + summary.dueAmount} />
            <Stat label="Paid" value={'$' + summary.paid} />
            <Stat label="Remaining" value={'$' + remaining} />
          </div>
        ) : 'Loading…'}
      </Card>

      <Card title="Pay for Others">
        <div style={{ display: 'flex', gap: 10 }}>
          <Input placeholder="Member name or email" />
          <button className="btn">Lookup</button>
        </div>
      </Card>

      <Card title="Low Income Discount Request">
        <div style={{ display: 'grid', gap: 10 }}>
          <Input placeholder="Brief reason" />
          <Input placeholder="Requested reduction amount" type="number" />
          <button className="btn">Submit Request</button>
        </div>
      </Card>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="card" style={{ padding: 12 }}>
      <div style={{ color: 'var(--text-muted)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.4 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 800 }}>{value}</div>
    </div>
  );
}

export default Dues;
